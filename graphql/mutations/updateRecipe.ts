import gql from 'graphql-tag';

export const updateRecipeGraphQL = gql`
  mutation($data: RecipeUpdateInput!, $where: RecipeWhereUniqueInput!) {
    updateRecipe(data: $data, where: $where) {
      id
      title
      content
      description
      ingredients
      userLikes {
        id
      }
      owner
      image {
        id
        fileName
        height
        width
        size
        handle
      }
    }
  }
`;
