// ==========================================
// SUPABASE DEBUG TEST
// ==========================================

const SUPABASE_URL = "https://psfmvozmxfsmjgdhncep.supabase.co/rest/v1";

const SUPABASE_KEY =
    "sb_publishable_CgaBKkzw6pj9ulOqM2wbxQ_3nT1P6-y";


const output =
    document.getElementById("output");

const debug =
    document.getElementById("debug");


function log(message, data = null) {

    const time =
        new Date().toLocaleTimeString();

    let text =
        `[${time}] ${message}`;

    if (data !== null) {

        if (typeof data === "object") {

            text +=
                "\n" +
                JSON.stringify(
                    data,
                    null,
                    2
                );

        } else {

            text +=
                "\n" +
                data;
        }
    }

    debug.textContent +=
        "\n" + text;

    console.log(message, data);
}


function status(message) {

    output.textContent =
        message;
}


// ==========================================
// 1. TEST JAVASCRIPT
// ==========================================

log(
    "SCRIPT.JS เริ่มทำงาน"
);


// ==========================================
// 2. TEST CONNECTION
// ==========================================

async function testConnection() {

    status(
        "กำลังทดสอบการเชื่อมต่อ..."
    );

    log(
        "เริ่มทดสอบ Supabase"
    );


    log(
        "SUPABASE URL:",
        SUPABASE_URL
    );


    try {

        const url = `${SUPABASE_URL}/students?select=*`;

        log(
            "REQUEST URL:",
            url
        );


        const response =
            await fetch(
                url,
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


        log(
            "HTTP STATUS:",
            response.status
        );


        log(
            "RESPONSE:",
            text
        );


        if (!response.ok) {

            status(
                "❌ เชื่อมต่อไม่สำเร็จ"
            );

            log(
                "ERROR จาก Supabase"
            );

            return;
        }


        status(
            "✅ เชื่อมต่อ Supabase สำเร็จ"
        );


        log(
            "SUCCESS: SELECT ทำงานได้"
        );

    }

    catch (error) {

        status(
            "❌ JavaScript / Network Error"
        );

        log(
            "ERROR:",
            error.message
        );
    }
}


// ==========================================
// 3. TEST INSERT
// ==========================================

async function saveStudent() {

    status(
        "กำลังทดสอบ INSERT..."
    );


    log(
        "เริ่ม INSERT"
    );


    const student = {

        first_name:
            "Debug",

        last_name:
            "Test",

        student_number:
            "DEBUG-" +
            Date.now(),

        score:
            99,

        grade:
            "A"
    };


    log(
        "ข้อมูลที่จะส่ง:",
        student
    );


    try {

        const url =
            `${SUPABASE_URL}/rest/v1/students`;


        log(
            "POST URL:",
            url
        );


        const response =
            await fetch(
                url,
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
                        JSON.stringify(
                            student
                        )
                }
            );


        const text =
            await response.text();


        log(
            "INSERT HTTP STATUS:",
            response.status
        );


        log(
            "INSERT RESPONSE:",
            text
        );


        if (!response.ok) {

            status(
                "❌ INSERT ไม่สำเร็จ"
            );

            return;
        }


        status(
            "✅ INSERT สำเร็จ"
        );


        log(
            "INSERT สำเร็จ!"
        );


        // โหลดข้อมูลหลัง INSERT

        await testConnection();

    }

    catch (error) {

        status(
            "❌ Network Error"
        );

        log(
            "INSERT ERROR:",
            error.message
        );
    }
}


// ==========================================
// 4. LOAD DATA
// ==========================================

async function loadStudents() {

    log(
        "เริ่ม LOAD STUDENTS"
    );

    await testConnection();

}


// ==========================================
// BUTTONS
// ==========================================

document
    .getElementById("testBtn")
    .addEventListener(
        "click",
        testConnection
    );


document
    .getElementById("saveBtn")
    .addEventListener(
        "click",
        saveStudent
    );


document
    .getElementById("refreshBtn")
    .addEventListener(
        "click",
        loadStudents
    );
