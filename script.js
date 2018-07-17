$(document).ready(function(){
    var page = $("#page");
    var type = $("#type");
    var container = $("#container");
    var category = $("a.dropdown-toggle");
    var t = null;
    page.val(1);
    type.val(0);

    $.ajax({
        url:    "parser.php",
        type: "GET",
        dataType: "xml",
        data:{
            type: type.val()
        },
        success: function (result) {
            type.val(result.getElementsByTagName("type")[0].innerHTML);
            page.val(result.getElementsByTagName("page")[0].innerHTML);

            container.empty();

            renderPG(result.getElementsByTagName("page")[0].innerHTML, result.getElementsByTagName("pages")[0].innerHTML, container);
            renderFeed(result, container);
            renderPG(result.getElementsByTagName("page")[0].innerHTML, result.getElementsByTagName("pages")[0].innerHTML, container);

            category.html($("#sel a[name="+type.val()+"]").text() + "<span class=\"caret\"></span>");
        },
        error: function (result){
            container.text("FAILED TO LOAD NEWS");
        }
    });

    $(document).on("click","#sel a",function(){
        t = $(this).attr("name");
        page.val(1);
        type.val(t);

        $.ajax({
            url:    "parser.php",
            type: "GET",
            dataType: "xml",
            data:{
                type: type.val()
                },
            success: function (result) {
                type.val(result.getElementsByTagName("type")[0].innerHTML);
                page.val(result.getElementsByTagName("page")[0].innerHTML);

                container.empty();

                renderPG(result.getElementsByTagName("page")[0].innerHTML, result.getElementsByTagName("pages")[0].innerHTML, container);
                renderFeed(result, container);
                renderPG(result.getElementsByTagName("page")[0].innerHTML, result.getElementsByTagName("pages")[0].innerHTML, container);

                category.html($("#sel a[name="+type.val()+"]").text() + "<span class=\"caret\"></span>");
            },
            error: function (result){
                //console.log(result);
                container.text("FAILED TO LOAD NEWS");
            }
        });
    });

    $(document).on("click","#pg a", function(){
        $("li.active").removeClass('active');
        $(this).parent().addClass('active');
        $.ajax({
            url: "parser.php",
            dataType: "xml",
            data: {
                type: type.val(),
                page: $(this).attr("name")
            },
            success: function(result){
                console.log(result);
                page.val(result.getElementsByTagName("page")[0].innerHTML);

                container.empty();

                renderPG(result.getElementsByTagName("page")[0].innerHTML, result.getElementsByTagName("pages")[0].innerHTML, container);
                renderFeed(result,container);
                renderPG(result.getElementsByTagName("page")[0].innerHTML, result.getElementsByTagName("pages")[0].innerHTML, container);
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            },
            error: function(){
                container.text("FAILED TO LOAD NEWS");
            }
        });
    });

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function renderPG(page, count, destination){
        var ul = "<div class='text-center'>";
        ul += "<ul class='pagination' id='pg'>";
        for(var i = 1; i <= count; i++){
            var act = (page == i)? "class='active'" : "";
            ul += "<li "+ act +"><a href='javascript:void(0)' name="+ i +">"+ i + "</a></li>";
        }
        ul += "</ul></div>";
        destination.append(ul);
    }

    function renderFeed(result, destination){
        //$(".feed").empty();
        var cnt = result.getElementsByTagName("item").length;

        for(var i = 0; i < cnt; i++){
            var div = "<div class=\"row\"><div class='box'><div class='header'>";
            div += "<a target='_blank' href="+ decodeURIComponent(result.getElementsByTagName("link")[i].innerHTML) +">";
            div += result.getElementsByTagName("title")[i].innerHTML + "</a><br>";
            div += "Date published: " + result.getElementsByTagName("pubDate")[i].innerHTML + "</div>";
            div += "<div class='body'>" + decodeHtml(result.getElementsByTagName("description")[i].innerHTML) + "</div></div>";
            //console.log(decodeHtml(result.getElementsByTagName("description")[i].innerHTML));
            div += "</div>";

            destination.append(div);

            $(".body img").removeAttr("style");
            $(".body img").addClass("img-rounded img-responsive");
        }
    }
});