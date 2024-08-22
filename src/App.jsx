import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Meals from './Components/Meals';
import { CartContextProvider } from './store/CartContext';
import Cart from './Components/Cart';
import { UserProgressContextProvider } from '../src/store/UserProgressContext.jsx';
import Checkout from './Components/Checkout.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header></Header>
        <Meals></Meals>
        <Cart></Cart>
        <Checkout></Checkout>
      </CartContextProvider>
    </UserProgressContextProvider>

  )
};

export default App;
