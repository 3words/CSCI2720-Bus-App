import React from 'react';
import axios from 'axios';
import './User.css';
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
        console.log(x.innerHTML)
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
    let deleteConfirm = window.confirm("Do you want to search for locations by "+event.target.innerHTML+" field?")
    if(!deleteConfirm) return false;

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
      showList: false,
      locationList:"",
      allInfomation:"",
      detailsInfo: "",
      singleLocation: false
    };
  }

  toggleShowList = (event) => {
    this.setState({
      showList:!this.state.showList
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
      detailsInfo: ""
    })
  }
  
  handleOnClickTableRow = (event,i) => {
    console.log(this.state.allInfomation[i]);
    axios.get('/relatedStop')
    .then(function(res){
       var relate = JSON.parse(JSON.stringify(res.data))
       this.setState({
        singleLocation:!this.state.singleLocation,
        detailsInfo:relate
      })

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
         //console.log(obj);
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
  /*
  handleListLocations = async (tableOnclick) => {
   // alert(allRoutes.length)
   var eachRoute=[];
   var fullInfo =[];
    for (var i =0;i<1;i++){
      await axios.get('/allStop',{
        params:{
          route : allRoutes[i]
        }
      })
      .then(function(res) {
        var obj = JSON.parse(JSON.stringify(res.data))
        //alert(obj.data[0]);
        fullInfo.push(obj);
        
        for (var i in obj.data){
          const rowidx = i;
          const row = (
              <tr onClick={(event) => tableOnclick(event,rowidx)}>
              <td>{obj.data[i].locID}</td>
              <td>{obj.data[i].name}</td>
              </tr>
          );
          eachRoute.push(row)
        }
    
      });
    }
    this.changeallInfomation(fullInfo);
    this.changeListLocation(eachRoute);
  };
*/


  render() {
    return (
      <div className='User-interface'>
        <div className="header">
          <button className="logout-button btn btn-primary" onClick={this.props.logout}>Logout</button>
          <span className="userName">Hello, {this.props.user}</span>
        </div>

        <button className="btn btn-primary" onClick={()=>{this.toggleShowList()}}>List all Location</button>
        <button className="btn btn-primary" onClick={()=>{this.handleListLocations(this.handleOnClickTableRow)}}>Load List</button>
        {this.state.showList &&
          <ListLocation locationList={this.state.locationList}></ListLocation>
        }
        {this.state.singleLocation &&
          <SingleLocation  back={this.handledetailsInfoBack} relatedStop={this.state.detailsInfo}></SingleLocation>
        }
      </div>
    );
  }
}

export default User
