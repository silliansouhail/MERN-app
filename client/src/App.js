/* eslint-disable react-hooks/exhaustive-deps */
//module
import { useEffect } from 'react';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './redux/productSlice';

//component
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import WelcomePage from './Pages/WelcomePage';

//styles
import './App.css';

function App() {

  const{user}= useSelector(state=>state.auth)

  const dispatch = useDispatch()
  useEffect(() => {
    let active = true 
    if (active) {
      dispatch(getProducts())
    }
    return () => {
      active = false
    }
  }, [])

  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path='/' element={<WelcomePage/>}/>
          <Route path='/home' element={user?<Home/>:<WelcomePage/>} />
          {<Route path='/dashboard' element={!user?<WelcomePage/>:user.type?<Dashboard/>:<WelcomePage/>}/>}
          <Route path='/profile' element={user?<Profile/>:<WelcomePage/>}/>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
