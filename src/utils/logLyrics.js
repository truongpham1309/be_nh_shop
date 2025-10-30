import chalk from "chalk";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function typeLine(text, color = chalk.white, speed = 100) {
  for (const char of text) {
    process.stdout.write(color(char));
    await delay(speed);
  }
  process.stdout.write("\n\n");
  await delay(600);
}

async function logLyrics() {
  console.clear();
  console.log(chalk.cyanBright("🎧 Bao tiền một mớ bình yên - 14 Casper x Bon Nghiêm 🎶\n"));
  await delay(1000);

  const colors = [chalk.blue, chalk.yellow, chalk.magenta, chalk.green, chalk.cyan, chalk.whiteBright];

  const lyrics = [
    "Mười giờ văn phòng vẫn sáng đèn",
    "Lại một hôm làm thâu suốt đêm",
    "Bàn chân đau mỏi nhức",
    "Tựa lưng em chợp mắt",
    "Dặn lòng vì cuộc sống êm đẹp",
    "Hạnh phúc không đâu cách xa",
    "Mà ta cứ đi tìm",
    "Vậy xin em một lần",
    "Tự yêu thương lấy mình",
    "Một ngày em được mấy bữa cơm",
    "Đợt này công việc có tốt hơn",
    "Còn ai hay gièm pha",
    "Còn ai luôn rầy la mà xót xa oà lên khóc vô vọng",
    "Cành lá đông qua sẽ rơi",
    "Khổ đau sẽ vơi đời buồn sẽ qua",
    "Mưa tạnh mây tan trời quang",
    "Xin đừng buông xuôi dễ dàng",
    "Dù có lắm phút chốc em lạc lối",
    "Hãy cho mình hồn nhiên một chút thôi",
    "Mặc cho những âu lo ghìm chặt đôi vai",
    "Mặc cho tiếng thở dài đập vào hư không",
    "Dù có những lúc chỉ muốn gục ngã",
    "Má em hồng cười lên để thấy ta",
    "Thật may mắn khi em như một bông hoa",
    "Mọc lên giữa nơi sa mạc cằn cỗi",
    "Chỉ cần vậy thôi",
    "Mua gì em còn phải đắn đo",
    "Cho mình em đừng nên lắng lo",
    "Dù ai có gièm pha",
    "Đừng quan tâm vài ba lời nói xa mà vấp ngã yếu lòng",
    "Chẳng ai thu phí ước mơ",
    "Thì hãy cứ mơ từng giây phút giờ",
    "Em là mây cho trời ban",
    "Xin đừng buông xuôi dễ dàng",
    "Dù có lắm phút chốc em lạc lối",
    "Hãy cho mình hồn nhiên một chút thôi",
    "Mặc cho những âu lo ghìm chặt đôi vai",
    "Mặc cho tiếng thở dài đập vào hư không",
    "Dù có những lúc chỉ muốn gục ngã",
    "Má em hồng cười lên để thấy ta",
    "Thật may mắn khi em như một bông hoa",
    "Mọc lên giữa nơi sa mạc cằn cỗi",
    "Chỉ cần vậy thôi",
    "Đã có ngày tháng năm kia vụn vỡ",
    "Nhưng hãy nhớ tỉnh giấc mơ ngày mai rồi sẽ tốt hơn",
    "Chẳng còn những lúc buốt giá",
    "Dày vò tâm can yếu đuối ngày qua",
    "Cần bao nhiêu lâu để em tìm kiếm",
    "Cần bao nhiêu tiền đổi một mớ bình yên",
    "Chẳng ai bán ai mua ai mần ai mang",
    "Bình yên chứa chan nơi trong lòng nhân gian",
    "Dù có những lúc chỉ muốn gục ngã",
    "Má ửng hồng cười lên để thấy ta",
    "Thật may mắn khi em như một bông hoa",
    "Mọc lên giữa nơi sa mạc cằn cỗi",
    "Chỉ cần vậy thôi"
  ];

  let colorIndex = 0;
  for (const line of lyrics) {
    const color = colors[colorIndex % colors.length];
    await typeLine(`${line + '🎵'}`, chalk.green);
    colorIndex++;
  }

  console.log(chalk.greenBright("\n🎵 ...Hết bài rồi, nhưng bình yên thì còn mãi 💚"));
}

logLyrics();

export default logLyrics;