import $ from "jquery";

export function excuseBanner(child, element) {
    let bannerId = $('.canvas>.child').length;
    let bannerLayout = `
         <div class="row">
         <div class="col-md-4">
              <form class="form-inline" id="banner-add-${bannerId}">
                <h3>Add banner </h3>
                <div class="form-group">
                  <label for="addInputImage" class="label-banner">Link image</label>
                  <input type="text" class="form-control" id="addInputImage-${bannerId}" placeholder="link image" required>
                </div>
                <div>&nbsp;</div>
                <div class="form-group">
                  <label for="addInputUrl" class="label-banner">Link redirect</label>
                  <input type="text" class="form-control" id="addInputUrl-${bannerId}" placeholder="link redirect image" required>
                </div>
                <div class="form-group">
                  <label for="addInputTitle" class="label-banner">Title &nbsp;</label>
                  <input type="text" class="form-control" id="addInputTitle-${bannerId}" placeholder="Title image" required>
                </div>
                            <div>&nbsp;</div>
                <button class="btn btn-primary" id="addButton-${bannerId}"> <i class="fa fa-plus-circle" aria-hidden="true"></i> Add Item</button>
              </form>
              <form class="" id="banner-editor-${bannerId}" style="display: none;">
                <h3>Editing <span id="currentEditName-${bannerId}"></span></h3>
                <div class="form-group">
                  <label for="addInputImage" class="label-banner">link image</label>
                  <input type="text" class="form-control" id="editInputName-${bannerId}" placeholder="link image" required>
                </div>
               <div class="form-group">
                  <label for="addInputTitle" class="label-banner">Link redirect &nbsp;</label>
                  <input type="text" class="form-control" id="editInputUrl-${bannerId}" placeholder="link redirect image" required>
                </div>
                <div class="form-group">
                  <label for="addInputTitle" class="label-banner">Title</label>
                  <input type="text" class="form-control" id="editInputTitle-${bannerId}" placeholder="Title image">
                </div>
                <div>&nbsp;</div>
                <button class="btn btn-info" onclick="editBannerItem(${bannerId},this)" id="editButton-${bannerId}">Edit</button>
              </form>
        </div>
        <div class="col-md-8">
          <h3>Banner</h3>
          <div class="dd nestable-${bannerId}" id="nestable-${bannerId}">
            <input type="hidden" class="block-data" name="data-banner-${bannerId}" id="data-banner-${bannerId}" >
            <ul class="dd-list-${bannerId}">

            </ul>
          </div>
        </div>
      </div>
    `;
    child.html(`<div class='banner' id="banner-${bannerId}"></div>`);
    child.append(bannerLayout);
    $(element).append(child);
    $(".canvas").css("width", "auto");
    let nestableList = $(`#nestable-${bannerId} > .dd-list-${bannerId}`);
    $(`#banner-add-${bannerId}`).submit(function (e) {
        e.preventDefault();
        addToBanner(nestableList, bannerId);
    });
    $(`.dd-list-${bannerId}`).hover(function () {
        $(".canvas").addClass('canvas1');
        $(".canvas1").removeClass("canvas");
    }, function () {
        $(".canvas1").addClass('canvas');
    });

}

let newIdCount = 1;
var addToBanner = function (nestableList, bannerId) {
    let newImage = $(`#addInputImage-${bannerId}`).val();
    let newUrl = $(`#addInputUrl-${bannerId}`).val();
    let newTitle = $(`#addInputTitle-${bannerId}`).val();
    let newId = 'new-' + newIdCount;
    nestableList.append(
        '<li class="dd-item" ' +
        'data-id="' + newId + '" ' +
        'data-image="' + newImage + '" ' +
        'data-url="' + newUrl + '" ' +
        'data-title="' + newTitle + '" ' +
        'data-new="1" ' +
        'data-deleted="0">' +
        '<div class="dd-handle"><a href="' + newUrl + '"><img class="img-thumb" src='+ newImage +' />' + newTitle + '</a></div> ' +
        '<span onclick="deleteFromBanner('+bannerId+',this)" class="button-delete btn btn-danger btn-xs pull-right" ' +
        'data-owner-id="' + newId + '"> ' +
        '<i class="fa fa-times" aria-hidden="true"></i> ' +
        '</span>' +
        '<span onclick="prepareEditBanner(' + bannerId + ',this)" class="button-edit btn btn-success btn-xs pull-right" ' +
        'data-owner-id="' + newId + '">' +
        '<i class="fa fa-pencil" aria-hidden="true"></i>' +
        '</span>' +
        '</li>'
    );
    // add banner into list object banner
    let dataHidden = $(`#data-banner-${bannerId}`).val();
    let dataBanner = {
        type: "banner",
        bannerInRows: 3,
        data: []
    }
    if (dataHidden !== "") {
        dataBanner = JSON.parse(dataHidden);
    }
    let obj = {
        id: newId,
        title: newTitle,
        link_img: newImage,
        link_website: newUrl
    }
    dataBanner.data.push(obj)
    $(`#data-banner-${bannerId}`).val(JSON.stringify(dataBanner));
    newIdCount++;
    $(`.dd-list-${bannerId}`).sortable({
        update: function (event, ui) {
            let dataTemp = [];
            let hiddenTag = $(this).prev();
            let jsonData = JSON.parse(hiddenTag.val())
            $(this).children("li").each(function () {
                jsonData.data.map(d => {
                    if (d.id == $(this).data("id")) {
                        dataTemp.push(d)
                    }
                })
            });
            jsonData.data = dataTemp;
            hiddenTag.val(JSON.stringify(jsonData))
        }
    });

};


/*************** Delete ***************/

window.deleteFromBanner = function (bannerId,el) {
    var targetId = $(el).data('owner-id');
    $(el).parent("li").remove();
    let dataBannerUpdate = JSON.parse($(`#data-banner-${bannerId}`).val());
    let objBanner = dataBannerUpdate.data;
    let newObj = objBanner.map(item => {
        if(item.id === targetId){
            item={};
        }
        return item
    });
    dataBannerUpdate.data = newObj;
    $(`#data-banner-${bannerId}`).val(JSON.stringify(dataBannerUpdate));
};

/***************************************/


/*************** Edit ***************/

// Prepares and shows the Edit Form
window.prepareEditBanner = function (bannerId,el) {
    let bannerEditor = $(`#banner-editor-${bannerId}`);
    let editButton = $(`#editButton-${bannerId}`);
    let editInputName = $(`#editInputName-${bannerId}`);
    let editInputUrl = $(`#editInputUrl-${bannerId}`);
    let editInputTitle = $(`#editInputTitle-${bannerId}`);
    let currentEditName = $(`#currentEditName-${bannerId}`);
    let targetId = $(el).data('ownerId');
    let target = $('[data-id="' + targetId + '"]');
    editInputName.val(target.data("image"));
    editInputTitle.val(target.data("title"));
    editInputUrl.val(target.data("url"))
    currentEditName.html(target.data("title"));
    editButton.data("owner-id", target.data("id"));
    bannerEditor.fadeIn();
    $(`#banner-editor-${bannerId}`).submit(function (e) {
        e.preventDefault();
    });
};
// Edits the banner item and hides the Edit Form
window.editBannerItem = function (bannerId,el) {
    let editInputName = $(`#editInputName-${bannerId}`);
    let editInputTitle = $(`#editInputTitle-${bannerId}`);
    let editInputUrl = $(`#editInputUrl-${bannerId}`);
    let targetId = $(el).data('ownerId');
    let target = $('[data-id="' + targetId + '"]');
    let newImage = editInputName.val();
    let newTitle = editInputTitle.val();
    let newUrl = editInputUrl.val();
    target.data("image", newImage);
    target.data("title", newTitle);
    target.data("url", newUrl);
    let dataBanner = JSON.parse($(`#data-banner-${bannerId}`).val());
    let objBanner = dataBanner.data;
    let newObj = objBanner.map(item => {
        if(item.id === targetId){
            item.title = newTitle;
            item.link_img = newImage;
            item.link_website = newUrl;
        }
        return item
    });
    dataBanner.data = newObj;
    $(`#data-banner-${bannerId}`).val(JSON.stringify(dataBanner));

    target.find("> .dd-handle").html('<a href="' + newUrl + '"><img class="img-thumb" src='+ newImage +' />' + newTitle + '</a>');

    $(`#banner-editor-${bannerId}`).hide();
};

/***************************************/


/*************** Add ***************/
