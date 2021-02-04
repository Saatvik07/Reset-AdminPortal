import React, { useEffect, useState, useRef } from 'react'
import {
    Col,
    Container,
    Form,
    FormGroup,
    Row,
    Spinner,
    Label,
    Input,
    Card,
    CardBody
} from 'reactstrap';
import {Link} from "react-router-dom";
import { Toast } from 'primereact/toast';
import {useLocation} from "react-router-dom";
import {InputNumber} from "primereact/inputnumber";
import { TabView, TabPanel } from 'primereact/tabview';
import FeatherIcon from 'feather-icons-react';
import Banner from '../Layout/Banner/Banner';
import "../addNewGuru/style.css";
import "./style.css";
import {useSelector} from "react-redux"
import Unauthorized from '../Unauthorized/Unauthorized';
function AddNewVideo() {
    const query = new URLSearchParams(useLocation().search);
    const toast = useRef(null);
    const toast1 = useRef(null);
    const toast2 = useRef(null);
    const toast3 = useRef(null);
    const auth = useSelector(state => state.auth)
    const [guruObj,setGuruObj] = useState(null);
    const [duration,setDuration] = useState(2);
    const [id,setId] = useState("e7631a2a-8a3b-48cc-9b3f-5d224bae974a");
    const [title,setTitle] = useState("");
    const [thumbnailString,setThumbnailString] = useState("");
    const [videoString,setVideoString] = useState("");
    const [activeIndex,setActiveIndex] = useState(0);
    const [links,setLinks] = useState({
        thumbnail:"",
        video:"",
    })
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
    const [loading,setLoading] = useState(true);
    const [uploading,setUploading] = useState({profile:false,thumbnail:false,video:false,whole:false});
    const fetchGuru = async()=>{
        setLoading(true);
        const guruId = await query.get("id");
        fetch(`https://j6lw75i817.execute-api.us-east-2.amazonaws.com/v1/gurus/${guruId}`).then(response=>{
            if(response.ok){
                return response.json();
            }
        }).then(jsonResponse=>{
            return jsonResponse;
        })
        .then(result=>{
            setGuruObj(result.body);
            setLoading(false);
        }).catch(error=>{
            console.log(error);
        });
    }
    useEffect(()=>{
        fetchGuru();
    },[])
    const onUploadComplete = (type) => {
        if(type===1){
            toast.current.show({severity: 'success', summary: 'Success', detail: 'The intro video was uploaded'});
        }
        else if(type===2){
            toast1.current.show({severity: 'success', summary: 'Success', detail: 'The intro video thumbnail was uploaded'});
        }
        else if (type===3){
            toast3.current.show({severity: 'success', summary: 'Success', detail: 'The video was added successfully'})
        }
    }
    const checkValidations = () =>{
        if(title!==""&&duration!==0&&links.thumbnail!==""&&links.video!==""){
            return true;
        }
        return false;
    }
    const uploadHandlerThumbnail = (event)=>{
        setUploading((prev)=>{
            return {...prev,thumbnail:true}
        })
        const guruName = guruObj.firstName+" "+guruObj.lastName;
        const guruId = query.get("id");
        const fetchOptions = {
			method: "POST",
			body: JSON.stringify({guruName:guruName,guruID:guruId,videoID:guruObj.techniqueVideos.videoID,type:"thumbnail",timeStamp:~~(+new Date() / 1000)}),
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
        const guruName=guruObj.firstName+" "+guruObj.lastName;
        const guruId = query.get("id");
        console.log(guruId);
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({guruName:guruName,guruID:guruId,videoID:guruObj.techniqueVideos.videoID,type:"normal",timeStamp:~~(+new Date() / 1000)}),
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
            let blobData = new Blob([new Uint8Array(blobArray)],{type:'video/mp4'});
            const result = await fetch(resObj.uploadURL,{method:"PUT",body:blobData});
            setUploading((prev)=>{
                return {...prev,video:false}
            })
            setLinks((prev)=>{
                return {...prev,video:resObj.uploadURL.split("?")[0]}
            })
            console.log(resObj.uploadURL.split("?")[0]);
            onUploadComplete(1);
        
        }).catch(err=>{
            console.log(err);
        });
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
    const handleAdd = async(event)=>{
        event.preventDefault();
        
        const valid = checkValidations();
        if(!valid){
            toast2.current.show({severity: 'error', summary: 'All fields are mandatory', detail: 'Please check that all fields are completely filled'});
        }
        else{
            setUploading((prev)=>{
                return {...prev,whole:true}
            })
            const videoList = guruObj.techniqueVideos.videoList;
            let videoObj = {
                title:title,
                duration:duration,
                thumbnail:links.thumbnail,
                video:links.video
            }
            videoList.push(videoObj);
            const fetchOptions = {
                method: "PUT",
                headers:{
                "Content-Type":"application/json"
                },
                body: JSON.stringify({techniqueVideos:{
                    videoID:guruObj.techniqueVideos.videoID+1,
                    videoList:videoList
                }}),
            }
            const guruId = await query.get("id");
            fetch(`https://j6lw75i817.execute-api.us-east-2.amazonaws.com/v1/gurus/${guruId}`,fetchOptions).then(response=>{
                if(response.ok){
                    return response.json();
                }
            })
            .then(jsonResponse=>{
                return jsonResponse;
            })
            .then(resObj=>{
                onUploadComplete(4);
                setTitle("");
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
                    thumbnail:"",
                    video:"",
                })
                document.getElementById("guru-intro-video").value="";
                document.getElementById("guru-intro-thumbnail").value="";
                setUploading((prev)=>{
                    return {...prev,whole:false}
                })
                window.scroll({top: 0, left: 0, behavior: 'smooth' });
                onUploadComplete(3);
            })

        }

    }
    return (
        <div>
            <Toast ref={toast} position="bottom-right"></Toast>
            <Toast ref={toast1} position="bottom-right"></Toast>
            <Toast ref={toast2} position="bottom-right"></Toast>
            <Toast ref={toast3} position="bottom-right"></Toast>
            {auth.idToken?
                !loading ? 
                <>
                    <TabView activeIndex={activeIndex} onTabChange={(e)=>{
                        if(e.index===1){
                            fetchGuru();
                        }
                        setActiveIndex(e.index);
                    }}>
                        <TabPanel header="Add Video">
                            <Banner title="Add New Video"/>
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
                                                        Video title <span className="text-danger">*</span>
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
                                                        placeholder="Title"
                                                        value={title}
                                                        onChange={(event)=>{
                                                            setTitle(event.target.value);
                                                        }}
                                                    />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                    <Label>
                                                        Duration <span className="text-danger">*</span>
                                                    </Label>
                                                    <div className="position-relative">
                                                        
                                                    </div>
                                                    <InputNumber id="duration" value={duration} showButtons buttonLayout="horizontal" step={1} decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" onValueChange={(e) => setDuration(e.value)} suffix=" minutes" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={12}>
                                                    <FormGroup className="upload-container">
                                                        <Label>
                                                            Video Thumbnail<span className="text-danger">*</span>{' '}
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
                                                            <div className="upload-btn-container">
                                                                {uploading.thumbnail?<Spinner color="black" className="mt-2 ml-3"/>:<button className="upload-btn mt-2" onClick={uploadHandlerThumbnail}><FeatherIcon icon="upload"/></button>}
                                                            </div>
                                                        </div>
    
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
                                                            <div className="upload-btn-container">
                                                                {uploading.video?<Spinner color="black" className="mt-2 ml-3"/>:<button className="upload-btn mt-2" onClick={uploadHandlerVideo}><FeatherIcon icon="upload"/></button>}
                                                            </div>
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                            <Col sm={12}>
                                                {uploading.whole?
                                                    <Spinner color="#ff5001"></Spinner>
                                                    :
                                                    <input
                                                    type="submit"
                                                    id="submit"
                                                    name="send"
                                                    className="touch-btn"
                                                    value="Add"
                                                    onClick={handleAdd}
                                                    />
                                                }
                                                
                                            </Col>
                                            </Row>
                                        </Form>
                                        </Col>
                                    </Row>
                                    </div>
                                </Col>
                                </Row>
                            </Container>
                        </TabPanel>
                        <TabPanel header = "View Videos">
                            <Container>
                                <Row>
                                {guruObj.techniqueVideos.videoList && guruObj.techniqueVideos.videoList.length>0 ?
                                    guruObj.techniqueVideos.videoList.map((video, key) =>
                                        key % 2 === 0 ? (
                                        <Col lg={6} xs={12} key={key} className="mb-4 pb-2">
                                            <Card className="blog rounded border-0 shadow overflow-hidden">
                                            <Row className="align-items-center no-gutters">
                                                <Col md={6}>
                                                <img
                                                    src={video.thumbnail}
                                                    className="img-fluid"
                                                    alt="thumbnail"
                                                />
                                                </Col>
    
                                                <Col md={6}>
                                                <CardBody className="content">
                                                    <h5>
                                                    <a
                                                        href={video.video}
                                                        rel="noreferrer"
                                                        target="_blank"
                                                        className="card-title title text-dark"
                                                    >
                                                        {video.title}
                                                    </a>
                                                    </h5>
                                                    
                                                    <div className="post-meta d-flex justify-content-between mt-3">
                                                    <ul className="list-unstyled mb-0">
                                                        <li className="list-inline-item mr-2 mb-0">
                                                            <i className="mr-2">
                                                                <FeatherIcon icon="clock"/>
                                                            </i>
                                                            {`${video.duration} mins`}
                                                        </li>
                                                    </ul>
                                                    <a
                                                        href={video.video}
                                                        rel="noreferrer"
                                                        target="_blank"
                                                        className="text-muted readmore"
                                                    >
                                                        Watch{" "}
                                                        <i>
                                                            <FeatherIcon icon="chevron-right"/>
                                                        </i>
                                                    </a>
                                                    </div>
                                                </CardBody>
                                                </Col>
                                            </Row>
                                            </Card>
                                        </Col>
                                        ) : (
                                        <Col lg={6} xs={12} key={key} className="mb-4 pb-2">
                                            <Card className="blog rounded border-0 shadow overflow-hidden">
                                            <Row className="align-items-center no-gutters">
                                                <Col md={{ size: 6, order: 1 }} xs={{ order: 2 }}>
                                                <CardBody className="content">
                                                    <h5>
                                                    <a
                                                        href={video.video}
                                                        rel="noreferrer"
                                                        target="_blank"
                                                        className="card-title title text-dark"
                                                    >
                                                        {video.title}
                                                    </a>
                                                    </h5>
                                                    
                                                    <div className="post-meta d-flex justify-content-between mt-3">
                                                    <ul className="list-unstyled mb-0">
                                                        <li className="list-inline-item mr-2 mb-0">
                                                            <i className="mr-2">
                                                                <FeatherIcon icon="clock"/>
                                                            </i>
                                                            {`${video.duration} mins`}
                                                        </li>
                                                    </ul>
                                                    <a
                                                        href={video.video}
                                                        rel="noreferrer"
                                                        target="_blank"
                                                        className="text-muted readmore"
                                                    >
                                                        Watch{" "}
                                                        <i>
                                                            <FeatherIcon icon="chevron-right"/>
                                                        </i>
                                                    </a>
                                                    </div>
                                                </CardBody>
                                                </Col>
                                                <Col md={{ size: 6, order: 2 }} xs={{ order: 1 }}>
                                                <img
                                                    src={video.thumbnail}
                                                    className="img-fluid"
                                                    alt="thumbnail"
                                                />
                                                </Col>
                                            </Row>
                                            </Card>
                                        </Col>
                                        )):
                                        <div className="no-video-container">
                                            <h3>There are no technique videos</h3>
                                        </div>
                                }
                                </Row>
                            </Container>
                        </TabPanel>
                    </TabView>
                    
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
                :
                <Unauthorized/>
            }
            
        </div>
    )
}

export default AddNewVideo
