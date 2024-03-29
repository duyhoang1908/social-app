import LayoutWithHeader from "../../Layouts/LayoutWithHeader";
import RightBar from "../../Components/Home/RightBar";
import Center from "../../Components/Home/Center";

const Home = () => {
  return (
    <LayoutWithHeader>
      <div className="flex justify-between h-full p-4 gap-5">
        <div className="lg:w-3/4 md:w-2/3 w-full h-full overflow-y-auto">
          <Center />
        </div>
        <div className="flex-1 h-full overflow-y-auto">
          <RightBar />
        </div>
      </div>
    </LayoutWithHeader>
  );
};

export default Home;
