<i class="fa fa-tags banner-icon"></i>
<div class="">

    <h2 class="banner-header">Content</h2>
    <div class='content' id="ct-{{$id}}"></div>
    <button type="button" style="display: none" class="btn btn-contents btn-success edit-content-{{$id}}"
            onclick="editContent('{{$id}}')">
    <span>
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </span>

    </button>
    <button type="button" class="btn btn-success clone-content clone-content-{{$id}}">
        <i class="fa fa-copy"></i>
    </button>
    <button type="button" class="btn btn-danger delete-content delete-content-{{$id}}" data-toggle="modal"
            data-target="#deleteContent-{{$id}}">
        <i class="fa fa-times" aria-hidden="true"></i>
    </button>
    <div class="modal" id="deleteContent-{{$id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
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
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteContent('{{$id}}')">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" class="block-data" name="content-{{$id}}" id="data-content-{{$id}}">
    <div id="parent-{{$id}}"><textarea class="tinymce" id="{{$id}}">{{$description}}</textarea></div>
    <div class="div-save-content">
        <button type="button" class="btn btn-primary btn-save-content" onclick="saveContent('{{$id}}')">
    <span>
      <i class="fa fa-floppy-o" aria-hidden="true"></i>
    </span>
        </button>
    </div>
</div>

<script>
    $(document).ready(function () {
        setTimeout(function () {
            saveContent('{{$id}}');
        }, 2000);
    });
</script>
