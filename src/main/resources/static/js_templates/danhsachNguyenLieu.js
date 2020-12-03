
function showMaterialTable() {
    console.log("show lại list table");
    $('.overlay_bang_mon_an').hide();
    $('.nav__add-material').hide();
    $('.nav__edit-material').hide();
    $('.nav__input-material').hide();
    $('.nav__output-material').hide();

    $.ajax({
        url: "/getAllMaterial",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                console.log(data);
                showTable(data);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}

function showAddFormMaterial() {
    $('.overlay_bang_mon_an').show();
    $('.nav__add-material').show();
}
function showInputMaterial(){
    $('.overlay_bang_mon_an').show();
    $('.nav__input-material').show();
}

function showOutputMaterial(){
    $('.overlay_bang_mon_an').show();
    $('.nav__output-material').show();
}

jQuery.validator.addMethod("checkChar", function (value, element, param) {
    return value.match(new RegExp("." + param + "$"));
});

// tìm kiếm nhân viên bằng tên
$(function () {
    $("#form_search_material").validate({
        submitHandler: function () {
            var name = $("#material_name_search").val().trim();
            if (name == "") {
                showMaterialTable();
            } else {
                $.ajax({
                    url: "/searchMaterialByName",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "name": name,
                    },
                    success: function (data) {
                        if (data.success == true) {
                            swal("Thành công", "Tìm thành công", "success");
                            $('#material_name_search').focus();
                            $('#material_name_search').val("");
                            showTable(data);
                        } else {
                            swal("Lỗi", data.errorMessage, "warning");
                            $('#material_name_search').val("");
                            $('#material_name_search').focus();
                            showMaterialTable();
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
        //     nameMaterial_add: {
        //         required: true,
        //         checkChar: "[a-zA-Z]+",
        //         maxlength: 50
        //     },
        //     price_add: {
        //         required: true,
        //         minlength: 10,
        //         maxlength: 10
        //     }
        // },
        messages: {
            nameMaterial_add: {
                required: "Vui lòng nhập tên nguyên liệu",
                checkChar: "Vui lòng chỉ nhập giá trị chữ",
                maxlength: "Bạn nhập quá dài"
            },
            price_add: {
                required: "Vui lòng nhập giá",
                minlength: "Chỉ nhập 10 chữ số",
                maxlength: "Chỉ nhập 10 chữ số"
            }
        },
        submitHandler: function () {
            var nameMaterial_add = $('#nameMaterial_add').val().trim();
            var price_add = $('#price_add').val().trim();
            var description = $('#description_add').val().trim();

            var unit = $("#unit_add option:selected").text().trim();

            $.ajax({
                url: "/addMaterial",
                type: "POST",
                data: {
                    "nameMaterial": nameMaterial_add,
                    "price": price_add,
                    "devices": description,
                    "unit": unit
                },
                success: function (data) {
                    $('.nav__add-staff').hide();
                    resetAddForm();

                    if (data.success == true) {
                        swal("Thêm thành công", data.data, "success");
                        showMaterialTable();
                    } else {
                        swal("Lỗi", data.errorMessage, "warning");
                        showMaterialTable();
                    }
                }, error: function (data) {
                    swal("Fail", data.errorMessage, "warning");
                }
            });
        }
    });
});

// Nav form edit
function showEditMaterialForm() {
    $('.overlay_bang_mon_an').show();
    $('.nav__edit-material').show();
    $('#bang_nguyen_lieu').find('tr').click(function () {
        var idMaterial = $(this).find('td').eq(1).text();
        $('#idMaterial_edit').val(idMaterial);
        var name = $(this).find('td').eq(2).text();
        $('#nameMaterial_edit').val(name);
        var price = $(this).find('td').eq(3).text();
        $('#price_edit').val(price);
        var unit = $(this).find('td').eq(4).text();
        var amount =$(this).find('td').eq(5).text();
        $("#amount_edit").text(amount);
        //var amount_edit = $("#amount_edit").text();
        //
        var description = $(this).find('td').eq(6).text();
        $('#description_edit').val(description);
    });
}


//Update user information
$(function () {
    $("#edit_form").validate({
        // rules: {
        //     nameMaterial_add: {
        //         required: true,
        //         checkChar: "[a-zA-Z]+",
        //         maxlength: 50
        //     },
        //     price_add: {
        //         required: true,
        //         minlength: 10,
        //         maxlength: 10
        //     }
        // },
        messages: {
            nameMaterial_add: {
                required: "Vui lòng nhập tên nguyên liệu",
                checkChar: "Vui lòng chỉ nhập giá trị chữ",
                maxlength: "Bạn nhập quá dài"
            },
            price_add: {
                required: "Vui lòng nhập giá",
                minlength: "Chỉ nhập 10 chữ số",
                maxlength: "Chỉ nhập 10 chữ số"
            }
        },
        submitHandler: function () {
            var idMaterial = $('#idMaterial_edit').val().trim();
            var name = $('#nameMaterial_edit').val().trim();
            var price = $('#price_edit').val().trim();
            var description = $('#description_edit').val().trim();
            var amount = $('#amount_edit').text();
            var unit = $("#unit_edit option:selected").text().trim();
            console.log(amount);
            console.log("danh sách cập nhật");
            $.ajax({
                url: "/updateMaterial",
                type: "POST",
                data: {
                    "idMaterial" : idMaterial,
                    "name": name,
                    "price": price,
                    "amount":amount,
                    "devices": description,
                    "unit":unit
                },
                success: function (data) {
                    console.log("cap nhat nguyen leiuj");
                    $('.nav__edit-material').hide();
                    $('.overlay_bang_mon_an').hide();
                    swal("Thành công", data.data, "success");
                    showMaterialTable();
                }, error: function (data) {
                    console.log("lỗi không cập nhật dc data");
                    swal("Lỗi", data.errorMessage, "warning");
                }
            });

        }
    });
});

function searchByRole() {
    var selectItem = $("#selectSearch").val();

    console.log(selectItem);
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
                console.log(data);
                showTable(data);
            }, error: function (data) {
                swal("Lỗi", data.data, "warning");
            }

        });
    }


}

function deleteMaterial() {
    $('#bang_nguyen_lieu').find('tr').click(function () {
        var idTable = $(this).find('td').eq(1).text();
        $("#idMaterial_delete").text(idTable);
        var idTableDelete = $("#idMaterial_delete").text();
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
                        url: "/deleteMaterial",
                        type: "POST",
                        data: {
                            "idMaterial": idTableDelete
                        },
                        success: function (data) {
                            if (data.success == true) {
                                swal("Done", data.data, "success");
                                showMaterialTable();
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
    $('.nav__add-material').hide();
    $('.nav__edit-material').hide();
    $('.nav__input-material').hide();
    $('.nav__output-material').hide();
    resetAddForm();
}

function showTable(data) {
    console.log("show table");
    var contentString = "";
    if (data.data != null) {
        for (var i = 0; i < data.data.length; i++) {
            var row = data.data[i];
            var string="";
            if (row.description !=  null){
                string = row.description;
            }
            contentString = contentString
                + '<tr role="row" class="odd">'
                + '<td>' + (i + 1) + '</td>'
                + '<td id="idMaterial" style="display: none">' + row.id + '</td>'
                + '<td>' + row.name + '</td>'
                + '<td>' + row.price + '</td>'
               
                + '<td>' + row.unit + '</td>'
                + '<td>' + row.amount + '</td>'
                + '<td>' + string + '</td>'
                + '<td>' +
                '<button data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="showEditMaterialForm()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>' +
                '<a data-toggle="tooltip" title="Remove"><button onclick="deleteMaterial()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
                + '</tr>';
        }
    }
    $("#soNhanVien").html(data.data.length);
    $("#bang_nguyen_lieu").html(contentString);
}

function resetAddForm() {
    $('#nameMaterial_add').val("");
    $('#price_add').val("");
    $('#description_add').val("");
}
