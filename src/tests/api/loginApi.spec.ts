import { test, expect } from '@playwright/test';
import { RP_USERNAME, RP_PASSWORD } from '../../utils/envParameters';


test.describe.parallel('Getting access token', () => {

  test('Request for getting token should be passed', async ({ request }) => {
    const response = await request.post(`/uat/sso/oauth/token`, {
      data: `grant_type=password&username=${RP_USERNAME}&password=${RP_PASSWORD}`,
    });
    //const jsonResponse = JSON.parse(await response.text());
    //console.log(jsonResponse.access_token);

    expect(response.ok()).toBeTruthy();
  });
});
