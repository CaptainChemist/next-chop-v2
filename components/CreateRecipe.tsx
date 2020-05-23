import { Row, Col, Form, Button } from 'antd';
import { submitForm } from '../utils/submitForm';
import { GenerateInput, GenerateTextInput } from './GenerateFields';
import { GenerateIngredients } from './GenerateIngredients';
import { useMutation } from '@apollo/react-hooks';
import { createRecipeGraphQL } from '../graphql/mutations/createRecipe';
import { useFetchUser } from '../utils/user';
import * as _ from 'lodash';
import { Loading } from './notify/Loading';
import Router from 'next/router';

export const CreateRecipe = () => {
  const [createRecipeMutation, { loading }] = useMutation(createRecipeGraphQL);
  const { user, loading: isFetchingUser } = useFetchUser();
  const owner = _.get(user, 'sub');

  const initiateCreateRecipe = () => {
    createRecipeMutation({
      variables: {
        data: {
          ...inputs,
          owner,
        },
      },
    });
    Router.replace('/my-recipes');
  };

  const {
    inputs,
    handleInputChange,
    handleAddIngredient,
    handleDeleteIngredient,
    handleDropdownChange,
    handleSubmit,
  } = submitForm(
    {
      title: '',
      description: '',
      content: '',
      ingredients: [],
    },
    initiateCreateRecipe,
  );

  if (isFetchingUser) return <Loading />;

  return (
    <Form onFinish={handleSubmit}>
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
          <Form.Item label="Create Recipe">
            <Button disabled={loading} type="primary" htmlType="submit">
              Create Recipe
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
