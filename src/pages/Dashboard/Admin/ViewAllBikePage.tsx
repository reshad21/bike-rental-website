import {
  Button,
  Space,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../redux/features/Bike/bikeApi";

interface Bike {
  _id: string;
  brand: string;
  cc: number;
  model: string;
  name: string;
  pricePerHour: number;
  year: number;
}

interface DataType {
  key: string;
  name: string;
  cc: number;
  model: string;
  brand: string;
  pricePerHour: number;
  year: number;
}

const ViewAllBikePage = () => {
  const { data: bikes } = useGetAllProductsQuery(undefined);

  const tabelData: DataType[] =
    bikes?.data.map(
      ({ _id, brand, cc, model, name, pricePerHour, year }: Bike) => ({
        key: _id,
        brand,
        cc,
        model,
        name,
        pricePerHour,
        year,
      })
    ) || [];

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "cc",
      dataIndex: "cc",
    },
    {
      title: "model",
      dataIndex: "model",
    },
    {
      title: "brand",
      dataIndex: "brand",
    },
    {
      title: "pricePerHour",
      dataIndex: "pricePerHour",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
    },
    {
      title: "Actions",
      key: "actions",
      render: (item) => {
        console.log(item);
        return (
          <Space size="middle">
            <Link to={`/admin/bike-details/${item.key}`}>
              <Button>View</Button>
            </Link>
            <Button>Update</Button>
            <Button>Delete</Button>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log("params", filters, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={tabelData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default ViewAllBikePage;
