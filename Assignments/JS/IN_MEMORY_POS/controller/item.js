
let selectedRowItem;
let itemIndex;
let table;

document.getElementById("btnItems").addEventListener("click", function (){

    document.getElementById("customer").style.display="none";
    document.getElementById("placeORder").style.display="none";
    document.getElementById("item").style.display="block"
    document.getElementById("order").style.display="none";

});

$('#btnItemAdd').click(function (event){
   if (checkEmptyItem()){
       let itemId=$('#txtItemID').val();
       let itemName=$('#txtItemName').val();
       let itemPrice=$('#txtPrice').val();
       let itemQty=$('#txtQty').val();
       table = document.getElementById("itemBody");
       var row = table.insertRow(table.rows.length);

       let cell1 = row.insertCell(0);
       let cell2 = row.insertCell(1);
       let cell3 = row.insertCell(2);
       let cell4 = row.insertCell(3);
       cell1.innerHTML=itemId;
       cell2.innerHTML=itemName;
       cell3.innerHTML=itemPrice;
       cell4.innerHTML=itemQty;
       let number1 = itemList.push({id:itemId, name:itemName, price:itemPrice, qty:itemQty});
       if(number1>0){
           alert("Item Added Sucefully");
           incrementItemId(itemId);
           clearfeildItem();
           $('#txtItemName').val("");

           $('#btnItemAdd').prop("disabled", true);
           $('#btnItemUpdate').prop("disabled", true);
           $('#btnItemDelete').prop("disabled", true);
       }

       //set Item ids into place order
       let selectItemId = document.getElementById("itemIds");
       let option = document.createElement("option");
       option.value=itemId;
       option.text = itemId;
       selectItemId.append(option);
   }




});
function clearfeildItem(){

    $('#txtItemName').val("FDDAS");
    $('#txtPrice').val("");
    $('#txtQty').val("");
    $('#txtItemID').focus();
}

$("#itemTable").dblclick(function (event){
    selectedRowItem= event.target.closest("tr");
    itemIndex= itemList.findIndex(itemList => itemList.id === selectedRowItem.cells[0].textContent);

    $('#txtItemID').val(selectedRowItem.cells[0].textContent);
    $('#txtItemName').val(selectedRowItem.cells[1].textContent);
    $('#txtPrice').val(selectedRowItem.cells[2].textContent);
    $('#txtQty').val(selectedRowItem.cells[3].textContent);

    $('#btnItemAdd').prop("disabled", true);
    $('#btnItemUpdate').prop("disabled", true);
    $('#btnItemDelete').prop("disabled", false);

});

$("#btnItemUpdate").click(function (event){
    if(checkEmptyItem()){
        let itemId=$('#txtItemID').val();
        let itemName=$('#txtItemName').val();
        let itemPrice=$('#txtPrice').val();
        let itemQty=$('#txtQty').val();



        itemList[itemIndex].id=itemId;
        itemList[itemIndex].name=itemName;
        itemList[itemIndex].price=itemPrice;
        itemList[itemIndex].qty=itemQty;

        selectedRowItem.cells[0].textContent=itemId;
        selectedRowItem.cells[1].textContent=itemName;
        selectedRowItem.cells[2].textContent=itemPrice;
        selectedRowItem.cells[3].textContent=itemQty;
        alert("Item Updated Sucefully");
        clearfeildItem();
        $('#txtItemName').val("");

        $('#btnItemAdd').prop("disabled", true);
        $('#btnItemUpdate').prop("disabled", true);
        $('#btnItemDelete').prop("disabled", true);
        incrementItemId(itemList[itemList.length-1].id);
    }

});

$("#btnItemDelete").click(function (event){

    let selectItemId = document.getElementById("itemIds");

    let optionToRemove = selectItemId.querySelector('option[value="' + itemList[itemIndex].id + '"]');
    if (optionToRemove) {
        optionToRemove.remove();
    }



    itemList.splice(itemIndex,1);
    selectedRowItem.remove();
    alert("Item Deleted Sucefully");
    clearfeildItem();
    $('#txtItemName').val("");

    incrementItemId(itemList[itemList.length-1].id);


});


function clearfeildItem(){

    $('#txtItemNamee').val("");
    $('#txtPrice').val("");
    $('#txtQty').val("");
    $('#txtItemID').focus();
}


//  Validation    Validation  Validation    Validation  Validation
function incrementItemId(currentID) {
    if (currentID==='I00-NaN'){
        itemD='I00-001';
    }else {
        let number =parseInt(currentID.slice(4), 10);
        number++;
        itemD = "I00-" + number.toString().padStart(3, "0");
        $('#txtItemID').val(itemD);
    }


}

$('#btnItemAdd').prop("disabled", true);
$('#btnItemUpdate').prop("disabled", true);
$('#btnItemDelete').prop("disabled", true);

function checkItemId(){

    let val = $('#txtItemID').val();
    itemList.forEach(function(item) {
        if(item.id==val){

            $('#btnItemAdd').prop("disabled", true);
            $('#btnItemUpdate').prop("disabled", false);
            $('#btnItemDelete').prop("disabled", true);

        }
    });
}
function ItemnameRegex(){
    var namePattern = new RegExp(/^[A-Za-z\s]+$/);

// Test a string against the regex pattern
    var name = $('#txtItemName').val();
    if (namePattern.test(name)) {
        $("#txtItemName").css("border-color", "green");
        $('#txtPrice').prop("disabled", false);
        $('#txtQty').prop("disabled", false);

        $('#btnItemAdd').prop("disabled", false);
        $('#btnItemUpdate').prop("disabled", true);
        $('#btnItemDelete').prop("disabled", true);

        checkItemId();
    } else {
        $("#txtItemName").css("border-color", "red");
        $('#txtPrice').prop("disabled", true);
        $('#txtQty').prop("disabled", true);

        $('#btnItemAdd').prop("disabled", true);
        $('#btnItemUpdate').prop("disabled", true);
        $('#btnItemDelete').prop("disabled", true);
    }

}
$(document).ready(function() {

    $("#txtItemName").on("keyup", function(event) {

        ItemnameRegex();
    });
});

$(document).ready(function() {

    $("#txtPrice").on("keyup", function(event) {
        if($('#txtPrice').val()>20000){
            $("#txtPrice").css("border-color", "red");
            $('#txtItemName').prop("disabled", true);
            $('#txtQty').prop("disabled", true);

            $('#btnItemAdd').prop("disabled", true);
            $('#btnItemUpdate').prop("disabled", true);
            $('#btnItemDelete').prop("disabled", true);
        }else {
            $("#txtPrice").css("border-color", "green");
            $('#txtPrice').prop("disabled", false);
            $('#txtQty').prop("disabled", false);
            $('#txtItemName').prop("disabled", false);

            $('#btnItemAdd').prop("disabled", false);
            $('#btnItemUpdate').prop("disabled", true);
            $('#btnItemDelete').prop("disabled", true);

        }
    });
});

$(document).ready(function() {

    $("#txtQty").on("keyup", function(event) {
        if($('#txtQty').val()>100000){
            $("#txtQty").css("border-color", "red");
            $('#txtItemName').prop("disabled", true);
            $('#txtPrice').prop("disabled", true);

            $('#btnItemAdd').prop("disabled", true);
            $('#btnItemUpdate').prop("disabled", true);
            $('#btnItemDelete').prop("disabled", true);
        }else {
            $("#txtQty").css("border-color", "green");
            $('#txtQty').prop("disabled", false);
            $('#txtPrice').prop("disabled", false);
            $('#txtItemName').prop("disabled", false);

            $('#btnItemAdd').prop("disabled", false);
            $('#btnItemUpdate').prop("disabled", true);
            $('#btnItemDelete').prop("disabled", true);

        }
    });
});
function checkEmptyItem(){
    var b=true;
    if($("#txtItemName").val()==""){
        $("#txtItemName").css("border-color", "red");
        b=false;
    }
    if($("#txtPrice").val()==""){
        $("#txtPrice").css("border-color", "red");
        b=false;
    }
    if($("#txtQty").val()==""){
        $("#txtQty").css("border-color", "red");
        b=false;
    }
    return b;
}