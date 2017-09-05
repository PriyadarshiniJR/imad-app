var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne = {
  title : 'Article One',
  heading : 'Article One',
  date : 'Sep 05,2017',
  content : `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam elementum nunc non placerat lobortis. Etiam a sem luctus, ullamcorper sapien at, porttitor dui. Curabitur a ligula sed purus ornare pulvinar. Nullam augue quam, mollis eget nulla non, scelerisque pulvinar nisi. Etiam diam ex, vestibulum id consequat vitae, feugiat quis orci. Cras in eros vel velit venenatis ornare id vel ipsum. Mauris vel libero massa.
    </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam elementum nunc non placerat lobortis. Etiam a sem luctus, ullamcorper sapien at, porttitor dui. Curabitur a ligula sed purus ornare pulvinar. Nullam augue quam, mollis eget nulla non, scelerisque pulvinar nisi. Etiam diam ex, vestibulum id consequat vitae, feugiat quis orci. Cras in eros vel velit venenatis ornare id vel ipsum. Mauris vel libero massa.
    </p>` 
};

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `<html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width initial-scale=1">
            <link href="/ui/style.css" rel="stylesheet">
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                
                <hr/>
                
                <h3>${date}</h3>
                
                <div>
                    ${date}
                </div>
                
                <div>
                    ${content}
                </div>
            
            </div>
        </body>
    </html>`;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req, res){
   res.send(createTemplate(articleOne));
});

app.get('/article-two',function(req, res){
   res.send('Article two will be served here.');
});

app.get('/article-three',function(req, res){
   res.send('Article three will be served here.'); 
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
