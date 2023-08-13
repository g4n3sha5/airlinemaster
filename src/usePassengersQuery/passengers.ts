import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { produce } from 'immer';

export const useGetPassengersQuery = (slug: string, pageNumber?: number) => {
  // const url = `https://api.instantwebtools.net/v1/passenger/${slug}`;
  const { isLoading, data: passengersData } = useQuery({
    queryKey: ['passengers', pageNumber],
    queryFn: async () => await axios.get(slug),
    keepPreviousData: true,
  });

  return { isLoading, passengersData };
};

export const useAddPassengerMutation = (queryClient: any) => {
  const mutation = useMutation({
    mutationFn: async (object: object) =>
      await axios.post('https://api.instantwebtools.net/v1/passenger', object),
    onSuccess: (data) => {
      alert('success');
      return queryClient.invalidateQueries({ queryKey: ['passengers'] });
    },
    onError: (data, error) => console.log(data, error),
  });
  return mutation;
};

export const useDeletePassengerMutation = (queryClient: any) => {
  const mutation = useMutation({
    mutationFn: async (id: string) =>
      await axios.delete(`https://api.instantwebtools.net/v1/passenger/${id}`),
    onSuccess: (data) => {
      alert('success');
      return queryClient.invalidateQueries({ queryKey: ['passengers'] });
    },
    onError: (data, error) => console.log(data, error),
  });
  return mutation;
};

export const useEditPassengerMutation = (id: string, queryClient: any) => {
  const mutation = useMutation({
    mutationFn: async (object: object) =>
      await axios.put(
        `https://api.instantwebtools.net/v1/passenger/${id}`,
        object
      ),
    onSuccess: (data) => {
      alert('success');
      return queryClient.invalidateQueries({ queryKey: ['passengers'] });
    },
    onError: (data, error) => console.log(data, error),
  });
  return mutation;
};

export const useAddPassengerCacheMutation = (queryClient: any) => {
  const mutation = useMutation({
    mutationFn: (object: object) =>
      axios.post('https://api.instantwebtools.net/v1/passenger', object),
    onMutate: async (newPassenger) => {
      await queryClient.cancelQueries({ queryKey: ['passengers'] });

      const snapshot = queryClient.getQueryData(['passengers']);
      queryClient.setQueryData(['passengers'], (oldState: any) => {
        const newOld = produce((oldState, draftState: any) => {
          draftState.push(newPassenger);
        });

        return { newOld };
      });
      return { snapshot };
    },
    onError: (err, context) => {
      console.log(err);
      // queryClient.setQueryData()
    },
    onSuccess: (data) => {
      alert('succes');
      queryClient.invalidateQueries(['passengers']);
    },
  });
  return mutation;
};
