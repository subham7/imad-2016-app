function loadLoginForm () {
    
     
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
                 
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var email= document.getElementById('email').value;
        var full_name= document.getElementById('full_name').value;
        if(username.length <=5)
        alert("Blank entry or Username entered is less than 5 characters.");
        else
        if(password.length<=5)
        alert("Password must have atleast 5 characters");
        else
        if(email.length<=5)
        alert("Enter a valid email");
        else
        if(full_name.length<=5)
        alert("Your Full name has less than five characters");
        else
        {
        
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password, email:email, full_name:full_name}));  
        register.value = 'Registering...';
        }
    };
}

function loadLoggedInUser (username) {
    var name=username;
    var content =`<h1 style="margin-top: 13%; margin-left: 35%; color: white;">Login</h1>
            
                    <input type="text" placeholder="Username" name="username" id="username" class="ubox"/><br>
                    <input type="password" placeholder="Password" name="password" id="password" class="pbox"/><br>
                    <input type="submit" name="login"  value="Login" id="login_btn" class="sbox"/><br>
                    <span style="margin-left:5%">`+name+` is now logged in. <strong><i><a href="/logout">LOGOUT</a></i></strong></span>
                    `;
                    document.getElementById("login").innerHTML=content;
                    
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
                
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}



// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!

