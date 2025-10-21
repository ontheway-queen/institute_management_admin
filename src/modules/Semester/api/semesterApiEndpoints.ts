import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utilities/response";
import {
  ICreateDepartmentType,
  IUpdateDepartmentType,
  ISemesterListType,
} from "../types/semesterTypes";
import { IQueryParams } from "../../Administration/types/adminUserTypes";

const departmentApiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSemesterList: builder.query<
      ApiResponse<ISemesterListType[]>,
      IQueryParams
    >({
      query: (params): FetchArgs => ({
        url: "/management/main-semester",
        params,
      }),
      providesTags: ["SEMESTER"],
    }),
    createDepartment: builder.mutation<void, ICreateDepartmentType[]>({
      query: (payload): FetchArgs => ({
        url: "/management/main-semester",
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
        url: `/management/main-semester/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["DEPARTMENT"],
    }),
    deleteDepartment: builder.mutation<void, number>({
      query: (id): FetchArgs => ({
        url: `/management/main-semester/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DEPARTMENT"],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetSemesterListQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApiEndpoints;
