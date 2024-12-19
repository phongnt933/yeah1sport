import { useState } from "react";
import {
  Button,
  Col,
  Flex,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import { toast } from "react-toastify";
import { createMyTeam } from "../../apis/team";
import InputEmail from "../../components/InputEmail";
import { FIELD_TYPE } from "src/constants/field";

type FieldType = {
  name: string;
  type: string;
  description?: string;
};

interface ICreateTeamFormProps {
  open: boolean;
  onClose: () => void;
  reload: () => void;
}
function CreateTeamForm(props: ICreateTeamFormProps) {
  const { open, onClose, reload } = props;

  const [members, setMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formRecord] = Form.useForm<FieldType>();

  const handleChangeMembers = (values: string[]) => {
    setMembers([...values]);
  };

  const handleCancel = () => {
    onClose();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsLoading(true);
    await createMyTeam({
      body: { ...values, members: [...members] },
      successHandler: {
        callBack() {
          toast.success("Tạo đội thành công!");
          setIsLoading(false);
          onClose();
        },
      },
      errorHandler: {
        callBack() {
          toast.error("Tạo đội thất bại!");
          setIsLoading(false);
        },
      },
    });
    reload();
  };

  return (
    <Modal
      title="Tạo đội của mình"
      open={open}
      footer={null}
      destroyOnClose
      closable={false}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        form={formRecord}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Tên đội"
              style={{ marginBottom: 8 }}
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên đội" }]}
            >
              <Input className="app-input" placeholder="Nhập tên đội của bạn" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Môn thể thao"
              name="type"
              style={{ marginBottom: 8 }}
              rules={[
                { required: true, message: "Vui lòng chọn môn thể thao" },
              ]}
            >
              <Select
                placeholder="Chọn môn thể thao"
                options={Object.values(FIELD_TYPE).map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<FieldType>
              label="Mô tả"
              name="description"
              style={{ marginBottom: 8 }}
            >
              <Input.TextArea rows={4} placeholder="Mô tả về đội của bạn" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<FieldType>
              label="Thành viên"
              style={{ marginBottom: 8 }}
            >
              <InputEmail value={members} onChange={handleChangeMembers} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Flex justify="flex-end" style={{ marginTop: 16, gap: 16 }}>
              <Button type="primary" danger onClick={handleCancel}>
                Huỷ
              </Button>
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Tạo đội
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default CreateTeamForm;
