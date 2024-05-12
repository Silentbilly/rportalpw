import { test, expect, APIResponse } from '@playwright/test';
import { HttpUtils } from '../../../core/utils/HttpUtils';
import { StringUtils } from '../../../core/utils/StringUtils';
import { HttpStatusCode } from 'axios';

let authToken: string;
let createDashboardResponse: APIResponse;
let updateDashboardResponse: APIResponse;
let dashboardId: number;

const dashboardName = StringUtils.getRandomName(20);
const dashboardDescription = StringUtils.getRandomString(12);
const newDashboardName = StringUtils.getRandomName(20);
const newDashboardDescription = StringUtils.getRandomString(12);
const dashboardData = {
    name: dashboardName,
    description: dashboardDescription,
};
const newDashboardData = {
    name: newDashboardName,
    description: newDashboardDescription,
};

test.describe.configure({ mode: 'parallel' });

test.beforeAll(async ({ request }) => {
    const response = await HttpUtils.getAuthTokenRequest(request);
    authToken = JSON.parse(await response.text()).access_token;
    await HttpUtils.deleteAllDashboards(request, authToken);
    createDashboardResponse = await HttpUtils.createDashboard(request, authToken, dashboardData);
    dashboardId = await HttpUtils.getDashboardIdByName(request, authToken, dashboardName);
});

test.beforeEach(async ({ request }) => {
    updateDashboardResponse = await HttpUtils.updateDashboard(request, authToken, newDashboardData, dashboardId);
});

test('Update dashboard. Check status', async () => {
    expect(updateDashboardResponse.status()).toEqual(HttpStatusCode.Ok);
});

test('Update dashboard. Check message', async () => {
    const responseJson = await updateDashboardResponse.json();
    const expectedMessage = `Dashboard with ID = '${dashboardId}' successfully updated`;
    expect(responseJson.message).toEqual(expectedMessage);
});