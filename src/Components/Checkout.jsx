import { useContext, useEffect } from 'react';
import { CartContext } from '../store/CartContext';
import Modal from './UI/Modal';
import { currencyFormatter } from '../Util/formatting';
import Input from './UI/Input';
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button';
import useHttp from '../Hooks/useHttp';
import Error from './Error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },

}



export default function Checkout() {

    const cartCtx = useContext(CartContext);

    const UserProgressCtx = useContext(UserProgressContext);

    const {
        data,
        error,
        isLoading: isSending,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);


    const cartTotal = cartCtx.items.reduce((totelPrice, item) => totelPrice + item.quantity * item.price, 0
    );


    function handleCloseCart() {
        UserProgressCtx.hideCheckout()
    }

    function handleGoToCheckout() {
        UserProgressCtx.showCheckout("checkout");
    };


    function handleFinish() {
        UserProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();

    }
    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        )


    }


    let actions = (
        <>
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            <Button onClick={handleGoToCheckout}>Submit Order</Button>
        </>
    )

    if (isSending) {
        actions = <span>Sending order data...</span>;
    };

    if (data && !error) {
        return (
            <Modal open={UserProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <h2>Success !</h2>
                <p>Your order was successfully send to user</p>
                <p>we will get bakc to you  with more details via email within the next few hour</p>
                <p className='modal-actions'>
                    <Button onClick={handleFinish}>Okey</Button>
                </p>
            </Modal>
        )
    }


    return (
        <Modal className='checkout' open={UserProgressCtx.progress === 'checkout'} onClose={handleCloseCart}>

            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
                <Input label='Full Name' type="text" id='name' />
                <Input label='Email Address' type="email" id='email' />
                <Input label='Street' type="text" id='street' />
                <div className='control-row'>
                    <Input label='Postal Code' type='number' id='postal-code'></Input>
                    <Input label='city' type='text' id='city'></Input>
                </div>

                {error && <Error title='failed to Submit Order' message={error} />}
                <p className='modal-actions'>
                    {actions}
                </p>
            </form>
        </Modal>
    )
};