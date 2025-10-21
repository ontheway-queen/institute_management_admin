import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utilities/response";
import {
  IDepartmentListType,
  ICreateDepartmentType,
  IUpdateDepartmentType,
} from "../types/departmentTypes";
import { IQueryParams } from "../../Administration/types/adminUserTypes";

const departmentApiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentList: builder.query<
      ApiResponse<IDepartmentListType[]>,
      IQueryParams
    >({
      query: (params): FetchArgs => ({
        url: "/management/department",
        params,
      }),
      providesTags: ["DEPARTMENT"],
    }),
    createDepartment: builder.mutation<void, ICreateDepartmentType[]>({
      query: (payload): FetchArgs => ({
        url: "/management/department",
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
        url: `/management/department/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["DEPARTMENT"],
    }),
    deleteDepartment: builder.mutation<void, number>({
      query: (id): FetchArgs => ({
        url: `/management/department/${id}`,
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
} = departmentApiEndpoints;
