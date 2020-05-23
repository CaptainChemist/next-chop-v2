import { Button, Modal } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { deleteRecipeGraphQL } from '../graphql/mutations/deleteRecipe';
import { useState } from 'react';
import { recipesGraphQL } from '../graphql/queries/recipes';
import Router from 'next/router';

export const DeleteButton = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const [deleteRecipeMutation, { loading: deleteRecipeLoading }] = useMutation(
    deleteRecipeGraphQL,
  );

  const [isModalVisible, setModalVisibility] = useState(false);

  const handleOk = async () => {
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
      <Button block type="danger" disabled={disabled} onClick={handleShow}>
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
