import { CheckCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Spin, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useGetCustomerBookingQuery } from "../../../../redux/features/Rent/rentApi";

type TBike = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  cc: number;
  pricePerHour: number;
};

type TBooking = {
  _id: string;
  bikeId: TBike;
  totalCost: number;
  isReturned: boolean;
  payBill: boolean; // Add payBill property here
};

const MyRentList = () => {
  const {
    data: bikes,
    isLoading,
    error,
  } = useGetCustomerBookingQuery(undefined, {
    pollingInterval: 2000,
  });

  // Handle loading and error states
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin tip="Loading profile data..." />
      </div>
    );
  if (error)
    return (
      <Alert
        message="Error loading profile data"
        type="error"
        showIcon
        className="max-w-lg mx-auto mt-8"
      />
    );
  if (!bikes.data)
    return (
      <Alert
        message="No Bike data available"
        type="error"
        showIcon
        className="max-w-lg mx-auto mt-8"
      />
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-gray-100">
      {bikes?.data?.map((bike: TBooking) => (
        <div
          key={bike._id}
          className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
        >
          <img
            className="w-full h-56 object-cover rounded-t-lg"
            src={bike.bikeId.image}
            alt={bike.bikeId.name}
          />
          <div className="px-6 py-5">
            <h2 className="font-bold text-2xl mb-2 text-gray-800">
              {bike.bikeId.name}
            </h2>
            <p className="text-gray-600 text-base mb-4 leading-relaxed">
              {bike.bikeId.description}
            </p>
            <ul className="text-sm text-gray-600 mb-4 space-y-2">
              <li>
                <strong>Brand:</strong> {bike.bikeId.brand}
              </li>
              <li>
                <strong>Model:</strong> {bike.bikeId.model}
              </li>
              <li>
                <strong>Year:</strong> {bike.bikeId.year}
              </li>
              <li>
                <strong>CC:</strong> {bike.bikeId.cc}
              </li>
              <li>
                <strong>Price per Hour:</strong> BDT {bike.bikeId.pricePerHour}
              </li>
              <li>
                <strong>Total Cost:</strong> BDT {bike.totalCost}
              </li>
            </ul>
            <div className="flex justify-between items-center">
              {bike.isReturned ? (
                bike.payBill ? (
                  <Tooltip title="Payment Completed">
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      disabled
                      className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded"
                    >
                      Payment Done
                    </Button>
                  </Tooltip>
                ) : (
                  <Link to={`/checkout?rentId=${bike._id}`}>
                    <Button
                      type="primary"
                      icon={<DollarCircleOutlined />}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    >
                      Make Payment
                    </Button>
                  </Link>
                )
              ) : (
                <span className="text-green-600 font-semibold">
                  Bike in Use
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRentList;
