/* global fetch */

import * as API from 'constant/api'

const post = async (url, query, headers) => {
  const response = await fetch(process.env.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      headers,
      query,
      url
    })
  })

  return await response.json()
}

export const loggedIn = (session) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await post(API.AUTH_LOGGED_IN, null, { session })

      if (response && response.body) {
        resolve(response.body.user)
      } else {
        reject(response)
      }
    } catch (error) {
      reject(error)
    }
  })

export const login = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const response =
        await post(API.AUTH_LOGIN, {
          email,
          password
        })

      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const logout = (session) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await post(API.AUTH_LOGOUT, null, { session })

      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
