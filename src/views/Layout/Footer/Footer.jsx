/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
function Footer() {
  const pageLinks = {
    grid1: [
      { title: 'About us', link: '/aboutus' },
      { title: 'Gurus', link: '/gurus' },
      { title: 'Online Sessions', link: '/online-sessions' },
      { title: 'Beta App', link: '/the-app' },
      { title: 'Blog', link: '/blog' },
      { title: 'Concierge', link: '/concierge' },
      { title: 'Login', link: '/login' }
    ],
    grid2: [
      { title: 'Contact', link: '/contact' },
      { title: 'Support', link: '/support' },
      { title: 'Terms & Conditions', link: '/terms-condition' },
      { title: 'Privacy Policy', link: '/privacy-policy' }
    ],
    instagram: 'www.instagram.com',
    facebook: 'www.facebook.com',
    linkedin: 'www.linkedin.com',
    twitter: 'www.twitter.com'
  };

  return (
    <>
      <footer className="footer bg-light">
        <Container>
          <Row>
            <Col
              lg="3"
              md="4"
              xs="12"
              className="mt-4 mt-sm-0 pt-2 pt-sm-0"
              name="footercolumn"
            >
              {/* <h5 className="text-dark footer-head">Company</h5> */}
              <ul className="list-unstyled footer-list mt-4">
                {pageLinks.grid1.map((grid, key) => (
                  <li key={key}>
                    <Link to={grid.link} className="text-foot">
                      {grid.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            <Col
              lg="3"
              md="4"
              xs="12"
              className="mt-4 mt-sm-0 pt-2 pt-sm-0"
              name="footercolumn"
            >
              <ul className="list-unstyled footer-list mt-4">
                {pageLinks.grid2.map((grid, key) => (
                  <li key={key}>
                    <Link to={grid.link} className="text-foot">
                      {grid.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            <Col
              lg={{ size: 3, offset: 3 }}
              md="4"
              xs="12"
              className="mb-0 mb-md-4 pb-0 pb-md-2"
              name="footercolumn"
            >
              <ul className="list-unstyled social-icon social mb-0 mt-4">
                <li className="list-inline-item ml-4">
                  <Link to={pageLinks.instagram} className="rounded">
                    <i>
                      {/* <FontAwesomeIcon
                        icon={['fab', 'facebook-square']}
                        size="2x"
                      /> */}
                      {/* <FeatherIcon
                        icon="facebook"
                        className="fea icon-m-md fea-social"
                      /> */}
                    </i>
                  </Link>
                </li>
                <li className="list-inline-item ml-4">
                  <Link to={pageLinks.instagram}>
                    <i>
                      {/* <FontAwesomeIcon icon={['fab', 'instagram']} size="2x" /> */}
                      {/* <FeatherIcon
                        icon="instagram"
                        className="fea icon-m-md fea-social"
                      /> */}
                    </i>
                  </Link>
                </li>
                <li className="list-inline-item ml-4">
                  <Link to={pageLinks.twitter} className="rounded">
                    <i>
                      {/* <FontAwesomeIcon
                        icon={['fab', 'twitter-square']}
                        size="2x"
                      /> */}
                      {/* <FeatherIcon
                        icon="twitter"
                        className="fea icon-m-md fea-social"
                      /> */}
                    </i>
                  </Link>
                </li>
                <li className="list-inline-item ml-4">
                  <Link to={pageLinks.linkedin} className="rounded">
                    <i>
                      {/* <FontAwesomeIcon icon={['fab', 'linkedin']} size="2x" /> */}
                      {/* <FeatherIcon
                        icon="linkedin"
                        className="fea icon-m-md fea-social"
                      /> */}
                    </i>
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
      <footer className="footer footer-bar">
        <Container className="text-center">
          <Row className="align-items-center">
            <Col sm="6">
              <div className="text-sm-left">
                <p className="mb-0">
                  © Copyright 2020 Reset MSM. All rights reserved
                </p>
              </div>
            </Col>

            <Col sm="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="text-sm-right">
                <p className="mb-0">Website by Full Frontal Design</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
