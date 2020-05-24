import gql from 'graphql-tag';

export const recipesGraphQL = gql`
  query($where: RecipeWhereInput) {
    recipes(where: $where) {
      id
      title
      content
      description
      ingredients
      userLikes {
        id
        user
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
