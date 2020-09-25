/*
 * Implement all your JavaScript in this file!
 */




//this will store the operation in play
var stack = [];

//keeps track of current number on display
var display = "";


var currentNumber;


var operationMap = {
	"addButton" : (a, b) => a+b,
	"subtractButton" : (a, b) => a-b,
	"multiplyButton" : (a, b) => a*b,
	"divideButton" : (a, b) => a/b,
};

//stack is an array, following a typical operation's expression
//number, operation, number
//we will represent the operation by their button IDs, 
//and use operationMap above to map the button IDs to their operation
function evalStack()
{
	return operationMap[stack[1]](stack[0], stack[2])
}

function setDisplay(s)
{
	$("#display").val(s);
}


$("clearButton").click( function(){

	stack = [];
	display = "";
	currentNumber = "";
	console.log("Cleared");

})


$(".num").click( function() {
	var input = $(this).val();
	console.log("Number: " + input.toString());



})

$(".operator").click( function() {
	var input = $(this).val();
	console.log("Operator: " + input.toString());

})

$("#equalsButton").click( function(){

	stack = [];
	display = "";
	currentNumber = "";
	console.log("Evaluated");

})
