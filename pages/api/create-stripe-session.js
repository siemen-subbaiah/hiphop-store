const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const CreateStripeSession = async (req, res) => {
  const { items, id, token } = req.body;

  const successUrl =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/success`
      : `https://hiphop-store.vercel.app/success`;

  const cancelUrl =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/cancel`
      : `https://hiphop-store.vercel.app/cancel`;

  const transformedItems = items.map((item) => ({
    quantity: item.qty,
    price_data: {
      currency: 'inr',
      unit_amount: item.price * 100,
      product_data: {
        name: item.productName,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    metadata: {
      order_id: id,
      userToken: token,
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  res.json({ id: session.id });
};

export default CreateStripeSession;
