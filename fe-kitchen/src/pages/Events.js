import 'date-fns';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer, toast } from 'react-toastify';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import EventImages from '../components/Events/EventImages';
import Products from '../components/Events/Products';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import '../css/EventsCss.css'

const useForceUpdate = () => useState()[1];

const EventsPage = (props) => {

    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [announcement, setAnnouncement] = useState([]);
    const [images, setImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({});
    const [selectedDate, setSelectedDate] = useState();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        axios.get("https://lydias-kitchen.herokuapp.com/3/allEvents")
            .then(res => {
                let allEvents = res.data.events;
                setEvents(allEvents);
                let currEvent = allEvents.find(e => { return e.isCurrentEvent === true });
                if (currEvent !== undefined) {
                    setTitle(currEvent.title);
                    setDescription(currEvent.description);
                    setAnnouncement(currEvent.announcement);
                    setCurrentEvent(currEvent);
                    const date = new Date(currEvent.date);
                    setSelectedDate(date);
                    setImages(currEvent.images);
                }
            })
            .catch(err => {
                console.log(err);
            });
        axios.get('https://lydias-kitchen.herokuapp.com/all-products')
            .then(res => {
                setProducts(res.data.products);
            }).catch(err => {
                console.log(err)
            });
    }, []);
      //after order alertMessage is updated
  useEffect(() => {
    switch(alertType){
      case 'error':
        toast.error(alertMessage, 
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressbar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          }
        );
        break;
      case 'success':
        toast.success(alertMessage, 
          {
            position: "top-center",
            autoClose: 4000,
            hideProgressbar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          }
        );
        break;
    }
  }, [alertType]);

useEffect( () => {
    console.log(currentEvent);
}, [currentEvent])

    const handleTextboxChanges = (e) => {
        let event = currentEvent;
        switch(e.target.id){
            case('title'):
                event.title = e.target.value;
                setTitle(e.target.value);
                break;
            case('description'):
                event.description = e.target.value;
                setDescription(e.target.value);
                break;
            case('announcement'):
                event.announcement = e.target.value;
                setAnnouncement(e.target.value);
                break;
        }
        setCurrentEvent(event);
    };

    const handleCheckboxClick = (e) => {
        let id = e.target.id;
        let isCurrentEvent = e.target.checked;
        axios.post('https://lydias-kitchen.herokuapp.com/3/updateCurrentEvent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            cdata: {
                id: id,
                isCurrentEvent: isCurrentEvent
            }
        }).then(res => {
            if (!res.status === 200) {
                setAlertType('error');
                setAlertMessage(res.status + ' : ' + res.statusText);
                return;
            }
            return res;
        }).then(data => {
            if(data.data.uE.isCurrentEvent){
                setCurrentEvent(data.data.uE);
            } else {
                setCurrentEvent({})
            }
            setAlertType('success');
            setAlertMessage('Current Event has been changed!');
            return data;
        }).catch(err => {
            setAlertType('error');
            setAlertMessage(err);
            return;
        });
        window.location.reload(true);
    };

    const handleSaveClick = () => {

        let event = currentEvent;
        axios.post('https://lydias-kitchen.herokuapp.com/3/saveEvent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            cdata: {
                event: event,
            }
        }).then(res => {
            if (!res.status === 200) {
                setAlertType('error');
                setAlertMessage(res.status + ' : ' + res.statusText);
                return;
            }
            return res;
        }).then(data => {
            setAlertType('success');
            setAlertMessage('Current Event has been saved!');
            return data;
        }).catch(err => {
            setAlertType('error');
            setAlertMessage(err);
            return;
        });
        window.location.reload(true);
    };

    const forceUpdate = useForceUpdate();

    const handleDeleteClick = (e) => {
        let event = currentEvent;
        axios.post('https://lydias-kitchen.herokuapp.com/3/deleteCurrentEvent', {
            cdata: { id: event._id }
        }).then(res => {
            if (!res.status === 200) {
                setAlertType('error');
                setAlertMessage(res.status + ' : ' + res.statusText);
                return;
            }
            return res;
        }).catch(err => {
            setAlertType('error');
            setAlertMessage(err);
            return;
        })
        window.location.reload(true);
    };

    const handleDateChange = (date) => {
        let event = currentEvent;
        setSelectedDate(date);
        event.date = date;
        setCurrentEvent(event);
    };

    const handleImageChange = (imgs) => {
        let event = currentEvent;
        if(images !== imgs){
            setImages(imgs);
        }
        event.images = imgs;
        setCurrentEvent(event);
    }

    const handleAddRemoveProduct = (e) => {
        let event = currentEvent ? currentEvent : {};
        let products = event.products ? event.products: [];
        if (e.target.checked) {
            products.push(e.target.value);
        }
        else {
            const idx = event.products.findIndex(p => p === e.target.value);
            if (idx !== -1) {
                products.splice(idx, 1);
            }
        }
        event.products = products;
        setCurrentEvent(event);
        console.log(currentEvent);
    };

    const useStyles = makeStyles(theme => ({
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
            backgroundColor: '#A7414A',
            '&:hover': {
                backgroundColor: '#6A8A82',
            },
        },
    }));

    const classes = useStyles();

    return (
        <div className='events-ctr'>
            <h3>Current Event</h3>
            <div className='edit-event__ctr'>
                <form id='edit-event__form'>
                    <TextField onChange={handleTextboxChanges} value={title} id='title' className='event-form__input' label='Title' required placeholder='Title' variant='outlined' />
                    <TextField onChange={handleTextboxChanges} value={description} id='description' className='event-form__input' label='Description' required placeholder='Description' variant='outlined' />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            required
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Event Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    {/* <input
                        accept="image/*"
                        className='images-input'
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span" className='btn'>
                            Upload
                        </Button>
                    </label> */}
                    <EventImages images={images} handleImageChange={handleImageChange} />
                    <Products products={products} event={currentEvent} handleAddRemoveProduct={handleAddRemoveProduct} />
                    <TextField onChange={handleTextboxChanges} value={announcement} id='announcement' className='event-form__input' label='Announcement' required placeholder='Announcement' variant='outlined' />
                    <div className='btns'>
                        <Button id='delete' onClick={handleDeleteClick} label="Delete" className={classes.button}>
                            Delete
                    </Button>
                        <Button id='save' onClick={handleSaveClick} label="Save" className={classes.button}>
                            Save
                    </Button>
                    </div>
                </form>
            </div>
            <h3>All Events</h3>
            <div className='events-list'>
                <ul>
                    {events && events.map(e => {
                        return (<li key={e._id}>
                            <FormControlLabel
                                control={<Checkbox
                                    id={e._id}
                                    className='ckbox'
                                    color='primary'
                                    value={1}
                                    name={`${e.id}`}
                                    key={`${e.id}`}
                                    checked={e._id === currentEvent._id ? true : false}
                                    onChange={handleCheckboxClick}
                                />}
                                label={e.title}
                            />
                        </li>);
                    })}
                </ul>
            </div>
        </div>
    );
};

export default EventsPage;