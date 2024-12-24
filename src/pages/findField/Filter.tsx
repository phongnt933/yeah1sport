import { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  InputNumber,
  Row,
  Select,
} from "antd";
import { ETimeFrame } from "src/constants/timeFrame";
import { findField } from "src/apis/field";
import dayjs from "dayjs";
import { IField } from "src/@types/entities/Field";
import FootballField from "./FootballField";
import { FIELD_TYPE } from "src/constants/field";
import axios from "axios";
import { omit } from "lodash";

function getNextTimeFrame(): {
  timeFrame: string;
  date: string;
} {
  const timeFrames = Object.values(ETimeFrame); // Mảng khung giờ
  const dateToday = dayjs().format("YYYY-MM-DD");
  const currentHour = dayjs().hour();

  if (currentHour >= 20) {
    return {
      timeFrame: timeFrames[0],
      date: dayjs().add(1, "day").format("YYYY-MM-DD"),
    };
  }

  const matchingIndex = timeFrames.findIndex((timeFrame) => {
    const [startTime, endTime] = timeFrame.split(" - ");
    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);

    return currentHour >= startHour && currentHour < endHour;
  });

  const nextTimeFrame =
    matchingIndex !== -1 && matchingIndex < timeFrames.length - 1
      ? timeFrames[matchingIndex + 1]
      : timeFrames[0];

  return { timeFrame: nextTimeFrame, date: dateToday };
}

const PROVINCE_API = "https://provinces.open-api.vn/api/p/";
const DISTRICT_API = "https://provinces.open-api.vn/api/p/";
const WARD_API = "https://provinces.open-api.vn/api/d/";

type Province = {
  code: string;
  name: string;
};

type District = {
  code: string;
  name: string;
};

type Ward = {
  code: string;
  name: string;
};

interface FieldType {
  date: string;
  timeFrame: string;
  type?: FIELD_TYPE;
  ward?: string;
  district?: string;
  province?: string;
  capacity?: number;
}

function Filter() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listField, setListField] = useState<IField[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [dateInfo, setDateInfo] = useState<{
    date: string;
    startTime: string;
    endTime: string;
  }>({
    date: "",
    startTime: "",
    endTime: "",
  });

  const [form] = Form.useForm<FieldType>();

  const loadProvinces = async () => {
    try {
      const response = await axios.get(PROVINCE_API);
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const loadDistricts = async (provinceCode: string) => {
    try {
      const response = await axios.get(
        `${DISTRICT_API}${provinceCode}?depth=2`
      );
      setDistricts(response.data.districts);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const loadWards = async (districtCode: string) => {
    try {
      const response = await axios.get(`${WARD_API}${districtCode}?depth=2`);
      setWards(response.data.wards);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handleGetListField = async (dataForm: any) => {
    setIsLoading(true);
    await findField({
      query: { ...dataForm },
      successHandler: {
        callBack(data) {
          setListField(data.data);
          setDateInfo({
            date: dataForm.date,
            startTime: dataForm.startTime,
            endTime: dataForm.endTime,
          });
        },
      },
      errorHandler: {
        callBack() {
          setListField([]);
        },
      },
    });
    setIsLoading(false);
  };

  useEffect(() => {
    loadProvinces();
    const { date, timeFrame } = getNextTimeFrame();
    const [startTime, endTime] = timeFrame.split(" - ");

    form.setFieldValue("date", dayjs(date, "YYYY-MM-DD"));
    form.setFieldValue("timeFrame", timeFrame);

    handleGetListField({
      date: date,
      startTime,
      endTime,
    });
  }, []);

  const handleProvinceChange = (_value: string, option: any) => {
    form.setFieldValue("district", undefined);
    form.setFieldValue("ward", undefined);
    setWards([]);
    loadDistricts(option.key);
  };

  const handleDistrictChange = (_value: string, option: any) => {
    form.setFieldValue("ward", undefined);
    loadWards(option.key);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const [startTime, endTime] = values.timeFrame.split(" - ");

    const dataForm = omit({
      date: dayjs(values.date).format("YYYY-MM-DD"),
      startTime,
      endTime,
      province: values.province,
      district: values.district,
      ward: values.ward,
      type: values.type,
      capacity: values.capacity,
      record: Number.MAX_SAFE_INTEGER,
      page: 1,
    });

    await handleGetListField(dataForm);

    // await findField({
    //   query: { ...dataForm },
    //   successHandler: {
    //     callBack(data) {
    //       setListField(data.data);
    //       setDateInfo({
    //         date: dataForm.date,
    //         startTime: dataForm.startTime,
    //         endTime: dataForm.endTime,
    //       });
    //     },
    //   },
    //   errorHandler: {
    //     callBack() {
    //       setListField([]);
    //     },
    //   },
    // });
  };
  return (
    <div className="flex gap-8 items-start">
      <div
        className="p-5 w-[250px] rounded-2xl"
        style={{ boxShadow: "0px 8px 96px 0px rgba(0, 0, 0, 0.12)" }}
      >
        <p className="text-xl font-semibold mb-6">Bộ lọc</p>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item<FieldType>
                label="Ngày"
                style={{ marginBottom: 8 }}
                name="date"
                rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="Chọn ngày"
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<FieldType>
                label="Khung giờ"
                name="timeFrame"
                style={{ marginBottom: 8 }}
                rules={[{ required: true, message: "Vui lòng chọn khung giờ" }]}
              >
                <Select
                  placeholder="Chọn khung giờ"
                  options={Object.values(ETimeFrame).map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<FieldType>
                label="Môn thể thao"
                name="type"
                style={{ marginBottom: 8 }}
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
                label="Tỉnh/Thành phố"
                name="province"
                style={{ marginBottom: 8 }}
              >
                <Select
                  onChange={handleProvinceChange}
                  placeholder="Chọn tỉnh/thành phố"
                >
                  {provinces.map((province) => (
                    <Select.Option key={province.code} value={province.name}>
                      {province.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<FieldType>
                label="Quận/Huyện"
                name="district"
                style={{ marginBottom: 8 }}
              >
                <Select
                  onChange={handleDistrictChange}
                  placeholder="Chọn quận/huyện"
                >
                  {districts.map((district) => (
                    <Select.Option key={district.code} value={district.name}>
                      {district.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<FieldType>
                label="Xã/Phường"
                name="ward"
                style={{ marginBottom: 8 }}
              >
                <Select placeholder="Chọn xã/phường">
                  {wards.map((ward) => (
                    <Select.Option key={ward.code} value={ward.name}>
                      {ward.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<FieldType>
                label="Sức chứa"
                name="capacity"
                style={{ marginBottom: 8 }}
              >
                <InputNumber className="w-full" />
              </Form.Item>
            </Col>
            <Col span={24} className="flex justify-end mt-2 gap-1">
              <Button
                htmlType="button"
                type="default"
                color="danger"
                onClick={() => {
                  setListField([]);
                  setProvinces([]);
                  setDistricts([]);
                  setWards([]);
                  setDateInfo({ date: "", endTime: "", startTime: "" });
                  form.resetFields();
                }}
              >
                Xoá bộ lọc
              </Button>
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      {listField.length > 0 ? (
        <div className="flex-1">
          <div className="flex gap-6 flex-wrap max-w-[1024px]">
            {listField.map((item) => (
              <FootballField data={item} dateInfo={dateInfo} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2 justify-center items-center self-center">
          <svg
            width="184"
            height="152"
            viewBox="0 0 184 152"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>No data</title>
            <g fill="none" fillRule="evenodd">
              <g transform="translate(24 31.67)">
                <ellipse
                  fillOpacity=".8"
                  fill="#F5F5F7"
                  cx="67.797"
                  cy="106.89"
                  rx="67.797"
                  ry="12.668"
                ></ellipse>
                <path
                  d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                  fill="#AEB8C2"
                ></path>
                <path
                  d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                  fill="url(#linearGradient-1)"
                  transform="translate(13.56)"
                ></path>
                <path
                  d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                  fill="#F5F5F7"
                ></path>
                <path
                  d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                  fill="#DCE0E6"
                ></path>
              </g>
              <path
                d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                fill="#DCE0E6"
              ></path>
              <g transform="translate(149.65 15.383)" fill="#FFF">
                <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse>
                <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path>
              </g>
            </g>
          </svg>
          <p>Không tìm thấy sân</p>
        </div>
      )}
    </div>
  );
}

export default Filter;
