import React from "react";
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import MovieDelete from "./MovieDelete";

class Movie extends React.Component{
    render() {
        return(
       <TableRow>
           <TableCell>{this.props.id}</TableCell>
           <TableCell><img src={this.props.image} alt="profile"/></TableCell>
            <TableCell>{this.props.name}</TableCell>
            <TableCell>{this.props.day}</TableCell>
            <TableCell>{this.props.genre}</TableCell>
            <TableCell>{this.props.age}</TableCell>
           <TableCell><MovieDelete stateRefresh={this.props.stateRefresh} id = {this.props.id}/></TableCell>
       </TableRow>
        )
    }
}



export default Movie;
