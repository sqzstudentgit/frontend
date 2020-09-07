import React from "react";
import {withRouter} from 'react-router-dom'
import Product from './product'
import styled from 'styled-components';

class Order extends React.Component{
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this)
    }

    _handleClick(e){
        e.preventDefault()
        const path =  `order${this.props.order.keyPurchaseOrderID}`
        this.props.history.push(path)
    }

    render() {
        return (
            <div>
                <CardContainer>
                <CardHead>{this.props.edit && <button onClick={this._handleClick}>Order ID: {this.props.order.keyPurchaseOrderID}</button>}{!this.props.edit && `Order ID: ${this.props.order.keyPurchaseOrderID}`}</CardHead>
                    <CardLineItem>
                        <LineItemCtr>
                        {
                            this.props.order.products.map(product =>
                                <Product product = {product} key={product.productCode}/>
                            )
                        }

                        </LineItemCtr>

                    </CardLineItem>
                </CardContainer>
                
            </div>
        )
    }
}

export default withRouter(Order)

const CardContainer = styled.div`
margin-bottom: .5rem;
background: #fff;
border: 1px solid #ccc;
position: relative;
`

const CardHead = styled.h1`
    padding: 1rem;
    display: -webkit-flex;
`

const CardLineItem = styled.div`
    padding: 0 1rem 1rem 1rem;
    position: relative;
`
const LineItemCtr = styled.div`
    border-top: 1px solid #ccc;
    padding-top: 1rem;
`

const ItemContent= styled.div`
    padding-top: 1rem;
`