import { useQuery, useMutation } from '@apollo/react-hooks';
import { recipeGraphQL } from '../graphql/queries/recipe';
import { submitForm } from '../utils/submitForm';
import { useState } from 'react';
import * as _ from 'lodash';
import { Form, Row, Col, Button } from 'antd';
import { GenerateInput, GenerateTextInput } from './GenerateFields';
import { GenerateIngredients } from './GenerateIngredients';
import { Loading } from './notify/Loading';
import { createUpdateObj } from '../utils/createUpdateObj';
import { updateRecipeGraphQL } from '../graphql/mutations/updateRecipe';

export const UpdateRecipe = ({ id }) => {
  const { loading: isQueryLoading, data, error } = useQuery(recipeGraphQL, {
    variables: { where: { id } },
  });
  const [updateRecipeMutation, { loading: updateRecipeLoading }] = useMutation(
    updateRecipeGraphQL,
  );

  const [recipeState, setRecipeState] = useState({ isQueryLoading: true });

  const initiateUpdateRecipe = () => {
    const updateObj = createUpdateObj(data, inputs);
    return updateRecipeMutation({
      refetchQueries: [{ query: recipeGraphQL, variables: { where: { id } } }],
      variables: {
        data: {
          ...updateObj,
        },
        where: { id },
      },
    });
  };

  const {
    inputs,
    handleInputChange,
    handleAddIngredient,
    handleDeleteIngredient,
    handleDropdownChange,
    handleUpdate,
    setInputs,
  } = submitForm(
    {
      title: '',
      description: '',
      content: '',
      ingredients: [],
    },
    initiateUpdateRecipe,
  );
  if (!isQueryLoading && recipeState.isQueryLoading) {
    const { __type, ...loadedRecipe } = _.get(data, 'recipe');
    setInputs((state) => ({ ...state, ...loadedRecipe }));
    setRecipeState((state) => ({ ...state, isQueryLoading }));
  }

  if (!data) return <Loading />;

  return (
    <Form onFinish={handleUpdate}>
      <GenerateInput
        name="title"
        value={inputs.title}
        handleInputChange={handleInputChange}
      />
      <GenerateInput
        name="description"
        value={inputs.description}
        handleInputChange={handleInputChange}
      />
      <GenerateTextInput
        name="content"
        value={inputs.content}
        handleInputChange={handleInputChange}
      />
      <GenerateIngredients
        names={['amount', 'unit', 'type']}
        values={inputs.ingredients}
        handleAddIngredient={handleAddIngredient}
        handleDeleteIngredient={handleDeleteIngredient}
        handleInputChange={handleInputChange}
        handleDropdownChange={handleDropdownChange}
      />
      <Row>
        <Col span={16} />
        <Col span={4}>
          <Form.Item label="Update Recipe">
            <Button
              disabled={isQueryLoading || updateRecipeLoading}
              type="primary"
              htmlType="submit"
            >
              Update Recipe
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
