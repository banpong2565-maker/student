console.log("SCRIPT.JS STARTED");

alert("script.js ทำงานแล้ว");

const output = document.getElementById("output");

output.textContent = "JavaScript ทำงานแล้ว";


document.getElementById("saveBtn").addEventListener("click", function () {

    output.textContent = "กดปุ่มบันทึกสำเร็จ";

    console.log("SAVE BUTTON CLICKED");

});


document.getElementById("refreshBtn").addEventListener("click", function () {

    output.textContent = "กดปุ่ม Load Students สำเร็จ";

    console.log("LOAD BUTTON CLICKED");

});
