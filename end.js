const userName = document.querySelector("#userName")
const saveScoreBtn = document.querySelector("#saveScoreBtn")
const finalScore = document.querySelector("#result")
const mostRecentScore = localStorage.getItem("mostRecentScore")

const highSores = JSON.parse(localStorage.getItem("highScores")) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

// make button save available
userName.addEventListener("keyup", () =>{
    saveScoreBtn.disabled = !userName.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: userName.value
    }

    highSores.push(score)
    highSores.sort((a,b) => {
        return b.score - a.score // sort high score
    })
    highSores.splice(5) //take 5 highest scores

    localStorage.setItem("highScores", JSON.stringify(highSores))
    window.location.assign('/scoreboard.html')

}