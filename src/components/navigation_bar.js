import React from 'react';
import style from '../css/navigation_bar.module.css'
import {withRouter} from 'react-router-dom'
import Logout from '../components/Logout'

class NavigationBar extends React.PureComponent{
    constructor(props) {
        super(props)
    }

    toggle() {  ///
        let x = document.getElementById("myTopnav")
        if (x.className === style.topnav) {
            x.className += ' ' + style.responsive
        } else {
            x.className = style.topnav
        }
    }

    render() {
        return(
            <>
                <div className={style.topnav} id="myTopnav">

                    <ul>
                        <li>
                            <a href="/" className={this.props.location.pathname === '/'? style.active : ''}>Home</a>
                        </li>
                        <li>
                            <a href="/viewHistoryOrder" className={this.props.location.pathname === '/viewHistoryOrder'? style.active : ''}>History</a>
                        </li>
                        <li>
                            <a href="/order" className={/^\/order/.test(this.props.location.pathname)? style.active : ''}>Order</a>
                        </li>
                        <li>
                            <Logout className={style.logoutBtn }>logout</Logout>
                        </li>
                        <div>
                            <a href="#" className={style.icon} onClick={this.toggle}>
                            pop
                            </a>
                        </div>


                    </ul>

                </div>
            </>


        )
    }
}

export default withRouter(NavigationBar)