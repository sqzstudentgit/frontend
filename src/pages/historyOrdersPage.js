import React from "react"
import {withRouter} from 'react-router-dom'
import OrderItem from '../components/orderItem'
import Order from '../components/order'
import Summary from "../components/Summary";
import style from '../css/history.module.css';
import NavigationBar from '../components/navigation_bar2';
import axios from 'axios';

import { Layout} from 'antd';
const { Header, Content, Footer } = Layout;


class HistoryOrdersPage extends React.Component{

    constructor(props) {
        super(props);

        //Modified by Dongsheng, clean local test data, avoid null value error
        // const storedOrders = JSON.parse(localStorage.getItem('orders'))
        this.state = {
            orders: [],
            isHistoryLoading: false,
        }

    }
    getNowDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
        month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
        }
        var Hours = date.getHours();
        var Minutes = date.getMinutes();
        var Seconds = date.getSeconds();
        
        if (Hours >= 0 && Hours <= 9) {
        Hours = "0" + Hours;
        }
        if (Minutes >= 0 && Minutes <= 9) {
        Minutes = "0" + Minutes;
        }
        if (Seconds >= 0 && Seconds <= 9) {
        Seconds = "0" + Seconds;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + Hours + seperator2 + Minutes
        + seperator2 + Seconds;
        return currentdate;
    }
    
    _handleRefresh(time){
    console.log("start refresh history")
    axios({
            method: 'post',           
            url: 'api/history_order',
            headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
            data:{
                "session_id": sessionStorage.getItem("sessionKey"),
                "date_time": time,                   
            }
        }             
        )
        .then(
            (response)=>{
                console.log(response);
                let {message,status} = response.data
                if (status=="success"){
                    let {orderHistory} = response.data.data
                    console.log(orderHistory)
                    this.setState({
                        orders:orderHistory,
                        isHistoryLoading:true,
                    })
                    
                }
                else{
                    console.log(message)
                    //alert(message)                       
                }
            }
        )
        .catch(
            (error)=>{
                console.log(error)
            }
        )

}
    componentWillMount(){
        this._handleRefresh(this.getNowDate()) 
    
    }
    render() {
       
        if(sessionStorage.getItem('user')&&this.state.isHistoryLoading){
           
            const orders = this.state.orders.map(order =>
               <OrderItem order={order} key={order.id}/>
            )
            if(Object.entries(this.props.match.params).length !== 0){
                let order = this.state.orders.find( e => +e.id === +this.props.match.params.orderId)
                return (
                    <>
                    <Layout style={{ minHeight: '100vh' }}>
                        <NavigationBar history={this.props.history} defaultSelected='/viewHistoryOrder'/>
                        <div style={{ marginTop: '50px'}}>
                            <Content style={{ padding: '50px 50px'}}> 
                                <ul className={style.orderContainer}><Order order={order}/>
                                    <Summary products={order.lines}/>
                                </ul>
                            </Content>
                        </div>
                        <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
                    </Layout>
                    </>)
            }

            return (
                <div>
                    
                    <Layout style={{ minHeight: '100vh' }}>
                        <NavigationBar  history={this.props.history} defaultSelected='/viewHistoryOrder'/>

                        <div style={{ marginTop: '50px'}}>
                            <Content style={{ padding: '50px 50px'}}> 
                                <h1 className= {style.title} data-testid='historyOrders'>History Orders</h1>
                            
                                <div id={style.primary} className={style.primaryContent}>
                                    <div className={style.relativeWrapper}>
                                        <div className={style.orderResultWrapper}>
                                            <ul className={style.orderSearchResult}>
                                                {orders}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Content>
                        </div>
                        <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
                    </Layout>

                </div>
            )
        }
        else{
            return(
                <Layout style={{ minHeight: '100vh' }}>
                    <NavigationBar history={this.props.history} defaultSelected='/viewHistoryOrder'/>

                    {/* Empty */}

                    <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
                </Layout>
            )
        }
        this.props.history.push('/login')
        return 'error?'
    }
}

export default withRouter(HistoryOrdersPage)
