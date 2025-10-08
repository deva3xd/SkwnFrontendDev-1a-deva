$(document).ready(function () {
  const url = "https://furniture-api.fly.dev/v1/products";

  $.get(url, function (response) {
    const data = response.data;

    // hero
    const heroProduct = data[Math.floor(Math.random() * data.length)];
    $("#hero-image").attr("src", heroProduct.image_path);
    $("#hero-name").text(heroProduct.name);
    $("#hero-price").text(`$${heroProduct.price}`);

    // furniture
    const furnitureData = data
      .filter(p => p.id !== heroProduct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    $(".product-image").each(function (index) {
      const product = furnitureData[index];
      if (product) {
        $(this).attr("src", product.image_path);
        $(this).attr("alt", product.name);
      }
    });

    // carousel
    const carouselContainer = $("#carousel"); 
    carouselContainer.empty();

    data.forEach(product => {
      carouselContainer.append(`
        <div class="card">
          <img src="${product.image_path}" alt="${product.name}">
          <div class="info">
            <div class="price">$${product.price}</div>
            <div class="name">${product.name}</div>
          </div>
        </div>
      `);
    });

    // carousel controll
    const scrollAmount = 250;

    $("#next").click(() => {
      carouselContainer.animate({ scrollLeft: "+=" + scrollAmount }, 400);
    });

    $("#prev").click(() => {
      carouselContainer.animate({ scrollLeft: "-=" + scrollAmount }, 400);
    });
  });

  $("#menu-toggle").click(function () {
      $(this).toggleClass("active");
      $("#nav-menu").toggleClass("show");
    });
});
