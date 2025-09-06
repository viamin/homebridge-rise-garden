import { Logger, PlatformConfig } from 'homebridge';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

type Token = {
  access_token: string;
  refresh_token: string;
  user_id: string;
  expires_in: number;
};
export class RiseGardenAPI {
  private static instance: RiseGardenAPI;
  private baseUrl: string;
  public readonly log: Logger;
  private tokenInfo: Token;
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

  public async getGardens(): Promise<AxiosResponse> {
    this.log.debug('Executed getGardens');
    return this.request('get', '/gardens');
  }

  public async getCurrentTemperature(gardenId: number): Promise<number> {
    this.log.debug('Executed getCurrentTemperature with gardenId:', gardenId);
    const status = await this.getDeviceStatus(gardenId);
    return status.data.at;
  }

  public async getLightLevel(gardenId: number): Promise<number> {
    this.log.debug('Executed getLightLevel with gardenId:', gardenId);
    const status = await this.getDeviceStatus(gardenId);
    return status.data.lamp_level;
  }

  public setLightLevel(gardenId: number, level: number): Promise<AxiosResponse> {
    this.log.debug('Executed setLightLevel with gardenId and level:', gardenId, level);
    const body = JSON.stringify({
      'light_level': level,
      'wait_for_response': true,
    });
    return this.request('put', `/gardens/${gardenId}/device/light-level`, null, body);
  }

  public async getDeviceStatus(gardenId: number): Promise<AxiosResponse> {
    this.log.debug('Executed getDeviceStatus with gardenId:', gardenId);
    return this.request('get', `/gardens/${gardenId}/device/status`);
  }

  private tokenIsExpired(): number|boolean {
    return this.tokenInfo.expires_in && (this.tokenInfo.expires_in - 60000 < new Date().getTime());
  }

  private async refreshOrLogin(): Promise<boolean> {
    if (this.tokenInfo.refresh_token !== '' && this.tokenIsExpired()) {
      await this.refresh();
    } else if (this.tokenInfo.access_token === '') {
      await this.login(this.config.username, this.config.password);
    }

    return false;
  }

  private async refresh(): Promise<boolean> {
    this.log.debug('Executed refresh');
    const refresh_token = this.tokenInfo.refresh_token;
    const data = {
      'refresh_token': refresh_token,
    };
    const options: AxiosRequestConfig = {
      method: 'POST',
      baseURL: this.baseUrl,
      url: '/auth/refresh_token',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenInfo.access_token,
      },
      data: JSON.stringify(data),
    };

    try {
      const res = await axios.request(options);
      if (res.status !== 200) {
        return false;
      }

      const { token, expires_in } = res.data;
      const cached_user_id = this.tokenInfo.user_id;

      this.tokenInfo = {
        access_token: token,
        refresh_token: refresh_token,
        user_id: cached_user_id,
        expires_in: expires_in + new Date().getTime(),
      };
      return true;
    } catch (error) {
      this.log.error('Failed to refresh token:', (error as Error).message);
      return false;
    }
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

    try {
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
    } catch (error) {
      this.log.error('Failed to login:', (error as Error).message);
      return false;
    }
  }

  private async request(method: Method, path: string, params: string|null = null, body: string|null = null): Promise<AxiosResponse> {
    if (path !== '/auth/login' && path !== '/auth/refresh_token') {
      await this.refreshOrLogin();
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
      data: body,
    };

    try {
      return await axios(options);
    } catch (error) {
      const err = error as Error & { code?: string };
      this.log.error(`API request failed for ${path}:`, err.message);
      if (err.code === 'EAI_AGAIN' || err.code === 'ENOTFOUND') {
        this.log.error('DNS resolution failed. Check your internet connection and DNS settings.');
      }
      throw error;
    }
  }
}
