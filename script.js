```javascript
console.log("SCRIPT.JS STARTED");

// ========================================
// SUPABASE CONFIG
// ========================================

const SUPABASE_URL =
    "https://psfmvozmxfsmjgdhncep.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_CgaBKkzw6pj9ulOqM2wbxQ_3nT1P6-y";


// ========================================
// ELEMENTS
// ========================================

const output = document.getElementById("output");

const saveBtn = document.getElementById("saveBtn");

const refreshBtn = document.getElementById("refreshBtn");


// ========================================
// CHECK PAGE
// ========================================

console.log("Output:", output);
console.log("Save Button:", saveBtn);
console.log("Refresh Button:", refreshBtn);


// ========================================
// SAVE STUDENT
// ========================================

async function saveStudent() {

    console.log("SAVE BUTTON CLICKED");

    output.textContent =
        "กำลังบันทึกข้อมูลไปยัง Supabase...";


    // ข้อมูลทดสอบ
    const student = {

        first_name: "ทดสอบ",

        last_name: "Supabase",

        student_number: "TEST001",

        score: 99,

        grade: "A"
    };


    console.log(
        "ข้อมูลที่จะส่ง:",
        student
    );


    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/students`,
            {

                method: "POST",

                headers: {

                    "apikey":
                        SUPABASE_KEY,

                    "Authorization":
                        `Bearer ${SUPABASE_KEY}`,

                    "Content-Type":
                        "application/json",

                    "Prefer":
                        "return=representation"
                },

                body:
                    JSON.stringify(student)
            }
        );


        const text =
            await response.text();


        console.log(
            "HTTP STATUS:",
            response.status
        );


        console.log(
            "SUPABASE RESPONSE:",
            text
        );


        // ========================================
        // ERROR
        // ========================================

        if (!response.ok) {

            output.textContent =
                "❌ บันทึกไม่สำเร็จ\n\n" +

                "HTTP STATUS: " +
                response.status +

                "\n\n" +

                text;

            return;
        }


        // ========================================
        // SUCCESS
        // ========================================

        output.textContent =
            "✅ บันทึกข้อมูลสำเร็จ\n\n" +

            "HTTP STATUS: " +
            response.status +

            "\n\n" +

            "ข้อมูลจาก Supabase:\n" +

            text;


        // โหลดข้อมูลใหม่
        await loadStudents();

    }

    catch (error) {

        console.error(
            "SAVE ERROR:",
            error
        );


        output.textContent =
            "❌ เกิดข้อผิดพลาด\n\n" +

            error.message;
    }
}


// ========================================
// LOAD STUDENTS
// ========================================

async function loadStudents() {

    console.log("LOAD BUTTON CLICKED");

    output.textContent =
        "กำลังโหลดข้อมูลจาก Supabase...";


    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/students?select=*`,
            {

                method: "GET",

                headers: {

                    "apikey":
                        SUPABASE_KEY,

                    "Authorization":
                        `Bearer ${SUPABASE_KEY}`
                }
            }
        );


        const text =
            await response.text();


        console.log(
            "LOAD HTTP STATUS:",
            response.status
        );


        console.log(
            "LOAD RESPONSE:",
            text
        );


        if (!response.ok) {

            output.textContent =
                "❌ โหลดข้อมูลไม่สำเร็จ\n\n" +

                "HTTP STATUS: " +
                response.status +

                "\n\n" +

                text;

            return;
        }


        const students =
            JSON.parse(text);


        if (students.length === 0) {

            output.textContent =
                "เชื่อมต่อ Supabase สำเร็จ\n\n" +

                "ยังไม่มีข้อมูลในตาราง students";

            return;
        }


        output.textContent =
            "✅ ข้อมูลจาก Supabase\n\n" +

            JSON.stringify(
                students,
                null,
                2
            );

    }

    catch (error) {

        console.error(
            "LOAD ERROR:",
            error
        );


        output.textContent =
            "❌ เกิดข้อผิดพลาด\n\n" +

            error.message;
    }
}


// ========================================
// BUTTON EVENTS
// ========================================

if (saveBtn) {

    saveBtn.addEventListener(
        "click",
        saveStudent
    );

}


if (refreshBtn) {

    refreshBtn.addEventListener(
        "click",
        loadStudents
    );

}


// ========================================
// INITIAL LOAD
// ========================================

loadStudents();


// ========================================
// GLOBAL FUNCTION
// ========================================

window.loadStudents =
    loadStudents;

window.saveStudent =
    saveStudent;
```
