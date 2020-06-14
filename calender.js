const titleMonth = document.querySelector(".calender_title_month");
const titleYear = document.querySelector(".calender_title_year");
const calenderTable = document.querySelector(".calender-table");

monthList = ['NOTINUSE','JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];

const today = new Date();
const thisMonth = today.getMonth()+1; 

const thisYear = today.getFullYear();

const firstDay = new Date(thisYear, thisMonth-1, 1);
const firstDayDate = firstDay.getDate();
const firstDayofWeek = firstDay.getDay();

const lastDay = new Date(thisYear, thisMonth, 0);
const lastDayDate = lastDay.getDate();

function paintThisMonth(){
    let row = null;
    row = calenderTable.insertRow();
    let count = 0;
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
        if ( i === today.getDate()){
            cell.classList.add("today");
        }
    }
}


function paintCalenderTitle(){
    titleMonth.innerHTML = monthList[thisMonth];
    titleYear.innerHTML = thisYear;
}
paintThisMonth();
paintCalenderTitle();

