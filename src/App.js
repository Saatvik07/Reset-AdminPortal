/* eslint-disable react/no-array-index-key */
/* eslint-disable max-classes-per-file */
// import './App.scss';
import React, { Suspense } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';

import Layout from './views/Layout/Layout';
import routes from './routes';
import './styles/helper.css';

function withLayout(WrappedComponent) {
  return class extends React.PureComponent {
    render() {
      return (
        <Layout>
          <WrappedComponent />
        </Layout>
      );
    }
  };
}

const Loader = () => (
  <div id="preloader">
    <div id="status">
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={Loader()}>
          <Switch>
            {routes.map((route, idx) =>
              route.isWithoutLayout ? (
                <Route
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                  key={idx}
                />
              ) : (
                <Route
                  path={route.path}
                  exact
                  component={withLayout(route.component)}
                  key={idx}
                />
              )
            )}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}
export default App;
