//deck generation and display functions
let deck = [];
let cardsInPlay = [];
let matchesFound = 0;
const totalMatches = 26;
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//generate a deck of 52 playing cards with suits and ranks. 
//this deck will be in a non-random order
function getDeck() {
    //let deck = [];

    for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < values.length; x++) {
            let card = {
                Value: values[x],
                Suit: suits[i]
            };
            deck.push(card);
        }
    }
    return deck;
}

//not being used
function deal() {
    // remove top card from deck
    let card = deck[deck.length - 1];
    deck.splice(deck.length - 1, 1);
    return card;
}

// shuffle the deck. take two random positions in the deck and swap them 1000 times
function shuffle() {
    // for 1000 turns
    // switch the values of two random cards
    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function renderDeck() {
    for (let i = 0; i < deck.length; i++) {

        // create divs for each part of the card
        let card = $("<div class='card back'></div>")
        let value = $("<div class='card-value hidden'></div>")
        let suit = $("<div class='hidden'></div>")

        // set the css classes for each part of card
        //card.addClass("card back")
        //value.addClass("value hidden")

        suit.addClass("suit " + deck[i].Suit)


        value.html(deck[i].Value)

        card.append(value);
        card.append(suit);

        card.on('click', flipCard)

        // add cards to the game-board

        $("#game-board").append(card)
        // change the value class to one that is not hidden once clicked
        
        value.on('click', cardFocus)
    }
}

// once a card is clicked, flip over to the face value of the card
let flipCard = function () {
    cardsInPlay.push(this);
    // these suck and need to be reworked
    let length = cardsInPlay.length;
    let valueEl = $("#game-board").children()[0].children[0]
    let valEl = $("#game-board").find("div.card-value")
    let suitEl = $("#game-board").children()[0].children[1]
    let suitEle = $("hidden suit diamonds")

    debugger
    valEl.removeClass('hidden');
    suitEle.toggleClass('hidden');
    $(this).removeClass('back');
    $(this).addClass('card disabled');
    
    if (length === 2) {
        if (cardsInPlay[0].innerText === cardsInPlay[1].innerText) {
            match();
        } else {
            cardsInPlay[0].classList.toggle('noMatch');
            cardsInPlay[1].classList.toggle('noMatch');
            setTimeout(unmatch, 1000);
        }
    }
};

var match = function () {
    cardsInPlay = [];
    matchesFound++;
    console.log('matches found : ' + matchesFound);
    if (matchesFound === totalMatches) {
        console.log("You found them all.");
    } else {
        console.log("You found a match");
    }
    
};

let unmatch = function () {
    cardsInPlay[0].classList.remove('disabled');
    cardsInPlay[0].classList.add('back');
    cardsInPlay[0].firstChild.classList.add('hidden');
    cardsInPlay[0].lastElementChild.classList.add('hidden');

    cardsInPlay[1].classList.remove('disabled');
    cardsInPlay[1].classList.add('back');
    cardsInPlay[1].firstChild.classList.add('hidden');
    cardsInPlay[1].lastElementChild.classList.add('hidden');

    ardsInPlay[0].classList.toggle('noMatch');
    cardsInPlay[1].classList.toggle('noMatch');

    cardsInPlay = [];
    
    console.log("Sorry not a match");
};

let resetCard = function (card1, card2) {
    // reset the card to show the back and hide the value again
    card1.classList.replace('card', 'card back');
    card1.firstChild.setAttribute('class', 'value hidden');

    card2.classList.replace('card', 'card back');
    card2.firstChild.setAttribute('class', 'value-hidden');

    // reset cardsin play to go on
    cardsInPlay = [];
};

let cardFocus = function () {
    this.setAttribute('class', 'value');
};

// generate the playing area on the page
let createBoard = function () {
    getDeck();
    shuffle();
    renderDeck();

};

let resetGame = function () {
    let cardsInBoard = document.getElementById('game-board');

    cardsInBoard.innerHTML = '';
    cardsInPlay = [];
    deck = [];
    matchesFound = 0;
    createBoard();
};
// add listener to the shuffle button which will then call createBoard()
document.getElementById('deal').addEventListener('click', createBoard);
document.getElementById('reset').addEventListener('click', resetGame);