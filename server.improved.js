//require is ~ to include
// gives access to http
const http = require( 'http' ),
// gives access to file system
fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code

      //mime is a way of saying what type of data you have
      mime = require( 'mime' ), 
      //directory ( no need to put in .create server)
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

const server = http.createServer( function( request,response ) {
  //added
  //sendFile() treansfers the file at the given path and sets the response HTTP header field based on the file extension

  //
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    //sendFile() treansfers the file at the given path and sets the response HTTP header field based on the file extension
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = '' 

  request.on( 'data', function( data ) {
      dataString += data 
    }
  )

  request.on( 'end', function() {
   // console.log( JSON.parse( dataString ) )
    
    // ... do something with the data here!!!
    dataJson = JSON.parse(dataString)


     let field2 = dataJson.Difficulty;
     let field3 = dataJson.Year;
     dataJson.DerivedSemester = field2 + '/' + field3


    // dataJson.note = "completed"
    console.log(dataJson)
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(dataJson)) 
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found!!!' )

     }
   })
}

server.listen( process.env.PORT || port )
