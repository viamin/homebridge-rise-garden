# Rise Garden Plugin for Homebridge

This [Homebridge](https://github.com/homebridge/homebridge) plugin can be used control the lights on your Rise Garden with HomeKit. Also, did you know your [Rise Garden](https://risegardens.com) has an air temperature sensor? You can get the current temperature from your Rise Garden into HomeKit as well.

This plugin is not supported by or affiliated with Rise Gardens.

## Installation

First you need to have [Homebridge](https://github.com/homebridge/homebridge) installed. Refer to the repo for instructions.  

Run the following command to install `homebridge-rise-garden`:

```
sudo npm install -g homebridge-rise-garden
```

## Configuration

This plugin controls your Rise Garden using the Rise Garden API. You'll need to provide your username and password to access your garden via the API.

* **Name** \<string\>: The accessory name displayed in HomeKit
* **Username** \<string\> **required**: Your Rise Gardens username. This is the username you use to login to the Rise Gardens app.
* **Password** \<string\> **required**: Your Rise Gardens password. This is the password you use to login to the Rise Gardens app.
* **Poll Interval** \<integer\> **required**: The interval in minutes to poll the API for temperature updates. Default is 30 minutes.
