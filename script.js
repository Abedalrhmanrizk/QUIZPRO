import { quizData } from "./quiz.js"

const quiz = document.getElementById("quiz")
const answerEls = document.querySelectorAll(".answer")
const questionEl = document.getElementById("question")
const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")
const submitBtn = document.getElementById("submit")
const result = document.querySelector(".result-area")
const questionResult = document.querySelector(
  ".question-result"
)
const yourAnswer = document.querySelector(".your-answer")
const correctAnswer = document.querySelector(
  ".correct-answer"
)
const startBtn = document.querySelector(".start-btn")
const numQuiz = document.querySelector(".num-quiz")
const quizContainer = document.querySelector(
  ".quiz-container"
)
const yourMark = document.querySelector(".your-mark")
const alertText = document.querySelector(".alert")

let quizHeader = document.querySelector("#time")

let currentIndex = 0
let countdownInterval
let num
let currentQuiz = 0
let score = 0
let currentQuestion

startBtn.addEventListener("click", () => {
  num = document.querySelector("#number").value
  if (num > 0 && num <= 30) {
    numQuiz.classList.add("hidden")
    quizContainer.classList.remove("hidden")
    loadQuiz()
  } else {
    alertText.textContent = ` Enter a valid number ❗︎❗︎❗︎`
    alertText.style.color = "#ef233c"
  }
})

function loadQuiz() {
  deselectAnswers()
  countdown(90, num)
  currentQuestion = quizData[currentQuiz]
  questionEl.textContent = currentQuestion.question
  a_text.textContent = currentQuestion.a
  b_text.textContent = currentQuestion.b
  c_text.textContent = currentQuestion.c
  d_text.textContent = currentQuestion.d
}

function deselectAnswers() {
  answerEls.forEach(
    (answerEl) => (answerEl.checked = false)
  )
}

function getSelected() {
  let answer
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id
    }
  })
  return answer
}

let q = []
let c = []
let x = []

submitBtn.addEventListener("click", loadQ)

function loadQ() {
  clearInterval(countdownInterval)
  const answer = getSelected()
  q.push(questionEl.textContent)
  c.push(quizData[currentQuiz].correct)
  x.push(answer)

  if (answer) {
    if (answer === quizData[currentQuiz].correct) score++
  }
  currentQuiz++
  if (currentQuiz < num) {
    loadQuiz()
  } else {
    showResult()
    result.classList.remove("hidden")
    quiz.classList.add("hidden")
    yourMark.textContent += ` ${score} from ${num}`
  }
}

function showResult() {
  for (let i = 0; i < num; i++) {
    let qi = document.createElement("p")
    qi.textContent = q[i]
    questionResult.appendChild(qi)
    let xi = document.createElement("p")
    xi.textContent = x[i]
    yourAnswer.appendChild(xi)
    let ci = document.createElement("p")
    ci.textContent = c[i]
    correctAnswer.appendChild(ci)

    if (c[i] !== x[i]) {
      qi.style.color = "#ef233c"
      qi.style.fontWeight = "600"
    } else {
      qi.style.color = "#2ba84a"
      qi.style.fontWeight = "600"
    }
  }
}

console.log(Math.random() - 0.5)
console.log(0.1 + 0.2)

const moon = document.querySelector(".moon")
moon.addEventListener("click", () => {
  moon.classList.toggle("dark")
  document.body.classList.toggle("bdark")
})

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60)
      seconds = parseInt(duration % 60)

      minutes = minutes < 10 ? `0${minutes}` : minutes
      seconds = seconds < 10 ? `0${seconds}` : seconds

      quizHeader.textContent = `${minutes}:${seconds}`

      if (--duration < 0) {
        clearInterval(countdownInterval)
        submitBtn.click()
      }
    }, 1000)
  }
}
