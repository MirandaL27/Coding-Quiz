var questionNumber = 0;
var score = 0;

class answerChoice{
    answer;
    isCorrect;
}

class question{
    questionText;
    questionNum;
    answers = [];
    constructor(question, answers, number){
        this.questionText = question;
        this.answers = answers;
        this.questionNum = number;
    }
}

var makeQuestionHTML = function(question){
//make paragraph: has question text inside it
//make radio buttons for answer choices and hide them so that only the labels show

}

var makeintroScreen = function(){
    //make header: Coding Quiz Challenge
    //make paragraph: Try to answer the following code questions within the time limit. 
    //keep in mind that incorrect answers will penalize your score/time by ten seconds!

    //Make start button: starts timer, makes us go to the first question.
}

var makeSubmitHighScoreScreen = function(){
    //Make header: all done!
    //Make Paragraph: your final score is x points
    //Make form with text box and submit button: enter initials
    //store the score in localStorage
}

var makeHighScoreScreen = function(){
    //Make header: High scores
    //make ordered List: list all of the scores.
    //make go back button - goes to intro screen
    //make clear high scores - clears localStorage and updates the screen.
}

//need an event listener that listens for the clicks on the answers. 
//determines if answer is right or wrong: if wrong subtract 10 from timer.
//call the makeQuestionHTML function again to go to the next question.

//on submission of high score form:
//store the score in localStorage
//Go to high score screen

//go back button: goes to intro screen when clicked

//clear high scores: clears localStorage and updates the high scores screen
