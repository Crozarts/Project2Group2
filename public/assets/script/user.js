$(document).ready(function() {
    // Getting references to the name input and merchant container, as well as the table body
    var nameInput = $(".merchant-name");
    var merchantList = $("tbody");
    var merchantContainer = $(".merchant-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Merchant
    $(document).on("submit", ".merchant-form", handleMerchantFormSubmit);
    $(document).on("click", ".delete-merchant", handleDeleteButtonPress);
  
    // Getting the initial list of Merchants
    getMerchants();
  
    // A function to handle what happens when the form is submitted to create a new Merchant
    function handleMerchantFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertMerchant function and passing in the value of the name input
      upsertMerchant({
        name: nameInput
          .val()
          .trim()
      });
      $('.merchant-form')[0].reset();
    }
  
    // A function for creating an merchant. Calls getMerchants upon completion
    function upsertMerchant(merchantData) {
      $.post("/api/merchants", merchantData)
        .then(getMerchants);
    }
  
    // Function for creating a new list row for merchants
    function createMerchantRow(merchantData) {
      console.log(merchantData);
      var newTr = $("<tr>");
      newTr.data("merchant", merchantData);
      newTr.append("<td>" + merchantData.name + "</td>");
      newTr.append("<td># of posts will display when we learn joins in the next activity!</td>");
      newTr.append("<td><a href='/blog?merchant_id=" + merchantData.id + "'>Go to Posts</a></td>");
      newTr.append("<td><a href='/cms?merchant_id=" + merchantData.id + "'>Create a Post</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-merchant'>Delete Merchant</a></td>");
      return newTr;
    }
  
    // Function for retrieving merchants and getting them ready to be rendered to the page
    function getMerchants() {
      $.get("/api/merchants", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createMerchantRow(data[i]));
        }
        renderMerchantList(rowsToAdd);
        nameInput.val("");
      });
    }
  
    // A function for rendering the list of merchants to the page
    function renderMerchantList(rows) {
      merchantList.children().not(":last").remove();
      merchantContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        merchantList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no merchants
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Merchant before you can post a Product.");
      authorContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("merchant");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/merchants/" + id
      })
        .then(getMerchants);
    }
  });