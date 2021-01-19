var Customer = new Array(0);
var CustomerPhoneNumber = new Array(0);
var Type = new Array(0);

function ready() {
    $.ajax({
        url: "/api/getAllCustomer",
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
        url: "/api/getAllTimeBook",
        type: "POST",
        dataType: "json",
        success: function (data) {
            Type = [];
            if (data.success == true) {
                for (var i = 0; i < data.data.length; i++) {
                    Type.push(data.data[i]);
                }
            }

            $('#time_add').empty();
            for (let optObj of Type) {
                let optEle = document.createElement("option");
                var startTime = optObj.startTime.split(':');
                var stopTime = optObj.stopTime.split(':');
                var text = startTime[0] + ":" + startTime[1] + '-' + stopTime[0] + ":" + stopTime[1];
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
    if (CustomerPhoneNumber.includes(value) == false) {
        $('#phoneNumberSearchError').html("Không có khách hàng này");
        $("#addCustomer").show();
        $('#nameCus').ưval("");
        $('#phoneNumberCusAdd').val(value);
    } else {
        var i = CustomerPhoneNumber.indexOf(value);
        $('#nameCus').val(Customer[i].name);
    }
}
function closeAddCusForm() {
    var arr = new Array(0);
    var i =0;
    $('#table > tr').each(function () {
        var price =$(this).find('td:eq(3)').text();
        i++;
        arr.push(price);
    });
    console.log(arr);


    $('#nameCus_add').val("");
    $('#phoneNumberCusAdd').val("");
    $('#emailCusAdd').val("");
    $('.nav__add-customer').hide();
}
//tìm bàn trống trong khoảng đặt bàn
function searchTableBooking() {
   // var type =$('#type_add option:selected').val().trim();
    var idTimeBook = $('#time_add option:selected').val().trim();
    var date = $('#date_add').val().trim();

    $.ajax({
        url: "/searchTableBooking",
        type: "POST",
        dataType: "json",
        data:{
          "type":"",
          "idTimeBook":idTimeBook,
            "date":date

        },
        success: function (data) {
            $('#date_add').val(date);
            if (data.success == true) {

                var contentString = "";
                if(data.data.length == 0){
                    swal("Fail","Không còn bàn trống trong khoảng thời gian này","error");
                }
                else
                if (data.data != null) {
                    for (var i = 0; i < data.data.length; i++) {
                        var row = data.data[i];
                        if (row.description == null) {
                            var string = "";
                        } else string = row.description;
                        contentString = contentString
                            + '<tr id="row'+(row.id)+'" role="row" class="odd">'
                            + '<td>' + (i + 1) + '</td>'
                            + '<td id="idTable" style="display: none">' + row.id + '</td>'
                            + '<td>' + row.name + '</td>'
                            + '<td>' + row.type + '</td>'
                            + '<td>' + "" + '</td>'
                            + '<td>' +
                            '<button type="button" name="'+(row.id)+'" data-toggle="tooltip" title="Chọn" class="btn btn-info center-block mb-1" onclick="chooseTable(this.name)" style="padding:1px 1px 1px 1px; border-radius: 20px">Chọn</button></td>'
                            + '</tr>';
                    }
                }
                //  $("#soMonAn").html(data.data.length);
                $("#bang_tim_ban_booking").html(contentString);
            }
        }, error: function () {
            swal("Fail", "Không có dữ liệu", "error");
        }
    });
}
function chooseTable(name) {
    var temp = $('#idban_booking').text();
    $('#row'+temp).css({'background-color':'white'});
    $('#idban_booking').html(name);
    $('#row'+name).css({'background-color':'red'});
}
//Show user list
function showBookingTable() {
    $('.overlay_bang_mon_an').hide();
    $('.nav__add-booking').hide();
    $('.nav__edit-booking').hide();
    $.ajax({
        url: "/api/getAllBooking",
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


function showAddFormBooking() {
    $('#phoneNumberAdd').val("");
    $('#nameCus').val("");
    $('#idban_booking').html("");
    $("#bang_tim_ban_booking").empty();
    $('.overlay_bang_mon_an').show();
    $('.nav__add-booking').show();
}

function showAddFormCustomer() {
    $('.overlay_bang_mon_an').show();
    $('.nav__add-customer').show();


}

function checkin(){
    $('#bang_booking').find('tr').click(function () {
        var id = $(this).find('td').eq(1).text();
        swal({
                title: "Xác nhận !!!",
                text: "Bạn có xác nhận checkin hay không không ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Có",
                cancelButtonText: "Quay lại",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        url: "/checkinBooking",
                        type: "POST",
                        data: {
                            "idBooking": id
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

jQuery.validator.addMethod("checkChar", function (value, element, param) {
    return value.match(new RegExp("." + param + "$"));
});

// tìm kiếm booking  = sdt
$(function () {
    $("#form_search_booking").validate({
        submitHandler: function () {
            var phoneNumber = $("#phoneNumberSearch").val().trim();
            if (phoneNumber == "") {
                showBookingTable();

            } else {
                $.ajax({
                    url: "/searchBookingByPhoneNumber",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "phoneNumber": phoneNumber,
                    },
                    success: function (data) {

                        if(data.data.length == 0){
                            swal("Fail", "Không tìm thấy!!!", "warning");
                            showBookingTable();
                        }
                        else
                        if(data.success == true) {
                            swal("Thành công", "Tìm thành công", "success");
                            $('#phoneNumberSearch').val("");
                            showTable(data);
                        }
                        else {
                            swal("Lỗi",data.errorMessage,"warning");
                            $('#phoneNumberSearch').val("");
                            showBookingTable();
                        }

                    }, error: function (data) {
                        swal("Fail", data.responseText, "warning");
                    }
                });
            }
        }
    });
});


//thêm booking
$(function () {
    $("#add_form").validate({
        rules: {
            phoneNumberAdd: {
                required: true

            },
            nameCus: {
                required: true
            },
            // devices_add: {
            //     maxlength: 50
            // }
        },
        messages: {
            phoneNumberAdd: {
                required: "Vui lòng nhập số điện thoại",
            },
            nameCus:{
                required: "Vui lòng nhập thông tin khách hàng"
            }
        },
        submitHandler: function () {
            var cusPhone = $('#phoneNumberAdd').val().trim();
            var timebookid = $('#time_add option:selected').val();

            var idban = $('#idban_booking').text();
            var date =$('#date_add').val().trim();
            var cusname = $('#nameCus').val().trim();

            $.ajax({
                url: "/addBooking",
                type: "POST",
                data: {
                    "cusPhone": cusPhone,
                    "timebookid": timebookid,
                    "idban": idban,
                    "date": date
                },
                success: function (data) {
                    $('.nav__add-booking').hide();
                    if (data.success == true) {
                        swal("Thành công", data.data, "success");
                        showBookingTable();
                    } else {
                        swal("Lỗi", data.errorMessage, "warning");
                        showBookingTable();
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
                maxlength: "Vui lòng nhập nhỏ hơn 50 ký tự"
            }

        },
        submitHandler: function () {
            var name = $('#nameCus_add').val().trim();
            var phoneNumber = $('#phoneNumberCusAdd').val().trim();
            var email = $('#emailCusAdd').val().trim();
            if (CustomerPhoneNumber.includes(phoneNumber) == true) {
                swal("Fail", "Khách hàng đã tồn tại", "warning");
            } else
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
    $('.nav__add-booking').hide();
    //$('.nav__edit-dish').hide();

}

function showTable(data) {

    var contentString = "";
    if (data.data != null) {
        for (var i = 0; i < data.data.length; i++) {
            var row = data.data[i];
            if (row.description == null) {
                var string = "";
            } else string = row.description;

            var date = row.date.split("T");
            var datetime = date[0].split("-");
            var year = datetime[0];
            var month = datetime[1];
            var day = parseInt(datetime[2])+1;
            if(month<10) month = '0'+month;
            if(day<10) day = '0'+day;
            var time = day+"-"+month+"-"+year;
            var currentdate = new Date();
            var datenow = ((currentdate.getDate() < 10)?"0":"") + currentdate.getDate() +"-"+(((currentdate.getMonth()+1) < 10)?"0":"") + (currentdate.getMonth()+1) +"-"+ currentdate.getFullYear();
            if(datenow == time){
                var button = '<button  id=" btn'+row.id+'" data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="checkin()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>';
            }
            else var button ='<button disabled id=" btn'+row.id+'" data-toggle="tooltip" title="Update" class="btn btn-info center-block mb-1" onclick="checkin()" style="padding:1px 1px 1px 1px; border-radius: 20px"><i class="fa fa-edit"></i></button>';
            contentString = contentString
                + '<tr role="row" class="odd">'
                + '<td>' + (i + 1) + '</td>'
                + '<td id="idBooking" style="display: none">' + row.id + '</td>'
                + '<td id="idCustomer" style="display: none">' + row.customer.id + '</td>'
                + '<td>' + row.customer.name + '</td>'
                + '<td>' + row.customer.phoneNumber + '</td>'
                + '<td id="idTable" style="display: none">' + row.table.id + '</td>'
                + '<td>' + row.table.name + '</td>'
                + '<td>' + row.timeBook.startTime + ' - ' + row.timeBook.stopTime + '</td>'
                + '<td>' + time + '</td>'
                + '<td>' + string + '</td>'
                + '<td>' +
                button+
                '<a data-toggle="tooltip" title="Remove"><button onclick="deleteBooking()" class="btn btn-danger center-block" style="padding: 1px 1px 1px 1px; border-radius: 20px"><i class="icon-trash"></i></button></a></td>'
                + '</tr>';
            if(datenow == time){
                $('#btn'+row.id).prop('disabled', true);
            }
        }
    }
    //  $("#soMonAn").html(data.data.length);
    $("#bang_booking").html(contentString);
}

