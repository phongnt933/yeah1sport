import AppHeader from "src/components/Layout/Header";
import AppFooter from "src/components/Layout/Footer";
import Container from "src/components/Container";
import AppTable from "src/components/AppTable";
import { Button, Flex, TableProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { RDGetAllBooking } from "src/@types/apis/RequestData";
import { IBooking } from "src/@types/entities/Booking";
import { getAllBooking } from "src/apis/booking";
import { PAGE_SIZE } from "src/configs";
import usePagination from "src/hooks/usePagination";
import { d3Splitting } from "src/utils/number";
import { omitIsNil } from "src/utils/omit";
import MatchingForm from "./MatchingForm";

function OrderHistoryPage() {
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
        <Flex gap={16}>
          {record.isMatching ? (
            <Button
              type="primary"
              danger
              onClick={handleOpen(record)}
              disabled={record.members.length === record.quantity}
            >
              Huỷ tìm người
            </Button>
          ) : (
            <Button
              type="primary"
              disabled={record.isMatching}
              onClick={handleOpen(record)}
            >
              Tìm người
            </Button>
          )}
        </Flex>
      ),
    },
  ];

  return (
    <>
      <AppHeader />
      <div style={{ padding: "24px", minHeight: "calc(100vh - 442px)" }}>
        <Container>
          <div className="flex flex-col gap-6">
            <h3>Lịch sử đặt sân</h3>
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
          </div>
        </Container>
      </div>
      <AppFooter />
    </>
  );
}

export default OrderHistoryPage;
