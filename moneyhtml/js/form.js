var iAccount = 0,   // 账户
    iMember = 1,    // 成员
    iCate_id = 0;
$(function () {
    selectIndexAccount(iAccount);
    selectIndexMember(iMember);

    cate();

    // 选择收入还是支出
    $(".container .a").on("click", function () {
        $(".container .a").each(function () {
            $(this).removeClass("true");
        });
        $(this).addClass("true");
        cate();
    });


    $(".formSelect").on("click", function () {
        hideSelect();
        bgShow();
        $("." + $(this).data("select")).show();
    });
    $(".formSelect1").on("click", function () {
        hideSelect();
        bgShow();
        $(".input-content").show();
    });

    // 选择账户
    $(".account ul li").on("click", function () {
        selectIndexAccount($(this).data("value"));
        bgHide();
        hideSelect();
        $(".select-account").text($(this).find(".a-span1").text());
    });
    //选择成员
    $(".member ul li").on("click", function () {
        selectIndexMember($(this).data("value"));
        $(".member-ok").on("click", function () {
            bgHide();
            hideSelect();
            $(".select-member").text($(".member").find(".select-true").text());
        });
    });




    $(".button20").on("click", function () {
        var cid = parseInt($(".container .true").data("type"));  // 收入支出
        var money = parseFloat($(".form-price").text());            // 钱
        var desc = $(".input-content").val();
        if (iAccount == 0) {
            alert("请选择账户类型");
        } else if (cid != 0 && cid != 1) {
            alert("类型错误");
        } else if (iCate_id == 0) {
            alert("选择类别");
        } else if (money == 0) {
            alert("选择金额");
        }else{
            $.ajax({
                url: 'http://api.xnnye.cn/money/insert',
                data: {cid: cid, cate_id: iCate_id, money: money, account: iAccount, member: iMember, desc: desc},
                type: 'get',
                dataType: "jsonp",
                success: function (data) {
                    alert(data.data);
                    window.location.reload();
                }
            });
        }
    })
});

// 动态加载类别
function cate() {
    var cid = parseInt($(".container .true").data("type"));  // 收入支出
    $.ajax({
        url: 'http://api.xnnye.cn/money/cate/' + cid,
        type: 'get',
        dataType: "jsonp",
        success: function (datas) {
            if(datas) {
                var cates = datas.data;
                var source = $("#cate-template").html();
                var template = Handlebars.compile(source);
                Handlebars.registerHelper("foreach", function (cates, options) {
                    var templateWithInterpolatedData = "";
                    for (var i = 0; i < cates.length; i++) {
                        templateWithInterpolatedData += options.fn(cates[i]);
                    }
                    return templateWithInterpolatedData; //把所有的数据对象插入到模板后生成的html字符串返回。
                });
                var html = template(cates);
                $(".list-type ul").empty().append(html);
                iCate_id = cates[0].cate_id;
                $(".form-name").text(cates[0].cate_name)
                // 点击类别
                $(".list-type ul li").on("click", function () {
                    iCate_id = $(this).data("cate_id");
                    $(".form-icon img").attr("src", $(this).children("img").attr("src"))
                    $(".form-name").text($(this).children("span").text())
                });
            }
        }
    });
}


function bgShow() {
    $(".make-bg").remove();
    $("body").append('<div class="make-bg"></div>');
    $(".make-bg").on("click", function () {
        bgHide();
        hideSelect();
    });
}
function bgHide() {
    $(".make-bg").remove();
}

function hideSelect() {
    $(".input-content").hide();
    $(".account").hide();
    $(".member").hide();
}

function selectIndexAccount(i) {
    iAccount = i;
    $(".account ul li").each(function () {
        $(this).removeClass("select-true");
        if ($(this).data("value") == i) {
            $(this).addClass("select-true");
        }
    });
}

function selectIndexMember(i) {
    iMember = i;
    $(".member ul li").each(function () {
        $(this).removeClass("select-true");
        if ($(this).data("value") == i) {
            $(this).addClass("select-true");
        }
    });
}





