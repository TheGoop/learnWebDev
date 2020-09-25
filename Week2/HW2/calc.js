/*
 * Implement all your JavaScript in this file!
 */


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
function evalStack(stack)
{
	return operationMap[stack[1]](stack[0], stack[2])
}


function setDisplay(s)
{
	$("#display").val(s);
}



//this will store the operation in play
var stack = [];

//keeps track of current number on display
var display = "";


var currentNumber;


$("#clearButton").click( function(){

	stack = [];
	display = "";
	currentNumber = NaN;
	setDisplay(display)
	console.log("Cleared");

})


$(".num").click( function() {
	var input = $(this).val();
	console.log("Number: " + input.toString());


	//case where we must reset because new operation
	if (stack.length == 1 || stack.length == 3)
	{
		display = "";
		stack = [];
	}

	display += input
	setDisplay(Number(display))
	currentNumber = Number(display)
})

$(".operator").click( function() {
	var input = $(this).val();
	console.log("Operator: " + this.id);


	if (stack.length == 0)
	{
		stack.push(Number(display))
		stack.push(this.id)
		display = ""
	}

	//user only inputted a number
	else if (stack.length == 1)
	{
		stack.push(this.id)
	}

	//last input an operator, so middle of op
	else if (stack.length == 2)
	{
		//if user is not in the middle of inputting a number
		//then he must have input another operator before
		//therefore we must override it 
		if (isNaN(current))
		{
			stack[1] = this.id
		}

		//user has inputted a number
		else
		{
			stack.push(Number(display))
			display = evalStack(stack)
			setDisplay(stack)
			stack = [display, this.id]
		}
	}

	//if we just performed an op and are continuing
	else if (stack.length == 3)
	{
		stack = []
		stack.push(Number(display))
		stack.push(this.id)
	}

	else
	{
		stack.push(Number(display))
		stack.push(this.id)
		display = ""
	}

	//since operator was just played, no currentNumber being input
	currentNumber = NaN

	//
	display = ""

	



})

$("#equalsButton").click( function(){

	if (stack.length == 0)
	{
		//if user has inputted a number
		if (currentNumber)
		{
			stack = [currentNumber]
		}
	}

	else if (stack.length == 2)
	{
		if (!isNaN(currentNumber))
		{
			stack.push(Number(display))
			display = evalStack(stack)
			setDisplay(display);
		}
	}

	else if (stack.length == 3)
	{
		stack[0] = display
		display = evalStack(stack)
		setDisplay(display)
	}
	else
	{
		console.log("ERROR AT equalsButton, STACK TOO LONG")
	}



	console.log("Evaluated");

})
