$(document).ready(function () {
    // Getting jQuery references to the product name, price, form, and merchant select
    // var nameInput = $(".new-item");
    // var priceInput = $(".item-price");
    // var descriptionInput = $(".item-description");
    // var sellInput = $("#sell");
    // var tradeInput = $("#trade");
    // var activeSalesForm = $("#activeSales");
    var merchantSelect = $("#merchant");
    // Adding an event listener for when the form is submitted
    // $(activeSalesForm).on("summit", handleFormSubmit);
    $(".submit").click(handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a product)
    var url = window.location.search;
    var productId;
    var merchantId;
    // Sets a flag for whether or not we're updating a product to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the product id from the url
    // In '?product_id=1', productId is 1
    if (url.indexOf("?product_id=") !== -1) {
        productId = url.split("=")[1];
        getProductData(productId, "product");
    }
    // Otherwise if we have an merchant_id in our url, preset the merchant select box to be our Merchant
    else if (url.indexOf("?merchant_id=") !== -1) {
        merchantId = url.split("=")[1];
    }

    // Getting the merchants, and their products
    getMerchants();

    // A function for handling what happens when the form to create a new product is submitted
    function handleFormSubmit(event) {
        console.log("we are inside handleFormSubmit");
        var nameInput = $(".new-item").val();
        var priceInput = $(".item-price").val();
        var descriptionInput = $(".item-description").val();
        var sellInput = $("#sell").val();
        var tradeInput = $("#trade").val();
        // var activeSalesForm = $("#activeSales");
        console.log("name",nameInput);
        console.log("price",priceInput);
        console.log("description",descriptionInput);
        console.log(sellInput);
        console.log(tradeInput);
        console.log(merchantSelect);
        event.preventDefault();
        // Wont submit the product if we are missing a name, price, or merchant
        if (!nameInput.val().trim() || !priceInput.val().trim() || !descriptionInput.val().trim() || !sellInput.val() || !tradeInput.val() || !merchantSelect.val()) {
            console.log("we are returning");
            return;
        }
        // Constructing a newProduct object to hand to the database
        var newProduct = {
            name: nameInput
                .val()
                .trim(),
            price: priceInput
                .val()
                .trim(),
            description: descriptionInput
                .val()
                .trim(),
            sell: sellInput
                .val(),
            trade: tradeInput
                .val(),
            MerchantId: merchantSelect.val()
        };
        console.log(newProduct);

        // If we're updating a product run updateProduct to update a product
        // Otherwise run submitProduct to create a whole new product
        // if (updating) {
        //     newProduct.id = productId;
        //     updateProduct(newProduct);
        // } else {
            submitProduct(newProduct);
        // }
    }

    // Submits a new product and brings user to market page upon completion
    function submitProduct(product) {
        console.log("submit products");
        $.post("/api/products", product, function () {
            window.location.href = "/market";
        });
    }

    // Gets product data for the current product if we're editing, or if we're adding to an merchant's existing products
    function getProductData(id, type) {
        var queryUrl;
        switch (type) {
            case "product":
                queryUrl = "/api/products/" + id;
                break;
            case "merchant":
                queryUrl = "/api/merchants/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function (data) {
            if (data) {
                console.log(data.MerchantId || data.id);
                // If this post exists, prefill our activeSales forms with its data
                nameInput.val(data.name);
                priceInput.val(data.price);
                descriptionInput.val(data.description);
                sellInput.val(data.sell);
                tradeInput.val(data.trade);
                merchantId = data.MerchantId || data.id;
                // If we have a post with this id, set a flag for us to know to update the post
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get Merchants and then render our list of Merchants
    function getMerchants() {
        $.get("/api/merchants", renderMerchantList);
    }
    // Function to either render a list of merchants, or if there are none, direct the user to the page
    // to create an merchant first
    function renderMerchantList(data) {
        if (!data.length) {
            window.location.href = "/user";
        }
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createMerchantRow(data[i]));
        }
        merchantSelect.empty();
        console.log(rowsToAdd);
        console.log(merchantSelect);
        merchantSelect.append(rowsToAdd);
        merchantSelect.val(merchantId);
    }

    // Creates the merchant options in the dropdown
    function createMerchantRow(merchant) {
        var listOption = $("<option>");
        listOption.attr("value", merchant.id);
        listOption.text(merchant.name);
        return listOption;
    }

    // Update a given product, bring user to the market page when done
    function updateProduct(product) {
        $.ajax({
                method: "PUT",
                url: "/api/products",
                data: product
            })
            .then(function () {
                window.location.href = "/market";
            });
    }



})