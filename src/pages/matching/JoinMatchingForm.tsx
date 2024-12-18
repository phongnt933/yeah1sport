import {
  Button,
  Col,
  Flex,
  Form,
  FormProps,
  InputNumber,
  Modal,
  Row,
} from "antd";
import React from "react";
import { toast } from "react-toastify";
import { joinMatching } from "../../apis/matching";
import { IMatching } from "../../@types/entities/Matching";

interface FieldType {
  quantity: number;
}

interface JoinMatchingFormProps {
  data: IMatching | null;
  open: boolean;
  onClose: () => void;
  reload: () => void;
}

function JoinMatchingForm(props: JoinMatchingFormProps) {
  const { open, onClose, data, reload } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (data) {
      setIsLoading(true);
      await joinMatching({
        body: {
          matchingId: data._id,
          quantity: values.quantity,
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
      title="Tham gia matching"
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
              name="quantity"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng tham gia" },
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
            <Flex justify="flex-end" style={{ marginTop: 16, gap: 16 }}>
              <Button type="primary" danger onClick={handleCancel}>
                Huỷ
              </Button>
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Tham gia
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default JoinMatchingForm;
