import React,{useEffect, useState, useRef} from 'react'
import {ListBox} from "primereact/listbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Banner from '../Layout/Banner/Banner';
import { Toast } from 'primereact/toast';
import { Container,Row,Col,Spinner} from 'reactstrap';
import {useSelector} from "react-redux";
import Unauthorized from '../Unauthorized/Unauthorized';
import "./style.css";
function AddCategory() {
    const toast = useRef(null);
    const toast1 = useRef(null);
    const auth = useSelector((state)=>state.auth);
    const [categories,setCategories] = useState([]);
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
        fetch(`https://6w9erowpnj.execute-api.us-east-2.amazonaws.com/v1/categories`).then(response=>{
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
        fetch(`https://6w9erowpnj.execute-api.us-east-2.amazonaws.com/v1/categories`,fetchOptions).then(response=>{
            if(response.statusCode===200){
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
                    <Banner title="Add Category"/>
                    <Container>
                        <Row>
                            <Col md={6} className="left-container">
                            {fetching?
                            <>
                                <Spinner color="primary"/>
                            </>
                            :
                            <>
                                <h3 className="left-heading">Categories</h3>
                                <ListBox options={categories} filter optionLabel="name"
                                    itemTemplate={itemTemplate} className="category-list" />
                            </>}
                            </Col>
                            <Col md={6} className="right-container">
                            <h4 className="left-heading">Add new Category</h4>
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
            :<Unauthorized/>}

        </div>
    )
}

export default AddCategory

