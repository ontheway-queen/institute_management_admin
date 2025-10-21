import { FetchArgs } from '@reduxjs/toolkit/query';
import api from '../../../app/api/api';
import { ApiResponse } from '../../../app/utilities/response';
import { IDashboardStats } from '../types/dashboardTypes';

const dashboardEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<ApiResponse<IDashboardStats>, void>({
      query: (): FetchArgs => ({
        url: '/agent/statistics',
      }),
      providesTags: ['DASHBOARD'],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardEndpoints;
