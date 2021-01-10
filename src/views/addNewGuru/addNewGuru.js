import React, { useEffect, useState, useRef } from 'react'
import {
    Col,
    Container,
    Form,
    FormGroup,
    Row,
    Spinner,
    Label,
    Input
} from 'reactstrap';
import { Toast } from 'primereact/toast';
import FeatherIcon from 'feather-icons-react';
import { MultiSelect } from 'primereact/multiselect';
import "./style.css"
import Banner from '../Layout/Banner/Banner';
function AddNewGuru() {
    const toast = useRef(null);
    const toast1 = useRef(null);
    const toast2 = useRef(null);
    const toast3 = useRef(null);
    const toast4 = useRef(null);
    const [name,setName] = useState({firstName:"",secondName:""});
    const [email,setEmail] = useState("");
    const [bio,setBio] = useState("");
    const [profileString,setProfileString] = useState("");
    const [thumbnailString,setThumbnailString] = useState("");
    const [videoString,setVideoString] = useState("");
    const [keywords,setKeywords] = useState([]);
    const [categories,setCategories] = useState([]);
    const [filters,setFilters] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState(null);
    const [selectedFilter,setSelectedFilter] = useState(null);
    const [selectedKeyword,setSelectedKeyword] = useState(null);
    const [links,setLinks] = useState({
        profile:"",
        thumbnail:"",
        video:"",
    })
    const [profilePreview,setProfilePreview] = useState({
        image:null,
        name:null,
        size:null,
    });
    const [thumbnailPreview,setThumbnailPreview] = useState({
        image:null,
        name:null,
        size:null,
    });
    const [videoPreview,setVideoPreview] = useState({
        image:null,
        name:null,
        size:null,
    });
    const [loading,setLoading] = useState({keyword:true,filter:true,category:true});
    const [uploading,setUploading] = useState({profile:false,thumbnail:false,video:false,whole:false});
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
    const onUploadComplete = (type) => {
        if(type===1){
            toast.current.show({severity: 'success', summary: 'Success', detail: 'The profile picture was uploaded'});
        }
        else if(type===2){
            toast1.current.show({severity: 'success', summary: 'Success', detail: 'The intro video thumbnail was uploaded'});
        }
        else if(type===3){
            toast2.current.show({severity: 'success', summary: 'Success', detail: 'The intro video was uploaded'});
        }
        else if(type===4){
            toast4.current.show({severity: 'success', summary: 'Success', detail: `${name.firstName} ${name.secondName} was added successfully`});
        }
    }
    
    useEffect(()=>{
        fetchCategories();
        fetchFilters();
        fetchKeywords();
    },[])
    const checkValidations = () =>{
        if(name.firstName!==""&&name.secondName!==""&&email!==""&&bio!=="" && selectedCategory &&selectedCategory.length>0&&selectedFilter&&selectedFilter.length>0&&selectedKeyword&&selectedKeyword.length>0&&links.profile!==""&&links.thumbnail!==""&&links.video!==""){
            return true;
        }
        return false;
    }
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
    const uploadHandlerProfile = (event)=>{
        setUploading((prev)=>{
            return {...prev,profile:true}
        })
        const guruName=name.firstName+" "+name.secondName;
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({guruName:guruName,type:"profile"}),
        };
        fetch("https://5hsr4euhfe.execute-api.us-east-2.amazonaws.com/dev/uploadProfile",fetchOptions).then(response=>{
            if(response.ok){
                return response.json();
            }
        })
        .then(jsonResponse=>{
            return jsonResponse;
        })
        .then(async (resObj)=>{
            let binary = atob(profileString.split(",")[1])
            let blobArray=[];
            for(let i=0;i<binary.length;i++){
                blobArray.push(binary.charCodeAt(i))
            }
            let blobData = new Blob([new Uint8Array(blobArray)],{type:'image/jpeg'});
            const result = await fetch(resObj.uploadURL,{method:"PUT",body:blobData});
            setUploading((prev)=>{
                return {...prev,profile:false}
            })
            setLinks((prev)=>{
                return {...prev,profile:resObj.uploadURL.split("?")[0]}
            })
            onUploadComplete(1);
        
        }).catch(err=>{
            console.log(err);
        });
    }
    const uploadHandlerThumbnail = (event)=>{
        setUploading((prev)=>{
            return {...prev,thumbnail:true}
        })
        const guruName=name.firstName+" "+name.secondName;
        const fetchOptions = {
			method: "POST",
			body: JSON.stringify({guruName:guruName,type:"thumbnail"}),
		};
        fetch("https://5hsr4euhfe.execute-api.us-east-2.amazonaws.com/dev/uploadProfile",fetchOptions).then(response=>{
            if(response.ok){
            return response.json();
            }
        })
        .then(jsonResponse=>{
            return jsonResponse;
        })
        .then(async (resObj)=>{
            let binary = atob(thumbnailString.split(",")[1])
            let blobArray=[];
            for(let i=0;i<binary.length;i++){
                blobArray.push(binary.charCodeAt(i))
            }
            let blobData = new Blob([new Uint8Array(blobArray)],{type:'image/jpeg'});
            const result = await fetch(resObj.uploadURL,{method:"PUT",body:blobData});
            setUploading((prev)=>{
                return {...prev,thumbnail:false}
            })
            setLinks((prev)=>{
                return {...prev,thumbnail:resObj.uploadURL.split("?")[0]}
            })
            onUploadComplete(2);
        
        }).catch(err=>{
            console.log(err);
        });
    }
    const uploadHandlerVideo = (event)=>{
        setUploading((prev)=>{
            return {...prev,video:true}
        })
        const videoID = parseInt(Math.random() * 10000000);
        const guruName=name.firstName+" "+name.secondName;
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({guruName:guruName,videoID:videoID,type:"intro"}),
        };
        fetch("https://5hsr4euhfe.execute-api.us-east-2.amazonaws.com/dev/uploadVideo",fetchOptions).then(response=>{
        if(response.ok){
            return response.json();
        }
        })
        .then(jsonResponse=>{
            return jsonResponse;
        })
        .then(async (resObj)=>{
            let binary = atob(videoString.split(",")[1])
            let blobArray=[];
            for(let i=0;i<binary.length;i++){
                blobArray.push(binary.charCodeAt(i))
            }
            let blobData = new Blob([new Uint8Array(blobArray)],{type:'image/jpeg'});
            const result = await fetch(resObj.uploadURL,{method:"PUT",body:blobData});
            setUploading((prev)=>{
                return {...prev,video:false}
            })
            setLinks((prev)=>{
                return {...prev,video:resObj.uploadURL.split("?")[0]}
            })
            onUploadComplete(3);
        
        }).catch(err=>{
            console.log(err);
        });
    }
    const handleChangeProfile = (event) =>{
        const file = document.getElementById("guru-profile").files[0];
        if(file){
            let reader = new FileReader();
            reader.onload = (e)=>{
                if (!e.target.result.includes('data:image/jpeg')) {
                    alert('Wrong file type - JPEG only.')
                }
                else{
                    setProfilePreview((prev)=>{
                        return {image:URL.createObjectURL(event.target.files[0]),name:event.target.files[0].name,size:Math.round(event.target.files[0].size/1024)}
                    })
                    setProfileString(e.target.result);
                }
            } 
            reader.readAsDataURL(file);
        }
    }
    const handleChangeThumbnail = (event) =>{
        const file = document.getElementById("guru-intro-thumbnail").files[0];
        if(file){
            let reader = new FileReader();
            reader.onload = (e)=>{
                if (!e.target.result.includes('data:image/jpeg')) {
                    alert('Wrong file type - JPEG only.')
                }
                else{
                    setThumbnailPreview((prev)=>{
                        return {image:URL.createObjectURL(event.target.files[0]),name:event.target.files[0].name,size:Math.round(event.target.files[0].size/1024)}
                    })
                    setThumbnailString(e.target.result);
                }
            } 
            reader.readAsDataURL(file);
        }
    }
    const handleChangeVideo = (event) =>{
        const file = document.getElementById("guru-intro-video").files[0];
        if(file){
            let reader = new FileReader();
            reader.onload = (e)=>{
                if (!e.target.result.includes('data:video/mp4')) {
                    alert('Wrong file type - MP4 only.')
                }
                else{
                    setVideoPreview((prev)=>{
                        return {image:URL.createObjectURL(event.target.files[0]),name:event.target.files[0].name,size:Math.round(event.target.files[0].size/1024)}
                    })
                    setVideoString(e.target.result);
                }
            } 
            reader.readAsDataURL(file);
        }
    }
    const handleAdd = (event)=>{
        event.preventDefault();
        const valid = checkValidations();
        if(!valid){
            toast3.current.show({severity: 'error', summary: 'All fields are mandatory', detail: 'Please check that all fields are completely filled'});
        }
        else{
            let guruObj = {
                profilePhoto:links.profile,
                techniqueVideos:{
                    videoID:1,
                    videoList:[],
                },
                introVideo:{
                    photo:links.thumbnail,
                    video:links.video
                },
                bio:bio,
                firstName:name.firstName,
                lastName:name.secondName,
                email:email,
                addedBy:{
                    id:'manual_entry_by_saatvik',
                    name:{
                        firstName:"Saatvik",
                        secondName:"Bhatnagar"
                    }
                },
                categories:selectedCategory,
                filters: selectedFilter,
                keywords:selectedKeyword,
            }
            const fetchOptions = {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(guruObj),
            }
            fetch("https://j6lw75i817.execute-api.us-east-2.amazonaws.com/v1/gurus",fetchOptions).then(response=>{
                if(response.ok){
                    return response.json();
                }
            })
            .then(jsonResponse=>{
                return jsonResponse;
            })
            .then(resObj=>{
                onUploadComplete(4);
                setName({firstName:"",secondName:""});
                setEmail("");
                setBio("");
                setSelectedCategory(null);
                setSelectedFilter(null);
                setSelectedKeyword(null);
                setProfilePreview({
                    image:null,
                    name:null,
                    size:null,
                });
                setThumbnailPreview({
                    image:null,
                    name:null,
                    size:null,
                });
                setVideoPreview({
                    image:null,
                    name:null,
                    size:null,
                });
                setLinks({
                    profile:"",
                    thumbnail:"",
                    video:"",
                })
                document.getElementById("guru-profile").value="";
                document.getElementById("guru-intro-video").value="";
                document.getElementById("guru-intro-thumbnail").value="";
            })
        }

    }
    return (
        <div>
            <Toast ref={toast} position="bottom-right"></Toast>
            <Toast ref={toast1} position="bottom-right"></Toast>
            <Toast ref={toast2} position="bottom-right"></Toast>
            <Toast ref={toast3} position="bottom-right"></Toast>
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
                                        value={name.firstName}
                                        onChange={(event)=>{
                                            setName((prev)=>{
                                                return {...prev,firstName:event.target.value}
                                            })
                                        }}
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
                                        value={name.lastName}
                                        onChange={(event)=>{
                                            setName((prev)=>{
                                                return {...prev,secondName:event.target.value}
                                            })
                                        }}
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
                                        value={email}
                                        onChange={(event)=>{
                                            setEmail(event.target.value)
                                        }}
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
                                        value={bio}
                                        onChange={(event)=>{
                                            setBio(event.target.value);
                                        }}
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
                                                Select Keywords<span className="text-danger">*</span>{' '}
                                            </Label>
                                            <MultiSelect value={selectedKeyword} options={keywords}  onChange={(e) => {
                                                setSelectedKeyword(e.value)}} optionLabel="name" placeholder="" filter className="multiselect-custom" itemTemplate={itemTemplate} selectedItemTemplate={itemTemplate} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup className="upload-container">
                                            <Label>
                                                Profile Photo<span className="text-danger">*</span>{' '}
                                            </Label>
                                            <input id="guru-profile" onChange={handleChangeProfile} type="file"/>
                                            <div className="preview-container">
                                                {!profilePreview.image?<h5>Select a file to upload</h5>:
                                                <div className="preview-bar">
                                                    <img src={profilePreview.image} className="preview-img" alt="preview"/>
                                                    <h6>{profilePreview.name}</h6>
                                                    <h6>{`${profilePreview.size} kb`}</h6>
                                                    <button onClick={()=>{
                                                        document.getElementById("guru-profile").value="";
                                                        setProfilePreview({name:null,image:null,size:null});
                                                    }}>
                                                        <FeatherIcon icon="x-square"/>
                                                    </button>
                                                </div>
                                                
                                                }
                                            </div>
                                            {uploading.profile?<Spinner color="black" className="mt-2 ml-3"/>:<button className="upload-btn mt-2" onClick={uploadHandlerProfile}><FeatherIcon icon="upload"/></button>}
                                            
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup className="upload-container">
                                            <Label>
                                                Intro Video Thumbnail<span className="text-danger">*</span>{' '}
                                            </Label>
                                            <input id="guru-intro-thumbnail" onChange={handleChangeThumbnail} type="file"/>
                                            <div className="preview-container">
                                                {!thumbnailPreview.image?<h5>Select a file to upload</h5>:
                                                <div className="preview-bar">
                                                    <img src={thumbnailPreview.image} className="preview-img" alt="preview"/>
                                                    <h6>{thumbnailPreview.name}</h6>
                                                    <h6>{`${thumbnailPreview.size} kb`}</h6>
                                                    <button onClick={()=>{
                                                        document.getElementById("guru-intro-thumbnail").value="";
                                                        setThumbnailPreview({name:null,image:null,size:null});
                                                    }}>
                                                        <FeatherIcon icon="x-square"/>
                                                    </button>
                                                </div>
                                                
                                                }
                                            </div>
                                            {uploading.thumbnail?<Spinner color="black" className="mt-2 ml-3"/>:<button className="upload-btn mt-2" onClick={uploadHandlerThumbnail}><FeatherIcon icon="upload"/></button>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup className="upload-container">
                                            <Label>
                                                Intro Video<span className="text-danger">*</span>{' '}
                                            </Label>
                                            <input id="guru-intro-video" onChange={handleChangeVideo} type="file"/>
                                            <div className="preview-video-container">
                                                {!videoPreview.image?<h5>Select a file to upload</h5>:
                                                <div className="preview-bar">
                                                    <video src={videoPreview.image} className="preview-video" controls/>
                                                    <h6>{videoPreview.name}</h6>
                                                    <h6>{`${videoPreview.size} kb`}</h6>
                                                    <button onClick={()=>{
                                                        document.getElementById("guru-intro-video").value="";
                                                        setVideoPreview({name:null,image:null,size:null});
                                                    }}>
                                                        <FeatherIcon icon="x-square"/>
                                                    </button>
                                                </div>
                                                
                                                }
                                            </div>
                                            {uploading.video?<Spinner color="black" className="mt-2 ml-3"/>:<button className="upload-btn mt-2" onClick={uploadHandlerVideo}><FeatherIcon icon="upload"/></button>}
                                            
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
                                    onClick={handleAdd}
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
