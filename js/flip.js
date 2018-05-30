p//ut the deck onto the page 
function renderDeck() {

    //create grid to hold cards
    var cardGrid = document.createElement('div');
    cardGrid.id = 'card-grid';
    document.getElementById('game-board').appendChild(cardGrid);


    for (var i = 0; i < deck.length; i++) { 
        //create a card
        var card = document.createElement('div');

        //add listener to flip card
        card.addEventListener('click', flipCard);

        //add card to card-grid div
        document.getElementById('card-grid').appendChild(card);
    }
}