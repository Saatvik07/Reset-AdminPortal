import React,{useEffect, useState,useRef} from 'react'
import {ListBox} from "primereact/listbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import Banner from '../Layout/Banner/Banner';
import { Container,Row,Col,Spinner,Alert } from 'reactstrap';
import {useSelector} from "react-redux";
import Unauthorized from '../Unauthorized/Unauthorized';
import "./style.css";
function AddKeyword() {
    const toast = useRef(null);
    const toast1 = useRef(null);
    const auth = useSelector(state => state.auth)
    const [keywords,setKeywords] = useState([]);
    const [loading,setLoading] = useState(true);
    const [fetching,setFetching] = useState(false);
    const [inProgress,setInProgress] = useState(false);
    const [name,setName] = useState("");
    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Category added', detail:`${name} has been added`, life: 3000});
    }
    const showError = () => {
        toast1.current.show({severity:'error', summary: 'Failed to add', detail:'Please try again with a different name', life: 3000});
    }
    const fetchCategories = ()=>{
        if(!loading){
            setFetching(true);
        }
        fetch(`https://la6s3169jc.execute-api.us-east-2.amazonaws.com/v1/skillset`).then(response=>{
                if(response.ok){
                    return response.json();
                }
            }).then(jsonResponse=>{
                return jsonResponse;
            })
            .then(result=>{
                setKeywords(result.body);
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
        fetch(`https://la6s3169jc.execute-api.us-east-2.amazonaws.com/v1/skillset`,fetchOptions).then(response=>{
            if(response.statusCode===201){
                return response.json();
            }
            else{
                showError();
            }
        }).then(jsonResponse=>{
            return jsonResponse;
        }).then(()=>{
            setInProgress(false);
            showSuccess();
            setName("");
            fetchCategories();
        })
    }
    return (
        <div>
            <Toast ref={toast} position="bottom-right" />
            <Toast ref={toast1} position="bottom-right" />
            {auth.idToken?
                loading?
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
                    <Banner title="Add Keyword"/>
                    <Container>
                        <Row>
                            <Col md={6} className="left-container">
                            {fetching?
                            <>
                                <Spinner color="primary"/>
                            </>
                            :
                            <>
                                <h3 className="left-heading">Keywords</h3>
                                <ListBox options={keywords} filter optionLabel="name"
                                    itemTemplate={itemTemplate} className="category-list" />
                            </>}
                            </Col>
                            <Col md={6} className="right-container">
                            <h4 className="left-heading">Add new Keyword</h4>
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
            :
            <Unauthorized/>
            }

        </div>
    )
}

export default AddKeyword


