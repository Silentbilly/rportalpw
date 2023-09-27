import axios from 'axios';
import config from '../resources/config.json';

export class HttpUtils {
  static async getAuthToken(): Promise<string> {
    //const AUTH_BODY = "grant_type=password&username=default&password=1q2w3e";
    const URL = config.baseUrl; 

    // Replace with your request payload and headers (e.g., client_id, client_secret)
    const data = {
      key: "grant_type=password&username=default&password=1q2w3e"
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic dWk6dWltYW4=`,
    };

    try {
      const response = await axios.post(URL, data, { headers });
      if (response.status === 200 && response.data && response.data.token) {
        return response.data.token; // replace 'token' with the actual key that holds the token in the response, if it's different
      } else {
        throw new Error('Failed to retrieve auth token');
      }
    } catch (error) {
      throw error;
    }
  }
}