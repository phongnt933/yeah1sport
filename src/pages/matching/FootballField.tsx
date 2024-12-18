import { Button, Flex, Image, Typography } from "antd";
import { FaUserGroup } from "react-icons/fa6";
import { useStyle } from "src/themes/baseStyle";
import IMAGES from "src/constants/images";
import { d3Splitting } from "src/utils/number";
import { IMatching } from "src/@types/entities/Matching";
import { useAppSelector } from "src/redux";

interface FootballFieldProps {
  data: IMatching;
  handleClickItem: (item: IMatching) => void;
}
function FootballField(props: FootballFieldProps) {
  const { data, handleClickItem } = props;
  const { styles } = useStyle();

  const userInfo = useAppSelector((s) => s.auth.storage);

  return (
    <Flex className={styles.borderGradient}>
      <Flex
        vertical
        style={{
          backgroundColor: "#fff",
          padding: "6px 8px",
          zIndex: 1,
          borderRadius: 6,
        }}
        gap={8}
      >
        <Image
          alt="item"
          preview={false}
          src={IMAGES.bg_item}
          style={{ borderRadius: 4, width: 232 }}
        />
        <Flex vertical>
          <Typography.Title
            level={4}
            style={{
              margin: 0,
              fontWeight: 600,
              color: "rgba(2, 106, 167, 1)",
            }}
          >
            {data.fieldInfo.name}
          </Typography.Title>
          <Typography.Text style={{ fontSize: 12, fontWeight: 600 }}>
            Môn thể thao: {data.fieldInfo.sport}
          </Typography.Text>
          <Typography.Text
            style={{ fontSize: 12, color: "rgba(77, 127, 203, 1)" }}
          >
            Vị trí: {data.fieldInfo.location}
          </Typography.Text>
        </Flex>

        <Flex gap={8} justify="space-between">
          <Flex
            style={{
              padding: "3px 6px",
              backgroundColor: "rgba(0, 91, 144, 1)",
              borderRadius: 2,
            }}
          >
            <Typography.Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#fff",
                margin: 0,
                lineHeight: "normal",
              }}
            >
              {`${d3Splitting(data.fieldInfo.price)} VNĐ`}
            </Typography.Text>
          </Flex>
          <Flex style={{}}>
            <Flex
              style={{
                padding: "3px 6px",
                borderRadius: "2px 0 0 2px",

                backgroundColor: "#000",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  margin: 0,
                  lineHeight: "normal",
                }}
              >
                {data.matchedCount}
              </Typography.Text>
            </Flex>
            <Flex
              align="center"
              gap={4}
              style={{
                padding: "3px 6px",
                backgroundColor: "rgba(38, 150, 216, 1)",
                borderRadius: "0 2px 2px 0",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  margin: 0,
                  lineHeight: "normal",
                }}
              >
                {data.max_number}
              </Typography.Text>
              <FaUserGroup style={{ fontSize: 10, color: "#fff" }} />
            </Flex>
          </Flex>
        </Flex>
        <Button
          onClick={() => {
            handleClickItem(data);
          }}
          disabled={data.matchedUser.some(
            (item) => item.userId === userInfo?.id
          )}
          style={{ cursor: "pointer", marginTop: 8 }}
        >
          Tham gia
        </Button>
      </Flex>
    </Flex>
  );
}

export default FootballField;
