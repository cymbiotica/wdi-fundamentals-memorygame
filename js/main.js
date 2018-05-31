//deck generation and display functions
let deck = [];
let cardsInPlay = [];
let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

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
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");

        // set the css classes for each part of card
        card.classList.add("card", "back");
        value.classList.add("value", "hidden");
        suit.className = "suit " + deck[i].Suit;

        value.innerHTML = deck[i].Value;

        card.appendChild(value);
        card.appendChild(suit);
        card.addEventListener('click', flipCard);

        // add cards to the game-board
        document.getElementById("game-board").appendChild(card);

        // change the value class to one that is not hidden once clicked
        value.addEventListener('click', cardFocus);
    }
}

// once a card is clicked, flip over to the face value of the card
let flipCard = function () {
    cardsInPlay.push(this);
    let length = cardsInPlay.length;

    if (length === 2) {
        if (cardsInPlay[0].innerText === cardsInPlay[1].innerText) {
            match();
        } else {
            unmatch();
        }
    }
};

var match = function () {
    cardsInPlay[0].classlist.add('card', 'disabled');
    cardsInPlay[0].classlist.remove('back');
    cardsInPlay[1].classlist.add('card', 'disabled');
    cardsInPlay[0].classlist.remove('back');
    cardsInPlay = [];
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
    createBoard();
};
// add listener to the shuffle button which will then call createBoard()
document.getElementById('deal').addEventListener('click', createBoard);
document.getElementById('reset').addEventListener('click', resetGame);