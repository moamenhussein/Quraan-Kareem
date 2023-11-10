let menu = document.querySelector(".menu");
let close = document.querySelector(".close");
let ul = document.querySelector(".header .container .nav ul");
let upBtn = document.querySelector(".up");
let tafseerContent = document.querySelector(".tafseer-content");
let contentTafseer = document.querySelector(".content-tafseer");
let closeBtn = document.querySelector(".closebtn i");
let heading = document.querySelector(".closebtn h2");
let ayat = document.querySelector(".ayat");

let textAya = document.querySelector(".aya-tafseer .text");
let ayaTranslation = document.querySelector(".aya-tafseer .translation");
let audio = document.querySelector(".audio");
let tbodyAyat = document.querySelector(".tbody-ayat");

let newArr = [];
let index = 0;


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

fetch("https://api.alquran.cloud/v1/meta")
  .then((result) => {
    let data = result.json();
    return data;
  })
  .then((data) => {
    let dataRef = data.data.surahs.references;
    for (let i = 0; i < data.data.surahs.references.length; i++) {
      let mainDiv = document.createElement("div");
      mainDiv.classList.add("main-div-tafseer");
      let firstDiv = document.createElement("div");
      firstDiv.classList.add("first-div-tafseer");
      let secondDiv = document.createElement("div");
      secondDiv.classList.add("second-div-tafseer");
      let firstDivText = document.createTextNode(
        data.data.surahs.references[i].name
      );
      let secondDivText = document.createTextNode(
        data.data.surahs.references[i].englishName
      );
      let dataRef = document.createElement("div");
      dataRef.classList.add("data-ref", "datarefcontent");
      let dataRefText = document.createTextNode(
        data.data.surahs.references[i].numberOfAyahs
      );
      dataRef.appendChild(dataRefText);
      firstDiv.appendChild(firstDivText);
      secondDiv.appendChild(secondDivText);
      mainDiv.appendChild(firstDiv);
      mainDiv.appendChild(secondDiv);
      mainDiv.appendChild(dataRef);
      tafseerContent.appendChild(mainDiv);
      mainDiv.addEventListener("click", () => {
        contentTafseer.classList.add("left");
      });
      closeBtn.addEventListener("click", () => {
        contentTafseer.classList.remove("left");
      });

      newArr.push(mainDiv);
      // console.log(newArr[0])
      mainDiv.addEventListener("click", (e) => {
        // targets(mainDiv)
        tafseerContent.classList.add("remove");
        if (e.target.parentElement.classList.contains("tafseer-content")) {
          heading.innerHTML = e.target.children[0].innerHTML;
          ayat.innerHTML = `عدد الأيات : ( ${dataRef.innerHTML} )`;
          // console.log(newArr.indexOf(e.target))
          targets(newArr.indexOf(e.target));
          number(newArr.indexOf(e.target));
        } else if (
          e.target.parentElement.classList.contains("main-div-tafseer")
        ) {
          heading.innerHTML = e.target.parentElement.children[0].innerHTML;
          ayat.innerHTML = `عدد الأيات : ( ${dataRef.innerHTML} )`;
          targets(newArr.indexOf(e.target.parentElement));
          number(newArr.indexOf(e.target.parentElement));
        }
      });
    }
  });
function targets(target) {
  // target++;
  // console.log(target)
  fetch(`https://quran-endpoint.vercel.app/quran`)
    .then((result) => {
      let data = result.json();
      return data;
    })
    .then((data) => {
      let url = data.data[target].recitation.full
      // document.querySelectorAll("audio")[0].src.replace("http", "https")
     
      audio.innerHTML = `
      <audio src="${url.replace("http", "https")}" controls></audio>
      `;
      // console.log(document.querySelectorAll("audio")[0].src.replace("http", "https"));

    });
}
closeBtn.addEventListener("click", () => {
  tafseerContent.classList.remove("remove");
  document.querySelector(".aya-container").innerHTML = "";
});

function number(tar) {
  tar++;
  fetch(`https://api.alquran.cloud/v1/surah/${tar}`)
    .then((result) => {
      let data = result.json();
      return data;
    })
    .then((data) => {
      // console.log(data.data.ayahs.length)
      for (let i = 0; i < data.data.ayahs.length; i++) {
        let j = i;
        tbodyAyat.innerHTML += `
          <span class="contentayat">${
            data.data.ayahs[i].text
          }<span class="number">{${++j}}</span></span>
        `;
        closeBtn.addEventListener("click", () => {
          tbodyAyat.innerHTML = "";
        });
      }
    });
}
