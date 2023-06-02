$(document).ready(function () {
    $(".btn-modal-show").click(function () {
        $(this).hide();
    });
    // $(`#nestable`).hover(function () {
    //     $(".canvas").addClass('canvas1');
    //     $(".canvas1").removeClass("canvas");
    // }, function () {
    //     $(".canvas1").addClass('canvas');
    // });
    // $(".canvas").css("width", "auto");
    $(".navbar-landingpage").removeClass("d-none");
    $(".navbar-landingpage").animate({
        right: '0'
    });
    $(".save-landingpage ").show();
    $(".close-landingpage ").show();
    $(".add-element").draggable({
        //  use a helper-clone that is append to "body" so is not "contained" by a pane
        helper: function () {
            return $(this).clone().removeClass("add-element").appendTo(".canvas").css({
                "zIndex": 5,
                "border": "1px solid black",
                "padding": "5px",
            }).show();
        },
        cursorAt: {top: -63, left: 0},
        containment: "document"
    });

    $(".canvas").droppable({
        drop: function (event, ui) {

            // console.log(event);
            if (!ui.draggable.hasClass("dropped")) {
                let child = $(`<div class="child"></div>`);
                let elementDrag = $(ui.draggable).clone()
                let componentType = $(elementDrag).data("componentType");
                switch (componentType) {
                    case "content":
                        excuseContent(child, this, ui);
                        break;
                    case "product":
                        excuseProduct(child, this, ui);
                        break;
                    case "banners":
                        excuseBanner(child, this, ui);
                        break;
                    case "menu":
                        excuseMenu(child, this, ui);
                        break;
                    // default:
                    //     child.append(elementDrag.removeClass("ui-draggable").removeClass("dropped"))
                    //     $(this).append(child);
                    // $(".canvas").css("width", "auto");
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

    window.saveTemplate = function () {
        let objdata = [];
        let landingPageId = $("#LandingPageId").val();
        let floor = -1;
        $(".child").each(function (index, element) {
            let obj = $(element).find('.block-data').val();
            if (obj) {
                objdata.push(JSON.parse(obj));
            } else {
                floor = index;
                objdata = [];
                return false;
            }
        });
        if (objdata.length > 0) {
            objdata = JSON.stringify(objdata);
            console.log(JSON.stringify(objdata));
            //call api update
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                }
            });
            var type = "POST";
            var ajaxurl = $('#url-insert').attr('url');
            $.ajax({
                type: type,
                url: ajaxurl,
                data: {
                    "component": objdata,
                    "landingPageId": landingPageId,
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == 'success') {
                        $(".close-landingpage").delay(2000).click();
                        alert('Cập nhật landing page thành công')
                    } else {
                        alert(data.erro);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        } else alert(`Tầng ${floor} chưa nhập dữ liệu. Vui lòng nhập đầy đủ thông tin`);
    }

    // window.makeLandingPage = function () {
    //     // call ajax create landingpage
    //     let slug = $("#slugLandingPage").val();
    //     let name = $("#nameLandingPage").val();
    //     let useForPage = $("#useforpage").val();
    //     let startTime = $("#start-lp>input").val() + ' ' + $(".start-hour-lp").val()+ ' ' + $(".start-minute-lp").val();
    //     let endTime = $("#end-lp>input").val()+ ' ' + $(".end-hour-lp").val()+ ' ' + $(".end-minute-lp").val();
    //     $.ajaxSetup({
    //         headers: {
    //             'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
    //         }
    //     });
    //     var type = "POST";
    //     var ajaxurl = 'insertLandingPage';
    //     $.ajax({
    //         type: type,
    //         url: ajaxurl,
    //         data: {
    //             "slug":slug,
    //             "name": name,
    //             "use_for_page": useForPage,
    //             "start_time": startTime,
    //             "end_time": endTime
    //         },
    //         dataType: 'json',
    //         success: function (data) {
    //             if(data.id){
    //                 $("#LandingPageId").val(data.id);
    //                 console.log($("#LandingPageId").val());
    //                 $(".navbar-landingpage").removeClass("d-none");
    //                 $(".navbar-landingpage").animate({
    //                     right: '0'
    //                 });
    //                 $(".make-landingpage ").hide();
    //                 $(".save-landingpage ").show();
    //                 $(".close-landingpage ").show();
    //             }
    //         },
    //         error: function (data) {
    //             console.log(data);
    //         }
    //     });
    //     // end call ajax
    //
    // };
    // $(".close-landingpage ").click(function () {
    //     $(".navbar-landingpage").animate({
    //         right: '-310px'
    //     });
    //     $(".close-landingpage ").hide();
    //     $(".make-landingpage ").show();
    //     $(".save-landingpage ").hide();
    //     $(".child").remove();
    //     $(".canvas").css("width","100%");
    //     $(".btn-modal-show").show();
    // });
    addToMenu();
});

$(document).ready(function () {
    $(".clone-content").click(function (e) {
        let cloneContent = $(this).parents('.child').clone();
        $(cloneContent).insertAfter($(this).parents('.child'));
    })
})
