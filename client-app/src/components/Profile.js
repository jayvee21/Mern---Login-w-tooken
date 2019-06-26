import React, {Component} from 'react'
import {profile} from './UserFunctions'

class Profile extends Component{
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: ''
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        profile(token).then(res => {
            let userData = res.data.data
            this.setState({
                first_name: userData.first_name,
                last_name:  userData.last_name,
                email: userData.email
            })
        })
       
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center"> PROFILE </h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td> First name </td>
                                <td> {this.state.first_name} </td>
                            </tr>
                            <tr>
                                <td> Last name </td>
                                <td> {this.state.last_name} </td>
                            </tr>
                            <tr>
                                <td> Email </td>
                                <td> {this.state.email} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile