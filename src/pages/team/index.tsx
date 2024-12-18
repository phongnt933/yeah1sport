import { useEffect, useState } from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Container from "../../components/Container";
import { Button, Flex, Table, TableProps, Typography } from "antd";
import CreateTeamForm from "./CreateTeamForm";
import {
  DeleteOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { ITeam } from "../../@types/entities/Team";
import { getMyTeam } from "../../apis/team";
import { useAppSelector } from "../../redux";
import UpdateTeamForm from "./UpdateTeamForm";
import { cloneDeep } from "lodash";

function TeamPage() {
  const userInfo = useAppSelector((s) => s.auth.storage);
  const [listTeam, setListTeam] = useState<ITeam[]>([]);
  const [isLeader, setIsLeader] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [openCreateTeam, setOpenCreateTeam] = useState<boolean>(false);
  const [openEditTeam, setOpenEditTeam] = useState<ITeam | null>(null);

  async function getList() {
    setLoading(true);
    await getMyTeam({
      successHandler: {
        callBack(data) {
          if (data.data) {
            setListTeam(data.data);
            if (data.data.some((item) => item.captain._id === userInfo?.id)) {
              setIsLeader(false);
            } else {
              setIsLeader(true);
            }
          } else {
            setListTeam([]);
          }
        },
      },
      errorHandler: {
        callBack() {
          setListTeam([]);
        },
      },
    });
    setLoading(false);
  }

  useEffect(() => {
    getList();
  }, []);

  const handleReload = () => {
    getList();
  };

  const handleOpenCreateTeam = () => {
    setOpenCreateTeam(true);
  };

  const handleCloseCreateTeam = () => {
    setOpenCreateTeam(false);
  };

  const handleOpenEditTeam = (item: ITeam) => () => {
    setOpenEditTeam(item);
  };

  const handleCloseEditTeam = () => {
    setOpenEditTeam(null);
  };

  const columns: TableProps<ITeam>["columns"] = [
    {
      title: "Tên đội",
      dataIndex: "name",
      key: "name",
      render: (name) => name,
    },
    {
      title: "Môn thể thao",
      dataIndex: "sport",
      key: "sport",
      render: (sport) => sport,
    },
    {
      title: "Đội trưởng",
      dataIndex: "captain",
      key: "captain",
      render: (_, { captain }) => captain.username,
    },
    {
      title: "Số lượng thành viên",
      dataIndex: "members",
      key: "members",
      render: (_, { members }) => members.length + 1,
    },
    {
      title: "Hành động",
      dataIndex: "members",
      key: "members",
      render: (_, data) => (
        <Flex style={{ gap: 8 }}>
          {userInfo?.id === data.captain._id ? (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleOpenEditTeam(data)}
              />
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </>
          ) : (
            <Button type="primary" danger icon={<LogoutOutlined />} />
          )}
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Flex style={{ padding: "0 24px", minHeight: "calc(100vh - 442px)" }}>
        <Container>
          <Flex
            justify="space-between"
            align="center"
            style={{
              padding: "24px 0",
            }}
          >
            <Typography.Title level={3} style={{ margin: 0 }}>
              Quản lý đội của tôi
            </Typography.Title>
            {isLeader && (
              <Button onClick={handleOpenCreateTeam}>Tạo đội mới</Button>
            )}
          </Flex>
          <Table<ITeam>
            columns={columns}
            dataSource={listTeam}
            loading={loading}
          />
          <CreateTeamForm
            open={openCreateTeam}
            onClose={handleCloseCreateTeam}
            reload={handleReload}
          />
          <UpdateTeamForm
            team={cloneDeep(openEditTeam)}
            onClose={handleCloseEditTeam}
            reload={handleReload}
          />
        </Container>
      </Flex>
      <Footer />
    </>
  );
}

export default TeamPage;
