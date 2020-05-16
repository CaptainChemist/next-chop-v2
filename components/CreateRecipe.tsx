import { Row, Col, Form, Button } from 'antd';
import { submitForm } from '../utils/submitForm';

export const CreateRecipe = () => {
  const initiateCreateRecipe = () => {
    console.log('submitted form');
  };

  const { inputs, handleSubmit } = submitForm({}, initiateCreateRecipe);

  return (
    <Form onFinish={handleSubmit}>
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
