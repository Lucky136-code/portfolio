document.addEventListener("DOMContentLoaded", () => {
  // --- 1. STICKY NAVBAR SCROLL VISIBILITY ---
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
      navbar?.classList.add("visible");
    } else {
      navbar?.classList.remove("visible");
    }
  });

  // --- 2. WHATSAPP CONTACT FORM UPLINK ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("formName").value;
      const email = document.getElementById("formEmail").value;
      const message = document.getElementById("formMessage").value;
      const submitBtn = contactForm.querySelector("button[type='submit']");

      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Initiating Uplink...";

      const formattedMessage = `[Portfolio Uplink]\n\nSender: ${name} (${email})\n\nMessage:\n${message}`;
      const waUrl = `https://wa.me/919304277935?text=${encodeURIComponent(formattedMessage)}`;

      setTimeout(() => {
        window.open(waUrl, "_blank");
        submitBtn.textContent = originalText;
        contactForm.reset();
      }, 800);
    });
  }
});
