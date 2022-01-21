import { Logger, Service, PlatformAccessory, CharacteristicValue, PlatformConfig } from 'homebridge';
import { PullTimer } from 'homebridge-http-base';
import { RiseGardenPlatform } from './platform';
import { RiseGardenAPI } from './api';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class RiseGardenAirTemperature {
  private service: Service;
  private pullTimer: PullTimer|null = null;

  constructor(
    private readonly platform: RiseGardenPlatform,
    private readonly accessory: PlatformAccessory,
    private readonly config: PlatformConfig,
    private readonly log: Logger,
  ) {
    this.log.debug('initializing RiseGardenAirTemperature');
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Rise-Gardens')
      .setCharacteristic(this.platform.Characteristic.Model, 'Floor-Unit')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    // get the TemperatureSensor service if it exists, otherwise create a new TemperatureSensor service
    // you can create multiple services for each accessory
    this.service = this.accessory.getService(this.platform.Service.TemperatureSensor) ||
      this.accessory.addService(this.platform.Service.TemperatureSensor);

    // set the service name, this is what is displayed as the default name on the Home app
    // in this example we are using the name we stored in the `accessory.context` in the `discoverDevices` method.
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.name);

    // each service must implement at-minimum the "required characteristics" for the given service type
    // see https://developers.homebridge.io/#/service/TemperatureSensor

    // register handlers for the CurrentTemperature Characteristic
    // this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
    // .onGet(this.getTemperature.bind(this)); // SET - bind to the 'getTemperature` method below

    if (config.pull_timer) {
      this.log.debug('setting pull timer to:', config.pull_timer);
      this.getTemperature();
      // Convert from milliseconds to minutes
      this.pullTimer = new PullTimer(log, config.pull_timer * 60000, this.getTemperature.bind(this), value => {
        this.service.setCharacteristic(this.platform.Characteristic.CurrentTemperature, value);
      });
      this.pullTimer.start();
    }
  }

  /**
   * Handle the "GET" requests from HomeKit
   * These are sent when HomeKit wants to know the current state of the accessory, for example, checking if a Light bulb is on.
   *
   * GET requests should return as fast as possbile. A long delay here will result in
   * HomeKit being unresponsive and a bad user experience in general.
   *
   * If your device takes time to respond you should update the status of your device
   * asynchronously instead using the `updateCharacteristic` method instead.

   * @example
   * this.service.updateCharacteristic(this.platform.Characteristic.On, true)
   */
  private async getTemperature(): Promise<CharacteristicValue> {
    this.log.debug('Called getTemperature');
    try {
      const api = new RiseGardenAPI(this.config, this.log);
      const airTemperature = await api.getCurrentTemperature(this.accessory.context.device.id);

      this.log.debug('Get airTemperature reading ->', airTemperature);
      if (this.pullTimer) {
        this.log.debug('resetting pull timer');
        this.pullTimer.resetTimer();
      }
      this.log.debug('Setting CurrentTemperature to:', airTemperature);
      this.service.updateCharacteristic(this.platform.Characteristic.CurrentTemperature, airTemperature);
      return airTemperature;
    } catch (err) {
      this.log.debug('Error getting airTemperature reading', err);
      throw new this.platform.api.hap.HapStatusError(this.platform.api.hap.HAPStatus.SERVICE_COMMUNICATION_FAILURE);
    }
  }
}
