import { test, expect, APIResponse } from '@playwright/test';
import { HttpUtils } from '../../../core/utils/HttpUtils';
import { HttpStatusCode } from 'axios';

let authToken: string;
let deleteDashboardResponse: APIResponse;
const dashboardId: number = 53234525;

test.describe.configure({ mode: 'parallel' });

test.beforeAll(async ({ request }) => {
    const response = await HttpUtils.getAuthTokenRequest(request);
    authToken = JSON.parse(await response.text()).access_token;
    await HttpUtils.deleteAllDashboards(request, authToken);
});

test.beforeEach(async ({ request }) => {
    deleteDashboardResponse = await HttpUtils.deleteDashboard(request, authToken, dashboardId);
});

test('Delete dashboard by wrong dashboard id. Status check', async () => {
    expect(deleteDashboardResponse.status()).toEqual(HttpStatusCode.NotFound);
});

test('Delete dashboard by wrong dashboard id. Error code check', async () => {
    const responseJson = await deleteDashboardResponse.json();
    expect(responseJson.errorCode).toEqual(40422);
});

test('Delete dashboard by wrong dashboard id. Error message check', async () => {
    const responseJson = await deleteDashboardResponse.json();
    expect(responseJson.message).toEqual(`Dashboard with ID '${dashboardId}' not found on project 'rp_dashboards'. Did you use correct Dashboard ID?`);
});