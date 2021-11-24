import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEvent } from "../../actions/eventActions";
import classnames from "classnames";

class CreateEvent extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            createdBy: "",
            type: "",
            quota: "",
            errors: {}
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.errors) {
        //     this.setState({
        //         errors: nextProps.errors
        //     });
        // }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const eventData = {
            name: this.state.name,
            createdBy: this.props.auth.user.id,
            eventType: this.state.type,
            quota: this.state.quota
        };
        console.log(JSON.stringify(eventData));

        this.props.createEvent(eventData, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="full-screen-container">
                <div className="create-event-container">
                    <h3 className="create-event-title">Please enter event details</h3>
                    <form onSubmit={this.onSubmit} autoComplete="off">
                        <div className="input-group">
                            <label>Name</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}
                                id="name"
                                type="text"
                                className={classnames("", {
                                    invalid: errors.name
                                })}
                            />
                        </div>
                        <div className="input-group">
                            <label>Type</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.type}
                                error={errors.type}
                                id="type"
                                type="text"
                                className={classnames("", {
                                    invalid: errors.type
                                })}
                            />
                        </div>
                        <div className="input-group">
                            <label>Quota</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.quota}
                                error={errors.quota}
                                id="quota"
                                type="number"
                                min="1"
                                max="22"
                                className={classnames("", {
                                    invalid: errors.quota
                                })}
                            />
                        </div>
                        <button type="submit" className="create-event-button">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

CreateEvent.propTypes = {
    //   loginUser: PropTypes.func.isRequired,
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