import './App.css';
import Home from './pages/home';
import Checkout from './pages/checkout';
import Invoices from './pages/invoices';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Profil from './pages/profil';
function App() {
  return (
    <BrowserRouter>
         <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='profil' element={<Profil />} />
           <Route path='checkout' element={<Checkout />} />
           <Route path='invoices/:orderId' element={<Invoices />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
