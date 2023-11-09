let menu = document.querySelector(".menu");
let close = document.querySelector(".close");
let ul = document.querySelector(".header .container .nav ul");
let upBtn = document.querySelector(".up");
let next = document.querySelector(".next");
let nextBtn = document.querySelector(".number-container .nextbtn");

let nextDone = document.querySelector(".nextDone");
let prevDone = document.querySelector(".prevDone");
let prev = document.querySelector(".prev");
let prevBtn = document.querySelector(".prevbtn");

let numOne = document.querySelector(".num-one");
let numberOne = document.querySelector(".numberOne");

let paragraphContent = document.querySelector(".paragraph-para");
let numTwo = document.querySelector(".num-two");
let tasbiha = document.querySelector(".tasbiha-container .tasbiha");
let countTasbiha = document.querySelector(".tasbiha-container .count");
let discription = document.querySelector(".tasabieh-contentet .discription");
let tasabiehCount = document.querySelector(".tasabieh-count");
let index = 0;
let count = 0;
menu.addEventListener("click", () => {
  ul.classList.add("active");
});

close.addEventListener("click", () => {
  ul.classList.remove("active");
});

window.onscroll = function () {
  if (scrollY >= 200) {
    upBtn.classList.add("right");
  } else {
    upBtn.classList.remove("right");
  }
};

upBtn.addEventListener("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

fetch("https://www.hisnmuslim.com/api/ar/27.json")
  .then((result) => {
    let data = result.json();
    return data;
  })
  .then((data) => {
    document.querySelector(".hadis-content").innerHTML =
      data[Object.keys(data)][index].ARABIC_TEXT;
    numTwo.innerHTML = data[Object.keys(data)].length;

    next.addEventListener("click", () => {
      document.querySelector(".hadis-content").innerHTML =
        data[Object.keys(data)][++index].ARABIC_TEXT;
      numOne.innerHTML++;
      if (index == data[Object.keys(data)].length - 1) {
        next.classList.add("solid");
      }
      if (index > 0) {
        prev.classList.remove("solid")
      }
    });
    prev.addEventListener("click", () => {
      document.querySelector(".hadis-content").innerHTML =
        data[Object.keys(data)][--index].ARABIC_TEXT;
      --numOne.innerHTML;
      if (index < data[Object.keys(data)].length - 1) {
        next.classList.remove("solid");
      }
      if (index == 0) {
        prev.classList.add("solid")
      }
    });
  });

fetch(
  "https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json"
)
  .then((result) => {
    let data = result.json();
    return data;
  })
  .then((data) => {
    tasbiha.innerHTML = data.تسابيح[count].content;
    countTasbiha.innerHTML = `${data.تسابيح[count].count} مرة`;
    discription.innerHTML = data.تسابيح[count].description;
    tasabiehCount.innerHTML = data.تسابيح.length;
    nextBtn.addEventListener("click", () => {
      tasbiha.innerHTML = data.تسابيح[++count].content;

      countTasbiha.innerHTML = `${data.تسابيح[count].count} مرة`;
      discription.innerHTML = data.تسابيح[count].description;
      numberOne.innerHTML++;
      if (count == data.تسابيح.length - 1) {
        nextBtn.classList.add("solid");
      }
      if (count > 0) {
        prevBtn.classList.remove("solid")
      }
    });
    prevBtn.addEventListener("click", () => {
      tasbiha.innerHTML = data.تسابيح[--count].content;
      countTasbiha.innerHTML = `${data.تسابيح[count].count} مرة`;
      discription.innerHTML = data.تسابيح[count].description;
      numberOne.innerHTML--;
      if (count < data.تسابيح.length - 1) {
        nextBtn.classList.remove("solid");
      }
      if (count == 0) {
        prevBtn.classList.add("solid")
      }
    });
  });

  window.onload = function() {
    prevBtn.classList.add("solid")
    prev.classList.add("solid")
  }