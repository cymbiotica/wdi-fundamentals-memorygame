//deck generation and display functions
var deck = [];
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var cardsInPlay = [];

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

//put the deck onto the page 
// function renderDeck() {

//     //create grid to hold cardss
//     var cardGrid = document.createElement('div');
//     cardGrid.id = 'card-grid';
//     document.getElementById('game-board').appendChild(cardGrid);


//     for (var i = 0; i < deck.length; i++) { 
//         //create a card
//         var card = document.createElement('div');
//         card.className = 'card-' + i;
//         var front = document.createElement('div');
//         front.className = 'front';
//         var back = document.createElement('div');
//         back.className = 'back';

//         //add listener to flip card
//         card.addEventListener('click', flipCard);

//         //add card to card-grid div
//         document.getElementById('card-grid').appendChild(card);
//     }
//     for (var j = 0; j < cardGrid.length; j++) {
//         document.getElementsByClassName('card-grid')[j].getElementsByClassName('card-' + j).appendChild('front');
//     }
// }
function renderDeck()
{
	for(var i = 0; i < deck.length; i++)
	{
		var card = document.createElement("div");
		var value = document.createElement("div");
        var suit = document.createElement("div");
        
		card.className = "card-back";
		value.className = "value-hidden";
		suit.className = "suit " + deck[i].Suit;

        value.innerHTML = deck[i].Value;
        
		card.appendChild(value);
        card.appendChild(suit);
        card.addEventListener('click', flipCard);

        //value.addEventListener('click', function () { this.classList.toggle('value')});
        //value.addEventListener('mouseDown', function () { this.setAttribute('class', 'value'); });
        //suit.addEventListener('mouseUp', function (){ this.setAttribute('class', 'suit ' + deck[i].suit); });
		document.getElementById("game-board").appendChild(card);
	}
}
// needs to be update. check to see if the two cards are a match
var checkForMatch = function () {

    if (cardsInPlay.length === 2) {
        if (cardsInPlay[0] === cardsInPlay[1]) {
            alert("You found a match");
        } else {
            alert("Sorry, try again.");
        }
    }
};

// once a card is clicked, flip over to the face value of the card
var flipCard = function () {
    //this.setAttribute('src', '');
    this.setAttribute('class', 'card');
    document.getElementsByClassName('value-hidden')[0].setAttribute('class','value');
    checkForMatch();
};

var cardFocus = function () { this.setAttribute('src', 'value'); };

// generate the playing area on the page
var createBoard = function () {
    getDeck();
    shuffle();
    renderDeck();

};
// add listener to the shuffle button which will then call createBoard()
document.getElementById('deal').addEventListener('click', createBoard);
document.getElementById('shuffle').addEventListener('click', shuffle);