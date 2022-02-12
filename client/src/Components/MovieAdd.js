import React from "react";
import { post } from 'axios';

class MovieAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            movieName: '',
            day: '',
            genre: '',
            age: '',
            fileName: ''
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
            console.log(response.data);
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
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
        const config  = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);

    }


    render(){
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>영화 추가</h1>
                포스터 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName}
                                onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="movieName" value={this.state.movieName} onChange={this.handleValueChange}/><br/>
                개봉일: <input type="text" name="day" value={this.state.day} onChange={this.handleValueChange}/><br/>
                장르: <input type="text" name="genre" value={this.state.genre} onChange={this.handleValueChange}/><br/>
                관람연령: <input type="text" name="age" value={this.state.age} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default MovieAdd
