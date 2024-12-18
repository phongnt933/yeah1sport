import { useState } from "react";
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  FormProps,
  Image,
  Input,
  Row,
  Typography,
} from "antd";
import IMAGES from "../../constants/images";
import ROUTE from "../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { useStyle } from "../../themes/baseStyle";
import { apiSignIn } from "../../apis/auth";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux";
import { saveUserInfo } from "../../redux/slices/authSlice";
import { CMS_URL } from "../../configs";
import { setLocalForageItem } from "../../utils/localForage";
import LOCAL_FORAGE_KEY from "../../constants/localForageKey";
import { ROLE } from "src/constants/role";

type FieldType = {
  email: string;
  password: string;
};

function LoginPage() {
  const { styles } = useStyle();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.email && values.password) {
      toast.dismiss();
      setIsLoading(true);
      await apiSignIn({
        body: {
          email: values.email,
          password: values.password,
        },
        successHandler: {
          callBack(data) {
            if (
              data.data.role === ROLE.ADMIN ||
              data.data.role === ROLE.FIELD_OWNER ||
              data.data.role === ROLE.REFEREE
            ) {
              window.location.href = `${CMS_URL}#/auth?t=${data.data.accessToken}&id=${data.data.id}`;
            } else {
              toast.success("Đăng nhập thành công!");
              setLocalForageItem(
                LOCAL_FORAGE_KEY.USER_INFO,
                JSON.stringify({
                  accessToken: data.data.accessToken,
                  id: data.data.id,
                  name: data.data.name,
                  email: data.data.email,
                })
              );
              dispatch(saveUserInfo(data.data));
              navigate(ROUTE.HOME);
            }
          },
        },
      });

      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ height: "100vh", width: "100vw" }}>
      <Col
        className="gutter-row"
        span={15}
        style={{
          background: `url(${IMAGES.login_bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <Col
        className="gutter-row"
        span={9}
        style={{ height: "100%", backgroundColor: "#F9FAFB" }}
      >
        <Flex
          vertical
          justify="center"
          align="center"
          style={{ height: "100%" }}
        >
          <Image
            preview={false}
            src={IMAGES.logo_dark}
            alt="House Sport"
            className="!h-16 mb-4"
          />
          <Typography.Title level={2} style={{ marginBottom: 40 }}>
            Đăng nhập
          </Typography.Title>
          <Form
            layout="vertical"
            labelCol={{ offset: 8 }}
            style={{ width: 360 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Địa chỉ Email"
              style={{ marginBottom: 8 }}
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập Email" },
                { type: "email", message: "Định dạng Email không đúng" },
              ]}
            >
              <Input className="app-input" placeholder="Nhập địa chỉ Email" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Mật khẩu"
              name="password"
              style={{ marginBottom: 8 }}
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                className="app-input"
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 8 }}>
              <Flex justify="flex-end" align="center">
                <Link to={ROUTE.FORGOT_PASSWORD}>
                  <Typography className={styles.textCaptionSecondary}>
                    Quên mật khẩu?
                  </Typography>
                </Link>
              </Flex>
            </Form.Item>
            <Form.Item style={{ marginBottom: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                className={styles.linearGradientButton}
                style={{ fontWeight: 600 }}
                loading={isLoading}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <Flex justify="flex-end" gap={6} style={{ marginTop: 20 }}>
            <Typography.Paragraph className={styles.textBodySecondary}>
              Bạn chưa có tài ?
            </Typography.Paragraph>
            <Link to={ROUTE.REGISTER}>
              <Typography className={styles.textLink}>Đăng ký ngay</Typography>
            </Link>
          </Flex>
          <Flex
            justify="flex-end"
            gap={8}
            align="center"
            style={{ marginTop: 40 }}
          >
            <Typography.Paragraph
              className={styles.textCaptionSecondary}
              style={{ marginBottom: 0 }}
            >
              Chính sách bảo mật
            </Typography.Paragraph>
            <Divider type="vertical" />
            <Typography.Paragraph
              className={styles.textCaptionSecondary}
              style={{ marginBottom: 0 }}
            >
              Trợ giúp
            </Typography.Paragraph>
            <Divider type="vertical" />
            <Typography.Paragraph
              className={styles.textCaptionSecondary}
              style={{ marginBottom: 0 }}
            >
              Điều khoản sử dụng
            </Typography.Paragraph>
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
}

export default LoginPage;
