const deckUrl = "https://deckofcardsapi.com/api/deck/"
let deckId;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

$(".drawCard").on("click", async function(){

    let card = await axios.get(deckUrl + `${deckId}/draw/?count=1`)
    console.log(card.data.cards[0].value + " of " + card.data.cards[0].suit)
    $(".card-content").append(` 
        <img src="${card.data.cards[0].image}" style="transform: rotate(${getRandomInt(360)}deg)"/>
    `)    
})

$(".drawCards").on("click", async function(){

    let cards = await Promise.all([
        axios.get(deckUrl + `${deckId}/draw/?count=1`),
        axios.get(deckUrl + `${deckId}/draw/?count=1`)
    ])

    for(let card of cards){
        console.log(card.data.cards[0].value + " of " + card.data.cards[0].suit)
    }
});


$(function() {
    axios.get(deckUrl + "new/shuffle/?deck_count=1")
        .then(res => {
            deckId = res.data.deck_id;
        })
        .catch(err => {
            console.log(err)
        })
  });