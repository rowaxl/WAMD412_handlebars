const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const redditData = require('./data.json');

const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views-hbs'));

app.get('/', (req, res) => {
    //beginning of---for handlebars sample data
    const data = redditData['chickens'];
    //end of----for handlebars sample data
    res.render('home', {
        title: 'HOME PAGE',
        ...data
    });
});

app.get('/cats', (req, res) => {
    const cats = ['Blue', 'Winston', 'Ning']
    res.render('cats', { cats });
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params
    // console.log(subreddit);
    const data = redditData[subreddit];
    if(data){
        res.render('subreddit', { ...data });
    }else{
        res.render('notfound', { subreddit });
    }
});

app.listen(5000, () => console.log('Server is running on PORT: 5000'))