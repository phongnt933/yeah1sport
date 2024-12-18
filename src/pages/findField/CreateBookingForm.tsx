import { Button, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import { IEquipment, IField } from "src/@types/entities/Field";
import { d3Splitting } from "src/utils/number";
import PayModal from "./PayModal";

interface ICreateBookingProps {
  open: boolean;
  onClose: () => void;
  data: IField;
  dateInfo: {
    date: string;
    startTime: string;
    endTime: string;
  };
}

function CreateBookingForm(props: ICreateBookingProps) {
  const { open, onClose, data, dateInfo } = props;

  const [equipments, setProducts] = useState<
    Array<IEquipment & { quantity: number }>
  >(data.equipments.map((equipment) => ({ ...equipment, quantity: 0 })));

  const [total, setTotal] = useState(0);
  const [purchaseData, setPurchaseData] = useState<{
    fieldId: string;
    fieldPrice: number;
    totalAmount: number;
    startTime: string;
    endTime: string;
    equipments: Array<IEquipment & { quantity: number }>;
  } | null>(null);

  useEffect(() => {
    const newTotal = equipments.reduce(
      (sum, equipment) => sum + equipment.price * equipment.quantity,
      0
    );
    setTotal(newTotal);
  }, [equipments]);

  const handleQuantityChange = (name: string, quantity: number) => {
    setProducts(
      equipments.map((equipment) =>
        equipment.name === name ? { ...equipment, quantity } : equipment
      )
    );
  };

  const handleOpenPurchase = () => {
    setPurchaseData({
      fieldId: data.id,
      fieldPrice: data.price,
      totalAmount: total + data.price,
      ...dateInfo,
      equipments: equipments.filter((item) => item.quantity > 0),
    });
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
        title={<div>Bạn đang đặt sân: {data.name}</div>}
        open={open}
        footer={null}
        destroyOnClose
        closable={false}
        centered
      >
        <div>
          <div className="mb-4">
            <p className="text-sm">
              <span className="font-semibold mr-1">Địa chỉ:</span>
              <span>
                {data.specificAddress}, {data.ward}, {data.district},{" "}
                {data.province}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-semibold mr-1">Thời gian:</span>
              <span>
                Từ {dateInfo.startTime} đến {dateInfo.endTime} ngày{" "}
                {dateInfo.date}
              </span>
            </p>
          </div>
        </div>

        <div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">
                  Tên dụng cụ
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Đơn giá (VND)
                </th>
                <th className="border border-gray-300 p-2 text-left w-[130px]">
                  Số lượng
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Sân</td>
                <td className="border border-gray-300 p-2">
                  {d3Splitting(data.price)}
                </td>
                <td className="border border-gray-300 p-2">
                  <InputNumber
                    type="number"
                    min={0}
                    className="w-full"
                    value={1}
                    disabled
                  />
                </td>
              </tr>
              {equipments.map((equipment) => (
                <tr key={equipment.name}>
                  <td className="border border-gray-300 p-2">
                    {equipment.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {d3Splitting(equipment.price)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <InputNumber
                      type="number"
                      min={0}
                      className="w-full"
                      value={equipment.quantity}
                      onChange={(value) =>
                        handleQuantityChange(equipment.name, value || 0)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td
                  colSpan={2}
                  className="border border-gray-300 p-2 text-right"
                >
                  Tổng:
                </td>
                <td className="border border-gray-300 p-2 w-[]">
                  <span>{d3Splitting(total + data.price)} VND</span>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="flex gap-4 mt-4 justify-end">
            <Button
              className="h-9"
              color="danger"
              variant="filled"
              onClick={onClose}
            >
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

export default CreateBookingForm;
