import React from 'react';
import axios from 'axios';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showComment: false,
        
        };
      }
    
      handleShowCommentOnclick = () => {
          this.setState({
              showComment: !this.state.showComment
          })
      }

      /*
        var inputComment = req.body['comment'];
        var inputUserName = req.body['userName'];
        var inputLocationId = req.body['locationId'];
      */
      handleAddCommentOnclick = async (user,singleLocation)=> {
        let inputComment = window.prompt("Enter Comment: ");

        if(!inputComment) return false;

        console.log(inputComment)
        console.log(user)
        console.log(singleLocation[0].locationID)
        var res = await axios.post('/addComment', {
            comment: inputComment,
            userName: user,
            locationId: singleLocation[0].locationID
          })

        if(res.data==="User does not exists!" || res.data==="Location does not exists!" )  alert("Failed adding comment!")
        else alert("Add Successfully!")
      }

      /*
      displayMarkers = (markerOnclick,allInfomation) => {
        return allInfomation.map((singleLocation, index) => {
          return <Marker key={index} id={index} position={{
           lat: singleLocation.latitude,
           lng: singleLocation.longitude
         }}
         onClick={() => markerOnclick(singleLocation.locationID)} />
        })
      }
*/
      showAllComments = async (singleLocation) => {
            //return (<div>this is comment!</div>)
            
            var res = await axios.post('/getComment', {
                locationId:singleLocation[0].locationID
            })
            
            
            var single = JSON.parse(JSON.stringify(res.data));
            console.log(single)
            if(res.data===[]) return (<p>"Comment not found!"</p>)
           


            
            return single.map((com,index) =>{
                return (<div>{com.user.userName}
                        
                    </div>
                )
            }) 
            
            

      }

    render() {
        return (
            <div className='comment-frame'>
                <button className="btn btn-primary" onClick={()=>{this.handleShowCommentOnclick()}}>Show Comments</button>
                <button className="btn btn-primary" onClick={()=>{this.handleAddCommentOnclick(this.props.user,this.props.singleLocation)}}>Add Comment</button>
                <div id='comments'>
                    {this.state.showComment && this.showAllComments(this.props.singleLocation)}
                </div>
            </div>
        );
    }
        
}


export default Comment