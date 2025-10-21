import { FetchArgs } from '@reduxjs/toolkit/query';
import api from '../../../app/api/api';
import { ApiResponse } from '../../../app/utilities/response';
import { setAuth } from '../../../app/slice/authSlice';
import {
  ForgotPasswordTypes,
  LoginApiResult,
  LoginTypes,
  MatchEmailOTP,
  SendEmailOTP,
} from '../types/authTypes';

const authEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginApiResult>, LoginTypes>({
      query: (data): FetchArgs => ({
        url: "/auth/management/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data.success) {
          const { success, token } = data;
          dispatch(setAuth({ success, token }));
          // dispatch(
          //   openNotification({
          //     description: 'You have successfully logged in.',
          //   })
          // );
        }
      },
      // invalidatesTags: ['PROFILE'],
    }),

    sendOTP: builder.mutation<ApiResponse<{ email: string }>, SendEmailOTP>({
      query: (data): FetchArgs => ({
        url: "/public/send-email-otp",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['PROFILE'],
    }),

    matchOTP: builder.mutation<ApiResponse<void>, MatchEmailOTP>({
      query: (data): FetchArgs => ({
        url: "/public/match-email-otp",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['PROFILE'],
    }),

    forgotPassword: builder.mutation<
      ApiResponse<LoginApiResult>,
      ForgotPasswordTypes
    >({
      query: (data): FetchArgs => ({
        url: "/auth/management/forget-password",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['PROFILE'],
    }),
    changePassword: builder.mutation<
      ApiResponse<void>,
      {
        old_password: string;
        new_password: string;
      }
    >({
      query: (data): FetchArgs => ({
        url: "/agent/profile/change-password",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['PROFILE'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSendOTPMutation,
  useMatchOTPMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
} = authEndpoint;
