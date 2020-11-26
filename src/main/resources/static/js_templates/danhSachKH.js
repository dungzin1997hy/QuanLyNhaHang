
//Show user list
function showDishTable() {
    $('.overlay_bang_mon_an').hide();
    $('.nav__add-dish').hide();
    $('.nav__edit-dish').hide();
    $.ajax({
        url: "/getAllDish",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if(data.success == true) {
                showTable(data), console.log(data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

function showAddFormDish() {
    $('.overlay_bang_mon_an').show();
    $('.nav__add-dish').show();
}

jQuery.validator.addMethod("checkChar", function (value, element, param) {
    return value.match(new RegExp("." + param + "$"));
});

// tìm kiếm khách hàng = mã KH
$(function () {
    $("#form_search_customer").validate({
        rules: {
            customer_ID_search: {
                digits: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages: {
            customer_ID_search: {
                digits: "Vui lòng nhập kí tự số",
                minlength: "Vui lòng chỉ nhập 4 chữ số",
                maxlength: "Vui lòng chỉ nhập 4 chữ số"
            }
        },
        submitHandler: function () {
            var customerID = $("#customer_ID_search").val().trim();
            if (customerID == "") {
                showCustomerTable();
            } else {
                $.ajax({
                    url: "/tim-kiem-khach-hang",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "customerID": customerID,
                    },
                    success: function (data) {
                        swal("Done", "Tìm thành công", "success");
                        showTable(data);
                    }, error: function (data) {
                        swal("Fail", data.responseText, "warning");
                    }
                });
            }
        }
    });
});

//thêm khách hàng
$(function () {
    $("#add_form").validate({
        rules: {

            nameDish_add: {
                required: true,
                checkChar: "[a-zA-Z]+",
                maxlength: 20
            },
            price_add: {
                digits:true,
                required: true
            },
            devices_add: {
                maxlength: 50
            }
        },
        messages: {
            nameDish_add: {
                required: "Vui lòng nhập tên món ăn",
                checkChar:"Vui lòng chỉ nhập kí tự chữ",
                maxlength: "Tên món ăn quá dài"
            },
            price_add: {
                required: "Vui lòng nhập giá",
                digits : "Vui lòng chỉ nhập số"
            },

            devices_add: {

                maxlength: "Nhỏ hơn 50 kí tự"
            },
        },
        submitHandler: function () {
            var nameDish_add = $('#nameDish_add').val().trim();
            var price_add = $('#price_add').val().trim();
            var type_add = $("#type_add option:selected").text().trim();
            var unit_add = $('#unit_add option:selected').text().trim();
            var devices_add = $('#devices_add').val().trim();

            $.ajax({
                url: "/addDish",
                type: "POST",
                data: {
                    "nameDish_add": nameDish_add,
                    "price_add": price_add,
                    "type_add": type_add,
                    "unit_add": unit_add,
                    "devices_add": devices_add
                },
                success: function (data) {
                    $('.nav__add-dish').hide();
                    resetAddForm();
                    swal("Done", data, "success");
                    showDishTable();
                }, error: function (data) {
                    swal("Fail", data.responseText, "warning");
                }
            });
        }
    });
});

// Nav form edit
function showEditForm() {
    $('.overlay_bang_mon_an').show();
    $('.nav__edit-dish').show();
    $('#bang_mon_an').find('tr').click(function () {
        var idDish = $(this).find('td').eq(0).text();
        $('#idDish_edit').val(idDish);
        var nameDish = $(this).find('td').eq(1).text();
        $('#nameDish_edit').val(name);
        var price = $(this).find('td').eq(2).text();
        $('#price_edit').val(price);
        var type = $(this).find('td').eq(3).text();
        $('#type_edit').val(type);
        var diaChi = $(this).find('td').eq(4).text();
        $('#diaChi_edit').val(diaChi);
        var mail = $(this).find('td').eq(5).text();
        $('#mail_edit').val(mail);
        var gioiTinh = $(this).find('td').eq(6).text();
        if (gioiTinh.trim() == 'Nam') {
            $('#gioiTinh_edit').children('option:first').text('Nam');
            $('#gioiTinh_edit').children('option:last').text('Nữ');
        } else if (gioiTinh.trim() == 'Nữ') {
            $('#gioiTinh_edit').children('option:first').text('Nữ');
            $('#gioiTinh_edit').children('option:last').text('Nam');
        }
        var soDT = $(this).find('td').eq(7).text();
        $('#sdt_edit').val(soDT);
        var ngayBDSD = $(this).find('td').eq(8).text();
        $('#ngayBDSD_edit').val(ngayBDSD);
        var mucDichSD = $(this).find('td').eq(9).text();
        if (mucDichSD == "Sinh hoạt") {
            $('#MDSD_edit').children('option:first').text('Sinh hoạt');
            $('#MDSD_edit').children('option:last').text('Sinh hoạt trả trước');
        } else {
            $('#MDSD_edit').children('option:first').text('Sinh hoạt trả trước');
            $('#MDSD_edit').children('option:last').text('Sinh hoạt');
        }
    });

}

//Update user information
$(function () {
    $("#edit_form").validate({
        rules: {
            nameDish_add: {
                required: true,
                checkChar: "[a-zA-Z]+",
                maxlength: 20
            },
            price_add: {
                digits:true,
                required: true
            },
            devices_add: {
                maxlength: 50
            }
        },
        messages: {
            nameDish_add: {
                required: "Vui lòng nhập tên món ăn",
                checkChar:"Vui lòng chỉ nhập kí tự chữ",
                maxlength: "Tên món ăn quá dài"
            },
            price_add: {
                required: "Vui lòng nhập giá",
                digits : "Vui lòng chỉ nhập số"
            },

            devices_add: {

                maxlength: "Nhỏ hơn 50 kí tự"
            }
        },
        submitHandler: function () {
            var idDishEdit = $('#idDish_edit').val().trim();
            var nameDishEdit = $('#nameDish_edit').val().trim();
            var priceEdit = $('#price_edit').val().trim();
            var typeEdit = $('#type_edit option:selected').val().trim();
            var unitEdit = $('#unit_edit option:selected').val().trim();
            var devices_edits = $('#devices_edits').val().trim();

            $.ajax({
                url: "/searchDishByName",
                type: "POST",
                dataType: "json",
                data: {
                    "nameDish": nameDishEdit,
                },
                success: function (data) {
                  //  console.log(idKH_update + " " + tenKH_update + " " + dob_update + " " + soCmnd_update + " " + diaChi_update + " " + mail_update + " " + gioiTinh_update + " " + soDT_update + " " + ngayBDSD_update + " " + MDSD_update);
                    if (data.data.idDish != idDishEdit || data.data.nameDish != nameDishEdit || data.data.price != priceEdit || data.data.type != typeEdit || data.data.description != devices_edits) {
                        $.ajax({
                            url: "/updateDish",
                            type: "POST",
                            data: {
                                "idDish_edit": idDishEdit,
                                "nameDish_edit": nameDishEdit,
                                "price_edit": priceEdit,
                                "type_edit": typeEdit,
                                "unit_edit": unitEdit,
                                "devices_edit": devices_edits,

                            },
                            success: function (data) {
                                $('.nav__edit-dish').hide();
                                $('.overlay_bang_mon_an').hide();
                                swal("Done", data, "Cập nhật thành công");
                                showCustomerTable();
                            }, error: function (data) {
                                swal("Lỗi", data.responseText, "warning");
                            }
                        });
                    } else {
                        $('.nav__edit-customer').hide();
                        $('.overlay_bang_khach_hang').hide();
                        swal("Status", "Không có thông tin nào được cập nhật", "warning");
                    }
                }, error: function (data) {
                    swal("Fail", data.responseText, "warning");
                }
            });
        }
    });
});

function deleteDish() {
    $('#bang_mon_an').find('tr').click(function () {
        var idDish = $(this).find('td').eq(0).text();
        $("#idDish_delete").text(idDish);
        var idDishDelete = $("#idDish_delete").text();
        swal({
                title: "Xác nhận !!!",
                text: "Bạn có chắc xoá món ăn này không ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Xoá",
                cancelButtonText: "Quay lại",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        url: "/deleteDish",
                        type: "POST",
                        data: {
                            "idDish": idDishDelete
                        },
                        success: function (data) {
                            swal("Done", data, "success");
                            showDishTable();
                        }, error: function () {

                            swal("Lỗi", "Không xóa được", "warning");
                        }
                    });
                }
                else {
                    console.log("click cancel");
                    $("#idDish_delete").text("");
                    var idDishDelete = $("#idDish_delete").text();
                    console.log(idDishDelete);
                }
            });
    });
}

function closeEditForm() {
    $('.overlay_bang_mon_an').hide();
    $('.nav__add-dish').hide();
    $('.nav__edit-dish').hide();
    resetAddForm();
}

function showTable(data) {
    console.log("show table");
    var contentString = "";
    if(data.data!= null) {
        for (var i = 0; i < data.data.length; i++) {
            var row =data.data[i];
            if(row.description == null){
                var string ="";
            }
            else string = row.description;
            contentString = contentString
                + '<tr role="row" class="odd">'
                + '<td id="idDish">' + row.id + '</td>'
                + '<td>' + row.name + '</td>'
                + '<td>' + row.price + '</td>'
                + '<td>' + row.type + '</td>'
                + '<td>' + row.unit + '</td>'
                + '<td>' + string + '</td>'
                + '<td>' +
                '<button data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="showEditForm()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>' +
                '<a data-toggle="tooltip" title="Remove"><button onclick="deleteDish()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
                + '</tr>';
        }
    }
    $("#soMonAn").html(data.data.length);
    $("#bang_mon_an").html(contentString);
}

function resetAddForm() {
    $("#idKH_add_input").val("");
    $("#ten_add").val("");
    $("#dob_add").val("");
    $("#soCmnd_add").val("");
    $("#diaChi_add").val("");
    $("#mail_add").val("");
    $("#sdt_add").val("");
    $("#ngayBDSD_add").val("");
}
