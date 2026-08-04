// ---------- Fetch profile data from the backend and populate the page ----------

document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
});

async function loadProfile() {
    try {
        const response = await fetch("/profile");

        if (!response.ok) {
            throw new Error("Server responded with status " + response.status);
        }

        const profile = await response.json();

        const nameEl = document.getElementById("name");
        const bioEl = document.getElementById("bio");
        const courseworkEl = document.getElementById("coursework");

        if (nameEl) nameEl.textContent = profile.name;
        if (bioEl) bioEl.textContent = profile.bio;
        if (courseworkEl) courseworkEl.textContent = profile.coursework;
    } catch (err) {
        console.error("Could not load profile data from the server:", err);
    }
}


// ---------- Original console easter eggs (unchanged) ----------

function greetUser() {
    console.log("Hello there! Welcome to Nardos Haile's portfolio console. ");
}

function showCurrentDateTime() {
    const now = new Date();
    console.log("Today's date is: " + now.toDateString());
    console.log("The current time is: " + now.toLocaleTimeString());
}

function getQuote() {
    const quotes = "Code is like humor. When you have to explain it, it's bad.";
    return quotes;
}

function getProgrammingTip() {
    const tips = [
        "Always name your variables clearly — future you will thank you.",
        "Comment your code, but explain 'why', not just 'what'.",
        "Test your code often instead of writing everything at once.",
        "Break big problems into smaller, easier problems.",
        "Reading other people's code is a great way to learn new tricks."
    ];

    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
}

function printWelcomeMessage() {
    console.log("=================================================");
    console.log(" Thanks for peeking into the console!");
    console.log(" This portfolio was built with HTML, CSS & JS.");
    console.log("=================================================");
}

function countWords(sentence) {
    const words = sentence.trim().split(" ");
    return words.length;
}

function getLuckyNumber() {
    const luckyNumber = Math.floor(Math.random() * 100) + 1;
    return luckyNumber;
}

greetUser();
showCurrentDateTime();
console.log("Motivational quote: " + getQuote());
console.log("Programming tip: " + getProgrammingTip());
printWelcomeMessage();
console.log("Word count in 'I love building projects': " + countWords("I love building projects"));
console.log("Your lucky number today is: " + getLuckyNumber());

// Note: the alert() that used to be here was removed — it blocked page load
// every single time and made the fetch-based profile loading feel broken.
