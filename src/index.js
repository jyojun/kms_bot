const { config } = require("dotenv");

config();

// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require("discord.js");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.on("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  try {
    // !ping
    if (msg.content === "!ping") msg.channel.send(`pong!`); // 채팅에서 메세지가 들어왔을 때 실행할 콜백함수입니다.

    if (msg.content === "!avatar")
      msg.channel.send(msg.author.displayAvatarURL()); // 메세
  } catch (e) {
    console.log(e);
  }
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);
