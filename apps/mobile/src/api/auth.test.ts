import MockAdapter from '@core/network/MockAdapter';
import {AuthActions} from './auth';

describe('[API] - [Auth]', () => {
  const mockedLoginInput = {
    username: 'someUser',
    password: 'password',
  };
  const mockedLoginResponse = {
    accessToken: 'dummy_token',
    name: 'someUser',
  };

  const mockedAxios = new MockAdapter().mockAxios;

  afterEach(() => {
    mockedAxios.reset();
  });

  describe('Login API', () => {
    test('should resolve login response on success', async () => {
      mockedAxios.onPost('/login').reply(200, mockedLoginResponse);

      const result = await AuthActions.login(mockedLoginInput);

      expect(mockedAxios.history.post[0].url).toEqual('/login');
      expect(result).toEqual(mockedLoginResponse);
    });

    test('should reject with error on failure ', async () => {
      mockedAxios.onPost('/login').networkErrorOnce();
      await expect(AuthActions.login(mockedLoginInput)).rejects.toBeTruthy();
    });
  });
});
