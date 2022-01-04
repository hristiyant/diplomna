import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Input, Select, InputNumber, DatePicker, TimePicker } from "antd"
import moment from 'moment';
import { createEvent } from "../../../actions/eventActions";
import { BADMINTON, BASKETBALL, BOX, FOOTBALL, GOLF, HANDBALL, HOCKEY, RUGBY, RUNNING, SWIMMING, TABLE_TENNIS, TENNIS, TRIATHLON, VOLLEYBALL } from "../eventTypes";

import "./CreateEvent.css";

class CreateEvent extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            createdBy: "",
            type: "",
            quota: "",
            date: "",
            time: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onTypeChange = e => {
        console.log(e)
        this.setState({ type: e });
    };

    onQuotaChange = e => {
        // console.log(typeof e.toString())
        this.setState({ quota: e.toString() });
    };

    onDateChange = e => {
        this.setState({ date: moment(e).format('DD/MM/YYYY') });
    };

    onTimeChange = e => {
        this.setState({ time: moment(e).format('HH:mm') });
    };

    onSubmit = e => {
        e.preventDefault();

        const eventData = {
            name: this.state.name,
            createdBy: this.props.auth.user.id,
            type: this.state.type,
            quota: this.state.quota,
            date: this.state.date,
            time: this.state.time
        };
        console.log(JSON.stringify(eventData));

        this.props.createEvent(eventData, this.props.history);
    };

    render() {
        const { errors } = this.state;

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
            <div className="full-screen-container">
                <div className="create-event-container">
                    <h3 className="create-event-title">Please enter event details</h3>
                    <form onSubmit={this.onSubmit} autoComplete="off">
                        <div className="input-group">
                            <Input
                                size="large"
                                placeholder="Name"
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}
                                id="name"
                                type="text"
                                className={classnames("", {
                                    invalid: errors.name
                                })}
                            />
                            <span className="red-text" style={{ height: "10px" }}>
                                {errors.name}
                            </span>
                        </div>
                        <div className="input-group">
                            <Select
                                size="large"
                                showSearch
                                placeholder="Type"
                                options={options}
                                onChange={this.onTypeChange}
                                value={this.state.type}
                                id="type"
                                className={classnames("", {
                                    invalid: errors.type
                                })}
                            />
                            <span className="red-text" style={{ height: "10px" }}>
                                {errors.type}
                            </span>
                        </div>
                        <div className="input-group">
                            {/* <label>Quota</label> */}
                            <InputNumber
                                size="large"
                                placeholder="Quota"
                                onChange={this.onQuotaChange}
                                value={this.state.quota}
                                error={errors.quota}
                                id="quota"
                                min={1}
                                max={22}
                                className={classnames("", {
                                    invalid: errors.quota
                                })}
                            />
                            <span className="red-text" style={{ height: "10px" }}>
                                {errors.quota}
                            </span>
                        </div>
                        <div className="input-group">
                            {/* <label>Date</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.date}
                                error={errors.date}
                                id="date"
                                type="datetime-local"
                                className={classnames("", {
                                    invalid: errors.date
                                })}
                            /> */}
                            <Input.Group compact>
                                <DatePicker
                                    size="large"
                                    format="DD/MM/YYYY"
                                    onChange={this.onDateChange}
                                    value={this.state.date && moment(this.state.date, "DD/MM/YYYY")}
                                    error={errors.date}
                                    id="date"
                                    className={classnames("", {
                                        invalid: errors.date
                                    })}
                                />
                                <TimePicker
                                    size="large"
                                    format="HH:mm"
                                    minuteStep={15}
                                    onChange={this.onTimeChange}
                                    value={this.state.time && moment(this.state.time, "HH:mm")}
                                    error={errors.time}
                                    id="time"
                                    className={classnames("", {
                                        invalid: errors.time
                                    })}
                                />
                            </Input.Group>
                            <span className="red-text" style={{ height: "10px" }}>
                                {errors.dateTime}
                            </span>
                        </div>
                        <button type="submit" className="create-event-button">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
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