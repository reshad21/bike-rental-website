import { Button, Space, Table, type TableColumnsType } from "antd";
import { toast } from "sonner";
import {
  useGetAllBookingQuery,
  useReturnBikeMutation,
} from "../../../../redux/features/Rent/rentApi";

type TBikeId = {
  brand: string;
  cc: number;
  model: string;
  name: string;
  pricePerHour: number;
  year: number;
};

type TUserId = {
  name: string;
  email: string;
};

type Bike = {
  _id: string;
  bikeId: TBikeId;
  userId: TUserId;
  isReturned: boolean;
  totalCost: number;
};

type DataType = {
  key: string;
  bikeId: TBikeId;
  userId: TUserId;
  isReturned: boolean;
  totalCost: number;
};

const BikeStatus = () => {
  const {
    data: bookings,
    isLoading,
    // isFetching,
  } = useGetAllBookingQuery(undefined, { pollingInterval: 2000 });

  const [takeReturnBike] = useReturnBikeMutation();

  if (isLoading) return <div>Loading...</div>;
  if (!bookings?.data) return <div>No Booking data available.</div>;

  // Transform the data for the table
  const tableData: DataType[] =
    bookings?.data.map(
      ({ _id, bikeId, isReturned, userId, totalCost }: Bike) => ({
        key: _id,
        name: bikeId.name,
        brand: bikeId.brand,
        pricePerHour: bikeId.pricePerHour,
        isReturned,
        totalCost,
        customerName: userId.name,
        email: userId.email,
      })
    ) || [];

  // Table columns configuration
  const columns: TableColumnsType<DataType> = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Customer email",
      dataIndex: "email",
    },
    {
      title: "Bike Name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Price Per Hour",
      dataIndex: "pricePerHour",
    },
    {
      title: "Actions",
      key: "actions",
      render: (item: DataType) => {
        const handleUpdateReturnStatus = async (
          bookingId: string,
          isReturned: boolean
        ) => {
          const toastId = toast.loading("Returing...");
          try {
            const payLoad = { id: bookingId, data: isReturned };
            const res = await takeReturnBike(payLoad);
            if ("error" in res) {
              toast.error("Toast Error occurred", { id: toastId });
            } else {
              toast.success("Bike rent successfully", { id: toastId });
            }
          } catch (error) {
            toast.error("Something went wrong!", { id: toastId });
          }
        };

        return (
          <Space size="middle">
            <Button
              onClick={() =>
                handleUpdateReturnStatus(item.key, item.isReturned)
              }
              className={item.isReturned ? "bg-slate-300" : "bg-red-300"}
            >
              {item.isReturned ? "Returned" : "Not Returned"}
            </Button>
          </Space>
        );
      },
    },
    {
      title: "TotalCost",
      key: "totalcost",
      render: (item: DataType) => {
        return <span>Total Cost: {item.totalCost}</span>;
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        // loading={isFetching}
        dataSource={tableData}
        pagination={false}
      />
    </>
  );
};

export default BikeStatus;
