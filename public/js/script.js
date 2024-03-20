'use strict'

const { buildAddInventory } = require("../../controllers/invController")

let classificationList = document.querySelector("#classificationDropList")
classificationList.addEventListener("change", function () {
    let classification_id = classificationList.value
    let classificationIdURL = "/inv/getInventory/" + classification_id
    fetch(classificationIdURL)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
            throw Error("Network Response was NOT OK")
        })
        .then(function (data) {
            buildInventoryList(data)
        })
        .catch(function (error) {
            (error.message)
        })
})

function buildInventoryList(data) {
    let inventoryDisplay = document.getElementById("inventoryDisplay")
    let dataTable = '<thead>'
    dataTable += '<tr><th>Vehicle Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>'
    dataTable += '</thead>'
    dataTable += '<tbody>'
    data.forEach(function (element) {
        dataTable += `<tr><td>${element.inv_make} ${element.inv_model}</td>`
        dataTable += `<td><a href="/inv/edit/${element.inv_id}" title="Click to Update">Modify</a></td>`
        dataTable += `<td><a href="/inv/delete/${element.inv_id}" title="Click to Delete">Delete</a></td></tr>`
    })
    dataTable += '</tbody>'
    inventoryDisplay.innerHTML = dataTable
}