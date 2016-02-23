
$(function(){
    data();
})

// 动态加载数据
function data() {
    $.ajax({
        url: 'http://api.xnnye.cn/money/index',
        type: 'get',
        dataType: "jsonp",
        success: function (datas) {
            if(datas) {
                var moneys = datas.data.money;
                var source = $("#data-template").html();
                var template = Handlebars.compile(source);
                console.log(moneys)
                Handlebars.registerHelper("foreach", function (datas, options) {
                    var templateWithInterpolatedData = "";
                    for (var i = 0; i < datas.length; i++) {
                        templateWithInterpolatedData += options.fn(datas[i]);
                    }
                    return templateWithInterpolatedData; //把所有的数据对象插入到模板后生成的html字符串返回。
                });
                var html = template(moneys);

                $(".list-data ul").empty().append(html);
            }
        }
    });
}