import { useAuthStore } from '@/store/module/auth';
import { Link, Outlet } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Payment from '../checkout.component/checkout.component';
import { useStripeStore } from '@/store/module/stripe';

const Header = () => {
  const authStore = useAuthStore();
  const stripeStore = useStripeStore();

  const handleAuthLink = () => {
    if (authStore.state.isLogin)
      return (
        <ul className="flex gap-6 text-2xl text-gray-50">
          <li className="transition duration-300 hover:text-stone-300">
            <a onClick={() => stripeStore.setIsPaymentOpen(true)}>
              add credits
            </a>
          </li>
          <li className="transition duration-300 hover:text-stone-300">
            <a onClick={() => authStore.fetchUserLogout()}>Logout</a>
          </li>
        </ul>
      );
    return (
      <a
        href={'/auth/google'}
        className="text-2xl text-gray-50 transition duration-300 hover:text-stone-300"
      >
        Login with Google
      </a>
    );
  };

  return (
    <>
      <nav className="flex justify-between p-6 bg-gray-500 max-w-7xl mx-auto shadow-lg">
        <div>
          <Link
            to={authStore.state.isLogin ? '/surveys' : '/'}
            className="text-4xl text-gray-50"
          >
            Emily
          </Link>
        </div>
        <div className="w-100%">{handleAuthLink()}</div>
      </nav>
      <Outlet />
      {stripeStore.state.isPaymentOpent &&
        createPortal(<Payment />, document.body)}
    </>
  );
};

export default Header;
