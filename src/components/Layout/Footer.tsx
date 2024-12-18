import IMAGES from "../../constants/images";
import Container from "../Container";
import FacebookIcon from "../Icon/FacebookIcon";
import TikTokIcon from "../Icon/TikTokIcon";
import YoutubeIcon from "../Icon/YoutubeIcon";
import ZaloIcon from "../Icon/ZaloIcon";

function AppFooter() {
  return (
    <div className="bg-primary-background text-white-100">
      <Container>
        <div className="flex py-12 justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center flex-col gap-2">
              <img className="h-16" src={IMAGES.logo} />
              <p className="text-lg font-bold uppercase mt-1">
                Cung cấp sân chất lượng uy tín
              </p>
            </div>
            <div>
              <p className="mb-3">Theo dõi chúng tôi</p>
              <div className="flex gap-3 items-center">
                <div className="h-11 w-11 bg-white-016 rounded-xl flex justify-center items-center hover:bg-white-032 cursor-pointer">
                  <FacebookIcon className="h-5 cursor-pointer" />
                </div>
                <div className="h-11 w-11 bg-white-016 rounded-xl flex justify-center items-center hover:bg-white-032 cursor-pointer">
                  <TikTokIcon className="h-5 cursor-pointer" />
                </div>
                <div className="h-11 w-11 bg-white-016 rounded-xl flex justify-center items-center hover:bg-white-032 cursor-pointer">
                  <YoutubeIcon className="h-5 cursor-pointer" />
                </div>
                <div className="h-11 w-11 bg-white-016 rounded-xl flex justify-center items-center hover:bg-white-032 cursor-pointer">
                  <ZaloIcon className="h-5 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg uppercase font-semibold">Thông tin liên hệ</p>
            <div className="bg-white-016 h-[1px] w-full" />
            <p className="text-sm font-medium max-w-[350px]">
              Địa chỉ: 23 Đường Số 1C, Bình Hưng, Bình Chánh, Hồ Chí Minh,
              Vietnam
            </p>
            <p className="font-medium text-sm">SĐT: 02343423564</p>
            <p className="font-medium text-sm">Email: abc@gmail.com</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg uppercase font-semibold">Giới thiệu</p>
            <div className="bg-white-016 h-[1px] w-full" />
            <p className="text-sm font-medium w-[360px]">
              Home Sport cung cấp các tiện ích thông minh giúp cho bạn tìm sân
              bãi và đặt sân một cách hiệu quả nhất.
            </p>
            <div className="flex flex-col gap-3 font-medium text-sm">
              <p className="cursor-pointer hover:underline">
                Chính sách bảo mật
              </p>
              <p className="cursor-pointer hover:underline">
                Chính sách huỷ (đổi trả)
              </p>
              <p className="cursor-pointer hover:underline">
                Chính sách kiểm hàng
              </p>
              <p className="cursor-pointer hover:underline">
                Chính sách thanh toán
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white-016 h-[1px] w-full" />
        <div className="flex justify-between items-center py-6 text-white-064 text-xs">
          <div className="flex gap-3">
            <span className="underline font-medium">Điều khoản</span>
            <span className="underline font-medium">Chính sách</span>
            <span className="underline font-medium">Giới thiệu</span>
          </div>
          <p className="font-medium">© 2024 Home Sport. ALL Right Reserved</p>
        </div>
      </Container>
    </div>
  );
}

export default AppFooter;
