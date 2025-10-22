import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utilities/response";
import { IQueryParams } from "../../Administration/types/adminUserTypes";
import { IInstituteALL, IUpdateInstitute } from "../types/instituteTypes";

const instituteApiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getInstituteList: builder.query<ApiResponse<IInstituteALL>, IQueryParams>({
      query: (params): FetchArgs => ({
        url: "/management/institute",
        params,
      }),
      providesTags: ["INSTITUTE"],
    }),
    getSingleInstitute: builder.query<
      ApiResponse<IInstituteALL>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/management/institute/${id}`,
        method: "GET",
      }),
      providesTags: ["INSTITUTE"],
    }),
    // createInstitute: builder.mutation<void, FormData>({
    //   query: (payload): FetchArgs => ({
    //     console.log(payload)
    //     url: "/management/institute",
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["INSTITUTE"],
    // }),

    createInstitute: builder.mutation<void, FormData>({
      query: (payload): FetchArgs => {
        // Log all keys and values in FormData
        console.log("FormData contents:");
        payload.forEach((value, key) => {
          console.log(key, value);
        });

        return {
          url: "/management/institute",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["INSTITUTE"],
    }),
    updateInstitute: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/management/institute/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    // deleteDepartment: builder.mutation<void, number>({
    //   query: (id): FetchArgs => ({
    //     url: `/management/management/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["DEPARTMENT"],
    // }),
  }),
});

export const {
  useCreateInstituteMutation,
  useGetInstituteListQuery,
  useGetSingleInstituteQuery,
  useUpdateInstituteMutation,
  // useDeleteDepartmentMutation,
} = instituteApiEndpoints;
