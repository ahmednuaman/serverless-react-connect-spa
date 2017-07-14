import { DynamoDB } from 'aws-sdk'
import { config } from 'config'

const {
  custom: {
    dynamodb: {
      start: { port }
    }
  },
  resources: { Resources }
} = require('base/serverless.yml')

export const endpoint = process.env.IS_OFFLINE ? `http://localhost:${port}` : undefined
const client = new DynamoDB.DocumentClient({ ...config.aws, endpoint })

const dbResponseHandler = (resolve, reject) => (error, data) => {
  if (error) {
    reject(error)
  } else {
    resolve(data)
  }
}

export const getTableName = (key) =>
  Resources[key].Properties.TableName.replace('${self:provider.stage}', process.env.STAGE) // eslint-disable-line

export const dbDelete = (table, Key) =>
  new Promise((resolve, reject) => {
    const TableName = getTableName(table)

    console.log('dbDelete', TableName, Key)

    client.delete({
      Key,
      TableName
    }, dbResponseHandler(resolve, reject))
  })

export const dbGet = (table, Key) =>
  new Promise((resolve, reject) => {
    const TableName = getTableName(table)

    console.log('dbGet', TableName, Key)

    client.get({
      Key,
      TableName
    }, dbResponseHandler(resolve, reject))
  })

export const dbPut = (table, Item) =>
  new Promise((resolve, reject) => {
    const TableName = getTableName(table)

    console.log('dbPut', TableName, Item)

    client.put({
      Item,
      TableName
    }, dbResponseHandler(resolve, reject))
  })
