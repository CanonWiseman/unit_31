const markov = require('./markov')

describe("Tests for the markov machine", function(){
    let mm;
    beforeAll(function(){
        mm = new markov.MarkovMachine("the cat in the hat")
    })

    test("tests to make sure makeText returns a string", function(){
        let res = mm.makeText()
        expect(res).toEqual(expect.any(String))
    })

    test("tests for max words", function(){
        let res = mm.makeText(6)
        let wordCount = res.split(" ").length;

        expect(wordCount).toBeGreaterThanOrEqual(0)
        expect(wordCount).toBeLessThanOrEqual(6)
    })
})