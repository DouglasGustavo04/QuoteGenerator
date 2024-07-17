const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//vc ta usando um "let" ao inves de uma constante, é porque o valor do apiQuotes muda, é modificável. vc so usaria uma constante se o valor nunca mudasse.


//show new Quote
function newQuote() {
    loading();

    //Pick a random quote from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank and repalce it with "unknown"
    if (!quote.author) {
        authorText.textContent  = 'Unknown';
        } else {
            authorText.textContent = quote.author;
    }
    //Check quote lenght to determine styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
    }
    //set quote, hide loader
    quoteText.textContent = quote.text
    complete();
}


// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        //essa constante não vai ser populada até que tenha algum dado coletado do API. "Await" pelo conteúdo do API ser coletado.
        apiQuotes = await response.json();
        newQuote(); 
    } catch (error){
      //Catch Error Here. "Se der errado, a informação do erro é coletada aqui"
    }
}

//tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuotes();
//na hora qe a pagina carregar, ele ja vai dar load na função get quotes pra ja coletar do API e ja apresentar uma logo de cara.

