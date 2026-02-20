/*************************
 * EmailJS Initialization (New v4)
 *************************/
emailjs.init({
    publicKey: "rarB6ZYDP_-ofUKRq" // replace with your public key
});

/*************************
 * Reveal Animation
 *************************/
function revealSections() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;

    reveals.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 120) {
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealSections);
revealSections();

/*************************
 * Stats Counter Animation
 *************************/
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    const updateCounter = () => {
        const target = Number(counter.getAttribute("data-target"));
        const count = Number(counter.innerText);
        const increment = target / 200;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCounter();
});

/*************************
 * Contact Form Submission
 *************************/
const contactForm = document.getElementById("contactForm");
const statusText = document.getElementById("form-status");

contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!title || !name || !email || !message) {
        statusText.innerText = "All fields are required.";
        statusText.style.color = "red";
        return;
    }

    statusText.innerText = "Sending message...";
    statusText.style.color = "white";

    emailjs.send(
        "service_gh9faze", // replace with your service ID
        "template_1oe4a1q", // replace with your template ID
        { title, name, email, message }
    ).then((response) => {
        statusText.innerText = "✅ Message sent successfully!";
        statusText.style.color = "lightgreen";
        contactForm.reset();
    }).catch((error) => {
        console.error("EmailJS Error:", error);
        statusText.innerText = "❌ Failed to send message. Try again later.";
        statusText.style.color = "red";
    });
});