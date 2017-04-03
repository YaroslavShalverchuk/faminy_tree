var familyTree = new FamilyTree();
$(document).ready(function(){
  familyTree.init();
})


function FamilyTree() {
    this.draw = new DrawTree();
    this.owner = false;
    this.persons = [];
    this.current_person = [];

    this.init = function() {
        this.draw.init('canvas');
        this.draw.tree = this;

        this.setButtons();
    }


    this.setButtons = function() {
        $('#datetimepicker1').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: new Date('01/01/1991'),
            allowInputToggle : true,
        });

        $("#add_new_tree").on('click', function() {
            $("#new_user_modal").modal({
                backdrop: 'static',
                keyboard: false,
            });
            $("#family_type").hide();
        });
    };

    this.addNewUser = function(form_name) {
      $("#new_user_modal").modal('hide');
      $("#family_type").show();

      this.owner = this.getFormData(form_name);
      this.draw.drawOwner(this.owner);
      this.persons.push(this.owner);

    };


    this.getFormData = function (form) {
        let self = this;
        let data = {};
        let formElem =  $('#' + form);

        formElem.find('input[type=text], input[type=email], input[type=password], select').each(function () {
            data[$(this).attr('name')] = $(this).val();
        });

        formElem.find('textarea').each(function () {
            data[$(this).attr('name')] = $(this).val();
        });

        formElem.find('input[type=checkbox]').each(function () {
            data[$(this).attr('name')] = $(this).prop('checked');
        });

        self.clearForm();
        return data;
    };

    this.clearForm = function (form) {
        $("#" + form).find('input').val('');
    }

}
