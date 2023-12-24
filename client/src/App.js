import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddJobPage from './pages/AddJobPage';
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path ='/register' element={<RegisterPage/>}/>
          <Route exact path ='/login' element={<LoginPage/>}/>
          <Route exact path = '/addJob' element={<AddJobPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
