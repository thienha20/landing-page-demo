import $ from "jquery";

export function excuseContent(child, element){
    let id = `tinymce-` + $('.canvas>.child').length;
    let textarea = $(`<div id="parent-${id}"><textarea class="tinymce" id="${id}"></textarea></div><input type="button" class="btn btn-primary" onclick="saveContent('${id}')" value="save">`);
    child.html(`<div class='content' id="ct-${id}"></div><button type="button" style="display: none" class="btn btn-success edit-content-${id}" onclick="editContent('${id}')">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"/>
                                  <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                            </button>
                            <button type="button" style="display: none" class="btn btn-danger delete-content delete-content-${id}" onclick="deleteContent('${id}')">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                            <input type="hidden" class="block-data" name="content-${id}" id="data-content-${id}" >
                         `);
    child.append(textarea);
    $(element).append(child);
    tinyMCE.execCommand('mceAddEditor', false, id);
    $(".canvas").css("width", "auto");
}

export  function saveContent(idTinymce) {
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

export function editContent(idTinymce){
    $(`.edit-content-${idTinymce}`).hide();
    $(`#ct-${idTinymce}`).hide();
    $(`#parent-${idTinymce}`).show();
    $(`#parent-${idTinymce}`).next().show();
    $(`.delete-content-${idTinymce}`).hide();
}

export function deleteContent(idTinymce){
    $(`#parent-${idTinymce}`).parents('div.child').remove();
}

