import { Suspense } from "react";
import stores from "./store/stores";
import Navbar from "./components/Navbar";
import MainApp from "./sections/MainApp";
import { Provider as ReduxProvider, useSelector } from "react-redux";

const renderLoader = () => <p></p>;

const RootComponent = () => {
  const darkTheme = useSelector((state) => state.status.darkTheme);
  return (
    <>
      <div className={!!darkTheme ? "main_cover dark_theme" : "main_cover"}>
        <div className="container">
          <Navbar />
          <MainApp />
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Suspense fallback={renderLoader()}>
      <ReduxProvider store={stores}>
        <RootComponent />
      </ReduxProvider>
    </Suspense>
  );
};

export default App;
