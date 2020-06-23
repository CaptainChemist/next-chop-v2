import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import getConfig from 'next/config';
import { Dispatch, SetStateAction } from 'react';
import * as _ from 'lodash';

const { publicRuntimeConfig } = getConfig();
const {
  GRAPHCMSPROJECTID,
  BRANCH,
  CDNBASE,
  APIURL,
  APIKEY,
} = publicRuntimeConfig.graphcms;

console.log(CDNBASE);

export const PictureUploader = ({
  setRecipeState,
  handleSubmitImage,
}: {
  setRecipeState: Dispatch<
    SetStateAction<{
      isPicUploading: boolean;
      isQueryLoading: boolean;
    }>
  >;
  handleSubmitImage: (image: any) => void;
}) => {
  const uploadProps = {
    name: 'file',
    action: (file) =>
      `${APIURL}?key=${APIKEY}&path=/${GRAPHCMSPROJECTID}-${BRANCH}/${file.name}`,
    data: (file) => ({ fileUpload: file }),
    onChange: async (info) => {
      if (info.file.status === 'uploading') {
        setRecipeState((state) => ({ ...state, isPicUploading: true }));
      }

      if (info.file.status === 'done') {
        console.log(info.file.response);
        const { size, type, filename } = info.file.response;

        var img = new Image();
        img.onload = function () {
          console.log(this);
          const height = _.get(this, 'naturalHeight');
          const width = _.get(this, 'naturalWidth');
          handleSubmitImage({
            create: {
              size,
              mimeType: type,
              fileName: filename,
              handle: _.get(info, 'file.response.url').replace(CDNBASE, ''),
              height,
              width,
            },
          });
          setRecipeState((state) => ({ ...state, isPicUploading: false }));
        };
        img.src = info.file.response.url;
      } else if (info.file.status === 'error') {
        setRecipeState((state) => ({ ...state, isPicUploading: false }));
      }
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button>
        <UploadOutlined />
        Click to Upload
      </Button>
    </Upload>
  );
};
