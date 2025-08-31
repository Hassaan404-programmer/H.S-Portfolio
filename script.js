// ===============================
// Navbar link active state on scroll
// ===============================
document.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 80; // offset for navbar height
  document.querySelectorAll(".nav-link").forEach(link => {
    let section = document.querySelector(link.getAttribute("href"));
    if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      document.querySelectorAll(".nav-link").forEach(nav => nav.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// ===============================
// Dynamic Poster Background with Vibrant.js
// ===============================
window.addEventListener("load", () => {
  const img = document.getElementById("profile-img");   // profile image
  const landing = document.getElementById("landing");   // landing section
  const landingBg = document.getElementById("landing-bg"); // blurred bg layer

  if (!img) return; // if no profile image found, stop

  // Default blurred background
  if (landingBg) {
    landingBg.style.backgroundImage = `url(${img.src})`;
  }

  // Extract dominant colors using Vibrant.js
  Vibrant.from(img.src).getPalette()
    .then(palette => {
      const color1 = palette.Vibrant?.hex || "#000000";
      const color2 = palette.Muted?.hex || "#333333";

      if (landingBg) {
        // Apply gradient overlay + blurred image
        landingBg.style.backgroundImage =
          `linear-gradient(135deg, ${color1}AA, ${color2}AA), url(${img.src})`;
      } else {
        // Fallback: gradient directly on landing section
        landing.style.background =
          `linear-gradient(135deg, ${color1}, ${color2})`;
      }
    })
    .catch(err => console.error("Color extraction failed:", err));
});
// ===============================
// Dynamic Roles Typing Effect
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const roles = [
    "Data Analyst",
    "Beginner Mobile App Developer",
    "Beginner Web Developer (HTML, CSS, Bootstrap, JavaScript)",
    "AI Enthusiast"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  const roleElement = document.getElementById("dynamic-role");
  const typingSpeed = 100;   // ms per character
  const eraseSpeed = 60;     // ms per character
  const delayBetween = 1500; // delay before erasing

  function typeRole() {
    if (charIndex < roles[roleIndex].length) {
      roleElement.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeRole, typingSpeed);
    } else {
      setTimeout(eraseRole, delayBetween);
    }
  }

  function eraseRole() {
    if (charIndex > 0) {
      roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseRole, eraseSpeed);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, typingSpeed);
    }
  }

  typeRole(); // start animation
});
