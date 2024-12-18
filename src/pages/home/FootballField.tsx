import { Flex, Image, Typography } from "antd";
import { useStyle } from "../../themes/baseStyle";
import { FaUserGroup } from "react-icons/fa6";
import IMAGES from "../../constants/images";

function FootballField() {
  const { styles } = useStyle();
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
        <div className=""></div>
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
            Sân bóng HCM
          </Typography.Title>
          <Typography.Text style={{ fontSize: 12, fontWeight: 600 }}>
            Thời gian: 16h30 - 17h30
          </Typography.Text>
          <Typography.Text
            style={{ fontSize: 12, color: "rgba(77, 127, 203, 1)" }}
          >
            Bình Hưng, Bình Chánh, Tp HCM
          </Typography.Text>
        </Flex>
        <Flex justify="space-between">
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
              8.39
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
                6
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
                8
              </Typography.Text>
              <FaUserGroup style={{ fontSize: 10, color: "#fff" }} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default FootballField;
