import { Modal } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { captureBooking, createBooking } from "src/apis/booking";
import { IEquipment } from "src/@types/entities/Field";
import { d3Splitting } from "src/utils/number";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { cloneDeep } from "lodash";
import ROUTE from "src/constants/routes";

interface IPayModalProps {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
  data: {
    fieldId: string;
    fieldPrice: number;
    totalAmount: number;
    startTime: string;
    endTime: string;
    equipments: Array<IEquipment & { quantity: number }>;
  };
}

function PayModal(props: IPayModalProps) {
  const { open, onClose, data } = props;
  const navigate = useNavigate();

  const createOrder = async () => {
    const response = await createBooking({
      body: cloneDeep(data),
    });

    if (response.resData) {
      return response.resData.data.orderId;
    }
  };

  const onApprove = async (data: any) => {
    await captureBooking({
      body: {
        orderId: data.orderID,
      },
      successHandler: {
        callBack(data) {
          if (data.data.status === "COMPLETED") {
            toast.success("Thanh toán thành công!");
            onClose();
            navigate(ROUTE.MATCHING);
          }
        },
      },
    });
  };

  return (
    <Modal
      title="Xác nhận thanh toán"
      open={open}
      footer={null}
      destroyOnClose
      centered
      onCancel={onClose}
    >
      <div>
        <p className="text-base mb-4">
          Tổng tiền cần phải thanh toán:{" "}
          <span className="font-semibold">
            {d3Splitting(data.totalAmount)} VND
          </span>
        </p>

        <div>
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </div>
      </div>
    </Modal>
  );
}

export default PayModal;
