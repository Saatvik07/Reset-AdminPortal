import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
} from 'reactstrap';
import './style.css';
import { Link } from 'react-router-dom';
import FeatherIcon from "feather-icons-react";
import andrew from '../../assets/images/andrewJulienCard.jpg';
import jon from '../../assets/images/jonAronoffCard.jpg';
import luke from '../../assets/images/lukeReesCard.jpg';
import nikki from '../../assets/images/nikkiKiyimbaCard.jpg';
import abi from '../../assets/images/abiAdamsCard.png';
import paola from '../../assets/images/paolaLangellaCard.jpg';
import Banner from '../Layout/Banner/Banner';
import {useSelector} from "react-redux";
import Unauthorized from '../Unauthorized/Unauthorized';

function ViewAllGurus(){
  const auth = useSelector(state => state.auth)
  const [gurus,setGurus] = useState([
    {
      id: 1,
      image: andrew,
      name: 'Andrew Julien',
      keyword: 'Personal Trainer',
      bio:
        'Andrew Julien is a London based high-performance coach. It’s easy to understand why his philosophy is “go hard before home time”… Andrew believes if you truly want…'
    },
    {
      id: 2,
      image: jon,
      name: 'Jon Aronoff',
      keyword: 'Life Coach',
      bio:
        'Jonathan Aronoff is an Internationally Certified Coach, a licensed psychologist, and a psychoanalyst. After 30 years of playing and coaching competitive soccer he…'
    },
    {
      id: 3,
      image: luke,
      name: 'Luke Rees',
      keyword: 'Motivational Coach',
      bio:
        'Luke Rees is a young multi-award-winning International Motivational Speaker, UK Young Leader and Mental Health Ambassador. His contagious energy and passion…'
    },
    {
      id: 4,
      image: nikki,
      name: 'Nikki Kiyimba',
      keyword: 'Holistic Therapy',
      bio:
        'Dr Nikki Kiyimba is a Chartered Clinical Psychologist and Senior University Lecturer. She has specialised in psychological trauma and worked with many people with…'
    },
    {
      id: 5,
      image: abi,
      name: 'Abi Adams',
      keyword: 'Movement Therapy',
      bio:
        'Abi Adams is an Emotional Movement Therapist who empowers people through health and lifestyle choices. Using a mix of yoga, kinesiology, bioenergy and physical…'
    },
    {
      id: 6,
      image: paola,
      name: 'Paola Langella',
      keyword: 'Nutritionist,Pilates Instructor',
      bio:
        'Paola Langella is a Pilates Instructor & Health Coach Nutritionist. She grew up in Italy where she studied ballet for 10 years. During her studies in the UK, whilst…'
    }
  ]);
    return (
      <>
        {auth.user&&auth.idToken?
          <>
              <Banner title="Reset Gurus"/>
              <section>
                <Container>
                  <Row>
                    {gurus.map((guru, key) => (
                      <Col lg="4" md="6" className="mb-4 pb-2" key={key} name="blog">
                        <Card className="blog rounded border-0 shadow overflow-hidden">
                          <div className="position-relative">
                            <CardImg
                              top
                              src={guru.image}
                              className="rounded-top"
                              alt=""
                            />
                            <div className="overlay rounded-top bg-dark"></div>
                          </div>
                          <CardBody className="content">
                            <h5>
                              <Link to="#" className="card-title title text-dark">
                                {guru.name}
                              </Link>
                            </h5>
                            <h6
                              style={{
                                color: '#ff5001',
                                textTransform: 'capitalize'
                              }}
                            >
                              {guru.keyword}
                            </h6>
                            <p
                              style={{
                                color: '#0f0f0f',
                                fontSize: '16px',
                                marginBottom: '40px',
                                padding: '20px 0px',
                                borderTop: '1px solid lightgray',
                                borderBottom: '1px solid lightgray'
                              }}
                            >
                              {guru.bio}
                            </p>
                            <div className="btn-container">
                              <Link
                                  to={`/update-guru?id=2bf818e6-d0ff-4cb9-896d-0cd6e26d899b`}
                                  className="view-profile-btn"
                              >
                                  <FeatherIcon icon="user-plus" />
                              </Link>
                              <Link
                                  to={`/add-availability?id=2bf818e6-d0ff-4cb9-896d-0cd6e26d899b`}
                                  className="view-profile-btn"
                              >
                                  <FeatherIcon icon="calendar"/>
                              </Link>
                              <Link
                                  to={`/add-new-video?id=2bf818e6-d0ff-4cb9-896d-0cd6e26d899b`}
                                  className="view-profile-btn"
                              >
                                  <FeatherIcon icon="video"/>
                              </Link>
                            </div>
                            
                          </CardBody>
                          <div className="author">
                            <small className="text-light user d-block">
                              <i className="mdi mdi-account"></i> {guru.id}
                            </small>
                            <small className="text-light date">
                              <i className="mdi mdi-calendar-check"></i>{' '}
                              {guru.keyword}
                            </small>
                          </div>
                        </Card>
                      </Col>
                    ))}
      
                    {/* <Col xs="12">
                      <Pagination listClassName="justify-content-center mb-0">
                        <PaginationItem>
                          <PaginationLink to="#" previous>
                            Prev
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem active>
                          <PaginationLink to="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink to="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink to="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink to="#" next>
                            Next
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </Col> */}
                  </Row>
                </Container>
              </section>
            </>
        :
            <Unauthorized/>
        }

      </>
    );
}

export default ViewAllGurus;