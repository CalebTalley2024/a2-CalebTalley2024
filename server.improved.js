//require is ~ to include

//http://localhost:3000/ 
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

// created when the server runs
// after you restart server -> any data that the client has added will be deleted
let appdata = [
  { "Task":"MathExam","ToDoType":"Work","Difficulty":"Hard","Year":"Spring","DerivedSemester":"Easy/Fall"}
  
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) { // used to retrieve information from a server
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
    // other mehtods: Delete, patch, put, 
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

  // gets all of the data for the request object
   
  request.on( 'data', function( data ) {
      dataString += data 
    }
  )

  // when I have received all of the data
  request.on( 'end', function() {
    if ( request.url === "/submit"){
   // console.log( JSON.parse( dataString ) )
    // ... do something with the data here!!!
    let dataJson = JSON.parse(dataString)
    //Server Logic
     let field2 = dataJson.Difficulty;
     let field3 = dataJson.Year;
     // Derived Field
     dataJson.DerivedSemester = field2 + '/' + field3
    appdata.push(dataJson)
    }

    if ( request.url === "/delete"){
      let dataJson = JSON.parse(dataString)
      let field2 = dataJson.Difficulty;
     let field3 = dataJson.Year;
     // Derived Field
    
     dataJson.DerivedSemester = field2 + '/' + field3
    //  let newAppData = appdata.filter(function (f){ return f == dataJson})
      // for (let i of appdata){
      // if (i = dataJson){
      //     appdata.splice(i,i);
      //   }
      // }

       appdata = appdata.filter(function (f){ // for some reason !== does not work, but == does
       return f.Task == dataJson.Task &&
       f.ToDoType == dataJson.ToDoType &&
       f.Difficulty == dataJson.Difficulty &&
       f.Year == dataJson.Year &&
       f.DerivedSemester == dataJson.DerivedSemester
      })


       // return f != `${dataJson}`})
       // for (let i of appdata){
       // if (i = dataJson){
       //     appdata.splice(i,i);
       //   }
      // }
 
  // console.log("yello")

  }


    // console.log(appdata)

    //deleting an object in appdata attempt
      ////////////////////////////////////////
        //     function findIndexOfTask(Json){
        //       for (let i of appdata){
        //         if(appdata.Task == Json.Task 
        //           && appdata.ToDoType == Json.ToDoType
        //           && appdata.Difficulty == Json.Difficulty
        //           && appdata.Year == Json.Year
        //           && appdata.DerivedSemester == Json.DerivedSemester){
        //             i = index
        //           }
        //           return index;
        //     }}
        // testObject = { 'model': 'honda', 'year': 2004, 'mpg': 30 }
        //     var index = findIndexOfTask(testObject);
        //     appdata.splice(index, index + 1);
        //     
      //////////////////////
  
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    //response.end(JSON.stringify(dataJson))  // sends data back to the client
    response.end(JSON.stringify(appdata))  // sends appdata back to the client
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