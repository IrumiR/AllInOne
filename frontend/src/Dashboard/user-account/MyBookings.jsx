import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import ServiceCard from "./../../components/Services/ServiceCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const {
    data: reservations,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/reservations/my-reservations`);

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="flex flex-col md:flex-row gap-5">
          {reservations.map((serviceprovider) => (
            <ServiceCard
              serviceprovider={serviceprovider}
              key={serviceprovider._id}
            />
          ))}
        </div>
      )}

      {!loading && !error && reservations.length === 0 && (
        <h2
          className="mt-5 text-center leading-7 
        text-[20px] font-semibold text-primaryColor"
        >
          You don`t have any bookings yet!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
