import styled from 'styled-components';
import { MainLayout } from '../../components/layout/MainLayout';
import { RecipesList, queryEnum } from '../../components/RecipesList';
import { Col, Row } from 'antd';
import { useFetchUser } from '../../utils/user';
import * as _ from 'lodash';
import Router from 'next/router';
import { Loading } from '../../components/notify/Loading';

const StyledRow = styled(Row)`
  ${({ theme }) => `
    padding: ${theme['padding-small']} ${theme['padding-small']};
    display: flex;
    h1 {
        padding-left: ${theme['padding-small']};
        text-align: left;
    }
  `}
`;

const Index = () => {
  const { user, loading: isFetchUser } = useFetchUser();
  const owner = _.get(user, 'sub');
  const options = owner ? { variables: { where: { owner } } } : {};

  if (isFetchUser) return <Loading />;
  if (!user) {
    Router.replace('/');
  }

  return (
    <MainLayout title="My Recipes">
      <StyledRow>
        <Col>
          <h1>My Recipes</h1>
        </Col>
      </StyledRow>
      <RecipesList
        options={options}
        parentRoute="my-recipes"
        queryType={queryEnum.recipes}
      />
    </MainLayout>
  );
};

export default Index;
