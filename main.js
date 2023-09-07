// Smooth scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    
    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth'
    });
  });
});

// Animate on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate');

  elements.forEach(element => {
    if (element.getBoundingClientRect().top < window.innerHeight - 100) {
      element.classList.add('animated');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// Game Section
const gameButtons = document.querySelectorAll('.game-button');

gameButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Your game logic here
  });
});

    window.addEventListener('DOMContentLoaded', function() {
      var menuItems = document.querySelectorAll('li a');

      // Add event listeners to each menu item
      menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
          // Remove 'active' class from all menu items
          menuItems.forEach(function(item) {
            item.classList.remove('active');
          });

          // Add 'active' class to the clicked menu item
          this.classList.add('active');
        });
      });
    });

    // Changing text
    