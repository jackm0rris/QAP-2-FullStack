const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const { getQuestion, isCorrectAnswer } = require('./utils/mathUtilities');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS)
app.use(session({
    secret: 'mathisfun',
    resave: false,
    saveUninitialized: true
}));

const leaderboards = [];

app.get('/', (req, res) => {
    const lastStreak = req.session.streak || 0;
    res.render('index', { lastStreak });
});

app.get('/quiz', (req, res) => {
    const Question = getQuestion(); 
    req.session.Question = Question;
    res.render('quiz', { Question }); 
});

app.get("/leaderboards", (req, res) => {
    res.render("leaderboards", { leaderboards });
});

app.get("/quizComplete", (req, res) => {
    const { Question } = req.session;
    res.render("quizComplete", { Question });
});

// Handles quiz submissions.
app.post('/quiz', (req, res) => {
    const { answer } = req.body; // Get the answer from the form
    const Question = req.session.Question; // Retrieve the current question

    // Check if the answer is correct.
    if (isCorrectAnswer(Question, answer)) {
        console.log(`Correct. The answer is ${answer}`);
        req.session.streak = (req.session.streak || 0) + 1; 
        res.redirect('/quiz'); 
    } else {
        console.log(`Incorrect. Correct answer is ${Question.mathNumbers[0]} ${Question.mathQues} ${Question.mathNumbers[1]}`);
        req.session.streak = 0; 
        res.redirect('/quizComplete'); 
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
