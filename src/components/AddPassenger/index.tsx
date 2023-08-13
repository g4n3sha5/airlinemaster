import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import {
  useAddPassengerCacheMutation,
  useAddPassengerMutation,
} from '../../usePassengersQuery/passengers';

export const validate = (values: any): object => {
  const regexName = /^[a-zA-Z]+$/;
  const regexTrips = /^[0-9]+$/;
  const errors: Record<any, string> = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (!regexName.test(values.name)) {
    errors.name = 'Invalid name format';
  }
  if (!regexTrips.test(values.trips)) {
    errors.trips = 'Wrong trips number format';
  }

  return errors;
};

const DataPreparator = (name: string, trips: string | number) => {
  return { name, trips, airline: 5 };
};
export const AddPassenger = () => {
  const queryClient = useQueryClient();

  const postURL = 'https://api.instantwebtools.net/v1/passenger';
  const mutation = useAddPassengerMutation(queryClient);
  const mutationOptimistic = useAddPassengerCacheMutation(queryClient);
  const addPassengerCache = () => {
    let values = formik.values;
    let name = values.name;
    let trips = values.trips;
    let valuez = DataPreparator(name, Number(trips));
    console.log(mutationOptimistic.mutate(valuez))
    mutationOptimistic.mutate(valuez);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      trips: 1,
    },
    validate,
    onSubmit: (values) => {
      let name = values.name;
      let trips = Number(values.trips);
      let valuez = { name, trips, airline: 5 };

      mutation.mutate(valuez);
    },
  });

  return (
    <div className="border-top m-5">
      <h1 className="px-5 py-3">Add a passenger</h1>

      <form onSubmit={formik.handleSubmit} className="d-flex flex-column">
        <label htmlFor="name">Enter passenger name</label>
        <input
          name="name"
          placeholder="enter passenger name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        <label htmlFor="trips"> How many trips did he have?</label>
        <input
          name="trips"
          placeholder=" trips number "
          onChange={formik.handleChange}
          value={formik.values.trips}
        />
        {formik.errors.trips ? <div>{formik.errors.trips}</div> : null}
        <button type="submit" className="btn btn-light m-4">
          Add passenger
        </button>

        <button
          type="button"
          onClick={addPassengerCache}
          className="btn btn-light m-4"
        >
          Add passenger to cache
        </button>
      </form>
    </div>
  );
};
