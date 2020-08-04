const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

// Loader Run Function: [Used when request is made]
function loaderRun() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Loader Stop Function: [Used when request is complete]
function loaderStop() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Get the Quote from API
async function getQuote() {
  loaderRun();
  const proxyUrl = "https://quiet-waters-85865.herokuapp.com/";
  const getUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + getUrl);
    const data = await response.json();

    // If API doesn't return any author we need to print Unknown
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // To make long quote smaller by adding the long-quote class with css effects
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
  } catch (error) {
    getQuote();
  }

  loaderStop();
}

// Tweet Function
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetUrl, "_blank");
}

// Event Listeners for the two buttons

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
