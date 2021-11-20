var questionNumber = 1;
var score = 0;
var time = 120;
var sectionEl = document.querySelector(".quiz");
var timeEl = document.querySelector(".timer span");
var bodyEl = document.querySelector("body");
var questions = [];
var setInt;
var formEl;
var highScores = [];

class answerChoice{
    answer;
    isCorrect;
    constructor(a, correct){
        this.answer = a;
        this.isCorrect = correct;
    }
}

class highScore{
    initials;
    score;
    constructor(init, number){
        this.initials = init;
        this.score = number;
    }
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
var populateQuestionArray = function(){
    //add questions to this function!
    var text = "What is your favorite color?";
    var answers = [(new answerChoice("green","correct")),(new answerChoice("blue","incorrect")),(new answerChoice("red","incorrect"))];
    var q = new question(text,answers,questionNumber);
    questions.push(q);

    text = "What is your favorite Food?";
    answers = [(new answerChoice("Chocolate","correct")),(new answerChoice("Ice Cream","incorrect")),(new answerChoice("Strawberries","incorrect"))];
    q = new question(text,answers,questionNumber);
    questions.push(q);

    return;
}
var makeQuestionHTML = function(question){
    console.log(question);
    //remove old section first to clear the page.
    sectionEl.remove();
    //create new section element
    sectionEl = document.createElement("section");
    sectionEl.className = "quiz";

    var header = document.createElement("h2");
    header.textContent = "Question " + questionNumber;
    sectionEl.appendChild(header);

    var p = document.createElement("p");
    p.textContent = question.questionText;
    sectionEl.appendChild(p);

    var aDiv = document.createElement("div");
    for(var i=0; i<question.answers.length;i++){
        var inputEl = document.createElement("input");
        inputEl.name = "answer";
        inputEl.type = "radio";
        inputEl.className = "answer";
        inputEl.id="answer" + i;
        inputEl.style.display = "none";

        var labelEl = document.createElement("label");
        labelEl.for = "answer" + i;
        labelEl.textContent = question.answers[i].answer;
        labelEl.setAttribute("data-correctness",question.answers[i].isCorrect);
        labelEl.style.backgroundColor = "purple";
        labelEl.style.color = "white";
        labelEl.style.margin= "10px";

        aDiv.appendChild(inputEl);    
        aDiv.appendChild(labelEl);
    }
    sectionEl.appendChild(aDiv);
    bodyEl.appendChild(sectionEl);
questionNumber++;
return;
}

var makeintroScreen = function(){
    //make timer show time variable
    timeEl.textContent = time;
    //make header: Coding Quiz Challenge
    var header = document.createElement("h1");
    header.textContent = "Coding Quiz Challenge";

    //make paragraph: Try to answer the following code questions within the time limit.
    //keep in mind that incorrect answers will penalize your score/time by ten seconds! 
    var p = document.createElement("p");
    p.textContent = "Try to answer the following code questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    
    //Make start button: starts timer, makes us go to the first question.
    var start = document.createElement("button");
    start.className="start-button";
    start.textContent = "Start Quiz";

    sectionEl.appendChild(header);
    sectionEl.appendChild(p);
    sectionEl.appendChild(start);
    return;
}

var makeSubmitHighScoreScreen = function(){
    console.log("all done! submit high score?")

    //remove old section first to clear the page.
    sectionEl.remove();
    //create new section element
    sectionEl = document.createElement("section");
    sectionEl.className = "quiz";

    //Make header: all done!
    var header = document.createElement("h2");
    header.textContent = "All Done!";

    //Make Paragraph: your final score is x points
    var p = document.createElement("p");
    p.id = "score";
    p.textContent = "Your final score is " + time + " points.";
    
    //Make form with text box and submit button: enter initials
    formEl = document.createElement("form");
    formEl.id = "high-score-form";
    formEl.addEventListener("submit", function() { handleSubmitHighScoreClick(event)});

    var input = document.createElement("input");
    input.type="text";
    input.id = "initials";
    input.className = "initials";
    input.name = "initials";

    var label = document.createElement("label");
    label.for = "initials";
    label.textContent = "Enter Initials:";

    var submit = document.createElement("button");
    submit.type = "submit";
    submit.id = "high-score";
    submit.textContent = "Submit High Score";

    formEl.appendChild(label);
    formEl.appendChild(input);
    formEl.appendChild(submit);

    sectionEl.appendChild(header);
    sectionEl.appendChild(p);
    sectionEl.appendChild(formEl);
    bodyEl.appendChild(sectionEl);
    return;
}

var makeHighScoreScreen = function(){
    console.log("here are all the high scores!");
    //Make header: High scores
    //make ordered List: list all of the scores.
    //make go back button - goes to intro screen
    //make clear high scores - clears localStorage and updates the screen.
}


var handleStartButtonClick = function(start){
    
    makeQuestionHTML(questions[questionNumber-1]);

    //start timer
    setInt = setInterval(() => {
        if(time > 0){
            //decrement timer, update timer display
            time--;
            timeEl.textContent = time;
        }
        else{
            //go to the ending screen.
            clearInterval(setInt);
            makeSubmitHighScoreScreen();
        }
    }, 1000);

}

var handleAnswerClick = function(answer){
    //indicate whether the answer was right or wrong
    var p = document.createElement("p"); 
    if(answer.getAttribute("data-correctness") === "correct"){
        p.textContent = "Correct!";
    }
    else{
        p.textContent = "Wrong!";
        time -= 10;
    }
    if(questions[questionNumber-1] == undefined){
        //stop timer, go to the all done screen instead
        clearInterval(setInt);
        makeSubmitHighScoreScreen();
    }
    else{
        makeQuestionHTML(questions[questionNumber-1]);
    }
    return;
};

var containsInitials = function(){
    
}
var handleSubmitHighScoreClick = function(event){
    //store the high score in local storage
    event.preventDefault();
    console.dir(event);
    event.target
    var initials = document.querySelector("input[name='initials']").value;
    var score = document.querySelector("#score").value;
    var hs = new highScore(initials, score);
    //get the high scores out of localstorage and put them into the highscores array.
    if(){
        //update existing entry
    }
    else{
        //create new entry and push it into the array.
    }

};

bodyEl.addEventListener("click", function(event){
    console.log("click event");
    if(event.target.matches(".start-button")){
        //start timer, go to first question, increment question counter.
        handleStartButtonClick(event.target);
    }
    else if(event.target.matches("label")){
        //user answered a question 
        handleAnswerClick(event.target);
    }

});


//on submission of high score form:
//store the score in localStorage
//Go to high score screen

//go back button: goes to intro screen when clicked

//clear high scores: clears localStorage and updates the high scores screen
//make array of question objects to be the questions.  
populateQuestionArray();
makeintroScreen();