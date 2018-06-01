let deck = [];
let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function getDeck() {
    let deck = [];

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

function getCardUI(card) {
    let el = document.createElement('div');
    let icon = '';
    if (card.Suit == 'Hearts')
        icon = '♥';
    else if (card.Suit == 'Spades')
        icon = '♠';
    else if (card.Suit == 'Diamonds')
        icon = '♦';
    else
        icon = '♣';

    el.className = 'card2';
    el.innerHTML = card.Value + '' + icon;
    return el;
}