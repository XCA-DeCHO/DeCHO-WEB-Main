import { Suspense } from "react";
import stores from "./store/stores";
import Navbar from "./components/Navbar";
import MainApp from "./sections/MainApp";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

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
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={renderLoader()}>
      <ReduxProvider store={stores}>
        <QueryClientProvider client={queryClient}>
          <RootComponent />
        </QueryClientProvider>
      </ReduxProvider>
    </Suspense>
  );
};

export default App;