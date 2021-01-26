import React, { useState, useEffect} from 'react';
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
import {useSelector,useDispatch} from "react-redux";
import Unauthorized from '../Unauthorized/Unauthorized';
import {getUser } from '../../Store/ActionCreators/auth';
function ViewAllGurus(){
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
  const [gurus,setGurus] = useState(null);
  const fetchGurus = async()=>{
    fetch(`https://j6lw75i817.execute-api.us-east-2.amazonaws.com/v1/gurus`).then(response=>{
        if(response.ok){
            return response.json();
        }
    }).then(jsonResponse=>{
        return jsonResponse;
    })
    .then(result=>{
        console.log(result.body);
        setGurus(result.body);
        setLoading(false);
    }).catch(error=>{
        console.log(error);
    });
  }
  useEffect(()=>{
    dispatch(getUser()).then(()=>{
      fetchGurus();
    });
  },[])
    return (
      <>
        {auth.idToken?
          <>
              <Banner title="Reset Gurus"/>
              <section>
                <Container>
                  <Row>
                    {gurus?
                    gurus.map((guru, key) => (
                      <Col lg="4" md="6" className="mb-4 pb-2" key={key} name="blog">
                        <Card className="blog rounded border-0 shadow overflow-hidden">
                          <div className="position-relative">
                            <CardImg
                              top
                              src={guru.profilePhoto}
                              className="rounded-top"
                              alt=""
                            />
                            <div className="overlay rounded-top bg-dark"></div>
                          </div>
                          <CardBody className="content">
                            <h5>
                              <Link to="#" className="card-title title text-dark">
                                {`${guru.firstName} ${guru.lastName}`}
                              </Link>
                            </h5>
                            {/* <div
                              className="keyword-container"
                            >
                              {guru.keywords.map((keyword)=>{
                                return <h6 className="keyword">
                                  {keyword.name}
                                </h6>;
                              })}
                            </div> */}
                            <p
                              className="bio"
                            >
                              {guru.bio}
                            </p>
                            <div className="btn-container">
                              <Link
                                  to={`/update-guru?id=${guru.guruID}`}
                                  className="view-profile-btn"
                              >
                                  <FeatherIcon icon="user-plus" />
                              </Link>
                              <Link
                                  to={`/add-availability?id=${guru.guruID}`}
                                  className="view-profile-btn"
                              >
                                  <FeatherIcon icon="calendar"/>
                              </Link>
                              <Link
                                  to={`/add-new-video?id=${guru.guruID}`}
                                  className="view-profile-btn"
                              >
                                  <FeatherIcon icon="video"/>
                              </Link>
                            </div>
                            
                          </CardBody>
                        </Card>
                      </Col>
                    ))
                    :
                    <div className="loader-container">
                        <div id="preloader">
                            <div id="status">
                            <div className="spinner">
                                <div className="double-bounce1" />
                                <div className="double-bounce2" />
                            </div>
                            </div>
                        </div>
                    </div>
                    }
      
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
            auth.isLoading&&loading?
            <div className="loader-container">
                    <div id="preloader">
                        <div id="status">
                        <div className="spinner">
                            <div className="double-bounce1" />
                            <div className="double-bounce2" />
                        </div>
                        </div>
                    </div>
            </div>
            :
            <Unauthorized/>
        }

      </>
    );
}

export default ViewAllGurus;