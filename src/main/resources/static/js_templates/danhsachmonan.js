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
    $("#form_search_dish").validate({
        submitHandler: function () {
            var nameDish = $("#dish_name_search").val().trim();
            if (nameDish == "") {
                showDishTable();
            } else {
                $.ajax({
                    url: "/searchListDishByName",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "nameDish": nameDish,
                    },
                    success: function (data) {
                        if(data.success == true) {
                            swal("Thành công", "Tìm thành công", "success");
                            $('#dish_name_search').focus();
                            $('#dish_name_search').val("");
                            showTable(data);
                        }
                        else {
                            swal("Lỗi",data.errorMessage,"warning");
                            $('#dish_name_search').val("");
                            $('#dish_name_search').focus();
                            showDishTable();
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

// Nav form edit
function showEditForm() {
    $('.overlay_bang_mon_an').show();
    $('.nav__edit-dish').show();
    $('#bang_mon_an').find('tr').click(function () {
        var url =$(this).find('td').eq(2).find('img').attr('src');
        $('#thumbnail_edit').attr('src',url);
        var idDish = $(this).find('td').eq(1).text();
        $('#idDish_edit').val(idDish);
        var nameDish = $(this).find('td').eq(3).text();
        $('#nameDish_edit').val(nameDish);
        var price = $(this).find('td').eq(4).text();
        $('#price_edit').val(price);
        var type = $(this).find('td').eq(5).text();


        if (type.trim() == 'Đồ xào') {
            $('#type_edit').empty();
            $('#type_edit').append('<option value="Đồ xào">Đồ xào</option>');

            $('#type_edit').append('<option value="Đồ chiên">Đồ chiên</option>');
            $('#type_edit').append('<option value="Đồ uống">Đồ uống</option>');
            $('#type_edit').append('<option value="Đồ tráng miệng">Đồ tráng miệng</option>');
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

        var unit = $(this).find('td').eq(6).text();

        if (unit.trim() == 'Đĩa') {
            $('#unit_edit').empty();
            $('#unit_edit').append('<option value="Đĩa">Đĩa</option>');

            $('#unit_edit').append('<option value="Bát">Bát</option>');
            $('#unit_edit').append('<option value="Cốc">Cốc</option>');
            $('#unit_edit').append('<option value="Chai">Chai</option>');
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
        var description = $(this).find('td').eq(7).text();
        $('#devices_edit').val(description);
    });

}
//add dish
function ajaxSubmitForm() {
    var form = $('#add_form')[0];
    var data = new FormData(form);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/addDish",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
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
        },
        error: function (jqXHR) {
            swal("Lỗi", jqXHR.responseText, "warning");
            $('#modal-upload-file').modal('hide');
        }
    });
}
function ajaxSubmitEditForm() {

    var idDishEdit = $('#idDish_edit').val().trim();
    var nameDishEdit = $('#nameDish_edit').val().trim();
    var priceEdit = $('#price_edit').val().trim();
    var imageinput = $('#fileImage_edit').val();

    var typeEdit = $('#type_edit option:selected').val().trim();
    var unitEdit = $('#unit_edit option:selected').val().trim();
    var devices_edits = $('#devices_edit').val().trim();

    $.ajax({
        url: "/searchDishByName",
        type: "POST",
        dataType: "json",
        data: {
            "nameDish": nameDishEdit,
        },
        success: function (data) {
            var form = $('#edit_form')[0];
            var datalog = new FormData(form);
            if (data.data.id != idDishEdit || data.data.name != nameDishEdit || data.data.price != priceEdit || data.data.type != typeEdit || data.data.description != devices_edits || data.data.unit != unitEdit||imageinput != "") {
                $.ajax({
                    type: "POST",
                    enctype: 'multipart/form-data',
                    url: "/updateDish",
                    data: datalog,
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 1000000,
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
        },
        error: function (jqXHR) {
            swal("Lỗi","SearchDish faile", "warning");
            $('#modal-upload-file').modal('hide');
        }
    });
}

function showImage(fileInput){
    file = fileInput.files[0];
    reader = new FileReader();
    reader.onload = function (e) {
        $('#thumbnail_add').show();
        $('#thumbnail_add').attr('src',e.target.result);
    }
    reader.readAsDataURL(file);
}
function showImageEdit(fileInput){
    file = fileInput.files[0];
    reader = new FileReader();
    reader.onload = function (e) {
        $('#thumbnail_edit').show();
        $('#thumbnail_edit').attr('src',e.target.result);
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
            url : "/searchDishByType",
            type : "POST",
            data: {
                "typeDish" : selectItem
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
    $('.nav__add-dish').hide();
    $('.nav__edit-dish').hide();
    resetAddForm();
}

function showTable(data) {

    var contentString = "";
    if (data.data != null) {
        for (var i = 0; i < data.data.length; i++) {
            var row = data.data[i];
            if (row.description == null) {
                var string = "";
            } else string = row.description;
            contentString = contentString
                + '<tr role="row" class="odd">'
                + '<td>' + (i+1) + '</td>'
                + '<td id="idDish" style="display: none">' + row.id + '</td>'
                + '<td><img id="'+row.url+'" src="/image/upload/' + row.url + '" alt="slider-image" style="width: 100px;height: 100px">'  + '</td>'
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
