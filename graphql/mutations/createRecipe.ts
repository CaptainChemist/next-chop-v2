import gql from 'graphql-tag';

export const createRecipeGraphQL = gql`
  mutation($data: RecipeCreateInput!) {
    createRecipe(data: $data) {
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
