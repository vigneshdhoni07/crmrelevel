import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Admin from './pages/Admin';
import Customer from './pages/Customer';
import Engineer from './pages/Engineer';
function App() {
  return (
   <div className='App'>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/customer" element={<Customer />}/>
        <Route path="/engineer" element={<Engineer />}/>
      </Routes>
    </BrowserRouter>
    
   </div>
   
   
      
  );
}

export default App;
