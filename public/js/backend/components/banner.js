function excuseBanner(child, element, ui) {
    let bannerId = $('.canvas>.child').length + Date.now();
    let bannerLayout = `
         <div class="row">
         <div class="col-md-4">
               <div class="w-100">
              <form class="form-inline form-menu" class="banner-border" id="banner-add-${bannerId}">
                    <h3>Add banner </h3>
                        <div class="form-group">
                          <input type="text" class="form-control" id="addInputImage-${bannerId}" placeholder="link image" required>
                        </div>
                        <div>&nbsp;</div>
                        <div class="form-group">
                          <input type="text" class="form-control" id="addInputUrl-${bannerId}" placeholder="link redirect image" required>
                        </div>
                        <div class="form-group">
                          <input type="text" class="form-control" id="addInputTitle-${bannerId}" placeholder="Title image" required>
                        </div>
                                    <div>&nbsp;</div>
                        <button class="btn btn-primary button-add-menu" id="addButton-${bannerId}"> <i class="fa fa-plus-circle" aria-hidden="true"></i> Add Item</button>
                      </form>
                </div>
                <div class="w-100">
                    <form class="form-menu" id="banner-editor-${bannerId}" style="display: none;">
                        <h3>Editing <span id="currentEditName-${bannerId}"></span></h3>
                        <div class="form-group">
                          <input type="text" class="form-control" id="editInputName-${bannerId}" placeholder="link image" required>
                        </div>
                       <div class="form-group">
                          <input type="text" class="form-control" id="editInputUrl-${bannerId}" placeholder="link redirect image" required>
                        </div>
                        <div class="form-group">
                          <input type="text" class="form-control" id="editInputTitle-${bannerId}" placeholder="Title image">
                        </div>
                        <div>&nbsp;</div>
                        <button class="btn btn-info button-add-menu" onclick="editbannerItem(${bannerId},this)" id="editButton-${bannerId}">Edit</button>
                      </form>
                </div>
        </div>
        <div class="col-md-8">
          <h3>List Banner</h3>
          <div class="dd nestable-${bannerId}" id="nestable-${bannerId}">
            <input type="hidden" class="block-data" name="data-banner-${bannerId}" id="data-banner-${bannerId}" >
            <ul class="dd-list-${bannerId}">

            </ul>
          </div>
        </div>
      </div>
    `;
    child.html(`<i class="fas fa-calendar-week banner-icon"></i>
                <div id="parent-${bannerId}}">
                    <div class="banner-header"> <h2 style="text-align: center">Banner</h2></div>
                    <button type="button" class="btn btn-success clone-content clone-content-${bannerId}">
                        <i class="fa fa-copy"></i>
                    </button>
                    <button type="button" class="btn btn-danger delete-content delete-content-${bannerId}" data-toggle="modal" data-target="#deleteBanner-${bannerId}">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <div class="modal" id="deleteBanner-${bannerId}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Are you sure to delete this content?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" onclick="deleteContent('${bannerId}')">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
    child.append(bannerLayout);
    if($(element).find('.child').length === 0){
        $(element).append(child);
    }else {
        if ($(element).find('.child').last().position().top < ui.position.top) {
            $(element).append(child);
        } else {
            if($(this).parents('.canvas').length === 0)
                $(element).find('.child').each(function(){
                    let ps = $(this).position().top;
                    if(ps > ui.position.top) {
                        $(child).insertBefore(this);
                        return false;
                    }
                });
        }
    }

    // $(".canvas").css("width", "auto");
    let nestableList = $(`#nestable-${bannerId} > .dd-list-${bannerId}`);
    $(`#banner-add-${bannerId}`).submit(function (e) {
        e.preventDefault();
        addTobanner(nestableList, bannerId);
    });
    $(`.dd-list-${bannerId}`).hover(function () {
        $(".canvas").addClass('canvas1');
        $(".canvas1").removeClass("canvas");
    }, function () {
        $(".canvas1").addClass('canvas');
    });

}

var addTobanner = function (nestableList, bannerId) {
    let newImage = $(`#addInputImage-${bannerId}`).val();
    let newUrl = $(`#addInputUrl-${bannerId}`).val();
    let newTitle = $(`#addInputTitle-${bannerId}`).val();
    let newIdCount = $(`ul.dd-list-${bannerId} >li`).length + 1;
    let newId = 'new-' + newIdCount;
    nestableList.append(
        '<li class="dd-item" ' +
        'data-id-banner="' + newId + '" ' +
        'data-image="' + newImage + '" ' +
        'data-url="' + newUrl + '" ' +
        'data-title="' + newTitle + '" ' +
        'data-new="1" ' +
        'data-deleted="0">' +
        '<div class="dd-handle"><a href="' + newUrl + '"><img class="img-thumb" src=' + newImage + ' />' + newTitle + '</a></div> ' +
        '<span onclick="deleteFrombanner(' + bannerId + ',this)" class="button-delete btn btn-danger btn-xs pull-right" style="background: white;color: #DC3545"' +
        'data-banner-id="' + newId + '"> ' +
        '<i class="fas fa-trash-alt" aria-hidden="true"></i>  ' +
        '</span>' +
        '<span onclick="prepareEditBanner(' + bannerId + ',this)" class="button-edit btn btn-success btn-xs pull-right" style="background: white; color: #28A745"' +
        'data-banner-id="' + newId + '">' +
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
    $(`.dd-list-${bannerId}`).sortable({
        update: function (event, ui) {
            let dataTemp = [];
            let hiddenTag = $(this).prev();
            let jsonData = JSON.parse(hiddenTag.val())
            $(this).children("li").each(function () {
                jsonData.data.map(d => {
                    if (d.id == $(this).data("idBanner")) {
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

window.deleteFrombanner = function (bannerId, el) {
    var targetId = $(el).data('banner-id');
    var li_position = parseInt(targetId.replace("new-", ""));
    $(el).parent("li").remove();
    let dataBannerUpdate = JSON.parse($(`#data-banner-${bannerId}`).val());
    let objBanner = dataBannerUpdate.data;
    let newObj = objBanner.filter(item => item.id !== targetId);
    dataBannerUpdate.data = newObj;
    $(`#data-banner-${bannerId}`).val(JSON.stringify(dataBannerUpdate));
    $(`ul.dd-list-${bannerId}>li`).each(function () {
        var dataId = $(this).attr("data-id-banner")
        dataId = parseInt(dataId.replace("new-", ""));
        if (li_position < dataId) {
            dataId--;
            $(this).attr("data-id-banner", "new-" + dataId);
            $(this).children('span').attr("data-banner-id", "new-" + dataId);
        }
    })
};

/***************************************/


/*************** Edit ***************/

// Prepares and shows the Edit Form
window.prepareEditBanner = function (bannerId, el) {
    let bannerEditor = $(`#banner-editor-${bannerId}`);
    let editButton = $(`#editButton-${bannerId}`);
    let editInputName = $(`#editInputName-${bannerId}`);
    let editInputUrl = $(`#editInputUrl-${bannerId}`);
    let editInputTitle = $(`#editInputTitle-${bannerId}`);
    let currentEditName = $(`#currentEditName-${bannerId}`);
    let targetId = $(el).data('bannerId');
    let target = $('[data-id-banner="' + targetId + '"]');
    editInputName.val(target.data("image"));
    editInputTitle.val(target.data("title"));
    editInputUrl.val(target.data("url"))
    currentEditName.html(target.data("title"));
    editButton.data("banner-id", target.data("idBanner"));
    bannerEditor.fadeIn();
    $(`#banner-editor-${bannerId}`).submit(function (e) {
        e.preventDefault();
    });
};
// Edits the banner item and hides the Edit Form
window.editbannerItem = function (bannerId, el) {
    let editInputName = $(`#editInputName-${bannerId}`);
    let editInputTitle = $(`#editInputTitle-${bannerId}`);
    let editInputUrl = $(`#editInputUrl-${bannerId}`);
    let targetId = $(el).data('bannerId');
    let target = $('[data-id-banner="' + targetId + '"]');
    let newImage = editInputName.val();
    let newTitle = editInputTitle.val();
    let newUrl = editInputUrl.val();
    target.data("image", newImage);
    target.data("title", newTitle);
    target.data("url", newUrl);
    let dataBanner = JSON.parse($(`#data-banner-${bannerId}`).val());
    let objBanner = dataBanner.data;
    let newObj = objBanner.map(item => {
        if (item.id === targetId) {
            item.title = newTitle;
            item.link_img = newImage;
            item.link_website = newUrl;
        }
        return item
    });
    dataBanner.data = newObj;
    $(`#data-banner-${bannerId}`).val(JSON.stringify(dataBanner));

    target.find("> .dd-handle").html('<a href="' + newUrl + '"><img class="img-thumb" src=' + newImage + ' />' + newTitle + '</a>');

    $(`#banner-editor-${bannerId}`).hide();
};

/***************************************/


/*************** Add ***************/
