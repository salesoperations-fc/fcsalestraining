/* =========================================================
   Multiple-choice exams (used by exams/product-exam.html?e=1|2|3).
   These are PLACEHOLDER questions: swap in the real ones later.

   Each exam:  { id, title, passing, questions:[ { q, options:[...], answer:<index of the right option>, why } ] }
   - id        the exam id saved to the Sheet (don't rename once people have results)
   - passing   pass mark in percent
   - why       optional one-line explanation shown after the exam
   ========================================================= */
window.LMS_EXAMS = {
  "1": { id: "exam-product-1", title: "Product Exam 1", passing: 80, questions: [
    { q: "What do cows drink?", options: ["Milk", "Water", "Soda", "Iced coffee"], answer: 1, why: "Cows drink water. The milk is what they make." },
    { q: "How many legs does a spider have?", options: ["Six", "Eight", "Ten", "Twelve"], answer: 1, why: "Eight. Six would make it an insect." },
    { q: "Which of these is a fruit?", options: ["Carrot", "Broccoli", "Banana", "Potato"], answer: 2 },
    { q: "What sound does a dog make?", options: ["Meow", "Moo", "Woof", "Quack"], answer: 2 },
    { q: "Which animal is known for a very long neck?", options: ["Giraffe", "Penguin", "Hamster", "Turtle"], answer: 0 },
    { q: "What do bees make?", options: ["Honey", "Butter", "Jam", "Cheese"], answer: 0 },
    { q: "Which of these is NOT a fruit?", options: ["Mango", "Apple", "Spinach", "Orange"], answer: 2 },
    { q: "What do you call a baby cat?", options: ["Puppy", "Kitten", "Cub", "Chick"], answer: 1 },
    { q: "Where do fish live?", options: ["In trees", "In the sky", "In water", "Underground"], answer: 2 },
    { q: "Which animal says 'oink'?", options: ["Pig", "Horse", "Sheep", "Duck"], answer: 0 }
  ] },
  "2": { id: "exam-product-2", title: "Product Exam 2", passing: 80, questions: [
    { q: "What do you usually press to turn a computer on?", options: ["The mouse wheel", "The power button", "The spacebar", "The volume knob"], answer: 1 },
    { q: "What is 2 + 2?", options: ["3", "4", "5", "22"], answer: 1, why: "4. (22 only if you are a very confident typist.)" },
    { q: "Which of these is a day of the week?", options: ["Marchsday", "Tuesday", "Janusday", "Sunmonth"], answer: 1 },
    { q: "How many minutes are in one hour?", options: ["30", "45", "60", "100"], answer: 2 },
    { q: "What is the main use of a coffee mug?", options: ["Holding a drink", "Cutting paper", "Charging a phone", "Playing music"], answer: 0 },
    { q: "Which one is a color?", options: ["Purple", "Tuesday", "Laptop", "Monday"], answer: 0 },
    { q: "How many days are in a week?", options: ["Five", "Six", "Seven", "Ten"], answer: 2 },
    { q: "Which of these do you wear on your feet?", options: ["Gloves", "Socks", "A scarf", "A hat"], answer: 1 },
    { q: "What do you use a calendar for?", options: ["Telling dates", "Cooking rice", "Measuring height", "Watering plants"], answer: 0 },
    { q: "Which month comes after March?", options: ["February", "April", "June", "January"], answer: 1 }
  ] },
  "3": { id: "exam-product-3", title: "Product Exam 3", passing: 80, questions: [
    { q: "What shape is a standard soccer ball?", options: ["Cube", "Triangle", "Sphere", "Pyramid"], answer: 2 },
    { q: "Which planet do we live on?", options: ["Mars", "Earth", "Jupiter", "Saturn"], answer: 1 },
    { q: "What is the opposite of 'hot'?", options: ["Warm", "Spicy", "Cold", "Loud"], answer: 2 },
    { q: "How many wheels does a typical bicycle have?", options: ["One", "Two", "Three", "Four"], answer: 1 },
    { q: "Which of these can fly?", options: ["A bird", "A rock", "A table", "A shoe"], answer: 0, why: "A bird. Shoes can only be thrown." },
    { q: "What do you put on a pizza?", options: ["Cheese", "Sand", "Soap", "Paper"], answer: 0 },
    { q: "What season comes after summer?", options: ["Winter", "Spring", "Autumn", "Summer again"], answer: 2 },
    { q: "Which one is the biggest?", options: ["An ant", "A cat", "An elephant", "A mouse"], answer: 2 },
    { q: "What is the color of a ripe banana?", options: ["Blue", "Yellow", "Black", "Pink"], answer: 1 },
    { q: "How many letters are in the word 'CAT'?", options: ["Two", "Three", "Four", "Five"], answer: 1 }
  ] }
};
