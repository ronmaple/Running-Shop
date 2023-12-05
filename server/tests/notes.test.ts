import axios from './utils/axios'
import { getToken } from './utils/auth'

describe('notes.test.ts', () => {
  let token
  let headers: any = {}
  beforeAll(async () => {
    await axios.delete('/auth/purge')
    token = await getToken()
    headers.Cookie = `jwt=${token}`
  })
  afterAll(async () => {
    await axios.delete('/auth/purge')
  })

  it('should create note on POST /notes', async () => {
    const params = {
      author: 'ron',
      body: 'Hello',
      completed: false,
    }
    const response = await axios.post('/notes', params, { headers })
    expect(response.data.author).toEqual('ron')
    expect(response.data.body).toEqual('Hello')
    expect(response.data.completed).toEqual(false)
  })

  it('should get note by id on GET /:id', async () => {
    const params = {
      author: 'ron', // todo
      body: 'Hello',
      completed: false,
    }
    let response = await axios.post('/notes', params, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    response = await axios.get(`/notes/${id}`, { headers })
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.author).toEqual('ron')
    expect(response.data.body).toEqual('Hello')
    expect(response.data.completed).toEqual(false)
  })

  it('should get note by keyword on GET /:id', async () => {
    const params = {
      author: 'ron', // todo
      body: 'Hello',
      completed: false,
    }
    let response = await axios.post('/notes', params, { headers })
    expect(response.status).toEqual(201)

    response = await axios.get(`/notes?q=Hel`, { headers })
    expect(response.data.data.length).toBeGreaterThanOrEqual(1)
    expect(response.status).toEqual(200)
    const note = response.data.data[0]
    expect(note.body).toEqual('Hello')
  })

  it('should update note by id on PUT /:id', async () => {
    const params = {
      author: 'ron', // todo
      body: 'Hello',
      completed: false,
    }
    let response = await axios.post('/notes', params, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    response = await axios.put(`/notes/${id}`, { body: 'Changed' }, { headers })
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.author).toEqual('ron')
    expect(response.data.body).toEqual('Changed')
    expect(response.data.completed).toEqual(false)
  })

  it('should delete note by id on DELETE /:id', async () => {
    const params = {
      author: 'ron', // todo
      body: 'Hello',
      completed: false,
    }
    let response = await axios.post('/notes', params, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    response = await axios.delete(`/notes/${id}`, { headers })
    expect(response.status).toEqual(204)
  })
})
