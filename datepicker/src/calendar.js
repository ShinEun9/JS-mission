import monthNames from "./monthName.js";
import "./style.css";

const days = document.querySelectorAll(".day");
const calendar = document.querySelector(".calendar");
const openBtn = document.querySelector(".calendar-open-btn");
const backDrop = document.querySelector(".backdrop");
const captionYear = document.querySelector(".year");
const captionMonth = document.querySelector(".month");
const timeEl = document.querySelector("time");

let calendarYear, calendarMonth;
let selectYear, selectMonth, selectDate;
const today = new Date();
const todayYear = today.getFullYear(),
  todayMonth = today.getMonth() + 1,
  todayDate = today.getDate();

function makingCalendar(parameterYear, parmeterMonth) {
  const time = new Date(parameterYear, parmeterMonth - 1, 1); // 2023, 5-1, 1 -> 2023,4,1 -> 2023년 5월 1일
  let year = time.getFullYear(),
    month = time.getMonth() + 1,
    date = time.getDate(),
    day = time.getDay();

  // * 달력 제목 수정
  captionYear.textContent = year;
  captionMonth.textContent = monthNames[month];
  timeEl.dateTime = `${year}-${month}`;

  // * 이번달이 며칠까지인지, 저번달이 며칠까지 인지 계산
  const thisMonthTimeLength = new Date(year, month, 0).getDate(); // 5, 0 -> 6월 0일 = 5월 30일
  const lastMonthTimeLength = new Date(year, month - 1, 0).getDate(); // 4 ,0 -> 5월 0일 = 4월 31일

  // * 달력 그리기
  for (let i = 0; i < 42; i++) {
    days[i].classList.remove("prev-month-transparent");
    days[i].classList.remove("next-month-transparent");
    days[i].classList.remove("sunday");
    days[i].classList.remove("select-day");
    days[i].classList.remove("today");
    days[i].classList.remove("not-hover");

    // 이전 달 날짜 표시
    if (i < day) {
      days[i].textContent = lastMonthTimeLength - day + 1 + i;
      days[i].classList.add("prev-month-transparent");
    }
    // 해당 월 1일부터 말일까지 표시
    else if (i < day + thisMonthTimeLength) {
      days[i].textContent = date++;
      if (i % 7 === 0) {
        days[i].classList.add("sunday");
      }

      // 선택한 날짜 표시
      if (selectYear === year && selectMonth === month) {
        if (i === day - 1 + selectDate) {
          days[i].classList.add("select-day");
        }
      }

      // 오늘 날짜 표시
      if (todayYear === year && todayMonth === month) {
        if (i === day - 1 + todayDate) {
          days[i].classList.add("today");
        }
      }
    }
    // 다음달 날짜 표시
    else {
      if (day + thisMonthTimeLength < 35 && i >= 35) {
        days[i].innerHTML = "&nbsp;";
        days[i].classList.add("not-hover");
      } else {
        days[i].textContent = i + 1 - (day + thisMonthTimeLength);
        days[i].classList.add("next-month-transparent");
      }
    }
  }
}

calendar.addEventListener("click", (event) => {
  openBtn.classList.remove("focus");

  // * 날짜 버튼을 클릭했을 때
  if (event.target.classList.contains("day")) {
    const selectedDateValue = event.target.textContent;

    selectYear = parseInt(captionYear.textContent);
    selectMonth = monthNames.findIndex(
      (item) => item === captionMonth.textContent
    );
    selectDate = parseInt(selectedDateValue);

    // 이전 달의 날짜 또는 다음 달의 날짜를 눌렀을 때 month를 조정해줘야한다.
    if (event.target.classList.contains("prev-month-transparent")) {
      selectMonth -= 1;
      if (selectMonth === 0) {
        selectYear -= 1;
        selectMonth = 12;
      }
    } else if (event.target.classList.contains("next-month-transparent")) {
      selectMonth += 1;
      if (selectMonth === 13) {
        selectYear += 1;
        selectMonth = 1;
      }
    }

    openBtn.value = openBtn.textContent = `${selectYear}-${
      selectMonth < 10 ? `0${selectMonth}` : selectMonth
    }-${selectDate < 10 ? `0${selectDate}` : selectDate}`;

    calendar.classList.remove("active");
    console.log(openBtn.value);
  }

  // * 월 변경 버튼을 클릭했을 때
  else if (event.target.closest("button")) {
    if (event.target.closest("button").classList.contains("prev-month")) {
      makingCalendar(calendarYear, --calendarMonth);
    } else {
      makingCalendar(calendarYear, ++calendarMonth);
    }
  }
});

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
    makingCalendar(calendarYear, calendarMonth);
  }
}

function calendarClose() {
  openBtn.classList.remove("focus");
  calendar.classList.remove("active");
}

openBtn.addEventListener("click", calendarOpen);
backDrop.addEventListener("click", calendarClose);
