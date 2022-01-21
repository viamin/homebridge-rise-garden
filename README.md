
<p align="center">

<img src="https://cdn.shopify.com/s/files/1/0245/4614/8404/files/5_200x.png" width="150">

</p>

# Rise Garden Plugin for Homebridge

This [Homebridge](https://github.com/homebridge/homebridge) plugin can be used control the lights on your Rise Garden with HomeKit. Also, did you know your [Rise Garden](https://risegardens.com) has an air temperature sensor? You can get the current temperature from your Rise Garden into HomeKit as well.

This is a 3rd party plugin and is not supported by Rise Gardens.
## Installation

First of all you need to have [Homebridge](https://github.com/homebridge/homebridge) installed. Refer to the repo for
instructions.  
Then run the following command to install `homebridge-rise-garden`

```
sudo npm install -g homebridge-rise-garden
```

## Configuration

This plugin controls your Rise Garden using the Rise Garden API. You'll need to provide your username and password to access your garden via the API.

* **Name** \<string\>: The accessory name displayed in HomeKit
* **Username** \<string\> **required**: Your Rise Gardens username. This is the same username you use to login to the Rise Gardens app.
* **Password** \<string\> **required**: Your Rise Gardens password. This is the same password you use to login to the Rise Gardens app.
* **Poll Interval** \<integer\> **required**: The interval in minutes to poll the API for temperature updates. Default is 30 minutes.