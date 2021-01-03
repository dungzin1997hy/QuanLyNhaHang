function changePasswordForm() {
    $('#old_password').val("");
    $('#new_password').val("");
    $('#new_password_re').val("");
    $('#changePassword_nav').show();

}


function changePassword() {
    var old_password = $('#old_password').val().trim();
    var new_password =$('#new_password').val().trim();
    var new_password_re = $('#new_password_re').val().trim();
    if(new_password!= new_password_re){
        $('#errorMessage').html("Mật khẩu mới phải trùng nhau");
        $('#errorMessage').show();
    }
    else{
        var id = $('#id_current_user').text();
        console.log(id);
        $.ajax({
            url:"/user/changePassword",
            dataType:"json",
            type:"POST",
            data:{
                "idUser":id,
                "newPassword":new_password,
                "oldPassword":old_password
            },
            success:function (data) {
                console.log(data);
                if(data.success == true) {
                    swal("Xong", data.data, "success");
                    $('#changePassword_nav').hide();
                    $('#errorMessage').hide();
                }
                else swal("Lỗi",data.errorMessage,"error");
                $('#errorMessage').prop('disabled',true);
            },
            error:function (data) {
                swal("Lỗi", "Không đổi được mật khẩu", "error");
            }
        })
    }
}