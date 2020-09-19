import React from "react";
import style from '../css/product.module.css'

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity:'',
        }
        this._handleChange = this._handleChange.bind(this);
        this._handleEditNum = this._handleEditNum.bind(this);
    }

    _handleChange(e) {
        // this.setState({value: event.target.value});
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
      }
    _handleEditNum(e) {
        e.preventDefault();
        console.log(this.props)
        this.props.setQuantity(this.props.product.barcode,this.state.quantity)
    }
    render() {
        return (
            <li >
                <span className={style.productImage}><img alt={"product image"} src={this.props.product.uri_large} onError={(e) => {e.target.onerror = null;e.target.src="https://pjsas.securetotecs.com/sites/pjsas/attachments/products/images_small/anotfound.png?1589769784203"}} /></span>
                <span className={style.productBasicContainer}>
                    <span className={style.productBasic}>Product ID: {this.props.product.productCode} </span>
                    <span className={style.productBasic}>Product Name: {this.props.product.productName}</span>
                    <span className={style.productBasic}>Price: {this.props.product.price||this.props.product.totalPriceExTax}</span>
                </span>

                <span className={style.productCustomizeContainer}>
                    
                    <span className={style.productCustomize}>
                        {this.props.edit && <span><button onClick={(e)=>{this.props.toReduce(
                            this.props.product.barcode
                        )}}>-</button></span>}
                        <span>Quantity:{this.props.product.quantity}</span>
                        {/* <input>Quantity: {this.props.product.quantity}</input> */}
                        {this.props.edit && <span><button onClick={(e)=>{this.props.toAdd(
                            this.props.product.barcode
                        )}}>+</button></span> }
                        {this.props.edit &&<form onSubmit={(e) => this._handleEditNum(e)}>
                           <input type="text" value={this.state.quantity} id="quantity" onChange={this._handleChange} placeholder='input quantity here' ref={myInput=>this.myInput=myInput}/>
                        </form>}
                    </span>
                    <span className={style.productCustomize}>Total Price: {`${+((this.props.product.price||this.props.product.totalPrice) * + this.props.product.quantity).toFixed(2)}`}</span>


                </span>

                 <hr/>           

            </li>
        )
    }
}


export default Product