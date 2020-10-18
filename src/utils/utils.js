export const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
export const days = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

export function ConvertDate(date) {
  var d = new Date(date);
  return `${d.getDate()} ${months[d.getMonth()]} ${days[d.getDay()]} `;
}
export function sumTimes(first, second) {
  const firstHour = first.includes(0, first.indexOf("."));
  const secondHour = second.includes(0, second.indexOf("."));
  const firstMin = first.includes(first.indexOf("."), first.length - 1);
  const secondMin = first.includes(second.indexOf("."), first.length - 1);
  if (firstMin + secondMin > 60) {
    return `${firstHour + secondHour + 1}.${firstMin + secondMin - 60}`;
  } else if (firstMin + secondMin < 60) {
    return `${firstHour + secondHour}.${firstMin + secondMin}`;
  } else return "hata";
}
export function ConvertTime(date, duration = "30") {
  const d = new Date(date);
  let minutes = d.getMinutes();
  let saat = d.getHours();
  let secondMin = minutes + duration;
  let secondSaat = saat;
  if (secondMin > 60) {
    secondSaat = secondSaat + 1;
  }
  if (minutes == 0) {
    secondMin = duration;
    minutes = "00";
  }
  if (String(saat).length === 1) {
    saat = `0${saat}`;
  }
  if (String(secondSaat).length === 1) {
    secondSaat = `0${secondSaat}`;
  }
  return `${saat}.${minutes} - ${secondSaat}.${secondMin}`;
}
const date = new Date();
export function getMonthNumber(month = "Nisan") {
  const thirdyOne = [
    "Ocak",
    "Mart",
    "Mayıs",
    "Temmuz",
    "Ağustos",
    "Ekim",
    "Aralık",
  ];
  if (thirdyOne.includes(month)) {
    return createByNumberArray(31);
  } else if (month === "Şubat") {
    if (date.getFullYear() % 4 === 0) {
      return createByNumberArray(29);
    } else return createByNumberArray(28);
  } else return createByNumberArray(30);
}

export function createByNumberArray(count) {
  let arr = [];
  for (let i = 1; i <= count; i++) {
    if (String(i).length === 1) {
      arr.push(`0${i}`);
    } else {
      arr.push(i);
    }
  }
  return arr;
}
export function createBySpaceNumberArray(first, second) {
  let arr = [];
  for (let i = first; i <= second + 1; i++) {
    arr.push(i);
  }
  return arr;
}
