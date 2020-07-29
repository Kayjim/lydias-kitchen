import 'date-fns';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import EventImages from '../components/Events/EventImages';
import Products from '../components/Events/Products';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import '../css/EventsCss.css'

const EventsPage = (props) => {

    const [events, setEvents] = useState([]);
    const [images, setImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentEvent, setCurrentEvent] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [objEP, setObjEP] = useState({});

    useEffect(() => {
        axios.get("http://localhost:4000/3/allEvents")
            .then(res => {
                let allEvents = res.data.events;
                setEvents(allEvents);
                let currEvent = allEvents.find(e => { return e.isCurrentEvent === true });
                if (currEvent !== undefined) {
                    setCurrentEvent(currEvent);
                    const date = new Date(currEvent.date);
                    setSelectedDate(date);
                    setImages(currEvent.images);
                }
                debugger;
            })
            .catch(err => {
                console.log(err);
            });
        axios.get('http://localhost:4000/all-products')
            .then(res => {
                setProducts(res.data.products);
            }).catch(err => {
                console.log(err)
            });
    }, []);

    const handleTextboxChanges = (e) => {

    };

    const handleCheckboxClick = (e) => {

    };

    const handleSaveClick = (e) => {

    };

    const handleDeleteClick = (e) => {

    };

    const handleDateChange = (date) => {
        console.log(typeof (date));
        setSelectedDate(date);
    };

    const handleAddRemoveProduct = (e) => {
        let event = currentEvent;
        debugger;
        if (e.target.checked) {
            event.products.push(e.target.value);
        }
        else {
            const idx = event.products.findIndex(p => p === e.target.value);
            if (idx !== -1) {
                event.products.splice(idx, 1);
            }
        }
        debugger;
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
                    <TextField onChange={handleTextboxChanges} value={currentEvent ? currentEvent.title : ''} id='title' className='event-form__input' label='Title' required placeholder='Title' variant='outlined' />
                    <TextField onChange={handleTextboxChanges} value={currentEvent ? currentEvent.description : ''} id='description' className='event-form__input' label='Description' required placeholder='Description' variant='outlined' />
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
                    <EventImages images={images} />
                    <Products products={products} event={currentEvent} handleAddRemoveProduct={handleAddRemoveProduct}  />
                    <TextField onChange={handleTextboxChanges} value={currentEvent ? currentEvent.announcement : ''} id='announcement' className='event-form__input' label='Announcement' required placeholder='Announcement' variant='outlined' />
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
                                    id={`e-${e.id}`}
                                    className='ckbox'
                                    color='primary'
                                    value={1}
                                    name={`e-${e.id}`}
                                    key={`e-${e.id}`}
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