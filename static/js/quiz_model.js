export { Quiz, EndQuiz, InputError };
class EndQuiz extends Error {
    constructor(...params) {
        super(...params);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = EndQuiz.name;
    }
}
class InputError extends Error {
    constructor(...params) {
        super(...params);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = InputError.name;
    }
}
class Quiz {
    constructor(questions) {
        const loaded_questions = this._loadQuestions(questions);
        this._questions = Array.from(loaded_questions);
        this._questions.reverse();
        this._currentQuestion = this._questions[0];
        this.nextQuestion();
    }
    nextQuestion() {
        if (this._noMoreQuestionsLeft()) {
            throw new EndQuiz("No more questions left.");
        }
        const next_question = this._getNextQuestion();
        this._currentQuestion = next_question;
    }
    _noMoreQuestionsLeft() {
        return this._questions.length <= 0;
    }
    _getNextQuestion() {
        const question = this._questions.pop();
        return question;
    }
    currentQuestion() {
        return this._currentQuestion.question;
    }
    currentAnswers() {
        const sorted_answers = this._collectAnswers();
        const shuffled_answers = this._shuffle(sorted_answers);
        const answers = new Set(shuffled_answers);
        return answers;
    }
    _collectAnswers() {
        const answers = new Array();
        const correct_answer = this._currentQuestion.correct_answer;
        const incorrect_answers = this._currentQuestion.incorrect_answers;
        answers.push(correct_answer);
        incorrect_answers.forEach((incorrect_answer) => {
            answers.push(incorrect_answer);
        });
        return answers;
    }
    _shuffle(array) {
        // https://stackoverflow.com/a/2450976
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    currentSolution() {
        return this._currentQuestion.correct_answer;
    }
    makeGuess(guess) {
        if (guess === this._currentQuestion.correct_answer) {
            return "correct";
        }
        return "incorrect";
    }
    _loadQuestions(questions) {
        const loaded_questions = this._loadQuestionsFromJSON(questions);
        return loaded_questions;
    }
    _loadQuestionsFromJSON(data) {
        const questions_input = this._parseJSON(data);
        const questions = this._addQuestionsFrom(questions_input);
        return questions;
    }
    _parseJSON(data) {
        try {
            const parsed_data = JSON.parse(data);
            return parsed_data;
        }
        catch (exception) {
            if (exception instanceof SyntaxError) {
                throw new InputError("Invalid input provided.");
            }
            else {
                throw exception;
            }
        }
    }
    _addQuestionsFrom(questions_input) {
        const questions = new Set();
        try {
            for (const question of questions_input) {
                questions.add(question);
            }
        }
        catch (exception) {
            if (isNotIterableError(exception)) {
                questions.add(questions_input);
            }
            else {
                throw exception;
            }
        }
        return questions;
    }
}
function isNotIterableError(exception) {
    return (exception.name === "TypeError") &&
        (exception.message.includes("is not iterable"));
}
