import HomeFeed from "../../components/HomeFeed";
import TopCreators from "../../components/TopCreators";

const Home = () => {
  return (
    <div className="flex-1 flex">
      <HomeFeed />
      <TopCreators />
    </div>
  );
};

export default Home;
