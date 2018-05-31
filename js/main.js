//deck generation and display functions
var deck = [];
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var cardsInPlay = [];
var cardsClicked = 0;

//generate a deck of 52 playing cards with suits and ranks. 
//this deck will be in a non-random order
function getDeck() {
    //var deck = [];

    for (var i = 0; i < suits.length; i++) {
        for (var x = 0; x < values.length; x++) {
            var card = {
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
    var card = deck[deck.length - 1];
    deck.splice(deck.length - 1, 1);
    return card;
}

// shuffle the deck. take two random positions in the deck and swap them 1000 times
function shuffle() {
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++) {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function renderDeck() {
    for (var i = 0; i < deck.length; i++) {

        // create divs for each part of the card
        var card = document.createElement("div");
        var value = document.createElement("div");
        var suit = document.createElement("div");

        // set the css classes for each part of card
        card.className = "card-back";
        value.className = "value-hidden";
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
// needs to be update. check to see if the two cards are a match
var checkForMatch = function () {

        if (cardsInPlay[0].innerText === cardsInPlay[1].innerText) {
            console.log("You found a match");
            //resetCard(cardsInPlay[0], cardsInPlay[1]);
            cardsInPlay = [];
            cardsClicked = 0;
        } else {
            console.log("Sorry, try again.");
            cardsClicked = 0;
            resetCard(cardsInPlay[0], cardsInPlay[1]);
        }
};

// once a card is clicked, flip over to the face value of the card
var flipCard = function () {
    this.setAttribute('class', 'card');
    this.firstChild.setAttribute('class', 'value');
   // var cardId = this.getAttribute('data-id');
    cardsInPlay.push(this);

    cardsClicked++;
    console.log(cardsClicked);
    
    if (cardsClicked === 2  && cardsInPlay.length === 2){
        checkForMatch();
    } else {
        console.log('reached else on flipcard.');
        return;
    }
    
};

var resetCard = function (card1, card2) {
    // reset the card to show the back and hide the value again
    card1.setAttribute('class', 'card-back');
    card1.firstChild.setAttribute('class', 'value-hidden');
    card2.setAttribute('class', 'card-back');
    card2.firstChild.setAttribute('class', 'value-hidden');

    // reset cardsin play to go on
    cardsInPlay = [];
};

var cardFocus = function () {
    this.setAttribute('class', 'value');
};

// generate the playing area on the page
var createBoard = function () {
    getDeck();
    shuffle();
    renderDeck();

};

var resetGame = function () {
    var cardsInBoard = document.getElementById('game-board');

    var length = document.getElementsByClassName('card').length;
    var card = document.getElementsByClassName('card');
    var value = document.getElementsByClassName('value');

    cardsInBoard.innerHTML = '';
    cardsInPlay = [];
    deck = [];
    createBoard();
};
// add listener to the shuffle button which will then call createBoard()
document.getElementById('deal').addEventListener('click', createBoard);
document.getElementById('reset').addEventListener('click', resetGame);