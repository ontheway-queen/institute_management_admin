const ENVIRONMENT: string = import.meta.env.VITE_NODE_ENV;

export const baseUrl =
  ENVIRONMENT === "development"
    ? "http://10.10.220.45:9501/api/v1"
    : "https://bpi-saas-server.m360ictapi.com/api/v1";
export const socket_url =
  ENVIRONMENT === "development"
    ? "http://10.10.220.45:9501"
    : "https://bpi-saas-server.m360ictapi.com";

export const imgUrl =
  "https://m360ict-data.s3.ap-south-1.amazonaws.com/bpi-sass/";

export const imgUrl2 =
  "https://m360ict-data.s3.ap-south-1.amazonaws.com/bpi-saas/";
