import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";


export const getBySlug = (slug: string) => {
  const url = `https://api.instantwebtools.net/v1/passenger/${slug}`;
  return GetQuery(url);
};

export const GetQuery = (BASE_URL: string, pageNumber?: number) => {
  const { isLoading, data: passengersData } = useQuery({
    queryKey: ["passengers", pageNumber],
    queryFn: async () => await axios.get(BASE_URL),
    keepPreviousData: true,
  });

  return { isLoading, passengersData };
};

export const PostQuery = (queryCache: any) => {
  const mutation: UseMutationResult = useMutation({
    mutationFn: async (object) => await axios.post("https://api.instantwebtools.net/v1/passenger", object),
    onSuccess: (data) => {
      alert("success");
      return queryCache.invalidateQueries({ queryKey: ["passengers"] });
    },
    onError: (data, error) => console.log(data, error),
  });
  return mutation;
};

export const DeletePassenger = (queryCache: any) => {
  const mutation: UseMutationResult = useMutation({
    mutationFn: (id) =>
        axios.delete(`https://api.instantwebtools.net/v1/passenger/${id}`),
    onSuccess: (data) => {
      alert("success");
      return queryCache.invalidateQueries({ queryKey: ["passengers"] });
    },
    onError: (data, error) => console.log(data, error),
  });
  return mutation;
};