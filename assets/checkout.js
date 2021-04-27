const createPreferent = (data) => {
  var url_img = data.img.replace(".", "");
  var preference = {
    items: [
      {
        id: "1234",
        title: data.title,
        currency_id: "COP",
        picture_url: `${window.location.origin}${url_img}`,
        description: "Dispositivo móvil de Tienda e-commerce",
        quantity: 1,
        unit_price: data.price,
      },
    ],
    payer: {
      name: "Lalo",
      surname: "Landa",
      email: "test_user_83958037@testuser.com",
      phone: {
        area_code: "52",
        number: "5549737300",
      },
      address: {
        street_name: "Insurgentes Sur",
        street_number: 1602,
        zip_code: "03940",
      },
    },
    back_urls: {
      success: `${window.location.origin}/success`,
      failure: `${window.location.origin}/failure`,
      pending: `${window.location.origin}/pending`,
    },
    auto_return: "approved",
    payment_methods: {
      excluded_payment_methods: [
        {
          id: "amex",
        },
      ],
      excluded_payment_types: [
        {
          id: "atm",
        },
      ],
      installments: 6,
    },
    notification_url: `${window.location.origin}/notifications`,
    external_reference: "arturorafael30@gmail.com",
    expires: false,
  };

  fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer APP_USR-2572771298846850-120119-a50dbddca35ac9b7e15118d47b111b5a-681067803",
    },
    body: JSON.stringify(preference),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (preference) {
      if (preference.error) {
        alert(JSON.stringify(preference));
        return false;
      }
      let init_point = preference.init_point;
      window.location.href = init_point;
    })
    .catch(function () {
      alert("Unexpected error");
    });
};

$(document).on("submit", "#form-submit", function (e) {
  e.preventDefault();
  let data = $("#data").data();
  createPreferent(data);
});
