const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4800;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/movies',(req, res) =>{
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '스파이더맨',
            'day': '20211221',
            'genre': '액션',
            'age': '12세 관람가'
        },

        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '어벤져스',
            'day': '20120514',
            'genre': '액션',
            'age': '15세 관람가'
        },

        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '데드풀',
            'day': '20170216',
            'genre': '액션',
            'age': '18세 관람가'
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
