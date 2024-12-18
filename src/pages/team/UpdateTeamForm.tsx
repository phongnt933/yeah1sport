import { useEffect, useState } from "react";
import { ITeam } from "../../@types/entities/Team";
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
import { ESport } from "../../constants/sport";
import InputEmail from "../../components/InputEmail";
import { updateMyTeam } from "../../apis/team";
import { toast } from "react-toastify";

type FieldType = {
  name: string;
  sport: string;
  description?: string;
};

interface UpdateTeamFormProps {
  onClose: () => void;
  team: ITeam | null;
  reload: () => void;
}

function UpdateTeamForm(props: UpdateTeamFormProps) {
  const { onClose, team, reload } = props;
  console.log(team);
  const [members, setMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formRecord] = Form.useForm<FieldType>();

  useEffect(() => {
    if (team) {
      formRecord.setFieldsValue({
        description: team.description,
        name: team.name,
        sport: team.sport,
      });
    }
    setMembers(team ? team.members.map((member) => member.email) : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  const handleChangeMembers = (values: string[]) => {
    console.log(values);
    setMembers([...values]);
  };

  const handleCancel = () => {
    onClose();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsLoading(true);
    await updateMyTeam({
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
      title={`Cập nhật thông tin: ${props.team?.name}`}
      open={!!team}
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
              <Input
                className="app-input"
                defaultValue={team?.name || ""}
                placeholder="Nhập tên đội của bạn"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Môn thể thao"
              name="sport"
              style={{ marginBottom: 8 }}
              rules={[
                { required: true, message: "Vui lòng chọn môn thể thao" },
              ]}
            >
              <Select
                defaultValue={team?.sport || ""}
                placeholder="Chọn môn thể thao"
                options={Object.values(ESport).map((item) => ({
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
              <Input.TextArea
                defaultValue={team?.description || ""}
                rows={4}
                placeholder="Mô tả về đội của bạn"
              />
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
                Cập nhật
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default UpdateTeamForm;
