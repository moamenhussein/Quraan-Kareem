let menu = document.querySelector(".menu");
let close = document.querySelector(".close");
let ul = document.querySelector(".header .container .nav ul");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let numOne = document.querySelector(".num-one");
let numTwo = document.querySelector(".num-two");
let index = 0;

menu.addEventListener("click", () => {
  ul.classList.add("active");
});

close.addEventListener("click", () => {
  ul.classList.remove("active");
});

fetch("https://hadis-api-id.vercel.app/hadith/abu-dawud?page=2&limit=300")
  .then((result) => {
    let data = result.json();
    return data;
  })
  .then((data) => {
    document.querySelector(".hadis-content").innerHTML = data.items[index].arab;
    numTwo.innerHTML = data.items.length;

    next.addEventListener("click", () => {
      document.querySelector(".hadis-content").innerHTML =
        data.items[++index].arab;
      numOne.innerHTML++;
      if (index == data.items.length - 1) {
        next.classList.add("solid");
      }
      if (index > 0) {
        prev.classList.remove("solid")
      }
    });
    prev.addEventListener("click", () => {
      document.querySelector(".hadis-content").innerHTML =
        data.items[--index].arab;
      --numOne.innerHTML;
      if (index < data.items.length - 1) {
        next.classList.remove("solid");
      }
      if (index == 0) {
        prev.classList.add("solid")
      }
    });
  });


  window.onload = function() {
    prev.classList.add("solid")
  }