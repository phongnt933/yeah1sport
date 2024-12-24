import AppHeader from "src/components/Layout/Header";
import { Flex } from "antd";
import Container from "src/components/Container";
import AppFooter from "src/components/Layout/Footer";
import FindMatching from "./FindMatching";

function MatchingPage() {
  return (
    <>
      <AppHeader />
      <Flex style={{ padding: "0 24px", minHeight: "calc(100vh - 442px)" }}>
        <Container>
          <Flex
            gap={16}
            vertical
            style={{
              padding: "24px 0",
              width: "100%",
            }}
          >
            <FindMatching />
          </Flex>
        </Container>
      </Flex>
      <AppFooter />
    </>
  );
}

export default MatchingPage;
