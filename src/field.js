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

let input = [];

require("readline")
  .createInterface(process.stdin, process.stdout)
  .on("line", (line) => {
    input.push(line);
  })
  .on("close", () => {
    let level = parseInt(input);
    let data = [];
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
        for (i of data) {
          console.log(`사냥터 이름 : ${i[0]}`);
          console.log(`${i[1]}`);
          console.log(`출현 몬스터 : ${i[2].join(", ")}`);
          console.log(i[3]);
          console.log();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
