import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Input, Select, InputNumber, DatePicker, TimePicker } from "antd"
import moment from 'moment';
import { createEvent } from "../../../actions/eventActions";
import { BADMINTON, BASKETBALL, BOX, FOOTBALL, GOLF, HANDBALL, HOCKEY, RUGBY, RUNNING, SWIMMING, TABLE_TENNIS, TENNIS, TRIATHLON, VOLLEYBALL } from "../eventTypes";

import "./CreateEvent.css";

const CreateEvent = (props) => {
    const onFinish = (values) => {
        console.log('Success:', values);

        const eventData = {
            name: values.name,
            createdBy: props.auth.user.id,
            type: values.type,
            quota: values.quota,
            date: moment(values.date).format('DD/MM/YYYY'),
            time: moment(values.time).format('HH:mm')
        };

        console.log(eventData)
        props.createEvent(eventData, props.history);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const options = [
        {
            value: BADMINTON,
            label: "Badminton"
        },
        {
            value: BASKETBALL,
            label: "Basketball"
        },
        {
            value: BOX,
            label: "Box"
        },
        {
            value: FOOTBALL,
            label: "Football"
        },
        {
            value: GOLF,
            label: "Golf"
        },
        {
            value: HANDBALL,
            label: "Handball"
        },
        {
            value: HOCKEY,
            label: "Hockey"
        },
        {
            value: RUGBY,
            label: "Rugby"
        },
        {
            value: RUNNING,
            label: "Running"
        },
        {
            value: SWIMMING,
            label: "Swimming"
        },
        {
            value: TABLE_TENNIS,
            label: "Table Tennis"
        },
        {
            value: TENNIS,
            label: "Tennis"
        },
        {
            value: TRIATHLON,
            label: "Triathlon"
        },
        {
            value: VOLLEYBALL,
            label: "Volleyball"
        }
    ]

    return (
        <div className="create-event-container">
            <h3 className="create-event-title">Please enter event details</h3>
            <Form
                className="form"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    className="form-item"
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter event name!",
                        },
                    ]}
                >
                    <Input
                        className="form-item-input"
                        placeholder="Enter name"
                    />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Type"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: 'Please select type!',
                        },
                    ]}
                >
                    <Select
                        className="form-item-input"
                        showSearch
                        placeholder="Select from dropdown"
                        options={options} />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Quota"
                    name="quota"
                    initialValue={2}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter quota!',
                        },
                    ]}
                >
                    <InputNumber
                        className="form-item-quota"
                        min={2}
                        max={22}
                    />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: 'Please select date!',
                        },
                    ]}
                >
                    <DatePicker
                        className="form-item-input"
                        format="DD/MM/YYYY"
                    />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Time"
                    name="time"
                    rules={[
                        {
                            required: true,
                            message: 'Please select time!',
                        },
                    ]}
                >
                    <TimePicker
                        className="form-item-input"
                        format="HH:mm"
                        minuteStep={15}
                    />
                </Form.Item>

                <button type="primary" htmlType="submit" >SUBMIT</button>
            </Form>
        </div>
    );
}

CreateEvent.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createEvent }
)(withRouter(CreateEvent));