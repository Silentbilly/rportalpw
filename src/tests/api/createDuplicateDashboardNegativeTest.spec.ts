import { test, expect, APIResponse } from '@playwright/test';
import { HttpUtils } from '../../core/utils/HttpUtils';
import { StringUtils } from '../../core/utils/StringUtils';

let authToken: string;
let createDashboardResponse: APIResponse;
let createDuplicateResponse: APIResponse;

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
    createDashboardResponse = await HttpUtils.createDashboard(request, authToken, dashboardData);
    createDuplicateResponse = await HttpUtils.createDashboard(request, authToken, dashboardData);
});


test('Create dashboard. Creating dupicate dashboard. Check status', async () => {
    expect(createDuplicateResponse.status()).toEqual(409);
});

test('Create dashboard. Creating dupicate dashboard. Check error code', async () => {
    const responseJson = await createDuplicateResponse.json();
    expect(responseJson.errorCode).toEqual(4091);
});

test('Create dashboard. Creating dupicate dashboard. Check error message', async () => {
    const expectedErrorMessage = `Resource '${dashboardName}' already exists. You couldn't create the duplicate.`;
    const responseJson = await createDuplicateResponse.json();
    expect(responseJson.message).toEqual(expectedErrorMessage);
});