import { test, expect } from '@playwright/test';
import { HttpUtils } from '../../core/utils/HttpUtils';
import { StringUtils } from '../../core/utils/StringUtils';

let authToken: string;
const dashboardName = StringUtils.getRandomName(20);
const dashboardDescription = StringUtils.getRandomString(12);
const dashboardData = {
    name: dashboardName,
    description: dashboardDescription,
};

test.describe.configure({ mode: 'parallel' });

test.beforeAll(async ({ request }) => {
    const response = await HttpUtils.getAuthTokenRequest(request);
    authToken = JSON.parse(await response.text()).access_token;
    await HttpUtils.deleteAllDashboards(request, authToken);
});

test.beforeEach(async ({ request }) => {
    await HttpUtils.createDashboard(request, authToken, dashboardData);
});

test('Get dashboards', async ({ request }) => {
    const response = await HttpUtils.getAllDashboards(request, authToken);
    expect(response.ok()).toBeTruthy();
});

test('Get dashboard by dashboard id', async ({ request }) => {
    const dashboardId = await HttpUtils.getDashboardIdByName(request, authToken, dashboardName);
    const response = await HttpUtils.getDashboardById(request, authToken, dashboardId);
    expect(response.ok()).toBeTruthy();
});