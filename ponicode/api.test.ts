import * as RiseGardenAPI from '../src/api';
import * as homebridge from 'homebridge';
// @ponicode
describe('api.RiseGardenAPI.getGardens', () => {
  let inst: <RiseGardenAPI>;

  beforeEach(() => {
    inst = new api.RiseGardenAPI();
  });

  test('0', async () => {
    await inst.getGardens();
  });
});

// @ponicode
describe('api.RiseGardenAPI.setLightLevel', () => {
  let inst: any;

  beforeEach(() => {
    inst = new api.RiseGardenAPI();
  });

  test('0', () => {
    const result: any = inst.setLightLevel('Pierre Edouard', '9876');
    expect(result).toMatchSnapshot();
  });

  test('1', () => {
    const result: any = inst.setLightLevel('George', 'da7588892');
    expect(result).toMatchSnapshot();
  });

  test('2', () => {
    const result: any = inst.setLightLevel('Pierre Edouard', '12345');
    expect(result).toMatchSnapshot();
  });

  test('3', () => {
    const result: any = inst.setLightLevel('Jean-Philippe', '12345');
    expect(result).toMatchSnapshot();
  });

  test('4', () => {
    const result: any = inst.setLightLevel('Edmond', 'c466a48309794261b64a4f02cfcc3d64');
    expect(result).toMatchSnapshot();
  });

  test('5', () => {
    const result: any = inst.setLightLevel('', '');
    expect(result).toMatchSnapshot();
  });
});

describe('api.RiseGardenAPI.getLightLevel', () => {
  let inst15: any;
  let inst16: any;
  let inst13: any;
  let inst14: any;
  let inst11: any;
  let inst12: any;
  let inst9: any;
  let inst10: any;
  let inst7: any;
  let inst8: any;
  let inst5: any;
  let inst6: any;
  let inst: any;
  let inst4: any;
  let inst2: any;
  let inst3: any;

  beforeEach(() => {
    inst15 = new homebridge.Logger('');
    inst16 = new api.RiseGardenAPI({ platform: '', name: '', _bridge: undefined, _bridge: '', key0: '', platform: '', name: '' }, inst15);
    inst13 = new homebridge.Logger('');
    inst14 = new api.RiseGardenAPI({ platform: '', name: '', _bridge: undefined, _bridge: '', key0: '', platform: '', name: '' }, inst13);
    inst11 = new homebridge.Logger('Gail Hoppe');
    inst12 = new api.RiseGardenAPI({ platform: 'v1.2.4', name: 'Jean-Philippe', _bridge: undefined, _bridge: '1.0.0', key0: 'Jean-Philippe', platform: '^5.0.0', name: 'Jean-Philippe' }, inst11);
    inst9 = new homebridge.Logger('Janet Homenick');
    inst10 = new api.RiseGardenAPI({ platform: '4.0.0-beta1\t', name: 'Michael', _bridge: undefined, _bridge: '1.0.0', key0: 'Edmond', platform: '4.0.0-beta1\t', name: 'George' }, inst9);
    inst7 = new homebridge.Logger('Maurice Purdy');
    inst8 = new api.RiseGardenAPI({ platform: 'v4.0.0-rc.4', name: 'Anas', _bridge: undefined, _bridge: '4.0.0-beta1\t', key0: 'Michael', platform: 'v4.0.0-rc.4', name: 'George' }, inst7);
    inst5 = new homebridge.Logger('Ronald Keeling');
    inst6 = new api.RiseGardenAPI({ platform: 'v4.0.0-rc.4', name: 'George', _bridge: undefined, _bridge: 'v4.0.0-rc.4', key0: 'Pierre Edouard', platform: 'v1.2.4', name: 'Michael' }, inst5);
    inst = new homebridge.Logger('Maurice Purdy');
    inst4 = new api.RiseGardenAPI({ platform: '^5.0.0', name: 'Edmond', _bridge: undefined, _bridge: 'v1.2.4', key0: 'Jean-Philippe', platform: '1.0.0', name: 'Anas' }, inst);
    inst2 = new homebridge.Logger('Gail Hoppe');
    inst3 = new api.RiseGardenAPI({ platform: '1.0.0', name: 'Anas', _bridge: undefined, _bridge: '^5.0.0', key0: 'Edmond', platform: 'v1.2.4', name: 'George' }, inst2);
  });

  test('0', async () => {
    await inst3.getLightLevel(0.5);
  });

  test('1', async () => {
    await inst4.getLightLevel(-29.45);
  });

  test('2', async () => {
    await inst6.getLightLevel(0.0);
  });

  test('3', async () => {
    await inst8.getLightLevel(1.0);
  });

  test('4', async () => {
    await inst10.getLightLevel(10.23);
  });

  test('5', async () => {
    await inst14.getLightLevel(-Infinity);
  });
});

describe('api.RiseGardenAPI.getCurrentTemperature', () => {
  let inst17: any;
  let inst18: any;
  let inst15: any;
  let inst16: any;
  let inst13: any;
  let inst14: any;
  let inst11: any;
  let inst12: any;
  let inst9: any;
  let inst10: any;
  let inst7: any;
  let inst8: any;
  let inst5: any;
  let inst6: any;
  let inst: any;
  let inst4: any;
  let inst2: any;
  let inst3: any;

  beforeEach(() => {
    inst17 = new homebridge.Logger(undefined);
    inst18 = new api.RiseGardenAPI({ platform: '', name: '', _bridge: undefined, name: '', _bridge: '', platform: '' }, inst17);
    inst15 = new homebridge.Logger(undefined);
    inst16 = new api.RiseGardenAPI({ platform: '', name: '', _bridge: undefined, name: '', _bridge: '', platform: '' }, inst15);
    inst13 = new homebridge.Logger(undefined);
    inst14 = new api.RiseGardenAPI({ platform: '4.0.0-beta1\t', name: 'Michael', _bridge: undefined, name: 'Anas', _bridge: 'v4.0.0-rc.4', platform: 'v4.0.0-rc.4' }, inst13);
    inst11 = new homebridge.Logger(undefined);
    inst12 = new api.RiseGardenAPI({ platform: '^5.0.0', name: 'Jean-Philippe', _bridge: undefined, name: 'George', _bridge: '^5.0.0', platform: '1.0.0' }, inst11);
    inst9 = new homebridge.Logger(undefined);
    inst10 = new api.RiseGardenAPI({ platform: 'v4.0.0-rc.4', name: 'George', _bridge: undefined, name: 'Michael', _bridge: '^5.0.0', platform: '4.0.0-beta1\t' }, inst9);
    inst7 = new homebridge.Logger(undefined);
    inst8 = new api.RiseGardenAPI({ platform: 'v1.2.4', name: 'Jean-Philippe', _bridge: undefined, name: 'Michael', _bridge: '4.0.0-beta1\t', platform: '1.0.0' }, inst7);
    inst5 = new homebridge.Logger(undefined);
    inst6 = new api.RiseGardenAPI({ platform: '1.0.0', name: 'George', _bridge: undefined, name: 'Pierre Edouard', _bridge: 'v1.2.4', platform: '^5.0.0' }, inst5);
    inst = new homebridge.Logger(undefined);
    inst4 = new api.RiseGardenAPI({ platform: '4.0.0-beta1\t', name: 'Pierre Edouard', _bridge: undefined, name: 'Anas', _bridge: 'v1.2.4', platform: '4.0.0-beta1\t' }, inst);
    inst2 = new homebridge.Logger(undefined);
    inst3 = new api.RiseGardenAPI({ platform: '1.0.0', name: 'Jean-Philippe', _bridge: undefined, name: 'Pierre Edouard', _bridge: '1.0.0', platform: '^5.0.0' }, inst2);
  });

  test('0', async () => {
    await inst3.getCurrentTemperature(-0.5);
  });

  test('1', async () => {
    await inst4.getCurrentTemperature(10.23);
  });

  test('2', async () => {
    await inst6.getCurrentTemperature(10.0);
  });

  test('3', async () => {
    await inst8.getCurrentTemperature(0.5);
  });

  test('4', async () => {
    await inst10.getCurrentTemperature(0.0);
  });

  test('5', async () => {
    await inst16.getCurrentTemperature(NaN);
  });
});

// @ponicode
describe('api.RiseGardenAPI.getDeviceStatus', () => {
  let inst: any;

  beforeEach(() => {
    inst = new api.RiseGardenAPI();
  });

  test('0', async () => {
    await inst.getDeviceStatus('Jean-Philippe');
  });

  test('1', async () => {
    await inst.getDeviceStatus('Pierre Edouard');
  });

  test('2', async () => {
    await inst.getDeviceStatus('Michael');
  });

  test('3', async () => {
    await inst.getDeviceStatus('Edmond');
  });

  test('4', async () => {
    await inst.getDeviceStatus('George');
  });

  test('5', async () => {
    await inst.getDeviceStatus('');
  });
});

describe('api.RiseGardenAPI.refreshOrLogin', () => {
  let inst2: any;
  let inst3: any;

  beforeEach(() => {
    inst2 = new homebridge.Logger('');
    inst3 = new api.RiseGardenAPI({ platform: '', name: undefined, _bridge: undefined, name: '', _bridge: '', platform: '' }, inst2);
  });

  test('0', async () => {
    await inst3.refreshOrLogin();
  });
});

describe('api.RiseGardenAPI.tokenIsExpired', () => {
  let inst2: any;
  let inst3: any;

  beforeEach(() => {
    inst2 = new homebridge.Logger('');
    inst3 = new api.RiseGardenAPI({ platform: '', name: undefined, _bridge: undefined, key2: '', name: '', platform: '', _bridge: '', key0: '', key1: '' }, inst2);
  });

  test('0', () => {
    const result: any = inst3.tokenIsExpired();
    expect(result).toMatchSnapshot();
  });
});

describe('api.RiseGardenAPI.refresh', () => {
  let inst2: any;
  let inst3: any;

  beforeEach(() => {
    inst2 = new homebridge.Logger('');
    inst3 = new api.RiseGardenAPI({ platform: '', name: '', _bridge: undefined, name: '', _bridge: '', platform: '' }, inst2);
  });

  test('0', async () => {
    await inst3.refresh();
  });
});

describe('api.RiseGardenAPI.login', () => {
  let inst19: any;
  let inst20: any;
  let inst17: any;
  let inst18: any;
  let inst15: any;
  let inst16: any;
  let inst13: any;
  let inst14: any;
  let inst11: any;
  let inst12: any;
  let inst9: any;
  let inst10: any;
  let inst7: any;
  let inst8: any;
  let inst5: any;
  let inst6: any;
  let inst: any;
  let inst4: any;
  let inst2: any;
  let inst3: any;

  beforeEach(() => {
    inst19 = new homebridge.Logger('');
    inst20 = new api.RiseGardenAPI({ platform: '', name: '', _bridge: undefined, name: '', platform: '', _bridge: '' }, inst19);
    inst17 = new homebridge.Logger('Janet Homenick');
    inst18 = new api.RiseGardenAPI({ platform: '1.0.0', name: 'Michael', _bridge: undefined, name: 'Edmond', platform: '^5.0.0', _bridge: '^5.0.0' }, inst17);
    inst15 = new homebridge.Logger('Gail Hoppe');
    inst16 = new api.RiseGardenAPI({ platform: 'v1.2.4', name: 'Edmond', _bridge: undefined, name: 'Michael', platform: '4.0.0-beta1\t', _bridge: '1.0.0' }, inst15);
    inst13 = new homebridge.Logger('Maurice Purdy');
    inst14 = new api.RiseGardenAPI({ platform: '1.0.0', name: 'Jean-Philippe', _bridge: undefined, name: 'Anas', platform: 'v1.2.4', _bridge: 'v4.0.0-rc.4' }, inst13);
    inst11 = new homebridge.Logger('Janet Homenick');
    inst12 = new api.RiseGardenAPI({ platform: 'v1.2.4', name: 'George', _bridge: undefined, name: 'Edmond', platform: '4.0.0-beta1\t', _bridge: '4.0.0-beta1\t' }, inst11);
    inst9 = new homebridge.Logger('Ronald Keeling');
    inst10 = new api.RiseGardenAPI({ platform: '4.0.0-beta1\t', name: 'George', _bridge: undefined, name: 'George', platform: 'v1.2.4', _bridge: '1.0.0' }, inst9);
    inst7 = new homebridge.Logger('Maurice Purdy');
    inst8 = new api.RiseGardenAPI({ platform: 'v4.0.0-rc.4', name: 'Edmond', _bridge: undefined, name: 'Jean-Philippe', platform: '1.0.0', _bridge: '^5.0.0' }, inst7);
    inst5 = new homebridge.Logger('Gail Hoppe');
    inst6 = new api.RiseGardenAPI({ platform: 'v1.2.4', name: 'Anas', _bridge: undefined, name: 'Michael', platform: '^5.0.0', _bridge: '1.0.0' }, inst5);
    inst = new homebridge.Logger('Ronald Keeling');
    inst4 = new api.RiseGardenAPI({ platform: '1.0.0', name: 'Edmond', _bridge: undefined, name: 'Edmond', platform: '^5.0.0', _bridge: 'v4.0.0-rc.4' }, inst);
    inst2 = new homebridge.Logger('Janet Homenick');
    inst3 = new api.RiseGardenAPI({ platform: '1.0.0', name: 'Pierre Edouard', _bridge: undefined, name: 'Anas', platform: 'v4.0.0-rc.4', _bridge: 'v4.0.0-rc.4' }, inst2);
  });

  test('0', async () => {
    await inst3.login('user123', 'accessdenied4u');
  });

  test('1', async () => {
    await inst4.login('user123', '$p3onyycat');
  });

  test('2', async () => {
    await inst6.login('user-name', '$p3onyycat');
  });

  test('3', async () => {
    await inst8.login('username', 'accessdenied4u');
  });

  test('4', async () => {
    await inst10.login('user_name', '$p3onyycat');
  });

  test('5', async () => {
    await inst20.login('', '');
  });
});

// @ponicode
describe('api.RiseGardenAPI.request', () => {
  let inst: any;

  beforeEach(() => {
    inst = new api.RiseGardenAPI();
  });

  test('0', async () => {
    const object: any = [[true, false, true, false], [false, true, false, false], [true, true, true, true], [false, true, false, true]];
    const object2: any = [[false, false, true, false], [false, false, true, true], [false, true, false, true], [true, false, false, false]];
    const object3: any = [[true, false, false, true], [false, true, true, true], [true, true, true, false], [false, true, false, true]];
    const object4: any = [[true, false, true, true], [true, true, false, true], [true, true, true, false], [false, false, false, false]];
    const param3: any = [object, object2, object3, object4];
    await inst.request('POST', '/auth/refresh_token', param3, 'key');
  });

  test('1', async () => {
    const object: any = [[true, true, false, false], [true, true, false, false], [true, false, true, false], [false, false, false, false]];
    const object2: any = [[true, true, false, false], [false, true, true, false], [true, false, true, true], [false, false, true, false]];
    const object3: any = [[true, true, false, true], [true, true, false, false], [true, false, false, true], [true, false, false, true]];
    const object4: any = [[true, false, true, false], [false, false, true, false], [true, true, false, false], [true, true, true, false]];
    const param3: any = [object, object2, object3, object4];
    await inst.request('POST', '/auth/login', param3, 'account');
  });

  test('2', async () => {
    const object: any = [[true, false, true, true], [true, true, false, true], [false, true, true, true], [true, false, false, false]];
    const object2: any = [[true, true, true, false], [true, false, false, true], [true, true, true, true], [false, false, true, true]];
    const object3: any = [[true, true, false, false], [false, false, false, false], [false, true, false, false], [false, false, true, false]];
    const object4: any = [[true, false, true, false], [true, true, true, true], [true, false, false, false], [false, true, true, true]];
    const param3: any = [object, object2, object3, object4];
    await inst.request('POST', '/auth/refresh_token', param3, 'port');
  });

  test('3', async () => {
    const object: any = [[true, false, true, true], [true, true, true, false], [true, false, true, false], [true, false, true, false]];
    const object2: any = [[false, true, false, true], [true, true, false, false], [true, false, false, false], [false, true, true, true]];
    const object3: any = [[true, true, false, true], [true, true, true, true], [false, true, false, true], [true, false, true, true]];
    const object4: any = [[false, false, true, false], [false, true, true, false], [false, true, false, true], [false, false, true, true]];
    const param3: any = [object, object2, object3, object4];
    await inst.request('POST', '/auth/refresh_token', param3, 'effect');
  });

  test('4', async () => {
    const object: any = [[false, true, true, true], [true, false, true, true], [true, false, true, true], [false, false, true, false]];
    const object2: any = [[true, false, true, true], [false, true, false, true], [true, true, false, false], [true, false, true, true]];
    const object3: any = [[false, false, false, true], [true, true, false, false], [false, true, true, true], [false, true, true, true]];
    const object4: any = [[false, false, true, false], [true, true, false, true], [false, true, false, false], [true, true, true, true]];
    const param3: any = [object, object2, object3, object4];
    await inst.request('POST', '/auth/refresh_token', param3, 'effect');
  });

  test('5', async () => {
    await inst.request('', '', [], '');
  });
});
