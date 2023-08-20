import React from "react";
import UserList from "./UserList";

const Home = ({ listOfReun, setListOfReun }) => {
  return <UserList obj={listOfReun} setListOfReun ={setListOfReun} />;
};

export default Home;
