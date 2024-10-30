const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");

function setActiveLink() {
  const scrollPosition = window.scrollY; // Get current scroll position

  sections.forEach((section) => {
    const sectionTop = section.offsetTop; // Get the top position of the section
    const sectionHeight = section.clientHeight; // Get the height of the section

    // Check if the scroll position is within the section
    if (
      scrollPosition >= sectionTop - sectionHeight / 2 &&
      scrollPosition < sectionTop + sectionHeight / 2
    ) {
      // Remove active class from all links
      navLinks.forEach((link) => link.classList.remove("active"));
      // Add active class to the corresponding link
      const activeLink = document.querySelector(
        `.navbar a[href="#${section.id}"]`
      );
      activeLink.classList.add("active");
    }
  });
}

// Listen for scroll events
window.addEventListener("scroll", setActiveLink);

// Smooth scroll event handler remains the same
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const targetPosition =
      targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

async function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target; // Get the form
  const submitButton = document.getElementById("submitButton");
  const buttonText = document.getElementById("buttonText");
  const buttonSpinner = document.getElementById("buttonSpinner");

  // Show loading spinner
  buttonText.style.display = "none"; // Hide button text
  buttonSpinner.classList.remove("hidden"); // Show spinner

  try {
    // Send the form data to Formspree
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json", // Accept JSON response
      },
    });

    if (response.ok) {
      alert("Email sent successfully!"); // Success message
      form.reset(); // Reset the form fields
    } else {
      alert("Error sending email. Please try again."); // Error message
    }
  } catch (error) {
    alert("Error sending email: " + error.message); // Error handling
  } finally {
    // Hide loading spinner
    buttonText.style.display = "inline"; // Show button text
    buttonSpinner.classList.add("hidden"); // Hide spinner
  }
}
