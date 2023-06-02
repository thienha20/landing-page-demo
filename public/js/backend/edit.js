
$(document).ready(function () {
    $(".btn-modal-show").click(function () {
        $(this).hide();
    });
    // $('.create-landingpage-bt').click(function () {
    //     $(".btn-modal-show").hide();
    // });
    $(".canvas").css("width", "auto");
    $(".navbar-landingpage").removeClass("d-none");
    $(".navbar-landingpage").animate({
        right: '0'
    });
    $(".make-landingpage ").hide();
    $(".save-landingpage ").show();
    $(".close-landingpage ").show();
    if($(".parent-column").height() > 500){
        $(".parent-column").css('height','500px');
        $(".parent-column").css('overflow','scroll');
    }

    $(".add-element").draggable({
        //  use a helper-clone that is append to "body" so is not "contained" by a pane
        helper: function () {
            return $(this).clone().removeClass("add-element").appendTo(".canvas").css({
                "zIndex": 5
            }).show();
        },
        cursor: "move",
        containment: "document"
    });

    $(".canvas, .canvas *").droppable({
        accept: ".add-element",
        drop: function (event, ui) {
            if (!ui.draggable.hasClass("dropped")) {
                let child = $(`<div class="child"></div>`);
                let elementDrag = $(ui.draggable).clone()
                let componentType = $(elementDrag).data("componentType");
                switch (componentType) {
                    case "content":
                        excuseContent(child, this);
                        break;
                    case "product":
                        excuseProduct(child, this);
                        break;
                    case "banners":
                        excuseBanner(child, this);
                        break;
                    case "menu":
                        excuseMenu(child, this);
                        break;
                    default:
                        child.append(elementDrag.removeClass("ui-draggable").removeClass("dropped"))
                        $(this).append(child);
                        $(".canvas").css("width", "auto");
                }

            }
        }
    }).sortable({
        placeholder: "sort-placer",
        cursor: "move",
        helper: function (evt, ui) {
            return $(ui).clone().appendTo(".canvas").show();

        }
    });

    window.saveTemplate = function(){
        let objdata = [];
        let landingPageId = $("#LandingPageId").val();
        let floor = -1;
        console.log($("#LandingPageId").val());
        $( ".child" ).each(function( index, element ) {
            let obj = $(element).find('.block-data').val();
            if(obj){
                objdata.push(JSON.parse(obj));
            }else{
                floor = index;
                objdata = [];
                return false;
            }
        });
        if (objdata.length > 0){
            objdata = JSON.stringify(objdata);
            console.log(JSON.stringify(objdata));
            //call api update
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                }
            });
            var type = "POST";
            var ajaxurl = 'insertComponent';
            $.ajax({
                type: type,
                url: ajaxurl,
                data: {
                    "component":objdata,
                    "landingPageId": landingPageId,
                },
                dataType: 'json',
                success: function (data) {
                    if(data.status == 'success'){
                        $(".close-landingpage").delay(2000).click();
                        alert('Cập nhật landing page thành công')
                        $(".btn-modal-show").delay(2000).click();
                    }else{
                        alert(data.erro);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }else alert(`Tầng ${floor} Chưa nhập dữ liệu. Vui lòng nhập đầy đủ thông tin`);
    }
    window.makeLandingPage = function () {
        // call ajax create landingpage
        let slug = $("#slugLandingPage").val();
        let name = $("#nameLandingPage").val();
        let useForPage = $("#useforpage").val();
        let startTime = $("#start-lp>input").val() + ' ' + $(".start-hour-lp").val()+ ' ' + $(".start-minute-lp").val();
        let endTime = $("#end-lp>input").val()+ ' ' + $(".end-hour-lp").val()+ ' ' + $(".end-minute-lp").val();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        var type = "POST";
        var ajaxurl = 'insertLandingPage';
        $.ajax({
            type: type,
            url: ajaxurl,
            data: {
                "slug":slug,
                "name": name,
                "use_for_page": useForPage,
                "start_time": startTime,
                "end_time": endTime
            },
            dataType: 'json',
            success: function (data) {
                if(data.id){
                    $("#LandingPageId").val(data.id);
                    console.log($("#LandingPageId").val());
                    $(".navbar-landingpage").removeClass("d-none");
                    $(".navbar-landingpage").animate({
                        right: '0'
                    });
                    $(".make-landingpage ").hide();
                    $(".save-landingpage ").show();
                    $(".close-landingpage ").show();
                    $(".close-modal-landingpage").click();
                    $(".btn-modal-show").hide();
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
        // end call ajax

    };
    $(".close-landingpage ").click(function () {
        $(".navbar-landingpage").animate({
            right: '-310px'
        });
        $(".close-landingpage ").hide();
        $(".make-landingpage ").show();
        $(".save-landingpage ").hide();
        $(".child").remove();
        $(".canvas").css("width","100%");
        $(".btn-modal-show").show();
    });

    window.removeVietnameseTones = function(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
        str = str.replace(/đ/g,"d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g," ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        str = convertToSlug(str);
        return str;
    }

    window.convertToSlug = function(str)
    {
        var $slug = '';
        var trimmed = $.trim(str);
        $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
        replace(/-+/g, '-').
        replace(/^-|-$/g, '');
        return $slug.toLowerCase();
    }
    $("#nameLandingPage").keyup(function() {
        let nameVl = $("#nameLandingPage").val();
        let slug = removeVietnameseTones(nameVl);
        $("#slugLandingPage").val(slug);
    });
});
