import 'dotenv/config'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import i18n from 'i18n'
import { Routers } from '@App/routes/router'
import { Database } from '@database/index'
import { WhatsappServiceBot } from '@service/WhatsappServiceBot'

import config from './libs/Initialization'

export class App {
  express: express.Application
  whatsappServiceBot: WhatsappServiceBot
  route: Routers = new Routers()

  constructor() {
    this.express = express();
    i18n.configure(config)
    this.express.use(i18n.init)
    this.express.set('port', process.env.PORT ?? 3333)
    this.middlewares()
    this.database()
    this.route.UseRoutes(this.express)
    this.whatsappService()
  }
  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(cors())
    this.express.use(morgan("tiny"))
  }
  private database(): void {
    new Database()
  }
  private whatsappService(): void {
    this.whatsappServiceBot = new WhatsappServiceBot()
    this.whatsappServiceBot.botInitialize()
  }
}
