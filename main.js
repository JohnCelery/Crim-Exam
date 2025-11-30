const storageKeys = {
  index: 'quiz_current_index',
  score: 'quiz_score',
  answered: 'quiz_answered',
};

/**
 * Question model reference
 * @typedef {Object} QuizQuestion
 * @property {string} id
 * @property {string} prompt
 * @property {{ id: string, label: string }[]} choices
 * @property {string} correctChoiceId
 * @property {string} explanation
 */

/**
 * Placeholder loader for JSON-based question files.
 * Replace with fetch('/path/to/questions.json').then(res => res.json()).
 * @returns {Promise<QuizQuestion[]>}
 */
function loadQuestions() {
  const sampleQuestions = [
    {
      id: 'q1',
      prompt: 'Which criminological theory emphasizes the role of social learning in criminal behavior?',
      choices: [
        { id: 'a', label: 'Rational choice theory' },
        { id: 'b', label: 'Social learning theory' },
        { id: 'c', label: 'Biological determinism' },
        { id: 'd', label: 'Routine activity theory' },
      ],
      correctChoiceId: 'b',
      explanation: 'Social learning theory argues that individuals learn behaviors by observing and imitating others in their environment.',
    },
    {
      id: 'q2',
      prompt: 'What term describes crimes committed through the use of computers and networks?',
      choices: [
        { id: 'a', label: 'White-collar crime' },
        { id: 'b', label: 'Organized crime' },
        { id: 'c', label: 'Cybercrime' },
        { id: 'd', label: 'Blue-collar crime' },
      ],
      correctChoiceId: 'c',
      explanation: 'Cybercrime involves illegal activities conducted via digital devices and networks.',
    },
    {
      id: 'q3',
      prompt: 'Which term refers to the deliberate non-compliance with a law based on moral objections?',
      choices: [
        { id: 'a', label: 'Civil disobedience' },
        { id: 'b', label: 'Vigilantism' },
        { id: 'c', label: 'Entrapment' },
        { id: 'd', label: 'Recidivism' },
      ],
      correctChoiceId: 'a',
      explanation: 'Civil disobedience is the conscious refusal to obey a law viewed as unjust, often to prompt change.',
    },
  ];

  return Promise.resolve(sampleQuestions);
}

const state = {
  questions: [],
  currentIndex: 0,
  score: 0,
  answered: {}, // questionId -> choiceId
};

const questionContainer = document.getElementById('question-container');
const feedbackEl = document.getElementById('feedback');
const progressCountEl = document.getElementById('progress-count');
const scoreEl = document.getElementById('score');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');
const reviewToggle = document.getElementById('review-toggle');
const reviewList = document.getElementById('review-list');

function loadProgress() {
  const savedIndex = Number(localStorage.getItem(storageKeys.index));
  const savedScore = Number(localStorage.getItem(storageKeys.score));
  const savedAnswered = localStorage.getItem(storageKeys.answered);

  if (!Number.isNaN(savedIndex)) {
    state.currentIndex = savedIndex;
  }
  if (!Number.isNaN(savedScore)) {
    state.score = savedScore;
  }
  if (savedAnswered) {
    try {
      state.answered = JSON.parse(savedAnswered);
    } catch (error) {
      state.answered = {};
    }
  }
}

function saveProgress() {
  localStorage.setItem(storageKeys.index, String(state.currentIndex));
  localStorage.setItem(storageKeys.score, String(state.score));
  localStorage.setItem(storageKeys.answered, JSON.stringify(state.answered));
}

function setButtonStates({ submitted }) {
  submitBtn.disabled = submitted;
  nextBtn.disabled = state.currentIndex >= state.questions.length - 1 || !submitted;
}

function clearStoredProgress() {
  Object.values(storageKeys).forEach((key) => localStorage.removeItem(key));
}

function renderQuestion() {
  const question = state.questions[state.currentIndex];
  questionContainer.innerHTML = '';
  if (!question) {
    questionContainer.innerHTML = '<p>Loading questions…</p>';
    return;
  }

  const formFragment = document.createDocumentFragment();
  const questionWrapper = document.createElement('div');
  questionWrapper.className = 'question';
  questionWrapper.setAttribute('aria-live', 'polite');

  const prompt = document.createElement('h2');
  prompt.textContent = question.prompt;
  questionWrapper.appendChild(prompt);

  const choicesList = document.createElement('div');
  choicesList.className = 'choices';
  choicesList.setAttribute('role', 'radiogroup');
  choicesList.setAttribute('aria-label', 'Possible answers');

  question.choices.forEach((choice) => {
    const choiceLabel = document.createElement('label');
    choiceLabel.className = 'choice';
    choiceLabel.htmlFor = `${question.id}-${choice.id}`;

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `choice-${question.id}`;
    input.id = `${question.id}-${choice.id}`;
    input.value = choice.id;
    input.required = true;
    input.setAttribute('aria-label', choice.label);

    const savedChoice = state.answered[question.id];
    if (savedChoice === choice.id) {
      input.checked = true;
    }

    const labelText = document.createElement('span');
    labelText.textContent = choice.label;

    choiceLabel.appendChild(input);
    choiceLabel.appendChild(labelText);
    choicesList.appendChild(choiceLabel);
  });

  questionWrapper.appendChild(choicesList);
  formFragment.appendChild(questionWrapper);
  questionContainer.appendChild(formFragment);

  const submitted = Boolean(state.answered[question.id]);
  setButtonStates({ submitted });
  updateProgress();
  renderFeedback();
}

function renderFeedback() {
  const question = state.questions[state.currentIndex];
  const answer = state.answered[question?.id];
  if (!question || !answer) {
    feedbackEl.innerHTML = '';
    return;
  }

  const isCorrect = answer === question.correctChoiceId;
  feedbackEl.innerHTML = '';

  const result = document.createElement('p');
  result.className = isCorrect ? 'correct' : 'incorrect';
  result.textContent = isCorrect ? 'Correct!' : 'Incorrect.';

  const explanation = document.createElement('p');
  explanation.textContent = question.explanation;

  feedbackEl.appendChild(result);
  feedbackEl.appendChild(explanation);
}

function updateProgress() {
  progressCountEl.textContent = `Question ${state.currentIndex + 1} of ${state.questions.length}`;
  scoreEl.textContent = `Score: ${state.score}`;
}

function handleSubmit(event) {
  event.preventDefault();
  const question = state.questions[state.currentIndex];
  if (!question) return;
  if (state.answered[question.id]) {
    return;
  }

  const selected = questionContainer.querySelector('input[type="radio"]:checked');
  if (!selected) {
    feedbackEl.innerHTML = '<p class="incorrect">Select an answer to continue.</p>';
    return;
  }

  const choiceId = selected.value;
  state.answered[question.id] = choiceId;
  if (choiceId === question.correctChoiceId) {
    state.score += 1;
  }

  saveProgress();
  renderFeedback();
  setButtonStates({ submitted: true });
  renderReviewCards();
}

function handleNext() {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex += 1;
    saveProgress();
    renderQuestion();
  }
}

function handleReset() {
  if (!state.questions.length) return;
  state.currentIndex = 0;
  state.score = 0;
  state.answered = {};

  clearStoredProgress();
  renderQuestion();
  renderReviewCards();
}

function renderReviewCards() {
  reviewList.innerHTML = '';
  state.questions.forEach((question, index) => {
    const choiceId = state.answered[question.id];
    if (!choiceId) return;

    const card = document.createElement('article');
    card.className = 'review-card';

    const title = document.createElement('h3');
    title.textContent = `Q${index + 1}: ${question.prompt}`;

    const status = document.createElement('p');
    const isCorrect = choiceId === question.correctChoiceId;
    status.className = `status ${isCorrect ? 'correct' : 'incorrect'}`;
    status.textContent = isCorrect ? 'Correct' : 'Incorrect';

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = `Your answer: ${labelForChoice(question, choiceId)}`;

    const explanation = document.createElement('p');
    explanation.textContent = question.explanation;

    const choicesList = document.createElement('ul');
    question.choices.forEach((choice) => {
      const li = document.createElement('li');
      const isSelected = choice.id === choiceId;
      const isAnswer = choice.id === question.correctChoiceId;
      li.textContent = `${choice.label}${isAnswer ? ' (correct answer)' : ''}${isSelected && !isAnswer ? ' (your choice)' : ''}`;
      choicesList.appendChild(li);
    });

    card.appendChild(title);
    card.appendChild(status);
    card.appendChild(meta);
    card.appendChild(explanation);
    card.appendChild(choicesList);
    reviewList.appendChild(card);
  });
}

function labelForChoice(question, choiceId) {
  const match = question.choices.find((choice) => choice.id === choiceId);
  return match ? match.label : 'Not answered';
}

function toggleReviewMode() {
  reviewList.classList.toggle('is-visible');
  if (reviewList.classList.contains('is-visible')) {
    renderReviewCards();
    reviewToggle.textContent = 'Hide Review Mode';
  } else {
    reviewToggle.textContent = 'Show Review Mode';
  }
}

function init() {
  loadProgress();
  loadQuestions().then((questions) => {
    state.questions = questions;
    if (state.currentIndex >= questions.length) {
      state.currentIndex = 0;
    }
    renderQuestion();
    renderReviewCards();
  });
}

const quizForm = document.getElementById('quiz-form');
quizForm.addEventListener('submit', handleSubmit);
nextBtn.addEventListener('click', handleNext);
resetBtn.addEventListener('click', handleReset);
reviewToggle.addEventListener('click', toggleReviewMode);

document.addEventListener('DOMContentLoaded', init);
