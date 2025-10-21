import { FetchArgs } from '@reduxjs/toolkit/query';
import api from '../../../app/api/api';
import { ApiResponse } from '../../../app/utilities/response';
import { ProfileTypes } from '../types/profileTypes';

const profileEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ApiResponse<ProfileTypes>, void>({
      query: (): FetchArgs => ({
        url: '/management/profile',
        method: 'GET',
      }),
      providesTags: ['PROFILE'],
    }),

    editProfile: builder.mutation<void, { body: FormData }>({
      query: ({ body }): FetchArgs => ({
        url: `/management/profile`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['PROFILE'],
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation } = profileEndpoint;
