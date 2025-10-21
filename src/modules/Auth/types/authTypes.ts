export type LoginTypes = {
  email: string;
  password: string;
  remember: boolean;
};
export type LoginApiResult = Partial<{
  user_id: number;
  email: string;
  name: string;
  photo: string;
  is_2fa_on: boolean;
  login_id: string;
  phone: string;
  user_type: 'management';
  status: string;
}>;

export type TCommOTPVerifyType = '2fa_admin' | 'reset_admin';
export type SendEmailOTP = {
  email: string;
  type: TCommOTPVerifyType;
};
export type MatchEmailOTP = {
  email: string;
  type: TCommOTPVerifyType;
  otp: string;
};
export type ForgotPasswordTypes = {
  token: string;
  email: string;
  password: string;
};

export type AuthError = {
  status:
    | number
    | 'FETCH_ERROR'
    | 'CUSTOM_ERROR'
    | 'PARSING_ERROR'
    | 'TIMEOUT_ERROR';
  data: {
    success: boolean;
    message: string;
  };
};
