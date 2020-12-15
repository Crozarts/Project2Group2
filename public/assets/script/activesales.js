$(document).ready(function () {
    // Getting a reference to the input field where user adds a new product
    var $newItemInput = $("input.new-item");
    var $newPriceInput = $("input.item-price");
    var $newDescriptionInput = $("textarea.item-description")
    // Our new products will go inside the productContainer
    var $productContainer = $(".product-container");
    // Adding event listeners for deleting, editing, and adding products
    // $(document).on("click", "button.delete", deleteProduct);
    $(document).on("click", "input.sell", toggleSell);
    $(document).on("click", "input.trade", toggleTrade);
    // $(document).on("click", ".product-item", editProduct);
    // $(document).on("keyup", ".product-item", finishEdit);
    // $(document).on("blur", "button.delete", cancelEdit);
    $("#product-form").click(insertProduct);

    // Our Initial product array
    var products = [];

    // getting products from database when page loads
    getProducts();

    // This function resets the products displayed with new products from the database
    function initilizeRows() {
        $productContainer.empty();
        var rowsToAdd = [];
        for (var i = 0; i < products.length; i++) {
            rowsToAdd.push(createNewCard(products[i]));
        }
        $productContainer.prepend(rowsToAdd);
    }

    // This function grabs products from the database and update the view
    function getProducts() {
        $.get("/api/products", function (data) {
            products = data;
            initilizeRows();
        });
    }

    // This function deletes a product when the user clicks the delete button
    // function deleteProduct(event) {
    //     event.stopPropogation();
    //     var id = $(this).data("id");
    //     $.ajax({
    //         method: "DELETE",
    //         url: "/api/products" + id
    //     }).then(getProducts);
    // }

    // This function handles showing the input box for a user to edit their product
    // function editProduct() {
    //     var currentProduct = $(this).data("product");
    //     $(this).children().hide();
    //     $(this).children("input.edit").val(currentProduct.text);
    //     $(this).children("input.edit").show();
    //     $(this).children("input.edit").focus();
    // }

    // Toggles sell status
    function toggleSell(event) {
        event.stopPropogation();
        var product = $(this).parent().data("product");
        product.sell = !product.sell;
        updateProduct(product);
    }

    // Toggles trade status
    function toggleTrade(event) {
        event.stopPropogation();
        var product = $(this).parent().data("product");
        product.trade = !product.trade;
        updateProduct(product);
    }

    // This function starts updating a product in the database if a user hits the "Enter Key"
    // While in edit mode
    // function finishEdit(event) {
    //     var updatedProduct = $(this).data("product");
    //     if (event.which === 13) {
    //         updatedProduct.text = $(this).children("input").val().trim();
    //         $(this).blur();
    //         updateProduct(updatedProduct);
    //     }
    // }

    // This function updates a product in our database
    // function updateProduct(product) {
    //     $.ajax({
    //         method: "PUT",
    //         url: "/api/products",
    //         data: product
    //     }).then(getProducts);
    // }

    // The function is called whenver a product item is in edit mode and loses focus
    // This cancels any edits being made

    // function cancelEdit() {
    //     var currentProduct = $(this).data("product");
    //     if (currentProduct) {
    //         $(this).children().hide();
    //         $(this).children("input.edit").val(currentProduct.text);
    //         $(this).children("span").show();
    //         $(this).children("button").show();
    //     }
    // }

    // This function constructs a product-item row
    function createNewCard(product) {
        var $newInputCard = $(
            [
                "<div class='card product-card bg-dark'>",
                "<div class='card-header'>",
                "<h2 class='card-title text-white'>",
                product.name,
                "</h2>",
                "</div>",
                "<div class='card-body'>",
                "<ul class='list-group'>",
                "<li class='list-group-item text-white' style='background-color:#008060;'>Price:",
                product.price,
                "</li>",
                "<li class='list-group-item text-white' style='background-color:#008060;'>Description:",
                product.description,
                "</li>",
                "<li class='list-group-item text-white' style='background-color:#008060;'>Sell:",
                product.sell,
                "</li>",
                "<li class='list-group-item text-white' style='background-color:#008060;'>Trade:",
                product.trade,
                "</li>",
                "</ul>",
                "<a class='btn btn-primary btn-lg' href='#' role='button' style='color: black;'>Edit <i class='far fa-edit' style='color: black;'></i></a>",
                "<a class='btn btn-danger btn-lg' href='#' role='button' style='color: black;'>Delete <i class='far fa-trash-alt' style='color: black;'></i></a>",
                "</div>",
                "</div>",
            ].join("")
        );
        $newInputCard.find("button.delete").data("id", product.id);
        $newInputCard.find("input.edit").css("display", "none");
        $newInputCard.data("product", product);
        if (product.complete) {
            $newInputCard.find("span").css("text-decoration", "line-through");
        }
        return $newInputCard;
    }

    // This function inserts a new product into our database and then updates the view
    function insertProduct(event) {
        event.preventDefault();
        var product = {
            name: $newItemInput.val().trim(),
            price: $newPriceInput.val().trim(),
            sell: false,
            trade: false
        };

        $.post("/api/products", product, getProducts());
        $newItemInput.val("");
        $newPriceInput.val("");
        $newDescriptionInput.val("");
    }


})