import { testing } from "./testing.js"

// Function to GET data and change content
const retrieveData = async (url = "") => { 
  const res = await fetch(url);
    try {
      const allData = await res.json()
      const lastEntry = allData[allData.length-1]
      document.getElementById("result").style.maxHeight = "fit-content"
      document.getElementById("result").style.padding = "1em"
      document.getElementById("text").innerHTML = lastEntry.text
      document.getElementById("polarity").innerHTML = lastEntry.polarity
      document.getElementById("confPol").innerHTML = Math.round(100 * lastEntry.polarity_confidence) /100
      document.getElementById("subjectivity").innerHTML = lastEntry.subjectivity
      document.getElementById("confSub").innerHTML = Math.round(100 * lastEntry.subjectivity_confidence) /100
      
      let colls = document.getElementById("collapsibles")
      colls.style.maxWidth = "1000px"
      colls.style.overflow = "scroll"
      colls.style.padding = "1em"

      let last = document.createElement("DIV")
      last.classList.add("lastResult")
      last.innerHTML = `<p>${lastEntry.text}</p>
      <p>${lastEntry.polarity}</p>
      <p>${Math.round(100 * lastEntry.polarity_confidence) /100}</p>
      <p>${lastEntry.subjectivity}</p>
      <p>${Math.round(100 * lastEntry.subjectivity_confidence) /100}</p>`
      colls.appendChild(last)
    }
    // Errorhandler
    catch(error) {
    console.log("Error getting data: ", error);
  }
}

// POST data and call GET function
const postData = async ( url = '', data = {}) => {
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },      
  body: JSON.stringify(data)
  })
  .then(() => retrieveData("/getData"))
}

// Function to call on submit, includes testing of input
const formHandler = (e) => {
    e.preventDefault()
    const input = document.getElementById("statement").value
    if (testing(input)) {
      postData("/addData", {text: input})
    } else {
      alert("Your statement does not match the parameters. It has to begin with an alphabetic character and needs to be between three and 100 characters long!")
    }
}

export { formHandler, postData, retrieveData }