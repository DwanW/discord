require("dotenv").config();
const { getRandomWord } = require("./scripts");

const { Client, MessageEmbed } = require("discord.js");
const client = new Client();

client.on("ready", () => {
  console.log("bot is ready");
});

client.on("message", async (msg) => {
  if (msg.content === "!r") {
    try{
    const replyMessage = await getRandomWord()
    await msg.reply(`${replyMessage.word}, it means ${replyMessage.definition}`);
    }catch(err){
      console.log(err)
    }
  }
  if(msg.content === "!help"){
    msg.channel.send('!r -generate a random word')
  }
  if (msg.content.includes("griefer")) {
    msg.reply("you are talking about Mr.Han, right?");
  }
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "general"
  );
  if (!channel) return;
  channel.send(
    `Welcome to the server, ${member}, the only reason you are here is for the memes`
  );
});

client.on("message", (message) => {
  if (message.content === "how to embed") {
    const embed = new MessageEmbed()
      .setTitle("A slick little embed")
      .setColor(0xff0000)
      .setDescription("Hello, this is a slick embed!");
    message.channel.send(embed);
  }
});

// client.on("messageDelete", (message) => {
//   message.reply(`${message}, is what you deleted.`);
// });

// client.on("typingStart", (channel, user) => {
//   channel.send(
//     `${user.username} is about to reveal some hidden secrets, listen up everyone!`
//   );
// });

client.login(process.env.BOT_TOKEN);
