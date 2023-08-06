import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, {MouseEventHandler, useEffect} from "react";
import { getBySlug, DeletePassenger } from "../../passengersQuery/passengers";
import {useQueryClient, useMutation, UseMutationResult} from "@tanstack/react-query";
import axios from "axios";

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

  const queryCache = useQueryClient();

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const mutation = DeletePassenger(queryCache)
    return mutation.mutate(_id);
  }
  // const deletePassenger  = useMutation((id: string) => {
  //   return axios.delete(`https://api.instantwebtools.net/v1/passenger/${id}`);
  // });


  const clickable = window.location.pathname == "/";
  return (
    <Link key={_id} to={{ pathname: `passenger/${_id}` }}>
      <div className="p-3 airPassenger">
        <button
          onClick={(event: any) => handleClick(_id, event)}
          className="btn btn-dark p-3 m-1 d-inline"
        >
          X
        </button>
        <h1 className="d-inline">
          Passenger {name} <br /> <br /> #{identificator} <br /> with {trips}{" "}
          trips
        </h1>
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
  const queryCache = useQueryClient()
  let id = params.slug;
  let passenger = getBySlug(id).passengersData?.data;
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
