import Stripe from "stripe";
import express from "express";
import { config } from "dotenv";

config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//CREATE CHECKOUT SESSION ROUTE
router.post('/create-checkout-session', async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map(product => ({
        price_data: {
            currency: 'INR',
            product_data: {
                name: product.name,
                images: [product.image]
            },
            unit_amount: product.price,
        },
        quantity: product.quantity,
    }));

    const productDetailsSerialized = JSON.stringify(products.map(product => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
    })));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            metadata: { productDetails: productDetailsSerialized },
            mode: 'payment',
            billing_address_collection: 'required',
            success_url: `https://digi-store-pvnn.onrender.com/success`,
            cancel_url: `https://digi-store-pvnn.onrender.com/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Failed to create checkout session: ', error.message);
        res.status(400).json({ message: 'Error creating a checkout session' });
    }
});



router.get('/api/stats', async (req, res) => {
    try {
        const balance = await stripe.balance.retrieve();

        console.log('Balance Object:', JSON.stringify(balance, null, 2));

        const availableBalanceINR = balance.available.find(b => b.currency === 'INR');
        const pendingBalanceINR = balance.pending.find(b => b.currency === 'INR');

        const availableBalance = availableBalanceINR ? availableBalanceINR.amount  : 0;
        const pendingBalance = pendingBalanceINR ? pendingBalanceINR.amount : 0;

        const charges = await stripe.charges.list({ limit: 100 });

        const totalCharges = charges.data.length;

        res.json({
            availableBalance,
            pendingBalance,
            totalCharges,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



export default router;