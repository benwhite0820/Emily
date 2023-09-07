import { setIsPaymentOpen } from '../reducers/stripeReducer';
import store, { useAppSelector } from '../store';

export const useStripeStore = () => {
  const state = useAppSelector((state) => state.stripeReducer);

  return {
    state,
    getState: () => store.getState().stripeReducer,
    setIsPaymentOpen: (openState: boolean) =>
      store.dispatch(setIsPaymentOpen(openState)),
  };
};
