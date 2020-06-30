import React, { useEffect, useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import styled, { keyframes } from "styled-components";
import { bounce, fadeInUp} from "react-animations";

const url = "http://localhost:8000";

//const Bounce = styled.div`animation: 2s ${keyframes`${bounce}`} infinite`;
const Fade = styled.div`animation: 3s ${keyframes`${fadeInUp}`} `;

function App() {
  const [users, setUsers] = useState();
  const [isFetching, setFetching] = useState(false);


  const fetchUsers = async () => {
    setFetching(true);

    let json;
    try {
      const data = await fetch(url + "/users/");
      json = await data.json();
      console.log(json);
    } catch (err) {
      console.log(err);
      window.alert(err);
    }

    if (json) {
      setUsers(json);
    }

    setFetching(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  //Starting 'add user' feature
  function refreshPage() {
    window.location.reload(false);
  }

  function AddPersonForm() {
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    function handleUserChange(e) {
      setUser(e.target.value);
    }

    function handleEmailChange(e) {
      setEmail(e.target.value);
    }

    function handlePhoneChange(e) {
      setPhone(e.target.value);
    }

    function handleSubmit(e) {
      setFetching(true);

      //Using fetch API to post form data to django backend
      fetch(url + "/users/add/",{
        method: "post",
        body: JSON.stringify({"name": user, "email": email, "phone": phone})
      }).then(function(response) {
          return response.json();
      }).then(function(data) {
          console.log("Data:", data);
      }).catch(function(ex) {
          console.log("fail:", ex);
      });

      //After data is submitted, clear form input fields
      setUser('');
      setEmail('');
      setPhone('');

      e.preventDefault();
      setFetching(false);
    }
    return (
      <div>
        <form onSubmit={handleSubmit} action={url+"/users/add/"} method="POST">
          <h1 class="form-title">Add a User!</h1>
          <label for="name">Name *:</label>
          <input type="text"
          placeholder="Add Full Name"
          onChange={handleUserChange}
          name="name"
          id="name"
          value={user}/>
          <br/>
          <label for="email">Email :</label>
          <input type="text"
          placeholder="example@example.com"
          onChange={handleEmailChange}
          name="email"
          id="email"
          value={email}/>
          <br/>
          <label for="phone">Phone :</label>
          <input type="text"
          placeholder="eg. 999-999-9999"
          onChange={handlePhoneChange}
          name="phone"
          id="phone"
          value={phone}/>
          <br/>
          <button type="submit" class="add-btn" onClick={refreshPage}>Add user</button>
        </form>
        <button onClick={refreshPage} class="cancel-btn">Cancel</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <AddPersonForm />
        <h2>Current Users:</h2>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <ul class="user-list">
            {users?.map((user, index) => (
              <Fade><li key={index}>{user.fields.name}</li></Fade>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}
export default App;
