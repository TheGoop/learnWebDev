/*
 * Implement all your JavaScript in this file!
 */
function queue( arr = [] )
{
	this.elements = arr;
}

//pushes element to end index of array
queue.prototype.push = function(e)
{
	this.elements.push(e);
}

//removes and returns first element of array and pulls all elements back by one index
queue.prototype.pop = function(e)
{
	return this.elements.shift();
}

//returns and pops the element at the back of the queue (most recently added)
queue.prototype.popBack = function(e)
{
	return this.elements.pop()
}

queue.prototype.empty = function(e)
{
	return this.elements.length == 0;
}

queue.prototype.length = function(e)
{
	return this.elements.length
}

function testQueue()
{
	var x = new queue;
	console.log("Empty: " + x.empty())
	for (var i = 0; i < 7; i++)
	{
		x.push(i);
	}
	console.log("Added all numbers")
	console.log("Empty: " + x.empty())
	console.log("Length: " + x.length().toString())
	//console.log("Back Element: " + x.peekBack())
	console.log("Back Element: " + x.popBack())
	while (!x.empty())
	{
		console.log(x.pop())
	}
	console.log("removed all elements")
	console.log("Empty: " + x.empty())
	console.log("Length: " + x.length().toString())
	//console.log("Back Element: " + x.peekBack().toString())
	//console.log("Back Element: " + x.popBack().toString())

}

/**
queue functions:
	push
	pop
	popBack
	empty
	length

*/
 
//changes values of display bar
function setDisplay(expr)
{
	localStorage.display = expr;
	$("#display").val(expr);
}

function getDisplay()
{
	return localStorage.display;
}


function isSign(symbol)
{
	return symbol == "+" || symbol == "-" || symbol == "*" || symbol == "/" || symbol == "="; 
}


function getQueue()
{
	if (!localStorage.operations)
	{
		temp = new queue;
		return temp;
	}
	var x = JSON.parse(localStorage.operations);
	return (new queue(x.elements));
}

function saveQueue(q)
{
	localStorage.operations = JSON.stringify(q);
}

function pushToQueue(val)
{
	var temp = getQueue();

	temp.push(val);

	saveQueue(temp);
}


function popQueue()
{
	var q = getQueue();
	var firstInput = q.pop();
	saveQueue(q);
	return firstInput;
}

function popBackQueue()
{
	var q = getQueue();
	var lastInput = q.popBack();
	saveQueue(q);
	return lastInput;
}

function queueEmpty()
{
	return getQueue().empty();
}

function getExprFromQueue()
{

	var expr = "";
	while (!queueEmpty())
	{
		expr += popQueue().toString();
	}
	console.log(expr);
	return expr;
}

function resetStorage()
{
	console.log("Cleared everything off of calculator. ");
	setDisplay("");
	localStorage.clear();
	saveQueue(new queue);
	localStorage.lastKey = "";
	console.log("Instaciated everything for calculator");
}

$("button").click(
	function(){


		console.log("\n")
		console.log("Last key: " + localStorage.lastKey);

		var val = $(this).val();
		if (val == "C")
		{
			resetStorage();
			return false;

		}

		else if (Number(val) || val == 0)
		{
			console.log("Number Input");

			//if key before was = sign
			if (localStorage.lastKey == "=")
			{
				console.log("Resetting calculator for new operation set... ");
				resetStorage();
				pushToQueue(val);
				localStorage.lastKey = val;
				setDisplay(val);
			}


			//if this is the first number input
			else if ((getQueue().length() == 0))
			{
				//push to queue, and display the val
				pushToQueue(val.toString());
				setDisplay(val);


				console.log("No previous inputs, set display to val");
			}


			else{
				var lastInput = popBackQueue();

				//if previous input was a sign
				if (isSign(lastInput))
				{
					//evaluate whatever's in queue
					//push that value to queue
					//push lastInput back into queue
					//push val into queue
					//set display to val
					//while ()
					var display = val;
					var secondLast = popBackQueue();
					if (isSign(secondLast))
					{
						var expr = getExprFromQueue();
						expr = eval(expr.toString());

						pushToQueue(expr);
						pushToQueue(secondLast.toString())
						pushToQueue(lastInput.toString());
						pushToQueue(val.toString());
						setDisplay(-1 * display);
					}

					else{
						pushToQueue(secondLast.toString());

						var expr = getExprFromQueue();

						pushToQueue(eval(expr).toString());
						pushToQueue(lastInput.toString());
						pushToQueue(val.toString());
						setDisplay(val);

					}
				}

				//else if previous input was a number
				else if (Number(lastInput) || val == 0)
				{
					//if previous input was a number, we must append the value (number) input 
					//to the display

					//append to display
					setDisplay(lastInput + val.toString());
					//push new number to queue (old was popped at the beginning of the else statement)
					pushToQueue(lastInput + val.toString())

					console.log("Appended number to another number");
				}
			}

		}

		else if(isSign(val))
		{
			console.log("Sign: " + val.toString())

			//if input was an equals sign
			if (val == "=")
			{
				//evaluate whatever's in queue
				//push that value to queue
				//push lastInput back into queue
				//push val into queue
				//set display to val
				//while ()
				var lastInput = popBackQueue();

				var expr = getExprFromQueue();

				//if last value was a sign, we must preserve the sign, and eval everything before sign
				if (isSign(lastInput))
				{
					expr = eval(expr).toString();
					pushToQueue(expr);
					pushToQueue(lastInput);
					setDisplay(expr);
				}
				else
				{
					expr += lastInput;
					expr = eval(expr).toString();
					pushToQueue(expr);
					setDisplay(expr);

				}
			}

			//if input was a minus sign
			/** 
				No Change:
					5*-
					-
				Change:
					5*-- to 5-
					5--5 to 5-5
			*/

			//if user has enterred a - minus sign, we might have to override the input before that
			//   if that input before current input was a -, as -- isn't allowed
			else if (val == "-")
			{
				lastInput = popBackQueue();
				if (isSign(lastInput) && lastInput == "-")
				{
					pushToQueue(val);
				}
				else
				{
					pushToQueue(lastInput);
					pushToQueue(val);
				}
			}

			else
			{
				//if last input was also a sign, we must override that sign with the new one
				var lastInput = popBackQueue();
				if (isSign(lastInput))
				{
					//there is possibility if lastInput is -, for there to be a sign like *
					//before lastInput,
					var secondLast = popBackQueue();
					if (lastInput == "-" && isSign(secondLast))
					{
						pushToQueue(val);
					}
					else
					{
						pushToQueue(secondLast);
						pushToQueue(val);
					}
				}
				else
				{
					pushToQueue(lastInput);
					pushToQueue(val);
				}
			}

		}

		console.log(getQueue().elements)
		localStorage.lastKey = val;

		return false;

	})
