import { APIRequestContext, APIResponse } from '@playwright/test';
import { RP_USERNAME, RP_PASSWORD, BASIC_AUTH_TOKEN, PROJECT_NAME } from '../resources/envParameters';
import { logger } from '../../../playwright.config';

export class HttpUtils {
  private static async executePost(request: APIRequestContext, address: string, authToken: string, payload: object): Promise<APIResponse> {
    logger.info(`Sending POST: ${address}`);
    const response = await request.post(address, {
      data: payload,
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${authToken}`
      }
    });
    logger.info(`Response status: ${response.status()} ${response.statusText()}`);
    logger.info(`Response:\n${JSON.stringify(await response.json(), null, 2)}`);
    return response;
  }

  private static async executeGet(request: APIRequestContext, address: string, authToken: string): Promise<APIResponse> {
    logger.info(`Sending GET: ${address}`);
    const response = await request.get(address, {
      headers: {
        'accept': '*/*',
        'Authorization': `bearer ${authToken}`
      }
    });
    logger.info(`Response status: ${response.status()} ${response.statusText()}`);
    logger.info(`Response:\n${JSON.stringify(await response.json(), null, 2)}`);
    return response;
  }

  private static async executePut(request: APIRequestContext, address: string, authToken: string, payload: object): Promise<APIResponse> {
    logger.info(`Sending PUT: ${address}`);
    const response = await request.put(address, {
      data: payload,
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${authToken}`
      }
    });
    logger.info(`Response status: ${response.status()} ${response.statusText()}`);
    logger.info(`Response:\n${JSON.stringify(await response.json(), null, 2)}`);
    return response;
  }

  private static async executeDelete(request: APIRequestContext, address: string, authToken: string): Promise<APIResponse> {
    logger.info(`Sending DELETE: ${address}`);
    const response = await request.delete(address, {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${authToken}`
      }
    });
    logger.info(`Response status: ${response.status()} ${response.statusText()}`);
    logger.info(`Response:\n${JSON.stringify(await response.json(), null, 2)}`);
    return response;
  }

  static async getAuthTokenRequest(request: APIRequestContext): Promise<APIResponse> {
    return await request.post(`/uat/sso/oauth/token`, {
      data: `grant_type=password&username=${RP_USERNAME}&password=${RP_PASSWORD}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${BASIC_AUTH_TOKEN}`
      }
    });
  }

  static async getAllDashboards(request: APIRequestContext, authToken: string): Promise<APIResponse> {
    return HttpUtils.executeGet(request, `api/v1/${PROJECT_NAME}/dashboard`, authToken);
  }
  static async getDashboardById(request: APIRequestContext, authToken: string, dashboardId : number): Promise<APIResponse> {
    return HttpUtils.executeGet(request, `api/v1/${PROJECT_NAME}/dashboard/${dashboardId}`, authToken);
  }

  private static async getDashboardsIdList(request: APIRequestContext, authToken: string): Promise<number[]> {
    const allDashboards = await HttpUtils.getAllDashboards(request, authToken);
    const allDashboardsJson = await allDashboards.json();
    const idList = allDashboardsJson.content.map((item: { id: any; }) => item.id);
    logger.info('The ids of all dashboards: ' + idList);
    return idList;
  }

  static async getDashboardIdByName(request: APIRequestContext, authToken: string, dashboardName: string): Promise<number> {
    const allDashboards = await HttpUtils.getAllDashboards(request, authToken);
    const allDashboardsJson = await allDashboards.json();
    const dashboard = allDashboardsJson.content.find((item: { id: number, name: string }) => item.name === dashboardName);
    const dashboardId: number = dashboard ? dashboard.id : null;
    logger.info(`Finding dashboard id by dashboard name: ${dashboardName}: ${dashboardId}`);
    return dashboardId;
  }

  static async deleteDashboard(request: APIRequestContext, authToken: string, dashboardId: number): Promise<APIResponse> {
    return HttpUtils.executeDelete(request, `api/v1/${PROJECT_NAME}/dashboard/${dashboardId}`, authToken);
  }

  static async deleteAllDashboards(request: APIRequestContext, authToken: string): Promise<void> {
    const idList = await HttpUtils.getDashboardsIdList(request, authToken);
    for (const id of idList) {
      await HttpUtils.deleteDashboard(request, authToken, id);
    }
  }

  static async createDashboard(request: APIRequestContext, authToken: string, dashboardData: object): Promise<APIResponse> {
    return HttpUtils.executePost(request, `api/v1/${PROJECT_NAME}/dashboard`, authToken, dashboardData);
  }

  static async updateDashboard(request: APIRequestContext, authToken: string, dashboardData: object, dashboardId: number): Promise<APIResponse> {
    return HttpUtils.executePut(request, `api/v1/${PROJECT_NAME}/dashboard/${dashboardId}`, authToken, dashboardData);
  }
}