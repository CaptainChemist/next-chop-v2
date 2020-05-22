import { Row, Col, Form, Button } from 'antd';
import { submitForm } from '../utils/submitForm';
import { GenerateInput, GenerateTextInput } from './GenerateFields';
import { GenerateIngredients } from './GenerateIngredients';

export const CreateRecipe = () => {
  const initiateCreateRecipe = () => {
    console.log('submitted form');
    console.log(inputs);
  };

  const {
    inputs,
    handleInputChange,
    handleAddIngredient,
    handleDeleteIngredient,
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
      />
      <Row>
        <Col span={16} />
        <Col span={4}>
          <Form.Item label="Create Recipe">
            <Button type="primary" htmlType="submit">
              Create Recipe
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
