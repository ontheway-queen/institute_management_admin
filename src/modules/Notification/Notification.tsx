import React, { useEffect, useState } from 'react';
import { Badge, Button, List, Typography, Popover, Row, Col } from 'antd';
import Iconify from '../../config/IconifyConfig';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {
  useClearAllNotificationMutation,
  useGetNotificationListQuery,
  useReadNotificationMutation,
} from './api/notificationApiEndpoints';
import useBreakpoint from '../../hooks/useBreakpoint';
import { socket } from '../../utilities/socket';
import { INotificationList } from './types/notificationType';
import { useGetProfileQuery } from '../Settings/api/profileEndpoint';
import Avatar from '../../common/Antd/Avatar';
dayjs.extend(relativeTime);

const Notification: React.FC = () => {
  const { data: profileData } = useGetProfileQuery();
  const [readNotification] = useReadNotificationMutation();
  const [clearAllNotification] = useClearAllNotificationMutation();
  const { xs } = useBreakpoint();
  const { data } = useGetNotificationListQuery();

  const [notifications, setNotifications] = useState<INotificationList[]>(
    data?.data || []
  );
  const [popoverVisible, setPopoverVisible] = useState(false);

  const unreadCount = notifications?.filter((n) => !n.is_read)?.length;

  useEffect(() => {
    if (data?.data) {
      setNotifications(data.data);
    }
  }, [data]);
  useEffect(() => {
    socket.auth = { id: profileData?.data?.user_id, type: 'ADMIN' };
    if (!socket.connected) {
      socket.connect();
    }

    // Listen for new notifications
    socket.on('ADMIN_NEW_NOTIFICATION', (notification) => {
      setNotifications((prev) => [notification, ...prev]); // Add to the top of the list
    });

    return () => {
      socket.off('ADMIN_NEW_NOTIFICATION');
    };
  }, []);
  const handleMarkAsRead = (id: number) => {
    if (id && profileData?.data?.user_id) {
      readNotification({ id, user_id: profileData?.data?.user_id });
    }
  };

  const content = (
    <div
      style={{
        maxWidth: 420,
        maxHeight: 400,
        overflowY: 'auto',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '10px',
      }}
    >
      <List
        dataSource={notifications || []}
        locale={{
          emptyText: (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Typography.Text type='secondary'>
                No notifications
              </Typography.Text>
            </div>
          ),
        }}
        renderItem={(item) => (
          <List.Item
            style={{
              backgroundColor: item?.is_read ? 'rgb(255 255 255)' : '#ECE8F9',
              borderRadius: 8,
              marginBottom: 8,
              padding: '5px 10px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'translateY(-2px)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = 'translateY(0)')
            }
          >
            <Row>
              <Col xl={3} md={3}>
                <Avatar url={item?.photo} />
              </Col>
              <Col md={21}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <div style={{ flex: 1 }}>
                    <Typography.Text
                      type={item.is_read ? 'secondary' : undefined}
                      strong
                    >
                      {item?.title}
                    </Typography.Text>

                    <div>{item.content}</div>
                  </div>
                </div>
              </Col>

              <Col xs={24}>
                {' '}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Typography.Text
                      type='secondary'
                      style={{ display: 'block', fontSize: 12, marginTop: 4 }}
                    >
                      {dayjs(item.created_at).format('DD-MMM-YYYY')}
                      {',  '}
                      {dayjs(item.created_at)?.fromNow()}
                    </Typography.Text>
                  </div>

                  {!item.is_read && (
                    <div style={{ textAlign: 'right', marginTop: 8 }}>
                      <Button
                        type='link'
                        size='small'
                        style={{ color: '#4280ef', padding: 0 }}
                        onClick={() => handleMarkAsRead(item.id)}
                      >
                        Mark as Read
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div>
      <Popover
        title={
          <Row justify={'space-between'} align={'middle'}>
            <Col>Notifications</Col>
            <Col
              onClick={() => {
                if (profileData?.data?.user_id) {
                  clearAllNotification({ user_id: profileData?.data?.user_id });
                }
              }}
            >
              <Button type='link'>Clear All</Button>
            </Col>
          </Row>
        }
        content={content}
        trigger='click'
        placement={xs ? 'top' : 'bottomRight'}
        open={popoverVisible}
        onOpenChange={(visible) => setPopoverVisible(visible)}
      >
        <Badge count={unreadCount}>
          <Button
            shape='circle'
            type='default'
            icon={
              <Iconify
                fontSize={20}
                icon='material-symbols-light:notifications-unread-outline-rounded'
              />
            }
          />
        </Badge>
      </Popover>
    </div>
  );
};

export default Notification;
