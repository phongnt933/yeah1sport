import { useState } from "react";
import {
  Button,
  Col,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  Modal,
  Row,
} from "antd";
import { IBooking } from "src/@types/entities/Booking";
import { createMatching } from "src/apis/matching";
import { toast } from "react-toastify";

interface FieldType {
  message?: string;
  quantity: number;
}

interface MatchingFormProps {
  open: boolean;
  data: IBooking | null;
  onClose: () => void;
  reload: () => void;
}

function MatchingForm(props: MatchingFormProps) {
  const { data, onClose, open, reload } = props;
  const [isLoading, setIsLoading] = useState<boolean>();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (data) {
      console.log(values);
      setIsLoading(true);
      await createMatching({
        body: {
          bookingId: data.id,
          quantity: values.quantity,
          message: values.message || "",
        },
        successHandler: {
          callBack() {
            toast.success("Matching thành công!");
            setIsLoading(false);
            onClose();
          },
        },
        errorHandler: {
          callBack() {
            toast.error("Matching thất bại!");
            setIsLoading(false);
          },
        },
      });
      reload();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Cáp kéo - tìm đối thủ"
      open={open}
      footer={null}
      destroyOnClose
      centered
      closable={false}
    >
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<FieldType>
              label="Số lượng"
              style={{ marginBottom: 8 }}
              name="quantity"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng cần tuyển" },
              ]}
            >
              <InputNumber
                className="app-input"
                style={{ width: "100%" }}
                placeholder="Nhập số lượng cần tuyển"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<FieldType>
              label="Tin nhắn"
              name="message"
              style={{ marginBottom: 8 }}
            >
              <Input.TextArea placeholder="Nhập tin nhắn" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Flex justify="flex-end" style={{ marginTop: 16, gap: 16 }}>
              <Button type="primary" danger onClick={handleCancel}>
                Huỷ
              </Button>
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Tìm người
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default MatchingForm;
