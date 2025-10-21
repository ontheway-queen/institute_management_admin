import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utilities/response";
import { IQueryParams } from "../../Administration/types/adminUserTypes";
import { ISemesterWiseAttendanceListType } from "../types/semesterWiseAttendanceTypes";

const semesterWiseAttendanceApiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSemesterWiseAttendanceList: builder.query<
      ApiResponse<ISemesterWiseAttendanceListType[]>,
      IQueryParams
    >({
      query: (params): FetchArgs => ({
        url: "/management/student-enrollment/attendance-summary",
        params,
      }),
      providesTags: ["ATTENDANCE-SUMMARY"],
    }),
  }),
});

export const { useGetSemesterWiseAttendanceListQuery } =
  semesterWiseAttendanceApiEndpoints;
