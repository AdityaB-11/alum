let username; 

document.getElementById('login').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get form data
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Construct the request body
  const requestBody = JSON.stringify({ username, password });


  fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: requestBody
  })
      .then(response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error('Network response was not ok.');
      })
      .then(data => {
          console.log('Request succeeded with response:', data.data.username);
          if (data.redirectUrl) {
              window.location.href = data.redirectUrl
              username = data.data.username
          } else {
              // Handle other responses as needed
          }
          // Handle response
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error.message);
      });
});


const changeName = document.getElementById('data');
              changeName.innerHTML = data.data.username 