import React, { useEffect } from "react"
import Navbar from "./navbar/Navbar";
import './app.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import CreateSet from "./setCards/createSet";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import SavedSets from "./setCards/SavedSets";
import ShowSet from "./setCards/showSet";
import ShowProfile from "./profile/ShowProfile"
import MyProfile from "./profile/MyProfile"
import EditSet from "./setCards/EditSet"
import Categories from "./category/AddCategory";
import Published from "./published/Published";
import Main from "./main/Main"

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(auth())
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        {!isAuth ?
          <Routes>
            <Route path="*" element={<div>Такой страницы нет</div>} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/set/:id" element={<ShowSet />} />
            <Route path="/profile/:id" element={<ShowProfile />} />
            <Route path="/published" element={<Published />} />

          </Routes> :
          <Routes>
            <Route path="*" element={<div>Такой страницы нет</div>} />
            <Route path="/createSet" element={<CreateSet />} />
            <Route path="/saved" element={<SavedSets />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/set/:id" element={<ShowSet />} />
            <Route path="/profile/:id" element={<ShowProfile />} />
            <Route path="/editSet/:id" element={<EditSet />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/published" element={<Published />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
