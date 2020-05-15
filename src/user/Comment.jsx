import React from 'react';


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

      handleAddCommentOnclick = ()=> {
        return false;
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
      showAllComments = () => {
            return (<div>this is comment!</div>)
      }

    render() {
        return (
            <div className='comment-frame'>
                <button className="btn btn-primary" onClick={()=>{this.handleShowCommentOnclick()}}>Show Comments</button>
                <button className="btn btn-primary" onClick={()=>{this.handleAddCommentOnclick()}}>Add Comment</button>
                <div id='comments'>
                    {this.state.showComment && this.showAllComments()}
                </div>
            </div>
        );
    }
        
}


export default Comment