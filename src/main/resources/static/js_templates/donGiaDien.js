jQuery.validator.addMethod("checkChar", function (value, element, param) {
    return value.match(new RegExp("." + param + "$"));
});

function showUpdateModal(idDonGia) {
    // $('#bang_don_gia_dien').find('tr').click(function () {
    //     var idDonGia = $(this).find('td').eq(1).text();
    $("#ID_donGia_update").html(idDonGia);
    // });
}

function showDonGia() {
    $.ajax({
        url: "/danh-sach-don-gia",
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data)
            var contentString;
            for (var i = 0; i < data.length; i++) {
                var index = i + 1;
                contentString = contentString
                    + '<tr role="row" class="odd">'
                    + '<td style="padding: 0 0 0 25px">' + index + '</td>'
                    + '<td style="padding: 0 0 0 0"><label id="gia" readonly>' + data[i][1] + '</label></td>'
                    + '<td style="padding: 6px 0 0 0"><label id="ghiChu" readonly>' + data[i][2] + '</label></td>'
                    + '<td style="padding: 0 0 0 0"><a data-toggle="tooltip" title="Update"><button data-toggle="modal" data-target="#updateModal" class="btn btn-info center-block ml-1" onclick="showUpdateModal(' + data[i][0] + ')" style="padding: 3px 6px 3px 6px; border-radius: 54%;"><i class="icon-pencil"></i></button></a>' +
                    '<a data-toggle="tooltip" title="Remove"><button  onclick="deleteDonGia(' + data[i][0] + ')" class="btn btn-danger center-block ml-1" style="padding: 3px 6px 3px 6px; border-radius: 54%;"><i class="icon-trash"></i></button></a></td>'
                    + '</tr>';
            }
            $("#bang_don_gia_dien").html(contentString);
        }, error: function () {
            alert("FAIL!");
        }
    });
}

//Thêm đơn giá
$(function () {
    $("#add_form").validate({
        rules: {
            addGia_input: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages: {
            addGia_input: {
                required: "Vui lòng nhập đơn giá",
                digits: "Đơn giá kí tự 0->9",
                minlength: "Đơn giá có 4 chữ số",
                maxlength: "Đơn giá có 4 chữ số"
            }
        },
        submitHandler: function () {
            var gia = $('#addGia_input').val().trim();
            var ghiChu = $("#addGhiChu_select option:selected").text().trim();
            if (gia == "0000") {
                swal("Fail", "Mã giá không được bằng 0", "warning");
            } else {
                $.ajax({
                    url: "/them-don-gia",
                    type: "POST",
                    data: {
                        "gia": gia,
                        "ghiChu": ghiChu
                    },
                    success: function (data) {
                        swal("Done", data, "success");
                        showDonGia();
                        $('#addGia_input').val('');
                    },
                    error: function (data) {
                        swal("Fail", data.responseText, "warning");
                    }
                });
            }
        }
    });
})

//Sửa đơn giá
$(function () {
    $("#edit_form").validate({
        rules: {
            gia_update: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages: {
            gia_update: {
                required: "Vui lòng nhập đơn giá",
                digits: "Đơn giá kí tự 0->9",
                minlength: "Đơn giá có 4 chữ số",
                maxlength: "Đơn giá có 4 chữ số"
            }
        },
        submitHandler: function () {
            var idDonGia = $("#ID_donGia_update").text();
            var giaMoi = $("#gia_update").val();
            if (giaMoi == "0000") {
                swal("Fail", "Mã giá không được bằng 0", "warning");
            } else {
                $.ajax({
                    url: "/cap-nhat-don-gia",
                    type: "POST",
                    data: {
                        "idDonGia": idDonGia,
                        "giaMoi": giaMoi
                    },
                    success: function (data) {
                        $('#updateModal').modal('hide');
                        swal("Done", data, "success");
                        showDonGia();
                        $('#gia_update').val('');
                    },
                    error: function (data) {
                        swal("Fail", data.responseText, "warning");
                    }
                });
            }
        }
    });
})

function deleteDonGia(idDonGia) {
    swal({
            title: "Are you sure?",
            text: "Do you want to delete?",
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
                    url: "/xoa-don-gia",
                    type: "POST",
                    data: {
                        "idDonGia": idDonGia
                    },
                    success: function (data) {
                        swal("Done", data, "success");
                        showDonGia();
                    }, error: function () {
                        swal("Fail", "Không xóa được", "warning");
                    }
                });
            }
        });
}
