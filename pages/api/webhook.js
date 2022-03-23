import Stripe from 'stripe';
import { buffer } from 'micro';
import { API_URL } from '../../config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let event;

    try {
      // 1. Retrieve the event by verifying the signature using the raw body and secret
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event
    console.log('✅ Success:', event.id);
    if (event.type === 'checkout.session.completed') {
      const res = await fetch(
        `${API_URL}/orders/${parseInt(event.data.object.metadata.order_id)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${event.data.object.metadata.userToken}`,
          },
          body: JSON.stringify({ isPaid: true }),
        }
      );

      const resdata = await res.json();
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // 3. Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
