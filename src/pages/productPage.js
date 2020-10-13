import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import ImageViewer from "../components/ImageViewer";
import NavigationBar from "../components/NavigationBar";


class ProductPage extends React.Component {
    
    constructor(props) {
        super(props);

        //Modified by Dongsheng, clean local test data, avoid null value error
        // const storedOrders = JSON.parse(localStorage.getItem('orders'))
        this.state = {
            productInfo: [],
            isLogout: false,
        }

    }

}