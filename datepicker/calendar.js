function calendar(newYear, newMonth) {
  // 1. 무슨 요일에 시작하는지 알아야 한다!
  const time = new Date(newYear, newMonth - 1, 1);
  let year = time.getFullYear(),
    month = time.getMonth(),
    date = time.getDate(),
    day = time.getDay();

  // 2. 해당 월에 날이 며칠이나 있는지!
  // const timeLength = 32 - new Date(newYear, newMonth - 1, 32).getDate() // 4월 32일 = 5월 2일 -> 4월은 30일까지 있으므로.
  const timeLength = new Date(newYear, newMonth, 0).getDate(); // 5월 0일 = 4월 30일

  const captionYear = document.querySelector(".year"),
    captionMonth = document.querySelector(".month"),
    timeEl = document.querySelector("time"),
    days = document.querySelectorAll("tr td");

  for (let i = 0; i < days.length; i++) {
    days[i].innerHTML = "&nbsp;";
  }

  for (let i = day; i < day + timeLength; i++) {
    days[i].textContent = date++;
  }

  captionYear.textContent = year;
  captionMonth.textContent = month + 1;
  timeEl.dateTime = `${year}-${month + 1}`;
}

const btns = document.querySelectorAll("button");
btns.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("prev")) {
      calendar(year, --month);
    } else {
      calendar(year, ++month);
    }
  });
});

let year = new Date().getFullYear(),
  month = new Date().getMonth() + 1;

calendar(year, month);
