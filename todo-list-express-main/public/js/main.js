const deleteBtn = document.querySelectorAll('.fa-trash') // creates a constant variable called deleteBtn that holds the value of all the elements with the class of .fa-trash
const item = document.querySelectorAll('.item span') // creates a constant variable called item that selects all spans that are children of elements with the class of .item
const itemCompleted = document.querySelectorAll('.item span.completed') // creates a constant variable called itemCompleted that selects all spans with the class of .completed that are children of elements with the class of .item

Array.from(deleteBtn).forEach((element)=>{ // creates and array from all elements held in the variable deleteBtn and loops over each element via .forEach() array method
    element.addEventListener('click', deleteItem) // adds event listener that exectues deleteItem upon click event to element
})//ends the forEach loop

Array.from(item).forEach((element)=>{ // creates an array from all elements held in the variable item and loops over each element with forEach
    element.addEventListener('click', markComplete) // adds event listener that executes markComplete upon click event to element
})//ends the forEach loop

Array.from(itemCompleted).forEach((element)=>{// creates an array from all elements held in the variable itemCompelted and loops over each element with forEach
    element.addEventListener('click', markUnComplete) // adds event listener that executes markUnComplete upon click event to element
})// ends the forEach loop

async function deleteItem(){ // creats an asynchronous function called deleteItem
    const itemText = this.parentNode.childNodes[1].innerText // declares a variable called itemText that contains the value inner text of the second element of childNodes of the parentNode of the clicked element itself
    try{ // begins a try block that will execute code if successful
        const response = await fetch('deleteItem', { // creates a variable called response that awaits a fetch to the route at endpoint deleteItem and defines how to format the data
            method: 'delete', // defines the method of delete
            headers: {'Content-Type': 'application/json'}, // gives information about the type of returned data as json
            body: JSON.stringify({ // declares how to format the body of returned data as a stringified JSON object
              'itemFromJS': itemText // creates key:value pair with key of 'itemFromJS' and value of itemText
            }) // ends the formatting information for the stringified JSON data
          }) // ends the await fetch
        const data = await response.json() // declares a variable called data that awaits the response and makes it json()
        console.log(data)// console logs the data
        location.reload() // reloads the page

    }catch(err){ // opens catch block that catches and throws the error
        console.log(err) // print the error to the console
    } // closes catch block
} // closes the deleteItem async function

async function markComplete(){ // creates an asynchronous function called markComplete
    const itemText = this.parentNode.childNodes[1].innerText // declares a variable called itemText that contains the value inner text of the second element of childNodes of the parentNode of the clicked element itself
    try{ // begins a try block that will execute code if successful
        const response = await fetch('markComplete', { // declares a constant variable called response that awaits a fetch to the route at endpoint markComplete and defines how to format the data
            method: 'put', // sets method to PUT new item or overwrite existing item
            headers: {'Content-Type': 'application/json'}, // gives information about the type of returned data as json
            body: JSON.stringify({ // declares how to format the body of returned data as a stringified JSON object
                'itemFromJS': itemText // creates key:value pair with key of 'itemFromJS' and value of itemText
            }) // ends the formatting for data body
          }) // ends the await fetch
        const data = await response.json() // declares a constant variable called data containing response data as JSON 
        console.log(data) // console logs returned data
        location.reload() // reloads page

    }catch(err){ // opens catch block that catches and throws the error
        console.log(err) //console logs error
    } // closes the catch block
} // closes the markComplete async function

async function markUnComplete(){ // creates an asynchronous function called markUnComplete
    const itemText = this.parentNode.childNodes[1].innerText // declares a constant variable called itemText that contains the value inner text of the second element of childNodes of the parentNode of the clicked element
    try{ // starts the try block
        const response = await fetch('markUnComplete', { // declares a variable called response that awaits a fetch of the route at enpoint markUnComplete and, as the second parameter, declares how to format returned data
            method: 'put', // sets the method to PUT new item or overwrite existing item
            headers: {'Content-Type': 'application/json'}, // gives information about the type of returned data
            body: JSON.stringify({ // declares how to format the body of returned data as a stringified JSON object
                'itemFromJS': itemText // instructs how to format key:value pair of the returned stringified Body content with a key called itemFromJS and it's value being the value of the variable called itemText
            }) // ends the formatting for data body
          }) // ends the await fetch
        const data = await response.json() // declares a variable called data that awaits a promise from the response and resolves it to a JSON object
        console.log(data) // prints data to the console
        location.reload() // reloads page

    }catch(err){ // opens catch block that catches and throws the error
        console.log(err) //console logs the error
    } // ends catch block
} // closes markUnComplete async function