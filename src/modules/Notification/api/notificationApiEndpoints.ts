import { FetchArgs } from '@reduxjs/toolkit/query';
import api from '../../../app/api/api';
import { ApiResponse } from '../../../app/utilities/response';
import { INotificationList } from '../types/notificationType';

const notificationApiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationList: builder.query<ApiResponse<INotificationList[]>, void>({
      query: (): FetchArgs => ({
        url: '/public/notification',
      }),
      providesTags: ['NOTIFICATION'],
    }),

    readNotification: builder.mutation<void, { user_id: number; id: number }>({
      query: (params): FetchArgs => ({
        url: `/public/notification`,
        method: 'PATCH',
        params,
      }),
      invalidatesTags: ['NOTIFICATION'],
    }),
    clearAllNotification: builder.mutation<void, { user_id: number }>({
      query: (params): FetchArgs => ({
        url: `/public/notification`,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: ['NOTIFICATION'],
    }),
  }),
});

export const {
  useGetNotificationListQuery,
  useReadNotificationMutation,
  useClearAllNotificationMutation,
} = notificationApiEndpoints;
