import { useState } from 'react';
import * as _ from 'lodash';

export const submitForm = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => {
      const newInputs = _.cloneDeep(inputs);
      _.set(newInputs, event.target.name, event.target.value);
      return newInputs;
    });
  };

  const handleSubmit = () => {
    callback();
    setInputs(() => ({ ...initialValues }));
  };

  return {
    inputs,
    handleSubmit,
    handleInputChange,
  };
};
