const request = require('request')


const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoic3Jpbml2YXNhcmFqdTk3OTIiLCJhIjoiY2syN2FuajhrMDB6bTNtbnlsNTUyN2psZiJ9.smCyKWJWPA5G5CEQvohozw&limit=1'

    request({url, json : true} , (error , {body}) => {

        if(error){
            callback('unable to connect to location service' , undefined)
        }else if (body.features.length === 0) {
            callback('unable to find location , please check the location' , undefined)
        }
        else {
            callback(undefined , {
                Lattitude : body.features[0].center[1],
                Longitude : body.features[0].center[0],
                location : body.features[0].place_name
                
            } )
        }

    })

}



module.exports = geocode