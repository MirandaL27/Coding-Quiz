var questionNumber = 1;
var score = 0;
var time = 0;
var sectionEl = document.querySelector(".quiz");
var timeEl = document.querySelector(".timer span");
var bodyEl = document.querySelector("body");
var questions = [];
var setInt;
var formEl;
var highScores = [];

//answer choice object - has answer text and isCorrect string
class answerChoice{
    answer;
    isCorrect;
    constructor(a, correct){
        this.answer = a;
        this.isCorrect = correct;
    }
}

//high score object - has initials string and score number
class highScore{
    initials;
    score;
    constructor(init, number){
        this.initials = init;
        this.score = number;
    }
}

//question object - has question text, and an array of answer objects
class question{
    questionText;
    answers = [];
    constructor(question, answers){
        this.questionText = question;
        this.answers = answers;
    }
}
var populateQuestionArray = function(){
    //add questions to this function!
    var text = "Which of the following is NOT a primitive type in JavaScript?";
    var answers = [(new answerChoice("Object","correct")),(new answerChoice("String","incorrect")),(new answerChoice("Boolean","incorrect")),(new answerChoice("Number","incorrect"))];
    var q = new question(text,answers);
    questions.push(q);

    text = "What does the && sign mean?";
    answers = [(new answerChoice("Or","incorrect")),(new answerChoice("Not","incorrect")),(new answerChoice("And","correct"))];
    q = new question(text,answers);
    questions.push(q);

    text = "Which method adds an element to the end of an array?";
    answers = [(new answerChoice("append()","incorrect")),(new answerChoice("add()","incorrect")),(new answerChoice("push()","correct")),(new answerChoice("pop()","incorrect"))];
    q = new question(text,answers);
    questions.push(q);

    text = "What's the difference between function expressions and function declarations?";
    answers = [(new answerChoice("Expressions are hoisted while declarations are not.","incorrect")),(new answerChoice("Declarations are hoisted while expressions are not.","correct")),(new answerChoice("There is no difference.","incorrect"))];
    q = new question(text,answers);
    questions.push(q);

    text = "What is i++ shorthand for?";
    answers = [(new answerChoice("Increment i by 1.","correct")),(new answerChoice("Decrement i by 1.","incorrect")),(new answerChoice("Increment i by 2","incorrect")), (new answerChoice("Set i equal to 1.","incorrect"))];
    q = new question(text,answers);
    questions.push(q);

    return;
}
var makeQuestionHTML = function(question){
    //this function takes a question object as a parameter and adds a section element with the question and answers in it to the html.
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
    aDiv.id = "answer-container";
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

        aDiv.appendChild(inputEl);    
        aDiv.appendChild(labelEl);
    }
    sectionEl.appendChild(aDiv);
    bodyEl.appendChild(sectionEl);
questionNumber++;
return;
}

var makeintroScreen = function(){
//This function makes the start screen
    document.querySelector("header").style.display = "flex";
    //remove old section first to clear the page.
    sectionEl.remove();
    //create new section element
    sectionEl = document.createElement("section");
    sectionEl.className = "quiz";

    time = 120;
    questionNumber = 1;
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
    bodyEl.appendChild(sectionEl);
    return;
}

var makeSubmitHighScoreScreen = function(){
    //this function makes the screen right before the high score screen
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
    //this function makes the high score screen
    //get rid of header
    document.querySelector("header").style.display = "none";

    if (highScores.length == 0){
        //check localstorage
        if(localStorage.getItem("HighScores")){
            highScores = JSON.parse(localStorage.getItem("HighScores"));
        }
    }
    //sort the high scores in the array so that they appear in ascending order
    highScores = highScores.sort((a, b) => {
        if(a.score > b.score){
            return -1;
        }
        if(a.score < b.score){
            return 1;
        }
        return 0;
    } );

    //remove old section first to clear the page.
    sectionEl.remove();
    //create new section element
    sectionEl = document.createElement("section");
    sectionEl.className = "quiz";

    //Make header: High scores
    var header = document.createElement("h2");
    header.textContent = "High Scores"

    var ol = document.createElement("ol");
    ol.id = "high-score-list";
    for(var i = 0 ; i<highScores.length;i++){
        //make an ordered list of the scores
        var li = document.createElement("li");
        li.className = "score-item";
        li.textContent = highScores[i].initials + " " + highScores[i].score; 
        ol.appendChild(li);
    }
    var back = document.createElement("button");
    back.id = "back-button";
    back.textContent = "Go Back";
    var clear = document.createElement("button");
    clear.id = "clear-button";
    clear.textContent = "Clear High Scores"

    sectionEl.appendChild(header);
    sectionEl.appendChild(ol);
    sectionEl.appendChild(back);
    sectionEl.appendChild(clear);
    bodyEl.appendChild(sectionEl);
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
    p.className="correct";
    if(answer.getAttribute("data-correctness") === "correct"){
        p.textContent = "Correct!";
        p.style.color = "black";
        p.style.backgroundColor = "palegreen";
        p.style.padding = "15px";
        p.style.borderRadius="10px";
        p.style.margin= "10px";
    }
    else{
        p.textContent = "Wrong!";
        p.style.backgroundColor = "pink";
        p.style.padding = "15px";
        p.style.color = "black";
        p.style.borderRadius="10px";
        p.style.margin= "10px";
        time -= 10;
        timeEl.textContent = time;
        
    }
    sectionEl.appendChild(p);
    //the setTimeout() functions delay the appearance of the next question so that the user can see whether their answer was correct.
    if(questions[questionNumber-1] == undefined){
        //stop timer, go to the all done screen instead
        clearInterval(setInt);
        setTimeout(() => { makeSubmitHighScoreScreen();
            
        }, 1000);
        
    }
    else{
        //go to the next question
        setTimeout(() => { makeQuestionHTML(questions[questionNumber-1]);
            
        }, 1000);
        
    }
    return;
};

var handleSubmitHighScoreClick = function(event){
    //store the high score in local storage
    event.preventDefault();
    event.target
    var initials = document.querySelector("input[name='initials']").value;
    var score = time;
    var hs = new highScore(initials, score);
    //get the high scores out of localstorage and put them into the highscores array.
    if(localStorage.getItem("HighScores")){
        highScores = JSON.parse(localStorage.getItem("HighScores"));
    }
    //create new entry and push it into the array.
    highScores.push(hs);

    localStorage.setItem("HighScores",JSON.stringify(highScores));
    //go to high scores page
    makeHighScoreScreen();
};

var clearHighScores = function(){
    highScores.length = 0;
    localStorage.removeItem("HighScores");
    makeHighScoreScreen();
}

bodyEl.addEventListener("click", function(event){
    if(event.target.matches(".start-button")){
        //start timer, go to first question, increment question counter.
        handleStartButtonClick(event.target);
    }
    else if(event.target.matches("label")){
        //user answered a question 
        handleAnswerClick(event.target);
    }
    else if(event.target.matches("#back-button")){
        //user clicked back button, go to the intro screen.
        makeintroScreen();
    }
    else if(event.target.matches("#clear-button")){ 
        //user clicked clear button, clear high scores
        clearHighScores();
    }
    else if(event.target.matches("#view-high-scores")){
        //go to high scores
        makeHighScoreScreen();
    }

});

//make array of question objects to be the questions.  
populateQuestionArray();
makeintroScreen();