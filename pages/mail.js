// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZGhJpHx2G5B5BpkDvfo8s4mKzKAM-IVE",
  authDomain: "dhruv-rathod---portfolio.firebaseapp.com",
  databaseURL: "https://dhruv-rathod---portfolio-default-rtdb.firebaseio.com",
  projectId: "dhruv-rathod---portfolio",
  storageBucket: "dhruv-rathod---portfolio.firebasestorage.app",
  messagingSenderId: "376342337196",
  appId: "1:376342337196:web:172667f925821da4c6b109",
  measurementId: "G-K06H4BVMTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Reference to 'contactForm' node in Firebase
var contactFormDb = ref(db, 'contactForm');

// Event listener for form submission
document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault(); // Prevent page refresh

    // Get form values
    var name = getElementVal('name');
    var email = getElementVal('email');
    var message = getElementVal('message');
    var timestamp = Date.now(); // Current time in milliseconds

    console.log(name, email, message, timestamp);

    // Use the user's name as the unique ID (Note: handle potential conflicts for identical names)
    const userRef = ref(db, 'contactForm/' + name); // Using the name as the key

    // Write form data to Firebase
    set(userRef, {
        name: name,
        email: email,
        message: message,
        timestamp: timestamp // Add the timestamp
    })
    .then(() => {
        // Reset form fields
        document.getElementById('contactForm').reset();

        // Show success message below the form
        const successMessage = document.createElement('p');
        successMessage.textContent = "Form submitted successfully!";
        successMessage.style.color = 'green';  // Style the success message

        // Append the success message below the form
        const formMessageDiv = document.getElementById('formMessage');
        formMessageDiv.appendChild(successMessage);

        // Hide the success message after 2 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 2000); // 2000 milliseconds (2 seconds)

        // Smooth scroll to the header section
        document.getElementById('headerSection').scrollIntoView({
            behavior: 'smooth', // Smooth scrolling
            block: 'start' // Align to the top of the section
        });
    })
    .catch((error) => {
        // Show error message if form submission fails
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Error submitting form: " + error.message;
        errorMessage.style.color = 'red';

        // Append the error message below the form
        document.getElementById('formMessage').appendChild(errorMessage);
    });
}

// Helper function to get input values
const getElementVal = (id) => {
    return document.getElementById(id).value;
};