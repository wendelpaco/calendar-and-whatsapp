import { Client, LocalAuth } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
import UserModel from '@App/model/User/UserModel';
import { __ } from 'i18n';

export class WhatsappServiceBot {
  clientConnected: string
  bot: Client

  constructor(){
    this.bot = new Client({ authStrategy: new LocalAuth() })
    this.bot.initialize()
    this.clientConnected = "🟢 Whatsapp web connected to bot 🟢"
  }

  public async botInitialize(){
    try {
      this.bot.on('qr', qr => qrcode.generate(qr, { small: true } ))
      this.bot.on('ready', () => console.log(this.clientConnected) )

      this.bot.on('message', async (msg) => {

        if(msg.body.toUpperCase().includes("CPF")){
          const cpf = msg.body.split(" ")[1]
          const user = await UserModel.findOne({ cpf })
          console.log(user)
          if(!user) return await this.sendMessageFrom(msg.from, __("user_not_found"))
          const messageId = await this.sendMessageFrom(msg.from, JSON.stringify(user))
        }
      })

    } catch(error){
      console.log("Error in connection of API!")
    }
  }

  async sendMessageFrom(from: string, message: string) {
    try {
      const messageId = await this.bot.sendMessage(from, message)
      return messageId.id
    } catch(error){
      console.log("Error send message!")
    }
  }

  async deleteMessageWithId(messageID: any){
    try {

    }catch(error){
      console.log("Error in delete message!")
    }
  }
}
