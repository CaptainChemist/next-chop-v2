import { Button, Modal } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { deleteRecipeGraphQL } from '../graphql/mutations/deleteRecipe';
import { useState } from 'react';
import { recipesGraphQL } from '../graphql/queries/recipes';
import Router from 'next/router';
import { deleteAssetGraphQL } from '../graphql/mutations/deleteAsset';

export const DeleteButton = ({
  id,
  disabled,
  imageId,
}: {
  id: string;
  disabled: boolean;
  imageId: string;
}) => {
  const [deleteRecipeMutation, { loading: deleteRecipeLoading }] = useMutation(
    deleteRecipeGraphQL,
  );
  const [deleteAssetMutation, { loading: deleteAssetLoading }] = useMutation(
    deleteAssetGraphQL,
  );

  const [isModalVisible, setModalVisibility] = useState(false);

  const handleOk = async () => {
    if (imageId && !deleteAssetLoading) {
      await deleteAssetMutation({
        refetchQueries: [{ query: recipesGraphQL }],
        variables: {
          where: { id: imageId },
        },
      });
    }

    if (!deleteRecipeLoading) {
      await deleteRecipeMutation({
        refetchQueries: [{ query: recipesGraphQL }],
        variables: {
          where: { id },
        },
      });
    }

    setModalVisibility(false);
    Router.replace('/my-recipes');
  };
  const handleShow = () => setModalVisibility(true);
  const handleHide = () => setModalVisibility(false);

  return (
    <>
      <Button
        block
        // @ts-ignore
        type="danger"
        disabled={disabled || deleteRecipeLoading || deleteAssetLoading}
        onClick={handleShow}
      >
        Delete Recipe
      </Button>
      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleHide}
      >
        <p>Are you sure that you want to delete this recipe?</p>
      </Modal>
    </>
  );
};
