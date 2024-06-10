$(document).ready(() => {
  $("#product-list").hide(); // Hide product list initially

  $("#category").change(() => {
    // Bind to change event of the select element
    $("#product-list").empty(); // Clear previous product list
    let selectedCategory = $("#category").val(); // Get the selected category

    $.ajax({
      url: "product.json",
      type: "GET",
      dataType: "json",
      success: (data) => {
        $.each(data, (key, product) => {
          if (product.type === selectedCategory) {
            // Filter products by selected category
            let productHTML = `
              <div class="col-6 col-lg-3 m-3">
                  <div class="card shadow-sm"  data-name="${product.name}" data-type="${product.type}" data-price="${product.price}" data-img="${product.img}" data-alt="${product.alt}" data-description="${product.description}">
                    <div class="text-center">
                      <img src="${product.img}" class="card-img-top mt-2" alt="${product.alt}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text"><b>Price:</b> ${product.price}</p>
                        <p class="card-text"><b>Type:</b> ${product.type}</p>
                    </div>
                  </div>
              </div>`;
            $("#product-list").append(productHTML);
          }
        });

        $("#product-list").show(); // Show product list after filtering
      },
      error: (xhr, status, error) => {
        console.error("Error loading products:", error);
      },
    });
  });

  // Event delegation for dynamically created product cards
  $("#product-list").on("click", ".card", function () {
    class Product {
      constructor(element) {
        this.name = $(element).data("name");
        this.type = $(element).data("type");
        this.price = $(element).data("price");
        this.img = $(element).data("img");
        this.alt = $(element).data("alt");
        this.description = $(element).data("description");
      }
    }

    let product = new Product(this);
    // Store the product object in local storage
    localStorage.setItem("selectedProduct", JSON.stringify(product));

    // Redirect to the new page
    window.location.href = "card.html";
  });
});
