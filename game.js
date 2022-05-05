var BALLOON_RADIUS = 20;
var BALLOON_COLORS;

var CREATE_DELAY = 400;
var FLOAT_DELAY = 15;
var FLOAT_SPEED = -2;

var winScore;
var color;
var nextButton;
var startButton;
var nextText;
var startText;
var sliderButton;
var balloons = [];
var numbers = [];
var score = 0;
var alreadyDone = false
var scoreText;
var goalText;
var questionText;
var gameBackground;
var answer;

function updateQuestion() {
    var x = Randomizer.nextInt(3, 10);
    var y = Randomizer.nextInt(3, 10);
    answer = x * y;
    questionText.setText("What is " + x + "x" + y + "?");
}

function addQuestion() {
  question = Randomizer.nextInt(150, 250);
  questionText = new Text("Question:" + "?")
  questionText.setPosition(
    getWidth() / 2 - questionText.getWidth() / 2,
    questionText.getHeight()
  )
  add(questionText);
}

function start() {
    BALLOON_COLORS = [ Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW];
    titleScreen();
    startButton =  new Rectangle(50, 60);
    scoreText = new Text("Score: " + score, "14pt Courier")
    winScore = Randomizer.nextInt(50, 150);
    goalText = new Text("Goal: " + winScore, "14pt Courier")
 winScore = Randomizer.nextInt 

}

function eventHandler(e) {
    var balloon = getElementAt(e.getX(), e.getY());
    if (balloon != null && balloon.type == "Circle")  {
        popBalloon(balloon);
    }
}

function setBackground(){
    // makes a game background variable and adds it to the screen
    // this has got to be done before anything else is added
    gameBackground = new 
WebImage("https://codehs.com/uploads/5da54986fefdcd808c2392579eabb169");
    gameBackground.setSize(getWidth(), getHeight());
    gameBackground.setPosition(0, 0);
    add(gameBackground);
    addQuestion();
    updateQuestion();
}

function addBackground() {
    var firstTitleImage = new WebImage("https://codehs.com/uploads/902ab9670eda64c820bfa530597d2624");
    firstTitleImage.setSize(getWidth(), getHeight());
    firstTitleImage.setPosition(0, 0);
    add(firstTitleImage);
}

function titleScreen(){
   
   // there will be two title screens, one saying the instructions and game name, and the other
   // being the difficulty slider
   // first title screen
   addBackground();

   
    // make the center "Balloon Pop!" text
    var mainText = new Text("Balloon Pop!", "42pt Monospace");
    var x = getWidth() / 2 - (mainText.getWidth() / 2);
    var y = getHeight() / 3 + (mainText.getHeight() / 2);
    mainText.setPosition(x, y);
    add(mainText);
    
    // make instructions text
    makeText("How to Play:", "18pt Monospace", getWidth() / 2, 160);
    makeText("Hover over the balloons with your", "14pt Monospace", getWidth() / 2, 175 - 80);
    makeText("curser to answer the questions. ", "14pt Monospace", getWidth() / 2, 205 - 80);
    makeText("d.", "14pt Monospace", getWidth() / 2, 205 - 80);
    makeText("Yellow ballons speed up the", "14pt Monospace", getWidth() / 2, 255 - 80);
    makeText("game, and blue ones slow it down. ", "14pt Monospace", getWidth() / 2, 240 - 80);
      makeText("Red ballons makes you lose points.", "14pt Monospace", getWidth() / 2, 265 - 80);

    
    // make start button
    startButton = new Rectangle(150, 50);
    startButton.setPosition((getWidth() / 2) - (startButton.getWidth() / 2), 380);
    startButton.setColor("#57a8eb");
    
    
  var startButtonBorder = new Rectangle(160, 60);
    startButtonBorder.setPosition((getWidth() / 2) - (startButtonBorder.getWidth() / 2), 375);
    startButtonBorder.setColor(Color.black);
    add(startButtonBorder);
  
     add(startButton);
    
     startText = new Text("Start", "42pt Monospace");
    startText.setPosition(getWidth()/ 2 - (startText.getWidth() / 2), 345 + startText.getWidth() / 2);
    add(startText);

  titleScreen
    // call the method to see if the button is being hovered on and clicked
    mouseMoveMethod(buttonHover);
    mouseClickMethod(buttonClick);
}


function buttonHover(e){
    
    // getting a variable for the element
    var element = getElementAt(e.getX(), e.getY());
    
    // making sure the variable isn't empty
    if(element != null){
        // if the element is a rectangle or the text in question
        if(element == nextButton || element == nextText || element == startButton || element == startText){
            // set the rectangles color
            if(element.getColor() == "#57a8eb"){
                element.setColor("#3e76a3");
            }
        // if it isn't the one we need, set the rectangle back to the original color
        }else{
            nextButton.setColor("#57a8eb");
            startButton.setColor("#57a8eb");
        }
    }
    
}

function buttonClick(e){
    // getting a variable for the element
    var element = getElementAt(e.getX(), e.getY());
    
    // making sure the var isn't empty
    if(element != null){
        // decide what rectangle it is (or if it isnt one we need, do nothing)
        if(element == nextText || element == nextButton){
            difficultyScreen();
        }else if(element == startText){
            startGame();
        }   
    }   
}

function startGame(){
   
    removeAll();

    
    // used to make sure the correct number of reds is being added to the list    
    scoreText.setPosition(3, getHeight());
    setBackground();
    add(scoreText);
    goalText.setPosition(getWidth() - goalText.getWidth() - 5, getHeight());
    add(goalText);
    
    setTimer(createBalloon, CREATE_DELAY);
    setTimer(float, FLOAT_DELAY);
   
    mouseMoveMethod(eventHandler);
    
}

function makeText(text, font, xPos, yPos){
    var text = new Text(text, font);
    var x = xPos - (text.getWidth() / 2);
    var y = yPos + (text.getWidth() / 2); 
    text.setPosition(x, y);
    add(text);
}

function createBalloon(){
    // create a balloon on a temp variable so we can add it later
    var balloonTemp = new Circle(BALLOON_RADIUS);
    var number = new Text(Randomizer.nextInt(answer - 5,  answer + 5), "14pt Courier");
    // making the percentage of red balls go up
    // using variables to make sure it hasn't been done for this score
    if(alreadyDone == false){
        if(score%10==0 && score!=0){
                BALLOON_COLORS.push(Color.red);
                // used to make sure the red color is being added to the game
                //println(BALLOON_COLORS);
        }
        alreadyDone = true;
    }
    
    // make a variable with a random color
    var randColor = BALLOON_COLORS[Randomizer.nextInt(0, BALLOON_COLORS.length - 1)];
    balloonTemp.setColor(randColor);

    var x = Randomizer.nextInt(BALLOON_RADIUS, getWidth() - BALLOON_RADIUS);
    var y = getHeight();
    balloonTemp.setPosition(x, y);
    number.setPosition(x - number.getWidth() / 2, y + BALLOON_RADIUS - 15);
    
    add(balloonTemp);
    add(number);
    // add the balloon to the big list
    balloons.push(balloonTemp);   
    numbers.push(number)
}

function float(){
    // goes through every balloon in the big list and moves it up
    for(var i = 0; i < balloons.length; i++){
        // do trash cleanup and take away circles that are off the screen
        if(balloons[i].getY() < -BALLOON_RADIUS){
            remove(balloons[i]);
            balloons.remove(i);

            remove(numbers[i]);
            numbers.remove(i)
        }
        balloons[i].move(0, FLOAT_SPEED);
        numbers[i].move(0, FLOAT_SPEED);
    }
}

function askMathQuestion() {
  var a = Randomizer.nextInt(20, 99);
  var b = Randomizer.nextInt(10, a);
  var response = parseInt(prompt("What is " + a + "-" + b + "?"));
  while(response != a-b) {
    response = parseInt(prompt("Try again: what is " + a + "-" + b + "?"));
  }
}


  
function popBalloon(balloon){
    
    var balloonIndex = balloons.indexOf(balloon);
    var numberText = numbers[balloonIndex];
    console.log(numberText.getText());
    var number = parseInt(numberText.getText())

    console.log(number)
    if(number == answer) {
        score += number;
        updateQuestion();
    } else {
        score -= 1;
    }
    // determine what color the balloon is
    if(balloon.color == Color.red){ // if red
        // update the score
        askMathQuestion()
        scoreText.setText("Score: " + score);
      
    }else if(balloon.color == Color.green){ // if green
        // update score
        scoreText.setText("Score: " + score);
        alreadyDone = false;
    }else if(balloon.color == Color.blue){
        // if its blue make the float speed slower
        scoreText.setText("Score: " + score);
        alreadyDone = false;
        FLOAT_SPEED=FLOAT_SPEED+0.25;
        // making sure fla
        if(FLOAT_SPEED>-1){
            FLOAT_SPEED=-0.25;
        }
    }else if(balloon.color == Color.yellow){
        // if its yellow make the float speed faster
        scoreText.setText("Score: " + score);
        alreadyDone = false;
        FLOAT_SPEED=FLOAT_SPEED-0.5;
    }
    
    remove(balloons[balloonIndex]);
    remove(numbers[balloonIndex]);
    balloons.remove(balloonIndex);
    numbers.remove(balloonIndex);
   
    // go make sure you aren't below 0 for score
    if(score < 0){
        // make the score 0 just because it looks good
        score = 0;
        scoreText.setText("Score: " + score);
        // go to the endGame function
        endGame();  
    }
    // check to see if you won
    if(score == winScore){
        winGame();
    }
}

 

