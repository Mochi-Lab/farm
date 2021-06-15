import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'Components/NavBar';
import Footer from 'Components/Footer';
import IconLoading from 'Components/IconLoading';

import { lazy, Suspense, useEffect } from 'react';
import './App.css';

const Farm = lazy(() => import('Views/Farm'));

function App() {
  useEffect(() => {
    async function fetchDataInit() {
      document
        .getElementsByTagName('HTML')[0]
        .setAttribute('data-theme', localStorage.getItem('theme'));
    }
    fetchDataInit();
  }, []);
  return (
    <div style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        <div className='page content'>
          <NavBar />
          <Suspense
            fallback={
              <div className='center background-mode' style={{ height: '100%' }}>
                <IconLoading />
              </div>
            }
          >
            <Switch>
              <Route exact path='/' component={Farm} />
            </Switch>
          </Suspense>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
