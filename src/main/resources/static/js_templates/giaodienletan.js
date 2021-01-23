var callDish = new Array(0);

function ready() {
    // $('#usedDish').hide();
    // $('#callDish').hide();
    // $('#showBill').hide();
    $('#khuAcontainer').html("");
    $('#khuBcontainer').html("");
    $('#khuCcontainer').html("");
    $.ajax({
        url: "/api/getTableByArea/A",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                showTable("khuAcontainer", data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
    $.ajax({
        url: "/api/getTableByArea/B",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                showTable("khuBcontainer", data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
    $.ajax({
        url: "/api/getTableByArea/C",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                showTable("khuCcontainer", data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
    $.ajax({
        url: "/api/getAllCustomer",
        type: "POST",
        dataType: "json",
        success: function (data) {
            Customer = [];
            CustomerPhoneNumber = [];
            if (data.success == true) {
                for (var i = 0; i < data.data.length; i++) {
                    Customer.push(data.data[i]);
                    CustomerPhoneNumber.push(data.data[i].phoneNumber);
                }
            }

            $("#phoneNumberAdd").autocomplete({
                source: CustomerPhoneNumber
            });
            // $("#nameSearchOutput").autocomplete({
            //     source:materialName
            // })

        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

function changePhoneNumber(value) {
    if (CustomerPhoneNumber.includes(value) == false) {
        $('#phoneNumberSearchError').html("Không có khách hàng này");
        $("#addCustomer").show();
        $('#nameCus').val("");
        $('#phoneNumberCusAdd').val(value);
    } else {
        var i = CustomerPhoneNumber.indexOf(value);
        $('#nameCus').val(Customer[i].name);
    }
}

function searchBooking() {
    var phoneNumber = $('#phoneNumberAdd').val();
    console.log(phoneNumber);
    $.ajax({
        url: "/searchBookingByPhoneNumber",
        type: "POST",
        dataType: "json",
        data:{
            "phoneNumber" : phoneNumber
        },
        success: function (data) {
            var contentString = "";
            console.log(data);
            if(data.data.length ==0){
                swal("Fail","Không tìm thấy đặt bàn","error");
            }
            for (var i = 0; i < data.data.length; i++) {
                var row = data.data[i];
                if (row.description == null) {
                    var string = "";
                } else string = row.description;
                contentString = contentString
                    + '<tr id="row'+(row.id)+'" role="row" class="odd">'
                    + '<td>' + (i + 1) + '</td>'
                    + '<td id="idTable" style="display: none">' + row.table.id + '</td>'
                    + '<td>' + row.table.name + '</td>'
                    + '<td>' + row.table.type + '</td>'
                    + '<td>' + row.timeBook.startTime+' - '+row.timeBook.stopTime + '</td>'
                    + '<td>' +
                    '<button type="button" name="'+(row.id)+'" data-toggle="tooltip" title="Chọn" class="btn btn-info center-block mb-1" onclick="chooseTable(this.name)" style="padding:1px 1px 1px 1px; border-radius: 20px">Chọn</button></td>'
                    + '</tr>';
            }
            $("#bang_booking").html(contentString);
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

$(function () {
    $("#add_form").validate({
        rules: {
            phoneNumberAdd: {
                required: true

            },
            nameCus: {
                required: true
            },
            // devices_add: {
            //     maxlength: 50
            // }
        },
        messages: {
            phoneNumberAdd: {
                required: "Vui lòng nhập số điện thoại",
            },
            nameCus:{
                required: "Vui lòng nhập thông tin khách hàng"
            }
        },
        submitHandler: function () {
            var idbooking = $('#idban_booking').text();


            $.ajax({
                url: "/checkin",
                type: "POST",
                data: {
                    "idbooking": idbooking
                },
                success: function (data) {
                    $('.nav__checkin').hide();
                    swal("Thành công", data.data, "success");
                    ready();
                }, error: function (data) {
                    swal("Fail", data.errorMessage, "warning");
                }
            });
        }
    });
});
function chooseTable(name) {
    var temp = $('#idban_booking').text();
    $('#row'+temp).css({'background-color':'white'});
    $('#idban_booking').html(name);
    console.log("id booking :"+ name);
    $('#row'+name).css({'background-color':'red'});
}
function showCheckin() {
    console.log("show");
    $("#bang_booking").html("");
    $('#phoneNumberAdd').val("");
    $('#nameCus').val("");
    $('.nav__checkin').show();
}

function closeEditForm() {
    $('.nav__checkin').hide();
}
function showCallDish() {
    var name = $('#nameTable').text();
    console.log(name);
    $('#nameTableCallDish').html(name);
    $('#callDish').show()
    $.ajax({
        url: "/api/getAllDish",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                showCallDishTable(data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

function searchDishByName() {
    var nameDish = $("#dish_name_search").val().trim();
    $('#selectSearch').prop('selectedIndex', 0);
    if (nameDish == "") {
        showCallDishTable();
    } else {
        $.ajax({
            url: "/searchListDishByName",
            type: "POST",
            dataType: "json",
            data: {
                "nameDish": nameDish,
            },
            success: function (data) {
                if (data.success == true) {
                    $('#dish_name_search').val("");
                    showCallDishTable(data);
                } else {
                    swal("Lỗi", data.errorMessage, "warning");
                    $('#dish_name_search').val("");

                    showCallDish();
                }

            }, error: function (data) {
                swal("Fail", data.responseText, "warning");
            }
        });
    }
}

//chọn món ăn trong bảng
var dem = 1;

function chooseDish(id, name, price) {
    var a = false;
    for (var i = 0; i < callDish.length; i++) {
        if (callDish[i].idDish == id) {
            a = true;
        } else continue;
    }
    if (a == true) {
        var temp = $('#input-' + id).val().trim();
        $('#input-' + id).val(parseInt(temp) + 1);
        $('#sum' + id).text((parseInt(temp) + 1) * price);
    } else {
        callDish.push({
            "idDish": id,
            "nameDish": name,
            "price": price
        });
        var idtemp = "sum" + id;
        var contentString = "";
        contentString = contentString
            + '<tr role="row" class="odd">'
            + '<td>' + (dem) + '</td>'
            + '<td id="row' + id + '" style="display: none">' + id + '</td>'
            + '<td class="nr">' + name + '</td>'
            + '<td>' + price + '</td>'
            + '<td>' + '<input id="input-' + id + '" name="' + price + '" type="number" value="1" min="0" onchange="changeValueCallDish(this.id,this.name,this.value)"style="width: 40px">' + '</td>'
            + '<td id="' + idtemp + '">' + (price) + '</td>'
            + '<td><a data-toggle="tooltip" title="Remove"><button onclick="deleteRow()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
            +
            '</tr>';
        dem++;
        $('#callDishTable').append(contentString);
    }
}

//xoá hàng trong bảng gọi món
function deleteRow() {
    $('#callDishTable').find('tr').click(function () {
        var idDish = $(this).closest("tr").find('td:eq(1)').text();

        for (var i = 0; i < callDish.length; i++) {
            if (idDish == callDish[i].idDish) {
                callDish.splice(i, 1);
            }
        }
        $(this).closest("tr").remove();

    });
}

function changeValueCallDish(id, name, value) {
    var number = id.split("-");
    $('#' + 'sum' + number[1]).text(value * name);

}

function showCallDishTable(data) {
    $("#dishToCall").html("");
    var content = "";
    for (var i = 0; i < data.data.length; i++) {
        content = content + '<div  class="col-3" style="display: flex;flex-direction: column;align-items: center" >' +
            '<button  id="' + data.data[i].id + '" name="' + data.data[i].name + '" value="' + data.data[i].price + '" style="margin-top: 25px" onclick="chooseDish(this.id,this.name,this.value)"><div style="height: 150px;width: 175px;" >' +
            '<img class="imgDish" src="/image/upload/' + data.data[i].url + '">' +
            '</div>' +
            '<div style="height: 25px;width: 175px;display: flex;justify-content: space-around">' +
            '<p style="text-align: left">' + data.data[i].name + '</p>' +
            '<p>' + data.data[i].price + '</p>'
            + '</div>' +
            '</div></button>';
    }
    $('#dishToCall').append(content);
}

//tìm kiếm món ăn theo loại


function searchDishByType() {
    var selectItem = $("#selectSearch").val().trim();
    if (selectItem == 'Tất cả') {
        showCallDish();
    } else {
        $.ajax({
            url: "/searchDishByType",
            type: "POST",
            data: {
                "typeDish": selectItem
            },
            success: function (data) {
                showCallDishTable(data);
            }, error: function (data) {
                swal("Lỗi", data.data, "warning");
            }

        });
    }
}

function showTable(id, data) {

    var contentString = "";
    if (data.data != null) {
        for (var i = 0; i < data.data.length; i++) {
            var row = data.data[i];
            contentString = contentString +
                '<div class="col-2" style=" display: flex;flex-direction: column;align-items: center">\n';
            if(row.status == 'free') {
                contentString +='<button class="btnTable" style="margin-top: 5px" id="' + row.id + '" name="' + row.name + '" onclick="showSetTable(this.id,this.name)">';
                    contentString += '<img src="global_assets/images/freetable.png" style="width: 50px;height: 50px">';
            }
            else if(row.status =='using') {
                contentString +='<button class="btnTable" style="margin-top: 5px" id="' + row.id + '" name="' + row.name + '" onclick="showuseddish(this.id,this.name)">';

                contentString += '<img src="global_assets/images/usingtable.png" style="width: 50px;height: 50px">';
            }
            contentString = contentString + '</button>\n' +
                '     <p>' + row.name + '</p>\n' +
                '     <p>' + row.type + '</p>\n' +
                '</div>';
        }
    }

    $("#" + id).append(contentString);
}
function showSetTable(id,name) {
    $('#usedDish').hide();
    $('#callDish').hide();
    $('#showBill').hide();
    swal({
            title: "Xác nhận !!!",
            text: "Bạn có chắc đặt bàn này không ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "blue",
            cancelButtonText: "Quay lại",
            confirmButtonText: "Có",

            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    url: "/setTable",
                    type: "POST",
                    data: {
                        "nameTable": name
                    },
                    success: function (data) {
                        console.log(data);
                        swal("Done", data.data, "success");
                        ready();
                       showuseddish(id,name);
                    }, error: function () {
                        swal("Lỗi", "Không xóa được", "warning");
                    }
                });
            }
        });
}
//gọi món xong
function bookDish() {
    var value = new Array();
    $('#callDishTable > tr').each(function () {
        var id = $(this).find('td:eq(1)').text();
        var amount = $(this).find('td:eq(4) input').val();
        if (amount != null && amount > 0 && amount != "") {
            value.push({
                'idDish': id,
                'amount': amount
            });
        }
    });
    var idTable = $('#idTable').text().trim();
    var nameTable = $('#nameTable').text().trim();
    console.log(idTable);
    $.ajax({
        type: "POST",
        url: "/callDish",
        contentType: "application/json",
        data: JSON.stringify({
            "callDishes": value,
            "idTable": idTable
        }),
        success: function (data) {
            swal("Thành công", data.data, "success");
            showuseddish(idTable,nameTable);
            var openRequest = indexedDB.open("fetchEvent", 1);
            openRequest.onsuccess = function (e) {
                db = e.target.result;
                var transaction = db.transaction("fetchEvent", "readwrite");
                var store = transaction.objectStore("fetchEvent");
                var clear = store.clear();
            }

        }, error: function (data) {
            swal("Thành công", "Đang đợi mạng", "success");
        }
    })
    $('#callDish').hide();
    $('#callDishTable').html("");
    callDish = [];
    dem = 1;
}

function cancelBookDish() {
    callDish = [];
    dem = 1;
    $('#callDish').hide();
    $('#callDishTable').html("");
}

function showuseddish(id, name) {
    console.log("show useddidhs");
    console.log(id);
    $('#usedDish').show();

    $('#idTable').html(id);

    $('#nameTable').html(name);
    $.ajax({
        url: "/getUsedDishByTable",
        type: "POST",
        data: {
            "idTable": id
        },
        success: function (data) {
            console.log(data);
            if (data.success == true) {
                showTableUsedDish(data);
            }

        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
    // $.ajax({
    //     url: "/getTableById",
    //     type: "POST",
    //     data: {
    //         "idTable": id
    //     },
    //     success: function (data) {
    //         console.log(data);
    //         if(data.data!= null){
    //             $('#idCustomerTable').html(data.data.id);
    //             $('#nameCustomerTable').html(data.data.name);
    //         }
    //         else {
    //             $('#idCustomerTable').html("");
    //             $('#nameCustomerTable').html("");
    //         }
    //         if (data.success == true) {
    //             showTableUsedDish(data);
    //         }
    //
    //     }, error: function () {
    //         swal("Fail", "Không có dữ liệu", "error");
    //     }
    // });
}

function showTableUsedDish(data) {

    var contentString = "";
    var total = 0;
    if (data.data != null) {

        for (var i = 0; i < data.data.length; i++) {
            var row = data.data[i];

            var time;
            if (row.time != null) {
                time = row.time.split("T");
            }
            contentString = contentString
                + '<tr role="row" class="odd">'
                // + '<td>' + (i + 1) + '</td>'
                + '<td style="display: none">' + row.id + '</td>'
                + '<td style="display: none">' + row.dish.id + '</td>'
                + '<td class="nr">' + row.dish.name + '</td>'
                + '<td>' + row.dish.price + '</td>'
                + '<td>' + row.amount + '</td>'
                + '<td>' + time[1] + '</td>'
                + '<td>' + (row.dish.price * row.amount) + '</td>'
            '</tr>';

            total += (row.dish.price * row.amount);
        }
    }
    if (total == 0) {
        $('#btnThanh').prop('disabled', true);
    } else {
        $('#btnThanh').prop('disabled', false);
    }
    $('#total').html(total);
    $('#TotalBill').html(total);

    $('#useddishTable').html(contentString);
    $('#useddishTableBill').html(contentString);
}

function showBillForm() {
    $('#showBill').show();
    $('#bill').show();
    $('#inputCus').val("");
    $('#backCus').html("");
    var customername = $('#nameCustomerTable').text();
    $('#nameCustomer').html(customername);
    var customerid = $('#idCustomerTable').text();
    $('#idCustomer').html(customerid);


    var idTable = $('#idTable').text();
    var currentdate = new Date();
    var hour = currentdate.getHours();
    if (hour < 10) hour = "0" + hour;
    var minute = currentdate.getMinutes();
    if (minute < 10) minute = "0" + minute;
    var second = currentdate.getSeconds();
    if (second < 10) second = "0" + second;
    var date = currentdate.getDate();
    var month = currentdate.getMonth()+1;
    var year = currentdate.getFullYear();

    if(date <10){
        date = '0'+date;
    }

    if(month <10){
        month = '0'+month;
    }
    var datetime = hour + ":"
        + minute + ":"
        + second + " " + date + "-"
        + month + "-"
        + year;


    $('#time').html(datetime);
    $.ajax({
        url: "/getUsedDishByTable/",
        type: "POST",
        data: {
            "idTable": idTable
        },
        success: function (data) {
            console.log(data);
            if (data.success == true) {
                showTableUsedDish(data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

function changeValue(value) {
    var total = $('#TotalBill').text();

    if (parseInt(value) < parseInt(total)) {
        $('#inputCus').css('background-color', 'red');

    } else {
        $('#inputCus').css('background-color', 'white');
        $('#backCus').text(value - total);
        $('#btnThanhToan').prop('disabled', false);
    }
}

function saveBill() {
    // $('#bill').hide();
    var value = new Array();
    $('#useddishTableBill > tr').each(function () {
        var id = $(this).find('td:eq(0)').text();
        if (id != null) {
            value.push(id);
        }
    });
    var time = $('#time').text();
    var total = $('#TotalBill').text();
    var idCustomer = $('#idCustomer').text();
    var idRecept = $('#id_current_user').text();
    console.log(idRecept);
    var nameTable = $('#nameTable').text().trim();
    console.log(nameTable);
    $.ajax({
        type: "POST",
        url: "/addPayBill",
        contentType: "application/json",
        data: JSON.stringify({
            "list": value,
            "total": total,
            "time": time,
            "idCustomer": idCustomer,
            "idRecept": idRecept,
            "nameTable": nameTable
        }),
        success: function (data) {
            swal("Thành công", data.data, "success");
            $('#bill').hide();
            $('#usedDish').hide();
            $('#showBill').hide();
            ready();
        }, error: function (data) {
            swal("Lỗi", data.errorMessage, "warning");
        }
    })
}

function cancelBill() {
    $('#bill').hide();
    $('#showBill').hide();

}
