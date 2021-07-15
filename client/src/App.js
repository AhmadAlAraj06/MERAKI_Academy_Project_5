import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/auth/login/index";
import GetPost from "./components/main/post";
import { Header } from "./components/header/index";
import GetFavorites from "./components/favorite/favorite";
import Archive from "./components/archive/index";
import postList from "./components/main/postList";
import Main from "./components/main/index";
import MyProfile from "./components/myProfile/index";
import EditProfile from "./components/user/editProfile";
import Upload from "./components/upload/upload";
import EditPost from "./components/editPost/index";
import Erorr from "./components/404/error";
import { Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminBoard from "./components/admin/admin";
import Chat from "./chat";
import Together from "./components/together/index";
import SearchTitle from "./components/search/index";
require("dotenv").config();


const App = () => {
  return (
    <>
      <Route path="/" component={Header} />
      <Route exact path="/" component={Main} />
      <Switch>
        <Route path="/search" component={SearchTitle} />
        <Route exact path="/" component={GetPost} />
        <Route exact path="/Chat" component={Chat} />
        <Route path="/profile" component={MyProfile} />
        <Route path="/archive" component={Archive} />
        <Route path="/favorite" component={GetFavorites} />
        <Route path="/post" component={postList} />
        <Route path="/createPost" component={Upload} />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/editPost" component={EditPost} />
        <Route path="/admin" component={AdminBoard} />
        <Route exact path="/together" component={Together} />
        <Route exact path="/sign" component={Login} />
        <Route component={Erorr} />
      </Switch>
    </>
  );
};

export default App;
