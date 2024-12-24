import { Button, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IBooking } from "src/@types/entities/Booking";
import { getAllBooking } from "src/apis/booking";
import { d3Splitting } from "src/utils/number";
import PayModal from "./PayModal";

interface HireFormProps {
  open: boolean;
  data: any;
  onClose: () => void;
  reload: () => void;
}

function HireForm(props: HireFormProps) {
  const { open, onClose, data, reload } = props;

  const [listBooking, setListBooking] = useState<IBooking[]>([]);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const [purchaseData, setPurchaseData] = useState<{
    bookingId: string;
    refereeId: string;
    refereePrice: number;
  } | null>(null);

  useEffect(() => {
    const getBookingData = async () => {
      if (data) {
        await getAllBooking({
          query: {
            page: 1,
            record: Number.MAX_SAFE_INTEGER,
          },

          successHandler: {
            callBack(data) {
              setListBooking(
                data.data.filter(
                  (item) =>
                    !item.refereeId &&
                    dayjs(item.date).isAfter(dayjs().startOf("day"))
                )
              );
            },
          },
        });
      }
    };
    getBookingData();
  }, [data]);

  const handleOpenPurchase = () => {
    if (bookingId) {
      setPurchaseData({
        bookingId,
        refereeId: data.id,
        refereePrice: data.price,
      });
    }
  };

  const handleClosePurchase = () => {
    setPurchaseData(null);
  };

  const handlePaypalSuccess = () => {
    setPurchaseData(null);
    onClose();
  };

  return (
    <>
      <Modal
        title="Thuê trọng tài"
        open={open}
        footer={null}
        destroyOnClose
        centered
        closable={false}
      >
        <div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">
                  Tên trọng tài
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Đơn giá (VND)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">{data.name}</td>
                <td className="border border-gray-300 p-2">
                  {d3Splitting(data.price)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td className="border border-gray-300 p-2 text-right">Tổng:</td>
                <td className="border border-gray-300 p-2">
                  <span>{d3Splitting(data.price)} VND</span>
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="w-full mt-3">
            <p className="mb-2">Chọn sân đã được đặt</p>

            <Select
              className="w-full"
              onChange={(value) => {
                setBookingId(value);
              }}
            >
              {listBooking.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.fieldDetails.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="flex  gap-3 mt-4 justify-end">
            <Button className="h-9" danger type="primary" onClick={onClose}>
              Huỷ
            </Button>
            <Button className="h-9" onClick={handleOpenPurchase}>
              Thanh toán
            </Button>
          </div>
        </div>
      </Modal>
      {purchaseData && (
        <PayModal
          open={!!purchaseData}
          data={purchaseData}
          onClose={handleClosePurchase}
          onSuccess={handlePaypalSuccess}
        />
      )}
    </>
  );
}

export default HireForm;
