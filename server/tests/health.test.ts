import axios from './utils/axios'

describe('health.test.ts', () => {
  it('should return OK when GET /health', async () => {
    const response = await axios.get('/health')
    expect(response.data).toEqual('OK');
  })
})