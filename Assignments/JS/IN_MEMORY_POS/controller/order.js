var tot;

$("#btnAddToCart").prop("disabled", true);

document.getElementById("btnOrder").addEventListener("click", function(){
    document.getElementById("customer").style.display="none";
    // document.getElementById("item").style.display="none";
    document.getElementById("item").style.display="none";
    document.getElementById("placeORder").style.display="block";
    document.getElementById("order").style.display="none";

});

function getSelectedCustID() {

    var selectCustomerID = document.getElementById("custIds");
    var selectedCustId = selectCustomerID.value;
    cutomerList.forEach(function(customer) {
        if (customer.id==selectedCustId){
            $('#custNameRst').val(customer.name);
        }
    });
}
var selectedItemId;
function getSelectedItemID() {

    var selectItemID = document.getElementById("itemIds");
    selectedItemId = selectItemID.value;
    itemList.forEach(function(item) {
        if (item.id==selectedItemId){
            $('#custItemRst').val(item.name);


            $('#txtPriceRst').val(item.price);

            $('#txtQytRst').val(item.qty);

        }
    });
}
$("#btnAddToCart").click(function (event){
    tot=0;
    table = document.getElementById("tblPlaceOrderBody");
    var selectItemID = document.getElementById("itemIds");

    let pr =parseInt($('#txtPriceRst').val());
    var itemExists = false;
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var cellValue = row.cells[0].innerHTML; // Get the value from the first cell (item ID)
        var  qty=parseInt($('#txtQtyOd').val());
        // Check if item ID already exists

        if (cellValue === selectItemID.value) {
            // Update the existing row






            row.cells[2].innerHTML = qty; // Update quantity

            row.cells[4].innerHTML = pr * qty; // Update total price
            // clearTextFeildOrder();
            // tot=tot+(pr * qty);

            // Set the flag to indicate item exists
            itemExists = true;
            // break; // Exit the loop
        }

        tot=tot+parseInt(row.cells[4].innerHTML);
        $('#txtTot').val(tot);
        $('#txtSubTot').val(tot);
    }




    if (!itemExists){
        var  qty=parseInt($('#txtQtyOd').val());
        var itemforTable;

        itemList.forEach(function(item) {
            if (item.id==selectedItemId){
                // item.qty=item.qty-qty;
                itemforTable=item;
            }
        });



        var row = table.insertRow(table.rows.length);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.innerHTML=itemforTable.id;
        cell2.innerHTML=itemforTable.name;
        cell3.innerHTML=qty;
        cell4.innerHTML=itemforTable.price;
        cell5.innerHTML=itemforTable.price*qty;
        tot=tot+parseInt(itemforTable.price*qty);
        $('#txtTot').val(tot);
        $('#txtSubTot').val(tot);

        buttonEdit = document.createElement("button");
        buttonEdit.classList.add("btnEdit");
        buttonEdit.textContent="Edit";
        buttonDelete = document.createElement("button");
        buttonDelete.textContent="Delete";
        buttonDelete.classList.add("btnDelete");
        buttonDelete.id="btnTableDelete"

        clearTextFeildOrder();
        cell6.insertAdjacentElement("beforeend", buttonEdit);
        cell6.insertAdjacentElement("beforeend", buttonDelete);
    }



});

$('#txtDiscount').keydown(function (event){

    if(event.key=="Enter"){
        var dis=parseInt($('#txtDiscount').val());

        $('#txtSubTot').val(tot-dis);
    }

});

//Validation    Validation  Validation  Validation

function clearTextFeildOrder(){
    $('#itemIds').val("Item ID");

// Add the default option to the select element
//     selectElement.appendChild(defaultOption);

    $('#txtQtyOd').val("");
    $('#custItemRst').val("");
    $('#txtQytRst').val("");
    $('#txtPriceRst').val("");

    $('#custNameRst').val("");



}
$(document).ready(function() {

    $("#txtQtyOd").on("keydown", function(event) {
        var qtyStock=parseInt($('#txtQytRst').val());
       var qtyWant= parseInt($("#txtQtyOd").val());

       console.log(typeof qtyStock);
       console.log(typeof qtyWant);
        if(qtyStock<qtyWant ){
            $("#btnAddToCart").prop("disabled", true);
            $("#txtQtyOd").css("border-color", "red");
        }else {

            $("#btnAddToCart").prop("disabled", false);
            $("#txtQtyOd").css("border-color", "green");
        }
    });
});
$('#clearButton').click(function (event){
    clearTextFeildOrder();
});
$('#btnCancel').click(function (event){
    $("#tblPlaceOrderBody").empty();
    $("#txtTot").val("");
    $("#txtSubTot").val("");
    $("#txtDiscount").val("");
});

$(document).on("click", ".btnEdit", function() {
    let closest = $(this).closest("tr");
    let text = closest.find("td:eq(0)").text();
    tot=tot-closest.find("td:eq(4)").text();
    $('#itemIds').val(text);

    itemList.forEach(function(item) {

        if (item.id==text){
            $('#custItemRst').val(item.name);

            // tot=tot-closest.find("td:eq(4)").text();
            $('#txtPriceRst').val(item.price);

            $('#txtQytRst').val(item.qty);

        }

    });
});

$(document).on("click", ".btnDelete", function() {
    let closest1 = $(this).closest("tr");
    // tot=tot-parseInt(closest1.cells[4].textContent);
     tot = tot - parseInt($(closest1).find('td:eq(4)').text());


    $(this).closest("tr").remove();

    $('#txtTot').val(tot);
    $('#txtSubTot').val(tot);
});
let orderID = $('#txtOrderID').val("O00-001");
$('#txtdate').val(new Date().toDateString());
$("#btnPurchase").click(function (event) {
    alert("Ebuwa ");
    let orderID=$('#txtOrderID').val();
    let custIdOrder=$('#custIds').val();
    let totOrder=$('#txtTot').val();
    let disOrder=$('#txtDiscount').val();
    let subTotOrder=$('#txtSubTot').val();

    table = document.getElementById("tblOrderBody");
    var row = table.insertRow(table.rows.length);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    cell1.innerHTML=orderID;
    cell2.innerHTML=custIdOrder;
    cell3.innerHTML=totOrder;
    cell4.innerHTML=disOrder;
    cell5.innerHTML=subTotOrder;
    cell6.innerHTML=new Date().toDateString();
    updateItemLit();
    incrementOrderId(orderID);
    clearTextAfterPurchase();
});
function updateItemLit(){
    var rowCount = $("#tblPlaceOrderBody tr").length;
    var table = document.getElementById("tblPlaceOrderBody");
    var tableItem = document.getElementById("itemBody");

    // var firstCell = firstRow.cells[0]
    for (var i=0; i<rowCount; i++){
        // var row = table.rows[i].cells[0];


        itemList.forEach(function(item) {
    if (item.id== table.rows[i].cells[0].textContent){
        tableItem.rows[i].cells[3].textContent=item.qty-table.rows[i].cells[2].textContent;
        item.qty=item.qty-table.rows[i].cells[2].textContent;



        // selectedRowItem.cells[0].textContent=itemId;
    }


});
    }
    console.log("Item TIka ",itemList);
}

function incrementOrderId(currentID) {
    if (currentID==='O00-NaN'){
        orderID='O00-001';
    }else {
        let number =parseInt(currentID.slice(4), 10);
        number++;
        orderID = "O00-" + number.toString().padStart(3, "0");
        $('#txtOrderID').val(orderID);


    }
}
function clearTextAfterPurchase(){
    $('#custNameRst').val("");
    $('#custIds').val("Customer ID");
    $('#txtTot').val("");
    $('#txtDiscount').val("");
    $('#txtSubTot').val("");

     $('#tblPlaceOrderBody').empty(); // Replace "myTable" with the actual ID of your table


}