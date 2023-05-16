import monthNames from "./monthName.js";

const days = document.querySelectorAll(".day");
const calendar = document.querySelector(".calendar");
const openBtn = document.querySelector(".calendar-open-btn");
const captionYear = document.querySelector(".year");
const captionMonth = document.querySelector(".month");
const timeEl = document.querySelector("time");
const monthBtns = document.querySelectorAll('[class$="month"]');

let calendarYear, calendarMonth, selectYear, selectMonth, selectDate;

const today = new Date();
const todayYear = today.getFullYear(),
  todayMonth = today.getMonth() + 1,
  todayDate = today.getDate();

function makingCalendar(newYear, newMonth) {
  const time = new Date(newYear, newMonth - 1, 1); // 2023, 4, 1 -> 2023, 5, 1
  let year = time.getFullYear(),
    month = time.getMonth(), // 4
    date = time.getDate(),
    day = time.getDay();

  captionYear.textContent = year;
  captionMonth.textContent = monthNames[month];
  timeEl.dateTime = `${year}-${month + 1}`;

  const timeLength = new Date(year, month + 1, 0).getDate(); // 5, 0 -> 6월 0일 =  5월 30일
  const lastMonthTimeLength = new Date(year, month, 0).getDate(); // 4 ,0 -> 5월 0일 = 4월 31일

  let lastMonthDate = lastMonthTimeLength - day + 1;
  let newMonthDate = 1;

  for (let i = 0; i < 42; i++) {
    days[i].classList.remove("prev-month-transparent");
    days[i].classList.remove("next-month-transparent");
    days[i].classList.remove("sunday");
    days[i].classList.remove("select-day");
    days[i].classList.remove("today");
    days[i].classList.remove("not-hover");

    if (i < day) {
      days[i].textContent = lastMonthDate++;
      days[i].classList.add("prev-month-transparent");
    } else if (i < day + timeLength) {
      days[i].textContent = date++;
      if (i % 7 === 0) {
        days[i].classList.add("sunday");
      }

      // 선택한 날짜 표시
      if (selectYear === year && selectMonth === month + 1) {
        if (i === selectDate + (day - 1)) {
          days[i].classList.add("select-day");
        }
      }

      // 오늘 날짜 표시
      if (todayYear === year && todayMonth === month + 1) {
        if (i === todayDate + day - 1) {
          days[i].classList.add("today");
        }
      }
    } else {
      if (day + timeLength < 35 && i >= 35) {
        days[i].innerHTML = "&nbsp;";
        days[i].classList.add("not-hover");
      } else {
        days[i].textContent = newMonthDate++;
        days[i].classList.add("next-month-transparent");
      }
    }
  }
}

calendar.addEventListener("click", (event) => {
  openBtn.classList.remove("focus");

  if (event.target.classList.contains("day")) {
    const captionMonthText = captionMonth.textContent;
    const value = event.target.textContent;

    selectYear = parseInt(captionYear.textContent);
    selectMonth = monthNames.findIndex((item) => item === captionMonthText) + 1;
    selectDate = parseInt(value);

    if (event.target.classList.contains("prev-month-transparent")) {
      selectMonth = selectMonth - 1;
    } else if (event.target.classList.contains("next-month-transparent")) {
      selectMonth = selectMonth + 1;
    }

    openBtn.value = openBtn.textContent = `${selectYear}-${
      selectMonth < 10 ? `0${selectMonth}` : selectMonth
    }-${selectDate < 10 ? `0${selectDate}` : selectDate}`;

    console.log(openBtn.value);

    calendar.classList.remove("active");
  }
});

monthBtns.forEach((item) =>
  item.addEventListener("click", (event) => {
    if (event.currentTarget.classList.contains("prev-month")) {
      makingCalendar(calendarYear, --calendarMonth);
    } else {
      makingCalendar(calendarYear, ++calendarMonth);
    }
  })
);

function calendarOpen() {
  openBtn.classList.add("focus");
  calendar.classList.add("active");

  if (!openBtn.value) {
    calendarYear = todayYear;
    calendarMonth = todayMonth;
    makingCalendar(calendarYear, calendarMonth);
  } else {
    calendarYear = selectYear;
    calendarMonth = selectMonth;
    makingCalendar(selectYear, selectMonth, selectDate);
  }
}

openBtn.addEventListener("click", calendarOpen);

document.querySelector(".backdrop").addEventListener("click", () => {
  openBtn.classList.remove("focus");
  calendar.classList.remove("active");
});
