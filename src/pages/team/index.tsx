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
import { deleteMyTeam, getMyTeam, updateMyTeam } from "../../apis/team";
import { useAppSelector } from "../../redux";
import UpdateTeamForm from "./UpdateTeamForm";
import { cloneDeep } from "lodash";
import { toast } from "react-toastify";

function TeamPage() {
  const userInfo = useAppSelector((s) => s.auth.storage);
  const [listTeam, setListTeam] = useState<ITeam[]>([]);
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
      dataIndex: "type",
      key: "type",
      render: (type) => type,
    },
    {
      title: "Đội trưởng",
      dataIndex: "captain",
      key: "captain",
      render: (_, { captain }) => captain.name,
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
          {userInfo?.id === data.captain.id ? (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleOpenEditTeam(data)}
              />
              <Button type="primary" danger icon={<DeleteOutlined />}  onClick={async() => {
                 await deleteMyTeam({
                   param: {
                     id: data.id,
                   },
                  
                   successHandler: {
                     callBack() {
                       toast.success("Xoá đội thành công!");
                       handleReload();
                     },
                   },
                 });
              }}/>
            </>
          ) : (
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={async () => {
                await updateMyTeam({
                  param: {
                    id: data.id,
                  },
                  body: {
                    members: data.members
                      .filter((member) => member.email !== userInfo?.email)
                      .map((member) => member.email),
                  },
                  successHandler: {
                    callBack() {
                      toast.success("Đã rời đội thành công!");
                      handleReload();
                    },
                  },
                });
              }}
            />
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
            <Button onClick={handleOpenCreateTeam}>Tạo đội mới</Button>
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
