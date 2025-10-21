export interface INotificationList {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  related_id: number;
  type: string;
  is_read: boolean;
  sender_id: null;
  title: null;
  user_type: 'ADMIN';
  photo: null;
}
