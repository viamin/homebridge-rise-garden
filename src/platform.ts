import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import { RiseGardenAPI } from './api';
import { RiseGardenLights } from './lights';
import { RiseGardenAirTemperature } from './temperature';
export class RiseGardenPlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;
  // this is used to track restored cached accessories
  public readonly accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.debug('Finished initializing platform:', this.config.name);

    // When this event is fired it means Homebridge has restored all cached accessories from disk.
    // Dynamic Platform plugins should only register new accessories after this event was fired,
    // in order to ensure they weren't added to homebridge already. This event can also be used
    // to start discovery of new accessories.
    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
      // run the method to discover / register your devices as accessories
      this.discoverDevices();
    });
  }

  /**
   * This function is invoked when homebridge restores cached accessories from disk at startup.
   * It should be used to setup event handlers for characteristics and update respective values.
   */
  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  async discoverDevices() {
    this.log.debug('calling discoverDevices');
    // Return early if there is no config yet
    if (!this.config.username || !this.config.password) {
      return;
    }

    // Get list of gardens
    const riseApi = new RiseGardenAPI(this.config, this.log);
    const gardens = await riseApi.getGardens();

    // loop over the discovered devices and register each one if it has not already been registered
    for (const garden of gardens) {
      this.log.debug('Got garden from Rise API:', garden);

      // generate a unique id for the accessory this should be generated from
      // something globally unique, but constant, for example, the device serial
      // number or MAC address
      const lightUuid = this.api.hap.uuid.generate(`${garden.id}-Light`);
      const temperatureUuid = this.api.hap.uuid.generate(`${garden.id}-Temperature`);

      // see if an accessory with the same uuid has already been registered and restored from
      // the cached devices we stored in the `configureAccessory` method above
      const existingLight = this.accessories.find(accessory => accessory.UUID === lightUuid);
      const existingTemperatureSensor = this.accessories.find(accessory => accessory.UUID === temperatureUuid);

      if (existingLight) {
        this.log.info('Restoring existing light from cache:', existingLight.displayName);
        new RiseGardenLights(this, existingLight, this.config, this.log);

        // it is possible to remove platform accessories at any time using `api.unregisterPlatformAccessories`, eg.:
        // remove platform accessories when no longer present
        // this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingLight]);
        // this.log.info('Removing existing light from cache:', existingLight.displayName);
      } else {
        this.log.info('Adding new light:', garden.name);
        const accessory = new this.api.platformAccessory(garden.name, lightUuid);
        accessory.context.device = garden;
        new RiseGardenLights(this, accessory, this.config, this.log);
        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
      }

      if (existingTemperatureSensor) {
        this.log.info('Restoring existing temperature sensor from cache:', existingTemperatureSensor.displayName);
        new RiseGardenAirTemperature(this, existingTemperatureSensor, this.config, this.log);

        // it is possible to remove platform accessories at any time using `api.unregisterPlatformAccessories`, eg.:
        // remove platform accessories when no longer present
        // this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingTemperatureSensor]);
        // this.log.info('Removing existing temperature sensor from cache:', existingTemperatureSensor.displayName);
      } else {
        this.log.info('Adding new temperature sensor:', garden.name);
        const accessory = new this.api.platformAccessory(garden.name, temperatureUuid);
        accessory.context.device = garden;
        new RiseGardenAirTemperature(this, accessory, this.config, this.log);
        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
      }
    }
  }
}
