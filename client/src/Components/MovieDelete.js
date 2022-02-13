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
            <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
        <Dialog open ={this.state.open} onClose={this.handleClose}>
                <DialogTitle onClose ={this.handleClose}>
                    삭제경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 영화 정보가 삭제됩니다.
                    </Typography>

                </DialogContent>
                <DialogActions>
                   <Button variant="contained" color="primary" onClick={(e) => {this.deleteMovie(this.props.id)}}>삭제</Button>
                    <Button variant="oulined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
            </div>
    )
    }
}

export default MovieDelete