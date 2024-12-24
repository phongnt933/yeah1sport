import {
  Button,
  Col,
  Flex,
  Form,
  FormProps,
  Row,
  Select,
  Typography,
} from "antd";
import { RDGetListMatching } from "src/@types/apis/RequestData";
import { getListMatching } from "src/apis/matching";
import usePagination from "src/hooks/usePagination";
import FootballField from "./FootballField";
import useSearchParams from "src/hooks/useSearchParams";
import { FIELD_TYPE } from "src/constants/field";
import { EDistrict } from "src/constants/location";
import { IMatching } from "src/@types/entities/Matching";
import { omitIsNil } from "src/utils/omit";

type FieldType = {
  district?: string;
  type?: string;
};

function FindMatching() {
  const { addParams } = useSearchParams();

  const apiConfig = (query: RDGetListMatching["query"], name?: string) => {
    return getListMatching({
      name,
      query: {
        ...omitIsNil(
          { ...query, record: Number.MAX_SAFE_INTEGER },
          { deep: false }
        ),
      },
    });
  };

  const { data, isLoading, reloadData } = usePagination<
    IMatching,
    RDGetListMatching["query"]
  >([], apiConfig);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const temp = {
      ...values,
    };
    if (values.district === "Tất cả") {
      temp.district = "";
    }

    if (values.type === "Tất cả") {
      temp.type = "";
    }

    addParams(temp);
  };

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Tìm kèo
      </Typography.Title>
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item<FieldType>
              label="Quận/Huyện"
              name="district"
              style={{ marginBottom: 8 }}
            >
              <Select
                placeholder="Chọn vị trí"
                options={Object.values({ ALL: "Tất cả", ...EDistrict }).map(
                  (item) => ({
                    value: item,
                    label: item,
                  })
                )}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item<FieldType>
              label="Môn thể thao"
              name="type"
              style={{ marginBottom: 8 }}
            >
              <Select
                placeholder="Chọn môn thể thao"
                options={Object.values({ ALL: "Tất cả", ...FIELD_TYPE }).map(
                  (item) => ({
                    value: item,
                    label: item,
                  })
                )}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item<FieldType> label="Hành động" style={{ marginBottom: 8 }}>
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Flex gap={16} wrap>
        {data.length > 0 ? (
          <>
            {data.map((item) => (
              <FootballField data={item} reload={reloadData} />
            ))}
          </>
        ) : (
          <Typography.Text>Không tìm thấy</Typography.Text>
        )}
      </Flex>
    </Flex>
  );
}

export default FindMatching;
