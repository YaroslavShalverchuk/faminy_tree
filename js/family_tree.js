var familyTree = new FamilyTree();
$(document).ready(function(){
  familyTree.init();
})


function FamilyTree() {
    this.draw = new DrawTree();

    this.init = function() {
        this.draw.init('canvas');
        this.setButtons();
    }


    this.setButtons = function() {
        $('#datetimepicker1').datetimepicker();

        $("#add_new_tree").on('click', function(){
          $("#new_user_modal").modal();
        });
    }


    this.addNewUser = function(form_name) {
      $("#new_user_modal").modal('hide');
      console.log($("#" + form_name));
    }

}
