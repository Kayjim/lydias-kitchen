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

    useEffect(() => {
        axios.get("https://lydias-kitchen.herokuapp.com/3/allEvents")
        //axios.get("https://localhost:4000/3/allEvents")
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
    }, [currentEvent]);

    // useEffect(() => {
    //     console.log(currentEvent);
    // }, [currentEvent])

    const handleTextboxChanges = (e) => {
        let event = currentEvent;
        switch (e.target.id) {
            case ('title'):
                event.title = e.target.value;
                setTitle(e.target.value);
                break;
            case ('description'):
                event.description = e.target.value;
                setDescription(e.target.value);
                break;
            case ('announcement'):
                event.announcement = e.target.value;
                setAnnouncement(e.target.value);
                break;
        }
        setCurrentEvent(event);
    };

    const handleCheckboxClick = (e) => {
        let id = e.target.id;
        let isCurrentEvent = e.target.checked;
        //axios.post('https://lydias-kitchen.herokuapp.com/3/updateCurrentEvent', {
        axios.post('http://localhost:4000/3/updateCurrentEvent', {  
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
                toast.error(res.status + ' : ' + res.statusText, {
                    position: toast.POSITION.TOP_CENTER
                });
                return;
            } else {
                toast.success('The current event has been updated successfully!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            return res;
        }).then(data => {
            if (data.data.uE.isCurrentEvent) {
                setCurrentEvent(data.data.uE);
            } else {
                setCurrentEvent({})
            }
            return data;
        }).catch(err => {
            toast.error(err, {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        });
    };

    const handleSaveClick = () => {
        debugger;
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
                toast.error(res.status + ' : ' + res.statusText, {
                    position: toast.POSITION.TOP_CENTER
                });
                return;
            }
            return res;
        }).then(data => {
            toast.success('Current Event has been saved!', {
                position: toast.POSITION.TOP_CENTER
            });
            return data;
        }).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        });
    };

    const handleDeleteClick = (e) => {
        let event = currentEvent;
        axios.post('https://lydias-kitchen.herokuapp.com/3/deleteCurrentEvent', {
            cdata: { id: event._id }
        }).then(res => {
            if (!res.status === 200) {
                toast.success(res.status + ' : ' + res.statusText, {
                    position: toast.POSITION.TOP_CENTER
                });
                return;
            }
            return res;
        }).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        })
        window.location.reload();
    };

    const handleDateChange = (date) => {
        let event = currentEvent;
        setSelectedDate(date);
        event.date = date;
        setCurrentEvent(event);
    };

    const handleImageChange = (imgs) => {
        let event = currentEvent;
        if (images !== imgs) {
            setImages(imgs);
        }
        event.images = imgs;
        setCurrentEvent(event);
    }

    const handleAddRemoveProduct = (e) => {
        let event = currentEvent ? currentEvent : {};
        let products = event.products ? event.products : [];
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
        },
        deleteBtn: {
            backgroundColor: '#A7414A',
            '&:hover': {
                backgroundColor: '#6A8A82',
            },
        },
        saveBtn: {
            backgroundColor: '#6A8A82',
            '&:hover': {
                backgroundColor: '#A7414A',
            },
        },
        eventsCtr: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px'
        },
        editEventCtr: {
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid black',
            padding: '10px',
            alignItems: 'center'
        },
        editEventForm: {
            display: 'flex',
            flexDirection: 'column'
        },
        input: {
            alignSelf: 'center',
            margin: '5px 0'
        },
        eventTitle: {
            maxWidth: '70%',
            minWidth: '70%'
        },
        btnCtr: {
            marginLeft: 'auto'
        }
    }));

    const classes = useStyles();

    return (
        <div className={classes.eventsCtr}>
            <div className={classes.editEventCtr}>
            <h3>Current Event</h3>
                <form className={classes.editEventForm}>
                    <TextField className={`${classes.eventTitle} ${classes.input}`} onChange={handleTextboxChanges} value={title} id='title' label='Title' required placeholder='Title' variant='outlined' />
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
                    <div className={classes.btnCtr}>
                        <Button id='delete' onClick={handleDeleteClick} label="Delete" className={`${classes.button} ${classes.deleteBtn}`}>
                            Delete
                    </Button>
                        <Button id='save' onClick={handleSaveClick} label="Save" className={`${classes.button} ${classes.saveBtn}`}>
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