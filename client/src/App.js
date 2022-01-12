import react from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import FuelUpPage from "./pages/FuelUpPage/FuelUpPage";
import HomePage from "./pages/HomePage/HomePage";
import ListeningPrep from "./pages/ListeningPrep/ListeningPrep";
import SpeakingPrepPage from "./pages/SpeakingPrepPage/SpeakingPrepPage";
import TestPrepPage from "./pages/TestPrepPage/TestPrepPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/testprep/fuelup" component={FuelUpPage} />
        <Route path="/testprep/listeningprep" component={ListeningPrep} />
        <Route path="/testprep/speakingprep" component={SpeakingPrepPage} />
        <Route path="/testprep" exact component={TestPrepPage} />
        <Route path="/" exact component={HomePage} />

        {/*     <Route path="*">
          <Redirect to="/" exact component={HomePage} />
        </Route> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
