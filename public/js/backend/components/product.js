window.removeProducts = function (idBlock, idProduct, el) {
    let dataProduct = JSON.parse($(`#data-product-${idBlock}`).val());
    let productDtl = dataProduct.data;
    let vl = $(`#list-product-${idBlock}`).val().split(",");
    if ($.inArray(idProduct.toString(), vl) > -1) {
        //finding position product
        vl = vl.filter(v => v != idProduct)
        //delet id product
        $(`#list-product-${idBlock}`).val(vl);
        productDtl = productDtl.filter(v => v.id != idProduct);
        dataProduct.data = productDtl;
        $(`#data-product-${idBlock}`).val(JSON.stringify(dataProduct));
        $(el).parents("li").remove();
    }

}
window.removeAllProducts = function (idBlock) {
    let dataProduct = JSON.parse($(`#data-product-${idBlock}`).val());
    $(`#list-product-${idBlock}`).val('');
    dataProduct.data = [];
    $(`#data-product-${idBlock}`).val(JSON.stringify(dataProduct));
    $("#columns-"+idBlock + " li").remove();

}

function excuseProduct(child, element,ui) {
    let landingType = $("#use-for-page").val();
    let urlCscart = $("#url_cscart").val();
    let urlTatmart = $("#url_tatmart").val();
    let idPrd = $('.canvas>.child').length + Date.now();
    let select2 = $(`
                    <button type="button" class="btn btn-danger delete-content delete-content-${idPrd}" data-toggle="modal" data-target="#deleteProducts-${idPrd}">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <div class="modal" id="deleteProducts-${idPrd}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <button type="button" class="btn btn-danger" onclick="deleteContent('${idPrd}')">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                   `);
    child.html(`<i class="fas fa-toolbox banner-icon"></i>
                <div class="banner-header">
                    <div class='product' id="block-prd-${idPrd}"></div>
                    <h2>Product</h2>
                    <div class="product-import-file">
                        <form method="post" action="{{ url('/images-save') }}"
                              enctype="multipart/form-data" class="dropzone dropzone-custom" id="my-dropzone-${idPrd}">
                            <meta name="csrf-token" content="{{ csrf_token() }}">
                            <div class="dz-message">
                                <div class="col-xs-8">
                                    <div class="message">
                                        <i class='fa fa-upload'></i>
                                        <p style="float: right; margin-left: 5px">Import sản phẩm</p>
                                    </div>
                                </div>
                            </div>
                            <div class="fallback">
                                <input type="file" name="file">
                            </div>
                        </form>
                    </div>
                    <div class="product-remove-all" onclick="return confirm('Bạn chắc chắn xóa tất cả sản phẩm') && removeAllProducts(${idPrd})">
                        <div class="content">
                            <i class='fas fa-trash-alt'></i>
                            <p style="float: right; margin-left: 5px">Xóa tất cả sản phẩm</p>
                        </div>
                    </div>
                </div>
                <div id="parent-${idPrd}">
                    <div class="form-group" style="display: flex">
                        <label for="tag_list-${idPrd}">products:</label>
                        <select id="tag_list-${idPrd}" class="form-control" style="width: 50%"></select>
                        <div class="form-check" style="margin: 0 30px; display: flex;align-items: center">
                            <input class="form-check-input" style="margin-top: 0px" type="radio" name="productperrow-${idPrd}" value="4" onclick="changeProductInRow(4)" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                    4 product in row
                            </label>
                        </div>
                        <div class="form-check" style="display: flex;align-items: center">
                            <input class="form-check-input" type="radio" name="productperrow-${idPrd}" value="5" id="flexRadioDefault2" onclick="changeProductInRow(5)" checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                5 product in row
                            </label>
                        </div>
                    </div>
                </div>
                <input type="hidden" id="list-product-${idPrd}" >
                <input type="hidden" class="block-data" name="data-product-${idPrd}" id="data-product-${idPrd}" >
                 <ul id="columns-${idPrd}" class="parent-column" style="width: 100%;"></ul>
                 <input type="hidden" id="data-products-${idPrd}" value="{{json_encode($component['data'])}}">
                <button type="button" class="btn btn-light zoom-content zoom-content-${idPrd}" onclick="zoomContent('${idPrd}',this)">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-light thumb-content thumb-content-${idPrd}" onclick="thumbContent('${idPrd}',this)">
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-light collapse-content collapse-content-${idPrd}" onclick="collapseContent('${idPrd}',this)">
                    <i class="fa fa-angle-double-up" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-light expand-content expand-content-${idPrd}" onclick="expandContent('${idPrd}',this)">
                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-success clone-content clone-content-${idPrd}">
                    <i class="fa fa-copy"></i>
                </button>

                `);
    child.append(select2);
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
                        $(this).addClass("go-down");
                        $(child).insertBefore(this);
                        return false;
                    }
                });
        }
    }
    /*$(`#columns-${idPrd}`).hover(function () {
        $(".canvas").addClass('canvas1');
        $(".canvas1").removeClass("canvas");
    }, function () {
        $(".canvas1").addClass('canvas');
    });*/
    if ($(`#columns-${idPrd}`).height() > 500) {
        $(`#columns-${idPrd}`).css('height', '500px');
        $(`#columns-${idPrd}`).css('overflow-y', 'scroll');
        $(`#columns-${idPrd}`).css('overflow-x', 'hidden');
    }
    let product_in_row = $('input[name="productperrow-' + idPrd + '"]:checked').val();
    let dataProduct = {
        type: "product",
        product_in_rows: product_in_row,
        data: []
    }
    let objAjax = {
        url: urlCscart+"api/products?status[]=A&company_info=1&only_vendor_product=1&pcode_from_q=Y",
        headers: {
            "Authorization": $("#authorization_v2").val()
        },
        dataType: 'json',
        data: function (params) {
            return {
                q: $.trim(params.term),
            };
        }
    }
    switch (landingType.toString().toLowerCase()) {
        case "tatmartv1":
            objAjax = {
                url: urlTatmart+"products/get-list-product-landing-page",
                dataType: 'json',
                data: function (params) {
                    return {
                        search_keywords: $.trim(params.term),
                    };
                }
            }
            break;
        case "mrtho":
            objAjax = {
                url: urlCscart+"api/products?status[]=A&company_info=1&only_vendor_product=1&pcode_from_q=Y",
                headers: {
                    "Authorization": $("#authorization_mrtho").val()
                },
                dataType: 'json',
                data: function (params) {
                    return {
                        q: $.trim(params.term),
                    };
                }
            }
            break;
    }
    $(`#tag_list-${idPrd}`).select2({
        placeholder: "Choose product...",
        closeOnSelect: false,
        minimumInputLength: 1,
        ajax: {
            ...objAjax,
            processResults: function (data) {
                let products = data.products.map(p => {
                    p.id = p.product_id
                    return p;
                })
                return {
                    results: products
                };
            },
            cache: false
        },
        templateResult: function (data) {
            if (data.loading) return false
            let container = '';
            container = `<div class='select2-result-repository clearfix'>
                    ${(data.main_pair) ? `<div class='select2-result-repository__avatar'><img src='${data.main_pair.detailed.https_image_path}' /></div>` : ``}
                     ${(data.image_file) ? `<div class='select2-result-repository__avatar'><img src='${data.image_file}' /></div>` : ``}
                    <div class='select2-result-repository__meta'>
                        <div class='select2-result-repository__title'>${data.product}</div>
                        <div class='select2-result-repository__title'>${data.product_code}</div>
                        <div class='select2-result-repository__title'>${data.price}</div>
                        <div class='select2-result-repository__title'>${data.company_description}</div>
                    </div>
                 </div>`;

            return $(container);
        },
        templateSelection: function (data) {
            if (!data.id) return false;
            let vl = $(`#list-product-${idPrd}`).val().split(",");
            if ($(`#list-product-${idPrd}`).val() != "" && $.inArray(data.id, vl) > -1) return false;

            $(`#list-product-${idPrd}`).val($(`#list-product-${idPrd}`).val() + "," + data.id);

            let dataHidden = $(`#data-product-${idPrd}`).val();
            if (dataHidden !== "") {
                dataProduct = JSON.parse(dataHidden);
            }
            let promotion_price = data.list_price ? data.list_price : '';
            let img = '';
            let url = '';
            if (landingType == "tatmartv2") {
                img = data.main_pair ? data.main_pair.detailed.image_path : '';
                url = urlCscart+"index.php?dispatch=products.view&product_id=" + data.product_id;
            }
            if (landingType == "tatmartv1") {
                img = data.image_file ? data.image_file : '';
                url = data.url?data.url:'';
            }
            let objProduct = {
                id: data.id,
                name: data.product ? data.product : '',
                code: data.product_code ? data.product_code : '',
                image: img,
                price: data.price,
                promotion_price: promotion_price,
                url: url
            }
            dataProduct.data.push(objProduct)
            $(`#data-product-${idPrd}`).val(JSON.stringify(dataProduct));
            obj[`columns-${idPrd}`] = dataProduct;
            let blockProduct = `
                    <li class="column" class = "data-product-id-${data.id}" data-product-id="${data.id}">
                    <div class="row">
                        <div class="col-md-12">
                        <div style="width: 50px;height: 50px; display: flex">
                        ${(data.main_pair) ? `<img style="max-width: 100%; margin-right: 35px;" src='${data.main_pair.detailed.https_image_path}' />` : ``}
                         ${(data.image_file) ? `<img style="max-width: 100%; margin-right: 35px;" src='${data.image_file}' />` : ``}
                            <div class="button-delete-prd">
                                <button type="button" class="btn btn-danger button-edit-product" onclick="removeProducts(${idPrd},${data.id}, this)" style="background: white;color: #DC3545">
                                     <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div style="position: absolute;top: 20px;left: 100px;">
                                ${data.product} - ${data.product_code} - ${data.price}
                            </div>

                        </div>
                    </div>
                 </li>`;
            $(`#columns-${idPrd}`).append(blockProduct);
            $(`#columns-${idPrd}`).sortable({
                update: function (event, ui) {
                    let dataTemp = [];
                    let hiddenTag = $(this).prev();
                    let data = obj[`columns-${idPrd}`].data;
                    $(this).children("li").each(function () {
                        for (let d in data) {
                            if (data[d].id == $(this).data("productId")) {
                                dataTemp.push(data[d]);
                                data.splice(d, 1);
                                break;
                            }
                        }
                    });
                    dataProduct.data = dataTemp;
                    hiddenTag.val(JSON.stringify(dataProduct));
                }
            });
            if ($(`#columns-${idPrd}`).height() > 500) {
                $(`#columns-${idPrd}`).css('height', '500px');
                $(`#columns-${idPrd}`).css('overflow-y', 'scroll');
                $(`#columns-${idPrd}`).css('overflow-x', 'hidden');
            }
            $(`#columns-${idPrd}`).animate({
                scrollTop: $(
                    'html, body').get(0).scrollHeight
            }, 1000);
        }
    });
    // $(".canvas").css("width", "auto");
    window.changeProductInRow = function (vl) {
        if(typeof dataProduct === "undefined"){
            product_in_row=vl;
        }else{
            dataProduct.product_in_rows = vl;
            $(`#data-product-${idPrd}`).val(JSON.stringify(dataProduct));
            console.log(dataProduct);
        }
    }
    var myDropzone = new Dropzone(
        `#my-dropzone-${idPrd}`, {
            url: "/import_products",
            uploadMultiple: false,
            acceptedFiles: ".xlsx",
            maxFiles: 1,
            timeout: 60000,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            init: function() {
                this.on("maxfilesexceeded", function() {
                    if (this.files[1]!=null){
                        this.removeFile(this.files[0]);
                    }
                });
                this.on("addedfile", file => {
                    $('.import-loading').show()
                });
            },
            success: function (file, response) {
                this.removeFile(this.files[0]);
                if(response.status == 300 && response.file) {
                    window.location.href = '/storage/'+response.file
                }
                if(response.status == 200 && response.data) {
                    if(response.data && response.data.length > 0) {
                        let data_s = response.data
                        $.each(data_s, function (index, data) {
                            let vl = $(`#list-product-${idPrd}`).val().split(",");
                            if ($(`#list-product-${idPrd}`).val() != "" && $.inArray(data.product_id, vl) > -1) return false;

                            $(`#list-product-${idPrd}`).val($(`#list-product-${idPrd}`).val() + "," + data.product_id);
                            let objProduct = {
                                id: data.product_id,
                                name: data.product ? data.product : '',
                                code: data.product_code ? data.product_code : '',
                                image: data.main_pair ? data.main_pair.detailed.image_path : '',
                                price: data.price,
                                promotion_price: data.list_price ? data.list_price : '',
                                url: urlCscart+"index.php?dispatch=products.view&product_id=" + data.product_id
                            }
                            dataProduct.data.push(objProduct)
                            $(`#data-product-${idPrd}`).val(JSON.stringify(dataProduct));
                            obj[`columns-${idPrd}`] = dataProduct;
                            let blockProduct = `
                                <li class="column" class = "data-product-id-${data.product_id}" data-product-id="${data.product_id}">
                                <div class="row">
                                    <div class="col-md-12">
                                    <div style="width: 50px;height: 50px; display: flex">
                                    ${(data.main_pair) ? `<img style="max-width: 100%; margin-right: 35px;" src='${data.main_pair.detailed.https_image_path}' />` : ``}
                                     ${(data.image_file) ? `<img style="max-width: 100%; margin-right: 35px;" src='${data.image_file}' />` : ``}
                                        <div class="button-delete-prd">
                                            <button type="button" class="btn btn-danger button-edit-product" onclick="removeProducts(${idPrd},${data.product_id}, this)" style="background: white;color: #DC3545">
                                                 <i class="fa fa-times" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div style="position: absolute;top: 20px;left: 100px;">
                                            ${data.product} - ${data.product_code} - ${data.price}
                                        </div>

                                    </div>
                                </div>
                             </li>`;
                            $(`#columns-${idPrd}`).append(blockProduct);
                            $(`#columns-${idPrd}`).sortable({
                                update: function (event, ui) {
                                    let dataTemp = [];
                                    let hiddenTag = $(this).prev();
                                    let data = obj[`columns-${idPrd}`].data;
                                    $(this).children("li").each(function () {
                                        for (let d in data) {
                                            if (data[d].id == $(this).data("productId")) {
                                                dataTemp.push(data[d]);
                                                data.splice(d, 1);
                                                break;
                                            }
                                        }
                                    });
                                    dataProduct.data = dataTemp;
                                    hiddenTag.val(JSON.stringify(dataProduct));
                                }
                            });
                            if ($(`#columns-${idPrd}`).height() > 500) {
                                $(`#columns-${idPrd}`).css('height', '500px');
                                $(`#columns-${idPrd}`).css('overflow-y', 'scroll');
                                $(`#columns-${idPrd}`).css('overflow-x', 'hidden');
                            }
                            $(`#columns-${idPrd}`).animate({
                                scrollTop: $(
                                    'html, body').get(0).scrollHeight
                            }, 1000);
                        });
                        alert('Import sản phẩm thành công.')
                        $('.import-loading').hide()
                        return true;
                    } else {
                        alert('Dữ liệu trống.')
                        $('.import-loading').hide()
                    }
                }
            },
            error: function (file, response) {
                $('.import-loading').hide()
                this.removeFile(this.files[0]);
                console.log(file,response);
                return false;
            }
        }
    );

}

$(document).ready(function () {

    $(document).on("keyup", "input.js-product-position", function (e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == 13) {
            let newPosition = $(e.target).val();
            let parent = $(this).parents('ul.parent-column');
            let dataLength = $(parent).children('li').length;
            let tempData = $(this).parents('li.column');
            $(this).parents('li.column').remove();
            console.log(tempData);
            if (newPosition > dataLength-1) {
                parent.append(tempData);
            } else {
                parent.children(`li:eq(${newPosition-1})`).before(tempData);
            }
            let dataTemp = [];
            let hiddenTag = $(parent).prev();
            let jsonData = JSON.parse(hiddenTag.val())
            $(parent).children("li").each(function () {
                jsonData.data.map(d => {
                    if (d.id == $(this).data("productId")) {
                        dataTemp.push(d)
                    }
                })
            });
            jsonData.data = dataTemp;
            hiddenTag.val(JSON.stringify(jsonData))
        }
    });
});


