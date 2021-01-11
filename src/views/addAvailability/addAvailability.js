import React, { useEffect, useState, useRef} from 'react'
import { Container, Row, Col, FormGroup, Spinner,Label } from 'reactstrap';
import { enGB } from 'date-fns/locale';
import FeatherIcon from 'feather-icons-react';
import { DatePickerCalendar } from 'react-nice-dates';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { TabView, TabPanel } from 'primereact/tabview';
import {Toast} from "primereact/toast";
import {useLocation} from "react-router-dom";
import 'react-nice-dates/build/style.css';
import "./style.css";
import { format } from 'date-fns';
function AddAvailability() {
    const query = new URLSearchParams(useLocation().search);
    const toast = useRef(null);
    const toast1 = useRef(null);
    const [date,setDate] = useState(null);
    const [availability,setAvailability] = useState(null);
    const [cost,setCost] = useState(30);
    const [note,setNote] = useState("");
    const [id,setId] = useState(803615196);
    const [startTime,setStartTime] = useState(new Date("Mon Jan 11 2021 8:30:01 GMT+0530 (India Standard Time)"));
    const [duration,setDuration] = useState(15);
    const [loading,setLoading] = useState(false);
    const [uploading,setUploading] = useState(false);
    const [activeIndex,setActiveIndex] = useState(0);
    const fillSlots = (input)=>{
        try{
            document.getElementById('morningList').innerHTML = '';
            document.getElementById('afternoonList').innerHTML = '';
            document.getElementById('eveningList').innerHTML = '';
            let selected=date;
            if(input){
              selected=input;
            }
            availability.forEach((a) => {
            if (a.Date === format(selected, 'yyyy/MM/dd', { locale: enGB })) {
                const listHeading = document.createElement('li');
                listHeading.className = 'heading';
                listHeading.textContent = 'Morning';
                document.getElementById('morningList').appendChild(listHeading);
                const listHeading1 = document.createElement('li');
                listHeading1.className = 'heading';
                listHeading1.textContent = 'Afternoon';
                document.getElementById('afternoonList').appendChild(listHeading1);
                const listHeading2 = document.createElement('li');
                listHeading2.className = 'heading';
                listHeading2.textContent = 'Evening';
                document.getElementById('eveningList').appendChild(listHeading2);
                a.timeSlots.forEach((timeSlot) => {
                let listName;
                if (timeSlot.startAt.split(':')[0] <= 11) {
                    listName = document.getElementById('morningList');
                } else if (
                    timeSlot.startAt.split(':')[0] >= 12 &&
                    timeSlot.startAt.split(':')[0] <= 16
                ) {
                    listName = document.getElementById('afternoonList');
                } else {
                    listName = document.getElementById('eveningList');
                }
                const listElement = document.createElement('li');
                listElement.className = 'timeSlot';
                listElement.onclick = () => {
                    listElement.classList.contains('active')
                    ? listElement.classList.remove('active')
                    : listElement.classList.add('active');
                };
                listElement.textContent = timeSlot.startAt;
                listName.appendChild(listElement);
                });
            }
        });
        }
        catch(e){
            console.log(e);
        }
        
    }
    const fetchAvailability = () =>{
        setLoading(true);
        //setId(query.get("id"));
        setAvailability( [
            {
              GuruID: '803615196',
              Date: '2020/12/31',
              timeSlots: [
                {
                  notes: ' Test1',
                  cost: {
                    minor: 10,
                    currencyCode: '£',
                    Major: 24
                  },
                  timeZone: 'GMT',
                  durationMins: 15,
                  ID: '574972432',
                  startAt: '15:00',
                  updateHistory: [
                    {
                      updateTimeStamp: '1609666586',
                      status: 'Reserved'
                    },
                    {
                      updateTimeStamp: '1609666586',
                      status: 'Available'
                    },
                    {
                      updateTimeStamp: '1609666586',
                      status: 'Reserved'
                    },
                    {
                      updateTimeStamp: '1609666586',
                      status: 'Available'
                    },
                    {
                      updateTimeStamp: '1609666586',
                      status: 'Reserved'
                    }
                  ],
                  status: 'Reserved'
                }
              ]
            },
            {
              GuruID: '803615196',
              Date: '2021/01/01',
              timeSlots: [
                {
                  notes: ' Test1',
                  cost: {
                    minor: 10,
                    currencyCode: '£',
                    Major: 24
                  },
                  timeZone: 'GMT',
                  durationMins: 15,
                  ID: '249110224',
                  startAt: '13:00',
                  updateHistory: [
                    {
                      updateTimeStamp: '1609666586',
                      status: 'Available'
                    },
                    {
                      updateTimeStamp: '1609666586',
                      status: 'Booked'
                    },
                    {
                      updateTimeStamp: '1609666586',
                      status: 'Reserved'
                    }
                  ],
                  status: 'Reserved'
                }
              ]
            },
            {
              GuruID: '803615196',
              Date: '2021/01/07',
              timeSlots: [
                {
                  notes: ' This is a very good session',
                  cost: {
                    minor: 0,
                    currencyCode: '£',
                    Major: 30
                  },
                  timeZone: 'GMT',
                  durationMins: 15,
                  ID: '873913521',
                  startAt: '10:30',
                  status: 'Available'
                },
                {
                  notes: ' This is a very good session',
                  cost: {
                    minor: 0,
                    currencyCode: '£',
                    Major: 30
                  },
                  timeZone: 'GMT',
                  durationMins: 15,
                  ID: '817110287',
                  startAt: '11:30',
                  status: 'Available'
                },
                {
                  notes: ' This is a very good session',
                  cost: {
                    minor: 0,
                    currencyCode: '£',
                    Major: 30
                  },
                  timeZone: 'GMT',
                  durationMins: 15,
                  ID: '582621531',
                  startAt: '12:30',
                  status: 'Available'
                }
              ]
            },
            {
              GuruID: '803615196',
              Date: '2021/01/10',
              timeSlots: [
                {
                  notes: ' This is a very good session',
                  cost: {
                    minor: 0,
                    currencyCode: '£',
                    Major: 30
                  },
                  timeZone: 'GMT',
                  durationMins: 15,
                  ID: '890122959',
                  startAt: '11:30',
                  status: 'Available'
                }
              ]
            }
          ]);
          setTimeout(()=>{
              setLoading(false);
              fillSlots();
          },2000);
        // fetch(`https://j6lw75i817.execute-api.us-east-2.amazonaws.com/v1/gurus/${id}/availability`).then(response=>{
        //     if(response.ok){
        //         return response.json();
        //     }
        // }).then(jsonResponse=>{
        //     return jsonResponse;
        // })
        // .then(result=>{
        //     setAvailability(result.body);
        //     setLoading(false);
        //     fillSlots();
        // }).catch(error=>{
        //     console.log(error);
        // });
    }
    useEffect(()=>{
        //setId(query.get("id"));
        fetchAvailability();
    },[])
    const addSlot = ()=>{
      setUploading(true);
      const timeSlot = {};
      timeSlot.startAt = format(startTime,'HH:mm',{locale:enGB});
      timeSlot.durationMins = duration
      timeSlot.cost = {
        currencyCode:"£",
        major:Math.floor(cost),
        minor:cost-Math.floor(cost)
      };
      timeSlot.status="available";
      timeSlot.timeZone = "GMT";
      timeSlot.note = note;
      const fetchOptions = {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({date:format(date, 'yyyy/MM/dd', { locale: enGB }),timeSlot:timeSlot})
      }
      fetch(`https://j6lw75i817.execute-api.us-east-2.amazonaws.com/v1/gurus/${id}/availability`,fetchOptions).then(response=>{
        if(response.ok){
          return response.json();
        }
        if(response.status===400&&response.message==="booking already exists for this time, can not be added"){
            toast.current.show({severity: 'error', summary: 'Slot already exists', detail: 'Sorry please choose another slot',life:5000});
            setLoading(false);
        }
      }).then(jsonResponse=>{
        return jsonResponse;
      }).then(res=>{
        toast1.current.show({severity: 'success', summary: 'Success', detail: `The slot was added to ${format(date,"yyyy/MM/dd",{locale:enGB})}`});
        setStartTime(new Date("Mon Jan 11 2021 8:30:01 GMT+0530 (India Standard Time)"));
        setDuration(15);
        setCost(30);
        setNote("");
        setLoading(false);
      })
    }
    return (
        <>
            <Toast ref={toast} position="bottom-right"></Toast>
            <section className="section">
            <Container style={{ maxWidth: '80vw', margin: '0 auto' }}>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col md={5} sm={12} className="form-container">
                    <div
                    style={{ border: '1px solid rgba(0,0,0,0.1)', width: '100%' }}
                    >
                        <DatePickerCalendar
                            locale={enGB}
                            date={date}
                            onDateChange={(date)=>{
                              fillSlots(date);
                              setDate(date);
                            }}
                        />
                    </div>
                    
                </Col>
                <Col md={6} sm={12} className="form-container">
                    <h4 className="mt-3">{date?`Selected Date: ${format(date, 'yyyy/MM/dd', { locale: enGB })}`:"No date selected"}</h4>
                    {date?
                    <TabView activeIndex={activeIndex} onTabChange={(e)=>{
                        if(e.index===1){
                            fetchAvailability();
                        }
                        setActiveIndex(e.index);
                    }}>
                        <TabPanel header="Add a slot">
                            <FormGroup className="form-group-container">
                                <label htmlFor="startTime">Start Time</label>
                                <Calendar id="startTime" value={startTime} onChange={(e) => {
                                    console.log(e.value);
                                    setStartTime(e.value)}}  timeOnly hourFormat="24" stepMinute={30} className="w-75 ml-2"/>
                            </FormGroup>
                            <FormGroup className="form-group-container">
                                {/* <label htmlFor="endTime">End Time</label>
                                <Calendar id="endTime" value={endTime} onChange={(e) => setEndTime(e.value)} timeOnly hourFormat="24" stepMinute={30}/> */}
                                <label htmlFor="endTime">Duration</label>
                                <InputNumber id="horizontal" value={duration} onValueChange={(e) => setDuration(e.value)} showButtons buttonLayout="horizontal" step={15} suffix=" minutes"
                                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" className="w-75 ml-3"/>
                            </FormGroup>
                            <FormGroup className="form-group-container">
                                {/* <label htmlFor="endTime">End Time</label>
                                <Calendar id="endTime" value={endTime} onChange={(e) => setEndTime(e.value)} timeOnly hourFormat="24" stepMinute={30}/> */}
                                <label htmlFor="endTime">Cost</label>
                                <InputNumber id="currency-us" value={cost} onValueChange={(e) => {
                                    console.log(e.value)
                                    setCost(e.value)}} mode="currency" currency="GBP" locale="en-US" className="w-75 ml-5" />
                            </FormGroup>
                            <FormGroup className="form-group-container">
                                <Label>
                                    Note
                                </Label>
                                <textarea
                                    name="comments"
                                    id="comments"
                                    rows="2"
                                    className="form-control pl-3 w-75 ml-5"
                                    placeholder="Enter session note here"
                                    value={note}
                                    onChange={(event)=>{
                                        setNote(event.target.value);
                                    }}
                                ></textarea>
                            </FormGroup>
                            {uploading?
                            <Spinner fill="black"></Spinner>
                            :
                            <button className="book-btn" onClick={addSlot}>
                                  Add Slot
                            </button>}
                        </TabPanel>
                        <TabPanel header="View Slots">
                            <div className="view-slot-container">
                                {loading?<Spinner color="#ff5001" style={{margin:"10px auto"}}></Spinner>:
                                <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(0,0,0,0.1)'
                                }}
                                >
                                    <ul className="timeSlotList mx-5" id="morningList"></ul>
                                    <ul className="timeSlotList mx-5" id="afternoonList"></ul>
                                    <ul className="timeSlotList mx-5" id="eveningList"></ul>
                                </div>
                                }
                            </div>
                            
                        </TabPanel>
                    </TabView>
                    :
                    null
                    }
                </Col>
                </Row>
            </Container>
            </section>
        </>
    )
}

export default AddAvailability
