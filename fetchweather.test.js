const { fetchweather } = require('./weather');
const https = require('https');
const { PassThrough } = require('stream');

jest.mock('https');

describe('fetchweather', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns weather data on success', async () => {
    const mockData = JSON.stringify({
      current_condition: [{
        temp_C: "25",
        weatherDesc: [{ value: "Sunny" }]
      }]
    });

    const res = new PassThrough();
    res.statusCode = 200;

    https.get.mockImplementation((url, callback) => {
      callback(res);
      res.end(mockData);
      return { on: jest.fn() };
    });

    const result = await fetchweather('Durban');
    expect(result).toEqual({ city: 'Durban', tempC: "25", desc: "Sunny" });
  });
});
