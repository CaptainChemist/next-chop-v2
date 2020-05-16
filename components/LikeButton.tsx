import { UserLike } from '../generated/apollo-components';
import styled from 'styled-components';
import { HeartFilled, HeartTwoTone } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { createUserLikeGraphQL } from '../graphql/mutations/createUserLike';
import { deleteUserLikeGraphQL } from '../graphql/mutations/deleteUserLike';

import { useFetchUser } from '../utils/user';
import * as _ from 'lodash';
import { recipeGraphQL } from '../graphql/queries/recipe';
import { userLikesGraphQL } from '../graphql/queries/userLikes';

const StyledSpan = styled.span`
  ${({ theme }) => `
        padding-left: 8px;
        font-size: ${theme['font-size-xs']} !important;
        color: ${theme['heart-color']};
        i {
            padding-left: 2px
        }
    `}
`;

export const LikeButton = ({
  userLikes,
  recipeId,
}: {
  userLikes: UserLike[];
  recipeId: string;
}) => {
  const { user, loading: isFetchingUser } = useFetchUser();
  const owner = _.get(user, 'sub');
  const [
    createUserLikeMutation,
    { loading: createUserLikeLoading },
  ] = useMutation(createUserLikeGraphQL);
  const [
    deleteUserLikeMutation,
    { loading: deleteUserLikeLoading },
  ] = useMutation(deleteUserLikeGraphQL);
  const userLike = _.filter(userLikes, { user: owner });
  const hasUserLiked = userLike.length > 0 ? true : false;

  const refetchQueries = [
    {
      query: recipeGraphQL,
      variables: { where: { id: recipeId } },
    },
    {
      query: userLikesGraphQL,
      variables: { where: { user: owner } },
    },
  ];

  if (_.isEmpty(owner)) {
    return (
      <StyledSpan>
        {`${userLikes.length}`}
        <HeartTwoTone twoToneColor="#eb2f96" />
      </StyledSpan>
    );
  }

  return (
    <StyledSpan>
      {`${userLikes.length}`}
      {hasUserLiked ? (
        <HeartFilled
          onClick={() => {
            deleteUserLikeMutation({
              refetchQueries,
              variables: {
                where: {
                  id: userLike[0].id,
                },
              },
            });
          }}
        />
      ) : (
        <HeartTwoTone
          onClick={() => {
            createUserLikeMutation({
              refetchQueries,
              variables: {
                data: {
                  user: owner,
                  recipe: {
                    connect: { id: recipeId },
                  },
                },
              },
            });
          }}
          twoToneColor="#eb2f96"
        />
      )}
    </StyledSpan>
  );
};
