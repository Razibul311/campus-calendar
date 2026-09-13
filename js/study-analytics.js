/* =========================================================
   STUDY ANALYTICS - COMPLETE FIXED VERSION WITH RGB COLORS
   DARK MODE SUPPORT WITH !IMPORTANT
   + SUBJECT COMPLETION NOTIFICATION SYSTEM
   ========================================================= */

(function () {

    "use strict";

    let currentLang = "en";

    const ANALYTICS_LANGUAGE_STORAGE_KEY =
        "studyAnalyticsLanguage";

    const STUDY_HISTORY_STORAGE_KEY =
        "campusCalendarStudyHistory";

    const TARGET_STORAGE_KEY =
        "studyTargetTime";


    /* =========================================================
       TRANSLATIONS
       ========================================================= */

    const ANALYTICS_TEXT = {

        studyTitle: {
            en: "Study Analytics",
            bn: "স্টাডি অ্যানালিটিক্স"
        },

        dailyTitle: {
            en: "Daily",
            bn: "দৈনিক"
        },

        weeklyTitle: {
            en: "Weekly",
            bn: "সাপ্তাহিক"
        },

        monthlyTitle: {
            en: "Monthly",
            bn: "মাসিক"
        },

        subjectTitle: {
            en: "Subject Analytics",
            bn: "সাবজেক্ট অ্যানালিটিক্স"
        },

        chartsTitle: {
            en: "Charts",
            bn: "চার্ট"
        },

        totalStudyTime: {
            en: "Total Study Time",
            bn: "মোট স্টাডি সময়"
        },

        totalSessions: {
            en: "Total Sessions",
            bn: "মোট সেশন"
        },

        completedSessions: {
            en: "Completed Sessions",
            bn: "সম্পন্ন সেশন"
        },

        completionPercent: {
            en: "Completion",
            bn: "সম্পন্ন"
        },

        dailyAverage: {
            en: "Daily Average",
            bn: "দৈনিক গড়"
        },

        mostProductiveDay: {
            en: "Most Productive Day",
            bn: "সবচেয়ে উৎপাদনশীল দিন"
        },

        mostProductiveWeek: {
            en: "Most Productive Week",
            bn: "সবচেয়ে উৎপাদনশীল সপ্তাহ"
        },

        mostStudied: {
            en: "Most Studied Subject",
            bn: "সবচেয়ে বেশি পড়া সাবজেক্ট"
        },

        leastStudied: {
            en: "Least Studied Subject",
            bn: "সবচেয়ে কম পড়া সাবজেক্ট"
        },

        weeklyChartTitle: {
            en: "Weekly Study Time",
            bn: "সাপ্তাহিক স্টাডি সময়"
        },

        monthlyChartTitle: {
            en: "Monthly Study Trend",
            bn: "মাসিক স্টাডি ট্রেন্ড"
        },

        subjectDistributionTitle: {
            en: "Subject Completion Progress",
            bn: "সাবজেক্ট সম্পন্ন অগ্রগতি"
        },

        subjectComparisonTitle: {
            en: "Subject Study Time Comparison",
            bn: "সাবজেক্ট স্টাডি সময় তুলনা"
        },

        noData: {
            en: "No study data yet.",
            bn: "এখনো কোনো স্টাডি ডেটা নেই।"
        },

        sessions: {
            en: "sessions",
            bn: "সেশন"
        },

        completion: {
            en: "completion",
            bn: "সম্পন্ন"
        },

        week: {
            en: "Week",
            bn: "সপ্তাহ"
        },

        delete: {
            en: "Delete",
            bn: "মুছুন"
        },

        confirmDelete: {
            en: "Delete this subject",
            bn: "এই সাবজেক্টটি মুছবেন"
        },

        confirmDeleteMultiple: {
            en: "Delete {count} selected subjects?",
            bn: "আপনি কি {count}টি সাবজেক্ট মুছতে চান?"
        },

        deleted: {
            en: "Subject deleted",
            bn: "সাবজেক্ট মুছে ফেলা হয়েছে"
        },

        deletedMultiple: {
            en: "{count} subjects deleted",
            bn: "{count}টি সাবজেক্ট মুছে ফেলা হয়েছে"
        },

        selectAll: {
            en: "Select All",
            bn: "সব সিলেক্ট করুন"
        },

        deleteSelected: {
            en: "Delete Selected",
            bn: "সিলেক্টেড মুছুন"
        },

        selected: {
            en: "{count} selected",
            bn: "{count}টি সিলেক্টেড"
        },

        monday: {
            en: "Monday",
            bn: "সোমবার"
        },

        tuesday: {
            en: "Tuesday",
            bn: "মঙ্গলবার"
        },

        wednesday: {
            en: "Wednesday",
            bn: "বুধবার"
        },

        thursday: {
            en: "Thursday",
            bn: "বৃহস্পতিবার"
        },

        friday: {
            en: "Friday",
            bn: "শুক্রবার"
        },

        saturday: {
            en: "Saturday",
            bn: "শনিবার"
        },

        sunday: {
            en: "Sunday",
            bn: "রবিবার"
        },

        mon: {
            en: "Mon",
            bn: "সোম"
        },

        tue: {
            en: "Tue",
            bn: "মঙ্গল"
        },

        wed: {
            en: "Wed",
            bn: "বুধ"
        },

        thu: {
            en: "Thu",
            bn: "বৃহস্পতি"
        },

        fri: {
            en: "Fri",
            bn: "শুক্র"
        },

        sat: {
            en: "Sat",
            bn: "শনি"
        },

        sun: {
            en: "Sun",
            bn: "রবি"
        },

        targetStudyTime: {
            en: "Target Study Time",
            bn: "লক্ষ্য স্টাডি সময়"
        },

        enterTargetTime: {
            en: "Enter target study time in minutes",
            bn: "মিনিটে লক্ষ্য স্টাডি সময় লিখুন"
        },

        setTarget: {
            en: "Set Target",
            bn: "লক্ষ্য নির্ধারণ করুন"
        },

        targetTime: {
            en: "Target Time",
            bn: "লক্ষ্য সময়"
        },

        progress: {
            en: "Progress",
            bn: "অগ্রগতি"
        },

        achieved: {
            en: "Achieved",
            bn: "অর্জিত"
        },

        remaining: {
            en: "Remaining",
            bn: "বাকি"
        },

        targetNotSet: {
            en: "Target not set",
            bn: "লক্ষ্য নির্ধারণ করা হয়নি"
        },

        setTargetPrompt: {
            en: "Set your daily study target",
            bn: "আপনার দৈনিক স্টাডি লক্ষ্য নির্ধারণ করুন"
        },

        targetAchieved: {
            en: "🎉 Target Achieved!",
            bn: "🎉 লক্ষ্য অর্জিত হয়েছে!"
        },

        targetProgress: {
            en: "Target Progress",
            bn: "লক্ষ্যের অগ্রগতি"
        },

        dailyTarget: {
            en: "Daily Target",
            bn: "দৈনিক লক্ষ্য"
        },

        weeklyTarget: {
            en: "Weekly Target",
            bn: "সাপ্তাহিক লক্ষ্য"
        },

        monthlyTarget: {
            en: "Monthly Target",
            bn: "মাসিক লক্ষ্য"
        },

        targetStatus: {
            en: "Target Status",
            bn: "লক্ষ্যের অবস্থা"
        },

        notAchieved: {
            en: "Not Achieved",
            bn: "অর্জিত হয়নি"
        },

        minutes: {
            en: "minutes",
            bn: "মিনিট"
        },

        // New translations for completion notification
        completedSubjectsTitle: {
            en: "🎉 Completed Subjects",
            bn: "🎉 সম্পন্ন সাবজেক্ট"
        },

        noCompletedSubjects: {
            en: "No completed subjects",
            bn: "কোনো সম্পন্ন সাবজেক্ট নেই"
        }
    };


    /* =========================================================
       HELPER FUNCTIONS
       ========================================================= */

    function getAnalyticsText(key) {

        if (
            ANALYTICS_TEXT[key] &&
            ANALYTICS_TEXT[key][currentLang]
        ) {
            return ANALYTICS_TEXT[key][currentLang];
        }

        if (
            ANALYTICS_TEXT[key] &&
            ANALYTICS_TEXT[key].en
        ) {
            return ANALYTICS_TEXT[key].en;
        }

        return key;
    }


    function normalizeAnalyticsLanguage(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return null;
        }

        const lang = String(value)
            .trim()
            .toLowerCase();

        if (
            lang === "bn" ||
            lang === "bn-bd" ||
            lang === "bengali" ||
            lang === "bangla" ||
            lang === "বাংলা"
        ) {
            return "bn";
        }

        if (
            lang === "en" ||
            lang === "en-us" ||
            lang === "en-gb" ||
            lang === "english"
        ) {
            return "en";
        }

        return null;
    }


    function detectAnalyticsLanguage() {

        try {

            if (
                typeof window.currentLanguage !== "undefined"
            ) {

                const normalized =
                    normalizeAnalyticsLanguage(
                        window.currentLanguage
                    );

                if (normalized) {
                    return normalized;
                }
            }

        } catch (e) {}


        try {

            if (
                typeof currentLanguage !== "undefined"
            ) {

                const normalized =
                    normalizeAnalyticsLanguage(
                        currentLanguage
                    );

                if (normalized) {
                    return normalized;
                }
            }

        } catch (e) {}


        try {

            if (
                typeof state !== "undefined" &&
                state &&
                state.language
            ) {

                const normalized =
                    normalizeAnalyticsLanguage(
                        state.language
                    );

                if (normalized) {
                    return normalized;
                }
            }

        } catch (e) {}


        try {

            const htmlLang =
                document.documentElement.getAttribute("lang");

            const normalized =
                normalizeAnalyticsLanguage(htmlLang);

            if (normalized) {
                return normalized;
            }

        } catch (e) {}


        try {

            const stored =
                localStorage.getItem(
                    ANALYTICS_LANGUAGE_STORAGE_KEY
                );

            const normalized =
                normalizeAnalyticsLanguage(stored);

            if (normalized) {
                return normalized;
            }

        } catch (e) {}


        return "en";
    }


    function setAnalyticsLanguage(language) {

        const normalized =
            normalizeAnalyticsLanguage(language);

        if (!normalized) {
            return;
        }

        currentLang = normalized;

        try {
            localStorage.setItem(
                ANALYTICS_LANGUAGE_STORAGE_KEY,
                currentLang
            );
        } catch (e) {}

        try {
            document.documentElement.setAttribute(
                "lang",
                currentLang
            );
        } catch (e) {}

        updateLanguageButton();
        applyStaticAnalyticsLanguage();
    }


    function syncAnalyticsLanguage() {

        const detected =
            detectAnalyticsLanguage();

        if (detected) {
            currentLang = detected;
        }

        return currentLang;
    }


    function updateLanguageButton() {

        const langBtn =
            document.getElementById("languageBtn");

        if (!langBtn) {
            return;
        }

        if (currentLang === "bn") {

            langBtn.textContent = "English";
            langBtn.setAttribute("data-lang", "en");

        } else {

            langBtn.textContent = "বাংলা";
            langBtn.setAttribute("data-lang", "bn");
        }
    }


    function updateElement(id, value) {

        const element =
            document.getElementById(id);

        if (!element) {
            return;
        }

        element.textContent = value;
    }


    function escapeAnalyticsHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function toBanglaNumber(value) {

        const map = {

            "0": "০",
            "1": "১",
            "2": "২",
            "3": "৩",
            "4": "৪",
            "5": "৫",
            "6": "৬",
            "7": "৭",
            "8": "৮",
            "9": "৯"
        };

        return String(value).replace(
            /[0-9]/g,
            function (digit) {
                return map[digit];
            }
        );
    }


    function showToast(message, type) {

        let toast =
            document.getElementById("toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.id = "toast";

            toast.style.cssText = `
                position:fixed;
                bottom:20px;
                right:20px;
                padding:12px 24px;
                border-radius:8px;
                color:white;
                font-size:0.9rem;
                z-index:10000;
                display:none;
                max-width:400px;
                box-shadow:0 4px 12px rgba(0,0,0,0.15);
            `;

            document.body.appendChild(toast);
        }

        toast.textContent = message;

        toast.className =
            "toast " + (type || "info");

        const colors = {

            success: "#22c55e",
            error: "#ef4444",
            warning: "#f59e0b",
            info: "#3b82f6"
        };

        toast.style.background =
            colors[type] || colors.info;

        toast.style.display = "block";

        clearTimeout(toast._timeout);

        toast._timeout =
            setTimeout(function () {

                toast.style.display = "none";

            }, 3000);
    }

    /* =========================================================
       SUBJECT COMPLETION NOTIFICATION
       ========================================================= */

    function showSubjectCompletionNotification(subjectName, completionPercent) {
        // Check if browser supports notifications
        if (!("Notification" in window)) {
            return;
        }

        // Request permission if not granted
        if (Notification.permission === "default") {
            Notification.requestPermission();
            return;
        }

        // If permission denied, show toast instead
        if (Notification.permission !== "granted") {
            showToast(
                currentLang === "bn"
                    ? subjectName + " সম্পূর্ণ হয়েছে! (" + completionPercent + "%)"
                    : subjectName + " completed! (" + completionPercent + "%)",
                "success"
            );
            return;
        }

        // Send browser notification
        const title = currentLang === "bn"
            ? "✅ " + subjectName + " সম্পূর্ণ হয়েছে!"
            : "✅ " + subjectName + " Completed!";

        const body = currentLang === "bn"
            ? "অভিনন্দন! আপনি " + subjectName + " সাবজেক্টটি " + completionPercent + "% সম্পন্ন করেছেন।"
            : "Congratulations! You have completed " + subjectName + " (" + completionPercent + "%).";

        const notification = new Notification(title, {
            body: body,
            icon: "📚",
            tag: "subject-complete-" + subjectName,
            requireInteraction: true
        });

        // Auto-close after 8 seconds
        setTimeout(function () {
            notification.close();
        }, 8000);

        // Also show toast
        showToast(
            currentLang === "bn"
                ? subjectName + " সম্পূর্ণ হয়েছে! 🎉"
                : subjectName + " completed! 🎉",
            "success"
        );
    }

    /* =========================================================
       FORMAT FUNCTIONS
       ========================================================= */

    function formatStudyMinutes(minutes) {

        minutes =
            Math.max(
                0,
                Math.round(Number(minutes) || 0)
            );

        const hours =
            Math.floor(minutes / 60);

        const mins =
            minutes % 60;

        if (currentLang === "bn") {

            if (
                hours > 0 &&
                mins > 0
            ) {

                return (
                    toBanglaNumber(hours) +
                    " ঘণ্টা " +
                    toBanglaNumber(mins) +
                    " মিনিট"
                );
            }

            if (hours > 0) {

                return (
                    toBanglaNumber(hours) +
                    " ঘণ্টা"
                );
            }

            return (
                toBanglaNumber(mins) +
                " মিনিট"
            );
        }

        if (hours > 0) {

            return (
                hours +
                "h " +
                mins +
                "m"
            );
        }

        return mins + "m";
    }


    function formatAnalyticsNumber(value) {

        const number =
            Number(value) || 0;

        return currentLang === "bn"
            ? toBanglaNumber(number)
            : String(number);
    }


    function formatAnalyticsPercent(value) {

        const number =
            Number(value) || 0;

        return currentLang === "bn"
            ? toBanglaNumber(number) + "%"
            : number + "%";
    }


    function formatWeekNumber(week) {

        const number =
            Number(week);

        if (currentLang === "bn") {

            return (
                "সপ্তাহ " +
                toBanglaNumber(number)
            );
        }

        return "Week " + number;
    }


    function formatAnalyticsDay(dateString) {

        const date =
            parseAnalyticsDate(dateString);

        if (!date) {
            return "—";
        }

        const day =
            date.getDay();

        const keys = [
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday"
        ];

        return getAnalyticsText(keys[day]);
    }


    function formatAnalyticsShortDay(date) {

        if (!date) {
            return "";
        }

        const day =
            date.getDay();

        const keys = [
            "sun",
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat"
        ];

        return getAnalyticsText(keys[day]);
    }


    /* =========================================================
       DATE FUNCTIONS
       ========================================================= */

    function formatAnalyticsDate(date) {

        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        if (isNaN(date.getTime())) {
            return "";
        }

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        return (
            year +
            "-" +
            month +
            "-" +
            day
        );
    }


    function parseAnalyticsDate(dateString) {

        if (!dateString) {
            return null;
        }

        const parts =
            String(dateString)
                .split("-")
                .map(Number);

        if (parts.length !== 3) {
            return null;
        }

        const year = parts[0];
        const month = parts[1];
        const day = parts[2];

        if (
            !Number.isInteger(year) ||
            !Number.isInteger(month) ||
            !Number.isInteger(day)
        ) {
            return null;
        }

        const date =
            new Date(
                year,
                month - 1,
                day
            );

        if (isNaN(date.getTime())) {
            return null;
        }

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            return null;
        }

        return date;
    }


    function analyticsToday() {

        return formatAnalyticsDate(
            new Date()
        );
    }


    function getAnalyticsWeekStart(date) {

        const result =
            new Date(date);

        const day =
            result.getDay();

        const diff =
            day === 0
                ? -6
                : 1 - day;

        result.setDate(
            result.getDate() + diff
        );

        result.setHours(
            0,
            0,
            0,
            0
        );

        return result;
    }


    function getAnalyticsWeekDates() {

        const today =
            new Date();

        const start =
            getAnalyticsWeekStart(today);

        const dates = [];

        for (let i = 0; i < 7; i++) {

            const date =
                new Date(start);

            date.setDate(
                start.getDate() + i
            );

            dates.push(
                formatAnalyticsDate(date)
            );
        }

        return dates;
    }


    /* =========================================================
       DATA ACCESS
       ========================================================= */

    function getAnalyticsHistory() {

        try {

            const stored =
                localStorage.getItem(
                    STUDY_HISTORY_STORAGE_KEY
                );

            if (stored) {

                const parsed =
                    JSON.parse(stored);

                if (Array.isArray(parsed)) {

                    window.studyHistory =
                        parsed;

                    return parsed;
                }
            }

        } catch (e) {

            console.error(
                "Error reading study history:",
                e
            );
        }


        try {

            if (
                Array.isArray(
                    window.studyHistory
                )
            ) {

                return window.studyHistory;
            }

        } catch (e) {}


        try {

            if (
                typeof state !== "undefined" &&
                state &&
                Array.isArray(state.studyHistory)
            ) {

                window.studyHistory =
                    state.studyHistory;

                return state.studyHistory;
            }

        } catch (e) {}


        try {

            if (
                Array.isArray(
                    window.studyData
                )
            ) {

                window.studyHistory =
                    window.studyData;

                return window.studyData;
            }

        } catch (e) {}


        window.studyHistory = [];

        return window.studyHistory;
    }


    function saveAnalyticsHistory(history) {

        const updatedHistory =
            Array.isArray(history)
                ? history
                : [];

        window.studyHistory =
            updatedHistory;

        try {

            localStorage.setItem(
                STUDY_HISTORY_STORAGE_KEY,
                JSON.stringify(updatedHistory)
            );

            console.log(
                "Saved study history:",
                updatedHistory.length,
                "sessions"
            );

        } catch (e) {

            console.error(
                "Failed to save study history:",
                e
            );
        }
    }


    /* =========================================================
       SESSION DATE
       ========================================================= */

    function getAnalyticsSessionDate(session) {

        if (!session) {
            return "";
        }

        const possibleDates = [

            session.date,
            session.studyDate,
            session.sessionDate,
            session.createdDate,
            session.timestamp
        ];

        for (
            let i = 0;
            i < possibleDates.length;
            i++
        ) {

            const value =
                possibleDates[i];

            if (!value) {
                continue;
            }

            if (
                typeof value === "string" &&
                /^\d{4}-\d{2}-\d{2}$/.test(value)
            ) {

                return value;
            }

            const date =
                new Date(value);

            if (!isNaN(date.getTime())) {

                return formatAnalyticsDate(date);
            }
        }

        return "";
    }


    /* =========================================================
       SESSION DURATION
       ========================================================= */

    function getAnalyticsDuration(session) {

        if (!session) {
            return 0;
        }

        const possibleValues = [

            session.duration,
            session.studyTime,
            session.elapsed,
            session.elapsedTime,
            session.minutes
        ];

        for (
            let i = 0;
            i < possibleValues.length;
            i++
        ) {

            const value =
                Number(possibleValues[i]);

            if (
                isFinite(value) &&
                value > 0
            ) {

                return value;
            }
        }

        return 0;
    }


    /* =========================================================
       COMPLETION CHECK
       ========================================================= */

    function isAnalyticsSessionCompleted(session) {

        if (!session) {
            return false;
        }

        return (
            session.completed === true ||
            session.completed === "true" ||

            session.status === "completed" ||

            session.isCompleted === true ||
            session.isCompleted === "true"
        );
    }


    /* =========================================================
       SUBJECT NAME
       ========================================================= */

    function getAnalyticsSessionSubject(session) {

        if (!session) {
            return "Other";
        }

        const subject =
            String(
                session.subject ||
                session.course ||
                session.topic ||
                "Other"
            ).trim();

        return subject || "Other";
    }


    /* =========================================================
       DELETE SINGLE SUBJECT
       ========================================================= */

    function deleteSubject(subjectName) {

        console.log(
            "deleteSubject:",
            subjectName
        );

        if (!subjectName) {
            return;
        }

        const cleanSubject =
            String(subjectName).trim();

        if (!cleanSubject) {
            return;
        }

        const confirmMsg =
            getAnalyticsText("confirmDelete");

        const finalConfirm =
            confirm(
                confirmMsg +
                ' "' +
                cleanSubject +
                '"?'
            );

        if (!finalConfirm) {
            console.log(
                "Deletion cancelled"
            );
            return;
        }

        const history =
            getAnalyticsHistory();

        const targetSubject =
            cleanSubject.toLowerCase();

        const newHistory =
            history.filter(function (session) {

                const sessionSubject =
                    getAnalyticsSessionSubject(
                        session
                    )
                    .toLowerCase();

                return (
                    sessionSubject !==
                    targetSubject
                );
            });

        const deletedCount =
            history.length -
            newHistory.length;

        if (deletedCount === 0) {

            showToast(
                currentLang === "bn"
                    ? "কোনো সেশন পাওয়া যায়নি"
                    : "No sessions found",
                "warning"
            );

            return;
        }

        saveAnalyticsHistory(
            newHistory
        );

        const msg =
            getAnalyticsText("deleted") +
            ": " +
            cleanSubject;

        showToast(
            msg +
            " (" +
            deletedCount +
            " " +
            getAnalyticsText("sessions") +
            ")",
            "success"
        );

        forceRenderAnalytics();
    }


    /* =========================================================
       DELETE MULTIPLE SUBJECTS
       ========================================================= */

    function deleteMultipleSubjects(subjectNames) {

        if (
            !Array.isArray(subjectNames) ||
            subjectNames.length === 0
        ) {
            return;
        }

        const cleanSubjects =
            subjectNames
                .map(function (subject) {
                    return String(subject || "")
                        .trim();
                })
                .filter(Boolean);

        if (cleanSubjects.length === 0) {
            return;
        }

        const confirmMsg =
            getAnalyticsText(
                "confirmDeleteMultiple"
            ).replace(
                "{count}",
                currentLang === "bn"
                    ? toBanglaNumber(
                        cleanSubjects.length
                    )
                    : cleanSubjects.length
            );

        if (!confirm(confirmMsg)) {
            return;
        }

        const targetSubjects =
            new Set(
                cleanSubjects.map(function (subject) {
                    return subject.toLowerCase();
                })
            );

        const history =
            getAnalyticsHistory();

        const newHistory =
            history.filter(function (session) {

                const sessionSubject =
                    getAnalyticsSessionSubject(
                        session
                    ).toLowerCase();

                return !targetSubjects.has(
                    sessionSubject
                );
            });

        const deletedCount =
            history.length -
            newHistory.length;

        if (deletedCount === 0) {

            showToast(
                currentLang === "bn"
                    ? "কোনো সেশন পাওয়া যায়নি"
                    : "No sessions found",
                "warning"
            );

            return;
        }

        saveAnalyticsHistory(
            newHistory
        );

        const subjectCount =
            cleanSubjects.length;

        const subjectCountText =
            currentLang === "bn"
                ? toBanglaNumber(subjectCount)
                : subjectCount;

        const msg =
            getAnalyticsText(
                "deletedMultiple"
            ).replace(
                "{count}",
                subjectCountText
            );

        showToast(
            msg +
            " (" +
            deletedCount +
            " " +
            getAnalyticsText("sessions") +
            ")",
            "success"
        );

        forceRenderAnalytics();
    }


    /* =========================================================
       DAILY ANALYTICS
       ========================================================= */

    function getDailyStudyAnalytics() {

        const today =
            analyticsToday();

        const sessions =
            getAnalyticsHistory()
                .filter(function (session) {

                    return (
                        getAnalyticsSessionDate(
                            session
                        ) === today
                    );
                });

        const totalStudyTime =
            sessions.reduce(
                function (total, session) {

                    return (
                        total +
                        getAnalyticsDuration(session)
                    );

                },
                0
            );

        const totalSessions =
            sessions.length;

        const completedSessions =
            sessions.filter(
                isAnalyticsSessionCompleted
            ).length;

        const completion =
            totalSessions > 0
                ? Math.round(
                    (
                        completedSessions /
                        totalSessions
                    ) * 100
                )
                : 0;

        return {

            totalStudyTime,
            totalSessions,
            completedSessions,
            completion
        };
    }


    /* =========================================================
       WEEKLY ANALYTICS
       ========================================================= */

    function getWeeklyStudyAnalytics() {

        const weekDates =
            getAnalyticsWeekDates();

        const sessions =
            getAnalyticsHistory()
                .filter(function (session) {

                    return weekDates.includes(
                        getAnalyticsSessionDate(
                            session
                        )
                    );
                });

        const totalStudyTime =
            sessions.reduce(
                function (total, session) {

                    return (
                        total +
                        getAnalyticsDuration(session)
                    );

                },
                0
            );

        const totalSessions =
            sessions.length;

        const completedSessions =
            sessions.filter(
                isAnalyticsSessionCompleted
            ).length;

        const completion =
            totalSessions > 0
                ? Math.round(
                    (
                        completedSessions /
                        totalSessions
                    ) * 100
                )
                : 0;

        const dailyAverage =
            Math.round(
                totalStudyTime / 7
            );


        const dailyMap = {};

        weekDates.forEach(
            function (date) {

                dailyMap[date] = 0;
            }
        );


        sessions.forEach(
            function (session) {

                const date =
                    getAnalyticsSessionDate(
                        session
                    );

                if (
                    dailyMap[date] !== undefined
                ) {

                    dailyMap[date] +=
                        getAnalyticsDuration(
                            session
                        );
                }
            }
        );


        let mostProductiveDay = null;
        let highestTime = 0;

        Object.entries(
            dailyMap
        ).forEach(
            function (entry) {

                const date =
                    entry[0];

                const minutes =
                    entry[1];

                if (
                    minutes >
                    highestTime
                ) {

                    highestTime =
                        minutes;

                    mostProductiveDay =
                        date;
                }
            }
        );


        return {

            totalStudyTime,
            dailyAverage,
            totalSessions,
            completedSessions,
            completion,
            mostProductiveDay,
            mostProductiveDayTime:
                highestTime,
            dailyMap
        };
    }


    /* =========================================================
       MONTHLY ANALYTICS - MONTH-ALIGNED WEEKS (1-7, 8-14, etc.)
       ========================================================= */

    function getMonthlyStudyAnalytics() {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            today.getMonth();

        const sessions =
            getAnalyticsHistory()
                .filter(function (session) {

                    const date =
                        parseAnalyticsDate(
                            getAnalyticsSessionDate(
                                session
                            )
                        );

                    if (!date) {
                        return false;
                    }

                    return (
                        date.getFullYear() === year &&
                        date.getMonth() === month
                    );
                });


        const totalStudyTime =
            sessions.reduce(
                function (total, session) {

                    return (
                        total +
                        getAnalyticsDuration(session)
                    );

                },
                0
            );


        const totalSessions =
            sessions.length;

        const completedSessions =
            sessions.filter(
                isAnalyticsSessionCompleted
            ).length;

        const completion =
            totalSessions > 0
                ? Math.round(
                    (
                        completedSessions /
                        totalSessions
                    ) * 100
                )
                : 0;


        const daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();

        const dailyAverage =
            Math.round(
                totalStudyTime /
                daysInMonth
            );


        const weekMap = {};

        sessions.forEach(
            function (session) {

                const date =
                    parseAnalyticsDate(
                        getAnalyticsSessionDate(
                            session
                        )
                    );

                if (!date) {
                    return;
                }

                const dayOfMonth =
                    date.getDate();

                const week =
                    Math.ceil(
                        dayOfMonth / 7
                    );

                if (!weekMap[week]) {
                    weekMap[week] = 0;
                }

                weekMap[week] +=
                    getAnalyticsDuration(
                        session
                    );
            }
        );


        let mostProductiveWeek =
            null;

        let highestWeekTime = 0;

        Object.entries(
            weekMap
        ).forEach(
            function (entry) {

                const week =
                    Number(entry[0]);

                const minutes =
                    entry[1];

                if (
                    minutes >
                    highestWeekTime
                ) {

                    highestWeekTime =
                        minutes;

                    mostProductiveWeek =
                        week;
                }
            }
        );


        return {

            totalStudyTime,
            dailyAverage,
            totalSessions,
            completedSessions,
            completion,
            mostProductiveWeek,
            mostProductiveWeekTime:
                highestWeekTime,
            weekMap
        };
    }


    /* =========================================================
       SUBJECT ANALYTICS - FIXED WITH TIME-BASED COMPLETION
       ========================================================= */

    function getSubjectStudyAnalytics() {

        const map = new Map();
        const history = getAnalyticsHistory();

        let tasks = [];
        try {
            const tasksData = localStorage.getItem("campusCalendarStudyTasks");
            if (tasksData) {
                tasks = JSON.parse(tasksData);
                if (!Array.isArray(tasks)) tasks = [];
            }
        } catch (e) {}

        // Build task lookup maps
        const taskTargetMap = new Map();
        const taskSubjectMap = new Map();
        const taskCompletedMap = new Map();
        
        tasks.forEach(function(task) {
            const taskId = String(task.id);
            let targetMinutes = 0;
            if (task.targetMinutes) {
                targetMinutes = parseInt(task.targetMinutes) || 0;
            } else if (task.duration) {
                targetMinutes = parseInt(task.duration) || 0;
            } else if (task.targetTime) {
                targetMinutes = parseInt(task.targetTime) || 0;
            }
            taskTargetMap.set(taskId, targetMinutes);
            taskSubjectMap.set(taskId, task.subject || task.course || 'Other');
            taskCompletedMap.set(taskId, task.completed === true);
        });

        let fixedCount = 0;

        history.forEach(function (session) {

            const subject = getAnalyticsSessionSubject(session);
            const key = subject.toLocaleLowerCase();

            if (!map.has(key)) {
                map.set(key, {
                    subject: subject,
                    totalStudyTime: 0,
                    totalSessions: 0,
                    completedSessions: 0,
                    targetTime: 0,
                    isFullyCompleted: false
                });
            }

            const item = map.get(key);
            const duration = getAnalyticsDuration(session);
            item.totalStudyTime += duration;
            item.totalSessions++;

            // Check for target time from task
            if (session.taskId) {
                const taskId = String(session.taskId);
                const target = taskTargetMap.get(taskId);
                if (target && target > 0) {
                    if (item.targetTime === 0 || target > item.targetTime) {
                        item.targetTime = target;
                    }
                }
                // Check if task is completed
                if (taskCompletedMap.get(taskId) === true) {
                    item.isFullyCompleted = true;
                }
            }

            let isCompleted = isAnalyticsSessionCompleted(session);
            
            if (!isCompleted && session.taskId) {
                if (taskCompletedMap.get(String(session.taskId)) === true) {
                    isCompleted = true;
                    session.completed = true;
                    fixedCount++;
                }
            }

            if (isCompleted) {
                item.completedSessions++;
            }
        });

        if (fixedCount > 0) {
            console.log("Fixed " + fixedCount + " sessions with missing completion flag");
            saveAnalyticsHistory(history);
        }

        const subjects = Array.from(map.values());

        // Calculate completion based on study time vs target time
        subjects.forEach(function (item) {
            if (item.targetTime > 0) {
                // Time-based progress: study time / target time
                const progress = Math.min(100, Math.round((item.totalStudyTime / item.targetTime) * 100));
                item.completion = progress;
                // Mark as fully achieved if study time >= target time
                if (item.totalStudyTime >= item.targetTime) {
                    item.isFullyCompleted = true;
                }
            } else {
                // Fallback to session-based completion if no target
                item.completion = item.totalSessions > 0
                    ? Math.round((item.completedSessions / item.totalSessions) * 100)
                    : 0;
            }
        });

        subjects.sort(function (a, b) {
            return b.totalStudyTime - a.totalStudyTime;
        });

        return subjects;
    }


    function getMostStudiedSubject() {

        const subjects =
            getSubjectStudyAnalytics();

        if (
            !subjects ||
            subjects.length === 0
        ) {
            return null;
        }

        return subjects[0];
    }


    function getLeastStudiedSubject() {

        const subjects =
            getSubjectStudyAnalytics();

        if (
            !subjects ||
            subjects.length === 0
        ) {
            return null;
        }

        let minSubject = null;
        let minTime = Infinity;


        subjects.forEach(
            function (item) {

                if (
                    item.totalStudyTime > 0 &&
                    item.totalStudyTime < minTime
                ) {

                    minTime =
                        item.totalStudyTime;

                    minSubject =
                        item;
                }
            }
        );


        return (
            minSubject ||
            subjects[subjects.length - 1]
        );
    }


    /* =========================================================
       CHART DATA
       ========================================================= */

    function getWeeklyChartData() {

        const weekly =
            getWeeklyStudyAnalytics();

        const weekDates =
            getAnalyticsWeekDates();

        const result = [];


        for (
            let i = 0;
            i < weekDates.length;
            i++
        ) {

            const date =
                weekDates[i];

            const parsed =
                parseAnalyticsDate(date);

            const dayName =
                formatAnalyticsShortDay(
                    parsed
                );


            let minutes = 0;

            if (
                weekly.dailyMap &&
                weekly.dailyMap[date] !== undefined
            ) {

                minutes =
                    weekly.dailyMap[date];
            }


            result.push({

                date: date,
                label: dayName,
                minutes:
                    Math.round(minutes)
            });
        }


        return result;
    }


    function getMonthlyTrendData() {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            today.getMonth();

        const days =
            new Date(
                year,
                month + 1,
                0
            ).getDate();

        const map = {};


        for (
            let i = 1;
            i <= days;
            i++
        ) {

            const key =
                year +
                "-" +
                String(month + 1)
                    .padStart(2, "0") +
                "-" +
                String(i)
                    .padStart(2, "0");

            map[key] = 0;
        }


        getAnalyticsHistory()
            .forEach(
                function (session) {

                    const date =
                        getAnalyticsSessionDate(
                            session
                        );

                    if (
                        map[date] !== undefined
                    ) {

                        map[date] +=
                            getAnalyticsDuration(
                                session
                            );
                    }
                }
            );


        return Object.entries(
            map
        ).map(
            function (entry) {

                return {

                    date: entry[0],

                    day:
                        Number(
                            entry[0]
                                .split("-")[2]
                        ),

                    minutes:
                        entry[1]
                };
            }
        );
    }


    function getSubjectDistributionData() {

        return getSubjectStudyAnalytics()

            .filter(
                function (item) {

                    return (
                        item.totalStudyTime > 0
                    );
                }
            )

            .map(
                function (item) {

                    return {

                        subject:
                            item.subject,

                        minutes:
                            item.totalStudyTime,

                        completion:
                            item.completion,

                        targetTime:
                            item.targetTime
                    };
                }
            );
    }


    /* =========================================================
       SUBJECT COLORS - 30 UNIQUE RGB COLORS (No Duplicates)
       Only ONE Green Color
       ========================================================= */

    function getSubjectColorHash(subjectName) {
        let hash = 0;
        const str = String(subjectName || "").toLowerCase();
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    // 30 COMPLETELY UNIQUE COLORS - NO DUPLICATES
    // Only ONE Green color included
    const UNIQUE_COLORS = [
        { r: 255, g: 69, b: 0 },      // Red Orange
        { r: 255, g: 140, b: 0 },     // Dark Orange
        { r: 255, g: 165, b: 0 },     // Orange
        { r: 255, g: 215, b: 0 },     // Gold
        { r: 218, g: 112, b: 214 },   // Orchid Purple
        { r: 186, g: 85, b: 211 },    // Medium Purple
        { r: 114, g: 9, b: 183 },     // Deep Purple
        { r: 255, g: 20, b: 147 },    // Hot Pink
        { r: 255, g: 105, b: 180 },   // Light Pink
        { r: 255, g: 182, b: 193 },   // Pale Pink
        { r: 255, g: 107, b: 107 },   // Soft Red
        { r: 200, g: 50, b: 50 },     // Dark Red
        { r: 255, g: 69, b: 69 },     // Bright Red
        { r: 255, g: 127, b: 80 },    // Coral
        { r: 0, g: 206, b: 209 },     // Teal
        { r: 52, g: 172, b: 224 },    // Sky Blue
        { r: 0, g: 150, b: 255 },     // Bright Blue
        { r: 30, g: 144, b: 255 },    // Dodger Blue
        { r: 70, g: 130, b: 180 },    // Steel Blue
        { r: 100, g: 149, b: 237 },   // Cornflower Blue
        { r: 50, g: 205, b: 50 },     // Lime Green (ONLY GREEN)
        { r: 255, g: 99, b: 71 },     // Tomato
        { r: 255, g: 20, b: 147 },    // Deep Pink
        { r: 255, g: 0, b: 255 },     // Magenta
        { r: 0, g: 255, b: 255 },     // Cyan
        { r: 255, g: 255, b: 0 },     // Yellow
        { r: 255, g: 215, b: 0 },     // Gold
        { r: 255, g: 140, b: 0 },     // Dark Orange
        { r: 218, g: 112, b: 214 },   // Orchid Purple
        { r: 255, g: 105, b: 180 }    // Light Pink
    ];

    // Track which colors are assigned to which subjects
    const colorAssignmentMap = new Map();
    const usedColorIndices = new Set();

    function getAnalyticsSubjectColor(subjectName, index) {
        if (!subjectName) {
            const colorIndex = (index || 0) % UNIQUE_COLORS.length;
            return UNIQUE_COLORS[colorIndex];
        }
        
        const normalizedSubject = String(subjectName).trim().toLowerCase();
        
        // If this subject already has a color assigned, return it
        if (colorAssignmentMap.has(normalizedSubject)) {
            const assignedIndex = colorAssignmentMap.get(normalizedSubject);
            return UNIQUE_COLORS[assignedIndex];
        }
        
        // Find a unique color for this subject
        let colorIndex = getSubjectColorHash(subjectName) % UNIQUE_COLORS.length;
        let attempts = 0;
        
        // If the color is already used by another subject, find a new one
        while (usedColorIndices.has(colorIndex) && attempts < UNIQUE_COLORS.length) {
            colorIndex = (colorIndex + 1) % UNIQUE_COLORS.length;
            attempts++;
        }
        
        // Assign this color to the subject
        colorAssignmentMap.set(normalizedSubject, colorIndex);
        usedColorIndices.add(colorIndex);
        
        // If we've used all colors, for new subjects use hash
        if (usedColorIndices.size >= UNIQUE_COLORS.length) {
            return UNIQUE_COLORS[getSubjectColorHash(subjectName) % UNIQUE_COLORS.length];
        }
        
        return UNIQUE_COLORS[colorIndex];
    }

    function getAnalyticsSubjectColorCSS(subjectName, index) {
        const color = getAnalyticsSubjectColor(subjectName, index);
        return "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
    }

    // Reset color assignments when new data loads
    function resetColorAssignments() {
        colorAssignmentMap.clear();
        usedColorIndices.clear();
    }

    // Prepare unique colors for all subjects
    function prepareSubjectColors(subjects) {
        resetColorAssignments();
        if (Array.isArray(subjects)) {
            subjects.forEach(function(subject, index) {
                getAnalyticsSubjectColor(subject.subject || subject, index);
            });
        }
    }


    /* =========================================================
       TARGET STUDY TIME FUNCTIONS
       ========================================================= */

    function getStudyTarget() {

        try {

            const stored =
                localStorage.getItem(
                    TARGET_STORAGE_KEY
                );

            if (stored) {

                const parsed =
                    JSON.parse(stored);

                return parsed.target || 0;
            }

        } catch (e) {}

        return 0;
    }


    function setStudyTarget(minutes) {

        const target =
            Math.max(
                0,
                Number(minutes) || 0
            );

        try {

            localStorage.setItem(
                TARGET_STORAGE_KEY,
                JSON.stringify({
                    target: target
                })
            );

            const msg =
                target > 0
                    ? "Target Study Time: " +
                      formatStudyMinutes(target)
                    : "Target not set";

            showToast(
                msg,
                target > 0
                    ? "success"
                    : "warning"
            );

        } catch (e) {}

        renderTargetProgress();

        return target;
    }


    function getDailyProgress() {

        const daily =
            getDailyStudyAnalytics();

        const target =
            getStudyTarget();

        if (target <= 0) {

            return {
                current: daily.totalStudyTime,
                target: 0,
                progress: 0,
                achieved: false
            };
        }

        const progress =
            Math.min(
                100,
                (daily.totalStudyTime / target) * 100
            );

        return {
            current: daily.totalStudyTime,
            target: target,
            progress: Math.round(progress),
            achieved: daily.totalStudyTime >= target
        };
    }


    function renderTargetProgress() {

        const container =
            document.getElementById(
                "targetProgressContainer"
            );

        if (!container) {
            return;
        }

        const progress =
            getDailyProgress();

        const target =
            getStudyTarget();

        const targetText =
            getAnalyticsText(
                "targetStudyTime"
            );

        const enterText =
            getAnalyticsText(
                "enterTargetTime"
            );

        const setText =
            getAnalyticsText(
                "setTarget"
            );

        const dailyTargetText =
            getAnalyticsText(
                "dailyTarget"
            );

        const progressText =
            getAnalyticsText(
                "progress"
            );

        const achievedText =
            getAnalyticsText(
                "achieved"
            );

        const remainingText =
            getAnalyticsText(
                "remaining"
            );

        const targetAchievedText =
            getAnalyticsText(
                "targetAchieved"
            );

        const targetNotSetText =
            getAnalyticsText(
                "targetNotSet"
            );

        const setTargetPromptText =
            getAnalyticsText(
                "setTargetPrompt"
            );


        let html = `

            <div
                class="target-study-container"
                style="
                    background:linear-gradient(135deg,#f8fafc,#eef2ff);
                    padding:20px;
                    border-radius:16px;
                    border:1px solid #e2e8f0;
                    margin:16px 0;
                "
            >

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        flex-wrap:wrap;
                        gap:12px;
                        margin-bottom:16px;
                    "
                >

                    <div>

                        <h4
                            style="
                                margin:0;
                                font-size:1rem;
                                color:#1e293b;
                                font-weight:600;
                            "
                        >
                            ${escapeAnalyticsHTML(
                                targetText
                            )}
                        </h4>

                        ${
                            target > 0
                                ? `
                                    <p
                                        style="
                                            margin:4px 0 0;
                                            font-size:0.85rem;
                                            color:#64748b;
                                        "
                                    >
                                        ${escapeAnalyticsHTML(
                                            dailyTargetText
                                        )}:
                                        ${escapeAnalyticsHTML(
                                            formatStudyMinutes(
                                                target
                                            )
                                        )}
                                    </p>
                                `
                                : ""
                        }

                    </div>


                    <div
                        style="
                            display:flex;
                            gap:10px;
                            align-items:center;
                            flex-wrap:wrap;
                        "
                    >

                        <input
                            type="number"
                            id="targetTimeInput"
                            placeholder="${escapeAnalyticsHTML(
                                enterText
                            )}"
                            style="
                                padding:8px 14px;
                                border:2px solid #e2e8f0;
                                border-radius:10px;
                                font-size:0.85rem;
                                width:180px;
                                background:white;
                                transition:border-color 0.3s;
                            "
                        >

                        <button
                            onclick="window.handleSetTarget && window.handleSetTarget()"
                            style="
                                padding:8px 20px;
                                background:#7c3aed;
                                color:white;
                                border:none;
                                border-radius:10px;
                                font-size:0.85rem;
                                font-weight:500;
                                cursor:pointer;
                                transition:all 0.3s;
                                box-shadow:0 2px 8px rgba(124,58,237,0.3);
                            "
                        >
                            ${escapeAnalyticsHTML(
                                setText
                            )}
                        </button>

                    </div>

                </div>
        `;


        if (target > 0) {

            const progressPercent =
                progress.progress;

            const isAchieved =
                progress.achieved;

            const currentFormatted =
                formatStudyMinutes(
                    progress.current
                );

            const targetFormatted =
                formatStudyMinutes(
                    target
                );

            const remainingMinutes =
                Math.max(
                    0,
                    target - progress.current
                );

            const remainingFormatted =
                formatStudyMinutes(
                    remainingMinutes
                );


            html += `

                <div style="margin-top:12px;">

                    <div
                        style="
                            display:flex;
                            justify-content:space-between;
                            font-size:0.85rem;
                            color:#475569;
                            margin-bottom:6px;
                        "
                    >
                        <span>
                            ${escapeAnalyticsHTML(
                                progressText
                            )}
                        </span>

                        <span>
                            ${escapeAnalyticsHTML(
                                currentFormatted
                            )}
                            /
                            ${escapeAnalyticsHTML(
                                targetFormatted
                            )}
                            (${escapeAnalyticsHTML(
                                progressPercent
                            )}%)
                        </span>
                    </div>


                    <div
                        style="
                            height:12px;
                            background:#e2e8f0;
                            border-radius:8px;
                            overflow:hidden;
                            box-shadow:inset 0 1px 3px rgba(0,0,0,0.05);
                        "
                    >

                        <div
                            style="
                                width:${Math.min(
                                    100,
                                    progressPercent
                                )}%;
                                height:100%;
                                background:${
                                    isAchieved
                                        ? "linear-gradient(90deg,#22c55e,#16a34a)"
                                        : "linear-gradient(90deg,#7c3aed,#6d28d9)"
                                };
                                border-radius:8px;
                                transition:width 0.8s cubic-bezier(0.4,0,0.2,1);
                                box-shadow:0 2px 4px rgba(124,58,237,0.2);
                            "
                        ></div>

                    </div>


                    <div
                        style="
                            display:flex;
                            justify-content:space-between;
                            margin-top:8px;
                            font-size:0.8rem;
                            color:#64748b;
                        "
                    >
                        <span>
                            ${escapeAnalyticsHTML(
                                achievedText
                            )}:
                            ${escapeAnalyticsHTML(
                                currentFormatted
                            )}
                        </span>

                        <span>
                            ${escapeAnalyticsHTML(
                                remainingText
                            )}:
                            ${escapeAnalyticsHTML(
                                remainingFormatted
                            )}
                        </span>
                    </div>


                    ${
                        isAchieved
                            ? `
                                <div
                                    style="
                                        margin-top:12px;
                                        padding:10px 16px;
                                        background:linear-gradient(135deg,#dcfce7,#bbf7d0);
                                        border-radius:10px;
                                        text-align:center;
                                        color:#166534;
                                        font-weight:600;
                                        border:1px solid #86efac;
                                        font-size:1rem;
                                    "
                                >
                                    ${escapeAnalyticsHTML(
                                        targetAchievedText
                                    )}
                                </div>
                            `
                            : ""
                    }

                </div>
            `;

        } else {

            html += `

                <div
                    style="
                        padding:20px;
                        text-align:center;
                        color:#94a3b8;
                        background:#f1f5f9;
                        border-radius:10px;
                        border:2px dashed #e2e8f0;
                    "
                >

                    <p
                        style="
                            margin:0;
                            font-size:0.95rem;
                        "
                    >
                        ${escapeAnalyticsHTML(
                            targetNotSetText
                        )}
                    </p>

                    <p
                        style="
                            margin:6px 0 0;
                            font-size:0.85rem;
                        "
                    >
                        ${escapeAnalyticsHTML(
                            setTargetPromptText
                        )}
                    </p>

                </div>
            `;
        }


        html += "</div>";


        container.innerHTML = html;


        const input =
            document.getElementById(
                "targetTimeInput"
            );

        if (input) {

            input.addEventListener(
                "keypress",
                function (e) {

                    if (e.key === "Enter") {

                        if (
                            typeof window.handleSetTarget ===
                            "function"
                        ) {

                            window.handleSetTarget();
                        }
                    }
                }
            );
        }
    }


    function handleSetTarget() {

        const input =
            document.getElementById(
                "targetTimeInput"
            );

        if (!input) {
            return;
        }

        const minutes =
            parseInt(input.value);

        if (
            !isNaN(minutes) &&
            minutes > 0
        ) {

            setStudyTarget(minutes);

            input.value = "";

            renderTargetProgress();

        } else {

            showToast(
                currentLang === "bn"
                    ? "দয়া করে একটি বৈধ সংখ্যা লিখুন"
                    : "Please enter a valid number",
                "warning"
            );
        }
    }

    /* =========================================================
       DAILY RENDER - WITH RGB COLORS (Top Border Only) - ORANGE
       ========================================================= */

    function renderDailyStudyAnalytics() {

        const data =
            getDailyStudyAnalytics();

        // Daily section with RGB colors - TOP BORDER ONLY
        let dailySection = null;
        
        // Try multiple selector approaches
        dailySection = document.querySelector('.study-analytics-section.daily-section');
        
        if (!dailySection) {
            dailySection = document.querySelector('.study-analytics-section:first-child');
        }
        
        if (!dailySection) {
            const sections = document.querySelectorAll('.study-analytics-section');
            if (sections.length >= 1) {
                dailySection = sections[0];
            }
        }
        
        if (!dailySection) {
            const allSections = document.querySelectorAll('.study-analytics-section');
            for (let i = 0; i < allSections.length; i++) {
                const header = allSections[i].querySelector('h4, h3');
                if (header && (header.textContent.includes('Daily') || header.textContent.includes('দৈনিক'))) {
                    dailySection = allSections[i];
                    break;
                }
            }
        }
        
        // Apply ORANGE top border to daily section
        if (dailySection) {
            dailySection.style.setProperty('border-top', '4px solid #FF8C00', 'important');
            dailySection.style.setProperty('border-left', 'none', 'important');
            dailySection.style.setProperty('border-right', 'none', 'important');
            dailySection.style.setProperty('border-bottom', 'none', 'important');
            dailySection.style.setProperty('border-radius', '8px', 'important');
            dailySection.style.setProperty('background', 'linear-gradient(135deg, rgba(255,140,0,0.06), rgba(255,165,0,0.02))', 'important');
            dailySection.style.setProperty('padding', '16px', 'important');
            dailySection.style.setProperty('box-shadow', '0 2px 8px rgba(255,140,0,0.08)', 'important');
            
            console.log('Daily section orange top border applied');
        }

        // Daily stat cards with ORANGE colors
        const dailyStatIds = [
            { id: 'analyticsDailyStudyTime', color: '#FF775C' },
            { id: 'analyticsDailySessions', color: '#FF775C' },
            { id: 'analyticsDailyCompleted', color: '#FF775C' },
            { id: 'analyticsDailyCompletion', color: '#FF775C' }
        ];

        dailyStatIds.forEach(function(stat) {
            const element = document.getElementById(stat.id);
            if (element) {
                element.style.setProperty('color', stat.color, 'important');
                element.style.setProperty('font-weight', '700', 'important');
                element.style.setProperty('font-size', '1.1rem', 'important');
            }
        });

        // Find stat cards and add ORANGE colored borders - TOP BORDER ONLY
        let dailyCards = [];
        if (dailySection) {
            dailyCards = dailySection.querySelectorAll('.analytics-stat-card, .stat-card, .stat-item');
        }
        
        if (dailyCards.length === 0) {
            const cardIds = ['analyticsDailyStudyTime', 'analyticsDailySessions', 'analyticsDailyCompleted', 'analyticsDailyCompletion'];
            cardIds.forEach(function(id) {
                const el = document.getElementById(id);
                if (el) {
                    let card = el.closest('.analytics-stat-card, .stat-card, .stat-item');
                    if (card && !dailyCards.includes(card)) {
                        dailyCards.push(card);
                    }
                }
            });
        }
        
        const cardColors = [
            '#FF775C',
            '#FF775C',
            '#FF775C',
            '#FF775C'
        ];
        dailyCards.forEach(function(card, index) {
            if (index < cardColors.length) {
                card.style.setProperty('border-top', '3px solid ' + cardColors[index], 'important');
                card.style.setProperty('border-left', 'none', 'important');
                card.style.setProperty('border-right', 'none', 'important');
                card.style.setProperty('border-bottom', 'none', 'important');
                card.style.setProperty('border-radius', '8px', 'important');
                card.style.setProperty('padding', '12px 16px', 'important');
                card.style.setProperty('background', 'rgba(255,255,255,0.5)', 'important');
            }
        });

        updateElement(
            "analyticsDailyStudyTime",
            formatStudyMinutes(
                data.totalStudyTime
            )
        );

        updateElement(
            "analyticsDailySessions",
            formatAnalyticsNumber(
                data.totalSessions
            )
        );

        updateElement(
            "analyticsDailyCompleted",
            formatAnalyticsNumber(
                data.completedSessions
            )
        );

        updateElement(
            "analyticsDailyCompletion",
            formatAnalyticsPercent(
                data.completion
            )
        );
    }

    /* =========================================================
       WEEKLY RENDER - WITH RGB COLORS (Top Border Only) - PURPLE
       ========================================================= */

    function renderWeeklyStudyAnalytics() {

        const data =
            getWeeklyStudyAnalytics();

        // Weekly section with RGB colors - TOP BORDER ONLY
        let weeklySection = null;
        
        // Method 1: Try by class
        weeklySection = document.querySelector('.study-analytics-section.weekly-section');
        
        // Method 2: Try by data attribute if exists
        if (!weeklySection) {
            weeklySection = document.querySelector('[data-section="weekly"]');
        }
        
        // Method 3: Try by nth-child (2nd section)
        if (!weeklySection) {
            const allSections = document.querySelectorAll('.study-analytics-section');
            if (allSections.length >= 2) {
                weeklySection = allSections[1];
            }
        }
        
        // Method 4: Find by header text content
        if (!weeklySection) {
            const sections = document.querySelectorAll('.study-analytics-section');
            for (let i = 0; i < sections.length; i++) {
                const header = sections[i].querySelector('h4, h3, .section-title, .section-header');
                if (header) {
                    const text = header.textContent.trim();
                    if (text.includes('Weekly') || text.includes('সাপ্তাহিক') || text.includes('weekly')) {
                        weeklySection = sections[i];
                        break;
                    }
                }
            }
        }
        
        // Method 5: Try by finding the section that contains weekly stat IDs
        if (!weeklySection) {
            const statIds = ['analyticsWeeklyStudyTime', 'analyticsWeeklyAverage', 'analyticsWeeklySessions'];
            for (let i = 0; i < statIds.length; i++) {
                const element = document.getElementById(statIds[i]);
                if (element) {
                    let parent = element.parentElement;
                    while (parent) {
                        if (parent.classList && parent.classList.contains('study-analytics-section')) {
                            weeklySection = parent;
                            break;
                        }
                        parent = parent.parentElement;
                    }
                    if (weeklySection) break;
                }
            }
        }
        
        // Apply styles to weekly section with !important via setProperty
        if (weeklySection) {
            weeklySection.style.setProperty('border-top', '4px solid #7B2FBE', 'important');
            weeklySection.style.setProperty('border-left', 'none', 'important');
            weeklySection.style.setProperty('border-right', 'none', 'important');
            weeklySection.style.setProperty('border-bottom', 'none', 'important');
            weeklySection.style.setProperty('border-radius', '8px', 'important');
            weeklySection.style.setProperty('background', 'linear-gradient(135deg, rgba(123,47,190,0.06), rgba(123,47,190,0.02))', 'important');
            weeklySection.style.setProperty('padding', '16px', 'important');
            weeklySection.style.setProperty('box-shadow', '0 2px 8px rgba(123,47,190,0.08)', 'important');
            
            console.log('Weekly section purple top border applied');
        } else {
            console.warn('Weekly section not found, trying fallback');
            
            const allElements = document.querySelectorAll('*');
            for (let i = 0; i < allElements.length; i++) {
                const el = allElements[i];
                if (el.textContent && el.textContent.includes('Weekly') && el.textContent.includes('Study Time')) {
                    let parent = el.parentElement;
                    while (parent) {
                        if (parent.tagName === 'DIV' && parent.children.length > 2) {
                            parent.style.setProperty('border-top', '4px solid #7B2FBE', 'important');
                            parent.style.setProperty('border-left', 'none', 'important');
                            parent.style.setProperty('border-right', 'none', 'important');
                            parent.style.setProperty('border-bottom', 'none', 'important');
                            parent.style.setProperty('border-radius', '8px', 'important');
                            parent.style.setProperty('padding', '16px', 'important');
                            console.log('Weekly section found via text fallback');
                            weeklySection = parent;
                            break;
                        }
                        parent = parent.parentElement;
                    }
                    if (weeklySection) break;
                }
            }
        }

        // Weekly stat cards with PURPLE colors
        const weeklyStatIds = [
            { id: 'analyticsWeeklyStudyTime', color: '#7B2FBE' },
            { id: 'analyticsWeeklyAverage', color: '#7B2FBE' },
            { id: 'analyticsWeeklySessions', color: '#7B2FBE' },
            { id: 'analyticsWeeklyCompletion', color: '#7B2FBE' },
            { id: 'analyticsMostProductiveDay', color: '#7B2FBE' }
        ];

        weeklyStatIds.forEach(function(stat) {
            const element = document.getElementById(stat.id);
            if (element) {
                element.style.setProperty('color', stat.color, 'important');
                element.style.setProperty('font-weight', '700', 'important');
                element.style.setProperty('font-size', '1.1rem', 'important');
            }
        });

        // Find stat cards and add colored borders - TOP BORDER ONLY
        let weeklyCards = [];
        
        if (weeklySection) {
            weeklyCards = weeklySection.querySelectorAll('.analytics-stat-card, .stat-card, .stat-item');
        }
        
        // Fallback: Find by IDs
        if (weeklyCards.length === 0) {
            const cardIds = ['analyticsWeeklyStudyTime', 'analyticsWeeklyAverage', 'analyticsWeeklySessions', 'analyticsWeeklyCompletion'];
            cardIds.forEach(function(id) {
                const el = document.getElementById(id);
                if (el) {
                    let card = el.closest('.analytics-stat-card, .stat-card, .stat-item');
                    if (card && !weeklyCards.includes(card)) {
                        weeklyCards.push(card);
                    }
                }
            });
        }
        
        // Second fallback: Get all stat cards from weekly section
        if (weeklyCards.length === 0) {
            const allSections = document.querySelectorAll('.study-analytics-section');
            for (let i = 0; i < allSections.length; i++) {
                const section = allSections[i];
                const header = section.querySelector('h4, h3');
                if (header && (header.textContent.includes('Weekly') || header.textContent.includes('সাপ্তাহিক'))) {
                    weeklyCards = section.querySelectorAll('.analytics-stat-card, .stat-card, .stat-item');
                    break;
                }
            }
        }
        
        const cardColors = [
            '#7B2FBE',
            '#7B2FBE',
            '#7B2FBE',
            '#7B2FBE',
            '#7B2FBE'
        ];
        
        weeklyCards.forEach(function(card, index) {
            if (index < cardColors.length) {
                card.style.setProperty('border-top', '3px solid ' + cardColors[index], 'important');
                card.style.setProperty('border-left', 'none', 'important');
                card.style.setProperty('border-right', 'none', 'important');
                card.style.setProperty('border-bottom', 'none', 'important');
                card.style.setProperty('border-radius', '8px', 'important');
                card.style.setProperty('padding', '12px 16px', 'important');
                card.style.setProperty('background', 'rgba(255,255,255,0.5)', 'important');
            }
        });

        updateElement(
            "analyticsWeeklyStudyTime",
            formatStudyMinutes(
                data.totalStudyTime
            )
        );

        updateElement(
            "analyticsWeeklyAverage",
            formatStudyMinutes(
                data.dailyAverage
            )
        );

        updateElement(
            "analyticsWeeklySessions",
            formatAnalyticsNumber(
                data.totalSessions
            )
        );

        updateElement(
            "analyticsWeeklyCompletion",
            formatAnalyticsPercent(
                data.completion
            )
        );

        updateElement(
            "analyticsMostProductiveDay",
            data.mostProductiveDay
                ? formatAnalyticsDay(
                    data.mostProductiveDay
                )
                : "—"
        );
    }


    /* =========================================================
       MONTHLY RENDER - WITH RGB COLORS (Top Border Only) - GREEN
       ========================================================= */

    function renderMonthlyStudyAnalytics() {

        const data =
            getMonthlyStudyAnalytics();

        // Monthly section with RGB colors - TOP BORDER ONLY
        let monthlySection = null;
        
        // Method 1: Try by class
        monthlySection = document.querySelector('.study-analytics-section.monthly-section');
        
        // Method 2: Try by data attribute if exists
        if (!monthlySection) {
            monthlySection = document.querySelector('[data-section="monthly"]');
        }
        
        // Method 3: Try by nth-child (3rd section)
        if (!monthlySection) {
            const allSections = document.querySelectorAll('.study-analytics-section');
            if (allSections.length >= 3) {
                monthlySection = allSections[2];
            }
        }
        
        // Method 4: Find by header text content
        if (!monthlySection) {
            const sections = document.querySelectorAll('.study-analytics-section');
            for (let i = 0; i < sections.length; i++) {
                const header = sections[i].querySelector('h4, h3, .section-title, .section-header');
                if (header) {
                    const text = header.textContent.trim();
                    if (text.includes('Monthly') || text.includes('মাসিক') || text.includes('monthly')) {
                        monthlySection = sections[i];
                        break;
                    }
                }
            }
        }
        
        // Method 5: Try by finding the section that contains monthly stat IDs
        if (!monthlySection) {
            const statIds = ['analyticsMonthlyStudyTime', 'analyticsMonthlyAverage', 'analyticsMonthlySessions'];
            for (let i = 0; i < statIds.length; i++) {
                const element = document.getElementById(statIds[i]);
                if (element) {
                    let parent = element.parentElement;
                    while (parent) {
                        if (parent.classList && parent.classList.contains('study-analytics-section')) {
                            monthlySection = parent;
                            break;
                        }
                        parent = parent.parentElement;
                    }
                    if (monthlySection) break;
                }
            }
        }
        
        // Apply styles to monthly section - GREEN TOP BORDER ONLY
        if (monthlySection) {
            monthlySection.style.setProperty('border-top', '4px solid rgb(34, 197, 94)', 'important');
            monthlySection.style.setProperty('border-left', 'none', 'important');
            monthlySection.style.setProperty('border-right', 'none', 'important');
            monthlySection.style.setProperty('border-bottom', 'none', 'important');
            monthlySection.style.setProperty('border-radius', '8px', 'important');
            monthlySection.style.setProperty('background', 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(74,222,128,0.02))', 'important');
            monthlySection.style.setProperty('padding', '16px', 'important');
            monthlySection.style.setProperty('box-shadow', '0 2px 8px rgba(34,197,94,0.08)', 'important');
            
            console.log('Monthly section green top border applied');
        } else {
            console.warn('Monthly section not found, trying fallback');
            
            const allElements = document.querySelectorAll('*');
            for (let i = 0; i < allElements.length; i++) {
                const el = allElements[i];
                if (el.textContent && el.textContent.includes('Monthly') && el.textContent.includes('Study Time')) {
                    let parent = el.parentElement;
                    while (parent) {
                        if (parent.tagName === 'DIV' && parent.children.length > 2) {
                            parent.style.setProperty('border-top', '4px solid rgb(34, 197, 94)', 'important');
                            parent.style.setProperty('border-left', 'none', 'important');
                            parent.style.setProperty('border-right', 'none', 'important');
                            parent.style.setProperty('border-bottom', 'none', 'important');
                            parent.style.setProperty('border-radius', '8px', 'important');
                            parent.style.setProperty('padding', '16px', 'important');
                            console.log('Monthly section found via text fallback');
                            monthlySection = parent;
                            break;
                        }
                        parent = parent.parentElement;
                    }
                    if (monthlySection) break;
                }
            }
        }

        // Monthly stat cards with GREEN colors
        const monthlyStatIds = [
            { id: 'analyticsMonthlyStudyTime', color: 'rgb(34, 197, 94)' },
            { id: 'analyticsMonthlyAverage', color: 'rgb(74, 222, 128)' },
            { id: 'analyticsMonthlySessions', color: 'rgb(34, 197, 94)' },
            { id: 'analyticsMonthlyCompletion', color: 'rgb(52, 211, 153)' },
            { id: 'analyticsMostProductiveWeek', color: 'rgb(34, 197, 94)' }
        ];

        monthlyStatIds.forEach(function(stat) {
            const element = document.getElementById(stat.id);
            if (element) {
                element.style.setProperty('color', stat.color, 'important');
                element.style.setProperty('font-weight', '700', 'important');
                element.style.setProperty('font-size', '1.1rem', 'important');
            }
        });

        // Find stat cards and add colored borders - TOP BORDER ONLY
        let monthlyCards = [];
        
        if (monthlySection) {
            monthlyCards = monthlySection.querySelectorAll('.analytics-stat-card, .stat-card, .stat-item');
        }
        
        if (monthlyCards.length === 0) {
            const cardIds = ['analyticsMonthlyStudyTime', 'analyticsMonthlyAverage', 'analyticsMonthlySessions', 'analyticsMonthlyCompletion'];
            cardIds.forEach(function(id) {
                const el = document.getElementById(id);
                if (el) {
                    let card = el.closest('.analytics-stat-card, .stat-card, .stat-item');
                    if (card && !monthlyCards.includes(card)) {
                        monthlyCards.push(card);
                    }
                }
            });
        }
        
        if (monthlyCards.length === 0) {
            const allSections = document.querySelectorAll('.study-analytics-section');
            for (let i = 0; i < allSections.length; i++) {
                const section = allSections[i];
                const header = section.querySelector('h4, h3');
                if (header && (header.textContent.includes('Monthly') || header.textContent.includes('মাসিক'))) {
                    monthlyCards = section.querySelectorAll('.analytics-stat-card, .stat-card, .stat-item');
                    break;
                }
            }
        }
        
        const cardColors = [
            'rgb(34, 197, 94)',
            'rgb(74, 222, 128)',
            'rgb(34, 197, 94)',
            'rgb(52, 211, 153)',
            'rgb(34, 197, 94)'
        ];
        
        monthlyCards.forEach(function(card, index) {
            if (index < cardColors.length) {
                card.style.setProperty('border-top', '3px solid ' + cardColors[index], 'important');
                card.style.setProperty('border-left', 'none', 'important');
                card.style.setProperty('border-right', 'none', 'important');
                card.style.setProperty('border-bottom', 'none', 'important');
                card.style.setProperty('border-radius', '8px', 'important');
                card.style.setProperty('padding', '12px 16px', 'important');
                card.style.setProperty('background', 'rgba(255,255,255,0.5)', 'important');
            }
        });

        updateElement(
            "analyticsMonthlyStudyTime",
            formatStudyMinutes(
                data.totalStudyTime
            )
        );

        updateElement(
            "analyticsMonthlyAverage",
            formatStudyMinutes(
                data.dailyAverage
            )
        );

        updateElement(
            "analyticsMonthlySessions",
            formatAnalyticsNumber(
                data.totalSessions
            )
        );

        updateElement(
            "analyticsMonthlyCompletion",
            formatAnalyticsPercent(
                data.completion
            )
        );

        updateElement(
            "analyticsMostProductiveWeek",
            data.mostProductiveWeek
                ? formatWeekNumber(
                    data.mostProductiveWeek
                )
                : "—"
        );
    }

/* =========================================================
   SUBJECT ANALYTICS RENDER - WITH RGB COLORS (NO PERCENTAGE ON MOST STUDIED)
   ========================================================= */

function renderSubjectStudyAnalytics() {

    const subjects =
        getSubjectStudyAnalytics();

    const container =
        document.getElementById(
            "studySubjectAnalytics"
        );


    const most =
        getMostStudiedSubject();

    const least =
        getLeastStudiedSubject();

    // Get RGB color for most studied subject
    let mostColor = '';
    let leastColor = '';
    
    if (most) {
        const colorObj = getAnalyticsSubjectColor(most.subject);
        mostColor = "rgb(" + colorObj.r + ", " + colorObj.g + ", " + colorObj.b + ")";
    }
    
    if (least) {
        const colorObj = getAnalyticsSubjectColor(least.subject);
        leastColor = "rgb(" + colorObj.r + ", " + colorObj.g + ", " + colorObj.b + ")";
    }

    // Update Most Studied Subject with RGB color - NO PERCENTAGE
    updateElement(
        "analyticsMostStudiedSubject",

        most
            ? most.subject +
              " • " +
              formatStudyMinutes(
                  most.totalStudyTime
              )
            : "—"
    );

    // Apply RGB color to Most Studied Subject
    const mostElement = document.getElementById("analyticsMostStudiedSubject");
    if (mostElement && mostColor) {
        mostElement.style.setProperty('color', mostColor, 'important');
        mostElement.style.setProperty('font-weight', '700', 'important');
    }

    // Update Least Studied Subject with RGB color
    updateElement(
        "analyticsLeastStudiedSubject",

        least
            ? least.subject +
              " • " +
              formatStudyMinutes(
                  least.totalStudyTime
              )
            : "—"
    );

    // Apply RGB color to Least Studied Subject
    const leastElement = document.getElementById("analyticsLeastStudiedSubject");
    if (leastElement && leastColor) {
        leastElement.style.setProperty('color', leastColor, 'important');
        leastElement.style.setProperty('font-weight', '700', 'important');
    }


    if (!container) {
        return;
    }


    if (
        !subjects ||
        subjects.length === 0
    ) {

        container.innerHTML =
            `
            <p class="empty-state"
               style="padding:20px;text-align:center;color:#64748b;">
                ${escapeAnalyticsHTML(
                    getAnalyticsText("noData")
                )}
            </p>
            `;

        return;
    }


    const selectAllText =
        getAnalyticsText("selectAll");

    const deleteSelectedText =
        getAnalyticsText("deleteSelected");

    const selectedText =
        getAnalyticsText("selected");


    let html = `

        <div
            class="study-analytics-select-all-container"
            style="
                display:flex;
                align-items:center;
                gap:12px;
                margin-bottom:16px;
                padding:10px 16px;
                background:#f8fafc;
                border-radius:10px;
                flex-wrap:wrap;
                border:1px solid #e2e8f0;
            "
        >

            <label
                style="
                    display:flex;
                    align-items:center;
                    gap:8px;
                    font-size:0.9rem;
                    cursor:pointer;
                    color:#1e293b;
                    font-weight:500;
                "
            >

                <input
                    type="checkbox"
                    id="selectAllSubjects"
                    style="
                        width:18px;
                        height:18px;
                        accent-color:#7c3aed;
                        cursor:pointer;
                    "
                >

                ${escapeAnalyticsHTML(
                    selectAllText
                )}

            </label>


            <button
                id="deleteSelectedSubjects"
                class="study-delete-selected-btn"
                style="
                    padding:6px 18px;
                    background:#7c3aed;
                    color:#ffffff;
                    border:none;
                    border-radius:8px;
                    font-size:0.85rem;
                    font-weight:500;
                    cursor:pointer;
                    display:none;
                "
            >
                ${escapeAnalyticsHTML(
                    deleteSelectedText
                )}
            </button>


            <span
                id="selectedCount"
                style="
                    font-size:0.85rem;
                    color:#64748b;
                    margin-left:auto;
                    font-weight:500;
                "
            >
                ${escapeAnalyticsHTML(
                    selectedText.replace(
                        "{count}",
                        "0"
                    )
                )}
            </span>

        </div>
    `;


    html += subjects
        .map(
            function (item, index) {

                const deleteLabel =
                    getAnalyticsText(
                        "delete"
                    );

                const colorObj =
                    getAnalyticsSubjectColor(item.subject, index);
                
                const colorRGB =
                    "rgb(" + colorObj.r + ", " + colorObj.g + ", " + colorObj.b + ")";

                // Check if this subject is selected
                const isSelected = item.selected || false;

                // Check if subject is completed
                const isComplete = item.completion >= 100 || item.isFullyCompleted === true;

                return `

                    <div
                        class="study-analytics-subject-row ${isSelected ? 'selected-row' : ''}"
                        data-subject="${escapeAnalyticsHTML(
                            item.subject
                        )}"
                        style="
                            display:flex;
                            align-items:center;
                            gap:12px;
                            padding:10px 14px;
                            border-bottom:1px solid #f1f5f9;
                            border-radius:6px;
                            margin-bottom:2px;
                            background:${isSelected ? '#ede9fe' : (isComplete ? 'rgba(34,197,94,0.06)' : '#ffffff')};
                            border-left: ${isSelected ? '4px solid #7c3aed' : (isComplete ? '4px solid #22c55e' : '4px solid transparent')};
                            transition:all 0.2s ease;
                        "
                    >

                        <input
                            type="checkbox"
                            class="subject-select-checkbox"
                            data-subject="${escapeAnalyticsHTML(
                                item.subject
                            )}"
                            ${isSelected ? 'checked' : ''}
                            style="
                                width:18px;
                                height:18px;
                                accent-color:#7c3aed;
                                cursor:pointer;
                                flex-shrink:0;
                            "
                        >


                        <span
                            style="
                                display:inline-block;
                                width:4px;
                                height:32px;
                                border-radius:4px;
                                background:${colorRGB};
                                flex-shrink:0;
                            "
                        ></span>


                        <div
                            class="study-analytics-subject-info"
                            style="
                                flex:1;
                                min-width:0;
                            "
                        >

                            <strong
                                style="
                                    font-size:0.95rem;
                                    color:${colorRGB} !important;
                                    font-weight:700;
                                "
                            >
                                ${isComplete ? '🎉 ' : ''}
                                ${escapeAnalyticsHTML(
                                    item.subject
                                )}
                            </strong>

                            <span
                                style="
                                    font-size:0.8rem;
                                    color:#64748b;
                                    margin-left:8px;
                                "
                            >
                                ${escapeAnalyticsHTML(
                                    formatStudyMinutes(
                                        item.totalStudyTime
                                    )
                                )}
                            </span>

                            ${item.targetTime > 0 ? `
                                <span
                                    style="
                                        font-size:0.7rem;
                                        color:#94a3b8;
                                        margin-left:8px;
                                    "
                                >
                                    (Target: ${escapeAnalyticsHTML(
                                        formatStudyMinutes(item.targetTime)
                                    )})
                                </span>
                            ` : ''}

                        </div>


                        <div
                            class="study-analytics-subject-meta"
                            style="
                                display:flex;
                                gap:14px;
                                font-size:0.75rem;
                                color:#64748b;
                                flex-shrink:0;
                            "
                        >

                            <span
                                style="
                                    background:#f1f5f9;
                                    padding:2px 10px;
                                    border-radius:12px;
                                "
                            >
                                ${escapeAnalyticsHTML(
                                    formatAnalyticsNumber(
                                        item.totalSessions
                                    )
                                )}
                                ${escapeAnalyticsHTML(
                                    getAnalyticsText(
                                        "sessions"
                                    )
                                )}
                            </span>


                            <span
                                style="
                                    background:${isComplete ? '#22c55e' : '#f1f5f9'};
                                    padding:2px 10px;
                                    border-radius:12px;
                                    color: ${isComplete ? '#ffffff' : (item.completion >= 80 ? '#22c55e' : item.completion >= 50 ? '#f59e0b' : '#ef4444')};
                                    font-weight:600;
                                "
                            >
                                ${isComplete ? '✅ 100%' : escapeAnalyticsHTML(
                                    formatAnalyticsPercent(
                                        item.completion
                                    )
                                )}
                                ${!isComplete ? escapeAnalyticsHTML(
                                    getAnalyticsText(
                                        "completion"
                                    )
                                ) : ''}
                            </span>

                        </div>


                        <div
                            style="
                                width:80px;
                                height:6px;
                                background:#e2e8f0;
                                border-radius:4px;
                                overflow:hidden;
                                flex-shrink:0;
                            "
                        >

                            <div
                                style="
                                    width:${Math.min(
                                        100,
                                        Math.max(
                                            0,
                                            item.completion
                                        )
                                    )}%;
                                    height:100%;
                                    background:${isComplete ? '#22c55e' : colorRGB};
                                    border-radius:4px;
                                    transition:width 0.3s;
                                "
                            ></div>

                        </div>


                        <button
                            class="study-subject-delete-btn delete-btn"
                            data-subject="${escapeAnalyticsHTML(
                                item.subject
                            )}"
                            title="${escapeAnalyticsHTML(
                                deleteLabel
                            )}"
                            style="
                                background:none;
                                border:none;
                                color:#94a3b8;
                                cursor:pointer;
                                font-size:1rem;
                                padding:4px 8px;
                                flex-shrink:0;
                                border-radius:50%;
                                width:32px;
                                height:32px;
                                transition:all 0.2s ease;
                                opacity:0.4;
                            "
                        >
                            ✕
                        </button>

                    </div>
                `;
            }
        )
        .join("");


    container.innerHTML =
        html;


    /* =====================================================
       REFERENCES
       ===================================================== */

    const selectAllCheckbox =
        document.getElementById(
            "selectAllSubjects"
        );

    const deleteSelectedBtn =
        document.getElementById(
            "deleteSelectedSubjects"
        );

    const selectedCountSpan =
        document.getElementById(
            "selectedCount"
        );


    /* =====================================================
       UPDATE SELECTED COUNT
       ===================================================== */

    function updateSelectedCount() {

        const checkboxes =
            container.querySelectorAll(
                ".subject-select-checkbox:checked"
            );

        const count =
            checkboxes.length;


        if (selectedCountSpan) {

            const text =
                getAnalyticsText(
                    "selected"
                ).replace(
                    "{count}",
                    currentLang === "bn"
                        ? toBanglaNumber(count)
                        : count
                );

            selectedCountSpan.textContent =
                text;
        }


        if (deleteSelectedBtn) {

            if (count > 0) {

                deleteSelectedBtn.style.display =
                    "inline-block";

                deleteSelectedBtn.textContent =
                    currentLang === "bn"
                        ? toBanglaNumber(count) +
                          "টি মুছুন"
                        : "Delete " +
                          count;

            } else {

                deleteSelectedBtn.style.display =
                    "none";
            }
        }


        if (selectAllCheckbox) {

            const allCheckboxes =
                container.querySelectorAll(
                    ".subject-select-checkbox"
                );

            const checkedCheckboxes =
                container.querySelectorAll(
                    ".subject-select-checkbox:checked"
                );


            if (
                allCheckboxes.length > 0
            ) {

                selectAllCheckbox.checked =
                    allCheckboxes.length ===
                    checkedCheckboxes.length;

                selectAllCheckbox.indeterminate =
                    checkedCheckboxes.length > 0 &&
                    checkedCheckboxes.length <
                        allCheckboxes.length;

            } else {

                selectAllCheckbox.checked =
                    false;

                selectAllCheckbox.indeterminate =
                    false;
            }
        }

        // Update row styles based on selection
        container.querySelectorAll('.study-analytics-subject-row').forEach(function(row) {
            const checkbox = row.querySelector('.subject-select-checkbox');
            if (checkbox && checkbox.checked) {
                row.style.background = '#ede9fe';
                row.style.borderLeft = '4px solid #7c3aed';
                row.style.boxShadow = '0 2px 8px rgba(124,58,237,0.15)';
            } else {
                row.style.background = 'transparent';
                row.style.borderLeft = '4px solid transparent';
                row.style.boxShadow = 'none';
            }
        });
    }


    /* =====================================================
       SINGLE DELETE
       ===================================================== */

    container
        .querySelectorAll(
            ".study-subject-delete-btn"
        )
        .forEach(
            function (btn) {

                btn.addEventListener(
                    "click",
                    function (e) {

                        e.preventDefault();
                        e.stopPropagation();

                        const subject =
                            this.getAttribute(
                                "data-subject"
                            );

                        if (subject) {

                            deleteSubject(
                                subject
                            );
                        }
                    }
                );
            }
        );


    /* =====================================================
       SELECT ALL
       ===================================================== */

    if (selectAllCheckbox) {

        selectAllCheckbox.addEventListener(
            "change",
            function () {

                const checkboxes =
                    container.querySelectorAll(
                        ".subject-select-checkbox"
                    );

                checkboxes.forEach(
                    function (checkbox) {

                        checkbox.checked =
                            selectAllCheckbox.checked;
                    }
                );

                updateSelectedCount();
            }
        );
    }


    /* =====================================================
       INDIVIDUAL CHECKBOXES
       ===================================================== */

    container
        .querySelectorAll(
            ".subject-select-checkbox"
        )
        .forEach(
            function (checkbox) {

                checkbox.addEventListener(
                    "change",
                    updateSelectedCount
                );
            }
        );


    /* =====================================================
       DELETE SELECTED
       ===================================================== */

    if (deleteSelectedBtn) {

        deleteSelectedBtn.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                const selected =
                    container.querySelectorAll(
                        ".subject-select-checkbox:checked"
                    );

                if (
                    selected.length === 0
                ) {
                    return;
                }


                const subjectsToDelete = [];


                selected.forEach(
                    function (checkbox) {

                        const subject =
                            checkbox.getAttribute(
                                "data-subject"
                            );

                        if (subject) {

                            subjectsToDelete.push(
                                subject
                            );
                        }
                    }
                );


                deleteMultipleSubjects(
                    subjectsToDelete
                );
            }
        );
    }


    /* =====================================================
       HOVER EFFECT
       ===================================================== */

    container
        .querySelectorAll(
            ".study-analytics-subject-row"
        )
        .forEach(
            function (row) {

                row.addEventListener(
                    "mouseenter",
                    function () {
                        if (!this.querySelector('.subject-select-checkbox:checked')) {
                            this.style.background = "#f8fafc";
                        }
                        this.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                    }
                );


                row.addEventListener(
                    "mouseleave",
                    function () {
                        if (!this.querySelector('.subject-select-checkbox:checked')) {
                            this.style.background = "transparent";
                        }
                        this.style.boxShadow = "none";
                    }
                );
            }
        );


    updateSelectedCount();
    
    // Apply theme styles after rendering
    var isDark = document.body.classList.contains('dark') || 
                  document.body.classList.contains('dark-mode');
    if (isDark) {
        setTimeout(applyDarkModeStyles, 100);
    } else {
        setTimeout(applyLightModeStyles, 100);
    }
}
/* =========================================================
   WEEKLY CHART - WITH RGB GRADIENT COLORS FOR DARK MODE
========================================================= */
function renderWeeklyChart() {

    const container = document.getElementById("weeklyStudyChart");

    if (!container) { return; }

    const data = getWeeklyChartData();

    // Check if dark mode is active
    const isDarkMode = document.body.classList.contains('dark') || 
                        document.body.classList.contains('dark-mode');

    if (!data || data.length === 0 || data.every(function (item) { return item.minutes === 0; })) {
        container.innerHTML = `
            <p class="empty-state" style="padding:20px;text-align:center;color:#64748b;">
                ${escapeAnalyticsHTML(getAnalyticsText("noData"))}
            </p>
        `;
        return;
    }

    let max = 0;
    data.forEach(function (item) {
        if (item.minutes > max) { max = item.minutes; }
    });

    if (max === 0) { max = 1; }

    let html = "";

    // =========================================================
    // RGB COLORS - Vibrant for both Light & Dark Mode
    // =========================================================
    const colors = {
        high: 'rgb(34, 197, 94)',           // Bright Green
        medium: 'rgb(245, 158, 11)',        // Bright Orange
        low: 'rgb(59, 130, 246)',           // Bright Blue
        zero: isDarkMode 
            ? 'rgb(51, 65, 85)'             // Dark gray for dark mode
            : 'rgb(229, 231, 235)'          // Light gray for light mode
    };

    // RGB Text Colors
    const labelColor = isDarkMode 
        ? 'rgb(148, 163, 184)'              // Muted text for dark mode
        : 'rgb(148, 163, 184)';             // Muted text for light mode

    const valueColor = isDarkMode 
        ? 'rgb(203, 213, 225)'              // Light text for dark mode
        : 'rgb(100, 116, 139)';             // Dark text for light mode

    data.forEach(function (item) {
        let heightPercent = 0;
        if (item.minutes > 0) {
            heightPercent = Math.max(10, (item.minutes / max) * 100);
        }

        const displayTime = item.minutes > 0 ? formatStudyMinutes(item.minutes) : "";

        // =========================================================
        // GRADIENT RGB COLORS FOR BARS
        // =========================================================
        let barColor;
        if (item.minutes === 0) {
            barColor = isDarkMode ? 'rgb(51, 65, 85)' : 'rgb(229, 231, 235)';
        } else if (item.minutes >= 60) {
            // Green gradient
            barColor = 'linear-gradient(180deg, rgb(34, 197, 94), rgb(21, 128, 61))';
        } else if (item.minutes >= 30) {
            // Orange gradient
            barColor = 'linear-gradient(180deg, rgb(245, 158, 11), rgb(217, 119, 6))';
        } else {
            // Blue gradient
            barColor = 'linear-gradient(180deg, rgb(59, 130, 246), rgb(37, 99, 235))';
        }

        // =========================================================
        // ADD SHADOW FOR DARK MODE
        // =========================================================
        let barShadow = '';
        if (isDarkMode && item.minutes > 0) {
            if (item.minutes >= 60) {
                barShadow = 'box-shadow: 0 0 12px rgba(34, 197, 94, 0.5);';
            } else if (item.minutes >= 30) {
                barShadow = 'box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);';
            } else {
                barShadow = 'box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);';
            }
        }

        html += `
            <div class="study-chart-column" style="
                display:flex;
                flex-direction:column;
                align-items:center;
                flex:1;
                height:100%;
            ">
                <div class="study-chart-value" style="
                    font-size:0.7rem;
                    color:${valueColor};
                    margin-bottom:4px;
                    font-weight:600;
                ">
                    ${escapeAnalyticsHTML(displayTime)}
                </div>

                <div class="study-chart-bar-area" style="
                    flex:1;
                    display:flex;
                    align-items:flex-end;
                    width:100%;
                    justify-content:center;
                ">
                    <div class="study-chart-bar" style="
                        height:${heightPercent}%;
                        background:${barColor};
                        min-height:${item.minutes > 0 ? "6px" : "2px"};
                        border-radius:4px 4px 0 0;
                        width:70%;
                        max-width:40px;
                        transition: all 0.3s ease;
                        ${barShadow}
                    " title="${escapeAnalyticsHTML(item.label + ": " + formatStudyMinutes(item.minutes))}">
                    </div>
                </div>

                <span class="study-chart-label" style="
                    font-size:0.7rem;
                    color:${labelColor};
                    margin-top:6px;
                    font-weight:500;
                ">
                    ${escapeAnalyticsHTML(item.label)}
                </span>
            </div>
        `;
    });

    container.style.cssText = `
        display:flex;
        align-items:flex-end;
        justify-content:space-around;
        height:200px;
        padding:10px 0;
        gap:4px;
        width:100%;
        background: ${isDarkMode ? 'rgba(15, 23, 42, 0.3)' : '#ffffff'};
        border-radius: 8px;
        ${isDarkMode ? 'border: 1px solid rgba(51, 65, 85, 0.2);' : 'border: 1px solid rgba(226, 232, 240, 0.6);'}
    `;
}

/* =========================================================
       MONTHLY TREND
  ========================================================= */

    function renderMonthlyTrendChart() {

        const container =
            document.getElementById(
                "monthlyStudyTrend"
            );

        if (!container) {
            return;
        }


        const data =
            getMonthlyTrendData();


        const hasData =
            data.some(
                function (item) {
                    return item.minutes > 0;
                }
            );


        if (!hasData) {

            container.innerHTML =
                `
                <p class="empty-state"
                   style="padding:20px;text-align:center;color:#64748b;">
                    ${escapeAnalyticsHTML(
                        getAnalyticsText("noData")
                    )}
                </p>
                `;

            return;
        }


        const max =
            Math.max.apply(
                null,
                data.map(
                    function (item) {
                        return item.minutes;
                    }
                )
            ) || 1;


        container.innerHTML =
            data.map(
                function (item) {

                    const height =
                        item.minutes > 0
                            ? Math.max(
                                2,
                                (
                                    item.minutes /
                                    max
                                ) * 100
                            )
                            : 0;


                    const title =
                        currentLang === "bn"

                            ? "দিন " +
                              toBanglaNumber(
                                  item.day
                              ) +
                              ": " +
                              formatStudyMinutes(
                                  item.minutes
                              )

                            : "Day " +
                              item.day +
                              ": " +
                              formatStudyMinutes(
                                  item.minutes
                              );


                    return `

                        <div
                            class="study-trend-column"
                            style="
                                flex:1;
                                display:flex;
                                flex-direction:column;
                                align-items:center;
                                height:100%;
                                justify-content:flex-end;
                            "
                            title="${escapeAnalyticsHTML(
                                title
                            )}"
                        >

                            <div
                                class="study-trend-bar"
                                style="
                                    width:60%;
                                    min-width:3px;
                                    height:${height}%;
                                    background:linear-gradient(
                                        180deg,
                                        #7c3aed,
                                        #6d28d9
                                    );
                                    border-radius:3px 3px 0 0;
                                "
                            ></div>

                        </div>
                    `;
                }
            )
            .join("");


        container.style.cssText =
            `
            display:flex;
            align-items:flex-end;
            height:150px;
            gap:2px;
            padding:5px 0;
            width:100%;
            `;
    }


    /* =========================================================
       SUBJECT DISTRIBUTION - PIE CHART WITH RGB COLORS (NO CENTER TEXT, SIMPLE LEGEND)
       ========================================================= */

function renderSubjectDistributionChart() {

    const pie = document.getElementById("subjectDistributionPie");
    const legend = document.getElementById("subjectDistributionLegend");

    if (!pie) { return; }

    const subjects = getSubjectStudyAnalytics();

    const data = subjects
        .filter(function (item) {
            return item.totalStudyTime > 0 || item.targetTime > 0;
        })
        .map(function (item) {
            return {
                subject: item.subject,
                completion: item.completion,
                totalStudyTime: item.totalStudyTime,
                targetTime: item.targetTime
            };
        });

    if (legend) { legend.innerHTML = ""; }

    if (data.length === 0) {
        pie.style.background = "conic-gradient(#e5e7eb 0deg 360deg)";
        pie.style.width = "220px";
        pie.style.height = "220px";
        pie.style.margin = "0 auto";
        pie.style.borderRadius = "50%";
        pie.style.boxShadow = "none";

        if (legend) {
            legend.innerHTML = `
                <p class="empty-state" style="font-size:0.9rem;padding:12px;text-align:center;color:#64748b;">
                    ${escapeAnalyticsHTML(getAnalyticsText("noData"))}
                </p>
            `;
        }
        return;
    }

    const totalCompletion = data.reduce(function(sum, item) {
        return sum + item.completion;
    }, 0);

    if (totalCompletion <= 0) {
        pie.style.background = "conic-gradient(#e5e7eb 0deg 360deg)";
        return;
    }

    const existingLabel = document.getElementById('pieCenterLabel');
    if (existingLabel) { existingLabel.remove(); }

    pie.style.width = "220px";
    pie.style.height = "220px";
    pie.style.margin = "0 auto";
    pie.style.borderRadius = "50%";
    pie.style.boxShadow = "0 4px 24px rgba(124,58,237,0.3)";
    pie.style.position = "relative";

    let degree = 0;
    const gradients = data.map(function(item, index) {
        const percentage = (item.completion / totalCompletion) * 100;
        const start = degree;
        degree += percentage * 3.6;

        const colorObj = getAnalyticsSubjectColor(item.subject, index);
        const colorRGB = "rgb(" + colorObj.r + ", " + colorObj.g + ", " + colorObj.b + ")";

        return colorRGB + " " + start + "deg " + degree + "deg";
    });

    pie.style.background = "conic-gradient(" + gradients.join(",") + ")";

    if (!legend) { return; }

    const deleteLabel = getAnalyticsText("delete");

    legend.style.display = "grid";
    legend.style.gridTemplateColumns = "repeat(auto-fill,minmax(150px,1fr))";
    legend.style.gap = "8px 12px";
    legend.style.padding = "8px 0";
    legend.style.width = "100%";
    legend.style.maxWidth = "400px";
    legend.style.margin = "0 auto";

    // UPDATED: Removed percentage display from legend
    legend.innerHTML = data.map(function(item, index) {
        const colorObj = getAnalyticsSubjectColor(item.subject, index);
        const colorRGB = "rgb(" + colorObj.r + ", " + colorObj.g + ", " + colorObj.b + ")";
        
        // Check if subject is completed
        const isComplete = item.completion >= 100;

        return `
            <div
                class="study-pie-legend-row"
                data-subject="${escapeAnalyticsHTML(item.subject)}"
                style="
                    display:flex;
                    align-items:center;
                    gap:8px;
                    padding:6px 12px;
                    border-radius:8px;
                    background:#ffffff !important;
                    border:1px solid #e2e8f0 !important;
                    transition:all 0.2s ease;
                    ${isComplete ? 'border-left: 3px solid #22c55e !important;' : ''}
                "
            >
                <span
                    style="
                        width:12px;
                        height:12px;
                        border-radius:50%;
                        background:${colorRGB};
                        flex-shrink:0;
                        border:2px solid rgba(255,255,255,0.3);
                        box-shadow:0 2px 4px rgba(0,0,0,0.1);
                    "
                ></span>

                <span
                    class="study-pie-subject-name"
                    style="
                        flex:1;
                        font-size:0.85rem;
                        font-weight:600;
                        color:${colorRGB} !important;
                        text-shadow: none !important;
                    "
                >
                    ${isComplete ? '🎉 ' : ''}
                    ${escapeAnalyticsHTML(item.subject)}
                </span>

                <!-- PERCENTAGE REMOVED - Only subject name shown -->

                <button
                    class="study-subject-delete-btn delete-btn"
                    data-subject="${escapeAnalyticsHTML(item.subject)}"
                    title="${escapeAnalyticsHTML(deleteLabel)}"
                    style="
                        background:none;
                        border:none;
                        color:#94a3b8;
                        cursor:pointer;
                        font-size:0.8rem;
                        padding:2px 6px;
                        width:24px;
                        height:24px;
                        border-radius:50%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        transition:all 0.2s ease;
                        opacity:0.3;
                    "
                >
                    ✕
                </button>
            </div>
        `;
    }).join("");

    legend.querySelectorAll(".delete-btn").forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            const subject = this.getAttribute("data-subject");
            if (subject) { deleteSubject(subject); }
        });
    });

    // Apply theme styles
    var isDark = document.body.classList.contains('dark') || 
                  document.body.classList.contains('dark-mode');
    if (isDark) {
        setTimeout(applyDarkModeStyles, 100);
    } else {
        setTimeout(applyLightModeStyles, 100);
    }
}

    /* =========================================================
       SUBJECT COMPARISON - WITH RGB COLORS
       ========================================================= */
function renderSubjectComparisonChart() {

    const container =
        document.getElementById(
            "subjectStudyComparison"
        );

    if (!container) {
        return;
    }

    const data =
        getSubjectStudyAnalytics();

    if (data.length === 0) {
        container.innerHTML = `
            <p class="empty-state"
               style="padding:20px;text-align:center;color:#64748b;">
                ${escapeAnalyticsHTML(
                    getAnalyticsText("noData")
                )}
            </p>
        `;
        return;
    }

    const max =
        Math.max.apply(
            null,
            data.map(
                function (item) {
                    return item.totalStudyTime;
                }
            )
        ) || 1;

    const deleteLabel =
        getAnalyticsText(
            "delete"
        );

    container.innerHTML =
        data.map(
            function (item, index) {

                const width =
                    (
                        item.totalStudyTime /
                        max
                    ) * 100;

                const colorObj =
                    getAnalyticsSubjectColor(item.subject, index);
                
                const colorRGB =
                    "rgb(" + colorObj.r + ", " + colorObj.g + ", " + colorObj.b + ")";

                // Show target info if available - NO EMOJI, NO 100%
                const targetInfo = item.targetTime > 0
                    ? " / " + formatStudyMinutes(item.targetTime) + " target"
                    : "";

                // Show study time only - NO EMOJI, NO 100% badge
                const timeDisplay = escapeAnalyticsHTML(
                    formatStudyMinutes(item.totalStudyTime)
                );

                return `

                    <div
                        class="study-comparison-row"
                        data-subject="${escapeAnalyticsHTML(
                            item.subject
                        )}"
                        style="
                            display:flex;
                            align-items:center;
                            gap:12px;
                            padding:8px 12px;
                            border-radius:8px;
                            transition:all 0.2s ease;
                            background:#ffffff;
                            border:1px solid #e5e7eb;
                            margin-bottom:4px;
                        "
                    >

                        <div
                            class="study-comparison-name"
                            style="
                                min-width:100px;
                                font-size:0.85rem;
                                font-weight:700;
                                color:${colorRGB} !important;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                            "
                        >
                            ${escapeAnalyticsHTML(
                                item.subject
                            )}
                        </div>

                        <div
                            class="study-comparison-track"
                            style="
                                flex:1;
                                height:8px;
                                background:#e2e8f0;
                                border-radius:6px;
                                overflow:hidden;
                            "
                        >

                            <div
                                class="study-comparison-fill"
                                style="
                                    width:${Math.min(
                                        100,
                                        Math.max(
                                            0,
                                            width
                                        )
                                    )}%;
                                    height:100%;
                                    background:${colorRGB};
                                    border-radius:6px;
                                    transition:width 0.4s ease;
                                    box-shadow:0 1px 4px ${colorRGB + '40'};
                                "
                            ></div>

                        </div>

                        <div
                            class="study-comparison-value"
                            style="
                                font-size:0.8rem;
                                color:${colorRGB} !important;
                                min-width:80px;
                                text-align:right;
                                font-weight:700;
                            "
                        >
                            ${timeDisplay}
                            ${escapeAnalyticsHTML(
                                targetInfo
                            )}
                        </div>

                        <button
                            class="study-subject-delete-btn delete-btn"
                            data-subject="${escapeAnalyticsHTML(
                                item.subject
                            )}"
                            title="${escapeAnalyticsHTML(
                                deleteLabel
                            )}"
                            style="
                                background:none;
                                border:none;
                                color:#94a3b8;
                                cursor:pointer;
                                font-size:0.9rem;
                                padding:2px 8px;
                                width:28px;
                                height:28px;
                                border-radius:50%;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                transition:all 0.2s ease;
                                opacity:0.4;
                            "
                        >
                            ✕
                        </button>

                    </div>
                `;
            }
        )
        .join("");

    container
        .querySelectorAll(
            ".delete-btn"
        )
        .forEach(
            function (btn) {

                btn.addEventListener(
                    "click",
                    function (e) {

                        e.preventDefault();
                        e.stopPropagation();

                        const subject =
                            this.getAttribute(
                                "data-subject"
                            );

                        if (subject) {

                            deleteSubject(
                                subject
                            );
                        }
                    }
                );
            }
        );
        
    var isDark = document.body.classList.contains('dark') || 
                  document.body.classList.contains('dark-mode');
    if (isDark) {
        setTimeout(applyDarkModeStyles, 100);
    } else {
        setTimeout(applyLightModeStyles, 100);
    }
}


    /* =========================================================
       DARK MODE STYLES APPLICATION - FIXED WITH !IMPORTANT
       ========================================================= */

    function applyDarkModeStyles() {
        // Check if dark mode is actually active
        var isDark = document.body.classList.contains('dark') || 
                      document.body.classList.contains('dark-mode');
        
        if (!isDark) {
            applyLightModeStyles();
            return;
        }

        // Subject Distribution Legend
        document.querySelectorAll('.study-pie-legend-row .study-pie-subject-name').forEach(function(el) {
            var color = el.style.color;
            if (color && color.startsWith('rgb')) {
                el.style.setProperty('color', color, 'important');
                el.style.setProperty('text-shadow', '0 0 25px ' + color + '80', 'important');
                el.style.setProperty('font-weight', '700', 'important');
            }
        });

        // Subject Comparison
        document.querySelectorAll('.study-comparison-row .study-comparison-name').forEach(function(el) {
            var color = el.style.color;
            if (color && color.startsWith('rgb')) {
                el.style.setProperty('color', color, 'important');
                el.style.setProperty('text-shadow', '0 0 25px ' + color + '80', 'important');
                el.style.setProperty('font-weight', '700', 'important');
            }
        });

        document.querySelectorAll('.study-comparison-row .study-comparison-value').forEach(function(el) {
            var color = el.style.color;
            if (color && color.startsWith('rgb')) {
                el.style.setProperty('color', color, 'important');
                el.style.setProperty('text-shadow', '0 0 25px ' + color + '80', 'important');
                el.style.setProperty('font-weight', '700', 'important');
            }
        });

        // Subject Analytics Rows
        document.querySelectorAll('.study-analytics-subject-row .study-analytics-subject-info strong').forEach(function(el) {
            var color = el.style.color;
            if (color && color.startsWith('rgb')) {
                el.style.setProperty('color', color, 'important');
                el.style.setProperty('text-shadow', '0 0 25px ' + color + '80', 'important');
                el.style.setProperty('font-weight', '700', 'important');
            }
        });

        // Selected rows in dark mode
        document.querySelectorAll('.study-analytics-subject-row.selected-row').forEach(function(el) {
            el.style.setProperty('background', '#2d1b69', 'important');
            el.style.setProperty('border-left', '4px solid #7c3aed', 'important');
        });

        // Subject Distribution Legend
        document.querySelectorAll('.study-pie-legend-row').forEach(function(el) {
            el.style.setProperty('background', '#1e293b', 'important');
            el.style.setProperty('border-color', '#334155', 'important');
        });

        // Subject Comparison
        document.querySelectorAll('.study-comparison-row').forEach(function(el) {
            el.style.setProperty('background', '#1e293b', 'important');
            el.style.setProperty('border-color', '#334155', 'important');
        });

        // Subject Analytics Rows
        document.querySelectorAll('.study-analytics-subject-row').forEach(function(el) {
            el.style.setProperty('background', '#1e293b', 'important');
            el.style.setProperty('border-bottom', '1px solid #334155', 'important');
        });

        // Select All Container
        document.querySelectorAll('.study-analytics-select-all-container').forEach(function(el) {
            el.style.setProperty('background', '#1e293b', 'important');
            el.style.setProperty('border-color', '#334155', 'important');
        });

        // Meta spans
        document.querySelectorAll('.study-analytics-subject-meta span').forEach(function(el) {
            el.style.setProperty('background', '#2d3748', 'important');
            el.style.setProperty('color', '#e2e8f0', 'important');
        });

        // Count span
        var countSpan = document.getElementById('selectedCount');
        if (countSpan) {
            countSpan.style.setProperty('color', '#94a3b8', 'important');
        }

        // Labels in select all
        document.querySelectorAll('.study-analytics-select-all-container label').forEach(function(el) {
            el.style.setProperty('color', '#ffffff', 'important');
        });

        // Delete button
        document.querySelectorAll('.study-delete-selected-btn').forEach(function(el) {
            el.style.setProperty('color', '#ffffff', 'important');
            el.style.setProperty('background', '#7c3aed', 'important');
        });

        // Daily, Weekly, Monthly stat values
        document.querySelectorAll('#analyticsDailyStudyTime, #analyticsWeeklyStudyTime, #analyticsMonthlyStudyTime').forEach(function(el) {
            var color = el.style.color;
            if (color && color.startsWith('rgb')) {
                el.style.setProperty('color', color, 'important');
                el.style.setProperty('text-shadow', '0 0 20px ' + color + '60', 'important');
            }
        });

        console.log('Dark mode styles applied');
    }


    /* =========================================================
       LIGHT MODE STYLES APPLICATION
       ========================================================= */

    function applyLightModeStyles() {
        // Subject Distribution Legend
        document.querySelectorAll('.study-pie-legend-row').forEach(function(el) {
            el.style.setProperty('background', '#ffffff', 'important');
            el.style.setProperty('border-color', '#e2e8f0', 'important');
            el.style.removeProperty('box-shadow');
        });

        // Subject Comparison
        document.querySelectorAll('.study-comparison-row').forEach(function(el) {
            el.style.setProperty('background', '#ffffff', 'important');
            el.style.setProperty('border-color', '#e5e7eb', 'important');
            el.style.removeProperty('box-shadow');
        });

        // Subject Comparison - Name colors
        document.querySelectorAll('.study-comparison-row .study-comparison-name').forEach(function(el) {
            var color = el.style.color;
            if (color && color.startsWith('rgb')) {
                el.style.setProperty('color', color, 'important');
                el.style.removeProperty('text-shadow');
            }
        });

        document.querySelectorAll('.study-comparison-row .study-comparison-value').forEach(function(el) {
            var color = el.style.color;
            if (color && color.startsWith('rgb')) {
                el.style.setProperty('color', color, 'important');
                el.style.removeProperty('text-shadow');
            }
        });

        // Subject Analytics Rows
        document.querySelectorAll('.study-analytics-subject-row').forEach(function(el) {
            var checkbox = el.querySelector('.subject-select-checkbox');
            if (checkbox && checkbox.checked) {
                el.style.setProperty('background', '#ede9fe', 'important');
                el.style.setProperty('border-left', '4px solid #7c3aed', 'important');
            } else {
                el.style.setProperty('background', '#ffffff', 'important');
                el.style.setProperty('border-left', '4px solid transparent', 'important');
            }
            el.style.setProperty('border-bottom', '1px solid #f1f5f9', 'important');
            el.style.removeProperty('box-shadow');
        });

        // Subject Analytics - Strong text
        document.querySelectorAll('.study-analytics-subject-row .study-analytics-subject-info strong').forEach(function(el) {
            var color = el.style.color;
            if (color && color.startsWith('rgb')) {
                el.style.setProperty('color', color, 'important');
                el.style.removeProperty('text-shadow');
            }
        });

        // Select All Container
        document.querySelectorAll('.study-analytics-select-all-container').forEach(function(el) {
            el.style.setProperty('background', '#f8fafc', 'important');
            el.style.setProperty('border-color', '#e2e8f0', 'important');
        });

        // Select All label
        document.querySelectorAll('.study-analytics-select-all-container label').forEach(function(el) {
            el.style.setProperty('color', '#1e293b', 'important');
        });

        // Meta spans
        document.querySelectorAll('.study-analytics-subject-meta span').forEach(function(el) {
            el.style.setProperty('background', '#f1f5f9', 'important');
            el.style.setProperty('color', '#64748b', 'important');
        });

        // Count span
        var countSpan = document.getElementById('selectedCount');
        if (countSpan) {
            countSpan.style.setProperty('color', '#64748b', 'important');
        }

        // Delete button
        document.querySelectorAll('.study-delete-selected-btn').forEach(function(el) {
            el.style.setProperty('color', '#ffffff', 'important');
            el.style.setProperty('background', '#7c3aed', 'important');
        });

        // Daily, Weekly, Monthly stat values
        document.querySelectorAll('#analyticsDailyStudyTime, #analyticsWeeklyStudyTime, #analyticsMonthlyStudyTime').forEach(function(el) {
            var color = el.style.color;
            if (color && color.startsWith('rgb')) {
                el.style.setProperty('color', color, 'important');
                el.style.removeProperty('text-shadow');
            }
        });

        // Subject Distribution - Legend subject names
        document.querySelectorAll('.study-pie-legend-row .study-pie-subject-name').forEach(function(el) {
            var color = el.style.color;
            if (color && color.startsWith('rgb')) {
                el.style.setProperty('color', color, 'important');
                el.style.removeProperty('text-shadow');
            }
        });

        console.log('Light mode styles applied');
    }


    /* =========================================================
       DARK MODE LISTENER
       ========================================================= */

    function setupDarkModeListener() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    var isDark = document.body.classList.contains('dark') || 
                                  document.body.classList.contains('dark-mode');
                    if (isDark) {
                        setTimeout(applyDarkModeStyles, 150);
                    } else {
                        setTimeout(applyLightModeStyles, 150);
                    }
                }
            });
        });
        
        observer.observe(document.body, { attributes: true });
        
        window.addEventListener('storage', function(e) {
            if (e.key === 'darkMode' || e.key === 'theme') {
                setTimeout(function() {
                    var isDark = document.body.classList.contains('dark') || 
                                  document.body.classList.contains('dark-mode');
                    if (isDark) {
                        applyDarkModeStyles();
                    } else {
                        applyLightModeStyles();
                    }
                }, 150);
            }
        });
        
        setTimeout(function() {
            var isDark = document.body.classList.contains('dark') || 
                          document.body.classList.contains('dark-mode');
            if (isDark) {
                applyDarkModeStyles();
            } else {
                applyLightModeStyles();
            }
        }, 300);
    }


    /* =========================================================
       STATIC LANGUAGE APPLICATION
       ========================================================= */

    function applyStaticAnalyticsLanguage() {

        var mainHeader =
            document.querySelector(
                ".study-analytics-card .section-header h2, " +
                ".study-analytics-card .section-header h3"
            );


        if (mainHeader) {

            mainHeader.textContent =
                getAnalyticsText(
                    "studyTitle"
                );
        }


        var sections =
            document.querySelectorAll(
                ".study-analytics-section"
            );


        var sectionKeys = [

            "dailyTitle",
            "weeklyTitle",
            "monthlyTitle",
            "subjectTitle"
        ];


        sections.forEach(
            function (section, index) {

                if (
                    index >=
                    sectionKeys.length
                ) {
                    return;
                }


                var header =
                    section.querySelector(
                        "h4,h3"
                    );


                if (header) {

                    header.textContent =
                        getAnalyticsText(
                            sectionKeys[index]
                        );
                }
            }
        );


        var chartsSection =
            document.querySelector(
                ".study-analytics-section.charts-section"
            );


        if (chartsSection) {

            var chartsHeader =
                chartsSection.querySelector(
                    "h2,h3,h4"
                );


            if (chartsHeader) {

                chartsHeader.textContent =
                    getAnalyticsText(
                        "chartsTitle"
                    );
            }
        }


        var labelMap = {

            "Total Study Time":
                "totalStudyTime",

            "মোট স্টাডি সময়":
                "totalStudyTime",

            "Total Sessions":
                "totalSessions",

            "মোট সেশন":
                "totalSessions",

            "Completed Sessions":
                "completedSessions",

            "সম্পন্ন সেশন":
                "completedSessions",

            "Completion":
                "completionPercent",

            "Completion:":
                "completionPercent",

            "সম্পন্ন":
                "completionPercent",

            "সম্পন্ন:":
                "completionPercent",

            "Daily Average":
                "dailyAverage",

            "দৈনিক গড়":
                "dailyAverage",

            "Most Productive Day":
                "mostProductiveDay",

            "সবচেয়ে উৎপাদনশীল দিন":
                "mostProductiveDay",

            "Most Productive Week":
                "mostProductiveWeek",

            "সবচেয়ে উৎপাদনশীল সপ্তাহ":
                "mostProductiveWeek",

            "Most Studied Subject":
                "mostStudied",

            "সবচেয়ে বেশি পড়া সাবজেক্ট":
                "mostStudied",

            "Least Studied Subject":
                "leastStudied",

            "সবচেয়ে কম পড়া সাবজেক্ট":
                "leastStudied",

            "Target Study Time":
                "targetStudyTime",

            "লক্ষ্য স্টাডি সময়":
                "targetStudyTime",

            "Target Time":
                "targetTime",

            "লক্ষ্য সময়":
                "targetTime",

            "Progress":
                "progress",

            "অগ্রগতি":
                "progress",

            "Achieved":
                "achieved",

            "অর্জিত":
                "achieved",

            "Remaining":
                "remaining",

            "বাকি":
                "remaining",

            "Daily Target":
                "dailyTarget",

            "দৈনিক লক্ষ্য":
                "dailyTarget"
        };


        var statLabels =
            document.querySelectorAll(
                ".analytics-stat-card span, " +
                ".study-analytics-highlight span, " +
                ".study-report-card .study-report-card-label, " +
                ".study-report-stat-label, " +
                ".analytics-label, " +
                ".analytics-stat-label, " +
                ".stat-label, " +
                ".analytics-stat-card .label, " +
                ".study-analytics-highlight .label, " +
                ".stat-label-text"
            );


        statLabels.forEach(
            function (element) {

                var protectedIds = [

                    "analyticsDailyStudyTime",
                    "analyticsDailySessions",
                    "analyticsDailyCompleted",
                    "analyticsDailyCompletion",

                    "analyticsWeeklyStudyTime",
                    "analyticsWeeklyAverage",
                    "analyticsWeeklySessions",
                    "analyticsWeeklyCompletion",
                    "analyticsMostProductiveDay",

                    "analyticsMonthlyStudyTime",
                    "analyticsMonthlyAverage",
                    "analyticsMonthlySessions",
                    "analyticsMonthlyCompletion",
                    "analyticsMostProductiveWeek",

                    "analyticsMostStudiedSubject",
                    "analyticsLeastStudiedSubject"
                ];


                if (
                    element.id &&
                    protectedIds.includes(
                        element.id
                    )
                ) {
                    return;
                }


                var text =
                    element.textContent.trim();


                var key =
                    labelMap[text];


                if (!key) {
                    return;
                }


                var newText =
                    getAnalyticsText(key);


                if (
                    text.includes(":")
                ) {

                    element.textContent =
                        newText + ":";

                } else {

                    element.textContent =
                        newText;
                }
            }
        );


        var chartCards =
            document.querySelectorAll(
                ".study-chart-card"
            );


        var chartKeys = [

            "weeklyChartTitle",
            "monthlyChartTitle",
            "subjectDistributionTitle",
            "subjectComparisonTitle"
        ];


        chartCards.forEach(
            function (card, index) {

                if (
                    index >=
                    chartKeys.length
                ) {
                    return;
                }


                var heading =
                    card.querySelector(
                        "h5,h4,h3"
                    );


                if (heading) {

                    heading.textContent =
                        getAnalyticsText(
                            chartKeys[index]
                        );
                }
            }
        );


        try {

            localStorage.setItem(
                ANALYTICS_LANGUAGE_STORAGE_KEY,
                currentLang
            );

        } catch (e) {}


        updateLanguageButton();

        renderTargetProgress();
    }


    /* =========================================================
       FORCE RENDER
       ========================================================= */

    function forceRenderAnalytics() {

        syncAnalyticsLanguage();

        var history =
            getAnalyticsHistory();

        var subjects =
            getSubjectStudyAnalytics();

        // Prepare unique colors for each subject
        prepareSubjectColors(subjects);

        console.log(
            "Analytics sessions:",
            history.length
        );


        try {

            renderDailyStudyAnalytics();

            renderWeeklyStudyAnalytics();

            renderMonthlyStudyAnalytics();

            renderSubjectStudyAnalytics();

            renderWeeklyChart();

            renderMonthlyTrendChart();

            renderSubjectDistributionChart();

            renderSubjectComparisonChart();

            renderTargetProgress();

            applyStaticAnalyticsLanguage();

            updateLanguageButton();
            
            // ⭐⭐⭐ SUBJECT COMPLETION NOTIFICATION - ADDED HERE ⭐⭐⭐
            checkAndNotifyCompletedSubjects();
            renderCompletedSubjectsList();
            
            var isDark = document.body.classList.contains('dark') || 
                          document.body.classList.contains('dark-mode');
            if (isDark) {
                setTimeout(applyDarkModeStyles, 200);
            } else {
                setTimeout(applyLightModeStyles, 200);
            }


            console.log(
                "Study Analytics rendered"
            );

        } catch (error) {

            console.error(
                "Analytics render error:",
                error
            );
        }
    }


    function renderStudyAnalytics() {

        forceRenderAnalytics();
    }


    /* =========================================================
       SUBJECT COMPLETION NOTIFICATION SYSTEM
       ========================================================= */

    // ----- ১. কমপ্লিট সাবজেক্ট চেক করার ফাংশন -----
    function checkAndNotifyCompletedSubjects() {
        const subjects = getSubjectStudyAnalytics();
        
        // আগে নোটিফিকেশন পাঠানো সাবজেক্টগুলোর রেকর্ড
        let alreadyNotified = {};
        try {
            const stored = localStorage.getItem("completedSubjectsNotified");
            if (stored) {
                alreadyNotified = JSON.parse(stored);
            }
        } catch (e) {}

        let updated = false;

        subjects.forEach(function (item) {
            // চেক করুন সাবজেক্টটি ১০০% সম্পূর্ণ কিনা
            const isComplete = item.completion >= 100 || item.isFullyCompleted === true;

            if (isComplete) {
                const key = item.subject.toLowerCase().trim();
                
                // যদি আগে নোটিফিকেশন না পাঠানো হয়ে থাকে
                if (!alreadyNotified[key]) {
                    // আপনার existing ফাংশন কল করুন
                    showSubjectCompletionNotification(
                        item.subject,
                        item.completion
                    );
                    alreadyNotified[key] = true;
                    updated = true;
                }
            }
        });

        // আপডেট করা রেকর্ড সেভ করুন
        if (updated) {
            try {
                localStorage.setItem(
                    "completedSubjectsNotified",
                    JSON.stringify(alreadyNotified)
                );
            } catch (e) {}
        }
    }

    // ----- ২. কমপ্লিট সাবজেক্ট রিসেট ফাংশন (অপশনাল) -----
    function resetCompletedSubjectNotifications() {
        try {
            localStorage.removeItem("completedSubjectsNotified");
            showToast(
                currentLang === "bn"
                    ? "নোটিফিকেশন রিসেট করা হয়েছে"
                    : "Notifications reset",
                "info"
            );
            forceRenderAnalytics();
        } catch (e) {}
    }

    // ----- ৩. কমপ্লিট সাবজেক্টের লিস্ট দেখানোর ফাংশন -----
    function renderCompletedSubjectsList() {
        const container = document.getElementById("completedSubjectsList");
        if (!container) return;

        const subjects = getSubjectStudyAnalytics();
        const completed = subjects.filter(function (item) {
            return item.completion >= 100 || item.isFullyCompleted === true;
        });

        if (completed.length === 0) {
            container.innerHTML = `
                <p style="color: rgb(var(--text-muted)); font-size: 12px; text-align: center; padding: 10px 0;">
                    ${currentLang === "bn" ? "কোনো সম্পন্ন সাবজেক্ট নেই" : "No completed subjects"}
                </p>
            `;
            return;
        }

        let html = `<div style="display: flex; flex-direction: column; gap: 6px;">`;
        completed.forEach(function (item, index) {
            const colorObj = getAnalyticsSubjectColor(item.subject, index);
            const colorRGB = "rgb(" + colorObj.r + ", " + colorObj.g + ", " + colorObj.b + ")";
            
            html += `
                <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 12px;
                    background: rgba(var(--success), 0.08);
                    border-radius: var(--radius-sm);
                    border-left: 3px solid rgb(var(--success));
                    transition: all 0.2s ease;
                ">
                    <span style="font-size: 18px;">🎉</span>
                    <span style="
                        flex: 1;
                        font-weight: 600;
                        color: ${colorRGB};
                        font-size: 13px;
                    ">${escapeAnalyticsHTML(item.subject)}</span>
                    <span style="
                        background: rgb(var(--success));
                        color: white;
                        padding: 2px 10px;
                        border-radius: 12px;
                        font-size: 11px;
                        font-weight: 700;
                    ">100%</span>
                </div>
            `;
        });
        html += `</div>`;

        container.innerHTML = html;
    }

    // ----- ৪. window-এ এক্সপোজ করুন -----
    window.checkAndNotifyCompletedSubjects = checkAndNotifyCompletedSubjects;
    window.resetCompletedSubjectNotifications = resetCompletedSubjectNotifications;
    window.renderCompletedSubjectsList = renderCompletedSubjectsList;


    /* =========================================================
       LANGUAGE LISTENER
       ========================================================= */

    function setupAnalyticsLanguageListeners() {

        if (
            document.documentElement.dataset
                .analyticsLanguageEventReady !== "true"
        ) {

            document.documentElement.dataset
                .analyticsLanguageEventReady = "true";


            document.addEventListener(
                "languageChanged",
                function (e) {

                    console.log(
                        "languageChanged received"
                    );


                    var newLang = null;


                    if (
                        e &&
                        e.detail
                    ) {

                        if (
                            typeof e.detail ===
                            "string"
                        ) {

                            newLang =
                                e.detail;

                        } else {

                            newLang =
                                e.detail.language ||
                                e.detail.lang ||
                                e.detail.value ||
                                null;
                        }
                    }


                    if (!newLang) {

                        newLang =
                            detectAnalyticsLanguage();
                    }


                    var normalized =
                        normalizeAnalyticsLanguage(
                            newLang
                        );


                    if (normalized) {

                        currentLang =
                            normalized;


                        try {

                            localStorage.setItem(
                                ANALYTICS_LANGUAGE_STORAGE_KEY,
                                currentLang
                            );

                        } catch (e) {}
                    }


                    setTimeout(
                        forceRenderAnalytics,
                        50
                    );
                }
            );
        }


        if (
            document.documentElement.dataset
                .analyticsStorageReady !== "true"
        ) {

            document.documentElement.dataset
                .analyticsStorageReady = "true";


            window.addEventListener(
                "storage",
                function (e) {

                    if (
                        e.key ===
                            ANALYTICS_LANGUAGE_STORAGE_KEY ||
                        e.key === "language" ||
                        e.key === "currentLanguage" ||
                        e.key ===
                            STUDY_HISTORY_STORAGE_KEY ||
                        e.key ===
                            TARGET_STORAGE_KEY
                    ) {

                        setTimeout(
                            forceRenderAnalytics,
                            100
                        );
                    }
                }
            );
        }


        if (
            document.documentElement.dataset
                .analyticsVisibilityReady !== "true"
        ) {

            document.documentElement.dataset
                .analyticsVisibilityReady = "true";


            document.addEventListener(
                "visibilitychange",
                function () {

                    if (!document.hidden) {

                        setTimeout(
                            forceRenderAnalytics,
                            200
                        );
                    }
                }
            );
        }
    }


    /* =========================================================
       LANGUAGE BUTTON
       ========================================================= */

    function initializeLanguageButton() {

        var langBtn =
            document.getElementById(
                "languageBtn"
            );


        if (!langBtn) {
            return false;
        }


        if (
            langBtn.dataset
                .analyticsLanguageReady === "true"
        ) {

            updateLanguageButton();

            return true;
        }


        langBtn.dataset
            .analyticsLanguageReady = "true";


        langBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                var newLang =
                    currentLang === "bn"
                        ? "en"
                        : "bn";


                setAnalyticsLanguage(
                    newLang
                );


                forceRenderAnalytics();
            }
        );


        updateLanguageButton();


        return true;
    }


    /* =========================================================
       EXPOSE FUNCTIONS
       ========================================================= */

    window.renderStudyAnalytics =
        renderStudyAnalytics;

    window.forceRenderAnalytics =
        forceRenderAnalytics;

    window.getDailyStudyAnalytics =
        getDailyStudyAnalytics;

    window.getWeeklyStudyAnalytics =
        getWeeklyStudyAnalytics;

    window.getMonthlyStudyAnalytics =
        getMonthlyStudyAnalytics;

    window.getSubjectStudyAnalytics =
        getSubjectStudyAnalytics;

    window.getMostStudiedSubject =
        getMostStudiedSubject;

    window.getLeastStudiedSubject =
        getLeastStudiedSubject;

    window.setAnalyticsLanguage =
        setAnalyticsLanguage;

    window.getAnalyticsLanguage =
        function () {
            return currentLang;
        };

    window.applyStaticAnalyticsLanguage =
        applyStaticAnalyticsLanguage;

    window.syncAnalyticsLanguage =
        syncAnalyticsLanguage;

    window.deleteSubject =
        deleteSubject;

    window.deleteMultipleSubjects =
        deleteMultipleSubjects;

    window.applyDarkModeStyles =
        applyDarkModeStyles;

    window.applyLightModeStyles =
        applyLightModeStyles;

    window.getAnalyticsSubjectColor =
        getAnalyticsSubjectColor;

    window.getAnalyticsSubjectColorCSS =
        getAnalyticsSubjectColorCSS;

    window.getStudyTarget =
        getStudyTarget;

    window.setStudyTarget =
        setStudyTarget;

    window.getDailyProgress =
        getDailyProgress;

    window.renderTargetProgress =
        renderTargetProgress;

    window.handleSetTarget =
        handleSetTarget;

    window.prepareSubjectColors =
        prepareSubjectColors;

    window.resetColorAssignments =
        resetColorAssignments;


    /* =========================================================
       INITIALIZATION
       ========================================================= */

    function initializeStudyAnalytics() {

        console.log(
            "Initializing Study Analytics..."
        );


        syncAnalyticsLanguage();


        setupAnalyticsLanguageListeners();


        initializeLanguageButton();
        
        setupDarkModeListener();


        var history =
            getAnalyticsHistory();


        console.log(
            "Initial sessions:",
            history.length
        );


        setTimeout(
            function () {

                initializeLanguageButton();

                forceRenderAnalytics();

            },
            50
        );


        setTimeout(
            function () {

                initializeLanguageButton();

                forceRenderAnalytics();

            },
            250
        );


        setTimeout(
            function () {

                initializeLanguageButton();

                forceRenderAnalytics();

            },
            600
        );


        if (
            document.documentElement.dataset
                .analyticsSyncReady !== "true"
        ) {

            document.documentElement.dataset
                .analyticsSyncReady = "true";


            setInterval(
                function () {

                    try {

                        var detected =
                            detectAnalyticsLanguage();


                        if (
                            detected &&
                            detected !== currentLang
                        ) {

                            currentLang =
                                detected;

                            forceRenderAnalytics();
                        }


                        var reportData =
                            localStorage.getItem(
                                STUDY_HISTORY_STORAGE_KEY
                            );


                        if (!reportData) {
                            return;
                        }


                        var parsed =
                            JSON.parse(
                                reportData
                            );


                        if (
                            !Array.isArray(parsed)
                        ) {
                            return;
                        }


                        var oldData =
                            JSON.stringify(
                                window.studyHistory || []
                            );

                        var newData =
                            JSON.stringify(
                                parsed
                            );


                        if (
                            oldData !== newData
                        ) {

                            console.log(
                                "Study history changed. Updating Analytics..."
                            );


                            window.studyHistory =
                                parsed;


                            forceRenderAnalytics();
                        }

                    } catch (error) {

                        console.error(
                            "Analytics sync error:",
                            error
                        );
                    }

                },
                5000
            );
        }
    }


    /* =========================================================
       START
       ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeStudyAnalytics,
            {
                once: true
            }
        );

    } else {

        initializeStudyAnalytics();
    }

})();