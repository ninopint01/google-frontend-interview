import "regenerator-runtime/runtime";

const QUESTION_API_BASE_URL = "questions.json";

fetchAndAppendQuestions();

function fetchAndAppendQuestions() {
  const questions = fetchQuestions();
  //   console.log(questions);
  const questionsByCategory = getQuestionsByCategory(questions);
  //   console.log(questionsByCategory);

  const wrapper = document.getElementById("wrapper");
  for (const [category, questions] of Object.entries(questionsByCategory)) {
    console.log(category);
    const categoryDiv = createCategory(category, questions);
    wrapper.append(categoryDiv);
  }
}

function createCategory(category, questions) {
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("category");
  const h2 = document.createElement("h2");
  h2.textContent = category;
  categoryDiv.append(h2);
  questions.forEach((question) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    const h3 = document.createElement("h3");
    h3.textContent = question.name;
    questionDiv.append(h3);
    categoryDiv.append(questionDiv);
  });
  return categoryDiv;
}

function fetchQuestions() {
  //   const response = await fetch(QUESTION_API_BASE_URL);
  //   const questions = await response.json();
  try {
    const questions = require(QUESTION_API_BASE_URL);
    return questions;
  } catch (err) {
    console.log(err.message);
  }
}

function getQuestionsByCategory(questions) {
  const questionsByCategory = {};
  questions.forEach((question) => {
    if (questionsByCategory.hasOwnProperty(question.category)) {
      questionsByCategory[question.category].push(question);
    } else {
      questionsByCategory[question.category] = [question];
    }
  });
  return questionsByCategory;
}
