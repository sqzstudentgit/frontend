import React from "react"
import {withRouter} from 'react-router-dom'
import Product from "../components/product";
import Summary from "../components/Summary";
import axios from 'axios';
import NavigationBar from '../components/navigation_bar';
import ErrorMessage from '../components/errorMessage'
import style from '../css/currentOrder.module.css';


class CurrentOrderPage extends React.Component{

    constructor(props) {
        super(props);
        //todo: require initialization
        //const order = JSON.parse(localStorage.getItem('current_order'))
        this.state = {
            order:{
                products:[]
            },
            edit: false,
            error: false,
            errorMassage:'',
            barcode:'',
        }
        this._handleEdit = this._handleEdit.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleChange = this._handleChange.bind(this)
        this._handleSave = this._handleSave.bind(this)
        this._handleScan = this._handleScan.bind(this)
        this.reduce = this.reduce.bind(this)
        this.add = this.add.bind(this)
        this.setQuantity = this.setQuantity.bind(this)
    }

    _handleSubmit(e){
        let lines =[]
        this.state.order.products.map(item => {
            let line = {
                lineType:"PRODUCT",
                keyProductID:item.keyProductID,
                productCode:item.productCode,
                quantity:item.quantity,
                priceTotalExTax:item.price,
                totalPrice:item.price*item.quantity,
                productName:item.productName,
            }
            lines.push(line)
        
        })
        console.log(lines);
        console.log(lines.length)
        if(lines.length!=0){
        axios({
                method: 'post',           
                url: 'api/purchase',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                    "sessionKey": sessionStorage.getItem("sessionKey"),
                    "lines": lines,                   
                }
            })
            .then(
                (response)=>{
                    console.log(response);                    
                    let {message,status} = response.data
                    console.log("I am a prick")
                    console.log(status)
                    if (status=="success"){
                        //localStorage.setItem("purchaseID",purchaseID)
                        alert("Submit Successfully!")
                        this.props.history.push('/')
                    }
                    else{
                        console.log(message)
                        this.setState({
                            error:true,
                            errorMassage: message
                        })
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
        else{
            this.setState({
                error:true,
                errorMassage: "empty cart!"
            })
        }
    }

    _handleChange(e){
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
    }

    _handleEdit(e){
        this.setState({
            edit: true
        })
    }

    _handleSave(e){
        this.setState({
            edit: false
        })
    }

    _handleScan(e){
        e.preventDefault();
        let scanCode = parseInt(this.state.barcode);
        console.log(scanCode);        
        const res = this.state.order.products.some(item => item.barcode == scanCode);
        console.log(this.state.order.products);
        console.log(res);

        if (res){
            this.add(scanCode);
        }
        else{            
            this.remoteAdd(scanCode);
        }
        this.setState({
            barcode:''
        })
        this.myInput.focus()
    }

    reduce(barcode){
        let filterProducts = this.state.order.products.filter(p=>{
            return (p.barcode!=barcode)||(p.barcode==barcode && p.quantity!=1)
        })
        console.log(filterProducts)
        let newProducts = filterProducts.map(p=>{
            if(+p.barcode === barcode){
                let newP = {...p}
                if(newP.quantity > 0){
                    newP.quantity --
                }
                return newP
            }
            return p
        })

        this.setState({
            order: {
                products: newProducts
            }
        })
    }

    add(barcode){
        console.log("add"+barcode)
        let newProducts = this.state.order.products.map(p=>{
            if(+p.barcode === barcode){
                let newP = {...p}
                newP.quantity ++
                return newP
            }            
            return p       
        })
        this.setState({
            order: {
                products: newProducts
            }
        })
        // this.remoteAdd(productId);
    }
    // product price retrieve request 
    remoteAdd(barcode){

        axios({
                method: 'post',           
                url: 'api/barcode',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                    "sessionKey": sessionStorage.getItem("sessionKey"),
                    "barcode": barcode,                   
                }
            })
            .then(
                (response)=>{
                    console.log(response);
                    
                    var {status} = response.data
                    
                    // TODO: Fix the returned parameters for Images as we are not returning the list
                    var {productName, productCode, keyProductID, price, uri_large,uri_medium,uri_small} = response.data.data

                    let setP =(barcode, productCode, productName,price,productId,l_img,m_img,s_img) => {                       
                        let newProduct = {
                            productCode:productCode, 
                            productName:productName,
                            price:price,
                            quantity: 1, 
                            barcode: barcode,
                            keyProductID:productId,
                            uri_large:l_img,
                            uri_medium:m_img,
                            uri_small:s_img
                        }

                        
                        let newProductList = this.state.order.products.concat(newProduct)

                        this.setState({
                            error:false,
                            order: {
                                products: newProductList
                            }
                        })
                        
                    }

                    console.log(status);
                    if (status=="success"){
                        if(this.state.order.products.some(item => { return item.barcode == barcode; })){
                            this.add(barcode)
                        }
                        else{
                            setP(barcode,productCode,productName,price,keyProductID,uri_large,uri_medium,uri_small)
                        }
                    }
                    else{
                        //alert("invalid barcode")
                        this.setState({
                            error:true,
                            errorMassage: "invalid barcode"
                        })
                    }
                }
            )
            .catch(
                (error)=>{
                    console.log(error)
                }
            )
    }

    setQuantity(barcode,quantity){
        
        if(quantity>0){      
            let newProducts = this.state.order.products.map(p=>{
                if(+p.barcode === barcode){
                    let newP = {...p}
                    newP.quantity = quantity
                    return newP
                }            
                return p       
            })
            this.setState({
                order: {
                    products: newProducts
                }
            })  
        }
        else{
            let filterProducts = this.state.order.products.filter(p=>{
                return (p.barcode!=barcode)
            })
            this.setState({
                order: {
                    products: filterProducts
                }
            }) 
        }
    }


    render() {
        if(sessionStorage.getItem('user')){
            const {error, errorMassage} = this.state
            if(!this.state.edit){
                return (
                    <>
                        <NavigationBar/>
                        <div className={style.body}>
                            <h1 className={style.title} data-testid='currentOrder'>Current Order:</h1>
                            {error && <ErrorMessage massage={errorMassage}/>}
                            <ul>
                                {
                                    this.state.order.products.map(e=>{
                                        if(e.quantity>0)
                                            return <Product product={e} key={e.barcode}/>
                                        return null
                                })
                                }
                            </ul>
                            <Summary products={this.state.order.products}/>

                        
                            <button className={style.submitButton} onClick={this._handleSubmit}>Submit</button>
                            <button className={style.editButton} onClick={this._handleEdit}>Edit</button>
                        </div>
                    </>

                )
            }
            console.log(this.state)
            
            return (
                <>
                    <NavigationBar/>
                    <h1 className={style.title}>Current Order editing:</h1>
                    {error && <ErrorMessage massage={errorMassage}/>}
                    <ul>
                        {   
                            this.state.order && this.state.order.products.map(e=>
                                <Product product={e} key={e.barcode} edit toReduce={this.reduce} toAdd={this.add} setQuantity={this.setQuantity}></Product>
                            )
                        }
                    </ul>
                    <div className={style.body}>
                    <form onSubmit={(e) => this._handleScan(e,this.state.barcode)}>
                    <input type="text" value={this.state.barcode} id="barcode" onChange={this._handleChange} placeholder='barcode' ref={myInput=>this.myInput=myInput}/>
                    </form>
                    <button className={style.submitButton} onClick={this._handleScan}>scan</button> 
                    <button className={style.submitButton} onClick={this._handleSave}>save</button>
                    </div>
                </>

            )
        }
        //console.log(this.props.history)
        this.props.history.push('/login')
        return 'error?'
    }
}

export default withRouter(CurrentOrderPage)