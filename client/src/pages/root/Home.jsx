import HomeFeed from "../../components/HomeFeed";
import TopCreators from "../../components/TopCreators";

const Home = () => {
  return (
    <div className="flex-1 flex">
      <div className="flex-[2]">
        <HomeFeed />
      </div>
      <TopCreators />
    </div>
  );
};

export default Home;
