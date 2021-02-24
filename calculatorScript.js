
let int1 = "";		//To hold the first inputted number
let int2 = "";		//To hold the second inputted number
let total;			//To hold the total
let int1Done = false;		//Boolean to mark when the operator was pressed, indicating that we are done building int1
let op = "";				//To hold the operator
let decimal = false;		//Boolean to mark if there was already a decimal added to the number


const numButtons = document.querySelectorAll('.buttonNum');		//Query selector for all of the number buttons
const opButtons = document.querySelectorAll('.opButton');		//Query selector for all of the operator buttons
const calculateButton = document.querySelector('#calculateButton');		//Query selector for the calculate (enter) button	
const answer = document.querySelector('#answer');					//For the screen
const acButton = document.querySelector('#acButton');				//For the 'All Clear' button
const backButton = document.querySelector('#backButton');			//For the 'delete' button
const decimalButton = document.querySelector('#decimalButton');		//For the decimal button


//Loops through the number buttons, adding an click event listener that will add the pressed key
//to int1 or int2
numButtons.forEach((button) => {
	button.addEventListener('click', intFunction);
});

//Loops through the operator buttons, assigning the pressed operator to the op variable
opButtons.forEach((button) => {
	button.addEventListener('click', opFunction);
});

//For the enter button
calculateButton.addEventListener('click', operate);

//For the "All Clear" button
acButton.addEventListener('click', clearScreen);

//For the 'delete' button
backButton.addEventListener('click', goBack);

//For the decimal button
decimalButton.addEventListener('click', addDecimal);


//Function for the 'delete' button. This function uses the int1Done boolean to find whether it need to remove the last 
//integer that was inputted from the int1 or int2 variable. Then it uploads it to the screen
function goBack() {
	if (!int1Done) {
		int1 = int1.slice(0, int1.length - 1);
		answer.textContent = int1;
	}
	else {
		int2 = int2.slice(0, int2.length - 1);
		answer.textContent = int2;
	}
};


//This function is for the 'decimal' button. It uses the decimal boolean to check if there has already been a decimal added,
//then it uses the int1Done boolean to check if the decimal needs to be added to int1 or int2. If a decimal was already
//added the it returns.
function addDecimal() {
	if (!decimal) {
		if (!int1Done) {
			int1 += this.textContent;
			answer.textContent = int1;
			decimal = true;
		}
		else {
			int2 += this.textContent;
			answer.textContent = int2;
			decimal = true;
		}
	}
	else { return; }
}

//This function is for the 'numButton'. It adds a the pressed number to either int1 or int2. It uses the int1Done boolean
//to check if the number should be added to int1 or int2, then it checks if the int1/2 length is larger than the
//screen, if so, it returns. 
function intFunction() {
	if (!int1Done) {
		if (int1.length > 11) { return; }
		else {
			int1 += this.textContent;
			//   if(int1 === "0"){
			//    int1 = "";
			// }
			answer.textContent = int1;
		}
	}
	else {
		if (int2.length > 11) { return; }
		else {
			int2 += this.textContent;
			//   if(int2 === "0"){
			//    int1 = "";
			//   }
			answer.textContent = int2;
		}//}
	}
};


//This function is for the opButtons. It first checks the boolean int1Done to determine if it should act as the enter button and 
//perform the calculation. If int1Done is false, then it saves the operator to the op variable, changes int1Done to true (since 
//we're now done with int1), and resets decimal to false to allow int2 to receive decimals. If int1Done is true, then it performs
//calculations.
function opFunction() {
	if (!int1Done) {
		op = this.textContent;
		int1Done = true;
		decimal = false;
	}
	else {
		operate();
		op = this.textContent;
		int1 = total;
		int2 = "";
	}
};

//The operate function is triggered by the enter button being pressed, or a second operator being pressed.
//It first checks if int1 or int2 are empty, suggesting enter was hit too early. If they are not empty
//then it uses a switch to check which operation to calculate.
function operate() {
	decimal = false;
	console.log("Operator error");
	if ((int1 === "") || (int2 === "")) {
		console.log("here");
		return;
	}
	else {
		switch (op) {
			case "+":
				total = add();
				break;
			case "-":
				total = subtract();
				break;
			case "/":
				total = divide();
				break;
			case "x":
				total = multiply();
				break;
			case "%":
				total = remainder();
				break;
		}
		displayAnswer();
	}
};


//Used to display the formatted total to the screen. If the total was null (result of int1/0), then it displays an error
//message and resets the calculator. If the total is a valid number, it checks the length of the number to determine 
//how to format the total based on the screen size.
function displayAnswer() {
	if (total === null) { 
		clearScreen();
		answer.textContent = 'Not Happening';
		return; }
	else {
		let lengthtest = Math.floor(total).toString().length;	//variable to hold the length of the rounded, whole number
		let length = total.toString().length;					//variable to hold the total length of the number
		if (length > 10) {
			if (lengthtest > 10) {						//total is too long so it needs to be converted to exponential form
				answer.textContent = expo(total, 6);
			}
			else {
				let dp = 9 - lengthtest;				//Total has too many decimal places, so it must be rounded
				answer.textContent = total.toFixed(dp);
			}
		}
		else {											//Total is fine to display on the screen
			answer.textContent = total;
		}
	}
}

//Converts a number to exponential form.
function expo(x, f) {
	return Number.parseFloat(x).toExponential(f);
}


//returns int1+int2
function add() {
		return parseFloat(int1) + parseFloat(int2);
};

//returns int1-int2
function subtract() {
		return parseFloat(int1) - parseFloat(int2);
};

//returns int1/int2. If int2 is 0, then it returns null, leading to an error message and the calling of clearScreen()
function divide() {
	if (int2 === "0") {
		return null;
	}
	else {
		return parseFloat(int1) / parseFloat(int2);
	}
};

//Returns int1*int2
function multiply() {
		return parseFloat(int1) * parseFloat(int2);
};

//Returns the remainder of int1%int2
function remainder() {
	return parseFloat(int1) % parseFloat(int2);
};

//Clears the screen, resets the booleans, and clears the variables
function clearScreen() {
	int1 = "";
	int2 = "";
	int1Done = false;
	total = "";
	op = "";
	answer.textContent = "";
	decimal = false;
};



//This event listener determines which key was pressed and triggers the click event
//for the appropriate button
window.addEventListener('keydown', function (e) {
	const buttonKey = document.querySelector(`button[data-key="${e.keyCode}"]`);
	buttonKey.click();
});

