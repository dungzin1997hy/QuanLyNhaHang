function ready() {
    $('#usedDish').hide();
    $.ajax({
        url: "/getTableByArea/A",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                showTable("ban_khu_A", data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
    $.ajax({
        url: "/getTableByArea/B",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                showTable("ban_khu_B", data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
    $.ajax({
        url: "/getTableByArea/C",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                showTable("ban_khu_C", data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

function showTable(id, data) {
    console.log("show table");
    var contentString = "";
    if (data.data != null) {
        for (var i = 0; i < data.data.length; i++) {
            var row = data.data[i];
            contentString = contentString
                + '<tr role="row" class="odd">'
                // + '<td>' + (i + 1) + '</td>'
                + '<td id="' + row.id + '" style="display: none">' + row.id + '</td>'
                + '<td class="nr">' + row.name + '</td>'
                // + '<td>' + row.phoneNumber + '</td>'
                // + '<td>' + row.cmnd + '</td>'
                // + '<td>' + row.email + '</td>'
                // + '<td>' + row.address + '</td>'
                // + '<td id="idRole" style="display: none">' + row.role.id + '</td>'
                // + '<td>' + row.role.brand + '</td>'
                + '<td>' + row.status + '</td>'
                + '<td>' + +'</td>'
                + '<td>' +

                // '<button data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="showEditStaffForm()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>' +
                // '<a data-toggle="tooltip" title="Remove"><button onclick="deleteStaff()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
                // +
                '<button id="'+row.id+'" name="' + row.name + '" onclick="showuseddish(this.id)">Click</button>' +
                '</tr>';
        }
    }

    $("#" + id).html(contentString);
}

function showuseddish(name) {
    console.log(name);
    $('#usedDish').show();

    $('#nameTable').html(name);
    $.ajax({
        url: "/getUsedDishByTable/",
        type: "POST",
        data: {
            "idTable": name
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

function showTableUsedDish(data) {
   // console.log(data);
    var contentString = "";
    var total = 0;
    if (data.data != null) {
       // console.log(data.data.usedDishList);
        for (var i = 0; i < data.data.length; i++) {
            var row = data.data[i];
           // console.log(row);
            contentString = contentString
                + '<tr role="row" class="odd">'
                // + '<td>' + (i + 1) + '</td>'
                + '<td>' + row.id + '</td>'
                + '<td style="display: none">' + row.dish.id + '</td>'
                + '<td class="nr">' + row.dish.name + '</td>'
                + '<td>' + row.dish.price + '</td>'
                + '<td>' + row.amount + '</td>'
                + '<td>' + (row.dish.price * row.amount) + '</td>'
            '</tr>';
            total += (row.dish.price * row.amount);
        }
    }
    $('#total').html(total);
    $('#TotalBill').html(total);
    $('#useddishTable').html(contentString);
    $('#useddishTableBill').html(contentString);
}

function showBillForm() {
    $('#bill').show();
    var nameTable = $('#nameTable').text();
    var currentdate = new Date();
    var hour = currentdate.getHours();
    if(hour<10) hour="0"+hour;
    var minute = currentdate.getMinutes();
    if(minute<10) minute="0"+minute;
    var second = currentdate.getSeconds();
    if(second<10) second="0"+second;

    var datetime = hour + ":"
        + minute + ":"
        + second+ " "+currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear();


    $('#time').html(datetime);
    $.ajax({
        url: "/getUsedDishByTable/",
        type: "POST",
        data: {
            "idTable": nameTable
        },
        success: function (data) {
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
    console.log(value+" "+total);
    if (parseInt(value) < parseInt(total)) {
        $('#inputCus').css('background-color', 'red');
        console.log("thap hon gia");
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
        var id =$(this).find('td:eq(0)').text();
        console.log(id);
        if(id!= null) {
            value.push(id);
        }
    });
    var time = $('#time').text();
    var total = $('#TotalBill').text();
    var idCustomer = $('#idCustomer').text();
    var idRecept = $('#idRecept').text();
    console.log(value+" "+time+" "+total);

    $.ajax({
        type: "POST",
        url:"/addPayBill",
        contentType: "application/json",
        data: JSON.stringify ({
            "list":value,
            "total":total,
            "time":time,
            "idCustomer":idCustomer,
            "idRecept":idRecept
        }),
        success: function (data) {
            swal("Thành công", data.data, "success");
        }, error: function (data) {
            swal("Lỗi", data.errorMessage, "warning");
        }
    })
}

function cancelBill() {
    $('#bill').hide();
}
