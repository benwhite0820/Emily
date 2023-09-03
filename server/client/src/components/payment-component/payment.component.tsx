import { useFetchPaymentQuery } from '@/store/queryMethod/stripeQuery';
import { stripePromise } from '@/utils/stripe.utils';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';

const Payment = () => {
  const { data, isLoading } = useFetchPaymentQuery();

  return (
    <div>
      {!isLoading && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: data?.clientSecret }}
        >
          <form>
            <PaymentElement />
            <button>pay by using stripe</button>
          </form>
        </Elements>
      )}
    </div>
  );
};

export default Payment;
