<i class="fas fa-toolbox banner-icon"></i>
<div class="banner-header">
    <div class='product' id="block-prd-{{$id}}"></div>
    <h2>Product</h2>
    <div class="product-import-file">
        <form method="post" action="{{ url('/images-save') }}"
              enctype="multipart/form-data" class="dropzone dropzone-custom" id="my-dropzone-{{$id}}">
            {{ csrf_field() }}
            <div class="dz-message import-file">
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
    <div class="product-remove-all" onclick="return confirm('Bạn chắc chắn xóa tất cả sản phẩm') && removeAllProducts({{$id}})">
        <div class="content">
            <i class='fas fa-trash-alt'></i>
            <p style="float: right; margin-left: 5px">Xóa tất cả sản phẩm</p>
        </div>
    </div>
</div>
<div id="parent-{{$id}}" class="product-form">
    <div class="form-group" style="display: flex">
        <label for="tag_list-{{$id}}" style="margin-bottom: 0; margin-right: 10px">Products:</label>
        <select id="tag_list-{{$id}}" class="form-control" style="width: 50%"></select>
        <div class="form-check" style="margin: 0 30px; display: flex;align-items: center">
            <input class="form-check-input" style="margin-top: 0px" type="radio" name="productperrow-{{$id}}" value="4" onclick="changeProductInRow({{$id}}, 4)" @if($component['product_in_rows'] == 4) checked @endif id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">
                4 product in row
            </label>
        </div>
        <div class="form-check" style="display: flex;align-items: center">
            <input class="form-check-input" type="radio" name="productperrow-{{$id}}" value="5" id="flexRadioDefault2" onclick="changeProductInRow({{$id}}, 5)" @if($component['product_in_rows'] == 5) checked @endif>
            <label class="form-check-label" for="flexRadioDefault2">
                5 product in row
            </label>
        </div>
    </div>
</div>
<input type="hidden" id="list-product-{{$id}}"
       value="@foreach($component['data'] as $product){{$product['id']}},@endforeach">
<input type="hidden" class="block-data" name="data-product-{{$id}}" id="data-product-{{$id}}">
<ul id="columns-{{$id}}" class="parent-column" style="width: 100%">
    @foreach($component['data'] as $k => $product)
{{--        <pre>{{print_r($product)}}</pre>--}}
        <li class="column" class="data-product-id-${data.id}" data-product-id="{{$product['id']}}">
            <div class="row">
                <div class="col-md-12">
                    <div class="input-position-product" >
                        <input type="number" class="js-product-position" value={{$k+1}} placeholder={{$k+1}} min="1">
                    </div>
                    <div style="width: 50px;height: 50px; display: flex; margin-left: 60px">
                        <img style="max-width: 100%; margin-right: 35px;"
                             src="{{ $product['image'] ? $product['image'] : ''}}"/>

                        <div class="button-delete-prd">
                            <button type="button" class="btn btn-danger button-edit-product"
                                    onclick="removeProducts({{$id}},{{$product['id']}}, this)"
                            style="background: white;color: #DC3545"
                            >

                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div style="position: absolute;top: 20px;left: 130px;">
                        {{$product['name']}} <strong>{{isset($product['company'])?"(".$product['company'].")":""}}</strong> - {{$product['code']}} - {{number_format($product['price'],0,",",".")}} đ
                    </div>
                </div>
            </div>
        </li>
    @endforeach
</ul>
<input type="hidden" id="data-products-{{$id}}" value="{{json_encode($component['data'])}}">
<button type="button" class="btn btn-light zoom-content zoom-content-{{$id}}" onclick="zoomContent('{{$id}}',this)">
    <i class="fa fa-angle-left" aria-hidden="true"></i>
    <i class="fa fa-angle-right" aria-hidden="true"></i>
</button>
<button type="button" class="btn btn-light thumb-content thumb-content-{{$id}}" onclick="thumbContent('{{$id}}',this)">
    <i class="fa fa-angle-right" aria-hidden="true"></i>
    <i class="fa fa-angle-left" aria-hidden="true"></i>
</button>
<button type="button" class="btn btn-light collapse-content collapse-content-{{$id}}" onclick="collapseContent('{{$id}}',this)">
    <i class="fa fa-angle-double-up" aria-hidden="true"></i>
</button>
<button type="button" class="btn btn-light expand-content expand-content-{{$id}}" onclick="expandContent('{{$id}}',this)">
    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
</button>
<button type="button" class="btn btn-success clone-content clone-content-{{$id}}">
    <i class="fa fa-copy"></i>
</button>
<button type="button" class="btn btn-danger delete-content delete-content-{{$id}}" data-toggle="modal" data-target="#deleteProducts-{{$id}}">
    <i class="fa fa-times" aria-hidden="true"></i>
</button>
<div class="modal" id="deleteProducts-{{$id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="padding: 0 !important;">
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
                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteContent('{{$id}}')">Delete</button>
            </div>
        </div>
    </div>
</div>
<script>
    obj["columns-{{$id}}"] = {!! json_encode($component)  !!};
    {{--$(`#columns-{{$id}}`).hover(function () {--}}
    {{--    $(".canvas").addClass('canvas1');--}}
    {{--    $(".canvas1").removeClass("canvas");--}}
    {{--}, function () {--}}
    {{--    $(".canvas1").addClass('canvas');--}}
    {{--    $(".canvas").removeClass("canvas1");--}}
    {{--});--}}
    $("#columns-{{$id}}").sortable({
        update: function (event, ui) {
            let dataTemp = [];
            let hiddenTag = $(this).prev();
            const data = obj["columns-{{$id}}"].data;
            $(this).children("li").each(function () {
                for (let d in data) {
                    if (data[d].id == $(this).data("productId")) {
                        dataTemp.push(data[d]);
                        console.log(dataTemp);
                        data.splice(d, 1);
                        break;
                    }
                }
            });
            obj["columns-{{$id}}"].data = dataTemp;
            hiddenTag.val(JSON.stringify(obj["columns-{{$id}}"]))
        }
    });


    let authorization_v2_{{$id}} = $("#authorization_v2").val();
    let authorization_v1_{{$id}} = $("#authorization_v1").val();
    let authorization_mrtho_{{$id}} = $("#authorization_mrtho").val();
    let landingType_{{$id}} = $("#use-for-page").val();
    let urlCscart_{{$id}} = $("#url_cscart").val();
    let urlTatmart_{{$id}} = $("#url_tatmart").val();
    var dataHidden_{{$id}} = $(`#data-product-{{$id}}`).val();
    var dataprd_{{$id}} = $(`#data-products-{{$id}}`).val();
    let product_in_row_{{$id}} = $('input[name="productperrow-{{$id}}"]:checked').val();
    var dataProduct_{{$id}} = {
        type: "product",
        product_in_rows: product_in_row_{{$id}},
        data: []
    }
    if (dataHidden_{{$id}} !== "") {
        dataProduct = JSON.parse(dataHidden_{{$id}});
    }
    if (dataprd_{{$id}} !== "") {
        dataProduct_{{$id}}.data = JSON.parse(dataprd_{{$id}});
        $(`#data-product-{{$id}}`).val(JSON.stringify(dataProduct_{{$id}}));
    }
        {{--console.log(JSON.parse({{$component['data']}}));--}}
    let objAjax_{{$id}} = {
            url: urlCscart_{{$id}} + "api/products?status[]=A&company_info=1&only_vendor_product=1&pcode_from_q=Y",
            headers: {
                "Authorization": authorization_v2_{{$id}}
            },
            dataType: 'json',
            data: function (params) {
                return {
                    q: $.trim(params.term),
                };
            }
        }
    switch (landingType_{{$id}}) {
        case "tatmartv1":
            objAjax_{{$id}} = {
                url: urlTatmart_{{$id}} + "products/get-list-product-landing-page",
                dataType: 'json',
                data: function (params) {
                    return {
                        search_keywords: $.trim(params.term),
                    };
                }
            }
            break;
        case "mrtho":
            objAjax_{{$id}} = {
                url: urlCscart_{{$id}} + "api/products?status[]=A&company_info=1&only_vendor_product=1&pcode_from_q=Y",
                headers: {
                    "Authorization": authorization_mrtho_{{$id}}
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
    $(`#tag_list-{{$id}}`).select2({
        placeholder: "Choose product...",
        minimumInputLength: 1,
        closeOnSelect: false,
        ajax: {
            ...objAjax_{{$id}},
            cache: false,
            processResults: function (data) {
                let products = data.products.map(p => {
                    p.id = p.product_id
                    return p;
                })
                return {
                    results: products
                };
            }
        },
        templateResult: function (data) {
            if (data.loading) return false
            let container = '';
            container = `<div class='select2-result-repository clearfix'>
                    ${(data.main_pair) ? `<div class='select2-result-repository__avatar'><img src='${data.main_pair.detailed.https_image_path}' /></div>` : ``}
                    ${(data.image_file) ? `<div class='select2-result-repository__avatar'><img src='${data.image_file}' /></div>` : ``}

                    <div class='select2-result-repository__meta'>
                        <div class='select2-result-repository__title'>${data.product}</div>
                        <div class='select2-result-repository__title'>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}</div>
                        <div class='select2-result-repository__title'>SSKU: ${data.product_code}</div>
                        <div class='select2-result-repository__title'>Seller: ${data.company}</div>
                    </div>
                 </div>`;

            return $(container);
        },
        templateSelection: function (data) {
            if (!data.id) return false;
            let vl = $(`#list-product-{{$id}}`).val().split(",");
            if ($(`#list-product-{{$id}}`).val() != "" && $.inArray(data.id, vl) > -1) return false;

            $(`#list-product-{{$id}}`).val($(`#list-product-{{$id}}`).val() + "," + data.id);
            let promotion_price = data.list_price ? data.list_price : '';
            let img = '';
            let url = '';
            if (landingType_{{$id}} == "tatmartv2") {
                img = data.main_pair ? data.main_pair.detailed.image_path : '';
                url = urlCscart_{{$id}}+ "index.php?dispatch=products.view&product_id=" + data.product_id;
            }
            if (landingType_{{$id}} == "tatmartv1") {
                img = data.image_file ? data.image_file : '';
                url = data.url ? data.url : '';
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
            dataProduct_{{$id}}.data.push(objProduct)
            $(`#data-product-{{$id}}`).val(JSON.stringify(dataProduct_{{$id}}));
            let blockProduct = `
                    <li class="column" class = "data-product-id-${data.id}" data-product-id="${data.id}">
                    <div class="row">
                        <div class="col-md-12">
                        <div style="width: 50px;height: 50px; display: flex">
                            ${(data.main_pair) ? `<img style="max-width: 100%; margin-right: 35px;" src='${data.main_pair.detailed.https_image_path}' />` : ``}
                             ${(data.image_file) ? `<div class='select2-result-repository__avatar'><img src='${data.image_file}' /></div>` : ``}
                            <div class="button-delete-prd">
                                <button type="button" class="btn btn-danger button-edit-product" onclick="removeProducts({{$id}},${data.id}, this)">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div style="position: absolute;top: 20px;left: 100px;">
                                ${data.product} <strong>(${data.company})</strong> - ${data.product_code} - ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                            </div>

                        </div>
                    </div>
                 </li>`;
            $(`#columns-{{$id}}`).append(blockProduct);
            $("#columns-{{$id}}").sortable({
                update: function (event, ui) {
                    let dataTemp = [];
                    let hiddenTag = $(this).prev();
                    $(this).children("li").each(function () {
                        obj["columns-{{$id}}"].data.map(d => {
                            if (d.id == $(this).data("productId")) {
                                dataTemp.push(d)
                            }
                        })
                    });
                    obj["columns-{{$id}}"].data = dataTemp;
                    hiddenTag.val(JSON.stringify(obj["columns-{{$id}}"]))
                }
            });
            if ($(`#columns-{{$id}}`).height() > 500) {
                $(`#columns-{{$id}}`).css('height', '500px');
                $(`#columns-{{$id}}`).css('overflow-y', 'scroll');
                $(`#columns-{{$id}}`).css('overflow-x', 'hidden');
            }
            $(`#columns-{{$id}}`).animate({
                scrollTop: $(
                    'html, body').get(0).scrollHeight
            }, 1000);
        }
    });
    window.changeProductInRow = function (pos, vl) {
        dataProduct_{{$id}}.product_in_rows=vl;
        $(`#data-product-${pos}`).val(JSON.stringify(dataProduct_{{$id}}));
        console.log($(`#data-product-${pos}`).val());
        console.log('#data-product-{{$id}}');
    }
</script>
<script type="text/javascript">
    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone(
        '#my-dropzone-{{$id}}', {
            url: "/import_products",
            uploadMultiple: false,
            acceptedFiles: ".xlsx",
            maxFiles: 1,
            timeout: 60000,
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
                    $('.import-loading').hide()
                }
                if(response.status == 200 && response.data) {
                    if(response.data && response.data.length > 0) {
                        let data_s = response.data
                        $.each(data_s, function (index, data) {
                            let vl = $(`#list-product-{{$id}}`).val().split(",");
                            if ($(`#list-product-{{$id}}`).val() != "" && $.inArray(data.product_id, vl) > -1) return false;

                            $(`#list-product-{{$id}}`).val($(`#list-product-{{$id}}`).val() + "," + data.product_id);
                            let objProduct = {
                                id: data.product_id,
                                name: data.product ? data.product : '',
                                code: data.product_code ? data.product_code : '',
                                image: data.main_pair ? data.main_pair.detailed.image_path : '',
                                price: data.price,
                                promotion_price: data.list_price ? data.list_price : '',
                                url: urlCscart_{{$id}}+ "index.php?dispatch=products.view&product_id=" + data.product_id
                            }
                            dataProduct_{{$id}}.data.push(objProduct)
                            $(`#data-product-{{$id}}`).val(JSON.stringify(dataProduct_{{$id}}));
                            let blockProduct = `
                            <li class="column" class = "data-product-id-${data.product_id}" data-product-id="${data
                                .product_id}">
                            <div class="row">
                                <div class="col-md-12">
                                <div style="width: 50px;height: 50px; display: flex">
                                    ${(data.main_pair) ? `<img style="max-width: 100%; margin-right: 35px;" src='${data.main_pair.detailed.https_image_path}' />` : ``}
                                     ${(data.image_file) ? `<div class='select2-result-repository__avatar'><img src='${data.image_file}' /></div>` : ``}
                                    <div class="button-delete-prd">
                                        <button type="button" class="btn btn-danger button-edit-product"
                                        onclick="removeProducts({{$id}},${data.product_id}, this)">
                                            <i class="fa fa-times" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div style="position: absolute;top: 20px;left: 100px;">
                                        ${data.product} <strong>(${data.company})</strong> - ${data.product_code} - ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                                    </div>

                                </div>
                            </div>
                         </li>`;
                            $(`#columns-{{$id}}`).append(blockProduct);
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

    /*Dropzone.options.myDropzone  =
    {
        url: "/import_products",
        uploadMultiple: false,
        acceptedFiles: ".xlsx",
        maxFiles: 1,
        timeout: 60000,
        init: function() {
            this.on("maxfilesexceeded", function() {
                if (this.files[1]!=null){
                    this.removeFile(this.files[0]);
                }
            });
        },
        success: function (file, response) {
            this.removeFile(this.files[0]);
            if(response.status == 300 && response.file) {
                window.location.href = '/storage/'+response.file
            }
            if(response.status == 200 && response.data) {
                console.log({{$id}}, this)
                if(response.data && response.data.length > 0) {
                    let data_s = response.data
                    $.each(data_s, function (index, data) {
                        let vl = $(`#list-product-{{$id}}`).val().split(",");
                        if ($(`#list-product-{{$id}}`).val() != "" && $.inArray(data.product_id, vl) > -1) return false;

                        $(`#list-product-{{$id}}`).val($(`#list-product-{{$id}}`).val() + "," + data.product_id);
                        let objProduct = {
                            id: data.product_id,
                            name: data.product ? data.product : '',
                            code: data.product_code ? data.product_code : '',
                            image: data.main_pair ? data.main_pair.detailed.image_path : '',
                            price: data.price,
                            promotion_price: data.list_price ? data.list_price : '',
                            url: urlCscart_{{$id}}+ "index.php?dispatch=products.view&product_id=" + data.product_id
                        }
                        dataProduct_{{$id}}.data.push(objProduct)
                        $(`#data-product-{{$id}}`).val(JSON.stringify(dataProduct_{{$id}}));
                        let blockProduct = `
                            <li class="column" class = "data-product-id-${data.product_id}" data-product-id="${data
                            .product_id}">
                            <div class="row">
                                <div class="col-md-12">
                                <div style="width: 50px;height: 50px; display: flex">
                                    ${(data.main_pair) ? `<img style="max-width: 100%; margin-right: 35px;" src='${data.main_pair.detailed.https_image_path}' />` : ``}
                                     ${(data.image_file) ? `<div class='select2-result-repository__avatar'><img src='${data.image_file}' /></div>` : ``}
                                    <div class="button-delete-prd">
                                        <button type="button" class="btn btn-danger button-edit-product"
                                        onclick="removeProducts({{$id}},${data.product_id}, this)">
                                            <i class="fa fa-times" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div style="position: absolute;top: 20px;left: 100px;">
                                        ${data.product} <strong>(${data.company})</strong> - ${data.product_code} - ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                                    </div>

                                </div>
                            </div>
                         </li>`;
                        $(`#columns-{{$id}}`).append(blockProduct);
                    });
                    alert('Import sản phẩm thành công.')
                    return true;
                } else {
                    alert('Dữ liệu trống.')
                }
            }
        },
        error: function (file, response) {
            this.removeFile(this.files[0]);
            console.log(file,response);
            return false;
        }
    };*/
</script>

