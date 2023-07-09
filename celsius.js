celsius = [];
fahrenheit = [];
var correctAnswer = 0;
var numCorrect = 0;
var numTotal = 0;
var q = 0;
var a = 0;

// generate list of celsius and fahrenheits
for (let i = -15; i < 45; i += 2) {
	celsius.push(i);
	fahrenheit.push((i*9/5 + 32).toFixed(1));
}

// generate a random index with a gaussian distribution
function generateIndex() {
	const u = 1 - Math.random();
	const v = Math.random();
	const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
	return Math.min(Math.max(Math.floor(z * 8 + celsius.length/2), 0), celsius.length - 1);
}

// pick a celsius value and 4 possible fahrenheit answers
// returns [celsius_value, array of fahrenheit values]
function generateQuestion(){

	// pick a random element from the list of celsiuses
	//var idx = Math.floor(Math.random()*celsius.length);
	var idx = generateIndex();
	q = celsius[idx];
	a = fahrenheit[idx];

	// pick 4 random answers near the actual answer
	var answerIndices = new Set()

	var possibleAnswers = fahrenheit.slice(Math.max(0, idx-5), Math.min(idx+6, fahrenheit.length));
	idx = Math.min(5, idx);
	answerIndices.add(idx);

	while (answerIndices.size != 4) {
		answerIndices.add(Math.floor(Math.random() * possibleAnswers.length));
	}

	// randomly select position of correct answer
	correctAnswer = Math.floor(Math.random() * 4);

	answerIndices.delete(idx);
	answerIndices = Array.from(answerIndices);

	var answers = [];

	// insert correct answer at the random index
	for (let i = 0; i < 4; i++) {
		if(i < correctAnswer) {
			answers.push(possibleAnswers[answerIndices[i]]);
		}
		else if (i > correctAnswer) {
			answers.push(possibleAnswers[answerIndices[i-1]]);
		}
		else {
			answers.push(possibleAnswers[idx]);
		}
	}

	return [q, answers];
}

// display a new question
function updateQuestion(){
	values = generateQuestion();
	question = values[0];
	answers = values[1];


	$("#question").html(question + "° C");

	for (let i = 0; i < 4; i++) {
		var element_id = "#answer-" + i;
		$(element_id).html(answers[i] + "° F");
	}

}

// display correct/incorrect, update score, and display a new question
function pressAnswer(button_id){
	numTotal += 1;
	console.log(button_id)
	console.log(correctAnswer)
	if(button_id == correctAnswer) {
		numCorrect += 1;
		$("#answer_text").html("Correct! " + q + "° C is " + a + "° F!");
		$("#answer_text").removeClass("incorrect");
		$("#answer_text").addClass("correct");
	}
	else {
		$("#answer_text").html("Incorrect! " + q + "° C is " + a + "° F!");
		$("#answer_text").removeClass("correct");
		$("#answer_text").addClass("incorrect");
	}

	$("#score").html("Score: " + Math.floor((numCorrect / numTotal)*100) + "% (" + numCorrect + "/" + numTotal + ")");

	updateQuestion();
}



window.onload = function () {
	updateQuestion();
}