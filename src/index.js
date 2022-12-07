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
      msg.channel.send(msg.author.displayAvatarURL());

    if (msg.content.split(" ")[0] === "!field") {
      let level = msg.content.split(" ")[1];
      msg.channel.send(`레벨 ${level} 에 맞는 사냥터 입니다~~`);
      getFieldBody(URL, level)
        .then((res) => {
          let $fieldData = [];
          const $ = cheerio.load(res.data);
          $(".card_area").map((idx, v) => {
            let fieldInfo = [];
            fieldInfo.push($(v).find("a").text());
            fieldInfo.push($(v).find("p.recommendedLevel").text());
            fieldInfo[2] = [];
            $(v)
              .find("p.monsterName")
              .map((index, vv) => fieldInfo[2].push($(vv).text()));
            fieldInfo.push($(v).find("img").attr("src"));
            $fieldData[idx] = fieldInfo;
          });
          return $fieldData;
        })
        .then((data) => {
          let cnt = 1;
          for (i of data) {
            msg.channel.send(`-----------${cnt}번-----------`);
            msg.channel.send(`사냥터 이름 : ${i[0]}`);
            msg.channel.send(`${i[1]}`);
            msg.channel.send(`출현 몬스터 : ${i[2].join(", ")}`);
            msg.channel.send(i[3]);
            cnt += 1;
          }

          msg.channel.send("즐메하세용~^^");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (e) {
    console.log(e);
  }
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);

const axios = require("axios");
const cheerio = require("cheerio");
const URL = "https://maple.inven.co.kr/db/field";

const levelArea = [
  [1, 30, 1],
  [30, 40, 4],
  [40, 50, 5],
  [50, 60, 6],
  [60, 70, 7],
  [70, 80, 8],
  [80, 90, 9],
  [90, 100, 10],
  [100, 110, 11],
  [110, 120, 12],
  [120, 130, 13],
  [130, 140, 14],
  [140, 150, 15],
  [150, 160, 16],
  [160, 170, 17],
  [170, 180, 18],
  [180, 190, 19],
  [190, 200, 20],
  [200, 210, 21],
  [210, 220, 22],
  [220, 230, 23],
  [230, 240, 24],
  [240, 250, 25],
  [250, 260, 26],
  [260, 270, 27],
  [270, 300, 99],
];

const getFieldBody = async (URL, level) => {
  let filter = 0;
  for (i of levelArea) {
    if (level >= i[0] && level <= i[1]) filter = i[2];
  }
  let res = await axios.get(`${URL}?levelfilter=${filter}`);
  return res;
};
