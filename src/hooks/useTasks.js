import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const fetchTasks = async (filters) => {
  const response = await api.get("/api/tasks", { params: filters });
  return response.data.data;
};

export const useTasks = (filters) => {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => fetchTasks(filters),
    keepPreviousData: true, // Mempertahankan data sebelumnya saat fetching ulang
    staleTime: 5000, // Mengatur data tetap segar selama 5 detik
  });
};
