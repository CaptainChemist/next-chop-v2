import { useQuery } from '@apollo/react-hooks';
import { recipeGraphQL } from '../../graphql/queries/recipe';
import * as _ from 'lodash';
import { Loading } from '../../components/notify/Loading';
import { MainLayout } from '../../components/layout/MainLayout';
import { Error } from '../../components/notify/Error';

const Recipe = ({ id }) => {
  const { loading, data, error } = useQuery(recipeGraphQL, {
    variables: { where: { id } },
  });
  const title = _.get(data, 'recipe.title');

  if (loading) {
    return (
      <MainLayout title="Recipe Loading">
        <Loading />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Recipe Loading Error">
        <Error errorText={`${error}`} />
      </MainLayout>
    );
  }

  if (!title) {
    return (
      <MainLayout title="Not a valid recipe">
        <Error errorText={`Not a valid recipe`} />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={title}>
      <p>{title}</p>
    </MainLayout>
  );
};

Recipe.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

export default Recipe;
