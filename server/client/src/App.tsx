import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header-component/header.component.tsx';
import Landing from './components/landing-component/landing.component.tsx';
import React from 'react';
import { useAuthStore } from './store/module/auth';

const DashBoard = () => <div>DashBoard</div>;
const SurveyNew = () => <div>SurveyNew</div>;

const App = () => {
  const authStore = useAuthStore();
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    authStore.fetchUserCookies();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route index path="surveys" element={<SurveyNew />} />
      </Route>
    </Routes>
  );
};

export default App;
