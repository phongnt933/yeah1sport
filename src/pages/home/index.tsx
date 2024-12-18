import Container from "../../components/Container";
import AppLayout from "src/components/Layout";
import IMAGES from "src/constants/images";
import StarFilledIcon from "src/components/Icon/StarFilledIcon";

function HomePage() {
  return (
    <AppLayout>
      <div
        className="h-[500px]"
        style={{
          backgroundImage: `url(${IMAGES.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container className="h-full">
          <div className="text-white-100 flex flex-col items-center justify-center h-full">
            <div className="mb-4">
              <StarFilledIcon className="w-4" />
              <StarFilledIcon className="w-6 text-yellow-300" />
              <StarFilledIcon className="w-4" />
            </div>
            <h3 className="text-5xl font-semibold mb-6">
              HỆ THỐNG HỖ TRỢ TÌM KIẾM SÂN BÃI NHANH
            </h3>
            <div className="h-1 w-10 rounded-md bg-highlight mb-2" />
            <p className="font-medium">
              Dữ liệu được House Sport cập nhật thường xuyên giúp cho người dùng
              tìm được sân một cách nhanh nhất
            </p>
          </div>
        </Container>
      </div>
      <div className="py-12">
        <Container className="flex gap-4 items-center justify-between">
          <div className="max-w-96 flex flex-col items-center gap-5">
            <img width={86} src="/images/image_3.png" />
            <div>
              <p className="text-2xl font-semibold text-center mb-3">
                Tìm kiếm vị trí sân
              </p>
              <p className="text-sm text-center font-medium">
                Dữ liệu sân đấu dồi dào, liên tục cập nhật, giúp bạn dễ dàng tìm
                kiếm theo khu vực mong muốn
              </p>
            </div>
          </div>
          <div className="w-[1px] h-24 bg-black-080" />
          <div className="max-w-96 flex flex-col items-center gap-5">
            <img width={86} src="/images/image_4.png" />
            <div>
              <p className="text-2xl font-semibold text-center mb-3">
                Đặt lịch online
              </p>
              <p className="text-sm text-center font-medium">
                Không cần đến trực tiếp, không cần gọi điện đặt lịch, bạn hoàn
                toàn có thể đặt sân ở bất kì đâu có internet
              </p>
            </div>
          </div>
          <div className="w-[1px] h-24 bg-black-080" />
          <div className="max-w-96 flex flex-col items-center gap-5">
            <img width={86} src="/images/image_5.png" />
            <div>
              <p className="text-2xl font-semibold text-center mb-3">
                Tìm đối, bắt cặp đấu
              </p>
              <p className="text-sm text-center font-medium">
                Tìm kiếm, giao lưu các đội thi đấu thể thao, kết nối, xây dựng
                cộng đồng thể thao sôi nổi, mạnh mẽ
              </p>
            </div>
          </div>
        </Container>
      </div>
      {/* section 1 */}
      {/* <Flex
        justify="center"
        // className={styles.twoBg}
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 0,
            top: 0,
            width: "100%",
            height: "60%",
            background: "#00514A",
          }}
        />
        <div
          style={{
            position: "absolute",
            zIndex: 0,
            bottom: 0,
            width: "100%",
            height: "40%",
            backgroundColor: "#fff",
          }}
        />
        <Container>
          <Flex
            vertical
            gap={16}
            style={{
              marginTop: 35,
              zIndex: 1,
              marginBottom: 35,
              paddingRight: 16,
              paddingLeft: 16,
              position: "relative",
            }}
          >
            <Typography.Title
              level={3}
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: 28,
                color: "#fff",
              }}
            >
              Cap kèo nhanh nào, User ơi !
            </Typography.Title>
            <Typography.Text
              style={{
                margin: 0,
                fontWeight: 400,
                fontSize: 16,
                color: "#fff",
              }}
            >
              Book sân sát giờ, chiến kèo nóng ngay và luôn
            </Typography.Text>
            <Flex style={{ padding: "10px" }}>
              <Flex className={styles.scrollableContent} gap={10}>
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex> */}
      {/* section 2 */}
      {/* <Flex
        justify="center"
        // className={styles.twoBg}
        style={{
          position: "relative",
          zIndex: 1,
          background:
            "linear-gradient(103deg, #2460BC 21.69%, #2A78D0 100.63%)",
        }}
      >
        <Container>
          <Flex
            vertical
            gap={16}
            style={{
              marginTop: 35,
              zIndex: 1,
              marginBottom: 35,
              paddingRight: 16,
              paddingLeft: 16,
              position: "relative",
            }}
          >
            <Typography.Title
              level={3}
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: 28,
                color: "#fff",
              }}
            >
              Địa điểm gần nhà, chốt ngay kẻo muộn
            </Typography.Title>
            <Typography.Text
              style={{
                margin: 0,
                fontWeight: 400,
                fontSize: 16,
                color: "#fff",
              }}
            >
              Book sân sát giờ, chiến kèo nóng ngay và luôn
            </Typography.Text>
            <Flex style={{ padding: "10px" }}>
              <Flex className={styles.scrollableContent} gap={10}>
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex> */}
      {/* section 3 */}
      {/* <Flex
        justify="center"
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "#fff",
        }}
      >
        <Container>
          <Flex
            vertical
            gap={16}
            style={{
              marginTop: 35,
              zIndex: 1,
              marginBottom: 35,
              paddingRight: 16,
              paddingLeft: 16,
              position: "relative",
            }}
          >
            <Typography.Title
              level={3}
              className={styles.textBodyPrimary}
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: 28,
              }}
            >
              Lên kế hoạch nhanh chóng
            </Typography.Title>
            <Typography.Text
              className={styles.textBodySecondary}
              style={{
                margin: 0,
                fontWeight: 400,
                fontSize: 16,
                color: "rgba(72, 70, 73, 1)",
              }}
            >
              Book sân sát giờ, chiến kèo nóng ngay và luôn
            </Typography.Text>
            <Flex style={{ padding: "10px" }}>
              <Flex className={styles.scrollableContent} gap={10}>
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
                <FootballField />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex> */}
    </AppLayout>
  );
}

export default HomePage;
