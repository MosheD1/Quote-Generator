const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterbtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show New Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is empty andchange it
    if(!quote.author) {
        authorText.textContent = 'Unknown';    
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length to determine style
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

//Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log('whoops, no quote', error);
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterbtn.addEventListener('click', tweetQuote);

// On Load
getQuote();