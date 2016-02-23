var price1 = 0,
    price2 = 0,
    sign = '',
    float = 0,
    obj = $(".form-price");

$(".keyboard-button-mbutton").on("click", function () {
    var newPrice = parseInt($(this).text());
    updatePrice(newPrice)
});
$(".keyboard-button-reset").on("click", function () {
    float = 0;
    price1 = 0;
    price2 = 0;
    sign = '';
    computePrice();
});
$(".keyboard-button-cancel").on("click", function () {
    computeCancel();
});
$(".keyboard-button-float").on("click", function () {
    float = 1;
    computePrice();
});
$(".keyboard-button-jia").on("click", function () {
    computeOper("+");
    $(".button20").hide();
    $(".button19").show();
});
$(".keyboard-button-jian").on("click", function () {
    computeOper("-");
    $(".button20").hide();
    $(".button19").show();
});
$(".keyboard-button-chu").on("click", function () {
    computeOper("/");
    $(".button20").hide();
    $(".button19").show();
});
$(".keyboard-button-cheng").on("click", function () {
    computeOper("*");
    $(".button20").hide();
    $(".button19").show();
});
$(".keyboard-button-mo").on("click", function () {
    computeOper("%");
    $(".button20").hide();
    $(".button19").show();
});
$(".keyboard-button-deng").on("click", function () {
    computeOper("=");
    $(".button19").hide();
    $(".button20").show();
});

function updatePrice(price) {
    price = parseInt(price);
    var p = sign == ''  ? p = price1 : (sign == '=' ? p = 0 : p = price2);
    if (float == 0) {
        if (price >= 0 && p >= 0 && p < 1000000) {
            p = p * 10 + price;
        }
    } else if (float == 1) {
        if (parseInt(p) == p) {
            p = parseFloat(p + parseFloat("0." + price));
        } else {
            float = 2;
            p = parseFloat(parseFloat(p) + parseFloat("0.0" + price));
        }
    }
    if (sign == '' || sign == '=') {
        price1 = p;
    } else {
        price2 = p;
    }
    computePrice();
}
function computeOper(type){
    if (sign == "-") {
        price1 = price2 > 0 ? parseFloat(price1) - parseFloat(price2) : parseFloat(price1);
    } else if (sign == "+") {
        price1 = parseFloat(price1) + parseFloat(price2);
    } else if (sign == "/") {
        price1 = (parseFloat(price1) / parseFloat(price2)).toFixed(2);
    }
    else if (sign == "*") {
        price1 = price2 > 0 ? (price1 * price2).toFixed(2) : parseFloat(price1);
    } else if (sign == "%") {
        price1 = price2 > 0 ? (price1 % price2).toFixed(2) : parseFloat(price1);
    }
    price2 = 0;
    sign = type;
    computePrice();
}

function computeCancel() {
    console.log(float)
    if (float == 2) {
        float = 1;
        price1 = (Math.floor(price1 * 10) / 10).toFixed(2);
    } else if (float == 1) {
        float = 0;
        price1 = parseInt(price1).toFixed(2);
    } else {
        price1 = Math.floor(price1 / 10);
    }
    computePrice();
}

function computePrice() {
    var price = price2 == 0 ? price1 : price2;
    if (isInteger(price)) {
        obj.text(price.toFixed(2));
    } else {
        obj.text((Math.round(price * 100) / 100).toFixed(2));
    }
    //if(sign == '='){
    //    price2 = 0;
    //}
}
function isInteger(number) {
    return number > 0 && String(number).split('.')[1] == undefined
}