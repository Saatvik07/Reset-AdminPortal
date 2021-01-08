import React, { useEffect, useState } from 'react'
import {
    Col,
    Container,
    Form,
    FormGroup,
    Row,
    Alert,
    Label,
    Input
} from 'reactstrap';
import FeatherIcon from 'feather-icons-react';
import { MultiSelect } from 'primereact/multiselect';
import "./style.css"
import Banner from '../Layout/Banner/Banner';
function AddNewGuru() {
    
    const [keywords,setKeywords] = useState([]);
    const [categories,setCategories] = useState([]);
    const [filters,setFilters] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState(null);
    const [selectedFilter,setSelectedFilter] = useState(null);
    const [selectedKeyword,setSelectedKeyword] = useState(null);
    const [loading,setLoading] = useState({keyword:true,filter:true,category:true});
    const fetchFilters = ()=>{
        fetch(`https://1qpe25db41.execute-api.us-east-2.amazonaws.com/v1/filter`).then(response=>{
                if(response.ok){
                    return response.json();
                }
            }).then(jsonResponse=>{
                return jsonResponse;
            })
            .then(result=>{
                setFilters(result.body);
                setLoading((prev)=>{
                    return {...prev,filter:false}
                });
            }).catch(error=>{
                console.log(error);
            });
    }
    const fetchCategories = ()=>{
        fetch(`https://6w9erowpnj.execute-api.us-east-2.amazonaws.com/v1/categories`).then(response=>{
                if(response.ok){
                    return response.json();
                }
            }).then(jsonResponse=>{
                return jsonResponse;
            })
            .then(result=>{
                setCategories(result.body);
                setLoading((prev)=>{
                    return {...prev,category:false}
                });
            }).catch(error=>{
                console.log(error);
            });
    }
    const fetchKeywords = ()=>{
        fetch(`https://la6s3169jc.execute-api.us-east-2.amazonaws.com/v1/skillset`).then(response=>{
                if(response.ok){
                    return response.json();
                }
            }).then(jsonResponse=>{
                return jsonResponse;
            })
            .then(result=>{
                setKeywords(result.body);
                setLoading((prev)=>{
                    return {...prev,keyword:false}
                });
            }).catch(error=>{
                console.log(error);
            });
    }
    useEffect(()=>{
        fetchCategories();
        fetchFilters();
        fetchKeywords();
    },[])
    const itemTemplate = (option) => {
        if (option) {
            return (
                <div className="item-container">
                    <div id={option.ID}>{option.name}</div>
                </div>
            );
        }

        return "Choose a value";
    }
    return (
        <div>
            {!loading.category && !loading.filter && !loading.keyword ? 
            <>
                <Banner title="Add New Guru"/>
                <Container>
                    <Row className="justify-content-center">
                    <Col lg={10} xs={12}>
                        <div className="rounded p-4 shadow">
                        <Row>
                            <Col xs={12}>
                            <Form>
                                <Row>
                                <Col md={6}>
                                    <FormGroup>
                                    <Label>
                                        Guru Name <span className="text-danger">*</span>
                                    </Label>
                                    <div className="position-relative">
                                        <i>
                                        <FeatherIcon
                                            icon="user"
                                            className="fea icon-sm icons"
                                        />
                                        </i>
                                    </div>
                                    <Input
                                        name="name"
                                        id="name"
                                        type="text"
                                        className="form-control pl-5"
                                        placeholder="First Name :"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                    <Label></Label>
                                    <Input
                                        name="lastName"
                                        id="lastName"
                                        type="text"
                                        className="form-control pl-3 mt-2"
                                        placeholder="Last Name :"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                    <Label>
                                        Email{' '}
                                        <span className="text-danger">*</span>
                                    </Label>
                                    <div className="position-relative">
                                        <i>
                                        <FeatherIcon
                                            icon="mail"
                                            className="fea icon-sm icons"
                                        />
                                        </i>
                                    </div>
                                    <Input
                                        name="email"
                                        id="email"
                                        type="email"
                                        className="form-control pl-5"
                                        placeholder="Your email :"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                    <Label>
                                        Bio <span className="text-danger">*</span>{' '}
                                    </Label>
                                    <div className="position-relative">
                                        <i>
                                        <FeatherIcon
                                            icon="info"
                                            className="fea icon-sm icons"
                                        />
                                        </i>
                                    </div>
                                    <textarea
                                        name="comments"
                                        id="comments"
                                        rows="4"
                                        className="form-control pl-5"
                                    ></textarea>
                                    </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup className="multiselect-container">
                                            <Label>
                                                Select Categories<span className="text-danger">*</span>{' '}
                                            </Label>
                                            <MultiSelect value={selectedCategory} options={categories}  onChange={(e) => setSelectedCategory(e.value)} optionLabel="name" placeholder="" filter className="multiselect-custom" itemTemplate={itemTemplate} selectedItemTemplate={itemTemplate} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup className="multiselect-container">
                                            <Label>
                                                Select Filters<span className="text-danger">*</span>{' '}
                                            </Label>
                                            <MultiSelect value={selectedFilter} options={filters}  onChange={(e) => {
                                                setSelectedFilter(e.value)}} optionLabel="name" placeholder="" filter className="multiselect-custom" itemTemplate={itemTemplate} selectedItemTemplate={itemTemplate} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup className="multiselect-container">
                                            <Label>
                                                Select Filters<span className="text-danger">*</span>{' '}
                                            </Label>
                                            <MultiSelect value={selectedKeyword} options={keywords}  onChange={(e) => {
                                                setSelectedKeyword(e.value)}} optionLabel="name" placeholder="" filter className="multiselect-custom" itemTemplate={itemTemplate} selectedItemTemplate={itemTemplate} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                <Col sm={12}>
                                    <input
                                    type="submit"
                                    id="submit"
                                    name="send"
                                    className="touch-btn"
                                    value="Add"
                                    />
                                </Col>
                                </Row>
                            </Form>
                            </Col>
                        </Row>
                        </div>
                    </Col>
                    </Row>
                </Container>
            </>
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
            
        </div>
    )
}

export default AddNewGuru
