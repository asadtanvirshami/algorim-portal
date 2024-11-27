import axios from "axios";

const authApi = {
  login: (email: string, password: string) => {
    return axios.post(
      (process.env.NEXT_PUBLIC_API_URL as string) + "auth/login",
      {
        email,
        password,
      }
    );
  },
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    return axios.post(
      (process.env.NEXT_PUBLIC_API_URL as string) + "auth/signup",
      {
        firstName,
        lastName,
        email,
        password,
        blocked: false,
      }
    );
  },
};

export { authApi };