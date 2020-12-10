let apiQ = []

// Get Quote from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl)
        apiQ = await response.json();
        newQuote();
    } catch (error) {
        console.log('whoops, no quote', error)
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
    loading();
    const quote = apiQ[Math.floor(Math.random() * apiQ.length)];
    author.textContent = quote.author ? quote.author : "Unknown";
    if(quote.text.length > 100) quoteBlurb.classList.add('long-quote')
    else quoteBlurb.classList.remove('long-quote')

    //Set quote, hide quote
    quoteBlurb.textContent = quote.text
    complete();
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteBlurb.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

function loading() {
    loader.hidden = false;
    quoteCont.hidden = true;
}

function complete() {
    loader.hidden = true;
    quoteCont.hidden = false; 
}

// Add event listeners
newBtn.addEventListener('click', getQuotes);

twBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();


