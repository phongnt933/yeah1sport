import { Button } from "antd";
import { FaUserGroup } from "react-icons/fa6";
import IMAGES from "src/constants/images";
import { d3Splitting } from "src/utils/number";
import { IMatching } from "src/@types/entities/Matching";
import ImageFallback from "src/components/ImageFallback";
import { joinMatching } from "src/apis/matching";
import { toast } from "react-toastify";
import { useState } from "react";

interface FootballFieldProps {
  data: IMatching;
  reload: () => void;
}
function FootballField(props: FootballFieldProps) {
  const { data, reload } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleJoinMatching = async () => {
    await joinMatching({
      param: {
        id: data.id,
      },
      successHandler: {
        callBack() {
          toast.success("Matching thành công!");
          setIsLoading(false);
          reload();
        },
      },
      errorHandler: {
        callBack() {
          toast.error("Matching thất bại!");
          setIsLoading(false);
          reload();
        },
      },
    });
  };

  return (
    <div className="field-container">
      <div className="size-16-9">
        <div className="flex justify-between absolute top-0 left-0 z-30 right-0">
          <div className="flex items-center gap-1 px-4 pr-3 py-1.5 rounded-tl-2xl bg-highlight text-sm text-white-100">
            <span className=" font-semibold">{data.field.type}</span>
          </div>
          <div className="flex items-center gap-1 pr-4 pl-3 py-1.5 rounded-tr-2xl bg-highlight text-sm text-white-100">
            <span className=" font-semibold">{`${data.members.length}/${data.quantity}`}</span>
            <FaUserGroup className="text-xs" />
          </div>
        </div>
        <ImageFallback
          className="field-thumbnail"
          src={IMAGES.bg_item}
          fallbackSrc={IMAGES.default_thumbnail}
        />
        <div className="field-thumbnail-layer" />
      </div>
      <div className="field-content">
        <div>
          <div>
            <p className="field-name">{data.field.name}</p>
            <p className="field-location">
              <span className="font-semibold mr-1">Vị trí:</span>
              <span>
                {data.field.specificAddress}, {data.field.ward},{" "}
                {data.field.district}, {data.field.province}
              </span>
            </p>
          </div>
          {data.equipments.length > 0 && (
            <div className="flex justify-between gap-2 items-center">
              <p className="field-location">
                <span className="font-semibold mr-1">Dụng cụ:</span>
                <span>
                  {data.equipments.map((item) => item.name).join(", ")}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="h-9 flex items-center border border-solid border-black-016 px-3 rounded-md">
            <span className="font-semibold text-highlight">
              {d3Splitting(data.totalAmount)} VNĐ
            </span>
          </div>
          <Button
            onClick={handleJoinMatching}
            loading={isLoading}
            className="h-9 cursor-pointer text-sm font-semibold"
          >
            Tham gia
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FootballField;
