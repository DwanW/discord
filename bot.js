require("dotenv").config();
const {
  getRandomWord,
  getRandomWordWithDefinition,
  getOpenAPICompletionResponse,
} = require("./scripts");
const { GrieferString } = require("./data");

const OpenAI = require("openai-api");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openAI = new OpenAI(OPENAI_API_KEY);

const { Client, MessageEmbed } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILDS",
  ],
});

client.once("ready", () => {
  console.log("bot is ready!");
});

client.on("messageCreate", async (msg) => {
  if (msg.content.startsWith("!c ") && msg.content.length > 3) {
    const messagePosted = msg.content.slice(3).trim();
    const reply = await getOpenAPICompletionResponse(openAI, messagePosted);
    msg.reply(reply);
  }
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
        "!r :generate a random word with definition \n!e :generate random word \n!c <message> : generate response from ai"
      );
    msg.channel.send({ embeds: [embed] });
  }
  if (msg.content === "!nb") {
    if (msg.author.discriminator === "0013") {
      if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
        connection.play("voice-nb.mp3").on("finish", () => {
          msg.member.voice.channel.leave();
        });
      }
      msg.channel.send("?");
    } else {
      msg.reply("Only <griefer> has access to this command");
    }
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

client.login(process.env.BOT_TOKEN);
