import React from "react";
import UserList from "/home/amine/user-list-app1/src/components/UserList";

const Home = ({ listOfReun, setListOfReun }) => {
  return <UserList obj={listOfReun} setListOfReun ={setListOfReun} />;
};

export default Home;
