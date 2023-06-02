import $ from "jquery";
import "jquery-nestable/jquery.nestable"
export function excuseMenu(child, element) {
    // if(!child) return
    let menuId = $('.canvas>.child').length;
    let bannerLayout = `
         <div class="row">
        <div class="col-md-3">
          <form class="form-inline" id="menu-add">
            <h3>Add Menu </h3>
            <div class="form-group">
              <label for="addInputName">Name</label>
              <input type="text" class="form-control" id="addInputName" placeholder="Item name" required>
            </div>
            <div>&nbsp;</div>
            <div class="form-group">
              <label for="addInputSlug">Slug &nbsp;</label>
              <input type="text" class="form-control" id="addInputSlug" placeholder="item-slug" required>
            </div>
                        <div>&nbsp;</div>
            <button class="btn btn-primary" id="addButton"> <i class="fa fa-plus-circle" aria-hidden="true"></i> Add Item</button>
          </form>

          <form class="" id="menu-editor" style="display: none;">
            <h3>Editing <span id="currentEditName"></span></h3>
            <div class="form-group">
              <label for="addInputName">Name</label>
              <input type="text" class="form-control" id="editInputName" placeholder="Item name" required>
            </div>
            <div class="form-group">
              <label for="addInputSlug">Slug</label>
              <input type="text" class="form-control" id="editInputSlug" placeholder="item-slug">
            </div>
            <div>&nbsp;</div>
            <button class="btn btn-info" id="editButton">Edit</button>
          </form>
        </div>
        <div class="col-md-9">
          <h3>Menu</h3>
          <div class="dd nestable" id="nestable">
            <ol class="dd-list">

              <!--- Initial Menu Items --->

              <!--- Item1 --->
              <li class="dd-item" data-id="1" data-name="Home" data-slug="home-slug-1" data-new="0" data-deleted="0">
                <div class="dd-handle">Home </div>
                <span class="button-delete btn btn-danger btn-xs pull-right"
                      data-owner-id="1">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <span class="button-edit btn btn-success btn-xs pull-right"
                      data-owner-id="1">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
              </li>

              <!--- Item2 --->
              <li class="dd-item" data-id="2" data-name="About Us" data-slug="about-slug-2" data-new="0" data-deleted="0">
                <div class="dd-handle">About Us</div>
                <span class="button-delete btn btn-danger btn-xs pull-right"
                      data-owner-id="2">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <span class="button-edit btn btn-success btn-xs pull-right"
                      data-owner-id="2">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
              </li>

              <!--- Item3 --->
              <li class="dd-item" data-id="3" data-name="Services" data-slug="services-slug-3" data-new="0" data-deleted="0">
                <div class="dd-handle">Services</div>
                <span class="button-delete btn btn-danger btn-xs pull-right"
                      data-owner-id="3">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <span class="button-edit btn btn-success btn-xs pull-right"
                      data-owner-id="3">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
                <!--- Item3 children --->
                <ol class="dd-list">
                  <!--- Item4 --->
                  <li class="dd-item" data-id="4" data-name="UI/UX Design" data-slug="uiux-slug-4" data-new="0" data-deleted="0">
                    <div class="dd-handle">UI/UX Design</div>
                    <span class="button-delete btn btn-danger btn-xs pull-right"
                          data-owner-id="4">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                    <span class="button-edit btn btn-success btn-xs pull-right"
                          data-owner-id="4">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                  </li>

                  <!--- Item5 --->
                  <li class="dd-item" data-id="5" data-name="Web Design" data-slug="webdesign-slug-5" data-new="0" data-deleted="0">
                    <div class="dd-handle">Web Design </div>
                    <span class="button-delete btn btn-danger btn-xs pull-right"
                          data-owner-id="5">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                    <span class="button-edit btn btn-success btn-xs pull-right"
                          data-owner-id="5">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                  </li>

                </ol>
              </li>
\t\t\t<li class="dd-item" data-id="6" data-name="Contact Us" data-slug="contact-slug-6" data-new="0" data-deleted="0">
                <div class="dd-handle">Contact Us</div>
                <span class="button-delete btn btn-danger btn-xs pull-right"
                      data-owner-id="6">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <span class="button-edit btn btn-success btn-xs pull-right"
                      data-owner-id="6">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
              </li>
              <!--------------------------->

            </ol>
          </div>
        </div>
      </div>
    </div>

    `;
    child.html(`<div class='banner' id="banner-${menuId}"></div>`);
    child.append(bannerLayout);
    $(element).append(child);
    $(".canvas").css("width", "auto");
    let nestableList = $(`#nestable-${menuId} > .dd-list-${menuId}`);
    $(`#menu-add-${menuId}`).submit(function (e) {
        e.preventDefault();
        addToMenu(nestableList, menuId);
    });
    $(`#nestable`).hover(function () {
        $(".canvas").addClass('canvas1');
        $(".canvas1").removeClass("canvas");
    }, function () {
        $(".canvas1").addClass('canvas');
    });
    $('#nestable').nestable({
        maxDepth: 5
    }).on('change', updateOutput);

}

let newIdCount = 1;
var addToMenu = function (nestableList, menuId) {
    let newImage = $(`#addInputImage-${menuId}`).val();
    let newUrl = $(`#addInputUrl-${menuId}`).val();
    let newTitle = $(`#addInputTitle-${menuId}`).val();
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
        '<span onclick="deleteFromMenu('+menuId+',this)" class="button-delete btn btn-danger btn-xs pull-right" ' +
        'data-owner-id="' + newId + '"> ' +
        '<i class="fa fa-times" aria-hidden="true"></i> ' +
        '</span>' +
        '<span onclick="prepareEdit(' + menuId + ',this)" class="button-edit btn btn-success btn-xs pull-right" ' +
        'data-owner-id="' + newId + '">' +
        '<i class="fa fa-pencil" aria-hidden="true"></i>' +
        '</span>' +
        '</li>'
    );
    // add banner into list object banner
    let dataHidden = $(`#data-banner-${menuId}`).val();
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
    $(`#data-banner-${menuId}`).val(JSON.stringify(dataBanner));
    newIdCount++;
    $(`.dd-list-${menuId}`).sortable({
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

window.deleteFromMenu = function (menuId,el) {
    var targetId = $(el).data('owner-id');
    $(el).parent("li").remove();
    let dataBannerUpdate = JSON.parse($(`#data-banner-${menuId}`).val());
    let objBanner = dataBannerUpdate.data;
    let newObj = objBanner.map(item => {
        if(item.id === targetId){
            item={};
        }
        return item
    });
    dataBannerUpdate.data = newObj;
    $(`#data-banner-${menuId}`).val(JSON.stringify(dataBannerUpdate));
};

/***************************************/


/*************** Edit ***************/

// Prepares and shows the Edit Form
window.prepareEdit = function (menuId,el) {
    let menuEditor = $(`#menu-editor-${menuId}`);
    let editButton = $(`#editButton-${menuId}`);
    let editInputName = $(`#editInputName-${menuId}`);
    let editInputUrl = $(`#editInputUrl-${menuId}`);
    let editInputTitle = $(`#editInputTitle-${menuId}`);
    let currentEditName = $(`#currentEditName-${menuId}`);
    let targetId = $(el).data('ownerId');
    let target = $('[data-id="' + targetId + '"]');
    editInputName.val(target.data("image"));
    editInputTitle.val(target.data("title"));
    editInputUrl.val(target.data("url"))
    currentEditName.html(target.data("title"));
    editButton.data("owner-id", target.data("id"));
    menuEditor.fadeIn();
    $(`#menu-editor-${menuId}`).submit(function (e) {
        e.preventDefault();
    });
};
// Edits the Menu item and hides the Edit Form
window.editMenuItem = function (menuId,el) {
    let editInputName = $(`#editInputName-${menuId}`);
    let editInputTitle = $(`#editInputTitle-${menuId}`);
    let editInputUrl = $(`#editInputUrl-${menuId}`);
    let targetId = $(el).data('ownerId');
    let target = $('[data-id="' + targetId + '"]');
    let newImage = editInputName.val();
    let newTitle = editInputTitle.val();
    let newUrl = editInputUrl.val();
    target.data("image", newImage);
    target.data("title", newTitle);
    target.data("url", newUrl);
    let dataBanner = JSON.parse($(`#data-banner-${menuId}`).val());
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
    $(`#data-banner-${menuId}`).val(JSON.stringify(dataBanner));

    target.find("> .dd-handle").html('<a href="' + newUrl + '"><img class="img-thumb" src='+ newImage +' />' + newTitle + '</a>');

    $(`#menu-editor-${menuId}`).hide();
};

/***************************************/


/*************** Add ***************/
