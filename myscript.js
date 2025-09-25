const texts = ["Hola! I'm Nadine"];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 200;

function typeText() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;
  
  const currentText = texts[currentTextIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    typingSpeed = 200;
  } else {
    typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    typingSpeed = 200;
  }
  
  if (!isDeleting && currentCharIndex === currentText.length) {
    typingSpeed = 1000;
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeText, typingSpeed);
}

function openModal(id) {
  document.getElementById(id).style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
  document.body.style.overflow = ""; // Re-enable scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) {
      closeModal(modal.id);
    }
  });
};

// Add this JavaScript for the counter animation
function animateCounter() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let count = 0;
    
    const updateCount = () => {
      const increment = target / speed;
      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    
    updateCount();
  });
}

// Call this when the about section is in view
document.addEventListener('DOMContentLoaded', function() {
  // Start continuous typing animation
  setTimeout(typeText, 1000);
  
  // Animate skill bars
  setTimeout(function() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
      const width = level.style.width;
      level.style.width = '0';
      setTimeout(() => {
        level.style.width = width;
      }, 100);
    });
  }, 500);
  
  // Add hover effects to about me photos
  const aboutPhotos = document.querySelectorAll('.photosabout img');
  aboutPhotos.forEach(photo => {
    photo.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) rotate(2deg)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    photo.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
  
  // Add intersection observer for counter animation
  const aboutSection = document.getElementById('about');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  if (aboutSection) {
    observer.observe(aboutSection);
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
      if (modal.style.display === "flex") {
        closeModal(modal.id);
      }
    });
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  });
});

// Active section indicator
function updateActiveSection() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.pageYOffset;
    
    if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Update active section on scroll
window.addEventListener('scroll', updateActiveSection);

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Start continuous typing animation
  setTimeout(typeText, 1000);
  
  // Animate skill bars
  setTimeout(function() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
      const width = level.style.width;
      level.style.width = '0';
      setTimeout(() => {
        level.style.width = width;
      }, 100);
    });
  }, 500);
  
  // Add hover effects to about me photos
  const aboutPhotos = document.querySelectorAll('.photosabout img');
  aboutPhotos.forEach(photo => {
    photo.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) rotate(2deg)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    photo.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
});