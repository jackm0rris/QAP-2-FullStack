/**
 * Gets a random multiplication, division, subtraction, or addition question
 * 
 * @returns {} The randomly generated math question
 */

const mathOpp = {
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/'
};

function getQuestion() {
    const operators = Object.values(mathOpp); 
    return {
        mathNumbers: [getRandomNumber(1, 30), getRandomNumber(1, 30)],  
        mathQues: operators[getRandomNumber(0, operators.length - 1)]  
    };
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 * 
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(question, answer) {
    const { mathNumbers, mathQues } = question;  
    const [num1, num2] = mathNumbers;  
    let correctAnswer;

    switch (mathQues) {
        case mathOpp.MULTIPLICATION:
            correctAnswer = num1 * num2;
            break;
        case mathOpp.DIVISION:
            if (num2 === 0) {
                return false;
            }
            correctAnswer = num1 / num2;
            break;
        case mathOpp.SUBTRACTION:
            correctAnswer = num1 - num2;
            break;
        case mathOpp.ADDITION:
            correctAnswer = num1 + num2;
            break;
        default:
            return false; 
    }

    // Convert answer to a number for accurate comparison
    return correctAnswer === Number(answer);  
}

module.exports = {
    getQuestion,
    isCorrectAnswer,
    getRandomNumber,
    mathOpp,
};
