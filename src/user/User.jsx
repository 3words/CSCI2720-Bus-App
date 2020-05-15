/*
Group Memeber:
Yu Chun Fung Ray 1155094125
Pun Man Wing 1155092833
Ho Shing Fung 1155105818
Yip Kai Hin  1155105796
*/

import React from 'react';
import axios from 'axios';
import './User.css';
import SingleLocation from './SingleLocation';
import MapView from './MapView';

let allRoutes =[967, 969, 97, 48, 314, 19, 20, 182, 171, 260]

class Content extends React.Component {



  render() {
    return (
      <tbody>
        {this.props.locationList}
      </tbody>

    );
  }
}

class ListLocation extends React.Component {

  sortTableAlpha = (n) => {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];

        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  sortTableNum = (n) => {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  searchFunction = (inputKeyword,idx) => {
    var filter, table, tr, td, i, txtValue;
    filter = inputKeyword.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[idx];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  handleContextClick = (event) =>{
    event.preventDefault();
    let searchConfirm = window.confirm("Do you want to search for locations by "+event.target.innerHTML+" field?")
    if(!searchConfirm) return false;

    let inputKeyword = window.prompt("Enter keyword in "+event.target.innerHTML+" field");

    if(!inputKeyword) return false;

    var idx;
    switch (event.target.innerHTML) {
      case "LocID":
        idx = 0;
        break;
      case "Name":
        idx = 1;
        break;
      case "Longitude":
        idx = 2;
        break;
      case "Latitude":
        idx = 3;
        break;
      case "Route":
        idx = 4;
        break;
      case "Dest":
        idx = 5;
        break;
      case  "Orig":
        idx = 6;
      case  "ETA":
        idx = 7;
        break;
    }
    this.searchFunction(inputKeyword,idx)
  }


  render() {
    return (

      <table id='table' className="table table-bordered table-hover table-condensed">
      <thead><tr>
      <th title="Field #1" onContextMenu={this.handleContextClick} onClick={()=>this.sortTableNum(0)}>LocID</th>
      <th title="Field #2" onContextMenu={this.handleContextClick} onClick={()=>this.sortTableAlpha(1)}>Name</th>
      </tr></thead>
      <Content locationList={this.props.locationList}></Content>
    </table>


    );
  }
}


class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showList: true,
      showMap: false,
      singleLocation: false,
      locationList:"",
      allInfomation:"",
      detailsInfo: "",
      singleLocation: false,
      addFavour: false,
      eta:""
    };
  }

  toggleShowList = (event) => {
    this.setState({
      showList:!this.state.showList,
      showMap:!this.state.showMap
    })

  }


  changeListLocation = (ele) =>{
    this.setState({
      locationList:ele,
    })
  }

  changeallInfomation = (ele) =>{
    this.setState({
      allInfomation:ele
    })
  }


  handledetailsInfoBack = ()=>{
    this.setState({
      singleLocation:!this.state.singleLocation,
      detailsInfo: "",
      eta:"",
      showList:true,
      showMap:false
    })
  }

  handleOnClickTableRow = async (event,i) => {
    var locID = this.state.allInfomation[i].locationID;
    var res = await axios.post('/relatedStop', {
      locationID: locID
    })
    var relate = JSON.parse(JSON.stringify(res.data));
    console.log(relate)
    var tempEtaArray = [];
    for (var i=0; i<relate.length; i++) {
      var url='https://rt.data.gov.hk/v1/transport/citybus-nwfb/eta/CTB/00'+locID+'/'+relate[i].route.route;
      let request = new XMLHttpRequest();
      await request.open("GET", url,false);
       request.onreadystatechange = await function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var etaInfo = JSON.parse(request.responseText);
            for(var j=0; j<etaInfo.data.length; j++) {
              if(etaInfo.data[j].dir == relate[i].dir) {
                tempEtaArray.push(etaInfo.data[j])
              }
            }
        }
      }
      request.send();
    }
    this.setState({
      singleLocation:!this.state.singleLocation,
      eta: tempEtaArray,
      detailsInfo:relate,
      showList:false,
      showMap:false
    })
  }

  handleMarkerOnclick = async (locationID) => {
    var res = await axios.post('/relatedStop', {
      locationID: locationID
    })
    var relate = JSON.parse(JSON.stringify(res.data));
    var tempEtaArray = [];
    for (var i=0; i<relate.length; i++) {
      var url='https://rt.data.gov.hk/v1/transport/citybus-nwfb/eta/CTB/00'+locationID+'/'+relate[i].route.route;
      let request = new XMLHttpRequest();
      await request.open("GET", url,false);
       request.onreadystatechange = await function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var etaInfo = JSON.parse(request.responseText);
            for(var j=0; j<etaInfo.data.length; j++) {
              if(etaInfo.data[j].dir == relate[i].dir) {
                tempEtaArray.push(etaInfo.data[j])
              }
            }
        }
      }
      request.send();
    }
    this.setState({
      singleLocation:!this.state.singleLocation,
      eta: tempEtaArray,
      detailsInfo:relate,
      showList:false,
      showMap:false
    })
  }

  handleListLocations = async (tableOnclick) => {
    // alert(allRoutes.length)
    var eachRoute=[];
    var fullInfo =[];
       await axios.get('/allLocation')
       .then(function(res) {
         var obj = JSON.parse(JSON.stringify(res.data))

         fullInfo = obj;
         for (var i in obj){
           const rowidx = i;
           const row = (
               <tr onClick={(event) => tableOnclick(event,rowidx)}>
               <td>{obj[i].locationID}</td>
               <td>{obj[i].name}</td>
               </tr>
           );


           eachRoute.push(row)
         }

       });

     this.changeallInfomation(fullInfo);
     this.changeListLocation(eachRoute);
   };

   handleFavouriteOnclick = async(user)=>{

     this.setState({
       showList: !this.state.showList
     })


     await axios.get('/getFavourite',{
       params:{
        userName:user
      }
    })
     .then(function(res) {
       var obj = JSON.parse(JSON.stringify(res.data))
       console.log(obj[1].user.userName)
       console.log(obj[1].loc.locationID)

     });

   }


  render() {
    return (
      <div className='User-interface'>
        <div className="header">
          <button className="logout-button btn btn-primary" onClick={this.props.logout}>Logout</button>
          <span className="userName">Hello, {this.props.user}</span>
        </div>

        { !this.state.singleLocation  &&
          <div>
            <button className="btn btn-primary" onClick={()=>{this.toggleShowList()}}>Switch View (List/Map)</button>
            <button className="btn btn-primary" onClick={()=>{this.handleListLocations(this.handleOnClickTableRow)}}>Load List</button>
            <button className="btn btn-primary" onClick={()=>{this.handleFavouriteOnclick(this.props.user)}}>Get Favourite Locations</button>
          </div>
        }
        {this.state.showList &&
          <ListLocation locationList={this.state.locationList}></ListLocation>
        }

        {this.state.showMap &&
          <MapView markerOnclick = {this.handleMarkerOnclick} allInfomation={this.state.allInfomation}></MapView>
        }
        {this.state.singleLocation &&
          <SingleLocation  eta={this.state.eta} user={this.props.user} back={this.handledetailsInfoBack} relatedStop={this.state.detailsInfo}></SingleLocation>
        }
      </div>
    );
  }
}

export default User
