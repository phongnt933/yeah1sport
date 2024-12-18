import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTE from "../../constants/routes";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(ROUTE.HOME)}>
          Quay về trang chủ
        </Button>
      }
    />
  );
}

export default NotFoundPage;
