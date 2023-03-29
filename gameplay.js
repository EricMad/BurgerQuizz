import questions from "./questions.js";

const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".btn"));
const scoreText = document.querySelector("#scoreText");
const progressText = document.querySelector("#progressText");
const progressBarFull = document.querySelector("#progressBarFull");


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

/* Setting the question counter to 0, the available questions to the questions array, the score to 0,
and then calling the getNewQuestion function. */
  const startGame = () => {
    questionCounter = 0
    availableQuestions = [...questions]
    score = 0
    getNewQuestion()
  }


  /* This function is setting the question counter to 0, the available questions to the que
  stions
  array, the score to 0,
  and for changing question. */
  const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter === MAX_QUESTIONS) {
        
      localStorage.setItem("mostRecentScore", score)
      return window.location.assign("/end.html")
    }
    
    questionCounter ++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question
    
    // changing all answer flowing question changing
    choices.forEach(button => {
      const number = button.dataset[`number`]
      button.textContent = currentQuestion[`choice` + number]
    })
    
    // remove question already answer
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
  }

  /* Make the answer click, show correct or wrong answer. And next question. */
  choices.forEach(button => {
    button.addEventListener("click", e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        
        const selectedChoice = e.target
        const selectedAnswer = parseInt(selectedChoice.dataset[`number`], 10)
        const correctAnswer = currentQuestion.answer
        const unselected = document.querySelector(`[data-number="${correctAnswer}"]`)

        // compare answer and changing color if correct or not
        let classToApply = selectedAnswer === correctAnswer ? `correct` : `wrong`
        selectedChoice.classList.add(classToApply)
        unselected.classList.add('correct')

        console.log(unselected)
        console.log(correctAnswer)

        if (selectedAnswer === correctAnswer) {
          incrementScore(SCORE_POINTS)
          correct.play()
        } else {
          wrong.play()
        }
        
        setTimeout(() => {
          selectedChoice.classList = `btn`
          unselected.classList = 'btn'
          getNewQuestion()
        }, 1000)
    })
  })

 /* Incrementing the score by the score points. */
  const incrementScore = num => {
    score += num
    scoreText.innerText = score
  }

  startGame ()
  