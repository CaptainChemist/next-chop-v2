import { MainLayout } from '../components/layout/MainLayout';
import styled from 'styled-components';
import { useFetchUser } from '../utils/user';
import * as _ from 'lodash';
import { Loading } from '../components/notify/Loading';
import Router from 'next/router';
import { RecipesList, queryEnum } from '../components/RecipesList';

const StyledHeader = styled.h1`
  ${({ theme }) => `
        font-size: 2em;
        text-align: left;
        padding: ${theme['padding-small']} ${theme['padding-small']};
    `}
`;

const Favorites = () => {
  const { user, loading: isFetchUser } = useFetchUser();
  const owner = _.get(user, 'sub');
  const options = owner ? { variables: { where: { user: owner } } } : {};

  if (isFetchUser) return <Loading />;
  if (!user) {
    Router.replace('/');
  }

  return (
    <MainLayout title="Recipes">
      <StyledHeader>My Favorites</StyledHeader>
      <RecipesList
        parentRoute="recipe"
        queryType={queryEnum.userLikes}
        options={options}
      />
    </MainLayout>
  );
};

export default Favorites;
