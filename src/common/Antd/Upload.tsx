import React, { useEffect, useState } from 'react';
import { Upload as AntUpload, Button, Image, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import Iconify from '../../config/IconifyConfig';
import { imgUrl } from '../../app/utilities/baseQuery';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Props {
  listType?: 'picture-card' | 'picture' | 'picture-circle' | 'text';
  onChange?: (fileList: UploadFile[]) => void;
  value?: UploadFile[];
  accept?: 'image/*' | '.doc,.docx,.pdf';
  size?: number;
  defaultImageLink?: string;
  editMode: boolean | undefined;
}

const Upload: React.FC<Props> = ({
  listType = 'picture-card',
  onChange,
  accept,
  size,
  defaultImageLink,
  editMode,
}) => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [showUploadImg, setUploadImg] = useState<UploadFile[]>();
  const handlePreview = async (file: UploadFile): Promise<void> => {
    console.log(file);
    if (!file.url && !file.preview) {
      try {
        file.preview = await getBase64(file.originFileObj as FileType);
      } catch (error) {
        console.log(error);
        message.error('Failed to generate preview');
        return;
      }
    }
    const imageUrl = file.url || (file.preview as string);
    setPreviewImage(imageUrl);
    setPreviewOpen(true);
  };

  const beforeUpload = (file: FileType) => {
    const isLt2M = file.size / 1024 / 1024 < (size || 2);
    if (!isLt2M) {
      message.error(`Image must be smaller than ${size || 2}MB!`);
      return AntUpload.LIST_IGNORE;
    }
    return false;
  };

  const handleChange: UploadProps['onChange'] = ({ fileList }): void => {
    setUploadImg(fileList);
    const updatedFileList = fileList
      .filter((file) => file.size && file.size / 1024 / 1024 < (size || 2))
      .map((file) => {
        if (file.status === 'done' && file.response) {
          console.log('Upload Response: ', file.response);
          file.url =
            file.response.url || file.response.fileUrl || file.response.path;
        }
        return file;
      });
    onChange?.(updatedFileList);
  };

  useEffect(() => {
    if (editMode) {
      if (defaultImageLink) {
        setUploadImg([
          {
            uid: '-1',
            name: `${defaultImageLink}`,
            status: 'done',
            url: `${imgUrl}${defaultImageLink}`,
          },
        ]);
      } else {
        setUploadImg([
          {
            uid: '-1',
            name: `No Image Found`,
            status: 'done',
            url: '',
          },
        ]);
      }
    }
  }, [defaultImageLink, editMode]);

  return (
    <>
      <AntUpload
        beforeUpload={beforeUpload}
        maxCount={1}
        listType={listType}
        showUploadList={{ showRemoveIcon: true }}
        onPreview={handlePreview}
        onChange={handleChange}
        fileList={showUploadImg}
        accept={accept}
        style={{ width: '100%' }}
        className='antd-upload-with'
      >
        {listType === 'picture-card' || listType === 'picture-circle' ? (
          <Iconify icon='ant-design:plus-outlined' style={{ width: '100%' }} />
        ) : (
          <Button
            type='default'
            icon={<Iconify icon='ant-design:plus-outlined' />}
            style={{ width: '100%' }}
          >
            Click to Upload
          </Button>
        )}
      </AntUpload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
          onError={() => {
            message.error('Failed to load image preview');
          }}
        />
      )}
    </>
  );
};

export default Upload;
