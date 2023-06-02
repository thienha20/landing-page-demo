var newMenuIdCount = 1;

window.excuseMenu = function (child, element,ui) {
    if (child.length === 0) return false;
    let menuId = $('.canvas>.child').length + Date.now();
    let bannerLayout = `
         <input type="hidden" name="dataMenu" class="block-data dataMenu" value="">
         <div class="row">
        <div class="col-md-4">
          <form class="form-inline form-menu" id="menu-add">
            <div class="w-100">
                <h3>Add Menu </h3>
                <div class="form-group">
                  <input type="text" class="form-control" id="addInputName" placeholder="Item name" required>
                </div>
                <div>&nbsp;</div>
                <div class="form-group">
                  <input type="text" class="form-control" id="addInputSlug" placeholder="item-slug" required>
                </div>
                            <div>&nbsp;</div>
                <div class="form-group">
                    <button class="btn btn-primary button-add-menu" id="addButton" onclick="addToMenu()"> <i class="fa fa-plus-circle" aria-hidden="true"></i> Add Item</button>
                </div>
            </div>
          </form>

          <form class="form-menu" id="menu-editor" style="display: none;">
            <div class="w-100">
                <h3>Editing <span id="currentEditName"></span></h3>
                <div class="form-group">
                  <input type="text" class="form-control" id="editInputName" placeholder="Item name" required>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" id="editInputSlug" placeholder="item-slug">
                </div>
                <div>&nbsp;</div>
                <div class="form-group">
                    <button class="btn btn-info button-add-menu" id="editButton">Edit</button>
                </div>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <h3>List Menu</h3>
          <div class="dd nestable" id="nestable">
            <ol class="dd-list">

              <!--- Initial Menu Items --->

              <!--- Item1 --->
              <li class="dd-item" data-id="1" data-name="Home" data-slug="home-slug-1" data-new="0" data-deleted="0">
                <div class="dd-handle">Home </div>
                <span onclick="deleteFromMenu(this)" class="button-delete btn btn-danger btn-xs pull-right"
                      data-owner-id="1">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <span onclick="prepareEdit(this)" class="button-edit btn btn-success btn-xs pull-right"
                      data-owner-id="1">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
              </li>

              <!--- Item2 --->
              <li class="dd-item" data-id="2" data-name="About Us" data-slug="about-slug-2" data-new="0" data-deleted="0">
                <div class="dd-handle">About Us</div>
                <span onclick="deleteFromMenu(this)" class="button-delete btn btn-danger btn-xs pull-right"
                      data-owner-id="2">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <span onclick="prepareEdit(this)" class="button-edit btn btn-success btn-xs pull-right"
                      data-owner-id="2">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
              </li>

              <!--- Item3 --->
              <li class="dd-item" data-id="3" data-name="Services" data-slug="services-slug-3" data-new="0" data-deleted="0">
                <div class="dd-handle">Services</div>
                <span onclick="deleteFromMenu(this)" class="button-delete btn btn-danger btn-xs pull-right"
                      data-owner-id="3">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <span onclick="prepareEdit(this)" class="button-edit btn btn-success btn-xs pull-right"
                      data-owner-id="3">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
                <!--- Item3 children --->
                <ol class="dd-list">
                  <!--- Item4 --->
                  <li class="dd-item" data-id="4" data-name="UI/UX Design" data-slug="uiux-slug-4" data-new="0" data-deleted="0">
                    <div class="dd-handle">UI/UX Design</div>
                    <span onclick="deleteFromMenu(this)" class="button-delete btn btn-danger btn-xs pull-right"
                          data-owner-id="4">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                    <span onclick="prepareEdit(this)" class="button-edit btn btn-success btn-xs pull-right"
                          data-owner-id="4">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                  </li>

                  <!--- Item5 --->
                  <li class="dd-item" data-id="5" data-name="Web Design" data-slug="webdesign-slug-5" data-new="0" data-deleted="0">
                    <div class="dd-handle">Web Design </div>
                    <span onclick="deleteFromMenu()" class="button-delete btn btn-danger btn-xs pull-right"
                          data-owner-id="5">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                    <span onclick="prepareEdit(this)" class="button-edit btn btn-success btn-xs pull-right"
                          data-owner-id="5">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                  </li>

                </ol>
              </li>
\t\t\t<li class="dd-item" data-id="6" data-name="Contact Us" data-slug="contact-slug-6" data-new="0" data-deleted="0">
                <div class="dd-handle">Contact Us</div>
                <span onclick="deleteFromMenu(this)" class="button-delete btn btn-danger btn-xs pull-right"
                      data-owner-id="6">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <span onclick="prepareEdit(this)" class="button-edit btn btn-success btn-xs pull-right"
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
    child.html(`<i class="fas fa-list-alt banner-icon"></i>
                <div id="parent-${menuId}">
                    <div class="banner-header">
                        <h2 style="text-align: center">Menu</h2>
                    </div>
                    <button type="button" class="btn btn-success clone-content clone-content-${menuId}">
                        <i class="fa fa-copy"></i>
                    </button>
                    <button type="button" class="btn btn-danger delete-content delete-content-${menuId}" data-toggle="modal" data-target="#deleteMenu-${menuId}">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <div class="modal" id="deleteMenu-${menuId}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <button type="button" class="btn btn-danger" onclick="deleteContent('${menuId}')">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    <div class='banner' id="banner-${menuId}"></div>`);
    child.append(bannerLayout);
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
    // $(".canvas").css("width", "auto");
    $(`#menu-add`).submit(function (e) {
        e.preventDefault();
    });
    $("#editButton").on("click", editMenuItem);
    $(`#menu-editor`).submit(function (e) {
        e.preventDefault();
    });
    $(`#nestable`).hover(function () {
        $(".canvas").addClass('canvas1');
        $(".canvas1").removeClass("canvas");
    }, function () {
        $(".canvas1").addClass('canvas');
    });

    $('#nestable').nestable({
        maxDepth: 3
    }).on('change', saveMenuBlock);
    addToMenu();

}

/*************** General ***************/
window.saveMenuBlock = function () {
    let e = $('#nestable').data('output', $('#json-output'));
    let list = e.length ? e : $(e.target),
        output = list.data('output');
    let dataMenu = {
        type: "menu",
        bannerDepth: 3,
        data: []
    }
    if (window.JSON) {
        if (output) {
            output.val(window.JSON.stringify(list.nestable('serialize')));
            let Menu = list.nestable('serialize');
            dataMenu.data.push(Menu);
            $(".dataMenu").val(window.JSON.stringify(dataMenu));
        }
    } else {
        alert('JSON browser support required for this page.');
    }
};

var nestableList = $("#nestable > .dd-list");

/***************************************/


/*************** Delete ***************/

window.deleteFromMenuHelper = function (target) {
    // otherwise hide and mark it for deletion
    target.appendTo(nestableList); // if children, move to the top level
    target.data('deleted', '1');
    target.fadeOut();
};

window.deleteFromMenu = function (el) {
    var targetId = $(el).data('owner-id');
    var target = $('[data-id="' + targetId + '"]');
    var result = confirm("Delete " + target.data('name') + " and all its subitems ?");
    if (!result) {
        return;
    }

    // Remove children (if any)
    target.find("li").each(function () {
        deleteFromMenuHelper($(this));
    });

    // Remove parent
    deleteFromMenuHelper(target);

    // update JSON
    saveMenuBlock($('#nestable').data('output', $('#json-output')));
};

/***************************************/


/*************** Edit ***************/

// window.menuEditor = $("#menu-editor");
// window.editButton = $("#editButton");
// window.editInputName = $("#editInputName");
// window.editInputSlug = $("#editInputSlug");
// window.currentEditName = $("#currentEditName");

// Prepares and shows the Edit Form
window.prepareEdit = function (el) {
    let targetId = $(el).data('owner-id');
    let target = $(el).parent();
    $("#editInputName").val(target.data("name"));
    $("#editInputSlug").val(target.data("slug"));
    $("#currentEditName").html(target.data("name"));
    $("#editButton").data("owner-id", target.data("id"));

    $("#menu-editor").show();
};

// Edits the Menu item and hides the Edit Form
window.editMenuItem = function (el) {
    let targetId = $(this).data('owner-id');
    let target = $('[data-id="' + targetId + '"]');

    let newName = $("#editInputName").val();
    let newSlug = $("#editInputSlug").val();

    target.data("name", newName);
    target.data("slug", newSlug);

    target.find("> .dd-handle").html(newName);

    $("#menu-editor").fadeOut();

    // update JSON
    saveMenuBlock($('#nestable').data('output', $('#json-output')));
};

/***************************************/


/*************** Add ***************/

var newMenuIdCount = 1;

window.addToMenu = function () {
    var newName = $("#addInputName").val();
    var newSlug = $("#addInputSlug").val();
    if (newName != "" || newSlug != "") {
        var newId = 'new-' + newMenuIdCount;
        $("#nestable > .dd-list").append(
            '<li class="dd-item" ' +
            'data-id="' + newId + '" ' +
            'data-name="' + newName + '" ' +
            'data-slug="' + newSlug + '" ' +
            'data-new="0" ' +
            'data-deleted="0">' +
            '<div class="dd-handle">' + newName + '</div> ' +
            '<span onclick="deleteFromMenu(this)" class="button-delete btn btn-danger btn-xs pull-right" ' +
            'data-owner-id="' + newId + '"> ' +
            '<i class="fa fa-times" aria-hidden="true"></i> ' +
            '</span>' +
            '<span onclick="prepareEdit(this)" class="button-edit btn btn-success btn-xs pull-right" ' +
            'data-owner-id="' + newId + '">' +
            '<i class="fa fa-pencil" aria-hidden="true"></i>' +
            '</span>' +
            '</li>'
        );

        newMenuIdCount++;

    }
    // update JSON
    saveMenuBlock($('#nestable').data('output', $('#json-output')));

    // set events
    // $("#nestable .button-delete").on("click", deleteFromMenu);
    // $("#nestable .button-edit").on("click", prepareEdit);
};



