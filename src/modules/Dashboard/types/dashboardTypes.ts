import { StatusPropsType } from '../../../common/Utilities/CommStatusTag';

export type IDashboardStats = {
  jobSeekers: {
    total: number;
    new: number;
    pending: number;
    inactive: number;
  };
  hoteliers: {
    total: number;
    new: number;
    pending: number;
    inactive: number;
  };
  jobPosts: {
    total: number;
    active: number;
    cancelled: number;
  };
  successfulHires: number;
  payments: {
    total: number;
    paid: number;
    pending: number;
  };
  reports: {
    pending: number;
  };
  latestApplications: {
    id: number;
    job_post_details_id: number;
    job_title: string;
    job_seeker_id: number;
    job_seeker_name: string;
    job_seeker_photo: string;
    status: StatusPropsType;
    created_at: string;
  }[];

  financialStats: {
    month: string;
    hotelier_paid: number;
    job_seeker_get: number;
    admin_earned: number;
  }[];
};
