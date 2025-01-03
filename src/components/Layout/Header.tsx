import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "src/redux";
import IMAGES from "src/constants/images";
import ROUTE from "src/constants/routes";
import { clearData } from "src/redux/slices/authSlice";
import Container from "../Container";
import "./style.css";

function AppHeader() {
  const userInfo = useAppSelector((s) => s.auth.storage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-primary-background text-base font-semibold text-white-100 sticky">
      <Container>
        <div className="flex justify-between items-center py-4 h-20">
          <img
            onClick={() => {
              navigate(ROUTE.HOME);
            }}
            className="h-10 cursor-pointer m-10"
            src={IMAGES.logo}
          />
          <div className="flex gap-8 items-center">
            <NavLink className="menu-item" to={ROUTE.HOME}>
              Trang chủ
            </NavLink>
            <NavLink className="menu-item" to={ROUTE.MATCHING}>
              Tìm kèo
            </NavLink>
            <NavLink className="menu-item" to={ROUTE.FIND_FIELD}>
              Tìm sân
            </NavLink>
            <NavLink className="menu-item" to={ROUTE.MY_TEAM}>
              Tạo đội bóng
            </NavLink>
            <NavLink className="menu-item" to={ROUTE.ORDER_HISTORY}>
              Lịch sử đặt sân
            </NavLink>
            <NavLink className="menu-item" to={ROUTE.REFEREE}>
              Thuê trọng tài/huấn luyện viên
            </NavLink>
          </div>
          {userInfo ? (
            <div className="flex items-center gap-3">
              <Avatar size={40} icon={<UserOutlined />} />
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "1",
                      label: (
                        <p className="text-sm font-medium">
                          Chỉnh sửa thông tin
                        </p>
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <p className="text-sm font-medium">Lịch sử đấu kèo</p>
                      ),
                    },
                    {
                      key: "3",
                      label: <p className="text-sm font-medium">Đăng xuất</p>,
                      onClick: () => {
                        dispatch(clearData());
                        navigate(ROUTE.LOGIN);
                      },
                    },
                  ],
                }}
              >
                <div className="flex flex-col">
                  <p className="font-semibold">{userInfo.name}</p>
                  <p className="text-xs font-medium">Hội trưởng</p>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <span
                className="hover:text-highlight cursor-pointer leading-none"
                onClick={() => {
                  navigate(ROUTE.LOGIN);
                }}
              >
                Đăng nhập
              </span>
              <div className="w-[1px] h-4 bg-white-064" />
              <span
                className="hover:text-highlight cursor-pointer leading-none"
                onClick={() => {
                  navigate(ROUTE.REGISTER);
                }}
              >
                Đăng ký
              </span>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AppHeader;
