// Send mail
var emailPickUp;
var namePickUp;
$(function () {
    $("#form_sendMail").validate({
        rules: {
            text_mail_subject: {
                required: true
            }
        },
        messages: {
            text_mail_subject: {
                required: "Nhập tiêu đề"
            }
        },
        submitHandler: function () {
            var mailAddressReceive = emailPickUp;
            var mailSubject = $("#text_mail_subject").val().trim();
            var mailContent = CKEDITOR.instances['text_mail_content'].getData();
            if (mailContent == "") {
                $("#content_mail_error").text("Nhập nội dung mail");
            }
            if (mailContent != "") {
                $.ajax({
                    url: "/gui-mail-khach-hang",
                    type: "POST",
                    data: {
                        "mailAddressReceive": mailAddressReceive,
                        "mailSubject": mailSubject,
                        "mailContent": mailContent
                    },
                    success: function () {
                        $('#SendMailModal').modal('hide');
                        swal("Done", "Gửi mail thành công", "success");
                    }, error: function () {
                        swal("Fail", "Không thành công", "warning");
                    }
                });
            }
        }
    });
});

function getIDKH() {

    $('#bang_khach_hang').find('tr').click(function () {
        namePickUp = $(this).find('td').eq(1).text();
        emailPickUp = $(this).find('td').eq(5).text();
        $("#mail_address_receive").html(emailPickUp);
        $("#name_customer_receive").html(namePickUp);
    });

    $("#text_mail_subject").val('');
    CKEDITOR.instances['text_mail_content'].setData('');
}

//Show user list
function showCustomerTable() {
    $.ajax({
        url: "/danh-sach-khach-hang",
        type: "POST",
        dataType: "json",
        success: function (data) {
            showTable(data);
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

function showAddFormCustomer() {
    $('.overlay_bang_khach_hang').show();
    $('.nav__add-customer').show();
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
            idKH_add_input: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 4
            },
            ten_add: {
                required: true,
                checkChar: "[a-zA-Z]+",
                maxlength: 20
            },
            dob_add: {
                required: true
            },
            soCmnd_add: {
                required: true,
                digits: true,
                minlength: 9,
                maxlength: 9
            },
            diaChi_add: {
                required: true,
                maxlength: 100
            },
            mail_add: {
                required: true,
                email: true,
                maxlength: 45
            },
            sdt_add: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            ngayBDSD_add: {
                required: true
            }
        },
        messages: {
            idKH_add_input: {
                required: "Vui lòng nhập mã KH",
                digits: "Chỉ nhập kí tự số",
                minlength: "Chỉ nhập 4 chữ số",
                maxlength: "Chỉ nhập 4 chữ số"
            },
            ten_add: {
                required: "Vui lòng nhập tên KH",
                checkChar: "Chỉ nhập kí tự alphabet",
                maxlength: "Bạn nhập quá dài"
            },
            dob_add: {
                required: "Vui lòng chọn ngày sinh"
            },
            soCmnd_add: {
                required: "Vui lòng nhập số CMND",
                digits: "Chỉ nhập kí tự số",
                minlength: "Chỉ nhập 9 chữ số",
                maxlength: "Chỉ nhập 9 chữ số"
            },
            diaChi_add: {
                required: "Vui lòng nhập địa chỉ",
                maxlength: "Nhỏ hơn 100 kí tự"
            },
            mail_add: {
                required: "VUi lòng nhập mail",
                email: "Không phải gmail",
                maxlength: "nhỏ hơn 45 kí tự"
            },
            sdt_add: {
                required: "Vui lòng nhập số đt",
                digits: "Chỉ nhập kí tự số",
                minlength: "Chỉ nhập 10 chữ số",
                maxlength: "Chỉ nhập 10 chữ số"
            },
            ngayBDSD_add: {
                required: "Vui lòng chọn ngày SD",
            }
        },
        submitHandler: function () {
            var idKH_add = $('#idKH_add_input').val().trim();
            var tenKH_add = $('#ten_add').val().trim();
            var dob_add = $('#dob_add').val().trim();
            var soCmnd_add = $('#soCmnd_add').val().trim();
            var diaChi_add = $('#diaChi_add').val().trim();
            var mail_add = $('#mail_add').val().trim();
            var gioiTinh_add = $("#gioiTinh_add option:selected").text().trim();
            var soDT_add = $('#sdt_add').val().trim();
            var ngayBDSD_add = $('#ngayBDSD_add').val().trim();
            var MDSD_add = $("#MDSD_add option:selected").text().trim();

            $.ajax({
                url: "/them-khach-hang",
                type: "POST",
                data: {
                    "idKH_add": idKH_add,
                    "tenKH_add": tenKH_add,
                    "dob_add": dob_add,
                    "soCmnd_add": soCmnd_add,
                    "diaChi_add": diaChi_add,
                    "mail_add": mail_add,
                    "gioiTinh_add": gioiTinh_add,
                    "soDT_add": soDT_add,
                    "ngayBDSD_add": ngayBDSD_add,
                    "MDSD_add": MDSD_add
                },
                success: function (data) {
                    $('.nav__add-customer').hide();
                    $('.overlay_bang_khach_hang').hide();
                    resetAddForm();
                    swal("Done", data, "success");
                    showCustomerTable();
                }, error: function (data) {
                    swal("Fail", data.responseText, "warning");
                }
            });
        }
    });
});

// Nav form edit
function showEditForm() {
    $('.overlay_bang_khach_hang').show();
    $('.nav__edit-customer').show();
    $('#bang_khach_hang').find('tr').click(function () {
        var idKH = $(this).find('td').eq(0).text();
        $('#idKH_edit_input').val(idKH);
        var tenKH = $(this).find('td').eq(1).text();
        $('#ten_edit').val(tenKH);
        var dob = $(this).find('td').eq(2).text();
        $('#dob_edit').val(dob);
        var soCmnd = $(this).find('td').eq(3).text();
        $('#soCmnd_edit').val(soCmnd);
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
            ten_edit: {
                required: true,
                checkChar: "[a-zA-Z]+",
                maxlength: 20
            },
            dob_edit: {
                required: true
            },
            soCmnd_edit: {
                required: true,
                digits: true,
                minlength: 9,
                maxlength: 9
            },
            diaChi_edit: {
                required: true,
                maxlength: 100
            },
            mail_edit: {
                required: true,
                email: true,
                maxlength: 45
            },
            sdt_edit: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            ngayBDSD_edit: {
                required: true
            }
        },
        messages: {
            ten_edit: {
                required: "Vui lòng nhập tên KH",
                checkChar: "Chỉ nhập kí tự alphabet",
                maxlength: "Bạn nhập quá dài"
            },
            dob_edit: {
                required: "Vui lòng chọn ngày sinh"
            },
            soCmnd_edit: {
                required: "Vui lòng nhập số CMND",
                digits: "Chỉ nhập kí tự số",
                minlength: "Chỉ nhập 9 chữ số",
                maxlength: "Chỉ nhập 9 chữ số"
            },
            diaChi_edit: {
                required: "Vui lòng nhập địa chỉ",
                maxlength: "Nhỏ hơn 100 kí tự"
            },
            mail_edit: {
                required: "Vui lòng nhập mail",
                email: "Không phải gmail",
                maxlength: "Nhỏ hơn 45 kí tự"
            },
            sdt_edit: {
                required: "Vui lòng nhập số đt",
                digits: "Chỉ nhập kí tự số",
                minlength: "Chỉ nhập 10 chữ số",
                maxlength: "Chỉ nhập 10 chữ số"
            },
            ngayBDSD_edit: {
                required: "Vui lòng chọn ngày SD",
            }
        },
        submitHandler: function () {
            var idKH_update = $('#idKH_edit_input').val().trim();
            var tenKH_update = $('#ten_edit').val().trim();
            var dob_update = $('#dob_edit').val().trim();
            var soCmnd_update = $('#soCmnd_edit').val().trim();
            var diaChi_update = $('#diaChi_edit').val().trim();
            var mail_update = $('#mail_edit').val().trim();
            var gioiTinh_update = $("#gioiTinh_edit option:selected").text().trim();
            var soDT_update = $('#sdt_edit').val().trim();
            var ngayBDSD_update = $('#ngayBDSD_edit').val().trim();
            var MDSD_update = $("#MDSD_edit option:selected").text().trim();

            $.ajax({
                url: "/tim-kiem-khach-hang",
                type: "POST",
                dataType: "json",
                data: {
                    "customerID": idKH_update,
                },
                success: function (data) {
                    console.log(idKH_update + " " + tenKH_update + " " + dob_update + " " + soCmnd_update + " " + diaChi_update + " " + mail_update + " " + gioiTinh_update + " " + soDT_update + " " + ngayBDSD_update + " " + MDSD_update);
                    if (data[0][1] != tenKH_update || data[0][2] != dob_update || data[0][3] != soCmnd_update || data[0][4] != diaChi_update ||
                        data[0][5] != mail_update || data[0][6] != gioiTinh_update || data[0][7] != soDT_update || data[0][8] != ngayBDSD_update || data[0][9] != MDSD_update) {
                        $.ajax({
                            url: "/cap-nhat-thong-tin-khach-hang",
                            type: "POST",
                            data: {
                                "idKH_update": idKH_update,
                                "tenKH_update": tenKH_update,
                                "dob_update": dob_update,
                                "soCmnd_update": soCmnd_update,
                                "diaChi_update": diaChi_update,
                                "mail_update": mail_update,
                                "gioiTinh_update": gioiTinh_update,
                                "soDT_update": soDT_update,
                                "ngayBDSD_update": ngayBDSD_update,
                                "MDSD_update": MDSD_update
                            },
                            success: function (data) {
                                $('.nav__edit-customer').hide();
                                $('.overlay_bang_khach_hang').hide();
                                swal("Done", data, "success");
                                showCustomerTable();
                            }, error: function (data) {
                                swal("Fail", data.responseText, "warning");
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

function deleteCustomer() {
    $('#bang_khach_hang').find('tr').click(function () {
        var maKH = $(this).find('td').eq(0).text();
        $("#id_KH_delete_td").text(maKH);
        var idKHDelete = $("#id_KH_delete_td").text();
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this customer ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        url: "/xoa-khach-hang",
                        type: "POST",
                        data: {
                            "idKHDelete": idKHDelete
                        },
                        success: function (data) {
                            swal("Done", data, "success");
                            showCustomerTable();
                        }, error: function () {
                            swal("Fail", "Không xóa được", "warning");
                        }
                    });
                }
            });
    });
}

function closeEditForm() {
    $('.overlay_bang_khach_hang').hide();
    $('.nav__add-customer').hide();
    $('.nav__edit-customer').hide();
    resetAddForm();
}

function showTable(data) {
    var contentString = "";
    for (var i = 0; i < data.length; i++) {
        contentString = contentString
            + '<tr role="row" class="odd">'
            + '<td id="id_KH_td">' + data[i][0] + '</td>'
            + '<td>' + data[i][1] + '</td>'
            + '<td>' + data[i][2] + '</td>'
            + '<td>' + data[i][3] + '</td>'
            + '<td>' + data[i][4] + '</td>'
            + '<td>' + data[i][5] + '</td>'
            + '<td>' + data[i][6] + '</td>'
            + '<td>' + data[i][7] + '</td>'
            + '<td>' + data[i][8] + '</td>'
            + '<td>' + data[i][9] + '</td>'
            + '<td><a href="#" data-toggle="tooltip" title="Send Mail" onclick="getIDKH()"><button data-toggle="modal" data-target="#SendMailModal" class="btn btn-primary center-block mb-1" style="padding: 1px 1px 1px 1px;"><i class="icon-mail-read"></i></button></a>' +
            '<button data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="showEditForm()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="icon-pencil"></i></button>' +
            '<a data-toggle="tooltip" title="Remove"><button onclick="deleteCustomer()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
            + '</tr>';
    }
    $("#soNguoiDung").html(data.length);
    $("#bang_khach_hang").html(contentString);
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
