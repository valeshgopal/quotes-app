const quote = document.querySelector(".quote");
const authorName = document.querySelector(".author");
const btn = document.querySelector(".btn");
const volume = document.querySelector(".volume");
const copy = document.querySelector(".copy");
const twitter = document.querySelector(".twitter");
const tooltip = document.querySelector(".tooltip");
const url = "https://api.quotable.io/random";

const getQuotes = async function (url) {
  btn.classList.add("loading");
  btn.innerText = "Loading Quote...";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const { content, author } = data;
  if (content) {
    btn.classList.remove("loading");
    btn.innerText = "New Quote";
  }
  quote.innerHTML = content;
  authorName.innerText = `--${author}`;
};
getQuotes(url);

btn.addEventListener("click", function () {
  getQuotes(url);
});

volume.addEventListener("click", () => {
  console.log("clicked");
  let utterance = new SpeechSynthesisUtterance(
    `${quote.innerText}. by ${authorName.innerText}`
  );
  speechSynthesis.speak(utterance);
});

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quote.innerText}`);
  tooltip.style.opacity = 1;
  setTimeout(() => {
    tooltip.style.opacity = 0;
  }, 1500);
});

twitter.addEventListener("click", () => {
  const tweetUrl = `https://twitter.com/intent/tweet?url="${quote.innerText}" ${authorName.innerText}`;
  window.open(tweetUrl, "_blank");
});
