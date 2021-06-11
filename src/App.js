import React, { useState,useEffect  } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./App.css";

const clientId ="your google client ID";

function App() {

  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  const [title, setTitle] = useState("Please Login!")

  useEffect(()=>{
    // from session data 
    const myLocalStorageData = JSON.parse(localStorage.getItem("user"));
    if (myLocalStorageData) {
      console.log("User is Logged in!");
      console.log("Name: " + myLocalStorageData.name);
      console.log("Email: " + myLocalStorageData.email);
      setShowloginButton(false);
      setShowlogoutButton(true);
      setTitle("Yay! You are logged in. <3")
    }else{
      console.log("No users found!");
    }
  },[])

  // Login Success 
  const onLoginSuccess = (res) => {

    console.log("Login Success:", res.profileObj);

    // taking the info of user which was received from the google response 
    const user = {'name':res.profileObj.name, 'email': res.profileObj.email}

    // store the user info in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // show logout button on screen 
    setShowloginButton(false);
    setShowlogoutButton(true);
  };


  // Login Failure 
  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };


  // Sign out 
  const onSignoutSuccess = () => {

    alert("You have been logged out successfully");

    // clear the session data 
    localStorage.clear();
    console.clear();

    // show login button on screen 
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  return (
    <div className="g-signin">
      <div className="App">
        <h1>Simple login system with google authentication & session</h1>
        <br />
        <h3>{title}</h3>
        <div>
            { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
      </div>
    </div>
  );
}

export default App;
