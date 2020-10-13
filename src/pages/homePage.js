import React from "react"
import {Link, withRouter} from 'react-router-dom'
import { Title } from "../components/Title"

// import styled from '../css/slider.css'
import Slider from '../components/Slider'
import Logout from '../components/Logout'
import NavigationBar from "../components/NavigationBar";

const slideData = [
    {
      index: 0,
      headline: 'Current Orders',
      button: 'Shop now',
      src: require('../assets/cart.png'),
        link: '/order' },
    
    {
      index: 1,
      headline: 'History Orders',
      button: 'Browse My History',
      src: require('../assets/history.jpg') ,
      link: '/viewHistoryOrder'},
    
    ];
class HomePage extends React.Component{

    render() {
      
        if(sessionStorage.getItem('user')){
            //TODO: use another way to load the img to avoid repeated downloads
            return (
                <>
                <NavigationBar/>
                <Slider heading = "Example Slider" slides={slideData} history={this.props.history}/>
       
                </>
            )
        }
        //console.log(this.props.history)
        this.props.history.push('/login')
        console.log(this.props.history)
        return 'error?'
    }
}

export default withRouter(HomePage)
