import $ from "jquery";

window.removeProducts = function (idBlock, idProduct,el) {
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

export function excuseProduct(child, element) {
    let idPrd = $('.canvas>.child').length;
    let select2 = $(`<div id="parent-${idPrd}"><div class="form-group">
                        <label for="tag_list-${idPrd}">products:</label>
                        <select id="tag_list-${idPrd}" class="form-control" style="width: 50%"></select>
                        </div></div>
                       `);
    child.html(`<div class='product' id="block-prd-${idPrd}"></div>
                            <input type="hidden" id="list-product-${idPrd}" >
                            <input type="hidden" class="block-data" name="data-product-${idPrd}" id="data-product-${idPrd}" >
                             <ul id="columns-${idPrd}" class="parent-column"></ul>
                         `);
    child.append(select2);
    $(element).append(child);
    $(`#columns-${idPrd}`).hover(function () {
        $(".canvas").addClass('canvas1');
        $(".canvas1").removeClass("canvas");
    }, function () {
        $(".canvas1").addClass('canvas');
    });
    $(`#tag_list-${idPrd}`).select2({
        placeholder: "Choose product...",
        minimumInputLength: 1,
        ajax: {
            url: $("#url_cscart").val() + "api/products?status[]=A&company_info=1&only_vendor_product=1&pcode_from_q=Y",
            headers: {
                "Authorization": $("#authorization_v2").val()
            },
            dataType: 'json',
            data: function (params) {
                return {
                    q: $.trim(params.term),

                };
            },
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
            let container = `<div class='select2-result-repository clearfix'>
                    <div class='select2-result-repository__avatar'><img src='${data.main_pair.detailed.https_image_path}' /></div>
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
            console.log(data);
            if (!data.id) return false;
            let vl = $(`#list-product-${idPrd}`).val().split(",");
            if ($(`#list-product-${idPrd}`).val() != "" && $.inArray(data.id, vl) > -1) return false;

            $(`#list-product-${idPrd}`).val($(`#list-product-${idPrd}`).val() + "," + data.id);

            let dataHidden = $(`#data-product-${idPrd}`).val();
            let dataProduct = {
                type: "product",
                productInRows: 5,
                data: []
            }
            if (dataHidden !== "") {
                dataProduct = JSON.parse(dataHidden);
            }

            let obj = {
                id: data.id,
                name: data.product,
                code: data.product_code,
                image: data.main_pair.detailed.image_path,
                price: data.price
            }
            dataProduct.data.push(obj)
            $(`#data-product-${idPrd}`).val(JSON.stringify(dataProduct));


            // console.log($(`#list-product-${idPrd}`).val());
            let blockProduct = `
                    <li class="column" class = "data-product-id-${data.id}" data-product-id="${data.id}">
                    <div><img src='${data.main_pair.detailed.https_image_path}' /> ${data.product} - ${data.product_code} - ${data.price}
                    <button type="button" class="btn btn-danger" onclick="removeProducts(${idPrd},${data.id}, this)">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
                 </li>`;
            $(`#columns-${idPrd}`).append(blockProduct);
            $(".parent-column").sortable({
                update: function (event, ui) {
                    let dataTemp = [];
                    let hiddenTag = $(this).prev();
                    let jsonData = JSON.parse(hiddenTag.val())

                    $(this).children("li").each(function () {
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
        }
    });
    $(".canvas").css("width", "auto");
}
