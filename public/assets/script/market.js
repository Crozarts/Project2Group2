$(document).ready(function() {
    // blogContainer holds all of our products
    var blogContainer = $(".blog-container");
    var productCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleProductDelete);
    $(document).on("click", "button.edit", handleProductEdit);
    // Variable to hold our products
    var products;
  
    // The code below handles the case where we want to get blog products for a specific merchant
    // Looks for a query param in the url for merchant_id
    var url = window.location.search;
    var merchantId;
    if (url.indexOf("?merchant_id=") !== -1) {
      merchantId = url.split("=")[1];
      getProducts(merchantId);
    }
    // If there's no merchantId we just get all products as usual
    else {
      getProducts();
    }
  
    // This function grabs products from the database and updates the view
    function getProducts(merchant) {
      merchantId = merchant || "";
      if (merchantId) {
        merchantId = "/?merchant_id=" + merchantId;
      }
      $.get("/api/products" + merchantId, function(data) {
        console.log("Products", data);
        products = data;
        if (!products || !products.length) {
          displayEmpty(merchant);
        }
        else {
          initializeRows();
        }
      });
    }
  
    // This function does an API call to delete products
    function deleteProduct(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/products/" + id
      })
        .then(function() {
          getProducts(productCategorySelect.val());
        });
    }
  
    // InitializeRows handles appending all of our constructed product HTML inside blogContainer
    function initializeRows() {
      blogContainer.empty();
      var productsToAdd = [];
      for (var i = 0; i < products.length; i++) {
        productsToAdd.push(createNewRow(products[i]));
      }
      blogContainer.append(productsToAdd);
    }
  
    // This function constructs a product's HTML
    function createNewRow(product) {
      var formattedDate = new Date(product.createdAt).toLocaleDateString();
      var newProductCard = $("<div>");
      newProductCard.addClass("card");
      var newProductCardHeading = $("<div>");
      newProductCardHeading.addClass("card-header");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-info");
      var newProductTitle = $("<h2>");
      var newProductDate = $("<small>");
      var newProductMerchant = $("<h5>");
      newProductMerchant.text("Written by: Merchant name display is in next activity when we learn joins!");
      newProductMerchant.css({
        float: "right",
        color: "blue",
        "margin-top":
        "-10px"
      });
      var newProductCardBody = $("<div>");
      newProductCardBody.addClass("card-body");
      var newProductBody = $("<p>");
      newProductTitle.text(product.name + " ");
      newProductPrice.text(product.price);
      newProductDate.text(formattedDate);
      newProductTitle.append(newProductDate);
      newProductCardHeading.append(deleteBtn);
      newProductCardHeading.append(editBtn);
      newProductCardHeading.append(newProductTitle);
      newProductCardHeading.append(newProductMerchant);
      newProductCardBody.append(newProductBody);
      newProductCard.append(newProductCardHeading);
      newProductCard.append(newProductCardBody);
      newProductCard.data("product", product);
      return newProductCard;
    }
  
    // This function figures out which product we want to delete and then calls deleteProduct
    function handleProductDelete() {
      var currentProduct = $(this)
        .parent()
        .parent()
        .data("product");
      deleteProduct(currentProduct.id);
    }
  
    // This function figures out which product we want to edit and takes it to the appropriate url
    function handleProductEdit() {
      var currentProduct = $(this)
        .parent()
        .parent()
        .data("product");
      window.location.href = "/cms?product_id=" + currentProduct.id;
    }
  
    // This function displays a message when there are no products
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for Merchant #" + id;
      }
      blogContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No products yet" + partial + ", navigate <a href='/cms" + query +
      "'>here</a> in order to get started.");
      blogContainer.append(messageH2);
    }
  
  });
  