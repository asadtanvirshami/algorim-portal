import { ProjectActionTypes } from "@/redux/constants/form-constant";
import axios from "axios";
interface Project {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  // Add other fields based on your backend response
}
interface PaginatedResponse<T> {
  data: T[];
  total: number; // Total number of items in the database
}
const projectApi = {
  getAll: async (
    page: number,
    limit: number,
    status?: string,
    id?: string
  ): Promise<PaginatedResponse<Project>> => {
    const response = await axios.get<PaginatedResponse<Project>>(
      (process.env.NEXT_PUBLIC_API_URL as string) +
        `project/get?userId=${
          id || ""
        }&page=${page}&limit=${limit}&status=${status}`
    );
    return response.data;
  },
  getOne: async (id?: string): Promise<Project> => {
    const response = await axios.get<Project>(
      (process.env.NEXT_PUBLIC_API_URL as string) + `project/get-one?id=${id}`
    );
    return response.data;
  },

  bulkUpdate: async (
    data?: ProjectActionTypes
  ): Promise<ProjectActionTypes> => {
    const response = await axios.put<ProjectActionTypes>(
      (process.env.NEXT_PUBLIC_API_URL as string) + `project/edit`,
      { ...data }
    );
    return response.data;
  },
};

export { projectApi };
