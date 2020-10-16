import React, { useState }  from 'react';

const UserForm=(props)=>{    

    const [checked, setChecked] = useState(false);
    const [radioChecked, setRadioChecked] = useState(true);
    const [url,setUrl] = useState('');
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        props.getScreenshot(e);
      }


        return (
            <form onSubmit={handleSubmit}>
              <input type="url" className="url-text" value = {url}  name="link" placeholder="Enter your Url here..." 
                    onChange = {(e)=>setUrl(e.target.value)} required/>

              <div className="resolution">
              <input type="number" name="width" placeholder="Enter Width" required/>
              <input type="number" name="height" placeholder="Enter Height" required/><br/>
              </div>



              <div className="check-radio">
              <label>
              <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} 
              name ="fullScreen"/>
              Full Page</label><br/>

              <input className="radio-btn" type="radio" id="jpg" checked={radioChecked} 
              onChange={() => setRadioChecked(!radioChecked)} name="jpg" value="jpg"/>
              <label htmlFor="jpg">jpg</label>
              <input className="radio-btn" type="radio" id="png" checked={!radioChecked} 
              onChange={() => setRadioChecked(!radioChecked)} name="jpg" value="png"/>
              <label htmlFor="png">png</label><br/>
              
              </div>             
              <button >Submit</button>
            </form>
          );
    }


export default UserForm;