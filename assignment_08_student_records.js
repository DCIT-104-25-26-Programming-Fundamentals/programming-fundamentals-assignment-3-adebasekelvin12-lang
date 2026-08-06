// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');

// Array that holds all student record objects.
// Each object: { name: string, id: number, scores: number[] }
let students = [];

// -----------------------------------------------------------------------------
// calculateAverage(scores)
// Returns the mean of the given scores array, or 0 if the array is empty.
// -----------------------------------------------------------------------------
function calculateAverage(scores) {
  if (scores.length === 0) {
    return 0;
  }

  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum / scores.length;
}

// -----------------------------------------------------------------------------
// findStudentById(id)
// Returns the student object with the matching ID, or undefined if not found.
// -----------------------------------------------------------------------------
function findStudentById(id) {
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      return students[i];
    }
  }
  return undefined;
}

// -----------------------------------------------------------------------------
// FEATURE 1 — addStudent()
// Prompts for name, unique ID, and scores, then stores the student object.
// -----------------------------------------------------------------------------
function addStudent() {
  const name = readlineSync.question('Student name: ').trim();

  if (name === '') {
    console.log('Error: Student name cannot be empty.');
    return;
  }

  const id = readlineSync.questionInt('Student ID: ');

  // Ensure the ID is unique.
  if (findStudentById(id) !== undefined) {
    console.log(`Error: A student with ID ${id} already exists.`);
    return;
  }

  const scoreCount = readlineSync.questionInt('How many scores? ');

  if (!Number.isInteger(scoreCount) || scoreCount < 0) {
    console.log('Error: Number of scores must be 0 or a positive integer.');
    return;
  }

  const scores = [];
  for (let i = 1; i <= scoreCount; i++) {
    const score = readlineSync.questionInt(`Enter score ${i}: `);
    scores.push(score);
  }

  const student = {
    name: name,
    id: id,
    scores: scores
  };

  students.push(student);
  console.log(`Student "${name}" added successfully.`);
}

// -----------------------------------------------------------------------------
// FEATURE 2 — displayAllStudents()
// Prints a formatted table of every student with name, ID, scores, average.
// Prints a message if there are no records.
// -----------------------------------------------------------------------------
function displayAllStudents() {
  if (students.length === 0) {
    console.log('No student records found. Add a student first!');
    return;
  }

  console.log('');
  console.log('--------------------------------------------' +
              '--------------------------------');
  console.log(
    'Name'.padEnd(22, ' ') +
    'ID'.padEnd(12, ' ') +
    'Scores'.padEnd(22, ' ') +
    'Average'
  );
  console.log('--------------------------------------------' +
              '--------------------------------');

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const avg = calculateAverage(student.scores).toFixed(2);
    const scoresStr = student.scores.length > 0
      ? student.scores.join(', ')
      : '(none)';

    console.log(
      student.name.padEnd(22, ' ') +
      String(student.id).padEnd(12, ' ') +
      scoresStr.padEnd(22, ' ') +
      avg
    );
  }

  console.log('--------------------------------------------' +
              '--------------------------------');
}

// -----------------------------------------------------------------------------
// FEATURE 3 — calculateAverageForStudent()
// Prompts for a student ID and prints that student's average score.
// Prints an error if the ID is not found.
// -----------------------------------------------------------------------------
function calculateAverageForStudent() {
  if (students.length === 0) {
    console.log('No student records found. Add a student first!');
    return;
  }

  const id = readlineSync.questionInt('Enter student ID: ');
  const student = findStudentById(id);

  if (student === undefined) {
    console.log(`Error: No student found with ID ${id}.`);
    return;
  }

  const avg = calculateAverage(student.scores).toFixed(2);
  console.log(`${student.name}'s average score: ${avg}`);
}

// -----------------------------------------------------------------------------
// showMenu()
// Prints the formatted system menu.
// -----------------------------------------------------------------------------
function showMenu() {
  console.log('');
  console.log('================================');
  console.log('   STUDENT RECORD SYSTEM MENU');
  console.log('================================');
  console.log('1. Add student');
  console.log('2. Display all students');
  console.log('3. Calculate average score');
  console.log('4. Quit');
}

// -----------------------------------------------------------------------------
// main()
// Runs the main menu loop until the user chooses to quit.
// -----------------------------------------------------------------------------
function main() {
  console.log('Welcome to the Student Record Management System!');

  let running = true;

  while (running) {
    showMenu();
    const choice = readlineSync.questionInt('Enter your choice (1-4): ');

    switch (choice) {
      case 1:
        addStudent();
        break;
      case 2:
        displayAllStudents();
        break;
      case 3:
        calculateAverageForStudent();
        break;
      case 4:
        running = false;
        console.log('Goodbye!');
        break;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 4.');
    }
  }
}

// Run the program.
main();