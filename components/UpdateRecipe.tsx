import { useQuery, useMutation } from '@apollo/react-hooks';
import { recipeGraphQL } from '../graphql/queries/recipe';
import { submitForm } from '../utils/submitForm';
import { useState } from 'react';
import * as _ from 'lodash';
import { Form, Row, Col, Button } from 'antd';
import { GenerateInput, GenerateTextInput } from './GenerateFields';
import { GenerateIngredients } from './GenerateIngredients';
import { Loading } from './notify/Loading';
import { createUpdateObj } from '../utils/createUpdateObj';
import { updateRecipeGraphQL } from '../graphql/mutations/updateRecipe';
import { DeleteButton } from './DeleteButton';
import { PictureUploader } from './PictureUploader';
import GraphImg from 'graphcms-image';
import { deleteAssetGraphQL } from '../graphql/mutations/deleteAsset';

export const UpdateRecipe = ({ id }) => {
  const { loading: isQueryLoading, data, error } = useQuery(recipeGraphQL, {
    variables: { where: { id } },
  });
  const [updateRecipeMutation, { loading: updateRecipeLoading }] = useMutation(
    updateRecipeGraphQL,
  );
  const [deleteAssetMutation, { loading: deleteAssetLoading }] = useMutation(
    deleteAssetGraphQL,
  );

  const [recipeState, setRecipeState] = useState({
    isQueryLoading: true,
    isPicUploading: false,
  });

  const initiateUpdateRecipe = async () => {
    const queryImageHandle = _.get(data, 'recipe.image.handle');
    const inputsImageHandle = _.get(inputs, 'image.create.handle');
    const queryImageId = _.get(data, 'recipe.image.id');
    if (queryImageHandle !== inputsImageHandle && !_.isNil(inputsImageHandle)) {
      await deleteAssetMutation({
        variables: {
          where: {
            id: queryImageId,
          },
        },
      });
    }
    const updateObj = createUpdateObj(data, inputs);
    if (!_.isEmpty(updateObj)) {
      const result = await updateRecipeMutation({
        refetchQueries: [
          { query: recipeGraphQL, variables: { where: { id } } },
        ],
        variables: {
          data: {
            ...updateObj,
          },
          where: { id },
        },
      });
      const updateRecipe = _.get(result, 'data.updateRecipe');
      return updateRecipe;
    } else {
      const recipe = _.get(data, 'recipe');
      return recipe;
    }
  };

  const {
    inputs,
    handleInputChange,
    handleAddIngredient,
    handleDeleteIngredient,
    handleDropdownChange,
    handleUpdate,
    handleSubmitImage,
    setInputs,
  } = submitForm(
    {
      title: '',
      description: '',
      content: '',
      ingredients: [],
    },
    initiateUpdateRecipe,
  );
  if (!isQueryLoading && recipeState.isQueryLoading) {
    const { __typename, ...loadedRecipe } = _.get(data, 'recipe');
    setInputs((state) => ({ ...state, ...loadedRecipe }));
    setRecipeState((state) => ({ ...state, isQueryLoading }));
  }

  if (!data) return <Loading />;

  const disabled =
    isQueryLoading ||
    updateRecipeLoading ||
    recipeState.isPicUploading ||
    deleteAssetLoading;

  return (
    <Form onFinish={handleUpdate}>
      <GenerateInput
        name="title"
        value={inputs.title}
        handleInputChange={handleInputChange}
      />
      <GenerateInput
        name="description"
        value={inputs.description}
        handleInputChange={handleInputChange}
      />
      <GenerateTextInput
        name="content"
        value={inputs.content}
        handleInputChange={handleInputChange}
      />
      <GenerateIngredients
        names={['amount', 'unit', 'type']}
        values={inputs.ingredients}
        handleAddIngredient={handleAddIngredient}
        handleDeleteIngredient={handleDeleteIngredient}
        handleInputChange={handleInputChange}
        handleDropdownChange={handleDropdownChange}
      />
      <Row>
        <Col span={12} />
        <Col span={4}>
          <Form.Item label="Upload Image">
            {inputs.image ? <GraphImg image={inputs.image} /> : null}
            <PictureUploader
              setRecipeState={setRecipeState}
              handleSubmitImage={handleSubmitImage}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Action">
            <Button block disabled={disabled} type="primary" htmlType="submit">
              Update Recipe
            </Button>
            <DeleteButton
              id={id}
              disabled={disabled}
              imageId={_.get(inputs, 'image.id')}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
