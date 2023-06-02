import $ from 'jquery';
import 'jquery/src/jquery'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/sortable';
import './bootstrap';
import  'select2/dist/js/select2';
import './components/dragdropproduct';
import {excuseContent, saveContent, editContent, deleteContent} from './components/content';
import {excuseProduct} from './components/product';
import  {excuseBanner} from './components/banner';
import  {excuseMenu} from './components/menu';
$(document).ready(function () {

    window.saveContent =  saveContent
    window.editContent =  editContent
    window.deleteContent =  deleteContent

    $(".canvas").on("click", ".remove-product", function () {
        alert("Handler for .click() called.");
    });

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
        $( ".child" ).each(function( index, element ) {
            let obj = $(element).find('.block-data').val();
            objdata.push(JSON.parse(obj));
        });
        console.log(JSON.stringify(objdata));
    }

    $(".make-landingpage ").click(function () {
        $(".navbar").removeClass("d-none");
        $(".navbar").animate({
            right: '0'
        });
        $(".make-landingpage ").hide();
        $(".save-landingpage ").show();
        $(".close-landingpage ").show();
    });
    $(".close-landingpage ").click(function () {
        $(".navbar").animate({
            right: '-310px'
        });
        $(".close-landingpage ").hide();
        $(".make-landingpage ").show();
        $(".save-landingpage ").hide();
        $(".child").remove();
        $(".canvas").css("width","100%");
    });

});
