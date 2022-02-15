import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


class MovieDelete extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open:true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteMovie(id) {
        const url = '/api/movies/' + id;
        fetch(url, {
            method: 'DELETE'
        }).then((r) => this.props.stateRefresh());

    }
    render() {
        return (
            <div>
            <Button style={{fontWeight:"bold"}}variant="contained" color="secondary" onClick={this.handleClickOpen}>DELETE</Button>
        <Dialog open ={this.state.open} onClose={this.handleClose}>
                <DialogTitle style={{backgroundColor:"#333333",color:"red"}} onClose ={this.handleClose}>
                    삭제 경고
                </DialogTitle>
                <DialogContent style={{backgroundColor:"#333333"}}>
                    <Typography gutterBottom style={{backgroundColor:"#333333",fontWeight:"bold",fontSize:"large",color:"#61DBFB"}}>
                        선택한 영화 정보가 삭제 됩니다.
                    </Typography>

                </DialogContent>
                <DialogActions style={{backgroundColor:"#333333"}}>
                   <Button style={{color:"white",fontWeight:"bold"}} variant="contained" color="secondary" onClick={(e) => {this.deleteMovie(this.props.id)}}>삭제</Button>
                    <Button style={{color:"#61DBFB",fontWeight:"bold"}} variant="outlined" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
            </div>
    )
    }
}

export default MovieDelete
