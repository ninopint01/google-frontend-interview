import "regenerator-runtime/runtime";

const QUESTION_API_BASE_URL = "questions.json";
const SUBMISSIONS_API_BASE_URL = "submissions.json";

fetchAndAppendQuestions();

function fetchAndAppendQuestions() {
  const [questions, submissions] = fetchQuestionsAndSubmissions();
  const questionsByCategory = getQuestionsByCategory(questions);
  const submissionsById = getSubmissionsById(submissions);

  const wrapper = document.getElementById("wrapper");
  for (const [category, questions] of Object.entries(questionsByCategory)) {
    console.log(category);
    const categoryDiv = createCategory(category, questions, submissionsById);
    wrapper.append(categoryDiv);
  }
}

function createCategory(category, questions, submissionsById) {
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("category");

  let correctCount = 0;

  questions.forEach((question) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    const status = document.createElement("div");
    status.classList.add("status");
    const statusClass = submissionsById[question.id]
      ?.toLowerCase()
      ?.replace("_", "-");
    status.classList.add(statusClass ?? "unattemped");
    questionDiv.append(status);

    if (submissionsById[question.id] === "CORRECT") {
      correctCount++;
    }

    const h3 = document.createElement("h3");
    h3.textContent = question.name;
    questionDiv.append(h3);
    categoryDiv.append(questionDiv);
  });

  const h2 = document.createElement("h2");
  h2.textContent = `${category} - ${correctCount} / ${questions.length}`;
  categoryDiv.prepend(h2);

  return categoryDiv;
}

function fetchQuestionsAndSubmissions() {
  try {
    const questions = require(QUESTION_API_BASE_URL);
    const submissionsResponse = require(SUBMISSIONS_API_BASE_URL);
    return [questions, submissionsResponse];
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

function getSubmissionsById(submissions) {
  const submissionsById = {};
  submissions.forEach((submission) => {
    submissionsById[submission.questionId] = submission.status;
  });
  return submissionsById;
}
