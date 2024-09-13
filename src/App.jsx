import WeatherApp from "./Component/WeatherApp";
import "./App.css";
import HamburgerNav from "./Component/HamburgerNav";

const App = () => {
  return (
    <>
      <HamburgerNav />
      <WeatherApp />
    </>
  );
};

export default App;
