import { Modal } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { d3Splitting } from "src/utils/number";
import { PayPalButtons } from "@paypal/react-paypal-js";
import ROUTE from "src/constants/routes";
import { captureRefereeOrder, createRefereeOrder } from "src/apis/matching";

interface IPayModalProps {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
  data: {
    bookingId: string;
    refereeId: string;
    refereePrice: number;
  };
}

function PayModal(props: IPayModalProps) {
  const { open, onClose, data } = props;
  const navigate = useNavigate();

  const createOrder = async () => {
    const response = await createRefereeOrder({
      body: { bookingId: data.bookingId, refereeId: data.refereeId },
    });

    if (response.resData) {
      return response.resData.data.orderId;
    }
  };

  const onApprove = async (data: any) => {
    await captureRefereeOrder({
      body: {
        orderId: data.orderID,
      },
      successHandler: {
        callBack(data) {
          if (data.data.status === "COMPLETED") {
            toast.success("Thanh toán thành công!");
            onClose();
            navigate(ROUTE.ORDER_HISTORY);
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
            {d3Splitting(data.refereePrice)} VND
          </span>
        </p>

        <div>
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            fundingSource="paypal"
          />
        </div>
      </div>
    </Modal>
  );
}

export default PayModal;
