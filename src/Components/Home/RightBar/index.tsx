import FriendList from "./FriendList";

const RightBar = () => {
  return (
    <div className="bg-white h-full overflow-y-auto px-4 py-3 rounded-2xl">
      <h2 className="text-lg font-semibold">Danh sách bạn bè</h2>
      <FriendList />
    </div>
  );
};

export default RightBar;
