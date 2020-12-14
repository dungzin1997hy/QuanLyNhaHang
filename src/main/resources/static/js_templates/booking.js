var Customer = new Array(0);
var CustomerPhoneNumber = new Array(0);
var Type = new Array(0);
function ready() {
    $.ajax({
        url: "/getAllCustomer",
        type: "POST",
        dataType: "json",
        success: function (data) {
            Customer = [];
            CustomerPhoneNumber = [];
            if (data.success == true) {
                for (var i = 0; i < data.data.length; i++) {
                    Customer.push(data.data[i]);
                    CustomerPhoneNumber.push(data.data[i].phoneNumber);
                }
            }
            console.log(Customer);
            console.log(CustomerPhoneNumber);
            $("#phoneNumberAdd").autocomplete({
                source: CustomerPhoneNumber
            });
            // $("#nameSearchOutput").autocomplete({
            //     source:materialName
            // })

        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });

    $.ajax({
        url: "/getAllTimeBook",
        type: "POST",
        dataType: "json",
        success: function (data) {

            if (data.success == true) {
                for (var i = 0; i < data.data.length; i++) {
                    Type.push(data.data[i]);
                }
            }
            // console.log(Type);
            $('#time_add').empty();
            for (let optObj of Type) {
                console.log(optObj);
                let optEle = document.createElement("option");
                var startTime = optObj.startTime.split(':');
                var stopTime = optObj.stopTime.split(':');
                var text =startTime[0]+":"+startTime[1]+'-'+stopTime[0]+":"+stopTime[1];
                optEle.text = text;
                optEle.value = optObj.id;
                time_add.add(optEle);
                //role_add.add(optEle);
            }

        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });

}
function changePhoneNumber(value) {
    console.log(value);
    var i = CustomerPhoneNumber.indexOf(value);
    $('#nameCus').val(Customer[i].name);
}
//Show user list
function showBookingTable() {
    $('.overlay_bang_mon_an').hide();
    $('.nav__add-booking').hide();
    $('.nav__edit-booking').hide();
    $.ajax({
        url: "/getAllBooking",
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

function showAddFormBooking() {
    $('.overlay_bang_mon_an').show();
    $('.nav__add-booking').show();
}
function showAddFormCustomer(){
    $('.overlay_bang_mon_an').show();
    $('.nav__add-customer').show();;

}

jQuery.validator.addMethod("checkChar", function (value, element, param) {
    return value.match(new RegExp("." + param + "$"));
});

// // tìm kiếm món ăn = tên
// $(function () {
//     $("#form_search_dish").validate({
//         submitHandler: function () {
//             var nameDish = $("#dish_name_search").val().trim();
//             if (nameDish == "") {
//                 showDishTable();
//             } else {
//                 $.ajax({
//                     url: "/searchListDishByName",
//                     type: "POST",
//                     dataType: "json",
//                     data: {
//                         "nameDish": nameDish,
//                     },
//                     success: function (data) {
//                         if(data.success == true) {
//                             swal("Thành công", "Tìm thành công", "success");
//                             $('#dish_name_search').focus();
//                             $('#dish_name_search').val("");
//                             showTable(data);
//                         }
//                         else {
//                             swal("Lỗi",data.errorMessage,"warning");
//                             $('#dish_name_search').val("");
//                             $('#dish_name_search').focus();
//                             showDishTable();
//                         }
//
//                     }, error: function (data) {
//                         swal("Fail", data.responseText, "warning");
//                     }
//                 });
//             }
//         }
//     });
// });

//thêm booking
$(function () {
    $("#add_form").validate({
        rules: {
            // nameDish_add: {
            //     required: true,
            //     checkChar: "[a-zA-Z]+",
            //     maxlength: 20
            // },
            // price_add: {
            //     digits: true,
            //     required: true
            // },
            // devices_add: {
            //     maxlength: 50
            // }
        },
        messages: {
            phoneNumberAdd: {
                required: "Vui lòng nhập tên món ăn",

            }
        },
        submitHandler: function () {
            var phoneNumber = $('#phoneNumberAdd').val().trim();
            if (CustomerPhoneNumber.includes(phoneNumber) == false) {
                $('#phoneNumberSearchError').html("Không có khách hàng này");
                $("#addCustomer").show();
                $('#phoneNumberCusAdd').val(phoneNumber);
            }
            else
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

//thêm khách hàng
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
                required: "Vui lòng nhập tên món ăn",
            },
            phoneNumberAdd: {
                required: "Vui lòng nhập số điện thoại"
            },
            emailCusAdd: {
                maxlength:"Vui lòng nhập nhỏ hơn 50 ký tự"
            }

        },
        submitHandler: function () {
            var name = $('#nameCus_add').val().trim();
            var phoneNumber = $('#phoneNumberCusAdd').val().trim();
            var email = $('#emailCusAdd').val().trim();
            if (CustomerPhoneNumber.includes(phoneNumber) == true) {
                swal("Fail", "Khách hàng đã tồn tại", "warning");
            }
            else
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
                            ready();
                        } else {
                            swal("Lỗi", data.errorMessage, "warning");

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
        var idDish = $(this).find('td').eq(1).text();
        $('#idDish_edit').val(idDish);
        var nameDish = $(this).find('td').eq(2).text();
        $('#nameDish_edit').val(nameDish);
        var price = $(this).find('td').eq(3).text();
        $('#price_edit').val(price);
        var type = $(this).find('td').eq(4).text();

        //console.log(type);
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

        var unit = $(this).find('td').eq(5).text();

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
        var description = $(this).find('td').eq(6).text();
        $('#devices_edits').val(description);
    });

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
                        $('.nav__edit-dish').hide();
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

function deleteBooking() {
    $('#bang_booking').find('tr').click(function () {
        var idBooking = $(this).find('td').eq(1).text();
        $("#idBooking_delete").text(idBooking);
        var idDishDelete = $("#idBooking_delete").text();
        swal({
                title: "Xác nhận !!!",
                text: "Bạn có chắc xoá đặt bàn này không ?",
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
                        url: "/deleteBooking",
                        type: "POST",
                        data: {
                            "idBooking": idDishDelete
                        },
                        success: function (data) {
                            swal("Done", data.data, "success");
                            showBookingTable();
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
                + '<td id="idBooking" style="display: none">' + row.id + '</td>'
                + '<td id="idCustomer" style="display: none">' + row.customer.id + '</td>'
                + '<td>' + row.customer.name + '</td>'
                + '<td>' + row.customer.phoneNumber + '</td>'
                + '<td id="idTable" style="display: none">' + row.table.id + '</td>'
                + '<td>' + row.table.name + '</td>'
                + '<td>' + row.timeBook.startTime+' - '+row.timeBook.stopTime + '</td>'
                + '<td>' + string + '</td>'
                + '<td>' +
                '<button data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="showEditForm()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>' +
                '<a data-toggle="tooltip" title="Remove"><button onclick="deleteBooking()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
                + '</tr>';
        }
    }
  //  $("#soMonAn").html(data.data.length);
    $("#bang_booking").html(contentString);
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
