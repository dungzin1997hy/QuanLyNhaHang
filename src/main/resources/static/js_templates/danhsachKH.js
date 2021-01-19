//Show user list
function showCustomerTable() {
    $('.overlay_bang_mon_an').hide();
    $('.nav__add-customer').hide();
    $('.nav__edit-customer').hide();
    $.ajax({
        url: "/api/getAllCustomer",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                showTable(data);

            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

function showAddFormDish() {
    $('#add_form')[0].reset();
    $('#thumbnail_add').hide();
    $('.overlay_bang_mon_an').show();
    $('.nav__add-dish').show();
}


jQuery.validator.addMethod("checkChar", function (value, element, param) {
    return value.match(new RegExp("." + param + "$"));
});

// tìm kiếm món ăn = tên
$(function () {
    $("#form_search_cus").validate({
        submitHandler: function () {
            var phoneNumber = $("#phoneNumberSearch").val().trim();
            if (phoneNumber == "") {
                showCustomerTable();
            } else {
                $.ajax({
                    url: "/searchCustomerByPhoneNumber",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "customerPhoneNumber": phoneNumber,
                    },
                    success: function (data) {
                        if (data.success == true) {
                            swal("Thành công", "Tìm thành công", "success");
                            $('#phoneNumberSearch').focus();
                            $('#phoneNumberSearch').val("");
                            showTable(data);
                        } else {
                            swal("Lỗi", data.errorMessage, "warning");
                            $('#phoneNumberSearch').val("");
                            $('#phoneNumberSearch').focus();
                            showCustomerTable();
                        }

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
                digits: true,
                required: true
            },
            devices_add: {
                maxlength: 50
            }
        },
        messages: {
            nameDish_add: {
                required: "Vui lòng nhập tên món ăn",
                checkChar: "Vui lòng chỉ nhập kí tự chữ",
                maxlength: "Tên món ăn quá dài"
            },
            price_add: {
                required: "Vui lòng nhập giá",
                digits: "Vui lòng chỉ nhập số"
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

                    if (data.success == true) {
                        swal("Thành công", data.data, "success");
                        showDishTable();
                    } else {
                        swal("Lỗi", data.errorMessage, "warning");
                        showDishTable();
                    }
                }, error: function (data) {
                    swal("Fail", data.errorMessage, "warning");
                }
            });
        }
    });
});


function showAddFormCustomer() {
    $('.overlay_bang_mon_an').show();
    $('.nav__add-customer').show();
    $('#nameCus_add').val("");
    $('#phoneNumberCusAdd').val("");
    $('#emailCusAdd').val("");

}

//add dish
$(function () {
    $("#add_Customer_form").validate({
        rules: {
            nameCus_add: {
                required: true,
                checkChar: "[a-zA-Z]+",
                maxlength: 20
            },
            phoneNumberCusAdd: {
                digits: true,
                required: true
            },
            emailCusAdd: {
                maxlength: 50
            }
        },
        messages: {
            nameCus_add: {
                required: "Vui lòng nhập tên khách hàng",
            },
            phoneNumberAdd: {
                required: "Vui lòng nhập số điện thoại"
            },
            emailCusAdd: {
                maxlength: "Vui lòng nhập nhỏ hơn 50 ký tự",

            }

        },
        submitHandler: function () {
            var name = $('#nameCus_add').val().trim();
            var phoneNumber = $('#phoneNumberCusAdd').val().trim();
            var email = $('#emailCusAdd').val().trim();

            $.ajax({
                url: "/addCustomer",
                type: "POST",
                data: {
                    "nameCus": name,
                    "phoneNumber": phoneNumber,
                    "email": email
                },
                success: function (data) {
                    $('.nav__add-customer').hide();
                    if (data.success == true) {
                        $('#emailCusAdd').val("");
                        $('#nameCus_add').val("");
                        $('#phoneNumberSearchError').html("");
                        $("#addCustomer").hide();
                        $('#nameCus').val(name);
                        swal("Thành công", data.data, "success");
                        showCustomerTable();
                    } else {
                        swal("Lỗi", data.errorMessage, "warning");
                        showCustomerTable();
                    }
                }, error: function (data) {
                    swal("Fail", data.errorMessage, "warning");
                }
            });
        }
    });
});

function showImage(fileInput) {
    file = fileInput.files[0];
    reader = new FileReader();
    reader.onload = function (e) {
        $('#thumbnail_add').show();
        $('#thumbnail_add').attr('src', e.target.result);
    }
    reader.readAsDataURL(file);
}

//hiện bảng edit khách hàng
function showEditCusForm() {
    $('.overlay_bang_mon_an').show();
    $('.nav__edit-customer').show();
    $('#bang_khach_hang').find('tr').click(function () {
        var id = $(this).find('td').eq(1).text();
        var name = $(this).find('td').eq(2).text();
        var phoneNumber = $(this).find('td').eq(3).text();
        var email = $(this).find('td').eq(4).text();
        console.log(email);

        $('#idCus_edit').val(id);
        $('#nameCus_edit').val(name);

        $('#phoneNumber_edit').val(phoneNumber);
        $('#email_edit').val(email);

    })

}

//form khách hàng submit
$(function () {
    $("#edit_form").validate({
        rules: {
            nameCus_add: {
                required: true,
                checkChar: "[a-zA-Z]+",
                maxlength: 20
            },
            phoneNumberCusAdd: {
                digits: true,
                required: true
            },
            emailCusAdd: {
                maxlength: 50
            }
        },
        messages: {
            nameCus_add: {
                required: "Vui lòng nhập tên khách hàng",
            },
            phoneNumberAdd: {
                required: "Vui lòng nhập số điện thoại"
            },
            emailCusAdd: {
                maxlength: "Vui lòng nhập nhỏ hơn 50 ký tự",
            }

        },
        submitHandler: function () {
            var id = $('#idCus_edit').val().trim();
            var name = $('#nameCus_edit').val().trim();
            var phoneNumber = $('#phoneNumber_edit').val().trim();
            var email = $('#email_edit').val().trim();

            $.ajax({
                url: "/updateCustomer",
                type: "POST",
                data: {
                    "id": id,
                    "nameCus": name,
                    "phoneNumber": phoneNumber,
                    "email": email
                },
                success: function (data) {
                    $('.nav__edit-customer').hide();
                    if (data.success == true) {
                        swal("Thành công", data.data, "success");
                        showCustomerTable();
                    } else {
                        swal("Lỗi", data.errorMessage, "warning");
                        showCustomerTable();
                    }
                }, error: function (data) {
                    swal("Fail", data.errorMessage, "warning");
                }
            });
        }
    });
});

function showImageEdit(fileInput) {
    file = fileInput.files[0];
    reader = new FileReader();
    reader.onload = function (e) {
        $('#thumbnail_edit').show();
        $('#thumbnail_edit').attr('src', e.target.result);
    }
    reader.readAsDataURL(file);
}

//Update user information
$(function () {
    $("#edit_form").validate({
        rules: {
            nameDish_edit: {
                required: true,
                checkChar: "[a-zA-Z]+",
                maxlength: 20
            },
            price_edit: {
                digits: true,
                required: true
            },
            devices_edit: {
                maxlength: 50
            }
        },
        messages: {
            nameDish_edit: {
                required: "Vui lòng nhập tên món ăn",
                checkChar: "Vui lòng chỉ nhập kí tự chữ",
                maxlength: "Tên món ăn quá dài"
            },
            price_edit: {
                required: "Vui lòng nhập giá",
                digits: "Vui lòng chỉ nhập số"
            },

            devices_edit: {

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


                    if (data.data.id != idDishEdit || data.data.name != nameDishEdit || data.data.price != priceEdit || data.data.type != typeEdit || data.data.description != devices_edits || data.data.unit != unitEdit) {
                        $.ajax({
                            url: "/updateDish",
                            type: "POST",
                            data: {
                                "idDish_edit": idDishEdit,
                                "nameDish_edit": nameDishEdit,
                                "price_edit": priceEdit,
                                "type_edit": typeEdit,
                                "unit_edit": unitEdit,
                                "devices_edit": devices_edits
                            },
                            success: function (data) {

                                $('.nav__edit-dish').hide();
                                $('.overlay_bang_mon_an').hide();
                                swal("Thành công", data.data, "success");
                                showDishTable();
                            }, error: function (data) {

                                swal("Lỗi", data.errorMessage, "warning");
                            }
                        });
                    } else {
                        $('.nav__edit-dish').hide();
                        $('.overlay_bang_mon_an').hide();

                        swal("Lỗi", "Không có thông tin nào được cập nhật", "warning");
                    }
                }, error: function (data) {
                    swal("Fail", data.responseText, "warning");
                }
            });
        }
    });
});

function searchByType() {
    var selectItem = $("#selectSearch").val();
    if (selectItem == 'Tất cả') {
        showDishTable();
    } else {
        $.ajax({
            url: "/searchDishByType",
            type: "POST",
            data: {
                "typeDish": selectItem
            },
            success: function (data) {
                showTable(data);
            }, error: function (data) {
                swal("Lỗi", data.data, "warning");
            }

        });
    }
}

function deleteDish() {
    $('#bang_mon_an').find('tr').click(function () {
        var idDish = $(this).find('td').eq(1).text();
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
                            swal("Done", data.data, "success");
                            showDishTable();
                        }, error: function () {

                            swal("Lỗi", "Không xóa được", "warning");
                        }
                    });
                }
            });
    });
}

function closeEditForm() {
    $('.overlay_bang_mon_an').hide();
    $('.nav__add-customer').hide();
    $('.nav__edit-customer').hide();
    resetAddForm();
}

function showTable(data) {
    var contentString = "";
    if (data.data != null) {
        for (var i = 0; i < data.data.length; i++) {
            var row = data.data[i];
            contentString = contentString
                + '<tr role="row" class="odd">'
                + '<td>' + (i + 1) + '</td>'
                + '<td id="idCustomer" style="display: none">' + row.id + '</td>'
                + '<td>' + row.name + '</td>'
                + '<td>' + row.phoneNumber + '</td>'
                + '<td>' + row.email + '</td>'
                + '<td>' +
                '<button data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="showEditCusForm()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>' +
                '<a data-toggle="tooltip" title="Remove"><button onclick="deleteCustomer()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a>' +
                '<a data-toggle="tooltip" title="Remove"><button onclick="showBillCustomer()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-download"></i></button></a>'
                + '</td>'
                + '</tr>';
        }
    }
    $("#soMonAn").html(data.data.length);
    $("#bang_khach_hang").html(contentString);
}

function closeAddCusForm() {
    $('#nameCus_add').val("");
    $('#phoneNumberCusAdd').val("");
    $('#emailCusAdd').val("");
    $('.nav__add-customer').hide();
    $('.overlay_bang_mon_an').hide();
    $('.div__show-billCustomer').hide();
}

function showBillCustomer() {
    $('.overlay_bang_mon_an').show();
    $('.div__show-billCustomer').show();
    $('#bang_khach_hang').find('tr').click(function () {
        var id = $(this).find('td').eq(1).text();
        var name = $(this).find('td').eq(2).text();
        $('#cusName').text(name);
        $.ajax({
            url: "/getBillByCustomer",
            type: "POST",
            datatype: "json",
            data: {
                "idCus": id
            },
            success: function (data) {

                var contentString = "";
                var tong = 0;
                if (data.data != null) {
                    for (var i = 0; i < data.data.length; i++) {
                        var row = data.data[i];
                        var time = row.time;
                        var temp = time.split("T");
                        tong+=row.total;
                        contentString = contentString
                            + '<tr role="row" class="odd">'
                            + '<td>' + (i + 1) + '</td>'
                            + '<td>' + row.nameTable + '</td>'
                            + '<td>' + row.total + '</td>'
                            + '<td>' + (temp[1]+' '+temp[0]) + '</td>'
                            + '</tr>';
                    }
                }
                $('#bang_bill_cus').html(contentString);
                $('#totalBill').html(tong);
            }
        })
    })
}

function resetAddForm() {
    $("#nameDish_add").val("");
    $("#price_add").val("");
    $('#type_add').empty();
    $('#type_add').append('<option value="Đồ xào">Đồ xào</option>');
    $('#type_add').append('<option value="Đồ chiên">Đồ chiên</option>');
    $('#type_add').append('<option value="Đồ uống">Đồ uống</option>');
    $('#type_add').append('<option value="Đồ tráng miệng">Đồ tráng miệng</option>');
    $('#unit_add').empty();
    $('#unit_add').append('<option value="Bát">Bát</option>');
    $('#unit_add').append('<option value="Đĩa">Đĩa</option>');
    $('#unit_add').append('<option value="Cốc">Cốc</option>');
    $('#unit_add').append('<option value="Chai">Chai</option>');
    $("#devices_add").val("");
}
