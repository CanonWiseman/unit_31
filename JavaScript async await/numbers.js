let numbersUrl = "http://numbersapi.com/"

$(".random-num").on("click", async function(){
    let res = await axios.get(numbersUrl + "random/year?json")
    console.log(res.data.text)
});     

$(".four-random-nums").on("click", async function(){
    $(".fact-content").empty();
    let fourNumPromise = [];

    let responses = await Promise.all([
        axios.get(numbersUrl + "random/year?json"),
        axios.get(numbersUrl + "random/year?json"),
        axios.get(numbersUrl + "random/year?json"),
        axios.get(numbersUrl + "random/year?json")
    ])
    
    for(let res of responses){
        $(".fact-content").append(` 
        <p>${res.data.text}</p>
        `
        )
    }
});

$(".four-nums").on("click", async function(){
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

    let responses = await Promise.all(fourNumPromise)

    for(fact of responses){
        $(".fact-content2").append(` 
            <p>${fact.data}</p>
            `
        )
    }
});