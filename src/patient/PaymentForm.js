import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import styled from 'styled-components';

const PaymentForm = () => {
  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        'https://api.baridimob.ma/payments',
        values,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': 'VOTRE_CLE_API_BARIDI_MOB',
          },
        }
      );

      // Handle the Baridi Mob API response here
      console.log(response.data);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  const validateForm = (values) => {
    const errors = {};

    // Add validation logic here if needed

    return errors;
  };

  return (
    <Styled>
    <Formik
      initialValues={{
        amount: '2000',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      }}
      validate={validateForm}
      onSubmit={onSubmit}
    >
      <Form>
      <div className="form-group">
  <label htmlFor="amount" className="form-label" > Montant Ã  payer:</label>
  <Field  disabled={true} type="number" id="amount" name="amount" className="form-input" />
  <ErrorMessage name="amount" component="div" className="form-error" />
</div>
<div className="form-group">
  <label htmlFor="cardNumber" className="form-label">NumÃ©ro de carte:</label>
  <Field type="text" id="cardNumber" name="cardNumber" className="form-input" />
  <ErrorMessage name="cardNumber" component="div" className="form-error" />
</div>
<div className="form-group">
  <label htmlFor="expiryDate" className="form-label">Date d'expiration:</label>
  <Field type="text" id="expiryDate" name="expiryDate" className="form-input" />
  <ErrorMessage name="expiryDate" component="div" className="form-error" />
</div>
<div className="form-group">
  <label htmlFor="cvv" className="form-label">CVV:</label>
  <Field type="text" id="cvv" name="cvv" className="form-input" />
  <ErrorMessage name="cvv" component="div" className="form-error" />
</div>
<button type="submit" className="form-button">Payer</button>

      </Form>
    </Formik>
    </Styled>
  );
};

const Styled = styled.div`.
form-group {

    margin-top:50px;
    margin-bottom: 20px;
  }
  
  .form-label {
    font-weight: bold;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-error {
    color: red;
    font-size: 14px;
  }
  
  .form-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .form-button:hover {
    background-color: #0069d9;
  }
  
`;
export default PaymentForm;
