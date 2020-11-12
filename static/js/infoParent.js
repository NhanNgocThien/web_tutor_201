//Custom function
function passDataIntoFormDB() {
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "application/controllers/infoParent.php?get_data_db=true";
    ajax.open(method, url, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var obj = JSON.parse(this.responseText)['parent'];
            for (var key in obj) {
                localStorage.setItem(key, obj[key]);
                if (document.getElementById("edit_parent_" + key)) {
                    document.getElementById("edit_parent_" + key).value = obj[key];
                }
            }

            var genderValue = obj['gender'];
            var gender = document.getElementsByName("gender");
            if (genderValue == "M") {
                gender[0].checked = true;
            } else if (genderValue == "F") {
                gender[1].checked = true;
            }

            if (JSON.parse(this.responseText)['avatar_user'] != '')
                document.getElementById("avatar_user").src = JSON.parse(this.responseText)['avatar_user'];
            localStorage.setItem("avatar", document.getElementById("avatar_user").src);

            document.getElementById("parent_username").innerText = JSON.parse(this.responseText)['username'];
        }
    };
}

function getAllDataInForm() {

    var allInputData = {};
    allInputData['id'] = localStorage.getItem('user_id');
    allInputData['parent'] = {};
    allInputData['password'] = document.getElementById("edit_parent_main_pass").value;

    allInputData['parent']['first_name'] = document.getElementById("edit_parent_fname").value;
    allInputData['parent']['last_name'] = document.getElementById("edit_parent_lname").value;
    allInputData['parent']['email'] = document.getElementById("edit_parent_check_email").value;
    allInputData['parent']['phone_number'] = document.getElementById("edit_parent_phone_number").value;
    var gender = (document.getElementById("edit_parent_gender_male").value == 'male') ? 'M' : 'F';
    allInputData['parent']['gender'] = gender;

    return allInputData;
}

function passDataIntoFormStorage() {

    var edit_parent_fnameValue = localStorage.getItem("fname");
    document.getElementById("edit_parent_fname").value = edit_parent_fnameValue;

    var edit_parent_lnameValue = localStorage.getItem("lname");
    document.getElementById("edit_parent_lname").value = edit_parent_lnameValue;

    var emailValue = localStorage.getItem("check_email");
    document.getElementById("edit_parent_check_email").value = emailValue;

    var phoneValue = localStorage.getItem("phone_number");
    document.getElementById("edit_parent_phone_number").value = phoneValue;

    var phoneValue = localStorage.getItem("birth");
    document.getElementById("edit_parent_birth").value = phoneValue;

    var genderValue = localStorage.getItem("gender");
    var gender = document.getElementsByName("gender");
    if (genderValue == "M") {
        gender[0].checked = true;
    } else {
        gender[1].checked = true;
    }


    // var imgValue = localStorage.getItem("avatar");
    // $('#image').attr('src', imgValue);
}

//Change Button
$(".btnChange").click(function changeData() {
    for (let i = 0; i < document.getElementsByClassName("form-control").length; i++) {
        document.getElementsByClassName("form-control")[i].removeAttribute("disabled");
    }
    document.querySelector(".btnChange").style.display = "none";
    document.querySelector(".btnUpdate").removeAttribute("style");
    document.querySelector(".btnCancel").removeAttribute("style");
    document.querySelector(".btnUpload").removeAttribute("style");
    document.querySelector("#edit_parent_gender_male").removeAttribute("disabled");
    document.querySelector("#edit_parent_gender_female").removeAttribute("disabled");
});

//Update Button
$(".btnUpdate").click(function updateData() {
    document.querySelector(".btnChange").removeAttribute("style");
    document.querySelector(".btnCancel").style.display = "none";
    document.querySelector(".btnUpdate").style.display = "none";
    document.querySelector(".btnUpload").style.display = "none";
    for (let i = 0; i < document.getElementsByClassName("form-control").length; i++) {
        document.getElementsByClassName("form-control")[i].disabled = true;
    }
    document.querySelector("#edit_parent_gender_male").disabled = true;
    document.querySelector("#edit_parent_gender_female").disabled = true;

    var allInputData = getAllDataInForm();
    console.log(allInputData);
    // $.ajax({
    //     type: "POST",
    //     url: "parentInfo.php",
    //     data: { changeData: allInputData },
    //     success: function(data) {
    //         if (data == 'true') {
    //             location.reload();
    //         } else {
    //             passDataIntoFormStorage();
    //             alert("Error while updating data!!!");
    //         }
    //     }
    // });
});

//Cancel Button
$(".btnCancel").click(function cancleUpdateData() {
    document.querySelector(".btnChange").removeAttribute("style");
    document.querySelector(".btnCancel").style.display = "none";
    document.querySelector(".btnUpdate").style.display = "none";
    document.querySelector(".btnUpload").style.display = "none";

    for (let i = 0; i < document.getElementsByClassName("form-control").length; i++) {
        document.getElementsByClassName("form-control")[i].disabled = true;
    }
    document.querySelector("#edit_parent_gender_male").disabled = true;
    document.querySelector("#edit_parent_gender_female").disabled = true;

    passDataIntoFormStorage();
});




$(document).ready(function() {

    passDataIntoFormDB();
});