/*
 * Implement all your JavaScript in this file!
 */



//need to keep track of the number to display
var numDisplayed;
//if theres an operation placed after a number, 
//we must clear screen
//but we must still remember that number
var prevNumber;
//user will enter a number after operation, and operation won't appear
//so we must keep track of it
var lastOperation;



//call this function when an operation is entered into calculator
//after this function is called, we must make lastOperation equal to the operation just entered
function handleOperation(prevNum, lastOp, currNum, currOp)
{
	//if no previous number, then no operation to perform
	if (prevNum == undefined)
	{
		return currNum;
	}

	//if no previous operation, then number remains unchanged
	if (lastOp == undefined)
	{
		return currNum;
	}

	//else, there is a previously entered operation, 
	// and we have to update displayed number
	// by performing the operation on prevNum and currNum
	switch(lastOp)
	{
		case "+":
			currNum = Number(currNum) + Number(prevNum)
			break;

		case "-":
			currNum = Number(currNum) - Number(prevNum)
			break;

		case "*":
			currNum = Number(currNum) * Number(prevNum)
			break;

		case "/":
			currNum = Number(currNum) / Number(prevNum)
			break;
		default:
			break;
	}

	return currNum;


}

