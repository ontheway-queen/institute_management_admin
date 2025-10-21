import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utilities/response";
import { ISemesterListType } from "../types/semesterTypes";
import { IQueryParams } from "../../Administration/types/adminUserTypes";

const semesterApiEndpoints = api.injectEndpoints({
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
    createSemester: builder.mutation<void, ISemesterListType[]>({
      query: (payload): FetchArgs => ({
        url: "/management/main-semester",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["SEMESTER"],
    }),
    updateSemester: builder.mutation<
      void,
      Partial<ISemesterListType> & {
        id: number;
      }
    >({
      query: ({ id, ...payload }): FetchArgs => ({
        url: `/management/main-semester/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["SEMESTER"],
    }),
    deleteSemester: builder.mutation<void, number>({
      query: (id): FetchArgs => ({
        url: `/management/main-semester/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SEMESTER"],
    }),
  }),
});

export const {
  useGetSemesterListQuery,
  useCreateSemesterMutation,
  useUpdateSemesterMutation,
  useDeleteSemesterMutation,
} = semesterApiEndpoints;
