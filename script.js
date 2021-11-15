const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote

function newQuote() {
    loading();
    // Pick a Random Quote From apiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with the title "Unknown"
    if (!quote.author){
        authorText.textContent = "Unknown"
    }else{
        authorText.textContent = quote.author;
    }
    // Check quote length to detemine styling 
    if(quote.text.length > 75){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Tweet a Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Event ;Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// Get Quote From API 
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch Error Here
    }
}

// On load 
getQuotes();

