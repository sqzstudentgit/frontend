import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Productt } from './Productt'

export class ProductsList extends Component {
    static propTypes ={
        products: PropTypes.array
    }

    render (){
        const { products } = this.props
        return(
            <div className="ProductsList">
                {
                    products.map( product => {
                        return (
                            <div key={product.imdbID} className="ProductsList-items">
                                <Productt  
                                    item={product.Title}
                                    price={product.Year}
                                    poster={product.Poster}
                                    />
                            </div>
                        )
                    })
                } 
            </div>
        )
    }
}