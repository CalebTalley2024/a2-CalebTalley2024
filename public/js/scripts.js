// // Add some Javascript code here, to run on the front end.
// // console.log("Welcome to assignment 2!")
// // alert("this script is running")
// // getElementbyID: gets element from our HTML based on it's ID
// let addToDoButton = document.getElementById("taskNewButton");
// let toDoList = document.getElementById("toDoList");
// let newTask = document.getElementById("newTask");
// console.log(" test")
// //addEventListener: waits for an event to occur 
// //when a click occurs, this function occurs
// addToDoButton.addEventListener('click', function(){ // NOT WORKING
    
//     var paragraph = document.createElement('p');
//     // put our newTask value into our newly made paragraph
//     paragraph.innerText = newTask.value;
//     // add this paragraph to our toDoList 
//     toDoList.appendChild(paragraph);
    

//     // this clears our newTask input field so that we can add a new task
//     // newTask.value = "";

//     // crosses out item if you click
//     paragraph.addEventListener('click',function(){
//         paragraph.style.textDecoration = "line-through";
//     })

//     // removes item if you double click
//     paragraph.addEventListener('dblclick',function(){
//         toDoList.removeChild(paragraph);
//     })
// })

// submit button
const submit = function( e ) {
    // prevent default from trying to go to another page
    e.preventDefault()

// references first with attribute inside parenthesis ( ~ to getElementById but more general )
    const input = document.querySelector( '#newTask' ) 
    const field1 = document.querySelector( '#ToDoType')
    const field2 = document.querySelector('#Difficulty')
    const field3= document.querySelector("#Semester")
    const Year = document.querySelector("#Year"),
    // creating json object from our input     
          json  = { Task: input.value, ToDoType: field1.value, Difficulty: field2.value, Year: field3.value},
            //json is used since it makes data easy to manipulate
// stringify will convert this object into a string
          body = JSON.stringify( json )
          
    // fetch will do an ansynchronous network request ( ones used in server) - returns a promise?
    fetch( '/submit', { // fetch is where you specify the url/ resouce that you want to see
      method:'POST',
      body // send body to server
    })
    // then is a callback function
    // javascript promise: value that is unknown now, it is called when it is received by the server?
    .then(  // when the rewsponse to the server comes, do this
      function(  response ) { // body is in here
      // do something with the reponse 
      //  console.log( response.json() )
        return response.json() // extracts json and returns it
      }
    )
    .then( function(json){ // promise
      // do something with res 
      console.log(json)
      
      
    })

    return false
  }
 // makes sure what's inside function does not run until everything on the page has loaded
  window.onload = function() {
    // const button = document.querySelector( 'button' )
   const button = document.querySelector( '#submitButton' )
    button.onclick = submit

    const button1 = document.querySelector( '#taskNewButton' )
    button1.onclick = plus
    // put scirpts.js buttons in here
  }



  const plus = function(e){
    e.preventDefault()

    const input = document.querySelector( '#newTask' ) 
    const field1 = document.querySelector( '#ToDoType')
    const field2 = document.querySelector('#Difficulty')
    const field3= document.querySelector("#Semester")
    const Year = document.querySelector("#Year")

    // table

    const Test = document.querySelector("#test")
    let TaskTable = document.createElement('table')
    
        // TaskTable.innerText =  input.value + " " + field1.value + " " + field2.value + " " + field3.value + " " + Year.value + " " 
        //TaskTable.innerHTML = `<h1> ${input.value} </h1>` + "new"
        TaskTable.innerHTML = 
        `<tr>
        <td> ${input.value} </td>
        <td> ${field1.value} </td>
        <td> ${field2.value} </td>
        <td> ${field3.value}</td>
        <td> ${Year.value}</td>
        <td> ${field2.value} / ${Year.value} </td>
      </tr>`
      // add a button in inner.HTML for delete?
        
        Test.appendChild(TaskTable)   

  }

    

  /** Delete
   * dblclick on local list to delete data
   * then click the update button to update/submit local data with the server's data
   * use HTTP method Delete
   * input: JSON
   */

  /** Update
   * adds local tasks to your database
   * 
   * 
   */

  /**
   * StoredTasks
   * gets data form server and puts it on page
  */

