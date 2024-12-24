import { useState } from "react";
import { Button, Tooltip } from "antd";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import IMAGES from "src/constants/images";
import { IField } from "../../@types/entities/Field";
import { d3Splitting } from "../../utils/number";
import ImageFallback from "src/components/ImageFallback";
import CreateBookingForm from "./CreateBookingForm";

interface FootballFieldProps {
  data: IField;
  dateInfo: {
    date: string;
    startTime: string;
    endTime: string;
  };
}
function FootballField(props: FootballFieldProps) {
  const { data, dateInfo } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenBooking = async () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="field-container">
        <div className="size-16-9">
          <div className="flex justify-between absolute top-0 left-0 z-30 right-0">
            <div className="flex items-center gap-1 px-4 pr-3 py-1.5 rounded-tl-2xl bg-highlight text-sm text-white-100">
              <span className=" font-semibold">{data.type}</span>
            </div>
            <div className="flex items-center gap-1 pr-4 pl-3 py-1.5 rounded-tr-2xl bg-highlight text-sm text-white-100">
              <span className=" font-semibold">{data.capacity}</span>
              <FaUserGroup className="text-xs" />
            </div>
          </div>
          <ImageFallback
            className="field-thumbnail"
            src={data.thumbnail || IMAGES.bg_item}
            fallbackSrc={IMAGES.default_thumbnail}
          />
          <div className="field-thumbnail-layer" />
        </div>
        <div className="field-content">
          <div>
            <div>
              <p className="field-name">{data.name}</p>
              <p className="field-location">
                <span className="font-semibold mr-1">Vị trí:</span>
                <span>
                  {data.specificAddress}, {data.ward}, {data.district},{" "}
                  {data.province}
                </span>
              </p>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <p className="field-location">
                <span className="font-semibold mr-1">Dụng cụ:</span>
                <span>
                  {data.equipments.map((item) => item.name).join(", ")}
                </span>
              </p>
              <Tooltip
                placement="bottom"
                title={
                  <div className="flex flex-col">
                    {data.equipments.map((item) => (
                      <span>
                        {item.name}: {d3Splitting(data.price)}VNĐ
                      </span>
                    ))}
                  </div>
                }
                arrow
              >
                <IoMdInformationCircleOutline />
              </Tooltip>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="h-9 flex items-center border border-solid border-black-016 px-3 rounded-md">
              <span className="font-semibold text-highlight">
                {d3Splitting(data.price)}VNĐ
              </span>
            </div>
            <Button
              onClick={handleOpenBooking}
              className="h-9 cursor-pointer text-sm font-semibold"
            >
              Đặt sân
            </Button>
          </div>
        </div>
      </div>
      <CreateBookingForm
        data={data}
        onClose={handleClose}
        open={isOpen}
        dateInfo={dateInfo}
      />
    </>
  );
}

export default FootballField;
