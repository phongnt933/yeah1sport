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
import { useState } from "react";
import { RDGetListMatching } from "../../@types/apis/RequestData";
import { getListMatching } from "../../apis/matching";
import { PAGE_SIZE } from "../../configs";
import usePagination from "../../hooks/usePagination";
import FootballField from "./FootballField";
import useSearchParams from "../../hooks/useSearchParams";
import { ESport } from "../../constants/sport";
import { EDistrict } from "../../constants/location";
import { IMatching } from "../../@types/entities/Matching";
import JoinMatchingForm from "./JoinMatchingForm";
import { omitIsNil } from "src/utils/omit";

type FieldType = {
  location?: string;
  sport?: string;
};

function FindMatching() {
  const { addParams } = useSearchParams();
  const [selected, setSelected] = useState<{
    item: IMatching | null;
    open: boolean;
  }>({
    item: null,
    open: false,
  });

  const handleOpen = (record: IMatching) => {
    console.log(record);
    setSelected({ item: { ...record }, open: true });
  };

  const handleClose = () => {
    setSelected({ item: null, open: false });
  };

  const apiConfig = (query: RDGetListMatching["query"], name?: string) => {
    return getListMatching({
      name,
      query: {
        ...omitIsNil({ ...query, record: PAGE_SIZE }, { deep: false }),
      },
    });
  };

  const {
    data,
    // currentPage,
    // total,
    // onPaginationChange,
    isLoading,
    // offset,
    reloadData,
  } = usePagination<IMatching, RDGetListMatching["query"]>([], apiConfig);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const temp = {
      ...values,
    };
    if (values.location === "Tất cả") {
      temp.location = "";
    }

    if (values.sport === "Tất cả") {
      temp.sport = "";
    }

    addParams(temp);
  };

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Tìm đối thủ
      </Typography.Title>
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item<FieldType>
              label="Vị trí"
              name="location"
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
              name="sport"
              style={{ marginBottom: 8 }}
            >
              <Select
                placeholder="Chọn môn thể thao"
                options={Object.values({ ALL: "Tất cả", ...ESport }).map(
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
              <FootballField data={item} handleClickItem={handleOpen} />
            ))}
          </>
        ) : (
          <Typography.Text>Không tìm thấy</Typography.Text>
        )}
      </Flex>
      <JoinMatchingForm
        onClose={handleClose}
        open={selected.open}
        data={selected.item}
        reload={reloadData}
      />
    </Flex>
  );
}

export default FindMatching;
