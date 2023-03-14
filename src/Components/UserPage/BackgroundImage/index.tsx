import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSelector } from "../../../store/User";
import { updateBackgroundImage } from "../../../utils/connectFirebase";
import ImgModal from "../../Home/Center/ImgModal";

interface IProps {
  url: string;
  id: string | undefined;
  uid: string | undefined;
  setIsUpdate: Function;
}

const BackgroundImage = ({ url, id, uid, setIsUpdate }: IProps) => {
  const { userInfo } = useSelector(userSelector);
  const [fileImage, setFileImage] = useState(null);
  const [imgPreview, setImgPreview] = useState<any>(null);
  const [isImageModal, setIsImageModal] = useState(false);

  useEffect(() => {
    return () => {
      fileImage && URL.revokeObjectURL(fileImage);
    };
  }, [fileImage]);

  const handleSetImg = (e: any) => {
    const file = e.target.files[0];
    setFileImage(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const resetImg = () => {
    setFileImage(null);
    setImgPreview(null);
  };

  const updateNewBackgroundImage = async () => {
    try {
      await updateBackgroundImage(fileImage, id as string);
      resetImg();
      setIsUpdate(null);
      toast("Hình nền của bạn đang được thay đổi");
    } catch (error) {}
  };

  return (
    <div className="w-full h-[350px] bg-[#e3e3e3] rounded-2xl overflow-hidden relative">
      {imgPreview && (
        <div>
          {" "}
          <img src={imgPreview} alt="preview" className="w-full object-cover" />
          <div className="absolute z-10 bottom-5 right-5 flex items-center gap-5">
            <button
              onClick={updateNewBackgroundImage}
              className=" bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white font-semibold px-4 py-2 rounded-2xl"
            >
              Lưu
            </button>
            <button
              onClick={resetImg}
              className=" bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white font-semibold px-4 py-2 rounded-2xl"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
      {userInfo.uid === uid && !imgPreview && !url && (
        <div className="flex w-full h-full">
          <label
            htmlFor="bg-img"
            className="m-auto text-2xl font-semibold text-[#65676B] hover:cursor-pointer"
          >
            Thêm ảnh nền.
          </label>{" "}
          <input
            type="file"
            name="bg-img"
            id="bg-img"
            className="hidden"
            onChange={handleSetImg}
          />
        </div>
      )}

      {url && (
        <div className="relative group w-full h-full">
          <img
            src={url}
            alt=""
            className="w-full object-cover hover:cursor-pointer"
          />
          <div className="absolute invisible group-hover:visible top-0 right-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex">
            <div className="m-auto flex items-center gap-5">
              <button
                onClick={() => setIsImageModal(true)}
                className="py-2 px-4 bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white font-semibold rounded-2xl"
              >
                Xem ảnh nền
              </button>
              {userInfo.uid === uid && (
                <label
                  htmlFor="bgImg"
                  className="py-2 px-4 bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white font-semibold rounded-2xl"
                >
                  Thay đổi ảnh nền
                </label>
              )}
              <input
                className="hidden"
                type="file"
                id="bgImg"
                onChange={handleSetImg}
              />
            </div>
          </div>
          {isImageModal && (
            <ImgModal url={url} setIsImageModal={setIsImageModal} key="" />
          )}
        </div>
      )}
    </div>
  );
};

export default BackgroundImage;
