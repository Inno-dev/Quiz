//implementing dark mode
const buttonToBeClicked = document.querySelector('button');
buttonToBeClicked.addEventListener("click", darkMode);

function darkMode() { 
  if (document.body.style.background) {
  document.body.style.background = "";
  document.body.style.color = "#111";
} else{
  document.body.style.background = "#111";
  document.body.style.color = "#fff";
}
}
//implmenting quiz

var totalQuestions = [
  {
  question: "2 + 2 is equal to ?",
  choices: ["1", "2", "4"],
  correctAnswer: "4"
}, {
  question: "2 x 2 is equal to?",
  choices: ["4", "8", "12"],
  correctAnswer: "4"
}, {
  question: "6 / 2 is equal to ?",
  choices: ["1", "3", "6"],
  correctAnswer: "3"
}, 
{
  question: " Do camels have three sets of eyelids?",
  choices: ["False", "True"],
  correctAnswer: "True"
},
{
  question: " Is China the largest country in the world??",
  choices: ["False", "True"],
  correctAnswer: "False"
},
{
  question: " Spiders have 6 legs. Is it true or false?",
  choices: ["False", "True"],
  correctAnswer: "False"
},
{
  question: "2 + 2 and 2 x 6 is equal to ?",
  choices: ["4", "12","14","20"],
  correctAnswer: ["4","12"],
  checkBox : true
}
];

function Quiz(options) {
  var elem = options.elem;
  var totalQuestions = options.questions;
  var questionsLength = totalQuestions.length;

  var answers = [];
  var questions = [];

  var correctAnswers = 0;
  var currentQuestion;

  generateQuestions(totalQuestions);
  
  initQuiz();

  function generateQuestions(q) {
    for (var i = 0; i < questionsLength; i++) {
      var question = document.createElement('div');
      question.classList.add('question');
      question.id = 'question';

      var title = document.createElement('h1');
      title.textContent = q[i].question;

      question.appendChild(title);

      var list = document.createElement('ul');

      for (var j = 0, len = q[i].choices.length; j < len; j++) {
        var choice = document.createElement('li');
        if(q[i].checkBox == true )
        {
          var check = document.createElement('input');
          check.setAttribute('type', 'checkbox');
          check.setAttribute('name', 'question');
          check.setAttribute('value', q[i].choices[j]);
          var choicetext = document.createElement('label');
          choicetext.setAttribute('for', check.name);
          choicetext.textContent = q[i].choices[j];
  
          choice.appendChild(check);
          choice.appendChild(choicetext);
  
          list.appendChild(choice);
         
        }
        else{
        var check = document.createElement('input');
        check.setAttribute('type', 'radio');
        check.setAttribute('value', q[i].choices[j]);
        check.setAttribute('name', 'question');

        var choicetext = document.createElement('label');
        choicetext.setAttribute('for', check.name);
        choicetext.textContent = q[i].choices[j];

        choice.appendChild(check);
        choice.appendChild(choicetext);

        list.appendChild(choice);
      }}

      var prevQuestionBtn = document.createElement('button');
      prevQuestionBtn.textContent = 'Previous Question';
      prevQuestionBtn.addEventListener('click', prevQuestion);

      var nextQuestionBtn = document.createElement('button');

      if (i === questionsLength - 1) {
        nextQuestionBtn.textContent = 'Get Result';
        nextQuestionBtn.addEventListener('click', finishQuiz);
      } else {
        nextQuestionBtn.textContent = 'Next Question';
        nextQuestionBtn.addEventListener('click', nextQuestion);
      }

      question.appendChild(list);

      if (i > 0) question.appendChild(prevQuestionBtn);
      question.appendChild(nextQuestionBtn);

      questions.push(question);
    }
  }

  function showQuestions(number) {
    var warning = elem.getElementsByClassName('warning')[0];
    if (warning) {
      elem.removeChild(warning);
    }
    elem.appendChild(questions[number]);  }

  function initQuiz() {
    currentQuestion = 0;
    showQuestions(currentQuestion);
  }

  function checkAnswers() {
    for (var i = 0; i < questionsLength; i++) {

if(i==6)
{
  const abc = answers.slice(6,)
  if(abc.sort().join(',')=== totalQuestions[i].correctAnswer.sort().join(','))
  {
    correctAnswers++    
  }

}
else if( i !=6 && totalQuestions[i].correctAnswer === answers[i] )
{
  correctAnswers++
}
    }
}

  function validateAnswer() {
    var listItems = elem.getElementsByTagName('input');
    var answered = false;
    var checkAns = [];
    for (var i = 0, len = listItems.length; i < len; i++) {
 
      if (listItems[i].checked) {

answers.push(listItems[i].value);
answered = true;
      }


    }
    if (!answered && !elem.getElementsByClassName('warning')[0]) {
      var warning = document.createElement('span');
      warning.textContent = "Answer the question before you proceed, please.";
      warning.classList.add('warning');

      elem.appendChild(warning);
    }
    return answered;
  }

  function nextQuestion() {
    if (validateAnswer()) {
      elem.removeChild(questions[currentQuestion]);
      currentQuestion++;
      showQuestions(currentQuestion);
    }
  }

  function prevQuestion() {
    elem.removeChild(questions[currentQuestion]);
    answers.pop();
    currentQuestion--;
    showQuestions(currentQuestion);
  }


  function finishQuiz() {
    if (validateAnswer()) {
      checkAnswers();
      elem.removeChild(questions[currentQuestion]);
      var result = document.createElement('p');
      if (correctAnswers < 4) {
        result.style.color = 'red';
        result.textContent = "Your score is " + correctAnswers;
      } else if(correctAnswers >= 4 && correctAnswers < 7) {
        result.style.color = 'orange';
        result.textContent = "Your score is: " + correctAnswers;
      }
      else
      {
        result.style.color = 'green';
        result.textContent = "Congratulations all the answers is correct";
      }
      elem.appendChild(result);
    }
  }
}

var quiz = new Quiz({
  elem: document.getElementById('quiz'),
  questions: totalQuestions
});