import { useStripeStore } from '@/store/module/stripe';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React from 'react';

const CheckoutForm = () => {
  const stripeStore = useStripeStore();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '',
      },
      redirect: 'if_required',
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.paymentIntent.id);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-500 rounded-md p-16 shadow-lg">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="text-center">
          <h2 className="text-4xl">Emily</h2>
          <p>$5 for 5 email credits!</p>
        </div>
        <PaymentElement />
        <div id="parent" className="flex gap-3 mt-10">
          <button
            className="w-full rounded bg-slate-300 p-3 text-slate-700"
            onClick={() => stripeStore.setIsPaymentOpen(false)}
          >
            cancel
          </button>
          <button
            className="w-full rounded bg-slate-300 p-3 text-slate-700"
            type="submit"
          >
            pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
