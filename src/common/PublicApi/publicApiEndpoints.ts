import { FetchArgs } from '@reduxjs/toolkit/query';
import api from '../../app/api/api';
import { ApiResponse } from '../../app/utilities/response';
import { INationalityList } from './types/publicTypes';

const publicApiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getNationalityList: builder.query<
      ApiResponse<INationalityList[]>,
      { name: string }
    >({
      query: (params): FetchArgs => ({
        url: '/public/nationality',
        params,
      }),
      providesTags: ['PUBLIC'],
    }),
    getCityList: builder.query<
      ApiResponse<INationalityList[]>,
      { name: string }
    >({
      query: (params): FetchArgs => ({
        url: '/public/city',
        params,
      }),
      providesTags: ['PUBLIC'],
    }),
  }),
});

export const { useGetNationalityListQuery, useGetCityListQuery } =
  publicApiEndpoints;
