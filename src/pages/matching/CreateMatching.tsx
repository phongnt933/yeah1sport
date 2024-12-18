import { Button, Flex, TableProps, Typography } from "antd";
import { getAllBooking } from "../../apis/booking";
import dayjs from "dayjs";
import { d3Splitting } from "../../utils/number";
import { IBooking } from "../../@types/entities/Booking";
import MatchingForm from "./MatchingForm";
import usePagination from "src/hooks/usePagination";
import { PAGE_SIZE } from "src/configs";
import { RDGetAllBooking } from "src/@types/apis/RequestData";
import AppTable from "src/components/AppTable";
import { useState } from "react";
import { omitIsNil } from "src/utils/omit";

function CreateMatching() {
  const [selected, setSelected] = useState<{
    data: IBooking | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });
  const apiConfig = (query: RDGetAllBooking["query"], name?: string) => {
    return getAllBooking({
      name,
      query: {
        ...omitIsNil({ ...query, record: PAGE_SIZE }, { deep: false }),
      },
    });
  };

  const {
    data: tableData,
    currentPage,
    total,
    onPaginationChange,
    isLoading,
    reloadData,
  } = usePagination<IBooking, RDGetAllBooking["query"]>([], apiConfig);

  const handleOpen = (record: IBooking) => () => {
    setSelected({ data: { ...record }, isOpen: true });
  };

  const handleClose = () => {
    setSelected({ data: null, isOpen: false });
  };

  const columns: TableProps<IBooking>["columns"] = [
    {
      title: "Tên sân",
      dataIndex: "fieldDetails",
      key: "name",
      render: (fieldDetails) => fieldDetails.name,
    },
    {
      title: "Môn thể thao",
      dataIndex: "fieldDetails",
      key: "sport",
      render: (fieldDetails) => fieldDetails.type,
    },
    {
      title: "Ngày sử dụng",
      dataIndex: "usedDate",
      key: "usedDate",
      render: (_, record) =>
        `${record.startTime} -> ${record.endTime} ${record.date}`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => `${d3Splitting(totalAmount)} VND`,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          // disabled={record.match}
          onClick={handleOpen(record)}
        >
          Tìm người
        </Button>
      ),
    },
  ];
  return (
    <Flex vertical gap={24}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Danh sách đặt sân
      </Typography.Title>
      <AppTable<IBooking>
        loading={isLoading}
        columns={columns}
        pagination={{
          total,
          pageSize: PAGE_SIZE,
          current: currentPage,
          onChange: onPaginationChange,
        }}
        dataSource={tableData}
      />
      <MatchingForm
        open={selected.isOpen}
        data={selected.data}
        onClose={handleClose}
        reload={reloadData}
      />
    </Flex>
  );
}

export default CreateMatching;
