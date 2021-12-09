

function guardarInformacionUsuarios() {
    let var2 = {
        id: parseInt($("#identification").val()),
        identification: $("#identification").val(),
        name: $("#name").val(),
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email:$("#email").val(),
        password: $("#password").val(),
        zone:$("#zone").val(),
        type:$("#type").val()
    };

    $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: "http://localhost:8080/api/user/new",


            success: function (response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Cuenta creada de forma correcta");
                window.location.href="/listadoUsers.html"

            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No fue posible crear el producto");


            }
        }
    );
}

function actualizarInformacionUsuarios() {

    if (!$('#id').val()) {
        alert('Debes ingresar una identificacion');
        return;
    }
    var elemento = {
        id: parseInt($("#identification").val()),
        identification: $("#identification").val(),
        name: $("#name").val(),
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        zone: $("#zone").val(),
        type: $("#type").val()
        
    }

    var dataToSend = JSON.stringify(elemento);
    //JSON= JavaScript Object Notation
    $.ajax({
        type: "PUT",
        url: 'http://localhost:8080/api/user/update',
        dataType: "text",
        async: false,
        data: dataToSend,
        contentType: "application/json; charset=utf-8",

        success: function (response) {

            $("#miResultado").empty();
            $("#id").val();
            $("#identification").val();
            $("#name").val();
            $("#address").val();
            $("#cellPhone").val();
            $("#email").val();
            $("#password").val();
            $("#zone").val();
            $("#type").val();

            alert("Usuario editado");
            window.location.href = '\listadoUsers.html'
        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

    disableCreate = (id) => {
        return ($('#' + id).val() != '') ? true : false;
    }

    disableUpdate = (id) => {
        return ($('#' + id).val() != '') ? false : true;
    }

}


function obtenerItemEspecificoUsuarios(idItem) {
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8080/api/user/' + idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);



            var item = response;
            $("#id").val(item.id);
            $("#identification").val(item.identification);
            $("#name").val(item.name);
            $("#address").val(item.address);
            $("#cellPhone").val(item.cellPhone);
            $("#email").val(item.email);
            $("#password").val(item.password);
            $("#zone").val(item.zone);
            $("#type").val(item.type);
            

            $("#buttonSave").attr('disabled', true);
            $("#buttonUpdate").attr('disabled', false);


        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


$(document).ready(
    () => {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var userId = url.searchParams.get("userId");
        if (userId) {
            obtenerItemEspecificoUsuarios(userId);
        }
    }
);
