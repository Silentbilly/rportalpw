import { test, expect, APIResponse } from '@playwright/test';
import { HttpUtils } from '../../../core/utils/HttpUtils';
import { StringUtils } from '../../../core/utils/StringUtils';
import { JsonUtils } from '../../../core/utils/jsonUtils';
import schema from '../../../core/resources/jsonSchemas/getDashboardById.json';

let authToken: string;
let dashboardId: number;
let getDashboardsResponse: APIResponse;
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
    dashboardId = await HttpUtils.getDashboardIdByName(request, authToken, dashboardName);
    getDashboardsResponse = await HttpUtils.getDashboardById(request, authToken, dashboardId);
});

test('Get dashboard by dashboard id. Status check', async ({ request }) => {
    expect(getDashboardsResponse.status()).toEqual(200);
});

test('Get dashboard by dashboard id. Schema validation', async ({ request }) => {
    const responseJson = await getDashboardsResponse.json();
    expect(await JsonUtils.validateJsonSchema(schema, responseJson)).toBeTruthy();
});

test('Get dashboard by dashboard id. Name check', async ({ request }) => {
    const responseJson = await getDashboardsResponse.json();
    expect(responseJson.name).toEqual(dashboardName);
});

test('Get dashboard by dashboard id. Description check', async ({ request }) => {
    const responseJson = await getDashboardsResponse.json();
    expect(responseJson.description).toEqual(dashboardDescription);
});