//Show user list
function showTableTable() {

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
            nameTable_add: {
                required: "Vui lòng nhập tên món ăn",
                maxlength: "Tên bàn quá dài"
            },
            type_add: {
                required: "Vui lòng nhập giá"
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
                    $('.nav__add-table').hide();
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
    $('.nav__edit-table').show();
    $('#bang_ban').find('tr').click(function () {
        var idTable = $(this).find('td').eq(1).text();
        $('#idTable_edit').val(idTable);
        var name = $(this).find('td').eq(2).text();
        $('#nameTable_edit').val(name);

        var type = $(this).find('td').eq(3).text();


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
        var area = $(this).find('td').eq(4).text();

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
                                swal("Lỗi", data.errorMessage, "warning");
                            }
                        });
                    } else {
                        $('.nav__edit-table').hide();
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

function deleteTable() {
    $('#bang_ban').find('tr').click(function () {
        var idTable = $(this).find('td').eq(1).text();
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
                            showTableTable();
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

    var contentString = "";
    if (data.data != null) {
        for (var i = 0; i < data.data.length; i++) {
            var row = data.data[i];
            contentString = contentString
                + '<tr role="row" class="odd">'
                + '<td>' + (i+1) + '</td>'
                + '<td id="idTable" style="display: none">' + row.id + '</td>'
                + '<td>' + row.name + '</td>'
                + '<td>' + row.type + '</td>'
                + '<td>' + row.area + '</td>'
                + '<td>' +
                '<button data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="showEditTableForm()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>' +
                '<a data-toggle="tooltip" title="Remove"><button onclick="deleteTable()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
                + '</tr>';
        }
    }
    $("#soBan").html(data.data.length);
    $("#bang_ban").html(contentString);
}

function resetAddForm() {
    $("#nameTable_add").val("");


    $('#type_add').empty();
    $('#type_add').append('<option value="2 người">2 người</option>');
    $('#type_add').append('<option value="4 người">4 người</option>');
    $('#type_add').append('<option value="6 người">6 người</option>');
    $('#area_add').empty();
    $('#area_add').append('<option value="A">A</option>');
    $('#area_add').append('<option value="B">B</option>');
    $('#area_add').append('<option value="C">C</option>');
}
