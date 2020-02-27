const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// app.get('/', function(req, res){
//     res.send('YOU"RE NOT AUTHENTICATED!')
// })
// app.get('/members/:kitty', function(req,res){
//     if(req.params.kitty === 'password'){
//         res.send('YOU"RE LOGGED IN!')
//     }else{
//         res.redirect('/')
//     }
// })
app.get('/notes', function(req,res){
    res.sendFile(path.join(__dirname, 'notes.html'))
})

app.post('/api/notes', function(req, res){
    console.log(req.body)
    fs.readFile('./db/db.json', 'utf-8', function(err, data){
        if(err){
            console.log(err)
            throw err;
        }
        let dataArr = JSON.parse(data)
        dataArr.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(dataArr), function(err){
            if(err) throw err;
            console.log('SUCCESS!')
            res.send('ok')
        })
    })
})

app.get('/api/notes', function(req,res){
    fs.readFile('./db/db.json', 'utf-8', function(err, data){
        if(err){
            console.log(err)
            throw err;
        }
        console.log(data)
        res.json(data)
})
})


app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`)
})