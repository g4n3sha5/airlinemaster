import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import {
  useDeletePassengerMutation,
  useEditPassengerMutation,
  useGetPassengersQuery,
} from '../../usePassengersQuery/passengers';
import {
  useQueryClient,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import { validate } from '../AddPassenger';

export type AirPassengerType = {
  _id: string;
  name?: string;
  trips: number;
  identificator?: string;
  airlineName?: string;
};

export const AirPassenger = ({
  _id,
  name,
  trips,
  identificator,
  airlineName,
}: AirPassengerType) => {
  const [showStatus, setShowStatus] = useState(false);
  const queryClient = useQueryClient();
  const mutationRemove = useDeletePassengerMutation(queryClient);
  const mutationEdit = useEditPassengerMutation(_id, queryClient);
  const clickable = window.location.pathname == '/';

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    return mutationRemove.mutate(_id);
  };

  const handleEdit = (id: string, e: React.MouseEvent) => {
    // e.preventDefault();
    // return mutationEdit.mutate(_id);z
  };

  const formik = useFormik({
    initialValues: { name: name, trips: trips },
    validate,
    onSubmit: (values) => {
      console.log(values);
      let valuez = {...values, airline: 8}
      mutationEdit.mutate(valuez)
    },
  });


  return (
    <Link key={_id}  to={{ pathname: `passenger/${_id}` }}>
      <div className="p-3 airPassenger">
        <button
          onClick={(event: any) => handleRemove(_id, event)}
          className="btn btn-danger p-3 m-1 d-inline"
        >
          X
        </button>
        <form className="d-inline" onSubmit={formik.handleSubmit}>
          <h1 className="d-inline">
            Passenger {name} #{identificator} with  { trips } trips
          </h1>

          {showStatus && (
            <input
              name="name"
              placeholder="passenger name"
              onClick={(event) => event.preventDefault()}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          )}

          {showStatus && (formik.errors.name ? <div>{formik.errors.name}</div> : null)}



          {showStatus && (
            <input
              name="trips"
              placeholder="passenger trips amount"
              onClick={(event) => event.preventDefault()}
              onChange={formik.handleChange}
              value={formik.values.trips}
            />
          )}
          {showStatus &&
            (formik.errors.trips ? <div>{formik.errors.trips}</div> : null)}

          {showStatus && <button type="submit" onClick={(event) => event.stopPropagation()} className="btn btn-dark m-4">
            Submit
          </button>}

        </form>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowStatus(!showStatus);
          }}
          className="btn btn-light   d-inline m-2"
        >
          EDIT
        </button>
        <br />
        <h2>{airlineName}</h2>
      </div>
    </Link>
  );
};

export const PassengerObjects = (passengers: AirPassengerType[]) => {
  return passengers?.map((passenger) => {
    return {
      _id: passenger._id,
      name: passenger.name,
      trips: passenger.trips,
      identificator: passenger._id?.slice(-10),
    };
  });
};

export const AirPassengerPage = () => {
  const params: any = useParams() as { params: string };
  const queryCache = useQueryClient();
  let id = params.slug;
  let passenger = useGetPassengersQuery(id).passengersData?.data;
  let airlines = passenger?.airline[0].name;

  return (
    <>
      <h1>This is your single passenger full info!</h1>
      <AirPassenger
        _id={id}
        name={passenger?.name}
        trips={passenger?.trips}
        identificator={id}
        airlineName={airlines}
      />
    </>
  );
};
