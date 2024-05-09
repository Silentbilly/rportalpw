import { test, expect, APIResponse } from '@playwright/test';
import { HttpUtils } from '../../../core/utils/HttpUtils';

let authToken: string;
let getDashboardsResponse: APIResponse;
const dashboardId: number = 53234525;
test.describe.configure({ mode: 'parallel' });

test.beforeAll(async ({ request }) => {
    const response = await HttpUtils.getAuthTokenRequest(request);
    authToken = JSON.parse(await response.text()).access_token;
    await HttpUtils.deleteAllDashboards(request, authToken);
});

test.beforeEach(async ({ request }) => {
    getDashboardsResponse = await HttpUtils.getDashboardById(request, authToken, dashboardId);
});

test('Get dashboard by wrong dashboard id. Status check', async ({ request }) => {
    const response = await HttpUtils.getDashboardById(request, authToken, dashboardId);
    expect(response.status()).toEqual(404);
});

test('Get dashboard by wrong dashboard id. Error code check', async ({ request }) => {
    const responseJson = await getDashboardsResponse.json();
    expect(responseJson.errorCode).toEqual(40422);
});

test('Get dashboard by wrong dashboard id. Error message check', async ({ request }) => {
    const responseJson = await getDashboardsResponse.json();
    const expectedErrorMessage = `Dashboard with ID '${dashboardId}' not found on project 'rp_dashboards'. Did you use correct Dashboard ID?`;
    expect(responseJson.message).toEqual(expectedErrorMessage);
});