import { useState } from "react";
import { useGetPassengersQuery } from "../../usePassengersQuery/passengers";
import { AirPassenger, AirPassengerType, PassengerObjects } from "../Passenger";



export const PassengerList = () => {
  const [pageNumber, setPageNumber] = useState(5400);
  let BASE_URL = `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=10`;

  let { isLoading, passengersData } = useGetPassengersQuery(BASE_URL, pageNumber);
  let passengers = PassengerObjects(passengersData?.data.data);
  let pages = passengersData?.data.totalPages - 1;




  if (isLoading) {
    return <h1 className="p-5 ">Loading...</h1>;
  } else {
    return (
      <>
        <h1>Welcome to Airline Master</h1>
        <div className="w-100 d-flex justify-content-center flex-wrap">

          {passengers?.map((ele: AirPassengerType) => {
            if (ele) return <AirPassenger  {...ele} />;
          })}

          <div className="d-flex btnStyle  ">
            <button
              onClick={() => setPageNumber(pageNumber - 1)}
              className="btn btn-light mx-3"
            >
              Previous Page
            </button>
            <button
              onClick={() => setPageNumber(pageNumber + 1)}
              className="btn btn-light mx-3"
            >
              Next Page
            </button>
            <button
              onClick={() => setPageNumber(pages)}
              className="btn btn-light mx-3"
            >
              Last Page
            </button>
          </div>
        </div>
      </>
    );
  }
};
