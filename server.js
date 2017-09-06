var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
  user : 'priyadarshinijr',
  database : 'priyadarshinijr',
  host : 'db.imad.hasura-app.io',
  port: '5432',
  password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


var articles = {
    'article-one' : {
        title : 'Article One',
        heading : 'Article One',
        date : 'Sep 05,2017',
        content : `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam elementum nunc non placerat lobortis. Etiam a sem luctus, ullamcorper sapien at, porttitor dui. Curabitur a ligula sed purus ornare pulvinar. Nullam augue quam, mollis eget nulla non, scelerisque pulvinar nisi. Etiam diam ex, vestibulum id consequat vitae, feugiat quis orci. Cras in eros vel velit venenatis ornare id vel ipsum. Mauris vel libero massa.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam elementum nunc non placerat lobortis. Etiam a sem luctus, ullamcorper sapien at, porttitor dui. Curabitur a ligula sed purus ornare pulvinar. Nullam augue quam, mollis eget nulla non, scelerisque pulvinar nisi. Etiam diam ex, vestibulum id consequat vitae, feugiat quis orci. Cras in eros vel velit venenatis ornare id vel ipsum. Mauris vel libero massa.
            </p>` 
    },
    'article-two' : {
        title : 'Article Two',
        heading : 'Article Two',
        date : 'Sep 10,2017',
        content : `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam elementum nunc non placerat lobortis. Etiam a sem luctus, ullamcorper sapien at, porttitor dui. Curabitur a ligula sed purus ornare pulvinar. Nullam augue quam, mollis eget nulla non, scelerisque pulvinar nisi. Etiam diam ex, vestibulum id consequat vitae, feugiat quis orci. Cras in eros vel velit venenatis ornare id vel ipsum. Mauris vel libero massa.
            </p>` 
    },
    'article-three' : {
        title : 'Article Two',
        heading : 'Article Two',
        date : 'Sep 10,2017',
        content : `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam elementum nunc non placerat lobortis. Etiam a sem luctus, ullamcorper sapien at, porttitor dui. Curabitur a ligula sed purus ornare pulvinar. Nullam augue quam, mollis eget nulla non, scelerisque pulvinar nisi. 
            </p>` 
    }
};

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = 
    `<html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width initial-scale=1">
            <link href="/ui/style.css" rel="stylesheet">
        </head>
        <body>
            <div class="container">
                <div><a href="/">Home</a></div>
                <hr/>
                <h3>${date}</h3>
                <div>${date}</div>
                <div>${content}</div>
            </div>
        </body>
    </html>`;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req, res){
    pool.query("SELECT * FROM user",function(err,result){
        if(err)
            res.status(500).send(err.toString());
        else
            res.send(JSON.stringify(result.rows));
    });
});

var counter = 0;
app.get('/counter',function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
})

var names = [];
app.get('/submit-name',function(req, res){
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});


app.get('/:articleName',function(req, res){
   var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/IMG_20160115_101556.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'IMG_20160115_101556.jpg'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
