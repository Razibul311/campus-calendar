/* =========================================================
   CGPA CALCULATOR
   ---------------------------------------------------------
   FINAL PERSISTENT VERSION

   Features:
   - CGPA calculation
   - Add / Remove course
   - Auto calculation
   - Manual Calculate button
   - Persistent localStorage
   - Refresh safe
   - Capacitor / Android WebView friendly
   - Duplicate initialization protection
   - English / বাংলা
   - Language change support
   - Safe data loading
   - Safe data saving
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       PREVENT DUPLICATE INITIALIZATION
    ====================================================== */

    if (window.__CampusCalendarCgpaInitialized) {

        console.log(
            "⚠️ CGPA Calculator already initialized."
        );

        return;

    }

    window.__CampusCalendarCgpaInitialized = true;


    /* =====================================================
       STORAGE
    ====================================================== */

    const STORAGE_KEY =
        "campusCalendarCgpaCourses";

    const STORAGE_VERSION = 1;


    /* =====================================================
       TRANSLATIONS
    ====================================================== */

    const CGPA_TEXT = {

        en: {

            calculatorTitle:
                "CGPA Calculator",

            addCourse:
                "+ Add Course",

            calculate:
                "Calculate CGPA",

            reset:
                "🗑 Reset",

            totalCredits:
                "Total Credits",

            totalPoints:
                "Total Grade Points",

            cgpa:
                "CGPA",

            coursePlaceholder:
                "Course",

            creditPlaceholder:
                "Credit",

            courseName:
                "Course name",

            courseCredit:
                "Course credit",

            courseGrade:
                "Course grade",

            removeCourse:
                "Remove course",

            resetConfirm:
                "Are you sure you want to reset the CGPA calculator?",

            resetSuccess:
                "CGPA calculator has been reset.",

            saveError:
                "Unable to save CGPA data."

        },


        bn: {

            calculatorTitle:
                "CGPA ক্যালকুলেটর",

            addCourse:
                "+ কোর্স যোগ করুন",

            calculate:
                "CGPA হিসাব করুন",

            reset:
                "🗑 রিসেট",

            totalCredits:
                "মোট ক্রেডিট",

            totalPoints:
                "মোট গ্রেড পয়েন্ট",

            cgpa:
                "CGPA",

            coursePlaceholder:
                "কোর্স",

            creditPlaceholder:
                "ক্রেডিট",

            courseName:
                "কোর্সের নাম",

            courseCredit:
                "কোর্স ক্রেডিট",

            courseGrade:
                "কোর্স গ্রেড",

            removeCourse:
                "কোর্স মুছে ফেলুন",

            resetConfirm:
                "আপনি কি CGPA ক্যালকুলেটর রিসেট করতে চান?",

            resetSuccess:
                "CGPA ক্যালকুলেটর রিসেট করা হয়েছে।",

            saveError:
                "CGPA ডেটা সংরক্ষণ করা যায়নি।"

        }

    };


    /* =====================================================
       INITIALIZATION
    ====================================================== */

    function initCgpaCalculator() {

        const courseList =
            document.getElementById(
                "cgpaCourseList"
            );


        if (!courseList) {

            console.warn(
                "CGPA Calculator: cgpaCourseList not found."
            );

            /*
             * Allow retry if HTML is loaded later.
             */

            window.__CampusCalendarCgpaInitialized =
                false;

            return;

        }


        /* =================================================
           ELEMENTS
        ================================================== */

        const addCourseBtn =
            document.getElementById(
                "addCgpaCourseBtn"
            );


        const calculateBtn =
            document.getElementById(
                "calculateCgpaBtn"
            );


        const resetBtn =
            document.getElementById(
                "resetCgpaBtn"
            );


        const totalCreditsElement =
            document.getElementById(
                "cgpaTotalCredits"
            );


        const totalPointsElement =
            document.getElementById(
                "cgpaTotalPoints"
            );


        const cgpaElement =
            document.getElementById(
                "cgpaValue"
            );


        /* =================================================
           GET LANGUAGE
        ================================================== */

        function getLanguage() {

            try {

                if (
                    typeof state !== "undefined" &&
                    state &&
                    (
                        state.language === "bn" ||
                        state.language === "en"
                    )
                ) {

                    return state.language;

                }

            } catch (error) {

                /*
                 * Ignore
                 */

            }


            const possibleKeys = [

                "language",

                "appLanguage",

                "currentLanguage",

                "selectedLanguage",

                "campusCalendarLanguage"

            ];


            for (
                let i = 0;
                i < possibleKeys.length;
                i++
            ) {

                try {

                    const value =
                        localStorage.getItem(
                            possibleKeys[i]
                        );


                    if (
                        value === "bn" ||
                        value === "en"
                    ) {

                        return value;

                    }

                } catch (error) {

                    /*
                     * Ignore
                     */

                }

            }


            const htmlLang =
                document.documentElement
                    .getAttribute("lang");


            if (
                htmlLang === "bn" ||
                htmlLang === "en"
            ) {

                return htmlLang;

            }


            return "en";

        }


        /* =================================================
           TRANSLATION
        ================================================== */

        function cgpaText(key) {

            const language =
                getLanguage();


            return (

                CGPA_TEXT[language]?.[key] ||

                CGPA_TEXT.en[key] ||

                key

            );

        }


        /* =================================================
           ESCAPE HTML
        ================================================== */

        function escapeHtml(value) {

            return String(value ?? "")

                .replace(
                    /&/g,
                    "&amp;"
                )

                .replace(
                    /</g,
                    "&lt;"
                )

                .replace(
                    />/g,
                    "&gt;"
                )

                .replace(
                    /"/g,
                    "&quot;"
                )

                .replace(
                    /'/g,
                    "&#039;"
                );

        }


        /* =================================================
           SAFE NUMBER
        ================================================== */

        function safeNumber(value) {

            if (
                value === null ||
                value === undefined ||
                value === ""
            ) {

                return 0;

            }


            const number =
                Number(value);


            if (
                !Number.isFinite(number)
            ) {

                return 0;

            }


            return number;

        }


        /* =================================================
           NORMALIZE COURSE
        ================================================== */

        function normalizeCourse(course) {

            if (
                !course ||
                typeof course !== "object"
            ) {

                return {

                    name: "",

                    credit: "",

                    grade: "4.00"

                };

            }


            let grade =
                course.grade;


            /*
             * Old data compatibility
             */

            if (
                grade === undefined ||
                grade === null ||
                grade === ""
            ) {

                grade = "4.00";

            }


            grade =
                String(grade);


            const validGrades = [

                "4.00",
                "3.75",
                "3.50",
                "3.25",
                "3.00",
                "2.75",
                "2.50",
                "2.25",
                "2.00",
                "0.00"

            ];


            if (
                !validGrades.includes(grade)
            ) {

                grade = "4.00";

            }


            return {

                name:
                    course.name !== undefined &&
                    course.name !== null

                        ? String(course.name)

                        : "",

                credit:
                    course.credit !== undefined &&
                    course.credit !== null &&
                    course.credit !== ""

                        ? String(course.credit)

                        : "",

                grade:
                    grade

            };

        }


        /* =================================================
           CREATE COURSE ROW
        ================================================== */

        function createCourseRow(course = {}) {

            const normalized =
                normalizeCourse(course);


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "cgpa-course-row";


            row.innerHTML = `

                <input
                    type="text"
                    class="cgpa-course-name"
                    placeholder="${escapeHtml(
                        cgpaText(
                            "coursePlaceholder"
                        )
                    )}"
                    aria-label="${escapeHtml(
                        cgpaText(
                            "courseName"
                        )
                    )}"
                    value="${escapeHtml(
                        normalized.name
                    )}"
                    autocomplete="off"
                >


                <input
                    type="number"
                    class="cgpa-course-credit"
                    placeholder="${escapeHtml(
                        cgpaText(
                            "creditPlaceholder"
                        )
                    )}"
                    min="0"
                    step="0.5"
                    aria-label="${escapeHtml(
                        cgpaText(
                            "courseCredit"
                        )
                    )}"
                    value="${escapeHtml(
                        normalized.credit
                    )}"
                    inputmode="decimal"
                >


                <select
                    class="cgpa-course-grade"
                    aria-label="${escapeHtml(
                        cgpaText(
                            "courseGrade"
                        )
                    )}"
                >

                    <option value="4.00">
                        A+
                    </option>

                    <option value="3.75">
                        A
                    </option>

                    <option value="3.50">
                        A-
                    </option>

                    <option value="3.25">
                        B+
                    </option>

                    <option value="3.00">
                        B
                    </option>

                    <option value="2.75">
                        B-
                    </option>

                    <option value="2.50">
                        C+
                    </option>

                    <option value="2.25">
                        C
                    </option>

                    <option value="2.00">
                        D
                    </option>

                    <option value="0.00">
                        F
                    </option>

                </select>


                <button
                    type="button"
                    class="cgpa-remove-btn"
                    title="${escapeHtml(
                        cgpaText(
                            "removeCourse"
                        )
                    )}"
                    aria-label="${escapeHtml(
                        cgpaText(
                            "removeCourse"
                        )
                    )}"
                >
                    ×
                </button>

            `;


            courseList.appendChild(
                row
            );


            /* =================================================
               RESTORE GRADE
            ================================================== */

            const gradeSelect =
                row.querySelector(
                    ".cgpa-course-grade"
                );


            if (gradeSelect) {

                gradeSelect.value =
                    normalized.grade;

            }


            return row;

        }


        /* =================================================
           GET ALL COURSES
        ================================================== */

        function getCourses() {

            const rows =
                courseList.querySelectorAll(
                    ".cgpa-course-row"
                );


            return Array.from(
                rows
            ).map(
                function (row) {

                    const nameInput =
                        row.querySelector(
                            ".cgpa-course-name"
                        );


                    const creditInput =
                        row.querySelector(
                            ".cgpa-course-credit"
                        );


                    const gradeInput =
                        row.querySelector(
                            ".cgpa-course-grade"
                        );


                    return {

                        name:
                            nameInput
                                ? nameInput.value.trim()
                                : "",

                        credit:
                            creditInput
                                ? creditInput.value
                                : "",

                        grade:
                            gradeInput
                                ? gradeInput.value
                                : "4.00"

                    };

                }
            );

        }


        /* =================================================
           GET VALID COURSES
        ================================================== */

        function getValidCourses() {

            const courses =
                getCourses();


            return courses.filter(
                function (course) {

                    const credit =
                        safeNumber(
                            course.credit
                        );


                    /*
                     * A row is considered real data
                     * if it has a course name OR
                     * a valid credit.
                     */

                    return (
                        course.name.trim() !== "" ||
                        credit > 0
                    );

                }
            ).map(
                normalizeCourse
            );

        }


        /* =================================================
           SAVE COURSES
        ================================================== */

        function saveCourses() {

            try {

                const courses =
                    getValidCourses();


                /*
                 * IMPORTANT:
                 *
                 * Save only actual course data.
                 *
                 * Empty UI rows are NOT saved.
                 */

                const storageObject = {

                    version:
                        STORAGE_VERSION,

                    courses:
                        courses,

                    updatedAt:
                        Date.now()

                };


                const serialized =
                    JSON.stringify(
                        storageObject
                    );


                localStorage.setItem(
                    STORAGE_KEY,
                    serialized
                );


                /*
                 * Verify immediately.
                 */

                const verification =
                    localStorage.getItem(
                        STORAGE_KEY
                    );


                if (
                    verification !==
                    serialized
                ) {

                    throw new Error(
                        "localStorage verification failed"
                    );

                }


                console.log(
                    "💾 CGPA saved successfully:",
                    courses
                );


                return true;

            }

            catch (error) {

                console.error(
                    "❌ CGPA save failed:",
                    error
                );


                return false;

            }

        }


        /* =================================================
           LOAD COURSES
        ================================================== */

        function loadCourses() {

            let savedCourses =
                [];


            try {

                const saved =
                    localStorage.getItem(
                        STORAGE_KEY
                    );


                console.log(
                    "📦 CGPA stored data:",
                    saved
                );


                if (
                    saved
                ) {

                    const parsed =
                        JSON.parse(
                            saved
                        );


                    /*
                     * NEW FORMAT
                     *
                     * {
                     *   version: 1,
                     *   courses: [...]
                     * }
                     */

                    if (
                        parsed &&
                        typeof parsed === "object" &&
                        Array.isArray(
                            parsed.courses
                        )
                    ) {

                        savedCourses =
                            parsed.courses
                                .filter(
                                    function (course) {

                                        return (
                                            course &&
                                            typeof course ===
                                                "object"
                                        );

                                    }
                                )
                                .map(
                                    normalizeCourse
                                );

                    }


                    /*
                     * OLD FORMAT
                     *
                     * [
                     *   {...},
                     *   {...}
                     * ]
                     */

                    else if (
                        Array.isArray(
                            parsed
                        )
                    ) {

                        savedCourses =
                            parsed
                                .filter(
                                    function (course) {

                                        return (
                                            course &&
                                            typeof course ===
                                                "object"
                                        );

                                    }
                                )
                                .map(
                                    normalizeCourse
                                );

                    }

                }

            }

            catch (error) {

                console.error(
                    "❌ CGPA load failed:",
                    error
                );


                savedCourses =
                    [];

            }


            /*
             * IMPORTANT:
             *
             * Do not save here.
             *
             * Loading must NEVER overwrite
             * existing localStorage data.
             */

            courseList.innerHTML =
                "";


            if (
                savedCourses.length > 0
            ) {

                savedCourses.forEach(
                    function (course) {

                        createCourseRow(
                            course
                        );

                    }
                );

            }

            else {

                createCourseRow();

            }


            calculateCgpa(
                false
            );


            console.log(
                "✅ CGPA loaded:",
                savedCourses.length,
                "courses"
            );

        }


        /* =================================================
           CALCULATE CGPA
        ================================================== */

        function calculateCgpa(
            shouldSave = true
        ) {

            const courses =
                getCourses();


            let totalCredits =
                0;


            let totalPoints =
                0;


            courses.forEach(
                function (course) {

                    const credit =
                        safeNumber(
                            course.credit
                        );


                    const grade =
                        safeNumber(
                            course.grade
                        );


                    /*
                     * Ignore invalid credit.
                     */

                    if (
                        credit <= 0
                    ) {

                        return;

                    }


                    /*
                     * Grade must be between
                     * 0 and 4.
                     */

                    if (
                        grade < 0 ||
                        grade > 4
                    ) {

                        return;

                    }


                    totalCredits +=
                        credit;


                    totalPoints +=
                        credit *
                        grade;

                }
            );


            const cgpa =
                totalCredits > 0

                    ? totalPoints /
                        totalCredits

                    : 0;


            /* =================================================
               UPDATE UI
            ================================================== */

            if (
                totalCreditsElement
            ) {

                totalCreditsElement.textContent =
                    totalCredits.toFixed(
                        1
                    );

            }


            if (
                totalPointsElement
            ) {

                totalPointsElement.textContent =
                    totalPoints.toFixed(
                        2
                    );

            }


            if (
                cgpaElement
            ) {

                cgpaElement.textContent =
                    cgpa.toFixed(
                        2
                    );

            }


            /*
             * Save after user action.
             *
             * But NEVER save during initial load.
             */

            if (
                shouldSave
            ) {

                saveCourses();

            }


            console.log(
                "📊 CGPA:",
                {
                    totalCredits:
                        totalCredits,

                    totalPoints:
                        totalPoints,

                    cgpa:
                        cgpa
                }
            );


            return {

                totalCredits:
                    totalCredits,

                totalPoints:
                    totalPoints,

                cgpa:
                    cgpa

            };

        }


        /* =================================================
           UPDATE LANGUAGE
        ================================================== */

        function updateCgpaLanguage() {

            const language =
                getLanguage();


            const text =
                CGPA_TEXT[language] ||
                CGPA_TEXT.en;


            /* =================================================
               TITLE
            ================================================== */

            const title =
                document.getElementById(
                    "cgpaCalculatorTitle"
                );


            if (title) {

                title.textContent =
                    text.calculatorTitle;

            }


            /* =================================================
               ADD BUTTON
            ================================================== */

            if (
                addCourseBtn
            ) {

                addCourseBtn.textContent =
                    text.addCourse;

            }


            /* =================================================
               CALCULATE BUTTON
            ================================================== */

            if (
                calculateBtn
            ) {

                calculateBtn.textContent =
                    text.calculate;

            }


            /* =================================================
               RESET BUTTON
            ================================================== */

            if (
                resetBtn
            ) {

                resetBtn.textContent =
                    text.reset;

            }


            /* =================================================
               COURSE ROWS
            ================================================== */

            const rows =
                courseList.querySelectorAll(
                    ".cgpa-course-row"
                );


            rows.forEach(
                function (row) {

                    const nameInput =
                        row.querySelector(
                            ".cgpa-course-name"
                        );


                    const creditInput =
                        row.querySelector(
                            ".cgpa-course-credit"
                        );


                    const gradeInput =
                        row.querySelector(
                            ".cgpa-course-grade"
                        );


                    const removeBtn =
                        row.querySelector(
                            ".cgpa-remove-btn"
                        );


                    if (
                        nameInput
                    ) {

                        nameInput.placeholder =
                            text.coursePlaceholder;


                        nameInput.setAttribute(
                            "aria-label",
                            text.courseName
                        );

                    }


                    if (
                        creditInput
                    ) {

                        creditInput.placeholder =
                            text.creditPlaceholder;


                        creditInput.setAttribute(
                            "aria-label",
                            text.courseCredit
                        );

                    }


                    if (
                        gradeInput
                    ) {

                        gradeInput.setAttribute(
                            "aria-label",
                            text.courseGrade
                        );

                    }


                    if (
                        removeBtn
                    ) {

                        removeBtn.title =
                            text.removeCourse;


                        removeBtn.setAttribute(
                            "aria-label",
                            text.removeCourse
                        );

                    }

                }
            );


            /* =================================================
               RESULT LABELS
            ================================================== */

            const resultRows =
                document.querySelectorAll(
                    ".cgpa-calculator-card .cgpa-result-row"
                );


            if (
                resultRows.length >= 2
            ) {

                const firstLabel =
                    resultRows[0]
                        .querySelector(
                            "span"
                        );


                const secondLabel =
                    resultRows[1]
                        .querySelector(
                            "span"
                        );


                if (
                    firstLabel
                ) {

                    firstLabel.textContent =
                        text.totalCredits;

                }


                if (
                    secondLabel
                ) {

                    secondLabel.textContent =
                        text.totalPoints;

                }

            }


            /* =================================================
               FINAL CGPA LABEL
            ================================================== */

            const finalLabel =
                document.querySelector(
                    ".cgpa-calculator-card .cgpa-final span"
                );


            if (
                finalLabel
            ) {

                finalLabel.textContent =
                    text.cgpa;

            }

        }


        /* =================================================
           ADD COURSE
        ================================================== */

        if (
            addCourseBtn
        ) {

            addCourseBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    createCourseRow();


                    /*
                     * Save current rows.
                     *
                     * Existing courses remain safe.
                     */

                    saveCourses();


                    updateCgpaLanguage();


                    console.log(
                        "➕ Course added"
                    );

                }
            );

        }


        /* =================================================
           CALCULATE BUTTON
        ================================================== */

        if (
            calculateBtn
        ) {

            calculateBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    console.log(
                        "🧮 Calculate CGPA clicked"
                    );


                    calculateCgpa(
                        true
                    );

                }
            );

        }


        /* =================================================
           REMOVE COURSE
           -------------------------------------------------
           EVENT DELEGATION
        ================================================== */

        courseList.addEventListener(
            "click",
            function (event) {

                const removeBtn =
                    event.target.closest(
                        ".cgpa-remove-btn"
                    );


                if (
                    !removeBtn
                ) {

                    return;

                }


                event.preventDefault();


                const row =
                    removeBtn.closest(
                        ".cgpa-course-row"
                    );


                if (
                    row
                ) {

                    row.remove();

                }


                let rows =
                    courseList.querySelectorAll(
                        ".cgpa-course-row"
                    );


                /*
                 * Keep one empty row.
                 */

                if (
                    rows.length === 0
                ) {

                    createCourseRow();

                }


                /*
                 * Save immediately.
                 */

                saveCourses();


                calculateCgpa(
                    false
                );


                updateCgpaLanguage();


                console.log(
                    "🗑 Course removed"
                );

            }
        );


        /* =================================================
           AUTO SAVE INPUT
        ================================================== */

        courseList.addEventListener(
            "input",
            function () {

                /*
                 * Calculate and save immediately.
                 */

                calculateCgpa(
                    true
                );

            }
        );


        /* =================================================
           AUTO SAVE CHANGE
        ================================================== */

        courseList.addEventListener(
            "change",
            function () {

                calculateCgpa(
                    true
                );

            }
        );


        /* =================================================
           RESET
        ================================================== */

        if (
            resetBtn
        ) {

            resetBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const confirmed =
                        confirm(
                            cgpaText(
                                "resetConfirm"
                            )
                        );


                    if (
                        !confirmed
                    ) {

                        return;

                    }


                    /*
                     * Remove storage.
                     */

                    try {

                        localStorage.removeItem(
                            STORAGE_KEY
                        );

                    }

                    catch (error) {

                        console.error(
                            "Failed to remove CGPA storage:",
                            error
                        );

                    }


                    /*
                     * Clear UI.
                     */

                    courseList.innerHTML =
                        "";


                    /*
                     * Create one fresh row.
                     */

                    createCourseRow();


                    /*
                     * Reset result.
                     */

                    if (
                        totalCreditsElement
                    ) {

                        totalCreditsElement.textContent =
                            "0.0";

                    }


                    if (
                        totalPointsElement
                    ) {

                        totalPointsElement.textContent =
                            "0.00";

                    }


                    if (
                        cgpaElement
                    ) {

                        cgpaElement.textContent =
                            "0.00";

                    }


                    /*
                     * IMPORTANT:
                     *
                     * Store empty course array.
                     *
                     * The empty UI row is NOT stored.
                     */

                    try {

                        localStorage.setItem(
                            STORAGE_KEY,
                            JSON.stringify({

                                version:
                                    STORAGE_VERSION,

                                courses:
                                    [],

                                updatedAt:
                                    Date.now()

                            })
                        );

                    }

                    catch (error) {

                        console.error(
                            "Failed to save reset state:",
                            error
                        );

                    }


                    updateCgpaLanguage();


                    if (
                        typeof showToast ===
                        "function"
                    ) {

                        try {

                            showToast(
                                cgpaText(
                                    "resetSuccess"
                                )
                            );

                        }

                        catch (error) {

                            /*
                             * Ignore
                             */

                        }

                    }


                    console.log(
                        "🗑 CGPA calculator reset"
                    );

                }
            );

        }


        /* =================================================
           LANGUAGE CHANGE EVENT
        ================================================== */

        document.addEventListener(
            "languageChanged",
            function () {

                updateCgpaLanguage();

            }
        );


        /* =================================================
           LANGUAGE FALLBACK DETECTION
        ================================================== */

        let lastLanguage =
            getLanguage();


        const languageWatcher =
            setInterval(
                function () {

                    const currentLanguage =
                        getLanguage();


                    if (
                        currentLanguage !==
                        lastLanguage
                    ) {

                        lastLanguage =
                            currentLanguage;


                        updateCgpaLanguage();

                    }

                },
                500
            );


        /*
         * Store watcher reference.
         */

        window.__CampusCalendarCgpaLanguageWatcher =
            languageWatcher;


        /* =================================================
           SAVE BEFORE APP GOES TO BACKGROUND
        ================================================== */

        function saveBeforeLeave() {

            try {

                /*
                 * Only save if there is actual
                 * course data.
                 */

                const courses =
                    getValidCourses();


                if (
                    courses.length > 0
                ) {

                    saveCourses();

                    console.log(
                        "💾 CGPA saved before leaving"
                    );

                }

            }

            catch (error) {

                console.error(
                    "CGPA leave-save failed:",
                    error
                );

            }

        }


        /* =================================================
           VISIBILITY CHANGE
        ================================================== */

        document.addEventListener(
            "visibilitychange",
            function () {

                if (
                    document.visibilityState ===
                    "hidden"
                ) {

                    saveBeforeLeave();

                }

            }
        );


        /* =================================================
           PAGE HIDE
        ================================================== */

        window.addEventListener(
            "pagehide",
            function () {

                saveBeforeLeave();

            }
        );


        /* =================================================
           BEFORE UNLOAD
        ================================================== */

        window.addEventListener(
            "beforeunload",
            function () {

                saveBeforeLeave();

            }
        );


        /* =================================================
           PAGE SHOW
        ================================================== */

        window.addEventListener(
            "pageshow",
            function (event) {

                if (
                    event.persisted
                ) {

                    console.log(
                        "🔄 CGPA pageshow reload"
                    );


                    loadCourses();


                    updateCgpaLanguage();

                }

            }
        );


        /* =================================================
           DEBUG FUNCTION
        ================================================== */

        window.debugCgpaStorage =
            function () {

                try {

                    const data =
                        localStorage.getItem(
                            STORAGE_KEY
                        );


                    console.log(
                        "=============================="
                    );

                    console.log(
                        "🔎 CGPA STORAGE"
                    );

                    console.log(
                        "KEY:",
                        STORAGE_KEY
                    );

                    console.log(
                        "RAW:",
                        data
                    );


                    if (
                        !data
                    ) {

                        console.log(
                            "❌ No CGPA data found."
                        );


                        console.log(
                            "=============================="
                        );


                        return null;

                    }


                    const parsed =
                        JSON.parse(
                            data
                        );


                    console.log(
                        "PARSED:",
                        parsed
                    );


                    if (
                        Array.isArray(parsed)
                    ) {

                        console.table(
                            parsed
                        );

                    }

                    else if (
                        parsed &&
                        Array.isArray(
                            parsed.courses
                        )
                    ) {

                        console.table(
                            parsed.courses
                        );

                    }


                    console.log(
                        "=============================="
                    );


                    return parsed;

                }

                catch (error) {

                    console.error(
                        "❌ CGPA debug failed:",
                        error
                    );


                    return null;

                }

            };


        /* =================================================
           MANUAL FORCE SAVE
        ================================================== */

        window.saveCgpaNow =
            function () {

                const result =
                    saveCourses();


                console.log(
                    result
                        ? "✅ CGPA manually saved."
                        : "❌ CGPA manual save failed."
                );


                return result;

            };


        /* =================================================
           MANUAL FORCE LOAD
        ================================================== */

        window.loadCgpaNow =
            function () {

                loadCourses();


                updateCgpaLanguage();


                console.log(
                    "🔄 CGPA manually loaded."
                );

            };


        /* =================================================
           INITIAL LOAD
        ================================================== */

        loadCourses();


        updateCgpaLanguage();


        console.log(
            "================================"
        );

        console.log(
            "✅ CGPA Calculator initialized"
        );

        console.log(
            "Storage Key:",
            STORAGE_KEY
        );

        console.log(
            "================================"
        );

    }


    /* =====================================================
       DOM READY
    ====================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initCgpaCalculator,
            {
                once: true
            }
        );

    }

    else {

        initCgpaCalculator();

    }


})();