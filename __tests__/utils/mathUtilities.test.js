const { isCorrectAnswer, getQuestion, mathOpp } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
    test("Test getQuestion returns a question object", () => {
        const question = getQuestion(); 
        
        expect(question.mathNumbers).toHaveLength(2);
        expect(question.mathNumbers).toEqual(
            expect.arrayContaining([expect.any(Number), expect.any(Number)])
        );
        
        const validOperators = ['+', '-', '*', '/'];
        expect(validOperators).toContain(question.mathQues);
    });
});

describe("Tests for isCorrectAnswer", () => {
    test("Test isCorrectAnswer returns true for correct answer", () => {
        const question = {
            mathNumbers: [5, 3], 
            mathQues: '+' 
        };
        const answer = 8; 
        
        expect(isCorrectAnswer(question, answer)).toBe(true);
    });

    test("Test isCorrectAnswer returns false for incorrect answer", () => {
        const question = {
            mathNumbers: [5, 3],  
            mathQues: '+'  
        };
        const answer = 10; 
        
        expect(isCorrectAnswer(question, answer)).toBe(false);
    });
});
