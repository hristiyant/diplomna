import React, { useEffect, useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Loader from "react-loader-spinner";
import moment from 'moment';

import { Popconfirm, Form, Input, Select, InputNumber, DatePicker, TimePicker, Cascader, message } from "antd"
import { BADMINTON, BASKETBALL, BOX, FOOTBALL, GOLF, HANDBALL, HOCKEY, RUGBY, RUNNING, SWIMMING, TABLE_TENNIS, TENNIS, TRIATHLON, VOLLEYBALL } from "../eventTypes";
import { getDisplayDate } from "../../../utils/DateUtils";
import { clearERROR } from "../../../actions/authActions";
import { getLocations } from "../../../actions/locationActions";
import { createEvent } from "../../../actions/eventActions";
import { HEADER_REQUEST_FAILED_TEXT, MESSAGE_UNABLE_TO_FETCH_TEXT, showUnableToFetchAlert, TITLE_OOPS_TEXT, TITLE_REQUEST_FAILED_TEXT } from "../../custom/CustomAlertBox";
import "./CreateEvent.css";

const CreateEvent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    // const [locations, setLocations] = useState([]);
    // const [filteredLocations, setFilteredLocations] = useState([]);
    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventQuota, setEventQuota] = useState("");
    // const [errors, setErrors] = useState({});
    const [cascaderOptions, setCascaderOptions] = useState([]);
    const { user } = props.auth;

    const getLocationOptions = useCallback((locations) => {
        let options = [
            {
                value: BADMINTON,
                label: "Badminton",
                children: filterLocations(BADMINTON, locations)
            },
            {
                value: BASKETBALL,
                label: "Basketball",
                children: filterLocations(BASKETBALL, locations)
            },
            {
                value: BOX,
                label: "Box",
                children: filterLocations(BOX, locations)
            },
            {
                value: FOOTBALL,
                label: "Football",
                children: filterLocations(FOOTBALL, locations)
            },
            {
                value: GOLF,
                label: "Golf",
                children: filterLocations(GOLF, locations)
            },
            {
                value: HANDBALL,
                label: "Handball",
                children: filterLocations(HANDBALL, locations)
            },
            {
                value: HOCKEY,
                label: "Hockey",
                children: filterLocations(HOCKEY, locations)
            },
            {
                value: RUGBY,
                label: "Rugby",
                children: filterLocations(RUGBY, locations)
            },
            {
                value: RUNNING,
                label: "Running",
                children: filterLocations(RUNNING, locations)
            },
            {
                value: SWIMMING,
                label: "Swimming",
                children: filterLocations(SWIMMING, locations)
            },
            {
                value: TABLE_TENNIS,
                label: "Table Tennis",
                children: filterLocations(TABLE_TENNIS, locations)
            },
            {
                value: TENNIS,
                label: "Tennis",
                children: filterLocations(TENNIS, locations)
            },
            {
                value: TRIATHLON,
                label: "Triathlon",
                children: filterLocations(TRIATHLON, locations)
            },
            {
                value: VOLLEYBALL,
                label: "Volleyball",
                children: filterLocations(VOLLEYBALL, locations)
            }
        ]
        console.log("CASC OPTIONS: " + JSON.stringify(options));
        setCascaderOptions(options);
    }, []);

    const fetchLocations = useCallback(async () => {
        try {
            setIsLoading(true);

            let res = await getLocations();
            // setLocations(res);
            // setFilteredLocations(res);
            getLocationOptions(res);
            setIsLoading(false);
        } catch (error) {
            console.log(JSON.stringify(error));
            const alertProps = {
                header: HEADER_REQUEST_FAILED_TEXT,
                title: TITLE_OOPS_TEXT,
                message: MESSAGE_UNABLE_TO_FETCH_TEXT,
                actionPrimary: () => fetchLocations(),
                actionSecondary: () => { props.history.push("/dashboard") }
            }
            setIsLoading(false);
            showUnableToFetchAlert(alertProps);
        }
    }, [getLocationOptions, props.history])

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    // const onFinish = (values) => {
    //     const eventData = {
    //         name: values.name,
    //         createdBy: props.auth.user.id,
    //         type: values.type,
    //         quota: values.quota,
    //         date: moment(values.date).format('DD/MM/YYYY'),
    //         time: moment(values.time).format('HH:mm'),
    //         location: values.location
    //     };

    //     submit(eventData);
    // };

    // const submit = (eventData) => {
    //     createEvent(eventData)
    //         // .then(props.history.push("/events"))
    //         .catch(err => {
    //             onCreateEvenetFailed(eventData)
    //         });
    // }

    // const onCreateEvenetFailed = (eventData) => {
    //     const alertProps = {
    //         header: HEADER_REQUEST_FAILED_TEXT,
    //         title: TITLE_OOPS_TEXT,
    //         message: "Failed to create event \"" + eventData.name + "\".",
    //         buttonPrimaryText: "RETRY",
    //         buttonSecondaryText: "DASHBOARD",
    //         actionPrimary: () => submit(eventData),
    //         actionSecondary: () => props.history.push("/dashboard")
    //     }

    //     return (
    //         showUnableToFetchAlert(alertProps)
    //     );
    // }

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    const onChange = e => {
        props.clearERROR();

        // this.setState({ [e.target.id]: e.target.value });
    };

    // const onSubmit = e => {
    //     e.preventDefault();

    //     // this.registerUser();
    // };



    const filterLocations = (type, locations) => {
        let arr = [];
        locations.filter((location) => {
            if (location.type === type) {
                arr.push({ value: location._id, label: location.name });
                return true;
            }
            return false;
        });

        return arr;
    }

    const displayRender = (label) => {
        return label[label.length - 1];
    }

    const onDatePickerChange = (value) => {
        if (value) {
            // value.set("hour", 16);
            // value.set("minute", 16);
            value.set("second", 0);
            // console.log("DatePicker value: " + value);
            // console.log("Date: " + new Date(value.utc().format()))
            var dateObject = new Date(value.utc().format());
            setEventDate(dateObject);
        } else {
            setEventDate("");
        }
    }

    const onSubmit = () => {
        const newEvent = {
            name: eventName,
            createdBy: user.id,
            type: eventType,
            location: eventLocation,
            date: eventDate,
            quota: eventQuota,
            participants: [user.id]
        }

        createNewEvent(newEvent);
    }

    const createNewEvent = async (eventData) => {
        try {
            await createEvent(eventData);

            message.success({
                content: "Event created",
                style: {
                    fontSize:"x-large"
                }
            },5);
            props.history.push("/dashboard");
        } catch (error) {
            console.log(JSON.stringify(error));
            console.log(JSON.stringify(error.status));
            message.error({
                content: "Failed to create event. Please check inputs or try again after a few moments.",
                style: {
                    fontSize:"x-large"
                }
            }, 5);
        }
    }

    function showLoader() {
        return (<Loader
            type="MutatingDots"
            color="tomato"
            secondaryColor="white"
            height={100}
            width={100}
            timeout={10000}
        />)
    }

    const showContent = () => {
        return (
            <div className="create-event-container">
                <h3 className="create-event-title">Please enter event details</h3>
                <form noValidate onSubmit={onSubmit} style={{ width: "100%", maxWidth: "400px" }}>
                    <div className="create-event-input-field">
                        <Input
                            placeholder="Name"
                            onChange={(e) => {
                                setEventName(e.target.value);
                            }}
                            value={eventName}
                            id="name"
                            type="text"
                        />
                    </div>
                    <div className="create-event-input-field">
                        <Cascader
                            options={cascaderOptions}
                            placeholder="Type > Location"
                            expandTrigger="hover"
                            displayRender={displayRender}
                            id="location"
                            onChange={(value) => {
                                // setEventLocation(value);
                                console.log(value);
                                setEventType(value[0]);
                                setEventLocation(value[1]);
                            }}
                        />
                    </div>
                    <div className="create-event-input-field">
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:00"
                            id="date"
                            // onOk={onDatePickerChange}
                            disabledDate={(current) => {
                                return moment().add(-1, 'days') >= current
                            }}
                            onChange={onDatePickerChange}
                            className={classnames("", {
                                invalid: props.errors.datenotallowed
                            })} />
                    </div>
                    <div className="create-event-input-field">
                        <InputNumber
                            placeholder="Quota"
                            id="quota"
                            min={2}
                            max={30}
                            onChange={(value) => {
                                setEventQuota(value);
                            }}
                        />
                    </div>
                </form>
                <button
                    type="submit"
                    className="btn-dashboard create-event"
                    disabled={!eventName || !eventType || !eventDate || !eventLocation || !eventQuota}
                    onClick={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    SUBMIT
                </button>
            </div>
        );
    }

    return (
        isLoading ? showLoader() : showContent()
    );
}

CreateEvent.propTypes = {
    clearERROR: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { clearERROR }
)(withRouter(CreateEvent));