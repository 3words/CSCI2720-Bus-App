import React from 'react';
import axios from 'axios';
class AddFavour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {LocID: this.props.favourLocation.locationID, UserName: this.props.user};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({LocID: event.target.value});
      }
    
      handleNameChange(event) {
        this.setState({UserName: event.target.value});
      }


      /*
      alert('A LocID was submitted: ' + this.state.LocID);
        alert('A Name was submitted: ' + this.state.UserName);
      */
    //var relate = JSON.parse(JSON.stringify(res.data));
  

      async handleSubmit(event) {
        let submitConfirm = window.confirm("Do you want to submit?")
        if(!submitConfirm) return false;

        var res = await axios.post('/addFavourite', {
            userName: this.state.UserName,
            locationId: this.state.LocID
          })
        
        if(res.data === "Success") alert(res.data)
        else alert(res.data) 
        event.preventDefault();
        
      }
      

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
              <label>
                LocID:
                <input disabled type="text" value={this.state.LocID} onChange={this.handleChange} />
              </label>
              <label>
                User Name:
                <input disabled type="text" value={this.state.UserName} onChange={this.handleNameChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          );
    }

}


export default AddFavour