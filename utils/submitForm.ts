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

  const handleDropdownChange = (event) => {
    setInputs((inputs) => {
      const newInputs = _.cloneDeep(inputs);
      _.set(newInputs, event.item.props.title, event.key);
      return newInputs;
    });
  };
  const handleAddIngredient = (event) => {
    event.persist();
    setInputs((inputs) => {
      const sortedIngredients = _.sortBy(inputs.ingredients, ['key']);

      const key =
        sortedIngredients.length > 0
          ? sortedIngredients[sortedIngredients.length - 1].key + 1
          : 0;
      return {
        ...inputs,
        ingredients: _.concat(inputs.ingredients, [
          { key, amount: '', unit: '-', type: '' },
        ]),
      };
    });
  };

  const handleDeleteIngredient = () => console.log('deleted');

  const handleSubmit = () => {
    callback();
    setInputs(() => ({ ...initialValues }));
  };

  return {
    inputs,
    handleSubmit,
    handleInputChange,
    handleAddIngredient,
    handleDeleteIngredient,
    handleDropdownChange,
  };
};
