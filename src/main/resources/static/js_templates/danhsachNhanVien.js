//Show user list
var Role = new Array(0);

function ready() {
    $.ajax({
        url: "/getAllRole",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                // showTable(data);
                for (var i = 0; i < data.data.length; i++) {
                    Role.push(data.data[i]);
                }

                searchReady();
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

function searchReady() {
    $('#selectSearch').empty();
    let optEle = document.createElement("option");
    optEle.text = "Tất cả";
    optEle.value = 0;
    selectSearch.add(optEle);
    for (let optObj of Role) {
        let optEle = document.createElement("option");
        optEle.text = optObj.brand;
        optEle.value = optObj.id;
        selectSearch.add(optEle);
        //role_add.add(optEle);
    }

    for (let optObj of Role) {
        let optEle = document.createElement("option");
        optEle.text = optObj.brand;
        optEle.value = optObj.id;
        //selectSearch.add(optEle);
        role_add.add(optEle);
    }

}

function showDropDownEdit(roleID, roleName) {

    var RoleTemp = Role.slice();
    var pos = 0;

    for (var i = 0; i < RoleTemp.length; i++) {
        if (RoleTemp[i].id == roleID) {
            pos = i;
            break;
        }
    }
    var object = new Object();
    object.id = roleID;
    object.brand = roleName;
    RoleTemp.splice(pos, 1);
    RoleTemp.unshift(object);
    $('#role_edit').empty();
    for (let optObj of RoleTemp) {
        let optEle = document.createElement("option");
        optEle.text = optObj.brand;
        optEle.value = optObj.id;
        role_edit.add(optEle);
    }
    RoleTemp = [];
}

function showStaffTable() {

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
                        if (data.success == true) {
                            swal("Thành công", "Tìm thành công", "success");
                            $('#staff_name_search').focus();
                            $('#staff_name_search').val("");
                            showTable(data);
                        } else {
                            swal("Lỗi", data.errorMessage, "warning");
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
        // rules: {
        //     nameStaff_add: {
        //         required: true,
        //         checkChar: "[a-zA-Z]+",
        //         maxlength: 50
        //     },
        //     phoneNumber_add: {
        //         required: true,
        //         minlength: 10,
        //         maxlength: 10
        //     },
        //     cmnd_add: {
        //         required: true,
        //         digits: true,
        //     },
        //     role_add: {
        //         required: true,
        //         maxlength: 100
        //     },
        //     email_add: {
        //         required: true,
        //         email: true,
        //         maxlength: 45
        //     },
        //     address_add: {
        //         required: true
        //     }
        //
        // },
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
            var role = $("#role_add option:selected").val().trim();
            var username_add = $('#username_add').val().trim();
            var password_add = $('#password_add').val().trim();

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
    $('.nav__edit-staff').show();
    $('#bang_nhan_vien').find('tr').click(function () {
        var idStaff = $(this).find('td').eq(1).text();
        $('#idStaff_edit').val(idStaff);
        var name = $(this).find('td').eq(2).text();
        $('#nameStaff_edit').val(name);
        var phoneNumber = $(this).find('td').eq(3).text();
        $('#phoneNumber_edit').val(phoneNumber);
        var cmnd = $(this).find('td').eq(4).text();
        $('#cmnd_edit').val(cmnd);
        var email = $(this).find('td').eq(5).text();
        $('#email_edit').val(email);
        var address = $(this).find('td').eq(6).text();
        $('#address_edit').val(address);

        //xu li chuc vu
        var roleId = $(this).find('td').eq(7).text();
        var roleName = $(this).find('td').eq(8).text();
        showDropDownEdit(roleId, roleName);
        //
        var username = $(this).find('td').eq(9).text();
        $('#username_edit').val(username);


    });
}


//Update user information
$(function () {
    $("#edit_form").validate({
        // rules: {
        //     nameStaff_add: {
        //         required: true,
        //         checkChar: "[a-zA-Z]+",
        //         maxlength: 50
        //     },
        //     phoneNumber_add: {
        //         required: true,
        //         minlength: 10,
        //         maxlength: 10
        //     },
        //     cmnd_add: {
        //         required: true,
        //         digits: true,
        //     },
        //     role_add: {
        //         required: true,
        //         maxlength: 100
        //     },
        //     email_add: {
        //         required: true,
        //         email: true,
        //         maxlength: 45
        //     },
        //     address_add: {
        //         required: true
        //     }
        //
        // },
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
            var idStaff_edit = $('#idStaff_edit').val().trim();
            var nameStaff_edit = $('#nameStaff_edit').val().trim();
            var phoneNumber_edit = $('#phoneNumber_edit').val().trim();
            var cmnd_edit = $('#cmnd_edit').val().trim();
            var email_edit = $('#email_edit').val().trim();
            var address_edit = $('#address_edit').val().trim();
            var role = $("#role_edit option:selected").val().trim();
            var username_edit = $('#username_edit').val().trim();
            // var password_edit = $('#password_edit').val().trim();
            // var password_edit = $('#password_edit').val().trim();

            $.ajax({
                url: "/updateStaff",
                type: "POST",
                data: {
                    "idStaff" : idStaff_edit,
                    "nameStaff": nameStaff_edit,
                    "phoneNumber": phoneNumber_edit,
                    "cmnd": cmnd_edit,
                    "email":email_edit,
                    "idRole":role,
                    "address" :address_edit,
                    "username":username_edit
                },
                success: function (data) {

                    $('.nav__edit-dish').hide();
                    $('.overlay_bang_mon_an').hide();
                    swal("Thành công", data.data, "success");
                    showStaffTable();
                }, error: function (data) {

                    swal("Lỗi", data.errorMessage, "warning");
                }
            });

        }
    });
});

function searchByRole() {
    var selectItem = $("#selectSearch").val();


    if (selectItem == 0) {
        showStaffTable();
    } else {
        $.ajax({
            url: "/searchStaffByRole",
            type: "POST",
            data: {
                "idRole": selectItem
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
                + '<td id="idRole" style="display: none">' + row.role.id + '</td>'
                + '<td>' + row.role.brand + '</td>'
                + '<td>' + row.user.username + '</td>'
                + '<td>' +
                '<button data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="showEditStaffForm()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>' +
                '<a data-toggle="tooltip" title="Remove"><button onclick="deleteStaff()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
                + '</tr>';
        }
    }
    $("#soNhanVien").html(data.data.length);
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

    $('#role_add').empty();
    $('#role_edit').empty();

}
