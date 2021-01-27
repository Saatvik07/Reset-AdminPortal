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
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import FeatherIcon from 'feather-icons-react';
import { MultiSelect } from 'primereact/multiselect';
import {useLocation} from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import {Button} from "primereact/button";
import "./style.css"
import Banner from '../Layout/Banner/Banner';
import {useSelector} from "react-redux";
import Unauthorized from '../Unauthorized/Unauthorized';
function UpdateGuru() {
    const query = new URLSearchParams(useLocation().search);
    const toast = useRef(null);
    const toast1 = useRef(null);
    const toast2 = useRef(null);
    const toast3 = useRef(null);
    const toast4 = useRef(null);
    const auth = useSelector(state => state.auth)
    const [name,setName] = useState({firstName:"",secondName:""});
    const [id,setId] = useState("");
    const [activeIndex,setActiveIndex] = useState(0);
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
    const [displayDialog,setDisplayDialog] = useState({
        data:false,
        profile:false,
        introVideo:false,
    });
    const [change,setChange] = useState(null);
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
    const [guruObj,setGuruObj] = useState(null);
    const [loading,setLoading] = useState({keyword:true,filter:true,category:true,guruObj:true});
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
    }
    const fetchGuruData = async ()=>{
        setLoading((prev)=>{
            return {...prev,guruObj:true}
        })
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
                const guruObj = result.body;
                console.log(guruObj);
                setName({firstName:guruObj.firstName,secondName:guruObj.lastName});
                setEmail(guruObj.email);
                setBio(guruObj.bio);
                //setLinks({profile:guruObj.profilePhoto,thumbnail:guruObj.introVideo.photo,video:guruObj.introVideo.video});
                setSelectedCategory(guruObj.categories);
                setSelectedKeyword(guruObj.keywords);
                setSelectedFilter(guruObj.filters);
                setLoading((prev)=>{
                    return {...prev,guruObj:false}
                })
            })
    }
    useEffect(()=>{
        setId(query.get("id"));
        fetchCategories();
        fetchFilters();
        fetchKeywords();
        fetchGuruData();
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
    const uploadHandlerProfile = (event)=>{
        setUploading((prev)=>{
            return {...prev,profile:true}
        })
        const guruName=name.firstName+" "+name.secondName;
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({guruName:guruName,type:"profile",timeStamp:~~(+new Date() / 1000)}),
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
			body: JSON.stringify({guruName:guruName,type:"thumbnail",timeStamp:~~(+new Date() / 1000)}),
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
            body: JSON.stringify({guruName:guruName,videoID:videoID,type:"intro",timeStamp:~~(+new Date() / 1000)}),
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
    const handleUpdate = (type)=>{
        if(change.length>0){
            let updateObj = {};
            let introVideoObj ={...guruObj.introVideo};
            change.forEach(changeObj=>{
                if(changeObj.id==="categories")
                    updateObj[`${changeObj.id}`] = selectedCategory;
                else if (changeObj.id==="filters")
                    updateObj[`${changeObj.id}`] = selectedFilter;
                else if (changeObj.id==="keywords")
                    updateObj[`${changeObj.id}`] = selectedKeyword;
                else if (changeObj.id==="thumbnail")
                    introVideoObj.photo = links.thumbnail;
                else if (changeObj.id==="video")
                    introVideoObj.video = links.video;
                else
                    updateObj[`${changeObj.id}`] = changeObj.new;
            })
            if(type==="intro"){
                updateObj["introVideo"] = introVideoObj;
            }
            console.log(updateObj);
            const fetchOptions = {
                method: "PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(updateObj),
            }
            fetch(`https://j6lw75i817.execute-api.us-east-2.amazonaws.com/v1/gurus/${id}`,fetchOptions).then(response=>{
                if(response.ok){
                    return response.json();
                }
            })
            .then(jsonResponse=>{
                return jsonResponse;
            })
            .then(resObj=>{
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
                try{
                    document.getElementById("guru-profile").value="";
                }
                catch(e){

                }
                try{
                    document.getElementById("guru-intro-video").value="";
                }
                catch(e){

                }
                try{
                    document.getElementById("guru-intro-thumbnail").value="";
                }
                catch(e){

                }
                setActiveIndex(0);
                setDisplayDialog({
                    profile:false,
                    data:false,
                    introVideo:false,
                })
                fetchGuruData();
                toast4.current.show({severity: 'success', summary: 'Update Successfully', detail: `${guruObj.firstName} ${guruObj.lastName}'s profile was updated successfully`});
            })
        }
        else{
            toast3.current.show({severity: 'error', summary: 'No changes found', detail: 'Please make changes to the existing values to update them'});
        }
    }
    const handleUpdateData = (event)=>{
        event.preventDefault();
        const changeArray=[];
        if(!(guruObj.firstName===name.firstName)){
            changeArray.push({
                name:"First Name",
                id:"firstName",
                new:name.firstName,
                old:guruObj.firstName,
            })
        }
        
        if(!(guruObj.lastName===name.secondName)){
            changeArray.push({
                name:"Last Name",
                id:"lastName",
                new:name.secondName,
                old:guruObj.lastName,
            })
        }
        if(!(guruObj.email===email)){
            changeArray.push({
                name:"Email ID",
                id:"email",
                new:email,
                old:guruObj.email,
            })
        }
        if(!(guruObj.bio===bio)){
            changeArray.push({
                name:"Bio",
                id:"bio",
                new:bio,
                old:guruObj.bio,
            })
        }
        let oldCategories = "";
        guruObj.categories.forEach(category=>{
            oldCategories+=(category.name+", ");
        })
        let newCategories ="";
        selectedCategory.forEach(category=>{
            newCategories+=(category.name+", ");
        })
        if(!(newCategories===oldCategories)){
            changeArray.push({
                name:"Categories",
                id:"categories",
                new:newCategories,
                old:oldCategories,
            })
        }
        let oldFilters = "";
        guruObj.filters.forEach(filter=>{
            oldFilters+=(filter.name+", ");
        })
        let newFilters ="";
        selectedFilter.forEach(filter=>{
            newFilters+=(filter.name+", ");
        })
        if(!(newFilters===oldFilters)){
            changeArray.push({
                name:"Filters",
                id:"filters", 
                new:newFilters,
                old:oldFilters,
            })
        }
        let oldKeywords = "";
        guruObj.keywords.forEach(keyword=>{
            oldKeywords+=(keyword.name+", ");
        })
        let newKeywords ="";
        selectedKeyword.forEach(keyword=>{
            newKeywords+=(keyword.name+", ");
        })
        if(!(newKeywords===oldKeywords)){
            changeArray.push({
                name:"Keywords",
                id:"keywords",
                new:newKeywords,
                old:oldKeywords,
            })
        }
        setChange(changeArray);
        setDisplayDialog((prev)=>{
            return {...prev,data:true}
        });

    }
    const handleUpdateProfile = (event)=>{
        event.preventDefault();
        const changeArray = [];
        if(links.profile!==""){
            changeArray.push({
                id:"profilePhoto",
                name:"Profile",
                old:guruObj.profilePhoto,
                new:links.profile,
            })
        }
        // changeArray.push({
        //     name:"Profile Picture",
        //     id:"profilePhoto",
        //     old:guruObj.profilePhoto,
        //     new:guruObj.profilePhoto,
        // })
        setChange(changeArray);
        setDisplayDialog((prev)=>{
            return {
                ...prev,
                profile:true,
            }
        })
    }
    const handleUpdateIntro = (event) =>{
        event.preventDefault();
        const changeArray=[];
        if(links.thumbnail!==""){
            changeArray.push({
                id:"thumbnail",
                name:"Intro Video Thumbnail",
                old:guruObj.introVideo.photo,
                new:links.thumbnail,
            })
        }
        if(links.video!==""){
            changeArray.push({
                name:"Intro Video",
                id:"video",
                old:guruObj.introVideo.video,
                new:links.video,
            })
        }
        // changeArray.push({
        //     name:"Intro Video Thumbnail",
        //     type:"thumbnail",
        //     id:"thumbnail",
        //     old:guruObj.introVideo.photo,
        //     new:guruObj.introVideo.photo,
        // })
        // changeArray.push({
        //     name:"Intro Video",
        //     type:"video",
        //     id:"video",
        //     old:guruObj.introVideo.video,
        //     new:guruObj.introVideo.video,
        // })
        setChange(changeArray);
        setDisplayDialog((prev)=>{
            return {
                ...prev,
                introVideo:true,
            }
        })
    }
    const footer =(type) => {
        return (<div className="comparison-footer">
            <Button label="Cancel" icon="pi pi-times" onClick={() => setDisplayDialog((prev)=>{
                const obj = {...prev};
                obj[`${type}`]=false;
                return obj
            })} className="cancel-btn" />
            <Button label="Update" icon="pi pi-check" onClick={()=>{handleUpdate(type)}} autoFocus className="update-confirm-btn" />
        </div>);
    }
    return (
        <div>
            <Toast ref={toast} position="bottom-right"></Toast>
            <Toast ref={toast1} position="bottom-right"></Toast>
            <Toast ref={toast2} position="bottom-right"></Toast>
            <Toast ref={toast3} position="bottom-right"></Toast>
            <Toast ref={toast4} position="bottom-right"></Toast>
            <Dialog header="Your Changes" visible={displayDialog.data} style={{ width: '80vw' }} footer={footer("profile")} onHide={() => setDisplayDialog((prev)=>{
                return {...prev,data:false}
            })}>
                <div className="comparison-container">
                {change?
                    change.length>0?
                        change.map((change)=>{
                        return (
                            <>
                                <h5 className="comparison-heading">{change.name}</h5>
                                <div className="comparison-parent">
                                    <div className="comparison-left"><h6>{change.old}</h6></div>
                                    <div className="comparison-right"><h6>{change.new}</h6></div>
                                </div>
                            </>);
                        })
                        :
                        <h4>There are no changes</h4>
                    :
                    null
                }
                </div>
            </Dialog>
            <Dialog header="Your Changes" visible={displayDialog.profile} style={{ width: '80vw' }} footer={footer("data")} onHide={() => setDisplayDialog((prev)=>{
                return {...prev,profile:false}
            })}>
                <div className="comparison-container">
                {change?
                    change.length>0?
                        change.map((change)=>{
                        return (
                            <>
                                <h5 className="comparison-heading">{change.name}</h5>
                                <div className="comparison-parent">
                                    <div className="comparison-left"><img src={change.old} alt="old" className="comparison-img"/></div>
                                    <div className="comparison-right"><img src={change.new} alt="new" className="comparison-img"/></div>
                                </div>
                            </>);
                        })
                        :
                        <h4>There are no changes</h4>
                    :
                    null
                }
                </div>
            </Dialog>
            <Dialog header="Your Changes" visible={displayDialog.introVideo} style={{ width: '80vw' }} footer={footer("intro")} onHide={() => setDisplayDialog((prev)=>{
                return {...prev,introVideo:false}
            })}>
                <div className="comparison-container">
                {change?
                    change.length>0?
                        change.map((change)=>{
                        if(change.id==="video"){
                            
                            return <>
                                <h5 className="comparison-heading">{change.name}</h5>
                                <div className="comparison-parent">
                                    <div className="comparison-left"><video src={change.old} className="comparison-video" controls/></div>
                                    <div className="comparison-right"><video src={change.new} className="comparison-video"controls/></div>
                                </div>
                            </>
                        }
                        else{
                            return  <>
                                <h5 className="comparison-heading">{change.name}</h5>
                                <div className="comparison-parent">
                                    <div className="comparison-left"><img src={change.old} alt="old" className="comparison-img"/></div>
                                    <div className="comparison-right"><img src={change.new} alt="new" className="comparison-img"/></div>
                                </div>
                            </>
                        }
                        
                        })
                        :
                        <h4>There are no changes</h4>
                    :
                    null
                }
                </div>
            </Dialog>
            {auth.idToken?
                !loading.category && !loading.filter && !loading.keyword && !loading.guruObj ? 
                <>
                    <Banner title="Update Guru Profile"/>
                    <Container>
                        <Row className="justify-content-center">
                        <Col lg={10} xs={12}>
                            <div className="rounded p-4 shadow">
                            <Row>
                                <Col xs={12}>
                                <Form>
                                    <TabView activeIndex={activeIndex} onTabChange={(event)=>{
                                        setChange([]);
                                        setActiveIndex(event.index);
                                    }} className="update-tabview">
                                        <TabPanel header="Data">
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                    <Label>
                                                        Guru Name
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
                                                        value={name.secondName}
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
                                                        Bio
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
                                                        className="form-control bio-textarea pl-5"
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
                                                            Select Categories
                                                        </Label>
                                                        <MultiSelect value={selectedCategory} options={categories}  onChange={(e) => setSelectedCategory(e.value)} optionLabel="name" placeholder="" filter className="multiselect-custom" itemTemplate={itemTemplate} selectedItemTemplate={itemTemplate} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={12}>
                                                    <FormGroup className="multiselect-container">
                                                        <Label>
                                                            Select Filters
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
                                                            Select Keywords
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
                                                    value="Update Data"
                                                    onClick={handleUpdateData}
                                                    />
                                                </Col>
                                            </Row>
                                        </TabPanel>
                                        <TabPanel header="Profile">
                                            <Row>
                                                <Col md={12}>
                                                    <FormGroup className="upload-container">
                                                        <div className="current-profile-container">
                                                            <img src={guruObj.profilePhoto} className="current-profile-img" alt="current-profile"/>
                                                        </div>
                                                        <Label>
                                                            Upload new Profile Photo
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
                                                            <div className="upload-btn-container">
                                                                {uploading.profile?<Spinner color="black" className="mt-2 ml-3"/>:<button className="upload-btn mt-2" onClick={uploadHandlerProfile}><FeatherIcon icon="upload"/></button>}
                                                            </div>
                                                        </div>
                                                        
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
                                                    value="Update Profile"
                                                    onClick={handleUpdateProfile}
                                                    />
                                                </Col>
                                            </Row>
                                        </TabPanel>
                                        <TabPanel header="Intro Video">
                                            <Row>
                                                <Col md={12}>
                                                    <FormGroup className="upload-container">
                                                        <div className="current-profile-container">
                                                            <img src={guruObj.introVideo.photo} className="current-profile-img" alt="current-profile"/>
                                                        </div>
                                                        <Label>
                                                            Update Intro Video Thumbnail
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
                                                    <div className="current-profile-container">
                                                            <video src={guruObj.introVideo.video} className="current-profile-img" controls/>
                                                        </div>
                                                        <Label>
                                                            Update Intro Video
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
                                                    <input
                                                    type="submit"
                                                    id="submit"
                                                    name="send"
                                                    className="touch-btn"
                                                    value="Update Data"
                                                    onClick={handleUpdateIntro}
                                                    />
                                                </Col>
                                            </Row>
                                        </TabPanel>
                                    </TabView>
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
                :
                <Unauthorized/>
            }
        </div>
    )
}

export default UpdateGuru

