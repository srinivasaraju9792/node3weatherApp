
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname , '../public'))

const app = express()


//define paths for express config
const publicDirectory = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')


// set up handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))


app.get('' , (req,res) => {
    res.render('index' , {
        title : 'Weather',
        name : 'Srinivas'
    })
})

app.get('/about' , (req,res) => {
    res.render('about' , {
        title : 'About Me',
        name : 'Srinivas'
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        title : 'Help',
        message : 'What do you want to know today',
        name : 'Srinivas'
    })
})

app.get('/weather' , (req, res) => {
    if(!req.query.address){
        return  res.send( {
             error : 'You must provide address'
         })
     } 

     geocode(req.query.address , (error , {Lattitude , Longitude , location} = {}) => {

        if(error){
            return res.send( {
                error 
            })
        }
           forecast(Lattitude, Longitude, (error, forecastdata ) => {
               if(error){
                return res.send( {
                    error 
                })
               }
           
               res.send( {
                forecast : forecastdata, 
                location,
                address : req.query.address
            })
            
          })
    
    
    })

   
})

app.get('/products' , (req, res) => {
    if(!req.query.search){
       return  res.send( {
            error : 'You must provide  search param'
        })
    }    
    res.send( {
        products : []
    })
})


app.get('/help/*' , (req, res) => {
    res.render('404' , {
        title : '404',
        name: 'Srinivas',
        errorMessage: 'Help Article not found'
    })
})

app.get('*' , (req, res) => {
    res.render('404' , {
        title : '404',
        name: 'Srinivas',
        errorMessage: 'Page not found'
    })
})

app.listen(3000 , () => {
    console.log('server is up on port 3000')
})