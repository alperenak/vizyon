const months = [
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
const days = [
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
