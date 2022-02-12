import React,{ Component } from "react";
import logo from './logo.svg';
import Movie from './Components/Movie';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme =>({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit *3,
        overflowX: "auto"
    },
    table: {
        minWidth: 1080
    },
    progress: {
        margin: theme.spacing.unit * 2
    }
});

class App extends Component{

    state = {
        movies: "",
        completed: 0
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({movies: res}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/movies');
        const body = await response.json();
        return body;
        }

    progress = () =>{
        const {completed} = this.state;
        this.setState({completed: completed >= 100 ? 0 : completed+1})
    }

    render() {
      const { classes } = this.props
    return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>이미지</TableCell>
                        <TableCell>제목</TableCell>
                        <TableCell>개봉일</TableCell>
                        <TableCell>장르</TableCell>
                        <TableCell>관람 연령</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.movies ? this.state.movies.map(c => {
                        return(<Movie key = {c.id} id = {c.id} image ={c.image} name = {c.name} day = {c.day} genre = {c.genre} age = {c.age}/>);
                    }) :
                    <TableRow>
                        <TableCell colSpan="6" align="center">
                            <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                        </TableCell>

                    </TableRow>
                    }
                </TableBody>
            </Table>
        </Paper>
    );
  }
}

export default withStyles(styles)(App);
