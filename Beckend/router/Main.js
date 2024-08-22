import fs from 'node:fs/promises';
import express from 'express';
import Router from 'express';
const route = express.Router();

route.get('/meals', async (req, res) => {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    // console.log(meals)
    res.json(JSON.parse(meals));

});

route.post('/orders', async (req, res) => {
    const orderData = req.body.order;
    console.log(orderData)
    if (orderData === null || orderData.items === null || orderData.items.length === 0) {
        return res
            .status(400)
            .json({ message: 'Missing data.' });
    }
    if (
        orderData.customer.email === null ||
        !orderData.customer.email.includes('@') ||
        orderData.customer.name === null ||
        orderData.customer.name.trim() === '' ||
        orderData.customer.street === null ||
        orderData.customer.street.trim() === '' ||
        orderData.customer['postal-code'] === null ||
        orderData.customer['postal-code'].trim() === '' ||
        orderData.customer.city === null ||
        orderData.customer.city.trim() === ''
    ) {
        return res.status(400).json({
            message:
                'Missing data: Email, name, street, postal code or city is missing.',
        });
    }

    const newOrder = {
        ...orderData,
        id: (Math.random() * 1000).toString(),
    };
    const orders = await fs.readFile('../Beckend/data/available-meals.json', 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
    res.status(201).json({ message: 'Order created!' });
    console.log(newOrder)
})

export default route;