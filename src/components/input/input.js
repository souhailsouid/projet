
import React from 'react';
import './input.css';

const Input = (props) => {
  const input = props;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <label htmlFor="firstName" className="label-style">{input.label}</label>
      <input
        // eslint-disable-next-line react/destructuring-assignment
        type={input.type}
        name={input.name}
        required
        placeholder={input.placeholder}
        className={input.validation ? 'form-control error-input' : 'form-control '}
        value={input.value}
        onChange={input.onChange}
      />
      <p className="validation-style">
        {' '}
        <small>
          {input.validation}
        </small>
      </p>
    </>
  );
};
export default Input;
