import axios from './axios'

export const signup = async (params: {
  email: string
  firstName: string
  password: string
}) => {
  const response = await axios.post('/auth/signup', params)
  return response
}

export const login = async (params: {}) => {
  const response = await axios.post('/auth/login', params)
  return response
}

export const getToken = async (
  user = {
    firstName: 'Ronald',
    lastName: 'McDonald',
    email: 'test@example.com',
    password: 'secret',
  }
) => {
  await signup(user)
  const response = await login(user)
  return response['headers']?.['set-cookie']?.[0].split(';')[0].split('=')[1]
}
