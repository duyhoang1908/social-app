import LayoutWithHeader from "../../Layouts/LayoutWithHeader";

import LeftBar from "../../Components/Home/Leftbar";
import RightBar from "../../Components/Home/RightBar";
import Center from "../../Components/Home/Center";

const Home = () => {
  return (
    <LayoutWithHeader>
      <div className="flex justify-between h-full">
        <div className="w-1/3 h-full overflow-y-auto">
          <LeftBar />
        </div>
        <div className="w-1/3 h-full overflow-y-auto">
          <Center />
        </div>
        <div className="w-1/3 h-full overflow-y-auto">
          <RightBar />
        </div>
      </div>
    </LayoutWithHeader>
  );
};

export default Home;
