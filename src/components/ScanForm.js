import React, {Component} from 'react'


const API_KEY = 'e3620756'
export class ScanForm extends Component {

    //en este state vamos a guardar lo que escribimos en el input
    //para ello vamos a anhadir una prop al elemento input en render
    state = {
        inputOrder: ''
      }
    
     //metodo para actualizar el evento del componente
     //actualizando el inputOrder con el valor que actualmente tiene el input despues del evento
      _handleChange = (e) => {
          //la propiedad target contiene el elemento que esta causando, 
          //y dentro la propiedad value que contiene el texto/codigo que contiene el input despues de realizar el cambio
        this.setState({ inputOrder: e.target.value})
      }
    
      _handleSubmit = (e) => {
          e.preventDefault()
          const { inputOrder } = this.state
          
          fetch( `http://www.omdbapi.com/?apikey=${API_KEY}&s=${inputOrder}`)
          //  fetch( `https://api.squizz.com/rest/1/org/import_esd/3042EXAMPLEGSESSIONID342?import_type_id=4 HTTP/1.1`)
            .then(res => res.json())
            .then(results=> {
                const {Search, totalResults } = results
                console.log({Search, totalResults})
                this.props.onResults(Search)
            })
      }

    render(){
        return (
            <form onSubmit={this._handleSubmit}>
                <div className="field has-addons">
                    <div className="control">
                        <input 
                            className="input" 
                            //le pasamos el evento que se ejecutara cada vez que se detecte un cambio en el input
                            onChange = {this._handleChange}
                            type="text" 
                            placeholder="Scan to add to order"/>
                    </div>
                    <div className="control">
                        <button className="button is-info">
                        Search
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}