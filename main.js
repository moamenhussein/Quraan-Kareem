let menu = document.querySelector(".menu");
let close = document.querySelector(".close");
let ul = document.querySelector(".header .container .nav ul");
let upBtn = document.querySelector(".up");
let input = document.querySelector("input");
let search = document.querySelector(".search");

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

search.addEventListener("click", () => {
  if (input.value === "") {
    document.querySelector(".result").innerHTML = `
      ادخل اسم المدينة
    `;
    document.querySelector(".namecity").innerHTML = "";
    document.querySelector(".namecity").innerHTML = "";
    document.querySelector(".fagr").innerHTML = "";
    document.querySelector(".sunrise").innerHTML = "";
    document.querySelector(".dohr").innerHTML = "";
    document.querySelector(".asr").innerHTML = "";
    document.querySelector(".maghreb").innerHTML = "";
    document.querySelector(".isha").innerHTML = "";
    setTimeout(() => {
      document.querySelector(".result").innerHTML = ``;
    }, 1500);
  } else {
    document.querySelector(".namecity").innerHTML = input.value;
    fetch(` https://api.aladhan.com/v1/timingsByAddress?address=${input.value}`)
      .then((result) => {
        let data = result.json();
        return data;
      })
      .then((data) => {
        document.querySelector(".fagr").innerHTML = data.data.timings.Fajr;
        document.querySelector(".sunrise").innerHTML =
          data.data.timings.Sunrise;
        document.querySelector(".dohr").innerHTML = data.data.timings.Dhuhr;
        document.querySelector(".asr").innerHTML = data.data.timings.Asr;
        document.querySelector(".maghreb").innerHTML =
          data.data.timings.Maghrib;
        document.querySelector(".isha").innerHTML = data.data.timings.Isha;
      })
      .catch(() => {
        document.querySelector(".result").innerHTML = `
          المدينة غير موجودة حاول مرة أخري
        `;
        document.querySelector(".namecity").innerHTML = "";
        document.querySelector(".fagr").innerHTML = "";
        document.querySelector(".sunrise").innerHTML = "";
        document.querySelector(".dohr").innerHTML = "";
        document.querySelector(".asr").innerHTML = "";
        document.querySelector(".maghreb").innerHTML = "";
        document.querySelector(".isha").innerHTML = "";
        setTimeout(() => {
          document.querySelector(".result").innerHTML = ``;
        }, 1500);
      });
    input.value = "";
  }
});

document.onkeyup = function (e) {
  if (e.key == "Enter") {
    search.click();
  }
};
