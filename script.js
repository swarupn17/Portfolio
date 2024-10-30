const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");
const resumeLink = "https://drive.google.com/file/d/1rGRryYW9wzwvECSJSDzbu5hXEUnOuSSa/view?usp=sharing"; // Resume link

function setActiveLink() {
  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    // Check if scroll position is within the section bounds
    if (
      scrollPosition >= sectionTop - sectionHeight / 2 &&
      scrollPosition < sectionTop + sectionHeight / 2
    ) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") !== resumeLink) {
          link.classList.remove("active");
        }
      });

      const activeLink = document.querySelector(`.navbar a[href="#${section.id}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}

// Apply smooth scroll effect to "Projects" and "Contact" only
navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  
  // Check for "Projects" and "Contact" sections, exclude resume link
  if (href !== resumeLink && (href === "#projects" || href === "#contact")) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = document.querySelector(href);

      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition =
        targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  }
});

// Directly open resume link in new tab
document.querySelector(`.navbar a[href="${resumeLink}"]`).addEventListener("click", function (e) {
  e.preventDefault();
  window.open(resumeLink, "_blank");
});

// Contact form submission handler
async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = document.getElementById("submitButton");
  const buttonText = document.getElementById("buttonText");
  const buttonSpinner = document.getElementById("buttonSpinner");

  buttonText.style.display = "none";
  buttonSpinner.classList.remove("hidden");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    const message = document.createElement("div");
    message.className = "message";
    if (response.ok) {
      message.textContent = "Message sent successfully!";
      message.classList.add("success");
      form.reset();
    } else {
      message.textContent = "Error sending message. Please try again.";
      message.classList.add("error");
    }
    document.body.appendChild(message);

    setTimeout(() => {
      document.body.removeChild(message);
    }, 3000);
  } catch (error) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "message error";
    errorMessage.textContent = "Error sending message: " + error.message;
    document.body.appendChild(errorMessage);

    setTimeout(() => {
      document.body.removeChild(errorMessage);
    }, 3000);
  } finally {
    buttonText.style.display = "inline";
    buttonSpinner.classList.add("hidden");
  }
}
