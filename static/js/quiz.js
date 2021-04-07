import { Quiz, EndQuiz } from "./quiz_model.js";
init();
function init() {
    const quiz = makeQuiz();
    render(quiz);
}
function makeQuiz() {
    const questions = makeQuestions();
    const quiz = new Quiz(questions);
    return quiz;
}
function makeQuestions() {
    const input = document.getElementById("quiz-questions");
    const raw_content = input === null || input === void 0 ? void 0 : input.textContent;
    const content = toJson(raw_content);
    return content;
}
function toJson(raw_string) {
    let json_string = raw_string;
    json_string = json_string.trim();
    json_string = json_string.replace(/\\n/g, "");
    json_string = json_string.replace(/\\t/g, "");
    json_string = json_string.replace(/\\"/g, '"');
    json_string = json_string.replace(/"\[/g, '[');
    json_string = json_string.replace(/\]"/g, ']');
    return json_string;
}
function render(quiz) {
    const app = document.getElementById("quiz");
    const new_content = document.createElement("div");
    const old_content = document.getElementById("quiz-content");
    const button = makeButton(quiz);
    const question = makeQuestion(quiz);
    const answers = makeAnswers(quiz);
    new_content.id = "quiz-content";
    new_content.appendChild(question);
    new_content.appendChild(answers);
    new_content.appendChild(button);
    if (old_content !== null) {
        const parent_div = old_content.parentNode;
        parent_div === null || parent_div === void 0 ? void 0 : parent_div.replaceChild(new_content, old_content);
    }
    else {
        app === null || app === void 0 ? void 0 : app.appendChild(new_content);
    }
}
function end(quiz) {
    const app = document.getElementById("quiz");
    const new_content = document.createElement("div");
    const old_content = document.getElementById("quiz-content");
    const end = makeEnd(quiz);
    new_content.id = "quiz-content";
    new_content.appendChild(end);
    if (old_content !== null) {
        const parent_div = old_content.parentNode;
        parent_div === null || parent_div === void 0 ? void 0 : parent_div.replaceChild(new_content, old_content);
    }
    else {
        app === null || app === void 0 ? void 0 : app.appendChild(new_content);
    }
}
function makeEnd(quiz) {
    const end = document.createElement("div");
    const h2 = document.createElement("h2");
    const button = document.createElement("button");
    const answers = document.createElement("ul");
    answers.style.listStyleType = "none";
    end.id = "quiz-end";
    h2.textContent = "Ende";
    button.textContent = "Neue Runde";
    button.type = "button";
    button.className = "btn";
    button.addEventListener('click', function (event) {
        init();
    });
    for (let i = 0; i < 4; i++) {
        const div = document.createElement("div");
        const li = document.createElement("a");
        div.className = "notices";
        li.className = "highlight";
        div.appendChild(li);
        answers.appendChild(div);
    }
    end.appendChild(h2);
    end.appendChild(answers);
    end.appendChild(button);
    return end;
}
function makeButton(quiz) {
    function nextQuestion() {
        try {
            quiz.nextQuestion();
            render(quiz);
        }
        catch (exception) {
            if (exception instanceof EndQuiz) {
                end(quiz);
            }
            else {
                throw exception;
            }
        }
    }
    const button = document.createElement("button");
    button.textContent = "Nächste Frage";
    button.type = "button";
    button.className = "btn";
    button.addEventListener("click", nextQuestion);
    return button;
}
function makeQuestion(quiz) {
    const current_question = quiz.currentQuestion();
    const question = document.createElement("h2");
    question.textContent = current_question;
    return question;
}
function makeAnswers(quiz) {
    const current_answers = quiz.currentAnswers();
    const answers = document.createElement("ul");
    answers.style.listStyleType = "none";
    current_answers.forEach((answer) => {
        function listener(event) {
            const target = event.target;
            const result = quiz.makeGuess(answer);
            if (answer === quiz._currentQuestion.correct_answer) {
                target.textContent = target.textContent + " (richtig)";
                target.style.color = "green";
                target.removeEventListener('click', listener);
            }
            else {
                target.textContent = target.textContent + " (falsch)";
                target.style.color = "red";
                target.removeEventListener('click', listener);
            }
        }
        const div = document.createElement("div");
        const li = document.createElement("a");
        div.className = "notices";
        li.className = "highlight";
        li.textContent = answer;
        li.addEventListener('click', listener);
        div.appendChild(li);
        answers.appendChild(div);
    });
    return answers;
}
