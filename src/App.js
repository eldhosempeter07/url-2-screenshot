import React, { Component } from 'react';
import InputForm from './components/InputForm'
import axios from 'axios';
import {saveAs} from 'file-saver';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

var format = "jpg";
var link = null

// Loader css 
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;  
  text-align:center;
`;

export default class App extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
          screenshot:null,
          widtherror:null,
          loading: false
      }
    }
    
    // screenshot function 
    getScreenshot = (e) => {
      this.setState({
        loading:true
      })
    e.preventDefault();

    link = e.target.elements.link.value;
    const width = e.target.elements.width.value;
    const height = e.target.elements.height.value;
    const full_page = e.target.elements.fullScreen.checked;
    format = e.target.elements.png.checked === true ?"png":"jpg";
    console.log(full_page);
    console.log(format);


    axios.get(`https://screenshotapi.net/api/v1/screenshot?url=${link}&full_page=${full_page}&height=${height}&width=${width}&token=REUXZIEP5RLXUEFS8PEF0RZTH15SJK5A`)
    
    .then((res) => {
      const screenshot = res.data.screenshot;
      this.setState({screenshot,error:null,loading:false})
      console.log(screenshot);
    })
    .catch((err)=>{
      if(err.request){
        console.log(err.request.response);
        const errorResponse = JSON.parse(err.request.response);
        const error = "Minimum should be 32x32 And Maximum Resolution should be 1080x1920"
        this.setState({error,loading:false})
        console.log("error",error);
      }
    })
      link = null
      console.log(link);
      console.log(this.state.loading);
  }



  render() {
    return (
      <div>
        <h1>URL --{'>'}  SCREENSHOT</h1>
        <div className="sweet-loading">
           <ClipLoader
             css={override}
             size={150}
             color={"#123abc"}
             loading={this.state.loading}
           />
         </div>
        { this.state.screenshot  && this.state.loading === false ?
            <div className="download">
              <a className="preview" href={this.state.screenshot} target="_blank" >Preview</a>
              <button className="download-btn"  onClick={()=>saveAs(this.state.screenshot, `image.${format}`)}>Download</button>
            </div>
           :null

       }
        <InputForm getScreenshot={this.getScreenshot}/>
        <div className="error-text">
          <p >{this.state.error}</p>
        </div>
          
         
      </div>
    )
  }
}
