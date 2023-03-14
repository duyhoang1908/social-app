interface IImgModal {
  url: string;
  setIsImageModal: Function;
}
const ImgModal = ({ url, setIsImageModal }: IImgModal) => {
  return (
    <div
      className="fixed w-[100vw] h-[100vh] top-0 right-0 bg-[rgba(0,0,0,0.7)] flex z-30"
      onClick={(e) => {
        e.stopPropagation();
        setIsImageModal(false);
      }}
    >
      <div className="w-4/5 h-5/6 m-auto">
        <img
          src={url}
          alt=""
          className="w-full h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ImgModal;
