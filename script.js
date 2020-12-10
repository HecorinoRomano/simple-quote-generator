let apiQuotes = []
let errorCounter = 0;

// Get Quotes from API
async function getQuotes() {
    showLoadingSpin();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log('whoops, no quote', error)
        errorCounter++
        console.log(errorCounter)
        if (errorCounter < 40) getQuotes();
        else noQuoteError();
    }

}


// DOM selection
const quoteCont = document.querySelector('#quote-container')
const quoteBlurb = document.querySelector('#quote')
const author = document.querySelector('#author')
const newBtn = document.querySelector('#new-quote')
const twBtn = document.querySelector('#twitter')
const loader = document.querySelector('#loader')

// Get new random quote
function newQuote() {
    showLoadingSpin();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    author.textContent = quote.author ? quote.author : "Unknown";
    if(quote.text.length > 100) quoteBlurb.classList.add('long-quote')
    else quoteBlurb.classList.remove('long-quote')

    //Set quote, hide quote
    quoteBlurb.textContent = quote.text
    completeLoader();
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteBlurb.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

function showLoadingSpin() {
    loader.hidden = false;
    quoteCont.hidden = true;
}

function completeLoader() {
    loader.hidden = true;
    quoteCont.hidden = false; 
}

function noQuoteError() {
    quoteBlurb.textContent = "Sorry, API not responing. No Quote Available. Try again later"
    completeLoader();
}

// Add event listeners
newBtn.addEventListener('click', getQuotes);

twBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();


