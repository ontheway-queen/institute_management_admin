import { Icon } from '@iconify/react/dist/iconify.js';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import { ThemeState } from '../../app/slice/themeSlice';

type IProps = {
  showView?: boolean;
  customShowView?: boolean;
  showEdit?: boolean;
  showEditReadOnly?: boolean;
  showDelete?: boolean;
  deleteLoading?: boolean;
  showViewWithLink?: string;
  customShowViewWithLink?: string;
  handleEditChange?: () => void;
  handleViewChange?: () => void;
  customHandleViewChange?: () => void;
  deleteOnConfirm?: () => void;
  editIcon?: string;
};
const CommTableActions = ({
  showEdit,
  showView,
  showDelete,
  handleEditChange,
  showViewWithLink,
  handleViewChange,
  deleteOnConfirm,
  customHandleViewChange,
  deleteLoading,
  customShowView,
  customShowViewWithLink,
  editIcon,
  showEditReadOnly,
}: IProps) => {
  const { colorPrimary } = useAppSelector(ThemeState);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center', // Ensures vertical centering
        // justifyContent: 'center', // Ensures horizontal centering
        gap: '5px', // Adjusted for consistent spacing
      }}
    >
      {showView && !showViewWithLink && (
        <span
          onClick={handleViewChange}
          style={{
            display: 'flex',
            alignItems: 'center', // Centers the icon within the span
            justifyContent: 'center',
          }}
        >
          <Icon
            icon='ri:eye-fill'
            style={{
              fontSize: '24px',
              color: colorPrimary,
              cursor: 'pointer',
            }}
          />
        </span>
      )}

      {showView && showViewWithLink && (
        <Link
          to={showViewWithLink}
          style={{
            display: 'flex',
            alignItems: 'center', // Centers the icon within the link
            justifyContent: 'center',
          }}
        >
          <Icon
            icon='ri:eye-fill'
            style={{
              fontSize: '24px',
              color: colorPrimary,
              cursor: 'pointer',
            }}
          />
        </Link>
      )}

      {showEdit && (
        <span
          onClick={showEditReadOnly ? undefined : handleEditChange}
          style={{
            display: 'flex',
            alignItems: 'center', // Centers the icon within the span
            justifyContent: 'center',
          }}
        >
          <Icon
            icon={editIcon || 'tabler:edit'}
            style={{
              fontSize: '25px',
              color: colorPrimary,
              cursor: 'pointer',
            }}
          />
        </span>
      )}
      {showDelete && (
        <Popconfirm
          title='Delete the Item'
          description='Are you sure to delete this Item?'
          okText='Yes'
          cancelText='No'
          onConfirm={deleteOnConfirm}
          okButtonProps={{ loading: deleteLoading }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center', // Centers the icon within the span
              justifyContent: 'center',
            }}
          >
            <Icon
              icon='material-symbols:delete'
              style={{
                fontSize: '24px',
                color: '#f96363',
                cursor: 'pointer',
              }}
            />
          </span>
        </Popconfirm>
      )}

      {customShowView && !customShowViewWithLink && (
        <span
          onClick={customHandleViewChange}
          style={{
            display: 'flex',
            alignItems: 'center', // Centers the icon within the span
            justifyContent: 'center',
          }}
        >
          <Icon
            icon='clarity:assign-user-solid'
            style={{
              fontSize: '24px',
              color: '#4280EF',
              cursor: 'pointer',
            }}
          />
        </span>
      )}
    </div>
  );
};

export default CommTableActions;
