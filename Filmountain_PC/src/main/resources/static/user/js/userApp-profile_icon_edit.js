$(document).ready(function () {
    $("#update_user_icon_confirm").click(function () {
		 var activeSlide = $(".swiper-slide-active");
        var profileIcon_id = activeSlide.attr("id");
        var user_id = $("#user_id").val();
        $.ajax({
            type: "POST",
            url: "/user/user_profile_icon_edit",
             contentType: 'application/json',
            data:  JSON.stringify({
                profileIcon_id: profileIcon_id,
                user_id: user_id
            }),
           success: function(data) {
                $('#completionModal').modal('show');
            },
            error: function (error) {
                // Handle error response
                console.error("Error updating password", error);
            }
        });
    });
    $('#completionModal').on('hidden.bs.modal', function (e) {
            window.location.href = "/user/index";
    }); 
});
