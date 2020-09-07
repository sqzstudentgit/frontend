import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {FaSignOutAlt} from 'react-icons/fa';
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'


class logout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogout:false        
        }

        this._handleClick = this._handleClick.bind(this)
    }

    _handleClick(e){
        e.preventDefault();
    
        axios(
            {
                method: 'get',           
                url: 'api/logout',
            }             
        )
        .then(
            (response)=>{
                console.log(response);
                sessionStorage.removeItem('user')
                this.setState({ isLogout: true })
            }
        )
        .catch(
            (error)=>{
                console.log(error)
            }
        )
    }

    render() {
        if (this.state.isLogout){
            this.state.isLogout = false
            return <Redirect to = {{ pathname: "/login" }} />
        }
        return (
            <div >
                <button type="button" 
                        onClick={this._handleClick}
                        className={this.props.className}
                        >
                    {this.props.children}
                    <FaSignOutAlt />
                    
                </button>
            </div>
        )
    }
}

export default withRouter(logout)
