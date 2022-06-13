const qrcode = require('qrcode-terminal')
const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js')

const client = new Client({ authStrategy: new LocalAuth() })
client.on('qr', qr => {
  console.log(qr)
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('client is ready')
})

client.on('message', async (msg) => {
  const msgSend = await client.sendMessage(msg.from, "TESTANDO")
  const msgSend2 = await client.sendMessage(msg.from, `a mensagem de id ${msgSend.id} será apaga em 10 segundos`)
  
  console.log('====================================================================')
  console.log(`a mensagem de id ${msgSend.id} será apaga em 10 segundos`)
  setTimeout(() => { 
    msgSend2.delete(true)
    msgSend.delete(true)
    console.log('====================================================================')
    console.log(`mensagem de id ${msgSend.id} apagada`)
    client.sendMessage(msg.from, `mensagem de id ${msgSend.id} apagada`)
    console.log('====================================================================')
  }, 10000)
})

function getMediaFromPath(path){
  return MessageMedia.fromFilePath(path)
}


client.initialize()