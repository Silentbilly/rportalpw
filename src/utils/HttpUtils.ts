import { APIRequestContext, APIResponse } from '@playwright/test';
import { RP_USERNAME, RP_PASSWORD, BASIC_AUTH_TOKEN } from '../utils/envParameters';
import logger from './logger';

export class HttpUtils {

  private static async executePost(request: APIRequestContext, address: string, data: object): Promise<APIResponse> {
    logger.info(`Sending POST: ${address}`);
    logger.info(`With parameters:\n${JSON.stringify(data, null, 2)}`);

    const response = await request.post(address, data);

    logger.info(`Response status: ${response.status()} ${response.statusText()}`);
    logger.info(`Response:\n${JSON.stringify(await response.json(), null, 2)}`);
    return response;
  }

  static async getAuthTokenRequest(request: APIRequestContext): Promise<APIResponse> {
    return HttpUtils.executePost(request, `/uat/sso/oauth/token`, {
      data: `grant_type=password&username=${RP_USERNAME}&password=${RP_PASSWORD}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${BASIC_AUTH_TOKEN}` 
      }
    });
  }
}