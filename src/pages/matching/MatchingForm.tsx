// import { useState } from "react";
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
// import { createMatching } from "../../apis/matching";
import { IBooking } from "../../@types/entities/Booking";
// import { toast } from "react-toastify";

interface FieldType {
  message?: string;
  max_number: number;
}

interface MatchingFormProps {
  open: boolean;
  data: IBooking | null;
  onClose: () => void;
  reload: () => void;
}

function MatchingForm(props: MatchingFormProps) {
  const { data, onClose, open, reload } = props;
  // const [isLoading, setIsLoading] = useState<boolean>();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (data) {
      console.log(values);
      // setIsLoading(true);
      // const result = await createMatching({
      //   body: {
      //     date: data.date,
      //     endTime: data.endTime,
      //     fieldId: data.field,
      //     max_number: values.max_number,
      //     message: values.message,
      //     startTime: data.startTime,
      //     sport: data.sport,
      //     totalPrice: data.totalPrice,
      //   },
      //   successHandler: {
      //     callBack(data) {
      //       toast.success("Matching thành công!");
      //       setIsLoading(false);
      //       onClose();
      //     },
      //   },
      //   errorHandler: {
      //     callBack(error) {
      //       toast.error("Matching thất bại!");
      //       setIsLoading(false);
      //     },
      //   },
      // });
      reload();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Tạo matching"
      open={open}
      footer={null}
      destroyOnClose
      closable={false}
    >
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<FieldType>
              label="Số lượng"
              style={{ marginBottom: 8 }}
              name="max_number"
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
              {/* <Button htmlType="submit" type="primary" loading={isLoading}>
                Đẩy matching
              </Button> */}
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default MatchingForm;
