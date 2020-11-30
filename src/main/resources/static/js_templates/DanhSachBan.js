//Show user list
function showTableTable() {
    console.log("show lại list table");
    $('.overlay_bang_mon_an').hide();
    $('.nav__add-table').hide();
    $('.nav__edit-table').hide();
    $.ajax({
        url: "/getAllTable",
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

function showAddFormTable() {
    $('.overlay_bang_mon_an').show();
    $('.nav__add-table').show();
}


jQuery.validator.addMethod("checkChar", function (value, element, param) {
    return value.match(new RegExp("." + param + "$"));
});

// tìm kiếm món ăn = tên

//thêm khách hàng
$(function () {
    $("#add_form").validate({
        rules: {

            nameTable_add: {
                required: true,
                maxlength: 20
            },
            type_add: {
                required: true
            }
        },
        messages: {
            nameDish_add: {
                required: "Vui lòng nhập tên món ăn",

                maxlength: "Tên bàn quá dài"
            },
            type_add: {
                required: "Vui lòng nhập giá",
                digits: "Vui lòng chỉ nhập số"
            }
        },
        submitHandler: function () {
            var nameTable_add = $('#nameTable_add').val().trim();
            var type_add = $("#type_add option:selected").text().trim();
            var area_add = $('#area_add option:selected').text().trim();



            $.ajax({
                url: "/addTable",
                type: "POST",
                data: {
                    "nameTable_add": nameTable_add,
                    "type_add": type_add,
                    "area_add": area_add
                },
                success: function (data) {
                    $('.nav__add-dish').hide();
                    resetAddForm();

                    if (data.success == true) {
                        swal("Thành công", data.data, "success");
                        showTableTable();
                    } else {
                        swal("Lỗi", data.errorMessage, "warning");
                        showTableTable();
                    }
                }, error: function (data) {
                    swal("Fail", data.errorMessage, "warning");
                }
            });
        }
    });
});

// Nav form edit
function showEditTableForm() {
    $('.overlay_bang_mon_an').show();
    $('.nav__edit-dish').show();
    $('#bang_mon_an').find('tr').click(function () {
        var idDish = $(this).find('td').eq(0).text();
        $('#idDish_edit').val(idDish);
        var nameDish = $(this).find('td').eq(1).text();
        $('#nameDish_edit').val(nameDish);
        var price = $(this).find('td').eq(2).text();
        $('#price_edit').val(price);
        var type = $(this).find('td').eq(3).text();

        //console.log(type);
        if (type.trim() == 'Đồ xào') {
            $('#type_edit').children('option:first').text('Đồ xào');
        }
        if (type.trim() == 'Đồ chiên') {
            $('#type_edit').empty();
            $('#type_edit').append('<option value="Đồ chiên">Đồ chiên</option>');
            $('#type_edit').append('<option value="Đồ xào">Đồ xào</option>');
            $('#type_edit').append('<option value="Đồ uống">Đồ uống</option>');
            $('#type_edit').append('<option value="Đồ tráng miệng">Đồ tráng miệng</option>');
        }
        if (type.trim() == 'Đồ uống') {
            $('#type_edit').empty();
            $('#type_edit').append('<option value="Đồ uống">Đồ uống</option>');
            $('#type_edit').append('<option value="Đồ xào">Đồ xào</option>');
            $('#type_edit').append('<option value="Đồ chiên">Đồ chiên</option>');
            $('#type_edit').append('<option value="Đồ tráng miệng">Đồ tráng miệng</option>');
        }
        if (type.trim() == 'Đồ tráng miệng') {
            $('#type_edit').empty();
            $('#type_edit').append('<option value="Đồ tráng miệng">Đồ tráng miệng</option>');
            $('#type_edit').append('<option value="Đồ xào">Đồ xào</option>');
            $('#type_edit').append('<option value="Đồ uống">Đồ uống</option>');
            $('#type_edit').append('<option value="Đồ chiên">Đồ chiên</option>');
        }

        var unit = $(this).find('td').eq(4).text();

        if (unit.trim() == 'Đĩa') {
            $('#unit_edit').children('option:first').text('Đĩa');
        }
        if (unit.trim() == 'Bát') {
            $('#unit_edit').empty();
            $('#unit_edit').append('<option value="Bát">Bát</option>');
            $('#unit_edit').append('<option value="Đĩa">Đĩa</option>');
            $('#unit_edit').append('<option value="Cốc">Cốc</option>');
            $('#unit_edit').append('<option value="Chai">Chai</option>');
        }
        if (unit.trim() == 'Cốc') {
            $('#unit_edit').empty();
            $('#unit_edit').append('<option value="Cốc">Cốc</option>');

            $('#unit_edit').append('<option value="Bát">Bát</option>');
            $('#unit_edit').append('<option value="Đĩa">Đĩa</option>');
            $('#unit_edit').append('<option value="Chai">Chai</option>');
        }
        if (unit.trim() == 'Chai') {
            $('#unit_edit').empty();
            $('#unit_edit').append('<option value="Chai">Chai</option>');

            $('#unit_edit').append('<option value="Bát">Bát</option>');
            $('#unit_edit').append('<option value="Đĩa">Đĩa</option>');
            $('#unit_edit').append('<option value="Cốc">Cốc</option>');
        }
        var description = $(this).find('td').eq(5).text();
        $('#devices_edits').val(description);
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
                    //          console.log(idDishEdit + " " + nameDishEdit + " " + priceEdit + " " + typeEdit + " " + unitEdit);
                    //         console.log(data.data.id + " " + data.data.name + " " + data.data.price + " " + data.data.type + " " + data.data.unit);
                    console.log(data);

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
                                // console.log("lỗi không cập nhật dc data");
                                swal("Lỗi", data.errorMessage, "warning");
                            }
                        });
                    } else {
                        $('.nav__edit-customer').hide();
                        $('.overlay_bang_khach_hang').hide();
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
            url : "/searchTableByType",
            type : "POST",
            data: {
                "type" : selectItem
            },
            success: function (data) {
                showTable(data);
            }, error: function (data) {
                swal("Lỗi", data.data, "warning");
            }

        });
    }


}

function deleteTable() {
    $('#bang_ban').find('tr').click(function () {
        var idTable = $(this).find('td').eq(0).text();
        $("#idTable_delete").text(idTable);
        var idTableDelete = $("#idTable_delete").text();
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
                        url: "/deleteTable",
                        type: "POST",
                        data: {
                            "idTable": idTableDelete
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
    $('.nav__add-table').hide();
    $('.nav__edit-table').hide();
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
                + '<td id="idTable">' + row.id + '</td>'
                + '<td>' + row.name + '</td>'
                + '<td>' + row.type + '</td>'
                + '<td>' + row.area + '</td>'
                + '<td>' +
                '<button data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="showEditTableForm()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>' +
                '<a data-toggle="tooltip" title="Remove"><button onclick="deleteDish()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
                + '</tr>';
        }
    }
    $("#soBan").html(data.data.length);
    $("#bang_ban").html(contentString);
}

function resetAddForm() {
    $("#nameDish_add").val("");
    $("#price_add").val("");
    $("#type_add").val("");
    $("#unit_add").val("");
    $("#devices_add").val("");
}
