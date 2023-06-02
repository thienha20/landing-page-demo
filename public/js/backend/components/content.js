function excuseContent(child, element, ui) {
    let id = `tinymce-` + +Date.now() + $('.canvas>.child').length;

    let textarea = $(`<div id="parent-${id}">
                        <textarea class="tinymce" id="${id}"></textarea>
                      </div>
                      <div class="div-save-content">
                        <button type="button" class="btn btn-primary btn-save-content" onclick="saveContent('${id}')">
                            <span>
                                <i class="fa fa-floppy-o" aria-hidden="true"></i>
                            </span>
                        </button>
                       </div>`);
    child.html(`<i class="fa fa-tags banner-icon"></i>
                <h2 style="text-align: center">Content</h2>
                <div class='content' id="ct-${id}"></div>
                <button type="button" style="display: none" class="btn btn-contents btn-success edit-content-${id}" onclick="editContent('${id}')">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-success clone-content clone-content-${id}">
                    <i class="fa fa-copy"></i>
                </button>
                <button type="button" class="btn btn-danger delete-content delete-content-${id}" data-toggle="modal" data-target="#deleteContent-${id}">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
                <div class="modal" id="deleteContent-${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
                                <button type="button" class="modal-close close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure to delete this content?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Exit</button>
                                <button type="button" class="btn btn-danger" onclick="deleteContent('${id}')">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

                <input type="hidden" class="block-data" name="content-${id}" id="data-content-${id}" >
                         `);
    child.append(textarea);
    if($(element).find('.child').length === 0){
        $(element).append(child);
    }else {
        if ($(element).find('.child').last().position().top < ui.position.top) {
            $(element).append(child);
        } else {
            if($(this).parents('.canvas').length === 0)
                $(element).find('.child').each(function () {
                    let ps = $(this).position().top;
                    if (ps > ui.position.top) {
                        $(child).insertBefore(this);
                        return false;
                    }
                });
        }
    }

    //extend
    tinyMCE.execCommand('mceAddEditor', false, id);
    // $(".canvas").css("width", "auto");
}

function saveContent(idTinymce) {
    let ct = tinyMCE.get(`${idTinymce}`).getContent();
    let content = $('<div>' + ct + '</div>');
    content.find('a').each( function() {
        $(this).attr("onclick", "if(top){ top.location.href='" + $(this).attr("href") + "' }");
    });
    ct = content.html();
    $(`#ct-${idTinymce}`).html(ct);
    $(`.edit-content-${idTinymce}`).show();
    $(`.delete-content-${idTinymce}`).show();
    $(`#ct-${idTinymce}`).show();
    $(`#parent-${idTinymce}`).hide();
    $(`#parent-${idTinymce}`).next().hide();
    $(`#data-content-${idTinymce}`).val(JSON.stringify({
        type: "content",
        description: ct
    }));
}

function editContent(idTinymce) {
    $(`.edit-content-${idTinymce}`).hide();
    $(`#ct-${idTinymce}`).hide();
    $(`#parent-${idTinymce}`).show();
    $(`#parent-${idTinymce}`).next().show();
    $(`.delete-content-${idTinymce}`).hide();
}

function deleteContent(idTinymce) {
    $(`#parent-${idTinymce}`).parents('div.child').remove();
    $('.modal-backdrop').remove();
    $('#deleteProducts-'+idTinymce).modal('hide');
    $('body').removeClass('modal-open');
    $('body').removeAttr('style');
}

function zoomContent(idTinymce, el) {
    $(`#parent-${idTinymce}`).parents('div.child').addClass('full-width-product');
    $(el).hide();
    $(`.thumb-content-${idTinymce}`).show();
    $(`.delete-content-${idTinymce}`).hide();
}

function thumbContent(idTinymce, el) {
    $(`#parent-${idTinymce}`).parents('div.child').removeClass('full-width-product');
    $(el).hide();
    $(`.zoom-content-${idTinymce}`).show();
    $(`.delete-content-${idTinymce}`).show();
}

function collapseContent(idTinymce, el) {
    $(`#parent-${idTinymce}`).parents('div.child').animate({height: '310px'}, {duration: 500});
    $(el).hide();
    $(`.expand-content-${idTinymce}`).show();

}

function expandContent(idTinymce, el) {
    $(`#parent-${idTinymce}`).parents('div.child')
    $(`#parent-${idTinymce}`).parents('div.child').removeAttr('style').addClass('height-auto', {duration: 500});
    $(el).hide();
    $(`.collapse-content-${idTinymce}`).show();
}
