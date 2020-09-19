import React from 'react'
import {withRouter} from 'react-router-dom'
import style from "../css/orderItem.module.css";

class OrderItem extends React.Component{

    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this)
    }

    _handleClick(){
        this.props.history.push(`/order_detail_${this.props.order.id}`)
    }


    render(){ 
        console.log(this.props.order);
        const price = this.props.order.lines.reduce((acc, cur) => {
            return acc + cur.totalPriceExTax;
        },0)
        
        const date = ()=>{
            let itemdate = new Date(this.props.order.createdOnDate)
            console.log(itemdate)
            var seperator1 = "-";
            var seperator2 = ":";
            var month = itemdate.getUTCMonth() + 1;
            var strDate = itemdate.getUTCDate();
            if (month >= 1 && month <= 9) {
            month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
            }
            var Hours = itemdate.getUTCHours();
            var Minutes = itemdate.getUTCMinutes();
            var Seconds = itemdate.getUTCSeconds();
            if (Hours >= 0 && Hours <= 9) {
                Hours = "0" + Hours;
            }
            if (Minutes >= 0 && Minutes <= 9) {
            Minutes = "0" + Minutes;
            }
            if (Seconds >= 0 && Seconds <= 9) {
            Seconds = "0" + Seconds;
            }
            var currentdate = itemdate.getUTCFullYear() + seperator1 + month + seperator1 + strDate
            + " " + Hours + seperator2 + Minutes
            + seperator2 + Seconds;
            return currentdate;
        }



        return (
            <li className={style.reviewBox}>
                <button className={style.orderButton} onClick={this._handleClick}>
                    View
                </button>
                <p className={style.highlight}>
                    <span>Order Number: </span>
                    <span>{this.props.order.keyPurchaseOrderID}</span>
                </p>
                <p>
                    <span>Date Ordered: </span>
                    <span>{date()}</span>
                </p>
                <p>
                    <span>Order Status: </span>
                    <span>{this.props.order.billStatus.slice(7)}</span>
                </p>
                <p>
                    <span>Amount: </span>
                    <span>{price.toFixed(2)}</span>
                </p>
            </li>
        )
    }
}

export default withRouter(OrderItem)