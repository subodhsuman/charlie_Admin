import MainPage from './layout/MainPage'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import { useSelector } from "react-redux";
import { useState } from 'react';

function App() {

  const setdata = useSelector((state) => {
    return state
  });

  const [activeComponent, setActiveComponent] = useState(setdata?.setactive?.activeComponents?? "/dashboard")
  const ActivePage = (val) => {
    setActiveComponent(val);
  }
const IsLogin = useSelector((state) => {
  return state.user.token ? true : false;
});
console.log(setdata?.setactive?.activeComponents);
  return (
    <div id="App">
      {IsLogin?
        <MainPage ActivePage={ActivePage} activeComponent={activeComponent} />
        :
        <Login />}
    </div>
  )
}

export default App


