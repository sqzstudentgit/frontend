import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class Productt extends Component {
    static propTypes = {
        item: PropTypes.string,
        price: PropTypes.string,
        poster: PropTypes.string
    }

    //From de movie API:
    //  poster  ..... we wont need this probably, as we wont use image of product
    //  title -> item
    //  year -> price

    // According to what Rich sent
    //"dataFields":"keyProductID,productCode,keyTaxcodeID,productSearchCode,barcode,barcodeInner,brand,name,description1,description2,description3,description4,productClass,keySellUnitID,unit,weight,width,height,depth,averageCost,warehouse,supplier,deliveryTimeNoStock,deliveryTimeInStock,stockQuantity,stockNoneQuantity,stockLowQuantity,stockLowQuantity,isPriceTaxInclusive,isKitted,kitProductsSetPrice"

    render(){
        const { poster, item, price } = this.props
       
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image">
                        <img 
                            src={poster} 
                            alt={item}

                        />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">        
                        <div className="media-content">
                            <p className="title is-4">{item}}</p>
                            <p className="subtitle is-6">{price}}</p>
                        </div>
                    </div> 
                </div>
            </div>
          )

    }
}
