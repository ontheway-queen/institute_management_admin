import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utilities/response";
import {
  ICreateSubjecCSVtType,
  ISubjectListType,
  IUpdateSubjectType,
} from "../types/subjectTypes";
import { IQueryParams } from "../../Administration/types/adminUserTypes";

const subjectApiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubjectList: builder.query<
      ApiResponse<ISubjectListType[]>,
      IQueryParams
    >({
      query: (params): FetchArgs => ({
        url: "/management/subject",
        params,
      }),
      providesTags: ["SUBJECT"],
    }),
    createSubject: builder.mutation<
      void,
      ISubjectListType[] | ICreateSubjecCSVtType[]
    >({
      query: (payload): FetchArgs => ({
        url: "/management/subject",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["SUBJECT"],
    }),
    updateSubject: builder.mutation<
      void,
      Partial<IUpdateSubjectType> & {
        id: number;
      }
    >({
      query: ({ id, ...payload }): FetchArgs => ({
        url: `/management/subject/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["SUBJECT"],
    }),
    deleteSubject: builder.mutation<void, number>({
      query: (id): FetchArgs => ({
        url: `/management/subject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SUBJECT"],
    }),
  }),
});

export const {
  useCreateSubjectMutation,
  useGetSubjectListQuery,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} = subjectApiEndpoints;
