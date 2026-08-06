// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');

// -----------------------------------------------------------------------------
// add(a, b)
// Returns the sum of a and b.
// -----------------------------------------------------------------------------
function add(a, b) {
  return a + b;
}

// -----------------------------------------------------------------------------
// subtract(a, b)
// Returns a minus b.
// -----------------------------------------------------------------------------
function subtract(a, b) {
  return a - b;
}

// -----------------------------------------------------------------------------
// multiply(a, b)
// Returns the product of a and b.
// -----------------------------------------------------------------------------
function multiply(a, b) {
  return a * b;
}

// -----------------------------------------------------------------------------
// divide(a, b)
// Returns a divided by b. Throws an Error if b is 0 so the caller can
// display a clean message instead of letting the program produce Infinity.
// -----------------------------------------------------------------------------
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }
  return a / b;
}

// -----------------------------------------------------------------------------
// modulus(a, b)
// Returns the remainder of a divided by b.
// -----------------------------------------------------------------------------
function modulus(a, b) {
  return a % b;
}

// -----------------------------------------------------------------------------
// exponentiate(a, b)
// Returns a raised to the power of b (a^b).
// -----------------------------------------------------------------------------
function exponentiate(a, b) {
  return a ** b;
}

// -----------------------------------------------------------------------------
// performOperation(choice)
// Reads the two operands, dispatches to the correct operation function,
// and prints the result formatted to 2 decimal places.
// The operator parameter controls which symbol is shown in the output.
// -----------------------------------------------------------------------------
function performOperation(choice) {
  const a = readlineSync.questionInt('Enter first number : ');
  const b = readlineSync.questionInt('Enter second number: ');

  let result;
  let operator;

  try {
    switch (choice) {
      case 1:
        result = add(a, b);
        operator = '+';
        break;
      case 2:
        result = subtract(a, b);
        operator = '-';
        break;
      case 3:
        result = multiply(a, b);
        operator = '*';
        break;
      case 4:
        result = divide(a, b);
        operator = '/';
        break;
      case 5:
        result = modulus(a, b);
        operator = '%';
        break;
      case 6:
        result = exponentiate(a, b);
        operator = '**';
        break;
      default:
        return; // Should never happen, but be safe.
    }

    console.log(`Result: ${a} ${operator} ${b} = ${result.toFixed(2)}`);
  } catch (error) {
    // divide() throws when dividing by zero; handle it gracefully.
    console.log(`Error: ${error.message}`);
  }
}

// -----------------------------------------------------------------------------
// showMenu()
// Prints the formatted calculator menu.
// -----------------------------------------------------------------------------
function showMenu() {
  console.log('');
  console.log('============================');
  console.log('      SIMPLE CALCULATOR');
  console.log('============================');
  console.log('1. Addition');
  console.log('2. Subtraction');
  console.log('3. Multiplication');
  console.log('4. Division');
  console.log('5. Modulus');
  console.log('6. Exponentiation');
  console.log('7. Quit');
}

// -----------------------------------------------------------------------------
// main()
// Runs the main menu loop until the user selects Quit.
// -----------------------------------------------------------------------------
function main() {
  console.log('Welcome to the Simple Calculator!');

  let running = true;

  while (running) {
    showMenu();
    const choice = readlineSync.questionInt('Select an operation (1-7): ');

    if (choice >= 1 && choice <= 6) {
      performOperation(choice);
    } else if (choice === 7) {
      running = false;
      console.log('Goodbye!');
    } else {
      console.log('Invalid choice. Please select a number between 1 and 7.');
    }
  }
}

// Run the program.
main();