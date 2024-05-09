import { test, expect, APIResponse } from '@playwright/test';
import { HttpUtils } from '../../../core/utils/HttpUtils';
import { StringUtils } from '../../../core/utils/StringUtils';
import schema from '../../../core/resources/jsonSchemas/createDashboardResponse.json';
import { JsonUtils } from '../../../core/utils/jsonUtils';

let authToken: string;
let createDashboardResponse: APIResponse;

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
});


test('Create dashboard. Check status 201.', async () => {
    expect(createDashboardResponse.status()).toEqual(201);
});

test('Create dashboard. Checking schema', async () => {
    const responseJson = await createDashboardResponse.json();

    expect(await JsonUtils.validateJsonSchema(schema, responseJson)).toBeTruthy();
});