/* eslint-disable indent */
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
// eslint-disable-next-line import/extensions
import Input from '../input/input.js';
import './signUp.css';

export default () => {
  const [showErr, setShowErr] = useState(false);
  const [ShowCreatedAccount, setShowCreatedAccount] = useState(false);
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');


  function createUser(e) {
    e.preventDefault();
    if (email && name && password && password2) {
      const data = {
        email,
        name,
        password,
        password2,
      };
      fetch('http://localhost:5000/api/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) { throw res; }

          return (res.json(),
            setShowCreatedAccount(true), setEmail(''),
            setName(''),
            setPassword(''),
            setPassword2('')
            // we only get here if there is no error
          );
        })
        .catch(() => {
          setShowErr(true);
        });
    }
  }

  return (

    // eslint-disable-next-line react/jsx-filename-extension
    <section className="col-md-4 col-sm-12 col-xs-12  sign-up-style">
      {show && ShowCreatedAccount && setShowCreatedAccount
        ? (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <p>Votre compte a été créé avec succés! Vous pouvez vous connecter.</p>
          </Alert>
        ) : null}
      <span className="title">Inscription</span>
      <form data-toggle="validator" onSubmit={createUser}>
        <Input
          label="Email *"
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          validation={show && showErr && setShowErr}
          id="email"
          placeholder="Veuillez inscrire votre adresse email"
        />
        <Input
          label="Nom d'utilisateur *"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          validation={show && showErr && setShowErr}
          id="name"
          placeholder="Veuillez inscrire un nom d'utilisateur"
        />
        <Input
          label="Mot de passe *"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          validation={show && showErr && setShowErr}
          id="password"
          placeholder="Insérer un mot de passe "
        />
        <Input
          label="Confirmer mot de passe *"
          type="password"
          name="password2"
          onChange={(e) => setPassword2(e.target.value)}
          value={password2}
          validation={show && showErr && setShowErr}
          id="password2"
          placeholder="Insérer de nouveau votre mot de passe "
        />
        <input type="submit" value="Créer le compte" className="button-creation-style" />
      </form>
    </section>
  );
};
