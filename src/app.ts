import 'reflect-metadata'
import express from 'express'
import { router } from './routes'
import { createConnection } from 'typeorm'

const app = express()

app.use(express.json())
app.use(router)
createConnection()

export { app }
