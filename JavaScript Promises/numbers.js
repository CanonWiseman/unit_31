let numbersUrl = "http://numbersapi.com/"

$(".random-num").on("click", function(){
    axios.get(numbersUrl + "random/year?json")
        .then(res => {
            console.log(res.data.text)
        })
        .catch(err => {
            console.log(err)
        })
});     

$(".four-random-nums").on("click", function(){
    $(".fact-content").empty();
    let fourNumPromise = [];

    for(let i = 0; i < 4; i ++){
        fourNumPromise.push(axios.get(numbersUrl + "random/year?json"))
    }

    Promise.all(fourNumPromise)
        .then(numArr => {
            for(fact of numArr){
                $(".fact-content").append(` 
                <p>${fact.data.text}</p>
                `
                )
            }
        })
        .catch(err => {
            $(".fact-content").append(` 
                <p>${err}</p>
                `
                )
        })
});

$(".four-nums").on("click", function(){
    let num = $("#numInput").val();
    $(".fact-content2").empty();
    
    $("#numInput").css("border-color", "black");

    

    if($("#numInput").val() == ""){
        $("#numInput").css("border-color", "red");
        return false
    }

    $("#numInput").val("");

    let fourNumPromise = [];

    for(let i = 0; i < 4; i ++){
        fourNumPromise.push(axios.get(numbersUrl + num))
    }

    Promise.all(fourNumPromise)
        .then(numArr => {
            for(fact of numArr){
                console.log(fact)
                $(".fact-content2").append(` 
                <p>${fact.data}</p>
                `
                )
            }
        })
        .catch(err => {
            $(".fact-content2").append(` 
                <p>${err}</p>
                `
                )
        })
});