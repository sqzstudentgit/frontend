import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <div>
                    {this.props.obj.customer_code}
            </div>
        );
    }
}

export default DataTable;