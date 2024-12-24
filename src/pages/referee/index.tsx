import { Button, Flex, Typography } from "antd";
import { useState } from "react";
import { getListReferee } from "src/apis/matching";
import Container from "src/components/Container";
import AppFooter from "src/components/Layout/Footer";
import AppHeader from "src/components/Layout/Header";
import IMAGES from "src/constants/images";
import usePagination from "src/hooks/usePagination";
import { d3Splitting } from "src/utils/number";
import { omitIsNil } from "src/utils/omit";
import HireForm from "./HireForm";

function RefereePage() {
  const [selectedReferee, setSelectedReferee] = useState<{
    data: any;
    isOpen: boolean;
  }>({
    data: null,
    isOpen: false,
  });
  const apiConfig = (query: any, name?: string) => {
    return getListReferee({
      name,
      query: {
        ...omitIsNil(
          { ...query, record: Number.MAX_SAFE_INTEGER },
          { deep: false }
        ),
      },
    });
  };

  const { data, reloadData } = usePagination<any, any>([], apiConfig);

  const handleOpenHireForm = (record: any) => () => {
    console.log(record);
    setSelectedReferee({ data: record, isOpen: true });
  };

  const handleCloseHireForm = () => {
    setSelectedReferee({ data: null, isOpen: false });
  };

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
            <div>
              <Typography.Title level={3} style={{ margin: 0 }}>
                Thuê trọng tài
              </Typography.Title>
            </div>
            {data.map((item) => (
              <div className="referee-container">
                <img
                  width={250}
                  src={IMAGES.referee}
                  className="rounded-t-xl"
                />
                <div className="p-4">
                  <p className="field-name">{item.name}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="h-9 flex items-center border border-solid border-black-016 px-3 rounded-md">
                      <span className="text-sm font-semibold text-highlight">
                        {d3Splitting(item.price)} VNĐ
                      </span>
                    </div>
                    <Button
                      onClick={handleOpenHireForm(item)}
                      className="h-9 cursor-pointer text-sm font-semibold"
                    >
                      Thuê
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Flex>
          {selectedReferee.data && (
            <HireForm
              data={selectedReferee.data}
              reload={reloadData}
              onClose={handleCloseHireForm}
              open={selectedReferee.isOpen}
            />
          )}
        </Container>
      </Flex>
      <AppFooter />
    </>
  );
}

export default RefereePage;
