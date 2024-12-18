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
import { Link } from "react-router-dom";
import ROUTE from "../../constants/routes";
import { useStyle } from "../../themes/baseStyle";

type FieldType = {
  email?: string;
};

function ForgotPasswordPage() {
  const { styles } = useStyle();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
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
            Quên mật khẩu
          </Typography.Title>
          <Form
            layout="vertical"
            labelCol={{ offset: 8 }}
            style={{ width: 360 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item<FieldType>
              label="Địa chỉ Email"
              name="email"
              style={{ marginBottom: 24 }}
              rules={[
                { required: true, message: "Vui lòng nhập Email" },
                { type: "email", message: "Định dạng Email không đúng" },
              ]}
            >
              <Input className="app-input" placeholder="Nhập địa chỉ Email" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                className={styles.linearGradientButton}
                style={{ fontWeight: 600 }}
              >
                Gửi Email
              </Button>
            </Form.Item>
          </Form>
          <Flex justify="flex-end" gap={8} style={{ marginTop: 20 }}>
            <Link to={ROUTE.LOGIN}>
              <Typography className={styles.textLink}>
                Quay về trang đăng nhập
              </Typography>
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

export default ForgotPasswordPage;
