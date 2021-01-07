import React, { Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopNavBar = React.lazy(() => import('./TopNavBar/TopNavBar'));
const Footer = React.lazy(() => import('./Footer/Footer'));

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

function Layout(props) {
  const { children } = props;
  return (
    <>
      <Suspense fallback={Loader()}>
        <TopNavBar />
        {children}
        <Footer />
      </Suspense>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default withRouter(Layout);
