$('#burger').click(() => {
    $('#menu').addClass('open');
});

$('#menu *').click(() => {
    $('#menu').removeClass('open');
});

loader = $('.loader');

let input_color = $('.order-input').css('border-color');

let phone = $('#phone');

phone.inputmask("+375 (999) 999-99-99");

$('#submit').click(() => {

    let is_error = false;

    let product = $('#product');
    let name = $('#name');

    $('.error-input').css('display', 'none');

    product.css('border-color', input_color);
    name.css('border-color', input_color);
    phone.css('border-color', input_color);

    if (!product.val()) {
        product.next().show();
        product.css('border-color', 'red');
        is_error = true;
    }

    if (!name.val()) {
        name.next().show();
        name.css('border-color', 'red');
        is_error = true;
    }

    if (!phone.val()) {
        phone.next().show();
        phone.css('border-color', 'red');
        is_error = true;
    }

    if (!is_error) {

        loader.css('display', 'flex');

        $.ajax({
            method: "POST",
            url: "http://testologia.ru/checkout",
            data: {product: product.val(), name: name.val(), phone: phone.val()}
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success) {
                    let form = $(".order-action");
                    let height = form.outerHeight();
                    // Скрываем все элементы формы
                    $(".order-action > *").not(".order-close").hide();
                    // Показываем блок с сообщением
                    $(".order-close").show();
                    form.css({
                        "display": "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        "min-height": height + "px" // Сохраняем высоту
                    });
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            });
    }

});

$('.product-btn').click(() => {
    // Находим название товара в том же блоке product, что и нажатая кнопка
    const productName = $(this).closest('.product').find('.product-title').text().trim();

    // Прокручиваем к форме заказа
    $('#order').get(0)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    $('#product').val(productName);

});

$('.main-btn').click(() => {
    // Прокручиваем к блоку с товарами
    $('#products').get(0)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});


