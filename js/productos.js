

function guardarInformacionProductos() {
    let var2 = {
        id: parseInt($("#reference").val()),
        reference: $("#reference").val(),
        brand: $("#brand").val(),
        category: $("#category").val(),
        presentation: $("#presentation").val(),
        description:$("#description").val(),
        availability: $("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("photography").val()
    };

    $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: "http://localhost:8080/api/fragance/new",


            success: function (response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Cuenta creada de forma correcta");
                window.location.reload()

            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No fue posible crear la cuenta");


            }
        }
    );
}

function actualizarInformacionProductos() {

    if (!$('#id').val()) {
        alert('Debes ingresar una referencia');
        return;
    }
    var elemento = {
        id: parseInt($("#reference").val()),
        reference: $("#reference").val(),
        brand: $("#brand").val(),
        category: $("#category").val(),
        presentation: $("#presentation").val(),
        description:$("#description").val(),
        availability: $("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("photography").val()
        
    }

    var dataToSend = JSON.stringify(elemento);
    //JSON= JavaScript Object Notation
    $.ajax({
        type: "PUT",
        url: 'http://localhost:8080/api/fragance/update',
        dataType: "text",
        async: false,
        data: dataToSend,
        contentType: "application/json; charset=utf-8",

        success: function (response) {

            $("#miResultado").empty();
            $("#id").val();
            $("#reference").val();
            $("#brand").val();
            $("#category").val();
            $("#presentation").val();
            $("#description").val();
            $("#availability").val();
            $("#price").val();
            $("#quantity").val();
            $("#photograohy").val();

            alert("Producto editado");
            window.location.href = '\listadoProductos.html'
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


function obtenerItemEspecificoProductos(idItem) {
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8080/api/fragance/' + idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);



            var item = response;
            $("#id").val(item.id);
            $("#reference").val(item.reference);
            $("#brand").val(item.brand);
            $("#category").val(item.category);
            $("#presentation").val(item.presentation);
            $("#description").val(item.description);
            $("#availability").val(item.availability);
            $("#price").val(item.price);
            $("#quantity").val(item.quantity);
            $("#photograohy").val(item.photography);
                       

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
        var productosId = url.searchParams.get("productosId");
        if (productosId) {
            obtenerItemEspecificoProductos(productosId);
        }
    }
);
