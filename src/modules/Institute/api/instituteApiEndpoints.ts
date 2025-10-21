import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utilities/response";
import {
  ICreateDepartmentType,
  IUpdateDepartmentType,
} from "../types/instituteTypes";
import { IQueryParams } from "../../Administration/types/adminUserTypes";

const instituteApiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentList: builder.query<
      ApiResponse<IDepartmentListType[]>,
      IQueryParams
    >({
      query: (params): FetchArgs => ({
        url: "/management/institute",
        params,
      }),
      providesTags: ["DEPARTMENT"],
    }),
    createDepartment: builder.mutation<void, ICreateDepartmentType[]>({
      query: (payload): FetchArgs => ({
        url: "/management/institute",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["DEPARTMENT"],
    }),
    updateDepartment: builder.mutation<
      void,
      Partial<IUpdateDepartmentType> & {
        id: number;
      }
    >({
      query: ({ id, ...payload }): FetchArgs => ({
        url: `/management/management/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["DEPARTMENT"],
    }),
    deleteDepartment: builder.mutation<void, number>({
      query: (id): FetchArgs => ({
        url: `/management/management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DEPARTMENT"],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetDepartmentListQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = instituteApiEndpoints;
