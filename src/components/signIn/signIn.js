import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import Alert from 'react-bootstrap/Alert';
// eslint-disable-next-line import/extensions
import Input from '../input/input.js';
import './signIn.css';

export default () => {
  const [showErr, setShowErr] = useState(false);
  const [show, setShow] = useState(true);
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const cookies = new Cookies();

  function loginUser(e) {
    e.preventDefault();
    if (emailLogin && passwordLogin) {
      const data = {
        email: emailLogin,
        password: passwordLogin,
      };
      fetch('http://localhost:5000/api/auth', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) { throw res; }
          return res.json(); // we only get here if there is no error
        })
        // eslint-disable-next-line no-return-assign
        .then((res) => cookies.set('jwtSecret', res.token ? res.token : '', window.location = 'http://localhost:9000/dashboard'))
        .catch(() => {
          setShowErr(true);
        });
    }
  }


  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <section className="col-md-4 col-sm-12 col-xs-12 mt-5 ">
      {show && showErr && setShowErr
        ? (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oups!</Alert.Heading>
            <p>Votre adresse email ou le mot de passe est pas valide.</p>
          </Alert>
        ) : null}


      <form onSubmit={loginUser}>

        <Input
          label="Email *"
          type="text"
          name="email"
          id="email"
          value={emailLogin}
          validation={show && showErr && setShowErr}
          placeholder="Veuillez inscrire votre adresse email"
          onChange={(e) => setEmailLogin(e.target.value)}
        />

        <Input
          label="Password *"
          type="password"
          name="password"
          id="password"
          value={passwordLogin}
          validation={show && showErr && setShowErr}
          placeholder="Insérer votre mot de passe "
          onChange={(e) => setPasswordLogin(e.target.value)}
        />
        <input type="submit" value="Envoyer" className="button-style" />
      </form>


    </section>


  );
};
