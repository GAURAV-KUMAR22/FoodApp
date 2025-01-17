import { useContext } from 'react';

import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import Button from './UI/Button.jsx';
import { currencyFormatter } from '../Util/formatting.js';
import UserProgressContext from '../store/UserProgressContext.jsx';
import CartItem from './CartItem.jsx';

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleOpenCheckout() {
        userProgressCtx.showCheckout();
    }

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    console.log("id..................", item.id),
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>
                    Close
                </Button>
                {cartCtx.items.length > -1 ? <Button onClick={handleOpenCheckout}>Go to Checkout</Button> : null}

            </p>
        </Modal >
    );
}