const deckUrl = "https://deckofcardsapi.com/api/deck/"
let deckId;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

$(".drawCard").on("click", function(){
    axios.get(deckUrl + `${deckId}/draw/?count=1`)
        .then(res => {
            console.log(res.data.cards[0].value + " of " + res.data.cards[0].suit)
            $(".card-content").append(` 
            <img src="${res.data.cards[0].image}" style="transform: rotate(${getRandomInt(360)}deg)"/>
            `)
        })
        .catch(err => {
            $(".drawCard").remove();
        })
    
})

$(".drawCards").on("click", async function(){
    axios.get(deckUrl + `${deckId}/draw/?count=1`)
        .then(res => {
            console.log(res.data.cards[0].value + " of " + res.data.cards[0].suit)
            return axios.get(deckUrl + `${deckId}/draw/?count=1`)
        })
        .then(res => {
            console.log(res.data.cards[0].value + " of " + res.data.cards[0].suit)
        })
        .catch(err => {
            console.log(err)
        })
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