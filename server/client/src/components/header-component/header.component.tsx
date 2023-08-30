import { useAuthStore } from '@/store/module/auth';
import { Link, Outlet } from 'react-router-dom';

const Header = () => {
  const authStore = useAuthStore();

  const handleAuthLink = () => {
    if (authStore.state.isLogin)
      return (
        <a
          onClick={() => authStore.fetchUserLogout()}
          className="text-2xl text-gray-50 transition duration-300 hover:text-stone-300"
        >
          Logout
        </a>
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
    </>
  );
};

export default Header;
