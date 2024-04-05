import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Registration from './components/Registration';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';

function App() {
  return (
    < >
      <BrowserRouter>
        <Header />
        <div className='App'>
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/add" element={<Protected Component={AddProduct} />} />
            <Route path="/add/:productId" element={<Protected Component={AddProduct} />} />
          </Routes>

        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
