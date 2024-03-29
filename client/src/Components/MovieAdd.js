import React from "react";
import { post } from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";



const styles = theme => ({
    hidden: {
        display: 'none'
    },
});




class MovieAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            movieName: '',
            day: '',
            genre: '',
            age: '',
            keyWord: '',
            fileName: '',
            open: false
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addMovie()
            .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        })
        this.setState({
            file: null,
            movieName: '',
            day: '',
            genre: '',
            age: '',
            keyWord: '',
            fileName: '',
            open: false

        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value,
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addMovie = () => {
        const url = '/api/movies';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.movieName);
        formData.append('day',this.state.day);
        formData.append('genre',this.state.genre);
        formData.append('age',this.state.age);
        formData.append('keyWord',this.state.keyWord);
        const config  = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open:true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            movieName: '',
            day: '',
            genre: '',
            age: '',
            keyWord: '',
            fileName: '',
            open: false
        })
    }

    render(){
        const {classes} = this.props;
        return (
            <div>
                <Button style={{color:"#333333",fontWeight:"bold",backgroundColor:"#61DBFB",fontSize:"large"}} variant="contained" size={"lg"} onClick={this.handleClickOpen}>
                    Add Movie
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle style={{backgroundColor:"#333333",color:"#61DBFB",fontWeight:"bold",fontSize:"x-large"}}>영화 추가</DialogTitle>
                    <DialogContent style={{backgroundColor:"#333333",color:"#61DBFB",fontWeight:"bold",fontSize:"large"}}>
                        <input style={{color:"#61DBFB",fontWeight:"bold"}} className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName}
                                onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file" >
                            <Button style={{color:"#333333",fontWeight:"bold",backgroundColor:"#61DBFB"}} variant="outlined" color="primary" component="span" name="file" >
                                {this.state.fileName === "" ? "포스터 이미지 선택":this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField InputProps={{style: { color: '#61DBFB' },}} InputLabelProps={{style: { color: '#61DBFB' },}} label="제목" type="text" name="movieName" value={this.state.movieName} onChange={this.handleValueChange}/><br/>
                        <TextField InputProps={{style: { color: '#61DBFB' },}} InputLabelProps={{style: { color: '#61DBFB' },}} label="개봉일" type="text" name="day" value={this.state.day} onChange={this.handleValueChange}/><br/>
                        <TextField InputProps={{style: { color: '#61DBFB' },}} InputLabelProps={{style: { color: '#61DBFB' },}} label="장르" type="text" name="genre" value={this.state.genre} onChange={this.handleValueChange}/><br/>
                        <TextField InputProps={{style: { color: '#61DBFB' },}} InputLabelProps={{style: { color: '#61DBFB' },}} label="관람 연령" type="text" name="age" value={this.state.age} onChange={this.handleValueChange}/><br/>
                        <TextField InputProps={{style: { color: '#61DBFB' },}} InputLabelProps={{style: { color: '#61DBFB' },}} label="키워드" type="text" name="keyWord" value={this.state.keyWord} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions style={{backgroundColor:"#333333",color:"#61DBFB",fontWeight:"bold"}}>
                        <Button style={{color:"#333333",fontWeight:"bold",backgroundColor:"#61DBFB"}} variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button style={{color:"#61DBFB",fontWeight:"bold"}} variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(MovieAdd);
