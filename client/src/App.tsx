import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header-component/header.component.tsx';
import Landing from './components/landing-component/landing.component.tsx';
import React from 'react';
import { useAuthStore } from './store/module/auth';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe.utils.ts';
import { useStripeStore } from './store/module/stripe.ts';

const DashBoard = () => <div>DashBoard</div>;
const SurveyNew = () => <div>SurveyNew</div>;

const App = () => {
  const authStore = useAuthStore();
  const stripeStore = useStripeStore();

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    authStore.fetchUserCookies();
  }, []);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: stripeStore.fetchStripeClientSecret?.clientSecret,
        appearance: { theme: 'night' },
      }}
      key={stripeStore.fetchStripeClientSecret?.clientSecret}
    >
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="surveys" element={<SurveyNew />} />
        </Route>
      </Routes>
    </Elements>
  );
};

export default App;
