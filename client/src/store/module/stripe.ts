import {
  useFetchCurrentUserCreditsQuery,
  useFetchPaymentQuery,
  useFetchUpdateCreditsMutation,
} from '../queryMethod/stripeQuery';
import { setIsPaymentOpen } from '../reducers/stripeReducer';
import store, { useAppSelector } from '../store';

export const useStripeStore = () => {
  const state = useAppSelector((state) => state.stripeReducer);
  const { data: stripeClientSecret } = useFetchPaymentQuery();
  const { userCurrentCredits } = useFetchCurrentUserCreditsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      userCurrentCredits: data ? data.credits : 0,
    }),
  });
  const [updateCredit, { data, error }] = useFetchUpdateCreditsMutation();

  return {
    state,
    getState: () => store.getState().stripeReducer,
    setIsPaymentOpen: (openState: boolean) =>
      store.dispatch(setIsPaymentOpen(openState)),
    fetchStripeClientSecret: stripeClientSecret,
    userCurrentCredits,
    updateCredit,
    updateCreditReturnData: data,
    updateCreditFetchError: error,
  };
};
