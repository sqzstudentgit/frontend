import React from 'react'
import { AlignCenter } from 'styled-icons/fa-solid';

class Summary extends React.Component {

    constructor(props) {
        super(props);
    }
    totalPrice() {
        let totalP = 0.0
        console.log(this.props);
        if(this.props.products!=[])
        {this.props.products.map(item =>{
            totalP += (item.price||item.totalPrice)*item.quantity
        })}
        return totalP.toFixed(2)
    }
   
    render() {
        return (
            <h4 style={{ fontFamily: 'Open Sans', textAlign: 'center', color:'rgba(0, 35, 56, 0.5)' }}>
                Total Price : {this.totalPrice()}
            </h4>
            //call products in cart
        )
    }
}


export default Summary 