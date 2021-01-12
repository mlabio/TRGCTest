var Customers = [];

function PopulateCustomerGrid(customers) {
    $("#tblCustomers tbody").empty();
    var customersTable = $("#tblCustomers tbody");

    $.each(customers, function (index, customer) {
        var row = $("<tr />").attr({ id: customer.customerID, onclick: "EditCustomer(" + customer.customerID + ");" });

        row.append($("<td />").text(customer.customerID));
        row.append($("<td />").text(customer.firstName));
        row.append($("<td />").text(customer.lastName));
        row.append($("<td />").text(customer.categoryDescription));

        customersTable.append(row);
    });
}

function CategoryOptions(categories) {
    $.each(categories, function (index, category) {
        $("#category").append($("<option>", {
            value: category.categoryID,
            text: category.description
        }));
    });
}

function GetCustomers() {
    $.ajax({
        type: "GET",
        contentType: " application/json",
        url: window.location.origin + "/api/Customer",
        success: function (data) {
            Customers = data;
            PopulateCustomerGrid(Customers);
        },
        error: function (error, text, e) {
            alert(error.responseText);
        },
        async: true
    });

}


function EditCustomer(customerID) {
    $("#hdnCustomerID").val(customerID);
    var customer = Customers.filter(function (customer, index) { return customer.customerID == customerID })[0];
    
    $("#txtFirstName").val(customer.firstName);
    $("#txtLastName").val(customer.lastName);
    
    $("#customerInfo").dialog("open");
}

function SaveCustomer() {
    var customerUpdate = {
        customerID: $("#hdnCustomerID").val(),
        firstName: $("#txtFirstName").val(),
        lastName: $("#txtLastName").val(),
        categoryId: $("#category").val()
    };

    $.ajax({
        type: "POST",
        contentType: " application/json",
        url: window.location.origin + "/api/Customer",
        data: JSON.stringify(customerUpdate),
        success: function (data) {
            PopulateCustomerGrid(data);
        },
        error: function (error, text, e) {
            alert(error.responseText);
        },
        async: true
    });
}

function GetCategories() {
    $.ajax({
        type: "GET",
        contentType: " application/json",
        url: window.location.origin + "/api/Category",
        success: function (data) {
            CategoryOptions(data);
        },
        error: function (error, text, e) {
            alert(error.responseText);
        },
        async: true
    });
}