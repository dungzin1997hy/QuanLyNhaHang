//Show user list
function showStaffTable() {
    console.log("show lại list table");
    $('.overlay_bang_mon_an').hide();
    $('.nav__add-staff').hide();
    $('.nav__edit-staff').hide();
    $.ajax({
        url: "/getAllStaff",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {

                showTable(data);
                console.log(data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

function showAddFormStaff() {
    $('.overlay_bang_mon_an').show();
    $('.nav__add-staff').show();
}


jQuery.validator.addMethod("checkChar", function (value, element, param) {
    return value.match(new RegExp("." + param + "$"));
});

// tìm kiếm nhân viên bằng tên
$(function () {
    $("#form_search_staff").validate({
        submitHandler: function () {
            var name = $("#staff_name_search").val().trim();
            if (name == "") {
                showStaffTable();
            } else {
                $.ajax({
                    url: "/searchStaffByName",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "staffName": name,
                    },
                    success: function (data) {
                        if(data.success == true) {
                            swal("Thành công", "Tìm thành công", "success");
                            $('#staff_name_search').focus();
                            $('#staff_name_search').val("");
                            showTable(data);
                        }
                        else {
                            swal("Lỗi",data.errorMessage,"warning");
                            $('#staff_name_search').val("");
                            $('#staff_name_search').focus();
                            showStaffTable();
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
            nameStaff_add: {
                required: true,
                checkChar: "[a-zA-Z]+",
                maxlength: 50
            },
            phoneNumber_add: {
                required: true,
                minlength: 10,
                maxlength: 10
            },
            cmnd_add: {
                required: true,
                digits: true,
            },
            role_add: {
                required: true,
                maxlength: 100
            },
            email_add: {
                required: true,
                email: true,
                maxlength: 45
            },
            address_add: {
                required: true
            }

        },
        messages: {
            nameStaff_add: {
                required: "Vui lòng nhập tên nhân viên",
                checkChar: "Vui lòng chỉ nhập giá trị chữ",
                maxlength: "Bạn nhập quá dài"
            },
            phoneNumber_add: {
                required: "Vui lòng nhập số điện thoại",
                minlength: "Chỉ nhập 10 chữ số",
                maxlength: "Chỉ nhập 10 chữ số"
            },
            cmnd_add: {
                required: "Vui lòng nhập số CMND",
            },
            role_add: {
                required: true,
                maxlength: 100
            },
            email_add: {
                required: "Vui lòng nhập gmail",
                email: "Nhập sai định dạng gmail",
                maxlength: "Vui lòng nhập nhỏ hơn 45 ký tự"
            },
            address_add: {
                required: "Vui lòng nhập địa chỉ"
            }

        },
        submitHandler: function () {
            var nameStaff_add = $('#nameStaff_add').val().trim();
            var phoneNumber_add = $('#phoneNumber_add').val().trim();
            var cmnd_add = $('#cmnd_add').val().trim();
            var email_add = $('#email_add').val().trim();
            var address_add = $('#address_add').val().trim();
            var role = $("#role_add option:selected").text().trim();
            var username_add = $('#username_add').val().trim();
            var password_add = $('#password_add').val().trim();
            console.log(username_add + " " + password_add);
            $.ajax({
                url: "/addStaff",
                type: "POST",
                data: {
                    "nameStaff_add": nameStaff_add,
                    "phoneNumber_add": phoneNumber_add,
                    "cmnd_add": cmnd_add,
                    "email_add": email_add,
                    "role": role,
                    "address_add": address_add,
                    "username_add": username_add,
                    "password_add": password_add
                },
                success: function (data) {
                    $('.nav__add-staff').hide();
                    resetAddForm();

                    if (data.success == true) {
                        swal("Thêm thành công", data.data, "success");
                        showStaffTable();
                    } else {
                        swal("Lỗi", data.errorMessage, "warning");
                        showStaffTable();
                    }
                }, error: function (data) {
                    swal("Fail", data.errorMessage, "warning");
                }
            });
        }
    });
});

// Nav form edit
function showEditStaffForm() {
    $('.overlay_bang_mon_an').show();
    $('.nav__edit-').show();
    $('#bang_ban').find('tr').click(function () {
        var idTable = $(this).find('td').eq(0).text();
        $('#idTable_edit').val(idTable);
        var name = $(this).find('td').eq(1).text();
        $('#nameTable_edit').val(name);

        var type = $(this).find('td').eq(2).text();

        //console.log(type);
        if (type.trim() == '2 người') {
            $('#type_edit').empty();
            $('#type_edit').append('<option value="2 người">2 người</option>');

            $('#type_edit').append('<option value="4 người">4 người</option>');
            $('#type_edit').append('<option value="6 người">6 người</option>');
        }
        if (type.trim() == '4 người') {
            $('#type_edit').empty();
            $('#type_edit').append('<option value="4 người">4 người</option>');
            $('#type_edit').append('<option value="2 người">2 người</option>');
            $('#type_edit').append('<option value="6 người">6 người</option>');
        }
        if (type.trim() == '6 người') {
            $('#type_edit').empty();
            $('#type_edit').append('<option value="6 người">6 người</option>');
            $('#type_edit').append('<option value="2 người">2 người</option>');
            $('#type_edit').append('<option value="4 người">4 người</option>');
        }
        var area = $(this).find('td').eq(3).text();

        if (area.trim() == 'A') {
            $('#area_edit').empty();
            $('#area_edit').append('<option value="A">A</option>');

            $('#area_edit').append('<option value="B">B</option>');
            $('#area_edit').append('<option value="C">C</option>');
        }
        if (area.trim() == 'B') {
            $('#area_edit').empty();
            $('#area_edit').append('<option value="B">B</option>');
            $('#area_edit').append('<option value="A">A</option>');
            $('#area_edit').append('<option value="C">C</option>');

        }
        if (area.trim() == 'C') {
            $('#area_edit').empty();
            $('#area_edit').append('<option value="C">C</option>');
            $('#area_edit').append('<option value="A">A</option>');
            $('#area_edit').append('<option value="B">B</option>');

        }

    });

}

//Update user information
$(function () {
    $("#edit_form").validate({
        rules: {
            nameTable_edit: {
                required: true,
                maxlength: 20
            }
        },
        messages: {
            nameTable_edit: {
                required: "Vui lòng nhập tên bàn",
                maxlength: "Tên món ăn quá dài"
            }
        },
        submitHandler: function () {
            var idTable = $('#idTable_edit').val().trim();
            var nameTable = $('#nameTable_edit').val().trim();
            var typeEdit = $('#type_edit option:selected').val().trim();
            var areaEdit = $('#area_edit option:selected').val().trim();

            $.ajax({
                url: "/getTableByName",
                type: "POST",
                dataType: "json",
                data: {
                    "name": nameTable,
                },
                success: function (data) {
                    //          console.log(idDishEdit + " " + nameDishEdit + " " + priceEdit + " " + typeEdit + " " + unitEdit);
                    //         console.log(data.data.id + " " + data.data.name + " " + data.data.price + " " + data.data.type + " " + data.data.unit);
                    console.log(data);

                    if (data.data.id != idTable || data.data.name != nameTable || data.data.type != typeEdit || data.data.area != areaEdit) {
                        $.ajax({
                            url: "/updateTable",
                            type: "POST",
                            data: {
                                "idTable": idTable,
                                "nameTable_edit": nameTable,
                                "type_edit": typeEdit,
                                "area_edit": areaEdit
                            },
                            success: function (data) {

                                $('.nav__edit-dish').hide();
                                $('.overlay_bang_mon_an').hide();
                                swal("Thành công", data.data, "success");
                                showTableTable();
                            }, error: function (data) {
                                // console.log("lỗi không cập nhật dc data");
                                swal("Lỗi", data.errorMessage, "warning");
                            }
                        });
                    } else {
                        $('.nav__edit-table').hide();
                        $('.overlay_bang_mon_an').hide();
                        console.log("khong cap nhat");
                        swal("Lỗi", "Không có thông tin nào được cập nhật", "warning");
                    }
                }, error: function (data) {
                    swal("Fail", data.responseText, "warning");
                }
            });
        }
    });
});

function searchTableByType() {
    var selectItem = $("#selectSearchTable").val();
    if (selectItem == 'Tất cả') {
        showTableTable();
    } else {
        $.ajax({
            url: "/searchTableByType",
            type: "POST",
            data: {
                "type": selectItem
            },
            success: function (data) {
                showTable(data);
            }, error: function (data) {
                swal("Lỗi", data.data, "warning");
            }

        });
    }


}

function deleteStaff() {
    $('#bang_nhan_vien').find('tr').click(function () {
        var idTable = $(this).find('td').eq(1).text();
        console.log(idTable);
        $("#idStaff_delete").text(idTable);
        var idTableDelete = $("#idStaff_delete").text();

        swal({
                title: "Xác nhận !!!",
                text: "Bạn có chắc xoá bàn này không ?",
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
                        url: "/deleteStaff",
                        type: "POST",
                        data: {
                            "idStaff": idTableDelete
                        },
                        success: function (data) {
                            if (data.success == true) {
                                swal("Done", data.data, "success");
                                showStaffTable();
                            } else swal("Lỗi", "Không xóa được", "warning");
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
    $('.nav__add-staff').hide();
    $('.nav__edit-staff').hide();
    resetAddForm();
}

function showTable(data) {
    console.log("show table");
    var contentString = "";
    if (data.data != null) {
        for (var i = 0; i < data.data.length; i++) {
            var row = data.data[i];
            contentString = contentString
                + '<tr role="row" class="odd">'
                + '<td>' + (i + 1) + '</td>'
                + '<td id="idStaff" style="display: none">' + row.id + '</td>'
                + '<td>' + row.name + '</td>'
                + '<td>' + row.phoneNumber + '</td>'
                + '<td>' + row.cmnd + '</td>'
                + '<td>' + row.email + '</td>'
                + '<td>' + row.address + '</td>'
                + '<td>' + row.role.role + '</td>'
                + '<td>' + row.user.username + '</td>'
                + '<td>' +
                '<button data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="showEditStaffForm()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>' +
                '<a data-toggle="tooltip" title="Remove"><button onclick="deleteStaff()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
                + '</tr>';
        }
    }
    $("#soBan").html(data.data.length);
    $("#bang_nhan_vien").html(contentString);
}

function resetAddForm() {
    $('#nameStaff_add').val("");
    $('#phoneNumber_add').val("");
    $('#cmnd_add').val("");
    $('#email_add').val("");
    $('#address_add').val("");
    // $("#role_add option:selected").text().trim();
    $('#username_add').val("");
    $('#password_add').val("");
}
