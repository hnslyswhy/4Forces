import { useContext } from "react";
import AuthContext from "./utilities/AuthContext";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import FuelUpDetailsPage from "./pages/FuelUpDetailsPage/FuelUpDetailsPage";
import FuelUpListPage from "./pages/FuelUpListPage/FuelUpListPage";
import HomePage from "./pages/HomePage/HomePage";
import ListeningDetailsPage from "./pages/ListeningDetailsPage/ListeningDetailsPage";
import ListeningListPage from "./pages/ListeningListPage/ListeningListPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ResourceDetailsPage from "./pages/ResourceDetailsPage/ResourceDetailsPage";
import ResourceListPage from "./pages/ResourceListPage/ResourceListPage";
import SpeakingDetailsPage from "./pages/SpeakingDetailsPage/SpeakingDetailsPage";
import SpeakingListPage from "./pages/SpeakingListPage/SpeakingListPage";
import TestPrepPage from "./pages/TestPrepPage/TestPrepPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      {!authCtx.user && <Route path="*" component={LoginPage} />}

      {!authCtx.isLoading && authCtx.user && (
        <>
          <Switch>
            <Route path="/testprep/fuelup/:id" component={FuelUpDetailsPage} />
            <Route path="/testprep/fuelup" component={FuelUpListPage} />
            <Route
              path="/testprep/listeningprep/:id"
              component={ListeningDetailsPage}
            />
            <Route
              path="/testprep/listeningprep"
              component={ListeningListPage}
            />
            <Route
              path="/testprep/speakingprep/:id/:questionId"
              component={SpeakingDetailsPage}
            />
            <Route path="/testprep/speakingprep" component={SpeakingListPage} />
            <Route path="/testprep" exact component={TestPrepPage} />
            <Route path="/resource/:id" component={ResourceDetailsPage} />
            <Route path="/resource" exact component={ResourceListPage} />
            <Route path="/profile" exact component={ProfilePage} />
            <Route path="/home" exact component={HomePage} />
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </>
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
