console.log("Up and running!");


var card = [{
        rank: "queen",
        suit: "hearts",
        cardImage: "images/queen-of-hearts.png"
    },

    {
        rank: "queen",
        suit: "diamonds",
        cardImage: "images/queen-of-diamonds.png"
    },

    {
        rank: "king",
        suit: "hearts",
        cardImage: "images/king-of-hearts.png"
    },

    {
        rank: "king",
        suit: "diamonds",
        cardImage: "images/king-of-diamonds.png"
    }
];

var cardsInPlay = [];

var checkForMatch = function () {

    if (cardsInPlay.length === 2) {
        if (cardsInPlay[0] === cardsInPlay[1]) {
            alert("You found a match");
        } else {
            alert("Sorry, try again.");
        }
    }
};

var flipCard = function () {
    var cardId = this.getAttribute('data-id');
    cardsInPlay.push(card[cardId].rank);
    this.setAttribute('src', card[cardId].cardImage);
    checkForMatch();
    // console.log(card[cardId].suit);
    // console.log(card[cardId].cardImage);

};
var resetBoard = function() {
    var childs = document.getElementById('game-board');
    while (childs.fistChild) {
        childs.firstChild.remove();
    }
    cardsInPlay = [];
    createBoard();
};

var createBoard = function () {
    for (var i = 0; i < card.length; i++) {
        var cardElement = document.createElement('img');
        cardElement.setAttribute('src', 'images/back.png');
        cardElement.setAttribute('data-id', i);
        cardElement.addEventListener('click', flipCard);
        var board = document.getElementById('game-board');
        board.appendChild(cardElement);
    }
};
createBoard();
document.getElementsByTagName('button')[0].addEventListener('click', resetBoard);