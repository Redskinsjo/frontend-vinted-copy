import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  useLocation,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Cookie from 'js-cookie';
import Header from './components/Header';
import Footer from './components/Footer';
import Offer from './containers/Offer/index';
import Login from './containers/Login/index';
import Signup from './containers/Signup/index';
import Home from './containers/Home/index';
import Publish from './containers/Publish/index';
import Payment from './containers/Payment/index';
import './App.css';
import './reset.css';
import { useStripe } from '@stripe/react-stripe-js';

function App() {
  const [token, setToken] = useState(Number(Cookie.get('token') || 0));
  const [displayModalLogin, setDisplayModalLogin] = useState(false);
  const [displayModalSignup, setDisplayModalSignup] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [publishClicked, setPublishClicked] = useState(false);
  const [purchaseClicked, setPurchaseClicked] = useState(false);
  const [details, setDetails] = useState({ offer: {} });

  const setUser = (cookieToken) => {
    if (cookieToken) {
      Cookie.set('token', cookieToken, { expires: 10 });
      setToken(cookieToken);
    } else {
      Cookie.remove('token');
      setToken(null);
    }
  };

  useEffect(() => {
    if (!loggedIn && publishClicked) {
      setDisplayModalLogin(true);
    }
    if (!loggedIn && purchaseClicked) {
      setDisplayModalLogin(true);
    }
  }, [publishClicked, purchaseClicked]);

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        setDisplayModalLogin={setDisplayModalLogin}
        setDisplayModalSignup={setDisplayModalSignup}
        setInputTitle={setInputTitle}
        setLoggedIn={setLoggedIn}
        setPublishClicked={setPublishClicked}
        setDetails={setDetails}
      />
      {displayModalLogin ? (
        <Login
          display={displayModalLogin}
          setDisplay={setDisplayModalLogin}
          setUser={setUser}
          setLoggedIn={setLoggedIn}
          publishClicked={publishClicked}
          setPublishClicked={setPublishClicked}
          purchaseClicked={purchaseClicked}
          setPurchaseClicked={setPurchaseClicked}
          details={details}
          setDetails={setDetails}
        ></Login>
      ) : null}
      {displayModalSignup ? (
        <Signup
          display={displayModalSignup}
          setDisplay={setDisplayModalSignup}
          setUser={setUser}
          setLoggedIn={setLoggedIn}
        ></Signup>
      ) : null}
      {purchaseClicked && loggedIn ? (
        <Redirect
          to={{
            pathname: '/payment',
            state: { afterPurchaseClickedAndLogin: true },
          }}
        />
      ) : null}
      <Switch>
        <Route path="/offer/:id">
          <Offer
            setPurchaseClicked={setPurchaseClicked}
            token={token}
            details={details}
            setDetails={setDetails}
          />
        </Route>
        <Route path="/login"></Route>
        <Route path="/signup"></Route>
        <Route path="/publish">
          {loggedIn && publishClicked ? <Publish token={token} /> : null}
          {/* <Publish token={token} /> */}
        </Route>
        <Route path="/payment">
          <Payment
            details={details}
            setDetails={setDetails}
            purchaseClicked={purchaseClicked}
            setPurchaseClicked={setPurchaseClicked}
          />
        </Route>
        <Route path="/">
          <Home inputTitle={inputTitle} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
