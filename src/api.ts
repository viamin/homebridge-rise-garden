import axios from 'axios';

export class RiseGardenAPI {
  private static instance: RiseGardenAPI;
  private baseUrl: string;
  private gardenId: number;
  private tokenInfo: any;

  public constructor(gardenId: number) {
    this.baseUrl = 'https://prod-api.risegds.com/v2';
    this.gardenId = gardenId;
    this.tokenInfo = {
      access_token: '',
      refresh_token: '',
      user_id: '',
      expires_in: 0,
    };
  }

  public async getCurrentTemperature(): Promise<number> {
    const status = await this.getDeviceStatus();
    return status.at;
  }

  public async getLightLevel(): Promise<number> {
    const status = await this.getDeviceStatus();
    return status.lamp_level;
  }

  public setLightLevel(level: number): Promise<string> {
    return this.put(`/gardens/${this.gardenId}/device/light-level`, {
      'light_level': level,
      'wait_for_response': true,
    });
  }

  private async getDeviceStatus(): Promise<any> {
    return this.get(`/gardens/${this.gardenId}/device/status`);
  }

  public get(path: string): Promise<any> {
    return axios.get(this.baseUrl + path);
  }

  public put(path: string, data: any): Promise<any> {
    return axios.put(this.baseUrl + path, data);
  }

  public post(path: string, data: any): Promise<any> {
    return axios.post(this.baseUrl + path, data);
  }

  async login(username: string, password: string): Promise<any> {
    const res = await this.post('/auth/login', {
      'username': username,
      'password': password,
    });
    const { access_token, refresh_token, expires_in } = res.result;
    const user_id = res.result.user.id;

    this.tokenInfo = {
      access_token: access_token,
      refresh_token: refresh_token,
      user_id: user_id,
      expires_in: expires_in + new Date().getTime(),
    };
  }

  async request(method, path, params = null, body = null): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenInfo.access_token,
    };

    const options = {
      method: method,
      baseURL: this.baseUrl,
      url: path,
      headers: headers,
      params: params,
      data: body,
    };

    return axios(options);
    const res = await axios(options);
    return res.data;
  }
}
