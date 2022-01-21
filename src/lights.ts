import { Logger, Service, PlatformAccessory, CharacteristicValue, PlatformConfig } from 'homebridge';

import { RiseGardenPlatform } from './platform';
import { RiseGardenAPI } from './api';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class RiseGardenLights {
  private service: Service;

  constructor(
    private readonly platform: RiseGardenPlatform,
    private readonly accessory: PlatformAccessory,
    private readonly config: PlatformConfig,
    private readonly log: Logger,
  ) {
    this.log.debug('initializing RiseGardenLights');
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Rise-Gardens')
      .setCharacteristic(this.platform.Characteristic.Model, 'Floor-Unit')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');
    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.name);

    // each service must implement at-minimum the "required characteristics" for the given service type
    // see https://developers.homebridge.io/#/service/Lightbulb

    // register handlers for the On/Off Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below

    // register handlers for the Brightness Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .onSet(this.setBrightness.bind(this));       // SET - bind to the 'setBrightness` method below
  }

  /**
   * Handle "SET" requests from HomeKit
   * These are sent when the user changes the state of an accessory, for example, turning on a Light bulb.
   */
  async setOn(value: CharacteristicValue): Promise<any> {
    this.log.debug('called setOn:', value);
    const target = value ? 100 : 0;
    this.setBrightness(target);
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
  async getOn(): Promise<CharacteristicValue> {
    this.log.debug('called getOn');
    try {
      const api = new RiseGardenAPI(this.config, this.log);
      const isOn = await api.getLightLevel(this.accessory.context.device.id) > 0;
      this.platform.log.debug('Get Characteristic On ->', isOn);
      return isOn;
    } catch (err) {
      // if you need to return an error to show the device as "Not Responding" in the Home app:
      throw new this.platform.api.hap.HapStatusError(this.platform.api.hap.HAPStatus.SERVICE_COMMUNICATION_FAILURE);
    }
  }

  /**
   * Handle "SET" requests from HomeKit
   * These are sent when the user changes the state of an accessory, for example, changing the Brightness
   */
  async setBrightness(value: CharacteristicValue): Promise<any> {
    this.log.debug('called setBrightness:', value);
    try {
      const api = new RiseGardenAPI(this.config, this.log);
      await api.setLightLevel(this.accessory.context.device.id, value as number);
    } catch (err) {
      // if you need to return an error to show the device as "Not Responding" in the Home app:
      throw new this.platform.api.hap.HapStatusError(this.platform.api.hap.HAPStatus.SERVICE_COMMUNICATION_FAILURE);
    }
  }

}
