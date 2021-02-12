require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()


client.on('ready', () => {
    console.log('bot is ready')
})

client.on('message', msg => {
    if (msg.content === "ping"){
        msg.reply("Pong!")
    }
    if (msg.content.includes('griefer')){
        msg.reply("you are talking about Mr.Han, right?")
    }
})

client.login(process.env.BOT_TOKEN)