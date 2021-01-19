var allDish = new Array(0);

function ready() {
    allDish = [];
    fetch('/api/getAllDish',{
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'foo=bar&lorem=ipsum'})
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
                    for (var i = 0; i < data.data.length; i++) {
                        allDish.push(data.data[i].id);
                    }
                    showDish(data);
        });
    // $.ajax({
    //     url: "/getAllDish",
    //     type: "POST",
    //     dataType: "json",
    //     success: function (data) {
    //         console.log(data);
    //         for (var i = 0; i < data.data.length; i++) {
    //             allDish.push(data.data[i].id);
    //         }
    //         showDish(data);
    //     },
    //     error : function (data) {
    //         console.log(data);
    //         console.log('cant request');
    //     }
    // })
}

function showDish(data) {
    $('#mainView').html("");
    var content = "";
    for (var i = 0; i < data.data.length; i++) {
        content = content + '<div class="card-panel recipe white row">\n' +
            '            <img src="/image/upload/' + data.data[i].url + '" alt="' + data.data[i].name + '" style="height: 60px">\n' +
            '            <div class="recipe-details" style="margin-left: 15px">\n' +
            '                <div class="recipe-title">' + data.data[i].name + '</div>\n' +
            '                <div class="recipe-ingredients" id="price_' + data.data[i].id + '">' + data.data[i].price + '</div>\n' +
            '                <div class="recipe-quantity">\n' +
            '                    <i class="material-icons" id="btn_minus_' + data.data[i].id + '" onclick="minusCallDish(this.id)"><button>-</button></i>\n' +

            '                    <span id="amount_' + data.data[i].id + '">0</span>\n' +
            '                    <i class="material-icons" id="btn_add_' + data.data[i].id + '" onclick="addCallDish(this.id)"><button>+</button></i>\n' +

            '                </div>\n' +
            '            </div>\n' +
            '        </div>'
    }
    $('#mainView').html(content);
    $('#totalCallDish').html(0);
}

function addCallDish(id) {
    var arr = id.split('_');
    var amount = 'amount_' + arr[2];
    var count = $('#' + amount).text();
    var price = $('#price_' + arr[2]).text();
    $('#' + amount).html(parseInt(count) + 1);
    var totalDish = $('#totalCallDish').text();
    $('#totalCallDish').html(parseInt(totalDish) + parseInt(price));
}

function minusCallDish(id) {
    var arr = id.split('_');
    var amount = 'amount_' + arr[2];
    var count = $('#' + amount).text();
    var price = $('#price_' + arr[2]).text();
    if (count > 0) {
        $('#' + amount).html(parseInt(count) - 1);
        var totalDish = $('#totalCallDish').text();
        $('#totalCallDish').html(parseInt(totalDish) - parseInt(price));
    }
}

function ConfirmCallDish() {

    swal({
            title: "Xác nhận !!!",
            text: "Bạn có chắc gọi món không ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            cancelButtonText: "Quay lại",
            confirmButtonText: "Có",

            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                var value = new Array();
                for (var i = 0; i < allDish.length; i++) {
                    var amount = $('#amount_' + allDish[i]).text();
                    if (amount != 0) {
                        value.push({
                            'idDish': allDish[i],
                            'amount': amount
                        })
                    }
                }
                console.log(value);
                console.log(JSON.stringify({
                    "callDishes": value,
                    "idTable": 29
                }))
                $.ajax({
                    type: "POST",
                    url: "/callDish",
                    contentType: "application/json",
                    data: JSON.stringify({
                        "callDishes": value,
                        "idTable": 29
                    }),
                    success: function (data) {
                        console.log(data);
                        swal("Thành công", data.data, "success");
                        for (var i = 0; i < allDish.length; i++) {
                            $('#amount_' + allDish[i]).html(0);
                        }
                        $('#totalCallDish').html(0);
                    }, error: function (data) {
                        swal("Lỗi", data.errorMessage, "warning");
                    }
                })
            }
        });
}