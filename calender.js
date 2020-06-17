const titleMonth = document.querySelector(".calender_title_month");
const titleYear = document.querySelector(".calender_title_year");
const calenderTable = document.querySelector(".calender-table");
const prevMonthBtn = document.querySelector(".calender_title_prev-month-btn");
const nextMonthBtn = document.querySelector(".calender_title_next-month-btn");
const tbody = document.querySelector("tbody");
const todoTitle = document.querySelector(".todo_list_title");

monthList = ['NOTINUSE','JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];

let today = new Date();
let thisMonth = today.getMonth()+1; 
let thisYear = today.getFullYear();

function deleteRows(num){
    let i = 0;
    // num is the length of Rows. 
    for(i; i < num-1; i++){
        calenderTable.deleteRow(-1);
    }
}

function paintThisMonth(prev, next){
    if(prev){
        const NumOfRows = calenderTable.rows.length;
        deleteRows(NumOfRows);
        thisMonth = thisMonth-1;
        thisMonth < 1 ? (thisMonth=12 , thisYear -= 1 ) : null;
    }
    if(next){
        const NumOfRows = calenderTable.rows.length;
        deleteRows(NumOfRows);
        thisMonth = thisMonth+1;
        thisMonth > 12 ? (thisMonth=1 , thisYear += 1 ) : null;
    }
    let firstDay = new Date(thisYear, thisMonth-1, 1);
    let lastDay = new Date(thisYear, thisMonth, 0);
    let firstDayofWeek = firstDay.getDay();
    // firstdayofWeek 은 0~6(일~토) 을 return함 하지만 이 달력은 월~일. 값이  0일때 달력이 잘못나옴
    // 해결: 0 이 나오면 7로 -> 일요일

    firstDayofWeek = (firstDayofWeek === 0) ? 7 : firstDayofWeek;
    let lastDayDate = lastDay.getDate();
    
    let row = null;
    row = calenderTable.insertRow();
    let count = 0;
    // paint month title
    paintCalenderTitle();
    // 날짜가 시작되기 전 날들(공백셀)만듦
    for (i=0; i<firstDayofWeek-1; i++ ){
        cell = row.insertCell(); 
        count += 1 ;
    }
    // 날짜 생성 (1 ~ 끝 날)
    for (i=1; i<=lastDayDate; i++){
        cell = row.insertCell();
        cell.innerHTML = i;
        count += 1 ;
        //  일요일 색칠 및 새로운 줄 만들기
        if ( count % 7 === 0){
            row = calenderTable.insertRow();
            cell.classList.add("sunday");
        }
        //  today 색칠
        if ( !prev && !next && i === today.getDate()){
            cell.classList.add("selected-date");
            todoTitle.innerHTML = `${cell.innerText}, ${titleMonth.innerHTML}, ${titleYear.innerHTML}`;
        }
    }
}


function paintCalenderTitle(){
    titleMonth.innerHTML = monthList[thisMonth];
    titleYear.innerHTML = thisYear;
}

function handlePrevMonth(){
    let prev = true;
    paintThisMonth(prev);
}
function handleNextMonth(){
    let prev = null;
    let next = true;
    paintThisMonth(prev,next);
}

function removeSelectedAndToday(){
    const prevSelectedDay = document.querySelector(".selected-date");
    const today = document.querySelector(".today");
    prevSelectedDay ? prevSelectedDay.classList.remove("selected-date")
                    : today ? today.classList.remove("today")
                    : null;
}

function handleClickDate(e){
    removeSelectedAndToday();
    const date = e.target.tagName === "TD" ? e.target.innerHTML : null ;
    if(date){
        e.target.classList.add("selected-date");
        // handle todo-list title
        todoTitle.innerHTML = `${date}, ${titleMonth.innerHTML}, ${titleYear.innerHTML}`;

    }
}

function init(){
    
    paintThisMonth();
    // prev, next month button
    prevMonthBtn.addEventListener("click", handlePrevMonth);
    nextMonthBtn.addEventListener("click", handleNextMonth);

    // selecting each date
    tbody.addEventListener("click", handleClickDate)
}

init();