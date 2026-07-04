// Toggle menu
const toggleButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');

toggleButton.addEventListener('click', () => {
  nav.classList.toggle('show');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('show');
  });
});

// Enquiry popup
const enquiryBtn = document.querySelector('.enquire-btn');
const enquiryPopup = document.getElementById('enquiryPopup');
const enquiryCloseBtn = document.querySelector('.close-btn');

enquiryBtn.addEventListener('click', (e) => {
  e.preventDefault();
  enquiryPopup.style.display = 'flex';
});

enquiryCloseBtn.addEventListener('click', () => {
  enquiryPopup.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === enquiryPopup) {
    enquiryPopup.style.display = 'none';
  }
});

// WhatsApp toggle
const whatsappBtn = document.getElementById("whatsappBtn");
const whatsappPopup = document.getElementById("whatsappPopup");

whatsappBtn.addEventListener("click", () => {
  whatsappPopup.style.display = whatsappPopup.style.display === "flex" ? "none" : "flex";
  callPopup.style.display = "none";
});

// Call toggle
const callBtn = document.getElementById("callBtn");
const callPopup = document.getElementById("callPopup");

callBtn.addEventListener("click", () => {
  callPopup.style.display = callPopup.style.display === "flex" ? "none" : "flex";
  whatsappPopup.style.display = "none";
});

// Close both popups when clicking outside
document.addEventListener("click", (event) => {
  if (
    !whatsappBtn.contains(event.target) &&
    !whatsappPopup.contains(event.target) &&
    !callBtn.contains(event.target) &&
    !callPopup.contains(event.target)
  ) {
    whatsappPopup.style.display = "none";
    callPopup.style.display = "none";
  }
});
//floor plan
const modal = document.getElementById("imgModal");
const floorPlanImg = document.getElementById("floorPlanImg");
const modalImg = document.getElementById("modalImg");
const modalCloseBtn = document.getElementById("closeBtn");

// Open modal
floorPlanImg.onclick = function () {
  modal.classList.add("active");
  modalImg.src = this.src;
}

// Close modal
modalCloseBtn.onclick = function () {
  modal.classList.remove("active");
}

modal.onclick = function (e) {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
}

// 🔍 Zoom on click inside modal
let zoomed = false;
modalImg.onclick = function () {
  if (!zoomed) {
    this.style.transform = "scale(2)";
    this.style.cursor = "zoom-out";
    zoomed = true;
  } else {
    this.style.transform = "scale(1)";
    this.style.cursor = "zoom-in";
    zoomed = false;
  }
}
document.querySelectorAll(".slider-section").forEach(section => {
  const cards = section.querySelector(".cards");
  const prevBtn = section.querySelector(".prev");
  const nextBtn = section.querySelector(".next");
  const cardElements = section.querySelectorAll(".card");

  let index = 0;
  let autoplayInterval;

  function updateSlider() {
    const cardWidth = cardElements[0].offsetWidth + 15; // card + gap
    cards.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function nextSlide() {
    if (index < cardElements.length - 1) {
      index++;
    } else {
      index = 0; // loop
    }
    updateSlider();
  }

  function prevSlide() {
    if (index > 0) {
      index--;
    } else {
      index = cardElements.length - 1;
    }
    updateSlider();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 2500);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      stopAutoplay();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      stopAutoplay();
    });
  }

  // Stop autoplay when clicking a card
  cardElements.forEach(card => {
    card.addEventListener("click", stopAutoplay);
  });

  // Autoplay only on mobile
  function handleAutoplay() {
    stopAutoplay();
    if (window.innerWidth <= 768) {
      startAutoplay();
    } else {
      cards.style.transform = "translateX(0)"; // reset to static grid
      index = 0;
    }
  }

  handleAutoplay();
  window.addEventListener("resize", handleAutoplay);
});
// form to google sheets
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Replace with your Web App URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbwsRHXJiiDqL9p3P4f2BOK9IcH2s7_e7COEgqNNwKumf7lJNVkrjtD3YbZ2H072ZtuGMw/exec";

  let data = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    message: e.target.message.value
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(response => {
      alert("✅ Form submitted successfully!");
      document.getElementById("myForm").reset();
    })
    .catch(error => {
      alert("❌ Error: " + error.message);
    });
});



