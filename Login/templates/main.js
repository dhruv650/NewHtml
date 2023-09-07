// Handle form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve user input
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Open a connection to the IndexedDB database
  const request = indexedDB.open('loginData', 1);

  request.onerror = function(event) {
    console.log('Error opening database:', event.target.errorCode);
  };

  request.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Create or upgrade the 'loginStore' object store
    const objectStore = db.createObjectStore('loginStore', { keyPath: 'email' });
    objectStore.createIndex('emailIndex', 'email', { unique: true });
  };

  request.onsuccess = function(event) {
    const db = event.target.result;

    // Retrieve the login object store
    const transaction = db.transaction('loginStore', 'readonly');
    const objectStore = transaction.objectStore('loginStore');

    // Check if the entered email and password match a stored login
    const getRequest = objectStore.get(email);

    getRequest.onsuccess = function(event) {
      const storedData = event.target.result;

      if (storedData && storedData.password === password) {
        // User is authenticated, perform necessary actions (e.g., redirect to dashboard)
        window.location.href = "/New folder/index/index.html"
        console.log('User logged in:', storedData.email);
        // Replace the console.log statement with your desired login action
      } else {
        // Invalid credentials, display an error message
        prompt("Not Match")
        console.log('Invalid email or password');
        // Replace the console.log statement with your desired error handling
      }
    };

    transaction.oncomplete = function(event) {
      db.close();
    };

    transaction.onerror = function(event) {
      console.log('Error accessing login data:', event.target.error);
    };
  };
});

// Show the sign-up form when the "Sign Up" button is clicked
document.querySelector('.signup').addEventListener('click', function() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-form').classList.remove('hidden');
});

// Handle sign-up form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve user input from the sign-up form
  const newEmail = document.getElementById('new-email').value;
  const newPassword = document.getElementById('new-password').value;

  // Open a connection to the IndexedDB database
  const request = indexedDB.open('loginData', 1);

  request.onerror = function(event) {
    console.log('Error opening database:', event.target.errorCode);
  };

  request.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Check if the 'loginStore' object store already exists
    if (!db.objectStoreNames.contains('loginStore')) {
      // Create the 'loginStore' object store
      const objectStore = db.createObjectStore('loginStore', { keyPath: 'email' });
      objectStore.createIndex('emailIndex', 'email', { unique: true });
    }
  };

  request.onsuccess = function(event) {
    const db = event.target.result;

    // Add the new user's login data to the object store
    const transaction = db.transaction('loginStore', 'readwrite');
    const objectStore = transaction.objectStore('loginStore');

    const data = { email: newEmail, password: newPassword };
    const addRequest = objectStore.add(data);

    addRequest.onsuccess = function(event) {
      // User account created successfully
      console.log('New user account created:', newEmail);
      // Replace the console.log statement with your desired sign-up action
    };

    transaction.oncomplete = function(event) {
      db.close();
    };

    transaction.onerror = function(event) {
      console.log('Error adding new user:', event.target.error);
    };
  };

  // Reset the form fields
  document.getElementById('new-email').value = '';
  document.getElementById('new-password').value = '';

  // Hide the sign-up form and show the login form
  document.getElementById('signup-form').classList.add('hidden');
  document.getElementById('login-form').classList.remove('hidden');
});
