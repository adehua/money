onclick="window.location.href='form.html'"

$(".wHref").click(function(){
    window.location.href = $(this).data("href");
})