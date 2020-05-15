/*
Group Memeber:
Yu Chun Fung Ray 1155094125
Pun Man Wing 1155092833
Ho Shing Fung 1155105818
Yip Kai Hin  1155105796
*/

import React from 'react';
import axios from 'axios';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showComment: false,
          allComment: ""
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
        else{
            alert("Add Successfully!")
            var res = await axios.post('/getComment', {
                locationId:singleLocation[0].locationID
            })
            var single = JSON.parse(JSON.stringify(res.data));
            this.setState({
            allComment: single,
            });
        }
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
        if(res.data===[]) return (<p>"Comment not found!"</p>)
        this.setState({
          allComment: single,
          showComment: !this.state.showComment
        });
      }

    render() {
        return (
            <div className='comment-frame'>
                <button className="btn btn-primary" onClick={()=>{this.showAllComments(this.props.singleLocation)}}>Show Comments</button>
                <button className="btn btn-primary" onClick={()=>{this.handleAddCommentOnclick(this.props.user,this.props.singleLocation)}}>Add Comment</button>
                <div id='comments'>
                    {this.state.showComment && this.state.allComment.map((com,index) =>

                    <table style={{width:700 }}>
                    <tr>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Time Stamp</th>
                    </tr>
                    <tr>
                        <td>{com.user.userName}</td>
                        <td>{com.comment}</td>
                        <td>{com.timeStamp}</td>
                    </tr>
                    </table>

                    )}
                </div>
            </div>
        );
    }

}


export default Comment