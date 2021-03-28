require("dotenv").config();
const { getRandomWord, getRandomWordWithDefinition } = require("./scripts");
const { GrieferString } = require("./data");

const { Client, MessageEmbed } = require("discord.js");
const client = new Client();

client.on("ready", () => {
  console.log("bot is ready");
});

client.on("message", async (msg) => {
  if (msg.content === "!r") {
    if (msg.author.discriminator === "0013") {
      let griefCheck = Math.random() > 0.85;
      if (griefCheck) {
        msg.reply(GrieferString[Math.floor(Math.random() * 3)]);
      } else {
        try {
          const replyMessage = await getRandomWordWithDefinition();
          await msg.reply(
            `${replyMessage.word}, it means ${replyMessage.definition}`
          );
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      try {
        const replyMessage = await getRandomWordWithDefinition();
        await msg.reply(
          `${replyMessage.word}, it means ${replyMessage.definition}`
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (msg.content === "!e") {
    if (msg.author.discriminator === "0013") {
      let griefCheck = Math.random() > 0.5;
      if (griefCheck) {
        msg.reply(GrieferString[Math.floor(Math.random() * 3)]);
      } else {
        try {
          const replyMessage = await getRandomWord();
          await msg.reply(`${replyMessage}`);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      try {
        const replyMessage = await getRandomWord();
        await msg.reply(`${replyMessage}`);
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (msg.content === "!h") {
    const embed = new MessageEmbed()
      .setTitle("Bot Command")
      .setColor(0xff00ff)
      .setDescription(
        "!r :generate a random word with definition \n!e :generate random word"
      );
    msg.channel.send(embed);
  }
  // if (msg.content === "!nb") {
  //   if (msg.author.discriminator === "0013") {
  //     msg.channel.send("?");
  //     setTimeout(() => msg.channel.send("我为什么说我自己牛逼"), 2000);
  //   } else {
  //     if (msg.member.voice.channel) {
  //       const connection = await msg.member.voice.channel.join();
  //       connection.play("voice-nb.mp3").on("finish", () => {
  //         msg.member.voice.channel.leave();
  //       });
  //     }
  //     msg.channel.send("韩师傅牛逼 - Master Han is Awesome");
  //   }
  // }
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
