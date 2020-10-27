import React from "react";
import {withRouter} from 'react-router-dom'
import CreateForm from '../components/createForm'
import styled from 'styled-components';

class CreatePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }   
    }

    render() {
        return (
            <Page>
                    <div style={{width : '90%'}}>
                        <CreateForm />
                    </div>  
            </Page>
        )
    }
}

export default withRouter(CreatePage)

const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
    -webkit-justify-content: center;
    background: #f1f1f3; // this is the color of the background of the login page
    height: 160%
`