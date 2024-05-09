import { test, expect, APIResponse } from '@playwright/test';
import { HttpUtils } from '../../../core/utils/HttpUtils';
import { StringUtils } from '../../../core/utils/StringUtils';

let authToken: string;
let createDashboardResponse: APIResponse;

const dashboardName = '';
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
    createDashboardResponse = await HttpUtils.createDashboard(request, authToken, dashboardData);
});


test('Create dashboard. Creating dupicate dashboard. Check status', async () => {
    expect(createDashboardResponse.status()).toEqual(400);
});

test('Create dashboard. Creating dupicate dashboard. Check error code', async () => {
    const responseJson = await createDashboardResponse.json();
    expect(responseJson.errorCode).toEqual(4001);
});

test('Create dashboard. Creating dupicate dashboard. Check error message', async () => {
    const expectedErrorMessage = `Incorrect Request. [Field 'name' should not contain only white spaces and shouldn't be empty. Field 'name' should have size from '3' to '128'.] `;
    const responseJson = await createDashboardResponse.json();
    expect(responseJson.message).toEqual(expectedErrorMessage);
});