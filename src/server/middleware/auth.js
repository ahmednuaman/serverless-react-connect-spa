import * as DB from 'constant/db'
import { config } from 'config'
import { dbDelete, dbGet, dbPut } from 'service/db'
import bcrypt from 'bcrypt'
import moment from 'moment'
import uid from 'uid-safe'

const getSession = async (id) => await dbGet(DB.USER_SESSION_TABLE, { id })

const putSession = async (user, sessionId) => {
  const {
    session: {
      ttl: { unit, value }
    }
  } = config

  const id = sessionId || await uid(255)
  const ttl = moment().add(value, unit).unix()

  await dbPut(DB.USER_SESSION_TABLE, {
    id,
    ttl,
    user
  })

  return id
}

export const session = () => async (req, res, next) => {
  const sessionId = req.headers.session

  if (sessionId) {
    try {
      const {
        Item: session
      } = await getSession(sessionId)

      const {
        Item: user
      } = await dbGet(DB.USER_TABLE, {
        email: session.user.email
      })

      delete user.password

      req.user = user

      await putSession(user, sessionId)
    } catch (error) {
      res
        .status(500)
        .end(error)
    }
  }

  next()
}

export const authenticate = async (req, res, next) => {
  const { email, password } = req.query

  try {
    const {
      Item: user
    } = await dbGet(DB.USER_TABLE, { email })

    const valid = await bcrypt.compare(password, user.password)

    if (valid) {
      delete user.password

      const sessionId = await putSession(user)

      res.setHeader('session', sessionId)

      req.user = user
    } else {
      delete req.user
      delete res.user

      res.removeHeader('session')
      res
        .status(401)
        .end()
    }

    next()
  } catch (error) {
    res
      .status(500)
      .end(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    await dbDelete(DB.USER_SESSION_TABLE, {
      id: req.headers.session
    })

    res.removeHeader('session')

    delete req.user
    delete res.user

    next()
  } catch (error) {
    res
      .status(400)
      .end(error)
  }
}

export const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res
      .status(401)
      .end()
  }
}

export const isLoggedOut = (req, res, next) => {
  if (!req.user) {
    next()
  } else {
    res
      .status(401)
      .end()
  }
}
