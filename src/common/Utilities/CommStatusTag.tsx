import React from 'react';
import { Tag, TagProps } from 'antd';

export type StatusPropsType =
  | 'running'
  | 'completed'
  | 'ongoing'
  | 'Active'
  | 'upcoming'
  | 'Inactive'
  | 'inactive'
  | 'Pending'
  | 'PENDING'
  | 'Approved'
  | 'Rejected'
  | 'Blocked'
  | 'BLOCKED'
  | 'Applied'
  | 'Cancelled'
  | 'Cancelled'
  | 'Completed'
  | 'Incomplete'
  | 'Unpaid'
  | 'Paid'
  | 'Unassigned'
  | 'Assigned'
  | 'Upcoming'
  | 'current'
  | 'N/A';

const CommStatusTag: React.FC<{
  status?: StatusPropsType;
  minWidth?: string;
}> = ({ status = 'N/A', minWidth }) => {
  const statusColors: Record<
    StatusPropsType,
    TagProps['color'] | '#f50' | '#87d068' | '#108ee9'
  > = {
    running: '#f50',
    completed: '#108ee9',
    upcoming: '#87d068',
    ongoing: '#3b5999',
    current: '#3eaba5',
    Active: 'green',
    Applied: 'green',
    Assigned: 'green-inverse',
    Approved: 'green',
    Paid: 'green',
    Cancelled: 'red',
    Unassigned: 'red',
    Unpaid: 'red',
    Upcoming: 'volcano',
    Inactive: 'red',
    inactive: 'red',
    Pending: 'orange',
    PENDING: 'orange',
    Blocked: 'volcano',
    BLOCKED: 'volcano',
    Rejected: 'volcano',
    Completed: 'geekblue',
    Incomplete: 'blue',
    'N/A': 'yellow',
  };

  return (
    <Tag
      style={{ minWidth: minWidth || '60px', textAlign: 'center' }}
      color={statusColors[status || 'N/A']}
    >
      {status?.replace('-', ' ')?.replace(/\b\w/g, (c) => c?.toUpperCase())}
    </Tag>
  );
};

export default CommStatusTag;
