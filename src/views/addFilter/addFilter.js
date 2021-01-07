import React,{useEffect, useState} from 'react'
import {ListBox} from "primereact/listbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Banner from '../Layout/Banner/Banner';
import { Container,Row,Col,Spinner,Alert } from 'reactstrap';
import "./style.css";
function AddFilter() {
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(true);
    const [fetching,setFetching] = useState(false);
    const [inProgress,setInProgress] = useState(false);
    const [visible,setVisible] = useState([false,false]);
    const [name,setName] = useState("");
    const onDismiss = ()=> setVisible(true);
    
    
    const fetchCategories = ()=>{
        if(!loading){
            setFetching(true);
        }
        fetch(`https://1qpe25db41.execute-api.us-east-2.amazonaws.com/v1/filter`).then(response=>{
                if(response.ok){
                    return response.json();
                }
            }).then(jsonResponse=>{
                return jsonResponse;
            })
            .then(result=>{
                setCategories(result.body);
                if(loading){
                    setLoading(false);
                }
                setFetching(false);
            }).catch(error=>{
                console.log(error);
            });
    }
    useEffect(()=>{
        fetchCategories();
    },[]);
    const itemTemplate = (option) => {
        return (
            <h5 id={option.ID}>{option.name}</h5>
        );
    }
    const handleAdd = ()=>{
        setInProgress(true);
        const fetchOptions = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name:name})
        }
        fetch(`https://1qpe25db41.execute-api.us-east-2.amazonaws.com/v1/filter`,fetchOptions).then(response=>{
            if(response.statusCode===200){
                return response.json();
            }
            else{
                setVisible([false,true]);
                setTimeout(()=>{
                    if(visible){
                        setVisible([false,false]);
                    }
                },3000)
            }
        }).then(jsonResponse=>{
            return jsonResponse;
        }).then(()=>{
            setInProgress(false);
            setVisible([true,false]);
            setTimeout(()=>{
                if(visible){
                    setVisible([false,false]);
                }
            },3000)
            setName("");
            fetchCategories();
        })
    }
    return (
        <div>
            
            {loading?
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
                <>
                    <Banner title="Add EA Filter"/>
                    <Container>
                        <Row>
                            <Col md={6} className="left-container">
                            {fetching?
                            <>
                                <Spinner color="primary"/>
                            </>
                            :
                            <>
                                <h3 className="left-heading">Filters</h3>
                                <ListBox options={categories} filter optionLabel="name"
                                    itemTemplate={itemTemplate} className="category-list" />
                            </>}
                            
                            </Col>
                            <Col md={6} className="right-container">
                            <Alert color="success" isOpen={visible[0]} toggle={()=>{
                                setVisible([false,false])
                            }}>The filter - {name} has been added</Alert>
                            <Alert color="danger" isOpen={visible[1]} toggle={()=>{
                                setVisible([false,false])
                            }}>The filter couldn't be added. Please try again</Alert>
                            <h4 className="left-heading">Add new EA filter</h4>
                            <div className="p-inputgroup">
                                <InputText placeholder="Enter Name" id="filter-name" onChange={(event)=>{
                                    setName(event.target.value);
                                }} value={name}/>
                                {inProgress?<Spinner color="primary"/>:<Button label="Add" onClick={handleAdd}/>}
                            </div>
                            </Col>
                        </Row>
                    </Container>
                </>
            }

        </div>
    )
}

export default AddFilter
