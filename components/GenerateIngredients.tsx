import { Row, Col, Button, Table, Input } from 'antd';

type IngredientsProps = {
  names?: string[];
  values?: [{ amount: string; unit: string; type: string }];
  handleAddIngredient: (event: any) => void;
  handleDeleteIngredient: (event: any) => void;
  handleInputChange: (event: any) => void;
  handleDropdownChange: (event: any) => void;
};

export const GenerateIngredients = ({
  names,
  values,
  handleAddIngredient,
  handleDeleteIngredient,
  handleInputChange,
  handleDropdownChange,
}: IngredientsProps) => {
  const columns = names.map((name) => ({
    title: `${name}`,
    key: `${name}`,
    render: (ingredient, _record, index: number) => {
      return (
        <Input
          placeholder={`${name}`}
          name={`ingredients[${index}].${name}`}
          onChange={handleInputChange}
        />
      );
    },
  }));

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <p>
            <Button
              onClick={handleAddIngredient}
              type="primary"
              shape="circle"
              size="small"
            >
              +
            </Button>
            ingredients:
          </p>
        </Col>
      </Row>
      {values.length > 0 ? (
        <Row>
          <Col span={12} offset={6}>
            <Table
              dataSource={values}
              columns={columns}
              pagination={{ pageSize: 25 }}
            />
          </Col>
        </Row>
      ) : null}
    </>
  );
};
