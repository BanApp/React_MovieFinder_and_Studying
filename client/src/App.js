
import Movie from './Components/Movie';
import MovieAdd from "./Components/MovieAdd";
import React, { Component } from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';


const styles = theme =>({
    root: {
        width: '100%',
        minWidth: 1080
    },
    menu: {
        marginTop:15,
        marginBottom:15,
        display:'flex',
        justifyContent: 'center'
    },
    paper:{
        marginLeft: 18,
        marginRight: 18
    },
    progress: {
        margin: theme.spacing.unit * 2
    },
    grow: {
    flexGrow: 1,
  },
    tableHead:{
        fontSize: '1.2rem'
    },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});

class App extends Component{

    constructor(props) {
        super(props);
        this.state ={
            movies: '',
            completed: 0,
            searchKeyword: '' //초기화 시키면 무조건 데이터 출력
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this)
    }

    stateRefresh() {
        this.setState({
            movies: '',
            completed: 0,
            searchKeyword: ''
        });
        this.callApi()
            .then(res => this.setState({movies: res}))
            .catch(err => console.log(err));
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

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    render() {
      const filteredComponents = (data) => {
          data = data.filter((c) => {
              return c.name.indexOf(this.state.searchKeyword) > -1;
          });
          return data.map((c) => {
              return <Movie stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name}
                            day={c.day} genre={c.genre} age={c.age}/>
          });
      }
      const { classes } = this.props;
      const cellList = ["번호","이미지","제목","개봉일","장르","관람 연령","설정"];
    return(
        <div className={classes.root}>
            <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
               영화 관리 시스템
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name = "searchKeyword"
                value = {this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
            <div className={classes.menu}>
            <MovieAdd stateRefresh={this.props.stateRefresh} />
            </div>
        <Paper className={classes.paper}>
            <Table>
                <TableHead>
                   <TableRow>
                       {cellList.map(c => {
                           return <TableCell className={classes.tableHead}>{c}</TableCell>
                       })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.movies ?
                    filteredComponents(this.state.movies) :
                    <TableRow>
                        <TableCell colSpan="6" align="center">
                            <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                        </TableCell>
                    </TableRow>
                    }
                </TableBody>
            </Table>
        </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(App);
