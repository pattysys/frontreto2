function traerInformacionProductos() {
    $.ajax({
        url: "http://localhost:8080/api/fragance/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {
    let myTable = "<table class=\"table\">";
    for(i=0;i <respuesta.length;i++){
        myTable += "<tr>"
            myTable+="<td>"+respuesta[i].reference+"</td>";
            myTable+="<td>"+respuesta[i].brand+"</td>";
            myTable+="<td>"+respuesta[i].category+"</td>";
            myTable+="<td>"+respuesta[i].presentation+"</td>";
            myTable+="<td>"+respuesta[i].description+"</td>";
            myTable+="<td>"+respuesta[i].availibility+"</td>";
            myTable+="<td>"+respuesta[i].price+"</td>";
            myTable+="<td>"+respuesta[i].quantity+"</td>";
            myTable+="<td>"+respuesta[i].photography+"</td>";
            myTable+="<td> <button class=\"btn btn-success\"onclick='redirect("+respuesta[i].id+")'>Editar</button>";
            myTable+="<td> <button class=\"btn btn-danger\" onclick='borrarInformacionProductos("+respuesta[i].id+")'> Eliminar</button>";
    
            myTable += "</tr>";
    }

    myTable+= "</table>";
    $("#lista").html(myTable);


}

redirect = (productosId) => {
    window.location.href = '/productoForm.html?productosId=' + productosId;
};

$(document).ready(
    () => {
        traerInformacionProductos();
    }
);

function borrarInformacionProductos(idElemento) {

    //JSON= JavaScript Object Notation
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8080/api/fragance/' + idElemento,
        type: 'DELETE',
        contentType: 'application/json',

        success: function (response) {
            console.log(response);
            alert("Producto Borrado de la BD");
            window.location.reload()
        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
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

createUser = () => {
    window.location.href = '/productoForm.html';
};

function actualizarInformacionProductos() {

    if (!$('#id').val()) {
        alert('Debes ingresar un Producto');
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

            alert("Usuario editado");
            window.location.reload()
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


