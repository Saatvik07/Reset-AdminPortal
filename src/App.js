/* eslint-disable react/no-array-index-key */
/* eslint-disable max-classes-per-file */
// import './App.scss';
import React, { Suspense,useEffect,useState } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';
import {useDispatch} from "react-redux";
import Layout from './views/Layout/Layout';
import routes from './routes';
import './styles/helper.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import {getUser} from "./Store/ActionCreators/auth"
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
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUser()).then(()=>{
      setLoading(false);     
    });
  },[])
  return (
    <>
      <Router>
        <Suspense fallback={Loader()}>
          <Switch>
            {loading?
              <Loader/>
            :
            routes.map((route, idx) =>
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
            )
            }
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}
export default App;
