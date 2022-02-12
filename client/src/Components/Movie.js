import React from "react";
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

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
       </TableRow>
        )
    }
}



export default Movie;
