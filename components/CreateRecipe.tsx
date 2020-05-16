import { Row, Col, Form, Button } from 'antd';
import { submitForm } from '../utils/submitForm';
import { GenerateInput } from './GenerateFields';

export const CreateRecipe = () => {
  const initiateCreateRecipe = () => {
    console.log('submitted form');
  };

  const { inputs, handleInputChange, handleSubmit } = submitForm(
    {
      title: '',
      description: '',
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
