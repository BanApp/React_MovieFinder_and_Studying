import React from "react";
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import MovieDelete from "./MovieDelete";

class Movie extends React.Component{
    render() {
        return(
       <TableRow>
           <TableCell style={{color:"white",fontSize:"medium",textAlign:"center"}}>{this.props.id}</TableCell>
           <TableCell style={{color:"white",fontSize:"medium",textAlign:"center"}}><img src={this.props.image} alt="profile"/></TableCell>
            <TableCell style={{color:"white",fontWeight:"bold",fontSize:"large",textAlign:"center"}}>{this.props.name}</TableCell>
            <TableCell style={{color:"white",fontSize:"medium",textAlign:"center"}}>{this.props.day}</TableCell>
            <TableCell style={{color:"white",fontSize:"medium",textAlign:"center"}}>{this.props.genre}</TableCell>
            <TableCell style={{color:"white",fontSize:"medium",textAlign:"center"}}>{this.props.age}</TableCell>
           <TableCell style={{color:"white",fontWeight:"bold",fontSize:"large",textAlign:"center"}}>{this.props.keyWord}</TableCell>
           <TableCell style={{color:"white"}}><MovieDelete stateRefresh={this.props.stateRefresh} id = {this.props.id}/></TableCell>
       </TableRow>
        )
    }
}



export default Movie;
