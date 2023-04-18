import React from "react";

import './App.css';
import  Login  from "./components/Login";
// import { Login } from "./components/LR";
// import { Register } from "./components/Signup";


function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

  return (
    <div className="App">
      {/* {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}  />
      } */}
      <Login />
    </div>
  );
}

export default App;