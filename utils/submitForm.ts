import { useState } from 'react';

export const submitForm = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);

  const handleSubmit = () => {
    callback();
    setInputs(() => ({ ...initialValues }));
  };

  return {
    inputs,
    handleSubmit,
  };
};
