import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col, FormGroup, Spinner, Label } from 'reactstrap';
import { enGB } from 'date-fns/locale';
import { DatePickerCalendar } from 'react-nice-dates';
import { Calendar } from 'primereact/calendar';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from "primereact/toast";
import { useLocation } from "react-router-dom";
import 'react-nice-dates/build/style.css';
import "./style.css";
import { format } from 'date-fns';
import { useSelector } from "react-redux";
import Unauthorized from '../Unauthorized/Unauthorized';
import { RadioButton } from 'primereact/radiobutton';
import { ListBox } from 'primereact/listbox';
function AddAvailability() {
  const query = new URLSearchParams(useLocation().search);
  const auth = useSelector((state) => state.auth);
  const toast = useRef(null);
  const toast1 = useRef(null);
  const [date, setDate] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [morningSlots, setMorningSlots] = useState({
    display: [],
    all: []
  });
  const [afternoonSlots, setAfternoonSlots] = useState({
    display: [],
    all: [],
  });
  const [eveningSlots, setEveningSlots] = useState({
    display: [],
    all: [],
  });
  const [startTime, setStartTime] = useState(new Date("Mon Jan 11 2021 8:00:01 GMT+0530 (India Standard Time)"));
  const [endTime, setEndTime] = useState(new Date("Mon Jan 11 2021 8:20:01 GMT+0530 (India Standard Time)"));
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTime, setActiveTime] = useState(20);
  const [activeIndex, setActiveIndex] = useState(0);
  const fillSlots = async (selectedDate) => {
    const morning = [], afternoon = [], evening = [];
    if (selectedDate) {
      availability.forEach((slot) => {
        if (slot.Date === format(selectedDate, "yyyy/MM/dd", { locale: enGB })) {
          slot.blocks.forEach((timeSlot) => {
            timeSlot.timeSlots.forEach((ts) => {
              let hour = parseInt(ts.startTime.split(":")[0], 10);
              if (hour < 12) {
                morning.push(ts);
              }
              else if (hour >= 12 && hour < 17) {
                afternoon.push(ts);
              }
              else {
                evening.push(ts);
              }
            })

          })
        }
      });
    }

    console.log(morning, afternoon, evening);
    setMorningSlots({
      display: morning,
      all: morning,
    });
    setAfternoonSlots({
      display: afternoon,
      all: afternoon,
    });
    setEveningSlots({
      display: evening,
      all: evening
    });

  }
  const fetchAvailability = async () => {
    setLoading(true);
    // setTimeout(()=>{
    //   fillSlots().then(()=>{
    //     setActiveTime(20);
    //     setLoading(false);
    //   });  
    // },2000);
    const id = query.get("id");
    return fetch(`https://j6lw75i817.execute-api.us-east-2.amazonaws.com/v1/gurus/${id}/availability`).then(response => {
      if (response.ok) {
        return response.json();
      }
    }).then(jsonResponse => {
      return jsonResponse;
    })
      .then(result => {
        console.log(result.body);
        setAvailability(result.body);
      }).catch(error => {
        console.log(error);
      });
  }
  const handleDurationChange = (event) => {
    setLoading(true)
    setActiveTime(event.value);
    const duration = event.value;
    const callback = (slot) => {
      switch (duration) {
        case 20:
          return true;
        case 40:
          let result;
          let endMinute = slot.startMinute + 40;
          let endHour = slot.startHour;
          if (endMinute >= 60) {
            endMinute = endMinute % 60;
            endHour += 1;
          }
          availability.forEach((a) => {
            a.blocks.forEach(timeSlot => {
              timeSlot.timeSlots.forEach((ts) => {
                console.log(timeSlot.endTime);
                if ((ts.startHour === endHour && ts.startMinute === endMinute) || (endHour === parseInt(timeSlot.endTime.split(":")[0], 10) && endMinute === parseInt(timeSlot.endTime.split(":")[1], 10))) {
                  result = true;
                }
              })
            })
          })
          if (!result) {
            result = false;
          }
          return result;
        case 60:
          let result2;
          let endMin = slot.startMinute + 60;
          let endHr = slot.startHour;
          if (endMin >= 60) {
            endMin = endMin % 60;
            endHr += 1;
          }
          availability.forEach((a) => {
            a.blocks.forEach(timeSlot => {
              timeSlot.timeSlots.forEach((ts) => {
                if ((ts.startHour === endHr && ts.startMinute === endMin) || (endHr === parseInt(timeSlot.endTime.split(":")[0], 10) && endMin === parseInt(timeSlot.endTime.split(":")[1], 10))) {
                  result2 = true;
                }
              })
            })
          })
          if (!result2) {
            result2 = false;
          }
          return result2;
        default:
          return false
      }
    }
    setMorningSlots((prev) => {
      return { ...prev, display: morningSlots.all.filter(callback) }
    });
    setAfternoonSlots((prev) => {
      return { ...prev, display: afternoonSlots.all.filter(callback) }
    });
    setEveningSlots((prev) => {
      return { ...prev, display: eveningSlots.all.filter(callback) }
    });
    setLoading(false);
  }
  const addSlot = () => {
    let startHour = parseInt(format(startTime, 'HH', { locale: enGB }), 10);
    let startMinute = parseInt(format(startTime, 'mm', { locale: enGB }), 10);
    const endHour = parseInt(format(endTime, 'HH', { locale: enGB }), 10);
    const endMinute = parseInt(format(endTime, 'mm', { locale: enGB }), 10);
    let timeSlotList = [];
    while (startHour <= endHour) {
      if (`${startHour}:${startMinute}` === `${endHour}:${endMinute}`) {
        break;
      }
      else {
        if (startMinute === 0) {
          timeSlotList.push({
            startTime: `${startHour}:${startMinute}0`,
            startHour: startHour,
            startMinute: startMinute,
            status: "available"
          })
        }
        else {
          timeSlotList.push({
            startTime: `${startHour}:${startMinute}`,
            startHour: startHour,
            startMinute: startMinute,
            status: "available"
          })
        }
      }
      startMinute += 20;
      if (startMinute === 60) {
        startHour += 1;
        startMinute = 0;
      }
    }
    const block = {
      startTime: format(startTime, "HH:mm", { locale: enGB }),
      endTime: format(endTime, "HH:mm", { locale: enGB }),
      timeSlots: timeSlotList
    }
    setUploading(true);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ timeZone: "GMT", date: format(date, 'yyyy/MM/dd', { locale: enGB }), block: block })
    }
    console.log({ timeZone: "GMT", date: format(date, 'yyyy/MM/dd', { locale: enGB }), block: block });
    const id = query.get('id');
    fetch(`https://j6lw75i817.execute-api.us-east-2.amazonaws.com/v1/gurus/${id}/availability`, fetchOptions).then(response => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400 && response.message === "booking already exists for this time, can not be added") {
        toast.current.show({ severity: 'error', summary: 'Slot already exists', detail: 'Sorry please choose another slot', life: 5000 });
        setUploading(false);
      }
    }).then(jsonResponse => {
      return jsonResponse;
    }).then(res => {
      toast1.current.show({ severity: 'success', summary: 'Success', detail: `The slot was added to ${format(date, "yyyy/MM/dd", { locale: enGB })}` });
      setStartTime(new Date("Mon Jan 11 2021 8:00:01 GMT+0530 (India Standard Time)"));
      setEndTime(new Date("Mon Jan 11 2021 8:20:01 GMT+0530 (India Standard Time)"));
      setUploading(false);
    })
  }
  const listOptionTemplate = (option) => {
    if (option) {
      return (
        <div className="listOption-container">
          <div>{option.startTime}</div>
        </div>
      );
    }
    return <div className="noSlot-label">No slot available</div>
  }
  useEffect(() => {
    fetchAvailability();
  }, [activeIndex, date])
  useEffect(() => {
    fillSlots(date).then(() => {
      setActiveTime(20);
      setLoading(false);
    });
  }, [availability]);
  const changeDate = async (date) => {
    setDate(date);
  }
  return (
    <>
      <Toast ref={toast} position="bottom-right"></Toast>
      <Toast ref={toast1} position="bottom-right"></Toast>
      {auth.idToken ?
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
                    onDateChange={changeDate}
                  />
                </div>

              </Col>
              <Col md={{ size: 6, offset: 1 }} sm={12} className="form-container">
                <h4 className="mt-3">{date ? `Selected Date: ${format(date, 'yyyy/MM/dd', { locale: enGB })}` : "No date selected"}</h4>
                {date ?
                  <TabView activeIndex={activeIndex} onTabChange={async (e) => {
                    setActiveIndex(e.index);
                  }}>
                    <TabPanel header="Add a slot">
                      <FormGroup className="form-group-container">
                        <label htmlFor="startTime">Start Time</label>
                        <Calendar id="startTime" value={startTime} onChange={(e) => {
                          setStartTime(e.value)
                        }} timeOnly hourFormat="24" stepMinute={20} className="w-75 ml-2" />
                      </FormGroup>
                      <FormGroup className="form-group-container">
                        <label htmlFor="startTime">End Time</label>
                        <Calendar id="startTime" value={endTime} onChange={(e) => {
                          setEndTime(e.value)
                        }} timeOnly hourFormat="24" stepMinute={20} className="w-75 ml-2" />
                      </FormGroup>
                      {uploading ?
                        <Spinner fill="black"></Spinner>
                        :
                        <button className="book-btn" onClick={addSlot}>
                          Add Slot
                            </button>}
                    </TabPanel>
                    <TabPanel header="View Slots">
                      <div className="view-slot-container">
                        {loading ? <Spinner color="#ff5001" style={{ margin: "10px auto" }}></Spinner> :
                          <div className="showAvailability-container">
                            <div className="timeSlot-container">
                              <div className="p-field-radiobutton">
                                <RadioButton inputId="20minuteSlot" name="timeSlot" value={20} onChange={handleDurationChange} checked={activeTime === 20} />
                                <label htmlFor="20minuteSlot">20 minutes</label>
                              </div>
                              <div className="p-field-radiobutton">
                                <RadioButton inputId="40minuteSlot" name="timeSlot" value={40} onChange={handleDurationChange} checked={activeTime === 40} />
                                <label htmlFor="40minuteSlot">40 minutes</label>
                              </div>
                              <div className="p-field-radiobutton">
                                <RadioButton inputId="60minuteSlot" name="timeSlot" value={60} onChange={handleDurationChange} checked={activeTime === 60} />
                                <label htmlFor="city3">60 minutes</label>
                              </div>
                            </div>
                            <div className="list-container">
                              <div className="morning-list">
                                <h5>Morning</h5>
                                <ListBox options={morningSlots.display} filter optionLabel="startTime"
                                  itemTemplate={listOptionTemplate} style={{ width: '15rem' }} listStyle={{ height: '150px' }} />
                              </div>
                              <div className="afternoon-list">
                                <h5>Afternoon</h5>
                                <ListBox options={afternoonSlots.display} filter optionLabel="startTime"
                                  itemTemplate={listOptionTemplate} style={{ width: '15rem' }} listStyle={{ height: '150px' }} />
                              </div>
                              <div className="evening-list">
                                <h5>Evening</h5>
                                <ListBox options={eveningSlots.display} filter optionLabel="startTime"
                                  itemTemplate={listOptionTemplate} style={{ width: '15rem' }} listStyle={{ height: '150px' }} />
                              </div>

                            </div>

                          </div>



                          // <div
                          // style={{
                          //     display: 'flex',
                          //     justifyContent: 'center',
                          //     border: '1px solid rgba(0,0,0,0.1)'
                          // }}
                          // >
                          //     <ul className="timeSlotList mx-5" id="morningList"></ul>
                          //     <ul className="timeSlotList mx-5" id="afternoonList"></ul>
                          //     <ul className="timeSlotList mx-5" id="eveningList"></ul>
                          // </div>
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
        :
        <Unauthorized />
      }

    </>
  )
}

export default AddAvailability
