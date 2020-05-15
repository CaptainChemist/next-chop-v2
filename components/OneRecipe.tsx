import { Recipe } from '../generated/apollo-components';
import { Row, Col, List } from 'antd';
import styled from 'styled-components';
import GraphImg from 'graphcms-image';
import * as _ from 'lodash';
import { generateUnit } from '../utils/generateUnit';
import { GenerateContent } from './GenerateContent';

const StyledOneRecipe = styled(Col)`
  ${({ theme }) => `
        margin-top: ${theme['margin-small']};
        min-height: 320px;
        border-radius: 8px;
        box-shadow: 0 0 16px ${theme['border-color']};
        border: ${theme['border-width']} solid ${theme['border-color']};

        .graphcms-image-outer-wrapper {
            border: 0px;
            .graphcms-image-wrapper {
                border: 0px;
                position: relative;
                float: left;
                width: 100%;
                height 400px;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                background-size: cover;
                img {
                    text-align: center;
                    border-radius: 6px 6px 0px 0px;
                }
            }
        }
        h1,
        h2 {
            padding-top: ${theme['margin-small']};
            text-align: left;
        }
        h3{
            text-align: left;
        }
    `}
`;

export const OneRecipe = ({ recipe }: { recipe: Recipe }) => {
  const { image, title, description, content } = recipe;
  const ingredients = _.get(recipe, 'ingredients');
  console.log(content);
  return (
    <Row>
      <StyledOneRecipe
        sm={{ span: 20, offset: 2 }}
        md={{ span: 16, offset: 4 }}
        lg={{ span: 12, offset: 6 }}
      >
        <Row>
          <Col span={24}>{image ? <GraphImg image={image} /> : null}</Col>
        </Row>
        <Row>
          <Col span={20} offset={2}>
            <h1>{title}</h1>
            <p>{description}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <List
              header={<h3>Ingredients:</h3>}
              bordered
              dataSource={
                ingredients || [{ type: 'None added', amount: 0, unit: '' }]
              }
              renderItem={({ amount, unit, type }) => {
                return (
                  <List.Item>
                    {ingredients
                      ? `${amount} ${generateUnit(unit, amount)} ${type}`
                      : `${type}`}
                  </List.Item>
                );
              }}
            ></List>
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={2}>
            <h2>Directions:</h2>
            <GenerateContent textString={content} />
          </Col>
        </Row>
      </StyledOneRecipe>
    </Row>
  );
};
