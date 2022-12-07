const axios = require("axios");
const cheerio = require("cheerio");
const URL = "https://maplestory.nexon.com/Ranking/World/Total";

const getRankBody = async (URL, name) => {
  let res = await axios.get(`${URL}?c=${name}`);
  console.log(`${URL}?c=${name}`);
  return res;
};

let input = [];

require("readline")
  .createInterface(process.stdin, process.stdout)
  .on("line", (line) => {
    input.push(line);
  })
  .on("close", () => {
    let name = input.shift();
    getRankBody(URL, name)
      .then((res) => {
        const $ = cheerio.load(res.data);
        let data = [];
        data.push(
          $("tr.search_com_chk")
            .find("td")
            .map((idx, v) => $(v).text())
        );
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
