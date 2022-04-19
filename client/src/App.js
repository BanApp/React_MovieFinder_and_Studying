
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
import imgLogo from './movielogo.png'


const styles = theme =>({
    root: {
        width: '100%',
        minWidth: 1080,
    },
    menu: {
        marginTop:15,
        marginBottom:15,
        display:'flex',
        justifyContent: 'center',

    },
    paper:{
        marginLeft: 18,
        marginRight: 18,
        backgroundColor: "#333333"
    },
    progress: {
        margin: theme.spacing.unit * 2
    },
    grow: {
    flexGrow: 1,
  },
    tableHead:{
        fontSize: '1.2rem',
        verticalAlign:"center"
    },
  menuButton: {
        color:"#333333",
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
        backgroundColor: fade(theme.palette.common.white, 0.4),
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
      color:"black"
  },
  inputRoot: {
    color: 'white',
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
      width: 250,
      '&:focus': {
        width: 300,
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
            searchKeyword: ''  //초기화 시키면 무조건 데이터 출력
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
              return c.keyWord.indexOf(this.state.searchKeyword.split(" ")[0])>-1 && c.keyWord.indexOf(this.state.searchKeyword.split(" ")[1])> -1
                  ||c.keyWord.indexOf(this.state.searchKeyword)>-1;//메인 화면에 항상 리스트 출력
          });
          return data.map((c) => {
              return <Movie stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name}
                            day={c.day} genre={c.genre} age={c.age} keyWord={c.keyWord}/>
          });
      }
      const { classes } = this.props;
      const cellList = ["NO.","IMG","TITLE","DATE","GENRE","FILM RATING","KEY WORD","SETTING"];
    return(
        <div className={classes.root}>
            <AppBar style={{backgroundColor:"#61DBFB"}} position="static">
          <Toolbar>
            <IconButton style={{color:"#333333"}}className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography style={{color:"#333333",fontWeight:"bold",fontSize:"x-large",verticalAlign:"center"}} className={classes.title} variant="h6" color= "inherit" noWrap>
               "IMG" Nation by MOVIFY  <img src={imgLogo} style={{verticalAlign:"center"}}/>
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase style={{color:"black",fontWeight:"bold",}}
                placeholder="Enter keywords with spaces"
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
        </AppBar >
            <div className={classes.menu}>
            <MovieAdd stateRefresh={this.props.stateRefresh} />
            </div>
        <Paper className={classes.paper} >
            <Table>
                <TableHead>
                   <TableRow>
                       {cellList.map(c => {
                           return <TableCell style={{color:"#61DBFB",fontSize:"medium",fontWeight:"bold",textAlign:"center"}} className={classes.tableHead}>{c}</TableCell>
                       })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.movies ?
                    filteredComponents(this.state.movies) :
                    <TableRow>
                        <TableCell colSpan="7" align="center" >
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
