import { test, expect, APIResponse } from '@playwright/test';
import { HttpUtils } from '../../../core/utils/HttpUtils';
import { StringUtils } from '../../../core/utils/StringUtils';

let authToken: string;
let deleteDashboardResponse: APIResponse;
let dashboardId: number;

test.describe.configure({ mode: 'parallel' });

const dashboardName = StringUtils.getRandomName(20);
const dashboardDescription = StringUtils.getRandomString(12);
const dashboardData = {
    name: dashboardName,
    description: dashboardDescription,
};

test.beforeAll(async ({ request }) => {
    const response = await HttpUtils.getAuthTokenRequest(request);
    authToken = JSON.parse(await response.text()).access_token;
    await HttpUtils.deleteAllDashboards(request, authToken);
});

test.beforeEach(async ({ request }) => {
    await HttpUtils.createDashboard(request, authToken, dashboardData);
    dashboardId = await HttpUtils.getDashboardIdByName(request, authToken, dashboardName);
    deleteDashboardResponse = await HttpUtils.deleteDashboard(request, authToken, dashboardId);
});

test('Delete dashboard by dashboard id. Status check', async () => {
    expect(deleteDashboardResponse.status()).toEqual(200);
});

test('Delete dashboard by dashboard id. Error code check', async ({ request }) => {
    const responseJson = await deleteDashboardResponse.json();
    expect(responseJson.message).toEqual(`Dashboard with ID = '${dashboardId}' successfully deleted.`);
});