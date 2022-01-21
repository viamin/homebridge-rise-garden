import { Logger, PlatformConfig } from 'homebridge';
import axios, { AxiosRequestConfig, Method } from 'axios';

export class RiseGardenAPI {
  private static instance: RiseGardenAPI;
  private baseUrl: string;
  public readonly log: Logger;
  private tokenInfo: any;
  private readonly config: PlatformConfig;

  public constructor(config: PlatformConfig, log: Logger) {
    this.baseUrl = 'https://prod-api.risegds.com/v2';
    this.config = config;
    this.log = log;
    this.tokenInfo = {
      access_token: '',
      refresh_token: '',
      user_id: '',
      expires_in: 0,
    };
  }

  public async getGardens(): Promise<any> {
    this.log.debug('Executed getGardens');
    return this.request('get', '/gardens');
  }

  public async getCurrentTemperature(gardenId: number): Promise<number> {
    this.log.debug('Executed getCurrentTemperature with gardenId:', gardenId);
    const status = await this.getDeviceStatus(gardenId);
    return status.at;
  }

  public async getLightLevel(gardenId: number): Promise<number> {
    this.log.debug('Executed getLightLevel with gardenId:', gardenId);
    const status = await this.getDeviceStatus(gardenId);
    return status.lamp_level;
  }

  public setLightLevel(gardenId: number, level: number): Promise<string> {
    this.log.debug('Executed setLightLevel with gardenId and level:', gardenId, level);
    const body = JSON.stringify({
      'light_level': level,
      'wait_for_response': true,
    });
    return this.request('put', `/gardens/${gardenId}/device/light-level`, body);
  }

  public async getDeviceStatus(gardenId: number): Promise<any> {
    this.log.debug('Executed getDeviceStatus with gardenId:', gardenId);
    return this.request('get', `/gardens/${gardenId}/device/status`);
  }

  private async loginIfNeeded(path: string): Promise<any> {
    if (this.tokenInfo.access_token === '' || this.tokenIsExpired()) {
      await this.login(this.config.username, this.config.password);
    }

    return false;
  }

  private tokenIsExpired(): boolean {
    return this.tokenInfo.expires_in && (this.tokenInfo.expires_in - 60000 < new Date().getTime());
  }

  private async login(username: string, password: string): Promise<boolean> {
    this.log.debug('Executed login with username and password:', username, 'hidden');
    const data = {
      'email': username,
      'password': password,
    };
    const options: AxiosRequestConfig = {
      method: 'POST',
      baseURL: this.baseUrl,
      url: '/auth/login',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    };

    const res = await axios.request(options);
    if (res.status !== 200) {
      return false;
    }

    const { token, refresh_token, expires_in } = res.data;
    const user_id = res.data.user.id;

    this.tokenInfo = {
      access_token: token,
      refresh_token: refresh_token,
      user_id: user_id,
      expires_in: expires_in + new Date().getTime(),
    };
    return true;
  }

  private async request(method: Method, path: string, params: string|null = null, body: string|null = null): Promise<any> {
    if (path !== '/auth/login') {
      await this.loginIfNeeded(path);
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenInfo.access_token,
    };

    const options: AxiosRequestConfig = {
      method: method,
      baseURL: this.baseUrl,
      url: path,
      headers: headers,
      params: params,
      data: JSON.stringify(body),
    };

    const res = await axios(options);
    return res.data;
  }
}
