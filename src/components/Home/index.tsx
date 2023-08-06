import { Navbar } from "../Navbar";
import { PassengerList } from "../PassengerList";
import { AddPassenger } from "../AddPassenger";
import { Immer } from "../Immer";


export const Home = () => {

    return (
      <div className="vw-100 d-flex flex-column align-items-center p-3 bg-primary text-white container-fluid">
          <Navbar />
          <PassengerList/>
          <AddPassenger/>
          <Immer/>
      </div>
    );
  }
