import { fetchUserCookies, fetchUserLogout } from '../reducers/authReducer';
import store, { useAppSelector } from '../store';

export const useAuthStore = () => {
  const state = useAppSelector((state) => state.authReducer);

  return {
    state,
    getState: () => store.getState().authReducer,
    fetchUserCookies: () => store.dispatch(fetchUserCookies()),
    fetchUserLogout: () => store.dispatch(fetchUserLogout()),
  };
};
