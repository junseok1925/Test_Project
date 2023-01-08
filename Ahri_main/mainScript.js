
// 인사멘트
// let userID = document.querySelector('.userID')
// let id = prompt('방문자 성함을 알려주세요');
// let userid = id;
// userID.innerHTML=`반갑습니다 ${id}님^^`

// 애니매이션 효과
const saTriggerMargin = 300;
const saElementList = document.querySelectorAll('.scroll');

const saFunc = function() {
  for (const element of saElementList) {
    if (!element.classList.contains('show')) {
      if (window.innerHeight > element.getBoundingClientRect().top + saTriggerMargin) {
        element.classList.add('show');
      }
    }
  }
}
window.addEventListener('load', saFunc);
window.addEventListener('scroll', saFunc);

//========================현재 시간========================

let clock = document.querySelector('.clock');

function showClock(){
const date = new Date();
// ${여기안에 넣으면 문자열이 아닌 계산식으로 인식시킨다}

let year = String(date.getFullYear());
let month = String(date.getMonth()+1);
let day = String(date.getDate());
let hour = String(date.getHours()).padStart(2,0);
let min = String(date.getMinutes()).padStart(2,0);
let sec = String(date.getSeconds()).padStart(2,0);
//1시 1분1 초를 01시01분01초처럼 1의 자리수일때 앞에 0을 붙이기 위해사용
//.padStart(최대자릿수,빈자리매꾸는값)
//String을 쓴이유 : .padStart는 문자열만 인식가능해서

clock.innerHTML=`${year}년 ${month}월 ${day}월 ${hour}시 ${min}분 ${sec}초.`;
//html class명 clock에 함수를 넣는다
}
showClock();
//setInterval(showClock,1000);로 인해 새로고침시 1초뒤에 표시되는걸 바로 먼저 나오게 하게
setInterval(showClock,1000);
//showClock함수 1초마다 실행(현재시간이 1초마다 갱신)


//========================아리 나이 초단위까지========================

const AhriAge = document.querySelector('.AhriAge');

function diffDay() {
    //원하는 날짜 지정하기
    const brithDay = new Date("2013-02-03");
    //현재 날짜 뽑아오기
    const todayTime = new Date();
    
    //지정날짜 - 현재날짜 = 
    const diff = todayTime - brithDay;
    
    const diffDay = Math.floor(diff / (1000*60*60*24));
    const diffHour = Math.floor((diff / (1000*60*60)) % 24);
    const diffMin = Math.floor((diff / (1000*60)) % 60);
    const diffSec = Math.floor(diff / 1000 % 60);
    
    AhriAge.innerHTML = `${diffDay}일 ${diffHour}시간 ${diffMin}분 ${diffSec}초.`;
}

diffDay();
setInterval(diffDay, 1000);

//========================아리 생일까지 남은 시간 초단위까지========================

const AhriBirthday = document.querySelector('.AhriBirthday');

function BirthdiffDay() {
    //원하는 날짜 지정하기
    const brithDay = new Date(`2023-02-03`);
    //현재 날짜 뽑아오기
    const todayTime = new Date();
    
    //지정날짜 - 현재날짜 = 
    const diff = brithDay-todayTime;
    
    const diffDay2 = Math.floor(diff / (1000*60*60*24));
    const diffHour2 = Math.floor((diff / (1000*60*60)) % 24);
    const diffMin2 = Math.floor((diff / (1000*60)) % 60);
    const diffSec2 = Math.floor(diff / 1000 % 60);
    
    AhriBirthday.innerHTML = `${diffDay2}일 ${diffHour2}시간 ${diffMin2}분 ${diffSec2}초 남았습니다.`;
}

//========================날씨 뽑아오기========================

const API_KEY = '93222063c13048e2ee959a1231e3217e';
let name = document.querySelector('.name');
let main = document.querySelector('.main');
let temp = document.querySelector('.temp');

function connect(position){
  const lat = position.coords.latitude;
  //현재위치 위도 변수로 저장
  const ion = position.coords.longitude;
  //현재위치 경도 변수로 저장
  const lang = 'kr';
  //언어설정 변수
  console.log(`위도:${lat} 경도${ion}`);
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${ion}&appid=${API_KEY}&units=metric&lang=ko`;
  fetch(URL).then((response) => response.json())
            .then((data) => {
              console.log(data.name); //위치 지역 이름 뽑아내기
              console.log(data.weather[0].main); //날씨뽑아내기
              //배열을 쓴이유 : 개발자창에 저장된 weather배열에 날씨데이터가 들어있어서
              console.log(data.main.temp); //온도 뽑아내기

              if(data.main.temp<0){
                temp.innerHTML = data.main.temp + '℃'+' 영하로 떨어지니까 우리 아리 감기걸려 산책생략...'; // ㄹ 누르고 한자키
              }else if(10>data.main.temp>0){
                temp.innerHTML = data.main.temp + '℃'+' 아직은 추우니까 후딱 산책갔다오기'
              }else if(25>data.main.temp>10){
                temp.innerHTML = data.main.temp + '℃'+' 거 산책하기 딱~ 좋은 날씨네~'
              }else{
                temp.innerHTML = data.main.temp + '℃'+' 산책은 무슨 에어컨틀고 잠이나 자자~'
              }


              name.innerHTML = data.name;
              main.innerHTML = data.weather[0].main;
              // temp.innerHTML = data.main.temp + '℃'; // ㄹ 누르고 한자키
            });
}
function errorConn(event){
  alert('위치연결 실패')
}

navigator.geolocation.getCurrentPosition(connect,errorConn);
//내장된 함수코드

