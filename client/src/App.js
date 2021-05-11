import React from "react";
// add these two library import statements for Apollo
// npm i apollo-boost graphql graphql-tag @apollo/react-hooks // this is used to install
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
// BrowserRouter and Route are componets that the React Library provides //
// This changes the name we use; BrowserRouter as Router; changes BrowserRouter to Router //
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Imports from Componets //
import Header from "./components/Header";
import Footer from "./components/Footer";
// Imports from Pages //
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import SingleThought from "./pages/SingleThought";

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />
              {/* using the switch with the NoMatch componet will make sure if a user tries 
              a page that does not have a vaid route they will recive and 404 message */}
              <Route componet={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
