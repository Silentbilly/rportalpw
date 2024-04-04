import { test, expect } from '@playwright/test';
import { HttpUtils } from '../../core/utils/HttpUtils';

test.describe.configure({ mode: 'serial' });

test('Request for getting token should be passed', async ({ request }) => {
  const response = await HttpUtils.getAuthTokenRequest(request);
  expect(response.ok()).toBeTruthy();
});