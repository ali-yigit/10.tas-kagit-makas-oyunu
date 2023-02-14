// const yourChoice = document.getElementById("your-choice")
// const tasImage = document.querySelector(".tas")
// const kagitImage = document.querySelector(".kagit");
// const makasImage = document.querySelector(".makas");

// tasImage.addEventListener('click',(e)=>{
//     console.log(e)
//     yourChoice.innerHTML = `<img src="./assets/tas.png"></img>`
// })

// kagitImage.addEventListener('click',(e)=>{
//     console.log(e)
//     yourChoice.innerHTML = `<img src="./assets/kagit.png"></img>`;
// })

// makasImage.addEventListener('click',(e)=>{
//     console.log(e)
//     yourChoice.innerHTML = `<img src="./assets/makas.png"></img>`;
// })

//!değişkenleri yakalıyoruz
/*tıklanan değişken*/
const yourChoice = document.getElementById("your-choice");

/*hedef*/
const select = document.querySelector(".select");

/**değişkende tutmak için */
let userSelect;

/*pcnin seçimi için değişken*/
const pcChoice = document.getElementById("pc-choice");
let pcRandom;

//score yazabilmek için
const scoreYou = document.getElementById("you");
const scorePc = document.getElementById("pc");

// Modal Selectors sonuç kısmnda
const resultDiv = document.querySelector(".result-msg");
const containerEl = document.querySelector(".container");
const modalEl = document.querySelector(".modal-container");
const modalBtn = document.querySelector("#modal-ok");

//top score kısmını yakaladık
const domTopScore= document.querySelector(".top-score")

//sonuç mesajı için
const final = document.getElementById("final");

//!event listener
/*kullanıcının seçimi*/
select.addEventListener("click", (e) => {
  //   console.log(e.target.className);
  //   console.log(e.target.getAttribute("alt"));

  /*   seçili divin içinde boşluğa basınca null olmaması için "e.target.getAttribute("alt")" if ile yazacağız*/
  if (e.target.getAttribute("alt")) {
    userSelect = e.target.getAttribute("alt");
    yourChoice.innerHTML = `<img src="./assets/${userSelect}.png"></img>`;
    pc(); //değer atamak için fonksiyon yazacağız aşağıda
  }
});

//array yaptık ve içinden seçim yapıcaz.
const pcArr = ["tas", "kagit", "makas"];
function pc() {
  pcRandom =
    pcArr[
      Math.floor(Math.random() * 3)
    ]; /* 0 1 2 üretiyor ve arryimizdeki index nolarından seçim yapıyor böylece*/

  console.log(pcRandom);

  //   ekranda yazsın diye
  pcChoice.innerHTML = `<img src="./assets/${pcRandom}.png"></img>`;
  result();
}

function result() {
  //seçimleri karşılaştırmak için
  switch (userSelect) {
    case "tas":
      if (pcRandom == "kagit") {
        lost(); /*aşagıda kod uzamasın diye fonksiyon tanımladık ve burda çagırdık*/
      } else if (pcRandom == "makas") {
        win();
      }
      break;
    case "kagit":
      if (pcRandom == "makas") {
        lost();
      } else if (pcRandom == "tas") {
        win();
      }
      break;
    case "makas":
      if (pcRandom == "tas") {
        lost();
      } else if (pcRandom == "kagit") {
        win();
      }
      break;

    default:
      break;
  }
  /*beraberlik durumu*/
  if (userSelect == pcRandom) {
    resultDiv.classList.add("active");
    resultDiv.innerHTML = "it is a draw";
    containerEl.style.boxShadow = "3px 3px 10px 1px #FFC538";
    resultDiv.style.backgroundColor = "#FFC538";
  }

  /*score 10 olana kadar çalışsın ve top score ben kazandığımda 10 olacak*/
  if (scoreYou.innerText == '10') {
    final.innerHTML = `💃 You Win🕺`;
    document.querySelector(".modal").style.backgroundColor = "#5AB7AC";
    modalBtn.style.color = "#5AB7AC";
    topScoreCheck()
  }

  if(scorePc.innerText=='10' || scoreYou.innerText == '10'){
modal()
  }
}

//yukarda çağırdığımız fonksiyonlar
function lost() {
  resultDiv.classList.add("active");
  resultDiv.innerHTML = "you lost";
  containerEl.style.boxShadow = "3px 3px 10px 1px #fb778b";
  resultDiv.style.backgroundColor = "#fb778b";
  scorePc.innerText++;
}

function win() {
  resultDiv.classList.add("active");
  resultDiv.innerHTML = "you win";
  containerEl.style.boxShadow = "3px 3px 10px 1px #5AB7AC";
  resultDiv.style.backgroundColor = "#5AB7AC";
  scoreYou.innerText++;
}

// modal kullanımı aç
function modal(){
    modalEl.classList.add("show") /*show classı ekledik ve css de ki kısmı çağırdık*/
}

//sayfayı yenilemek için buton 
modalBtn.addEventListener("click", ()=>{
    modalEl.classList.remove("show") /*eklediğimiz classı kaldırdık*/
    // modalEl.style.display="none";
    window.location.reload()/*sayfayı yeniler*/
})


//LOcal storeage de hih score u çek

let storagedScore= localStorage.getItem("highScore")
console.log(storagedScore);

let topScore; //ekrana yazılacak değer

//local storage boş ise 0-0 yazdırmak için
if(storagedScore){
    topScore= `10 - ${storagedScore}`
} else{
    topScore = "0- 0"
}

//top score u dom a yazdır
domTopScore.innerText= topScore;

function topScoreCheck(){

    /*null olmasın diye. set item ile local storeage yazılıyor ve yukarda get itemla bu bilgi çekiliyor*/
    storagedScore || localStorage.setItem("highScore", +scorePc.innerText)
    if(storagedScore >= scorePc.innerText){
localStorage.setItem("highScore", +scorePc.innerText)
    }
}