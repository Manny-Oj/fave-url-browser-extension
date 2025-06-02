// Declare variables for the input field and input button
let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabsBtn = document.getElementById("tab-btn");

// Get the leads from the localStorage - PS: JSON.parse()
// Store it in a variable, leadsFromLocalStorage
// Log out the variable
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// Check if leadsFromLocalStorage is truthy
// If so, set myLeads to its value and call renderLeads()
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage; // Assign the leads from localStorage to myLeads
  render(myLeads); // Render myLeads to display the leads
}

// Listen for click on the tabs button
tabsBtn.addEventListener("click", function () {
  // Grab current tab's URL using the tabs API
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Save the url of the current tab to the myLeads array
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// Create a variable, listItems, to hold all the HTML for the list items
// Assign it to an empty string to start with
// Wrap the code in a render() function
// Refactor the render() function to accept a parameter called leads instead of using global myLeads variable directly
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    //Create a list item with a link and wrap the lead in an anchor tag
    // Add the item to the listItems variable
    listItems += `<li>
        <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
        </li>`;
  }
  ulEl.innerHTML = listItems; // Render the listItems variable inside the unordered list element
}

// Listen for double clicks on the delete button (google it!)
// When clicked, clear localStorage, myLeads, and the DOM
deleteBtn.addEventListener("dblclick", function () {
  localStorage.removeItem("myLeads");
  myLeads = [];
  ulEl.innerHTML = ""; // Clear the DOM
});

// Use event listener to push the value "www.awesomelead.com" to the myLeads array
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value); // Add the value from the input field to the myLeads array
  inputEl.value = ""; // Clear the input field after adding
  localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Save the myLeads array to localStorage
  render(myLeads); // Call the renderLeads function to update the list
});
