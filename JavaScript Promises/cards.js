const deckUrl = "https://deckofcardsapi.com/api/deck/"
let deckId;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function drawCard(){
    return new Promise((resolve, reject) =>{
        axios.get(deckUrl + `${deckId}/draw/?count=1`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

$(".drawCard").on("click", function(){
    axios.get(deckUrl + `${deckId}/draw/?count=1`)
        .then(res => {
            console.log(res);
            $(".card-content").append(` 
            <img src="${res.data.cards[0].image}" style="transform: rotate(${getRandomInt(360)}deg)"/>
            `)
        })
        .catch(err => {
            $(".drawCard").remove();
        })
    
})





$(function() {
    axios.get(deckUrl + "new/shuffle/?deck_count=1")
        .then(res => {
            deckId = res.data.deck_id;
        })
        .catch(err => {
            console.log(err)
        })
  });