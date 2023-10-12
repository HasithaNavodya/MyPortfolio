document.getElementById("btnCustomer").addEventListener("click", function(){

    document.getElementById("customer").style.display="block";
    document.getElementById("order").style.display="none";
    document.getElementById("item").style.display="none";
    document.getElementById("placeORder").style.display="none";

});


$("#btnCustSave111").click(function () {

    if(checkEmpty()){
        custId=$('#CustID').val();
        let CustName=$('#CustName').val();
        let CustAddress=$('#CustAddress').val();
        let contact=$('#CustContact').val();

        let tr = $('<tr> <td>'+custId+'</td> <td>'+CustName+'</td> <td>'+CustAddress+'</td> <td>'+contact+'</td></tr>');

        let number = cutomerList.push({id:custId , name:CustName , address:CustAddress , con:contact});

        //set the row to the table body
        // tBody.append(tr);
        $('#tableCustomerBody').append(tr);
        if(number>0){

            //set customer ids into place order
            let selectCustomerId = document.getElementById("custIds");
            let option = document.createElement("option");

            // $('CustID').val(cusId);
            option.value=custId;
            option.text = custId;
            selectCustomerId.append(option);

            alert("Customer Added");
            $("#CustAddress").css("border-color", "grey");
            $("#CustContact").css("border-color", "grey");$
            ("#CustName").css("border-color", "grey");
            clearfeildCust();
            incrementCusId(custId);
            $('#btnCustSave111').prop("disabled", true);
            $('#btnUpdateCust').prop("disabled", true);
            $('#btnDelteCust').prop("disabled", true);
        }
    }



});
function clearfeildCust(){

    $('#CustName').val("");
    $('#CustAddress').val("");
    $('#CustContact').val("");
    $('#CustID').focus();
}

$("#customerTable").dblclick(function (event){

    console.log("Ebuwa table");
    selectedTable=event.target.closest("tr");
    findIndex = cutomerList.findIndex(cutomerList => cutomerList.id === selectedTable.cells[0].textContent);

    $('#CustID').val(selectedTable.cells[0].textContent);
    $('#CustName').val(selectedTable.cells[1].textContent);
    $('#CustAddress').val(selectedTable.cells[2].textContent);
    $('#CustContact').val(selectedTable.cells[3].textContent);

    $('#btnCustSave111').prop("disabled", true);
    $('#btnUpdateCust').prop("disabled", true);
    $('#btnDelteCust').prop("disabled", false);

});




$('#btnUpdateCust').click(function (event){

    if(checkEmpty()){
        let custId=$('#CustID').val();
        let CustName=$('#CustName').val();
        let CustAddress=$('#CustAddress').val();
        let contact=$('#CustContact').val();

        selectedTable.cells[0].textContent=custId;
        selectedTable.cells[1].textContent=CustName;
        selectedTable.cells[2].textContent=CustAddress;
        selectedTable.cells[3].textContent=contact;

        cutomerList[findIndex].id=custId;
        cutomerList[findIndex].name=CustName;
        cutomerList[findIndex].address=CustAddress;
        cutomerList[findIndex].con=contact;
        alert("Customer Updated");

        clearfeildCust();
        incrementCusId(cutomerList[cutomerList.length-1].id);

    }


});

$('#btnDelteCust').click(function (event){


    let selectItemId = document.getElementById("custIds");

    let optionToRemove = selectItemId.querySelector('option[value="' + cutomerList[findIndex].id + '"]');
    if (optionToRemove) {
        optionToRemove.remove();
    }





    alert("Customer Deleted");
    selectedTable.remove();

    cutomerList.splice(findIndex,1);
    clearfeildCust();
    incrementCusId(cutomerList[cutomerList.length-1].id);
});

//  Validation    Validation  Validation    Validation  Validation
function incrementCusId(currentID) {
    if (currentID==='C00-NaN'){
        custId='C00-001';
    }else {
        let number =parseInt(currentID.slice(4), 10);
        number++;
        custId = "C00-" + number.toString().padStart(3, "0");
        $('#CustID').val(custId);
        console.log(custId);

    }


}




$('#btnCustSave111').prop("disabled", true);
$('#btnUpdateCust').prop("disabled", true);
$('#btnDelteCust').prop("disabled", true);



function checkCustId(){

    let val = $('#CustID').val();
    cutomerList.forEach(function(customer) {
        if(customer.id==val){
            $('#btnCustSave111').prop("disabled", true);
            $('#btnUpdateCust').prop("disabled", false);
            $('#btnDelteCust').prop("disabled", true);
        }
    });
}


function nameRegex(name){
    var namePattern = new RegExp(/^[A-Za-z\s]+$/);

// Test a string against the regex pattern
    var name = $('#CustName').val();
    if (namePattern.test(name)) {
        $("#CustName").css("border-color", "green");
        $('#CustAddress').prop("disabled", false);
        $('#CustContact').prop("disabled", false);

        $('#btnCustSave111').prop("disabled", false);
        $('#btnUpdateCust').prop("disabled", true);
        $('#btnDelteCust').prop("disabled", true);

        checkCustId();
    } else {
        $("#CustName").css("border-color", "red");
        $('#CustAddress').prop("disabled", true);
        $('#CustContact').prop("disabled", true);

        $('#btnCustSave111').prop("disabled", true);
        $('#btnUpdateCust').prop("disabled", true);
        $('#btnDelteCust').prop("disabled", true);
    }

}

function contactRegex(contact){
    var contactPattern = new RegExp(/^(?:\+?94)?(?:0|94)(?:[123456789])[0-9]{8}$/);

// Test a string against the regex pattern
    var contact = $('#CustContact').val();
    if (contactPattern.test(contact)) {
        $("#CustContact").css("border-color", "green");
        $('#CustAddress').prop("disabled", false);
        $('#CustName').prop("disabled", false);

        $('#btnCustSave111').prop("disabled", false);
        $('#btnUpdateCust').prop("disabled", true);
        $('#btnDelteCust').prop("disabled", true);

        checkCustId();
    } else {
        $("#CustContact").css("border-color", "red");
        $('#CustAddress').prop("disabled", true);
        $('#CustName').prop("disabled", true);

        $('#btnCustSave111').prop("disabled", true);
        $('#btnUpdateCust').prop("disabled", true);
        $('#btnDelteCust').prop("disabled", true);
    }

}



$(document).ready(function() {
    $("#CustName").on("keyup", function(event) {
        var nameForReg=$('#CustName');
        nameRegex(nameForReg);
    });
});

$(document).ready(function() {

    $("#CustContact").on("keyup", function(event) {
        var conForReg=$('#CustContact');
        contactRegex(conForReg);
    });
});

function checkEmpty(){
    var b=true;
    if($("#CustName").val()==""){
        $("#CustName").css("border-color", "red");
        b=false;
    }
    if($("#CustAddress").val()==""){
        $("#CustAddress").css("border-color", "red");
        b=false;
    }
    if($("#CustContact").val()==""){
        $("#CustContact").css("border-color", "red");
        b=false;
    }
    return b;
}