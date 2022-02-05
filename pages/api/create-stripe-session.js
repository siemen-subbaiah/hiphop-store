const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const CreateStripeSession = async (req, res) => {
  const { items, id } = req.body;

  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/order/${id}`
      : `https://hiphop-store.vercel.app/order/${id}`;

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
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${redirectURL}?status=success`,
    cancel_url: `${redirectURL}?status=cancel`,
  });

  res.json({ id: session.id });
};

export default CreateStripeSession;
