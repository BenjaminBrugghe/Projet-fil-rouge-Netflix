import './App.css';
import './Styles/Main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import HomePage from './Views/HomePage';
import Error404 from './Views/Error404';
import Login from './Views/Login';
import Register from './Views/Register';
import Feed from './Views/Feed';
import UserAccount from './Views/UserAccount';
import ManageUsers from './Views/ManageUsers';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/userAccount' element={<UserAccount />} />
          <Route path='/manageUsers' element={<ManageUsers />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
