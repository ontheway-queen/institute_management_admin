import { FetchArgs } from '@reduxjs/toolkit/query';
import api from '../../../app/api/api';
import { ApiResponse } from '../../../app/utilities/response';
import {
  IRoleList,
  IQueryParams,
  UserAdminListType,
  UserSingleAdminType,
  IPermissionList,
  ISingleRole,
  ICreateRole,
  IUpdateRole,
} from '../types/adminUserTypes';

const adminUserApiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserAdminList: builder.query<
      ApiResponse<UserAdminListType[]>,
      IQueryParams
    >({
      query: (params): FetchArgs => ({
        url: '/agent/administration/admin',
        params,
      }),
      providesTags: ['ADMINISTRATION'],
    }),
    getSingleUserAdmin: builder.query<ApiResponse<UserSingleAdminType>, number>(
      {
        query: (id): FetchArgs => ({
          url: `/agent/administration/agent/${id}`,
        }),
        providesTags: ['ADMINISTRATION'],
      }
    ),
    addAdminUser: builder.mutation<void, FormData>({
      query: (payload): FetchArgs => ({
        url: '/agent/administration/admin',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ADMINISTRATION'],
    }),
    addRole: builder.mutation<void, ICreateRole>({
      query: (payload): FetchArgs => ({
        url: 'admin/administration/role',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ADMINISTRATION', 'ROLE'],
    }),
    updateRole: builder.mutation<void, { id: number; body: IUpdateRole }>({
      query: (payload): FetchArgs => ({
        url: `admin/administration/role/${payload.id}`,
        method: 'PATCH',
        body: payload.body,
      }),
      invalidatesTags: ['ADMINISTRATION', 'ROLE'],
    }),
    editAdminUser: builder.mutation<void, { id: number; body: FormData }>({
      query: ({ id, body }): FetchArgs => ({
        url: `/agent/administration/agent/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['ADMINISTRATION', 'PROFILE'],
    }),
    getUserRoleList: builder.query<ApiResponse<IRoleList[]>, IQueryParams>({
      query: (params): FetchArgs => ({
        url: '/agent/administration/role',
        params,
      }),
      providesTags: ['ROLE'],
    }),
    getSingleRole: builder.query<ApiResponse<ISingleRole>, { id: number }>({
      query: (params): FetchArgs => ({
        url: `/agent/administration/role/${params.id}`,
      }),
      providesTags: ['ROLE'],
    }),
    getAllPermissionList: builder.query<ApiResponse<IPermissionList[]>, void>({
      query: (): FetchArgs => ({
        url: '/agent/administration/permission',
      }),
      providesTags: ['ROLE'],
    }),
  }),
});

export const {
  useGetUserAdminListQuery,
  useGetUserRoleListQuery,
  useAddAdminUserMutation,
  useEditAdminUserMutation,
  useGetSingleUserAdminQuery,
  useGetAllPermissionListQuery,
  useGetSingleRoleQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
} = adminUserApiEndpoints;
