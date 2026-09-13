/* =========================================================
   NATIVE LOCAL NOTIFICATIONS
========================================================= */

let LocalNotifications = null;

async function initNativeNotifications() {

    try {

        if (
            typeof Capacitor !== "undefined" &&
            Capacitor.isNativePlatform()
        ) {

            const module =
                await import(
                    "@capacitor/local-notifications"
                );

            LocalNotifications =
                module.LocalNotifications;


            /* -------------------------------------------------
               REQUEST NOTIFICATION PERMISSION
            ------------------------------------------------- */

            let permission =
                await LocalNotifications.checkPermissions();


            if (
                permission.display !== "granted"
            ) {

                permission =
                    await LocalNotifications.requestPermissions();

            }


            console.log(
                "Notification permission:",
                permission.display
            );


            /* -------------------------------------------------
               CREATE ALARM CHANNEL
            ------------------------------------------------- */

            if (
                Capacitor.getPlatform() ===
                "android"
            ) {

                await LocalNotifications.createChannel({

                    id: "calendar_alarm",

                    name: "Calendar Alarms",

                    description:
                        "Student Calendar event alarms",

                    importance: 5,

                    visibility: 1,

                    sound: "alarm",

                    vibration: true

                });

            }

        }

    } catch (error) {

        console.error(
            "Notification initialization failed:",
            error
        );

    }

}

/* =========================================================
   NATIVE ALARM SCHEDULER
========================================================= */

function isNativeAndroid() {
    return (
        typeof Capacitor !== "undefined" &&
        Capacitor.isNativePlatform() &&
        Capacitor.getPlatform() === "android" &&
        LocalNotifications
    );
}


function getAlarmNotificationId(eventId) {

    const text = String(eventId);

    let hash = 0;

    for (let i = 0; i < text.length; i++) {
        hash =
            ((hash << 5) - hash) +
            text.charCodeAt(i);

        hash |= 0;
    }

    return Math.abs(hash) || 1;
}


async function scheduleNativeAlarm(event) {

    if (!isNativeAndroid()) return;

    if (
        !event ||
        !event.reminder ||
        !event.alarmDate ||
        !event.alarmTime
    ) {
        return;
    }

    const alarmDateTime =
        new Date(
            `${event.alarmDate}T${event.alarmTime}:00`
        );

    if (
        Number.isNaN(
            alarmDateTime.getTime()
        )
    ) {
        return;
    }

    if (
        alarmDateTime.getTime() <= Date.now()
    ) {
        return;
    }

    const notificationId =
        getAlarmNotificationId(event.id);

    try {

        /* Remove old notification first */
        await LocalNotifications.cancel({
            notifications: [
                {
                    id: notificationId
                }
            ]
        });

    } catch (error) {

        console.log(
            "No previous alarm to cancel:",
            error
        );

    }


    await LocalNotifications.schedule({

        notifications: [

            {
                id: notificationId,

                title:
                    `🔔 ${event.title}`,

                body:
                    state.language === "bn"
                        ? "আপনার নির্ধারিত অ্যালার্ম বাজছে।"
                        : "Your scheduled alarm is ringing.",

                channelId:
                    "calendar_alarm",

                schedule: {
                    at: alarmDateTime
                },

                extra: {
                    eventId:
                        String(event.id)
                }

            }

        ]

    });


    console.log(
        "Native alarm scheduled:",
        event.title,
        alarmDateTime
    );

}


async function cancelNativeAlarm(eventId) {

    if (!isNativeAndroid()) return;

    const notificationId =
        getAlarmNotificationId(eventId);

    try {

        await LocalNotifications.cancel({

            notifications: [

                {
                    id: notificationId
                }

            ]

        });

        console.log(
            "Native alarm cancelled:",
            eventId
        );

    } catch (error) {

        console.error(
            "Unable to cancel native alarm:",
            error
        );

    }

}


async function rescheduleAllNativeAlarms() {

    if (!isNativeAndroid()) return;

    for (
        const event of state.events
    ) {

        if (
            event.reminder &&
            event.alarmDate &&
            event.alarmTime &&
            !event.alarmTriggered
        ) {

            await scheduleNativeAlarm(
                event
            );

        }

    }

}


const state = {

    currentDate: new Date(),

    events: [],

    language: "en",

    editingId: null,
    selectedPastEventIds: new Set(),

    selectedEventId: null,

    activeAlarmEvent: null,

    alarmTimer: null,

    alarmInterval: null,

    alarmAudioContext: null,

    alarmOscillator: null,

    alarmGain: null

};


/* =========================================================
   STORAGE KEYS
========================================================= */

const EVENTS_STORAGE_KEY =
    "bdStudentCalendarEvents";

const LANGUAGE_STORAGE_KEY =
    "bdStudentCalendarLanguage";

const DARK_STORAGE_KEY =
    "darkMode";


/* =========================================================
   CATEGORY NAMES
========================================================= */

const CATEGORY_NAMES = {

    class: {
        en: "Class",
        bn: "ক্লাস"
    },

    exam: {
        en: "Exam",
        bn: "পরীক্ষা"
    },

    assignment: {
        en: "Assignment",
        bn: "অ্যাসাইনমেন্ট"
    },

    project: {
        en: "Project",
        bn: "প্রজেক্ট"
    },

    presentation: {
        en: "Presentation",
        bn: "প্রেজেন্টেশন"
    },

    personal: {
        en: "Personal",
        bn: "ব্যক্তিগত"
    },

    holiday: {
        en: "Holiday",
        bn: "ছুটি"
    },

    other: {
        en: "Other",
        bn: "অন্যান্য"
    }

};


/* =========================================================
   MONTH NAMES
========================================================= */

const MONTHS_EN = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];


const MONTHS_BN = [

    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর"

];


/* =========================================================
   WEEKDAY NAMES
========================================================= */

const WEEKDAYS_EN = [

    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"

];


const WEEKDAYS_BN = [

    "রবি",
    "সোম",
    "মঙ্গল",
    "বুধ",
    "বৃহস্পতি",
    "শুক্র",
    "শনি"

];


/* =========================================================
   TRANSLATIONS
========================================================= */

const TEXT = {

    appTitle: {
        en: "Campus Calendar",
        bn: "ক্যাম্পাস ক্যালেন্ডার"
    },

    appSubtitle: {
        en: "Student friendly Calendar",
        bn: "শিক্ষার্থীদের জন্য  ক্যালেন্ডার"
    },

    today: {
        en: "Today",
        bn: "আজ"
    },

    english: {
        en: "English",
        bn: "English"
    },

    bangla: {
        en: "বাংলা",
        bn: "বাংলা"
    },

    todayEvents: {
        en: "Today's Events",
        bn: "আজকের ইভেন্ট"
    },

    scheduledToday: {
        en: "Scheduled today",
        bn: "আজকের নির্ধারিত ইভেন্ট"
    },

    thisMonth: {
        en: "This Month",
        bn: "এই মাস"
    },

    totalEvents: {
        en: "Total events",
        bn: "মোট ইভেন্ট"
    },

    classes: {
        en: "Classes",
        bn: "ক্লাস"
    },

    exams: {
        en: "Exams",
        bn: "পরীক্ষা"
    },
    assignment: {
        en: "Assignment",
        bn: "অ্যাসাইনমেন্ট"
    },

    project: {
        en: "Project",
        bn: "প্রজেক্ট"
    },

    presentation: {
        en: "Presentation",
        bn: "প্রেজেন্টেশন"
    },
    personal: {
        en: "Personal",
        bn: "ব্যক্তিগত"
    },

    thisMonthSmall: {
        en: "This month",
        bn: "এই মাসে"
    },

    searchEvents: {
        en: "Search events...",
        bn: "ইভেন্ট খুঁজুন..."
    },

    allCategories: {
        en: "All Categories",
        bn: "সব ক্যাটাগরি"
    },

    addEvent: {
        en: "+ Add Event",
        bn: "+ ইভেন্ট যোগ করুন"
    },

    export: {
        en: "Export",
        bn: "এক্সপোর্ট"
    },

    import: {
        en: "Import",
        bn: "ইমপোর্ট"
    },

    bangladeshTime: {
        en: "Bangladesh Standard Time",
        bn: "বাংলাদেশ স্ট্যান্ডার্ড টাইম"
    },

    holidays: {
        en: "Bangladesh Holidays",
        bn: "বাংলাদেশের ছুটির দিন"
    },

    quickAdd: {
        en: "Quick Add",
        bn: "দ্রুত যোগ করুন"
    },

    upcomingEvents: {
        en: "Upcoming Events",
        bn: "আসন্ন ইভেন্ট"
    },

    noUpcoming: {
        en: "No upcoming events",
        bn: "কোনো আসন্ন ইভেন্ট নেই"
    },

    pastEvents: {
    en: "Past Events",
    bn: "পূর্বের ইভেন্ট"
    },

    eventTitle: {
        en: "Event Title",
        bn: "ইভেন্টের নাম"
    },

    date: {
        en: "Date",
        bn: "তারিখ"
    },

    category: {
        en: "Category",
        bn: "ক্যাটাগরি"
    },

    start: {
        en: "Start",
        bn: "শুরু"
    },

    end: {
        en: "End",
        bn: "শেষ"
    },

    location: {
        en: "Location",
        bn: "স্থান"
    },

    description: {
        en: "Description",
        bn: "বিবরণ"
    },

    customAlarm: {
        en: "🔔 Custom Alarm",
        bn: "🔔 কাস্টম অ্যালার্ম"
    },

    customAlarmSubtitle: {
        en: "Set your own alarm date and time",
        bn: "নিজের অ্যালার্মের তারিখ ও সময় সেট করুন"
    },

    alarmDate: {
        en: "Alarm Date",
        bn: "অ্যালার্মের তারিখ"
    },

    alarmTime: {
        en: "Alarm Time",
        bn: "অ্যালার্মের সময়"
    },

    alarmSound: {
        en: "Alarm Sound",
        bn: "অ্যালার্ম সাউন্ড"
    },

    testAlarm: {
        en: "🔊 Test Alarm",
        bn: "🔊 অ্যালার্ম পরীক্ষা"
    },

    cancel: {
        en: "Cancel",
        bn: "বাতিল"
    },

    saveEvent: {
        en: "Save Event",
        bn: "ইভেন্ট সংরক্ষণ"
    },

    delete: {
        en: "Delete",
        bn: "ডিলিট"
    },

    eventDetails: {
        en: "Event Details",
        bn: "ইভেন্টের বিস্তারিত"
    },

    close: {
        en: "Close",
        bn: "বন্ধ"
    },

    edit: {
        en: "Edit",
        bn: "এডিট"
    },

    alarm: {
        en: "🔔 Alarm",
        bn: "🔔 অ্যালার্ম"
    },

    alarmRinging: {
        en: "Your scheduled alarm is ringing.",
        bn: "আপনার নির্ধারিত অ্যালার্ম বাজছে।"
    },

    dismiss: {
        en: "Dismiss",
        bn: "বন্ধ করুন"
    },

    snooze: {
        en: "Snooze 5 Minutes",
        bn: "৫ মিনিট পরে"
    },

    defaultAlarm: {
        en: "Default Alarm",
        bn: "ডিফল্ট অ্যালার্ম"
    },

    beep: {
        en: "Beep",
        bn: "বিপ"
    },

    bell: {
        en: "Bell",
        bn: "ঘণ্টা"
    },

    digital: {
        en: "Digital Alarm",
        bn: "ডিজিটাল অ্যালার্ম"
    },

    noHolidays: {
        en: "No holidays found",
        bn: "কোনো ছুটি পাওয়া যায়নি"
    }



};


/* =========================================================
   BANGLA NUMBERS
========================================================= */

function toBanglaNumber(value) {

    const numbers = {

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
        digit => numbers[digit]
    );

}


/* =========================================================
   BANGLA CALENDAR
   BANGLADESH REVISED BANGLA CALENDAR
========================================================= */

const BANGLA_MONTHS = [

    "বৈশাখ",
    "জ্যৈষ্ঠ",
    "আষাঢ়",
    "শ্রাবণ",
    "ভাদ্র",
    "আশ্বিন",
    "কার্তিক",
    "অগ্রহায়ণ",
    "পৌষ",
    "মাঘ",
    "ফাল্গুন",
    "চৈত্র"

];


/* =========================================================
   GREGORIAN LEAP YEAR
========================================================= */

function isGregorianLeapYear(year) {

    return (

        year % 4 === 0 &&

        (
            year % 100 !== 0 ||
            year % 400 === 0
        )

    );

}


/* =========================================================
   BANGLA NEW YEAR
   Bangladesh Bangla Calendar
   1 Boishakh = 14 April
========================================================= */

function getBanglaNewYearDate(
    gregorianYear
) {

    return new Date(
        gregorianYear,
        3,
        14,
        0,
        0,
        0,
        0
    );

}


function getBanglaDate(
    gregorianDate
) {

    if (
        !gregorianDate ||
        !(gregorianDate instanceof Date) ||
        Number.isNaN(
            gregorianDate.getTime()
        )
    ) {

        return null;

    }


    const date = new Date(
        gregorianDate.getFullYear(),
        gregorianDate.getMonth(),
        gregorianDate.getDate(),
        0,
        0,
        0,
        0
    );


    const year =
        date.getFullYear();


    const newYear =
        getBanglaNewYearDate(
            year
        );


    let banglaYear;
    let startYear;


    if (
        date < newYear
    ) {

        banglaYear =
            year - 594;

        startYear =
            year - 1;

    }



    else {

        banglaYear =
            year - 593;

        startYear =
            year;

    }


    const startDate =
        getBanglaNewYearDate(
            startYear
        );


    const diffMilliseconds =
        date.getTime() -
        startDate.getTime();


    const diffDays =
        Math.floor(
            diffMilliseconds /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const monthLengths = [

        31,
        31,
        31,
        31,
        31,
        31,

        30,
        30,
        30,
        30,

        isGregorianLeapYear(
            startYear + 1
        )
            ? 30
            : 29,

        30

    ];


    let remainingDays =
        diffDays;


    let monthIndex = 0;


    for (
        let i = 0;
        i < monthLengths.length;
        i++
    ) {

        if (
            remainingDays <
            monthLengths[i]
        ) {

            monthIndex = i;

            break;

        }


        remainingDays -=
            monthLengths[i];

    }


    if (
        monthIndex < 0
    ) {

        monthIndex = 0;

    }


    if (
        monthIndex >=
        BANGLA_MONTHS.length
    ) {

        monthIndex =
            BANGLA_MONTHS.length - 1;

    }


    const banglaDay =
        remainingDays + 1;


    return {

        year:
            banglaYear,

        monthIndex:
            monthIndex,

        month:
            BANGLA_MONTHS[
                monthIndex
            ],

        day:
            banglaDay

    };

}


function formatBanglaDate(
    gregorianDate
) {

    const bangla =
        getBanglaDate(
            gregorianDate
        );


    if (!bangla) {

        return "";

    }


    return (

        `${toBanglaNumber(
            bangla.day
        )} ` +

        `${bangla.month} ` +

        `${toBanglaNumber(
            bangla.year
        )} বঙ্গাব্দ`

    );

}


function formatBanglaShortDate(
    gregorianDate
) {

    const bangla =
        getBanglaDate(
            gregorianDate
        );


    if (!bangla) {

        return "";

    }


    return (

        `${toBanglaNumber(
            bangla.day
        )} ` +

        `${bangla.month}`

    );

}


function formatBanglaMonthYear(
    gregorianDate
) {

    const bangla =
        getBanglaDate(
            gregorianDate
        );


    if (!bangla) {

        return "";

    }


    return (

        `${bangla.month} ` +

        `${toBanglaNumber(
            bangla.year
        )} বঙ্গাব্দ`

    );

}

/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

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


/* =========================================================
   GET TRANSLATED TEXT
========================================================= */

function t(key) {

    return (

        TEXT[key]?.[state.language] ||

        TEXT[key]?.en ||

        key

    );

}


/* =========================================================
   STORAGE
========================================================= */

function loadEvents() {

    try {

        const saved =
            localStorage.getItem(
                EVENTS_STORAGE_KEY
            );


        if (!saved) {

            state.events = [];

            return;

        }


        const parsed =
            JSON.parse(
                saved
            );


        if (
            Array.isArray(
                parsed
            )
        ) {

            state.events =
                parsed
                    .map(
                        normalizeEvent
                    )
                    .filter(
                        Boolean
                    );

        }

        else {

            state.events = [];

        }

    }

    catch (error) {

        console.error(
            "Unable to load events:",
            error
        );

        state.events = [];

    }

}


/* =========================================================
   NORMALIZE EVENT
========================================================= */

function normalizeEvent(event) {

    if (

        !event ||

        typeof event !== "object"

    ) {

        return null;

    }


    return {

        id:
            String(
                event.id ??
                Date.now()
            ),

        title:
            String(
                event.title ??
                ""
            ),

        date:
            String(
                event.date ??
                ""
            ),

        category:
            CATEGORY_NAMES[
                event.category
            ]
                ? event.category
                : "other",

        start:
            String(
                event.start ??
                ""
            ),

        end:
            String(
                event.end ??
                ""
            ),

        location:
            String(
                event.location ??
                ""
            ),

        description:
            String(
                event.description ??
                ""
            ),

        reminder:
            Boolean(
                event.reminder
            ),

        alarmDate:
            String(
                event.alarmDate ??
                ""
            ),

        alarmTime:
            String(
                event.alarmTime ??
                ""
            ),

        alarmSound:
            event.alarmSound ||
            "default",

        alarmTriggered:
            Boolean(
                event.alarmTriggered
            )

    };

}


/* =========================================================
   SAVE EVENTS
========================================================= */

function saveEvents() {

    try {

        localStorage.setItem(

            EVENTS_STORAGE_KEY,

            JSON.stringify(
                state.events
            )

        );

    }

    catch (error) {

        console.error(
            "Unable to save events:",
            error
        );


        showToast(

            state.language === "bn"

                ? "ইভেন্ট সংরক্ষণ করা যায়নি।"

                : "Unable to save events."

        );

    }

}

/* =========================================================
   SYNC CURRENT MONTH WITH TODAY
========================================================= */

function syncCurrentMonthWithToday() {

    const today = new Date();

    const todayYear =
        today.getFullYear();

    const todayMonth =
        today.getMonth();


    const currentYear =
        state.currentDate.getFullYear();

    const currentMonth =
        state.currentDate.getMonth();


    if (
        todayYear !== currentYear ||
        todayMonth !== currentMonth
    ) {

        state.currentDate =
            new Date(
                todayYear,
                todayMonth,
                1
            );

    }

}
/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        try {

            loadEvents();

            loadTheme();

            loadLanguage();

            setupEventListeners();

            applyTranslations();
            syncCurrentMonthWithToday();

            renderCalendar();

            renderHolidays();

            renderUpcoming();
            renderPastEvents();

            updateDashboard();

            checkAlarms();
            initNativeNotifications()
            .then(() => {
                return rescheduleAllNativeAlarms();
            })
            .catch(error => {
                console.error(
                    "Native alarm startup failed:",
                    error
                );
            });

            setInterval(
                checkAlarms,
                1000
            );


            console.log(
                "Student Calendar initialized successfully."
            );

        }

        catch (error) {

            console.error(
                "Calendar initialization failed:",
                error
            );


            showToast(
                "Calendar initialization failed."
            );

        }

    }
);


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupEventListeners() {

    const prevBtn =
        document.getElementById(
            "prevBtn"
        );

    const nextBtn =
        document.getElementById(
            "nextBtn"
        );

    const calendarTodayBtn =
        document.getElementById(
            "calendarTodayBtn"
        );

    const todayBtn =
        document.getElementById(
            "todayBtn"
        );

    const addEventBtn =
        document.getElementById(
            "addEventBtn"
        );

    const eventForm =
        document.getElementById(
            "eventForm"
        );

    const themeBtn =
        document.getElementById(
            "themeBtn"
        );

    const languageBtn =
        document.getElementById(
            "languageBtn"
        );

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const exportBtn =
        document.getElementById(
            "exportBtn"
        );

    const importBtn =
        document.getElementById(
            "importBtn"
        );

    const importFile =
        document.getElementById(
            "importFile"
        );

    const reminder =
        document.getElementById(
            "eventReminder"
        );

    const testAlarmBtn =
        document.getElementById(
            "testAlarmBtn"
        );

    const deleteBtn =
        document.getElementById(
            "deleteBtn"
        );

    const dismissAlarmBtn =
        document.getElementById(
            "dismissAlarmBtn"
        );

    const snoozeAlarmBtn =
        document.getElementById(
            "snoozeAlarmBtn"
        );

    const editDetailsBtn =
        document.getElementById(
            "editDetailsBtn"
        );


    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            previousMonth
        );

    }


    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            nextMonth
        );

    }


    if (calendarTodayBtn) {

        calendarTodayBtn.addEventListener(
            "click",
            goToday
        );

    }


    if (todayBtn) {

        todayBtn.addEventListener(
            "click",
            goToday
        );

    }


    if (addEventBtn) {

        addEventBtn.addEventListener(
            "click",
            () => {

                openEventModal();

            }
        );

    }


    if (eventForm) {

        eventForm.addEventListener(
            "submit",
            clickEvent => {

                event.preventDefault();

                saveEventFromForm();

            }
        );

    }


    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            toggleTheme
        );

    }


    // ✅ FIX: languageBtn listener removed from here
    // কারণ Study Analytics JS ইতিমধ্যেই এখানে listener যোগ করে
    // এবং সেটি window.toggleLanguage কেও কল করে।


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                renderCalendar();

                renderUpcoming();
                renderPastEvents();

                updateDashboard();

            }
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            () => {

                renderCalendar();

                renderUpcoming();
                renderPastEvents();

                updateDashboard();

            }
        );

    }


    if (exportBtn) {

        exportBtn.addEventListener(
            "click",
            exportEvents
        );

    }


    if (
        importBtn &&
        importFile
    ) {

        importBtn.addEventListener(
            "click",
            () => {

                importFile.click();

            }
        );


        importFile.addEventListener(
            "change",
            importEvents
        );

    }


    if (reminder) {

        reminder.addEventListener(
            "change",
            toggleAlarmFields
        );

    }


    if (testAlarmBtn) {

        testAlarmBtn.addEventListener(
            "click",
            testAlarm
        );

    }


    if (deleteBtn) {

        deleteBtn.addEventListener(
            "click",
            deleteCurrentEvent
        );

    }


    if (dismissAlarmBtn) {

        dismissAlarmBtn.addEventListener(
            "click",
            dismissAlarm
        );

    }


    if (snoozeAlarmBtn) {

        snoozeAlarmBtn.addEventListener(
            "click",
            snoozeAlarm
        );

    }


    if (editDetailsBtn) {

        editDetailsBtn.addEventListener(
            "click",
            editSelectedEvent
        );

    }


    document
        .querySelectorAll(
            "[data-close]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset.close;

                        closeModal(id);

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".quick-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const category =
                            button.dataset.category;

                        openEventModal(
                            null,
                            category
                        );

                    }
                );

            }
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeActiveModals();

            }

        }
    );

}


/* =========================================================
   THEME
========================================================= */

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const dark =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        DARK_STORAGE_KEY,
        dark
            ? "1"
            : "0"
    );


    updateThemeButton();

}


/* =========================================================
   LOAD THEME
========================================================= */

function loadTheme() {

    if (

        localStorage.getItem(
            DARK_STORAGE_KEY
        ) === "1"

    ) {

        document.body.classList.add(
            "dark"
        );

    }


    updateThemeButton();

}


/* =========================================================
   UPDATE THEME BUTTON
========================================================= */

function updateThemeButton() {

    const button =
        document.getElementById(
            "themeBtn"
        );


    if (!button) return;


    const dark =
        document.body.classList.contains(
            "dark"
        );


    button.textContent =
        dark
            ? "☀️"
            : "🌙";

}


/* =========================================================
   LANGUAGE
========================================================= */

function loadLanguage() {

    const saved =
        localStorage.getItem(
            LANGUAGE_STORAGE_KEY
        );


    state.language =
        saved === "bn"
            ? "bn"
            : "en";


    updateLanguageButton();

}


/* =========================================================
   TOGGLE LANGUAGE
========================================================= */

function toggleLanguage() {

    state.language =
        state.language === "en"
            ? "bn"
            : "en";


    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        state.language
    );


    // ✅ FIX: Study Analytics কেও জানান যাতে সেটাও রিফ্রেশ হয়
    if (typeof window.setAnalyticsLanguage === "function") {
        window.setAnalyticsLanguage(state.language);
    }
    if (typeof window.forceRenderAnalytics === "function") {
        window.forceRenderAnalytics();
    }


    updateLanguageButton();

    applyTranslations();
    syncCurrentMonthWithToday();

    renderCalendar();

    renderUpcoming();
    renderPastEvents();

    renderHolidays();

    updateDashboard();

}


/* =========================================================
   LANGUAGE BUTTON
========================================================= */

function updateLanguageButton() {

    const button =
        document.getElementById(
            "languageBtn"
        );


    if (!button) return;


    button.textContent =
        state.language === "en"
            ? "বাংলা"
            : "English";

}


/* =========================================================
   APPLY TRANSLATIONS
========================================================= */

function applyTranslations() {

    const set =
        (id, key) => {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.textContent =
                    t(key);

            }

        };


    set(
        "appTitle",
        "appTitle"
    );

    set(
        "appSubtitle",
        "appSubtitle"
    );

    set(
        "todayBtn",
        "today"
    );

    set(
        "todayEventsLabel",
        "todayEvents"
    );

    set(
        "todayEventsSub",
        "scheduledToday"
    );

    set(
        "monthEventsLabel",
        "thisMonth"
    );

    set(
        "monthEventsSub",
        "totalEvents"
    );

    set(
        "classesLabel",
        "classes"
    );

    set(
        "classesSub",
        "thisMonthSmall"
    );

    set(
        "examsLabel",
        "exams"
    );

    set(
        "examsSub",
        "thisMonthSmall"
    );

set(
    "assignmentLabel",
    "assignment"
);

set(
    "assignmentSub",
    "thisMonthSmall"
);

set(
    "projectLabel",
    "project"
);

set(
    "projectSub",
    "thisMonthSmall"
);

set(
    "presentationLabel",
    "presentation"
);

set(
    "presentationSub",
    "thisMonthSmall"
);

set(
    "personalLabel",
    "personal"
);

set(
    "personalSub",
    "thisMonthSmall"
);
    set(
        "holidaysTitle",
        "holidays"
    );

    set(
        "quickAddTitle",
        "quickAdd"
    );
    set(
        "addEventBtn",
        "addEvent"
    );

    set(
        "exportBtn",
        "export"
    );

    set(
        "importBtn",
        "import"
    );

    set(
        "upcomingTitle",
        "upcomingEvents"
    );

    set(
        "eventTitleLabel",
        "eventTitle"
    );

    set(
        "eventDateLabel",
        "date"
    );

    set(
        "eventCategoryLabel",
        "category"
    );

    set(
        "eventStartLabel",
        "start"
    );

    set(
        "eventEndLabel",
        "end"
    );

    set(
        "eventLocationLabel",
        "location"
    );

    set(
        "eventDescriptionLabel",
        "description"
    );

    set(
        "customAlarmTitle",
        "customAlarm"
    );

    set(
        "customAlarmSubtitle",
        "customAlarmSubtitle"
    );

    set(
        "alarmDateLabel",
        "alarmDate"
    );

    set(
        "alarmTimeLabel",
        "alarmTime"
    );

    set(
        "alarmSoundLabel",
        "alarmSound"
    );

    set(
        "testAlarmBtn",
        "testAlarm"
    );

    set(
        "detailsModalTitle",
        "eventDetails"
    );

    set(
        "dismissAlarmBtn",
        "dismiss"
    );

    set(
        "snoozeAlarmBtn",
        "snooze"
    );

    set(
        "pastEventsTitle",
        "pastEvents"
    );


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.placeholder =
            t("searchEvents");

    }


    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    if (categoryFilter) {

        updateCategorySelect(
            categoryFilter
        );

    }


    const eventCategory =
        document.getElementById(
            "eventCategory"
        );


    if (eventCategory) {

        updateEventCategorySelect(
            eventCategory
        );

    }


    const alarmSound =
        document.getElementById(
            "alarmSound"
        );


    if (alarmSound) {

        updateAlarmSoundSelect(
            alarmSound
        );

    }


    updateQuickButtons();


    document
        .querySelectorAll(
            '[data-close="eventModal"]'
        )
        .forEach(
            button => {

                button.textContent =
                    button.classList.contains(
                        "close-btn"
                    )
                        ? "×"
                        : t("cancel");

            }
        );


    document
        .querySelectorAll(
            '[data-close="detailsModal"]'
        )
        .forEach(
            button => {

                button.textContent =
                    button.classList.contains(
                        "close-btn"
                    )
                        ? "×"
                        : t("close");

            }
        );


    const saveButton =
        document.querySelector(
            '#eventForm button[type="submit"]'
        );


    if (saveButton) {

        saveButton.textContent =
            t("saveEvent");

    }


    const deleteButton =
        document.getElementById(
            "deleteBtn"
        );


    if (deleteButton) {

        deleteButton.textContent =
            t("delete");

    }


    const editButton =
        document.getElementById(
            "editDetailsBtn"
        );


    if (editButton) {

        editButton.textContent =
            t("edit");

    }


    if (
        !state.editingId
    ) {

        const modalTitle =
            document.getElementById(
                "modalTitle"
            );


        if (modalTitle) {

            modalTitle.textContent =
                t("addEvent");

        }

    }


    const alarmTitle =
        document.getElementById(
            "alarmTitle"
        );


    if (alarmTitle) {

        alarmTitle.textContent =
            t("alarm");

    }


    const alarmMessage =
        document.getElementById(
            "alarmMessage"
        );


    if (
        alarmMessage &&
        !state.activeAlarmEvent
    ) {

        alarmMessage.textContent =
            t("alarmRinging");

    }

}


/* =========================================================
   CATEGORY SELECT
========================================================= */

function updateCategorySelect(select) {

    const options =
        select.querySelectorAll(
            "option"
        );


    options.forEach(
        option => {

            const value =
                option.value;


            if (
                value === "all"
            ) {

                option.textContent =
                    t(
                        "allCategories"
                    );

                return;

            }


            if (
                CATEGORY_NAMES[value]
            ) {

                option.textContent =
                    CATEGORY_NAMES[value][
                        state.language
                    ];

            }

        }
    );

}


/* =========================================================
   EVENT CATEGORY SELECT
========================================================= */

function updateEventCategorySelect(
    select
) {

    const options =
        select.querySelectorAll(
            "option"
        );


    options.forEach(
        option => {

            const value =
                option.value;


            if (
                CATEGORY_NAMES[value]
            ) {

                option.textContent =

                    state.language === "bn"

                        ? CATEGORY_NAMES[
                            value
                        ].bn

                        : value === "exam"

                            ? "Exam / CT"

                            : CATEGORY_NAMES[
                                value
                            ].en;

            }

        }
    );

}


/* =========================================================
   ALARM SOUND SELECT
========================================================= */

function updateAlarmSoundSelect(
    select
) {

    const names = {

        default:
            "defaultAlarm",

        beep:
            "beep",

        bell:
            "bell",

        digital:
            "digital"

    };


    select
        .querySelectorAll(
            "option"
        )
        .forEach(
            option => {

                const key =
                    names[
                        option.value
                    ];


                if (key) {

                    option.textContent =
                        t(key);

                }

            }
        );

}


/* =========================================================
   QUICK BUTTONS
========================================================= */

function updateQuickButtons() {

    const buttons =
        document.querySelectorAll(
            ".quick-btn"
        );


    buttons.forEach(
        button => {

            const category =
                button.dataset.category;


            if (
                category === "exam"
            ) {

                button.textContent =
                    state.language === "bn"

                        ? "+ CT / পরীক্ষা"

                        : "+ CT / Exam";

                return;

            }


            if (
                CATEGORY_NAMES[
                    category
                ]
            ) {

                button.textContent =
                    "+ " +

                    CATEGORY_NAMES[
                        category
                    ][
                        state.language
                    ];

            }

        }
    );

}


/* =========================================================
   CALENDAR RENDER
========================================================= */

function renderCalendar() {

    const grid =
        document.getElementById(
            "calendarGrid"
        );


    if (!grid) return;


    grid.innerHTML = "";


    const year =
        state.currentDate.getFullYear();


    const month =
        state.currentDate.getMonth();


    const title =
        document.getElementById(
            "monthTitle"
        );


    if (title) {

        if (
            state.language === "bn"
        ) {

            title.textContent =
               formatBanglaMonthYear(

                    state.currentDate

                );

        }

        else {

            title.textContent =
                `${MONTHS_EN[month]} ${year}`;

        }

    }


    const subtitle =
        document.getElementById(
            "monthSubtitle"
        );


    if (subtitle) {

        subtitle.textContent =
            t(
                "bangladeshTime"
            );

    }


    const weekdays =
        state.language === "bn"

            ? WEEKDAYS_BN

            : WEEKDAYS_EN;


    weekdays.forEach(
        (dayName, index) => {

            const header =
                document.createElement(
                    "div"
                );


            header.className =
                "weekday";


            if (
                index === 5 ||
                index === 6
            ) {

                header.style.color =
                    "#e53935";

            }


            header.textContent =
                dayName;


            grid.appendChild(
                header
            );

        }
    );


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const daysInPreviousMonth =
        new Date(
            year,
            month,
            0
        ).getDate();


    const totalCells =
        Math.ceil(

            (
                firstDay +
                daysInMonth
            ) / 7

        ) * 7;


    for (

        let cell = 0;

        cell < totalCells;

        cell++

    ) {

        let dayNumber;

        let cellDate;

        let otherMonth = false;


        if (
            cell < firstDay
        ) {

            dayNumber =
                daysInPreviousMonth -
                firstDay +
                cell +
                1;


            cellDate =
                new Date(
                    year,
                    month - 1,
                    dayNumber
                );


            otherMonth = true;

        }


        else if (

            cell >=
            firstDay +
            daysInMonth

        ) {

            dayNumber =
                cell -
                firstDay -
                daysInMonth +
                1;


            cellDate =
                new Date(
                    year,
                    month + 1,
                    dayNumber
                );


            otherMonth = true;

        }


        else {

            dayNumber =
                cell -
                firstDay +
                1;


            cellDate =
                new Date(
                    year,
                    month,
                    dayNumber
                );

        }


        const day =
            document.createElement(
                "div"
            );


        day.className =
            "day";


        if (
            otherMonth
        ) {

            day.classList.add(
                "other-month"
            );

        }


        if (

            isSameDate(
                cellDate,
                new Date()
            )

        ) {

            day.classList.add(
                "today"
            );

        }


        if (

            cellDate.getDay() === 5 ||

            cellDate.getDay() === 6

        ) {

            day.classList.add(
                "weekend"
            );

        }


        day.addEventListener(
            "click",
            () => {

                openEventModal(

                    formatDate(
                        cellDate
                    )

                );

            }
        );


        const number =
            document.createElement(
                "div"
            );


        number.className =
            "day-number";


        if (
            state.language === "bn"
        ) {

            number.textContent =
                toBanglaNumber(
                    dayNumber
                );

        }

        else {

            number.textContent =
                dayNumber;

        }


        day.appendChild(
            number
        );


const holiday = getHolidayForDate(
    cellDate
);

if (holiday) {

    day.classList.add(
        "holiday-day"
    );

    const holidayIndicator =
        document.createElement(
            "div"
        );

    holidayIndicator.className =
        "holiday-indicator";

    holidayIndicator.textContent =
         
        (
            state.language === "bn"
                ? (
                    holiday.titleBn ||
                    holiday.title
                )
                : holiday.title
        );

    holidayIndicator.title =
        state.language === "bn"
            ? (
                holiday.titleBn ||
                holiday.title
            )
            : holiday.title;

    day.appendChild(
        holidayIndicator
    );

}

        if (
            state.language === "bn"
        ) {

            const banglaDate =
                document.createElement(
                    "div"
                );


            banglaDate.className =
                "bangla-day-number";


            banglaDate.textContent =
                formatBanglaShortDate(
                    cellDate
                );


            day.appendChild(
                banglaDate
            );

        }


        const dateString =
            formatDate(
                cellDate
            );


        const dayEvents = getFilteredEvents()

        .filter(event => {

            if (
                event.date !==  dateString
            ) {
                return false;
            }

            return getEventStatus(event) !== "past";

        })

        .sort(
            sortEvents
        );


        dayEvents.forEach(
            event => {

                const eventElement =  document.createElement(
                        "div"
                    );


                eventElement.className =
                    `event ${
                        event.category ||
                        "other"
                    }`;


                eventElement.textContent =
                    event.title;


                eventElement.title =
                    event.title;


                eventElement.addEventListener(
                    "click",
                    clickEvent => {

                        clickEvent.stopPropagation();


                        showEventDetails(
                            event.id
                        );

                    }
                );


                day.appendChild(
                    eventElement
                );

            }
        );


        grid.appendChild(
            day
        );

    }

}


/* =========================================================
   SORT EVENTS
========================================================= */

function sortEvents(a, b) {

    const first =
        `${a.date} ${a.start || "00:00"}`;


    const second =
        `${b.date} ${b.start || "00:00"}`;


    return first.localeCompare(
        second
    );

}


/* =========================================================
   PREVIOUS MONTH
========================================================= */

function previousMonth() {

    state.currentDate =
        new Date(

            state.currentDate.getFullYear(),

            state.currentDate.getMonth() - 1,

            1

        );


    renderCalendar();

    updateDashboard();

}


/* =========================================================
   NEXT MONTH
========================================================= */

function nextMonth() {

    state.currentDate =
        new Date(

            state.currentDate.getFullYear(),

            state.currentDate.getMonth() + 1,

            1

        );


    renderCalendar();

    updateDashboard();

}


/* =========================================================
   GO TODAY
========================================================= */

function goToday() {

    const today =
        new Date();


    state.currentDate =
        new Date(

            today.getFullYear(),

            today.getMonth(),

            1

        );


    renderCalendar();

    renderUpcoming();
    renderPastEvents();

    updateDashboard();

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date) {

    if (

        !date ||

        Number.isNaN(
            date.getTime()
        )

    ) {

        return "";

    }


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


/* =========================================================
   SAME DATE
========================================================= */

function isSameDate(a, b) {

    return (

        a.getFullYear() ===
        b.getFullYear()

        &&

        a.getMonth() ===
        b.getMonth()

        &&

        a.getDate() ===
        b.getDate()

    );

}


/* =========================================================
   PARSE DATE
========================================================= */

function parseDate(
    dateString
) {

    if (!dateString) {

        return null;

    }


    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    return date;

}

/* =========================================================
   EVENT STATUS
========================================================= */

function getEventStatus(event) {

    if (!event || !event.date) {
        return "past";
    }

    const today = new Date();

    const eventDate = parseDate(event.date);

    if (!eventDate) {
        return "past";
    }

    const todayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
    );

    const eventDay = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        0,
        0,
        0,
        0
    );

    if (eventDay > todayDate) {
        return "upcoming";
    }

    if (eventDay < todayDate) {
        return "past";
    }

    if (!event.end) {
        return "ongoing";
    }

    const [hours, minutes] =
        event.end.split(":").map(Number);

    if (
        Number.isNaN(hours) ||
        Number.isNaN(minutes)
    ) {
        return "ongoing";
    }

    const eventEnd = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
        0,
        0
    );

    if (
        today.getTime() >=
        eventEnd.getTime()
    ) {
        return "past";
    }

    return "ongoing";
}
/* =========================================================
   FILTER EVENTS
========================================================= */

function getFilteredEvents() {

    const search =
        (
            document.getElementById(
                "searchInput"
            )?.value ||
            ""
        )

            .trim()
            .toLowerCase();


    const category =
        document.getElementById(
            "categoryFilter"
        )?.value ||
        "all";


    return state.events.filter(
        event => {

            const title =
                String(
                    event.title ||
                    ""
                ).toLowerCase();


            const description =
                String(
                    event.description ||
                    ""
                ).toLowerCase();


            const location =
                String(
                    event.location ||
                    ""
                ).toLowerCase();


            const matchesSearch =
                !search ||

                title.includes(
                    search
                ) ||

                description.includes(
                    search
                ) ||

                location.includes(
                    search
                );


            const matchesCategory =
                category === "all" ||

                event.category ===
                category;


            return (

                matchesSearch &&

                matchesCategory

            );

        }
    );

}


/* =========================================================
   OPEN EVENT MODAL
========================================================= */

function openEventModal(

    date = null,

    category = "class"

) {

    const modal =
        document.getElementById(
            "eventModal"
        );


    if (!modal) return;


    state.editingId =
        null;


    const form =
        document.getElementById(
            "eventForm"
        );


    if (form) {

        form.reset();

    }


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );


    if (modalTitle) {

        modalTitle.textContent =
            t("addEvent");

    }


    document.getElementById(
        "eventId"
    ).value = "";


    document.getElementById(
        "eventCategory"
    ).value =
        category ||
        "class";


    document.getElementById(
        "deleteBtn"
    )?.classList.add(
        "hidden"
    );


    const selectedDate =
        date ||

        formatDate(
            new Date()
        );


    document.getElementById(
        "eventDate"
    ).value =
        selectedDate;


    const reminder =
        document.getElementById(
            "eventReminder"
        );


    if (reminder) {

        reminder.checked =
            false;

    }


    document.getElementById(
        "alarmSettings"
    )?.classList.add(
        "hidden"
    );


    document.getElementById(
        "customAlarmDate"
    ).value = "";


    document.getElementById(
        "customAlarmTime"
    ).value = "";


    document.getElementById(
        "alarmSound"
    ).value =
        "default";


    modal.classList.add(
        "active"
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(id) {

    const modal =
        document.getElementById(
            id
        );


    if (!modal) return;


    modal.classList.remove(
        "active"
    );


    if (
        id ===
        "alarmModal"
    ) {

        stopAlarmSound();


        state.activeAlarmEvent =
            null;

    }

}


/* =========================================================
   CLOSE EVENT MODAL
========================================================= */

function closeEventModal() {

    closeModal(
        "eventModal"
    );

}


/* =========================================================
   CLOSE ACTIVE MODALS
========================================================= */

function closeActiveModals() {

    document
        .querySelectorAll(
            ".modal-overlay.active"
        )
        .forEach(
            modal => {

                modal.classList.remove(
                    "active"
                );

            }
        );


    stopAlarmSound();

}


/* =========================================================
   SAVE EVENT FROM FORM
========================================================= */

async function saveEventFromForm() {

    const title =
        document.getElementById(
            "eventTitle"
        ).value.trim();


    const date =
        document.getElementById(
            "eventDate"
        ).value;


    const category =
        document.getElementById(
            "eventCategory"
        ).value;


    const start =
        document.getElementById(
            "eventStart"
        ).value;


    const end =
        document.getElementById(
            "eventEnd"
        ).value;


    const reminder =
        document.getElementById(
            "eventReminder"
        ).checked;


    if (
        !title ||
        !date
    ) {

        showToast(

            state.language === "bn"

                ? "ইভেন্টের নাম ও তারিখ দিন।"

                : "Please enter event title and date."

        );

        return;

    }


    if (

        start &&
        end &&
        start > end

    ) {

        showToast(

            state.language === "bn"

                ? "শেষের সময় শুরুর সময়ের পরে হতে হবে।"

                : "End time must be after start time."

        );

        return;

    }


    let alarmDate =
        document.getElementById(
            "customAlarmDate"
        ).value;


    let alarmTime =
        document.getElementById(
            "customAlarmTime"
        ).value;


    const alarmSound =
        document.getElementById(
            "alarmSound"
        ).value ||
        "default";


    if (reminder) {

        if (
            !alarmDate ||
            !alarmTime
        ) {

            showToast(

                state.language === "bn"

                    ? "অ্যালার্মের তারিখ ও সময় দিন।"

                    : "Please set alarm date and time."

            );

            return;

        }


        const alarmDateTime =
            new Date(
                `${alarmDate}T${alarmTime}:00`
            );


        if (

            Number.isNaN(
                alarmDateTime.getTime()
            )

        ) {

            showToast(

                state.language === "bn"

                    ? "অ্যালার্মের তারিখ বা সময় সঠিক নয়।"

                    : "Invalid alarm date or time."

            );

            return;

        }


        if (

            alarmDateTime.getTime() <=
            Date.now()

        ) {

            showToast(

                state.language === "bn"

                    ? "অ্যালার্ম ভবিষ্যতের সময় সেট করুন।"

                    : "Please set the alarm for a future time."

            );

            return;

        }

    }

    else {

        alarmDate = "";

        alarmTime = "";

    }


    const eventId =
        document.getElementById(
            "eventId"
        ).value;


    const existingEvent =
        eventId

            ? state.events.find(
                event =>
                    String(
                        event.id
                    ) ===
                    String(
                        eventId
                    )
            )

            : null;


    const eventData = {

        id:
            eventId ||
            Date.now().toString(),

        title,

        date,

        category,

        start,

        end,

        location:
            document.getElementById(
                "eventLocation"
            ).value.trim(),

        description:
            document.getElementById(
                "eventDescription"
            ).value.trim(),

        reminder,

        alarmDate,

        alarmTime,

        alarmSound,

        alarmTriggered:

            reminder

                ? (

                    existingEvent &&

                    existingEvent.alarmDate ===
                    alarmDate &&

                    existingEvent.alarmTime ===
                    alarmTime

                        ? Boolean(
                            existingEvent.alarmTriggered
                        )

                        : false

                )

                : false

    };


    if (eventId) {

        const index =
            state.events.findIndex(
                event =>
                    String(
                        event.id
                    ) ===
                    String(
                        eventId
                    )
            );


        if (
            index !== -1
        ) {

            state.events[index] =
                eventData;

        }

    }

    else {

        state.events.push(
            eventData
        );

    }

    await cancelNativeAlarm(eventId);
    if (eventData.reminder) {
    await scheduleNativeAlarm(eventData);
} else {
    await cancelNativeAlarm(eventData.id);
}

    saveEvents();

    closeEventModal();

    renderCalendar();

    renderUpcoming();
    renderPastEvents();

    updateDashboard();


    showToast(

        eventId

            ? (

                state.language === "bn"

                    ? "ইভেন্ট সফলভাবে আপডেট হয়েছে।"

                    : "Event updated successfully."

            )

            : (

                state.language === "bn"

                    ? "ইভেন্ট সফলভাবে যোগ হয়েছে।"

                    : "Event added successfully."

            )

    );

}


/* =========================================================
   EDIT EVENT
========================================================= */

function editEvent(id) {

    const event =
        state.events.find(
            item =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (!event) return;


    state.editingId =
        event.id;


    document.getElementById(
        "modalTitle"
    ).textContent =

        state.language === "bn"

            ? "ইভেন্ট এডিট করুন"

            : "Edit Event";


    document.getElementById(
        "eventId"
    ).value =
        event.id;


    document.getElementById(
        "eventTitle"
    ).value =
        event.title || "";


    document.getElementById(
        "eventDate"
    ).value =
        event.date || "";


    document.getElementById(
        "eventCategory"
    ).value =
        event.category ||
        "other";


    document.getElementById(
        "eventStart"
    ).value =
        event.start || "";


    document.getElementById(
        "eventEnd"
    ).value =
        event.end || "";


    document.getElementById(
        "eventLocation"
    ).value =
        event.location || "";


    document.getElementById(
        "eventDescription"
    ).value =
        event.description || "";


    document.getElementById(
        "eventReminder"
    ).checked =
        Boolean(
            event.reminder
        );


    document.getElementById(
        "customAlarmDate"
    ).value =
        event.alarmDate || "";


    document.getElementById(
        "customAlarmTime"
    ).value =
        event.alarmTime || "";


    document.getElementById(
        "alarmSound"
    ).value =
        event.alarmSound ||
        "default";


    toggleAlarmFields();


    document.getElementById(
        "deleteBtn"
    )?.classList.remove(
        "hidden"
    );


    document.getElementById(
        "eventModal"
    )?.classList.add(
        "active"
    );

}


/* =========================================================
   DELETE EVENT
========================================================= */

async function deleteCurrentEvent() {

    const id =
        document.getElementById("eventId").value;

    if (!id) return;

    const confirmed =
        confirm(
            state.language === "bn"
                ? "এই ইভেন্টটি ডিলিট করতে চান?"
                : "Delete this event?"
        );

    if (!confirmed) return;

    state.events =
        state.events.filter(
            event =>
                String(event.id) !== String(id)
        );

    await cancelNativeAlarm(id);

    saveEvents();

    closeEventModal();
    renderCalendar();
    renderUpcoming();
    renderPastEvents();
    updateDashboard();

    showToast(
        state.language === "bn"
            ? "ইভেন্ট ডিলিট করা হয়েছে।"
            : "Event deleted."
    );
}


/* =========================================================
   EVENT DETAILS
========================================================= */

function showEventDetails(id) {

    const event =
        state.events.find(
            item =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (!event) return;


    state.selectedEventId =
        event.id;


    const container =
        document.getElementById(
            "eventDetails"
        );


    if (!container) return;


    const category =
        CATEGORY_NAMES[
            event.category
        ]?.[
            state.language
        ] ||
        event.category;


    const date =
        parseDate(
            event.date
        );


    const formattedDate =
        date

            ? date.toLocaleDateString(

                state.language === "bn"

                    ? "bn-BD"

                    : "en-US",

                {

                    weekday:
                        "long",

                    year:
                        "numeric",

                    month:
                        "long",

                    day:
                        "numeric"

                }

            )

            : event.date;


    let html = "";


    html += `

        <div class="detail-row">

            <div class="detail-label">
                ${escapeHTML(
                    t("eventTitle")
                )}
            </div>

            <div class="detail-value">
                ${escapeHTML(
                    event.title
                )}
            </div>

        </div>

    `;


    html += `

        <div class="detail-row">

            <div class="detail-label">
                ${escapeHTML(
                    t("date")
                )}
            </div>

            <div class="detail-value">

                ${escapeHTML(
                    formattedDate
                )}

                ${
                    state.language === "bn" && date

                        ? `<br><small>${escapeHTML(
                            formatBanglaDate(
                                date
                            )
                        )}</small>`

                        : ""
                }

            </div>

        </div>

    `;


    html += `

        <div class="detail-row">

            <div class="detail-label">
                ${escapeHTML(
                    t("category")
                )}
            </div>

            <div class="detail-value">
                ${escapeHTML(
                    category
                )}
            </div>

        </div>

    `;


    if (
        event.start
    ) {

        html += `

            <div class="detail-row">

                <div class="detail-label">
                    ${escapeHTML(
                        t("start")
                    )}
                </div>

                <div class="detail-value">

                    ${escapeHTML(
                        event.start
                    )}

                    ${
                        event.end

                            ? ` - ${escapeHTML(
                                event.end
                            )}`

                            : ""
                    }

                </div>

            </div>

        `;

    }


    if (
        event.location
    ) {

        html += `

            <div class="detail-row">

                <div class="detail-label">
                    ${escapeHTML(
                        t("location")
                    )}
                </div>

                <div class="detail-value">
                    ${escapeHTML(
                        event.location
                    )}
                </div>

            </div>

        `;

    }


    if (
        event.description
    ) {

        html += `

            <div class="detail-row">

                <div class="detail-label">
                    ${escapeHTML(
                        t("description")
                    )}
                </div>

                <div class="detail-value">
                    ${escapeHTML(
                        event.description
                    )}
                </div>

            </div>

        `;

    }


    if (
        event.reminder
    ) {

        const alarmDate =
            event.alarmDate
                ? escapeHTML(
                    event.alarmDate
                )
                : "";


        const alarmTime =
            event.alarmTime
                ? escapeHTML(
                    event.alarmTime
                )
                : "";


        html += `

            <div class="detail-row">

                <div class="detail-label">
                    🔔 ${escapeHTML(
                        t("alarm")
                    )}
                </div>

                <div class="detail-value">

                    ${alarmDate}

                    ${
                        alarmTime
                            ? ` ${alarmTime}`
                            : ""
                    }

                </div>

            </div>

        `;

    }


    container.innerHTML =
        html;


    document.getElementById(
        "detailsModal"
    )?.classList.add(
        "active"
    );

}


/* =========================================================
   EDIT SELECTED EVENT
========================================================= */

function editSelectedEvent() {

    if (
        !state.selectedEventId
    ) {

        return;

    }


    closeModal(
        "detailsModal"
    );


    editEvent(
        state.selectedEventId
    );

}


/* =========================================================
   UPCOMING EVENTS
========================================================= */

function renderUpcoming() {

    const container =
        document.getElementById(
            "upcomingEvents"
        );


    if (!container) return;


    container.innerHTML = "";


    const today =
        formatDate(
            new Date()
        );


    const events = getFilteredEvents()

        .filter(event => {

            const status = getEventStatus(event);
            return (
                status === "upcoming" ||
                status === "ongoing"
            );

        })

        .sort(
            sortEvents
        )

        .slice(
            0,
            10
        );


    const count =  document.getElementById(
            "eventCount"
        );

    if (count) {

        count.textContent =

            state.language === "bn"

                ? `${toBanglaNumber(
                    events.length
                )}টি ইভেন্ট`

                : `${events.length} events`;

    }


    if (
        !events.length
    ) {

        container.innerHTML =

            `<div class="empty">
                ${escapeHTML(
                    t("noUpcoming")
                )}
            </div>`;

        return;

    }


    events.forEach(
        event => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "upcoming-item";


            const category =
                CATEGORY_NAMES[
                    event.category
                ]?.[
                    state.language
                ] ||
                event.category;


            const date =
                parseDate(
                    event.date
                );


            const formatted =
                date

                    ? date.toLocaleDateString(

                        state.language === "bn"

                            ? "bn-BD"

                            : "en-US",

                        {

                            month:
                                "short",

                            day:
                                "numeric",

                            year:
                                "numeric"

                        }

                    )

                    : event.date;


            item.innerHTML = `

                <div class="upcoming-title">

                    ${escapeHTML(
                        event.title
                    )}

                </div>


                <div class="upcoming-date">

                    ${escapeHTML(
                        formatted
                    )}

                    ${
                        state.language === "bn" && date

                            ? `<br>${escapeHTML(
                                formatBanglaDate(
                                    date
                                )
                            )}`

                            : ""
                    }

                    ${
                        event.start

                            ? ` • ${escapeHTML(
                                event.start
                            )}`

                            : ""
                    }

                </div>


                <span class="category-tag">

                    ${escapeHTML(
                        category
                    )}

                </span>

            `;


            item.addEventListener(
                "click",
                () => {

                    showEventDetails(
                        event.id
                    );

                }
            );


            container.appendChild(
                item
            );

        }
    );

}

/* =========================================================
   PAST EVENTS
========================================================= */

function renderPastEvents() {

        const title =
        document.getElementById(
            "pastEventsTitle"
        );

        const selectAllBtn =
        document.getElementById(
            "selectAllPastEvents"
        );

        const deleteBtn =
         document.getElementById(
        "deleteSelectedPastEvents"
        );

    if (title) {

        title.textContent =
            state.language === "bn"
                ? "পূর্বের ইভেন্ট"
                : "Past Events";

    }

    if (selectAllBtn) {

        selectAllBtn.textContent =
            state.language === "bn"
                ? "সব নির্বাচন"
                : "Select All";

    }

    if (deleteBtn) {

    deleteBtn.textContent =
        state.language === "bn"
            ? "নির্বাচিতগুলো মুছুন"
            : "Delete Selected";

}

    const container =
        document.getElementById("pastEvents");

    if (!container) return;

    container.innerHTML = "";

    const events =
        getFilteredEvents()

        .filter(event => {

            return (
                getEventStatus(event) ===
                "past"
            );

        })

        .sort((a, b) => {

            if (a.date !== b.date) {

                return b.date.localeCompare(
                    a.date
                );

            }

            return sortEvents(a, b);

        })

        .slice(0, 10);


    if (!events.length) {

        container.innerHTML = `
            <div class="empty">

                ${
                    state.language === "bn"
                        ? "কোনো পূর্বের ইভেন্ট নেই।"
                        : "No past events."
                }

            </div>
        `;

        updatePastEventActions();

        return;
    }


    events.forEach(event => {

        const item =
            document.createElement("div");

        item.className =
            "upcoming-item past-event-item";


        const date =
            parseDate(event.date);


        const formatted =
            date
                ? date.toLocaleDateString(
                    state.language === "bn"
                        ? "bn-BD"
                        : "en-US",
                    {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    }
                )
                : event.date;


        const category =
            CATEGORY_NAMES[
                event.category
            ]?.[
                state.language
            ] ||
            event.category;


        item.innerHTML = `

            <div class="past-event-top">

                <label
                    class="past-event-checkbox"
                    title="${
                        state.language === "bn"
                            ? "ইভেন্ট নির্বাচন করুন"
                            : "Select event"
                    }"
                >

                    <input                        type="checkbox"
                        class="past-event-check"
                        data-event-id="${event.id}"
                    >

                    <span class="checkmark"></span>

                </label>


                <div class="upcoming-title">

                    ${escapeHTML(event.title)}

                    <span class="past-badge">

                        ${
                            state.language === "bn"
                                ? "পূর্বের"
                                : "Past"
                        }

                    </span>

                </div>

            </div>


            <div class="upcoming-date">

                ${escapeHTML(formatted)}

                ${
                    state.language === "bn" && date
                        ? `<br>${escapeHTML(
                            formatBanglaDate(date)
                        )}`
                        : ""
                }

                ${
                    event.start
                        ? ` • ${escapeHTML(event.start)}`
                        : ""
                }

            </div>


            <div class="upcoming-category">

                ${escapeHTML(category)}

            </div>

        `;


        const checkbox =
            item.querySelector(
                ".past-event-check"
            );


        checkbox.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                updatePastEventActions();

            }
        );


        item.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        ".past-event-checkbox"
                    )
                ) {

                    return;

                }


                state.selectedEventId =
                    event.id;


                showEventDetails(
                    event.id
                );

            }
        );


        container.appendChild(item);

    });


    updatePastEventActions();

}


/* =========================================================
   UPDATE PAST EVENT ACTIONS
========================================================= */

function updatePastEventActions() {

    const checkboxes =
        document.querySelectorAll(
            ".past-event-check"
        );

    const selected =
        Array.from(checkboxes)
            .filter(
                checkbox =>
                    checkbox.checked
            );


    const actions =
        document.getElementById(
            "pastEventsActions"
        );


    const count =
        document.getElementById(
            "selectedPastCount"
        );


    if (!actions || !count) return;


    if (selected.length > 0) {

        actions.style.display =
            "flex";

        count.textContent =
            state.language === "bn"

                ? `${selected.length}টি নির্বাচিত`

                : `${selected.length} selected`;

    } else {

        actions.style.display =
            "none";

        count.textContent =
            state.language === "bn"

                ? "০টি নির্বাচিত"

                : "0 selected";

    }

}

/* =========================================================
   SELECT ALL PAST EVENTS
========================================================= */

function toggleSelectAllPastEvents() {

    const checkboxes =
        document.querySelectorAll(
            ".past-event-check"
        );

    if (!checkboxes.length) return;


    const allSelected =
        Array.from(checkboxes)
            .every(
                checkbox =>
                    checkbox.checked
            );


    checkboxes.forEach(
        checkbox => {

            checkbox.checked =
                !allSelected;

        }
    );


    updatePastEventActions();

}


/* =========================================================
   DELETE SELECTED PAST EVENTS
========================================================= */

function deleteSelectedPastEvents() {

    const checkboxes =
        document.querySelectorAll(
            ".past-event-check:checked"
        );


    if (!checkboxes.length) {

        return;

    }


    const selectedIds =
        Array.from(checkboxes)
            .map(
                checkbox =>
                    checkbox.dataset.eventId
            );


    const message =
        state.language === "bn"

            ? `${selectedIds.length}টি পূর্বের ইভেন্ট মুছে ফেলতে চান?`

            : `Delete ${selectedIds.length} selected past event(s)?`;


    if (!confirm(message)) {

        return;

    }


    state.events =
        state.events.filter(
            event =>
                !selectedIds.includes(
                    String(event.id)
                )
        );

        
    saveEvents();


    renderCalendar();

    renderPastEvents();

}

/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    const now =
        new Date();


    const today =
        formatDate(
            now
        );


    const year =
        state.currentDate.getFullYear();


    const month =
        state.currentDate.getMonth();


    const filtered =
            state.events;


    const todayEvents =
        filtered.filter(
            event =>
                event.date ===
                today
        );


    const monthEvents =
        filtered.filter(
            event => {

                const date =
                    parseDate(
                        event.date
                    );


                if (!date) {

                    return false;

                }


                return (

                    date.getFullYear() ===
                    year

                    &&

                    date.getMonth() ===
                    month

                );

            }
        );


    const classes =
        monthEvents.filter(
            event =>
                event.category ===
                "class"
        );


    const exams =
        monthEvents.filter(
            event =>
                event.category ===
                "exam"
        );


    const assignments =
        monthEvents.filter(
            event =>
                event.category ===
                "assignment"
        );


    const projects =
        monthEvents.filter(
            event =>
                event.category ===
                "project"
        );


    const presentations =
        monthEvents.filter(
            event =>
                event.category ===
                "presentation"
        );


    const personals =
        monthEvents.filter(
            event =>
                event.category ===
                "personal"
        );


    setText(
        "todayCount",
        todayEvents.length
    );


    setText(
        "monthCount",
        monthEvents.length
    );


    setText(
        "classCount",
        classes.length
    );


    setText(
        "examCount",
        exams.length
    );


    setText(
        "assignmentCount",
        assignments.length
    );


    setText(
        "projectCount",
        projects.length
    );


    setText(
        "presentationCount",
        presentations.length
    );


    setText(
        "personalCount",
        personals.length
    );

}

/* =========================================================
   SET TEXT
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) return;


    element.textContent =

        state.language === "bn"

            ? toBanglaNumber(
                value
            )

            : value;

}


/* =========================================================
   BANGLADESH HOLIDAYS 2026
========================================================= */

const DEFAULT_HOLIDAYS_2026 = [

    {
        date: "2026-02-04",
        title: "Shab-e-Barat",
        titleBn: "শবে বরাত"
    },

    {
        date: "2026-02-21",
        title: "Shaheed Day & International Mother Language Day",
        titleBn: "শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস"
    },

    {
        date: "2026-03-17",
        title: "Shab-e-Qadr",
        titleBn: "শবে কদর"
    },

    {
        date: "2026-03-19",
        endDate: "2026-03-23",
        title: "Eid-ul-Fitr Holiday",
        titleBn: "ঈদুল ফিতরের ছুটি"
    },

    {
        date: "2026-03-26",
        title: "Independence & National Day",
        titleBn: "স্বাধীনতা ও জাতীয় দিবস"
    },

    {
        date: "2026-04-14",
        title: "Bangla New Year (Pohela Boishakh)",
        titleBn: "বাংলা নববর্ষ (পহেলা বৈশাখ)"
    },

    {
        date: "2026-05-01",
        title: "May Day & Buddha Purnima",
        titleBn: "মে দিবস ও বুদ্ধ পূর্ণিমা"
    },

    {
        date: "2026-05-25",
        endDate: "2026-05-31",
        title: "Eid-ul-Adha Holiday",
        titleBn: "ঈদুল আজহার ছুটি"
    },

    {
        date: "2026-06-26",
        title: "Ashura",
        titleBn: "আশুরা"
    },

    {
        date: "2026-08-05",
        title: "July Mass Uprising Day",
        titleBn: "জুলাই গণঅভ্যুত্থান দিবস"
    },

    {
        date: "2026-08-26",
        title: "Eid-e-Milad-un-Nabi (PBUH)",
        titleBn: "ঈদে মিলাদুন্নবী (সা.)"
    },

    {
        date: "2026-09-04",
        title: "Janmashtami",
        titleBn: "জন্মাষ্টমী"
    },

    {
        date: "2026-10-20",
        endDate: "2026-10-21",
        title: "Durga Puja Holiday",
        titleBn: "দুর্গাপূজার ছুটি"
    },

    {
        date: "2026-12-16",
        title: "Victory Day",
        titleBn: "বিজয় দিবস"
    },

    {
        date: "2026-12-25",
        title: "Christmas Day",
        titleBn: "বড়দিন"
    }

];


const BANGLADESH_HOLIDAYS =
    DEFAULT_HOLIDAYS_2026;


function getHolidayData() {

    return Array.isArray(
        BANGLADESH_HOLIDAYS
    )

        ? BANGLADESH_HOLIDAYS

        : [];

}

function getHolidayForDate(date) {

    const dateString = formatDate(date);

    return getHolidayData().find(holiday => {

        if (!holiday.date) {
            return false;
        }

        if (!holiday.endDate) {
            return holiday.date === dateString;
        }

        return (
            dateString >= holiday.date &&
            dateString <= holiday.endDate
        );

    }) || null;

}

function renderHolidays() {

    const container =
        document.getElementById(
            "holidayList"
        );


    if (!container) return;


    container.innerHTML = "";


    const holidays =
        [
            ...getHolidayData()
        ]

            .sort(
                (a, b) =>
                    a.date.localeCompare(
                        b.date
                    )
            );


    if (
        !holidays.length
    ) {

        container.innerHTML =

            `<div class="holiday-empty">

                ${escapeHTML(
                    t("noHolidays")
                )}

            </div>`;

        return;

    }


    holidays.forEach(
        holiday => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "holiday-item";


            const date =
                parseDate(
                    holiday.date
                );


            const dayName =
                date

                    ? date.toLocaleDateString(

                        state.language === "bn"

                            ? "bn-BD"

                            : "en-US",

                        {
                            weekday:
                                "long"
                        }

                    )

                    : "";


            const formattedDate =
                date

                    ? date.toLocaleDateString(

                        state.language === "bn"

                            ? "bn-BD"

                            : "en-US",

                        {

                            month:
                                "long",

                            day:
                                "numeric",

                            year:
                                "numeric"

                        }

                    )

                    : holiday.date;


            const holidayName =

                state.language === "bn"

                    ? (
                        holiday.titleBn ||
                        holiday.title
                    )

                    : holiday.title;


            item.innerHTML = `

                <div class="holiday-date">
                    ${escapeHTML(
                        formattedDate
                    )}
                </div>

                ${
                    state.language === "bn" && date

                        ? `<div class="holiday-bangla-date">
                            ${escapeHTML(
                                formatBanglaDate(
                                    date
                                )
                            )}
                        </div>`

                        : ""
                }

                <div class="holiday-name">
                    ${escapeHTML(
                        holidayName
                    )}
                </div>

                <div class="holiday-day">
                    ${escapeHTML(
                        dayName
                    )}
                </div>

            `;


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   ALARM FIELDS
========================================================= */

function toggleAlarmFields() {

    const checkbox =
        document.getElementById(
            "eventReminder"
        );


    const settings =
        document.getElementById(
            "alarmSettings"
        );


    if (
        !checkbox ||
        !settings
    ) {

        return;

    }


    settings.classList.toggle(
        "hidden",
        !checkbox.checked
    );


    if (
        checkbox.checked
    ) {

        const dateInput =
            document.getElementById(
                "customAlarmDate"
            );


        const timeInput =
            document.getElementById(
                "customAlarmTime"
            );


        if (
            dateInput &&
            !dateInput.value
        ) {

            dateInput.value =
                document.getElementById(
                    "eventDate"
                ).value ||

                formatDate(
                    new Date()
                );

        }


        if (
            timeInput &&
            !timeInput.value
        ) {

            const future =
                new Date(
                    Date.now() +
                    60 * 1000
                );


            timeInput.value =

                `${String(
                    future.getHours()
                ).padStart(
                    2,
                    "0"
                )}:${String(
                    future.getMinutes()
                ).padStart(
                    2,
                    "0"
                )}`;

        }

    }

}


/* =========================================================
   CHECK ALARMS
========================================================= */

function checkAlarms() {

    const now =
        new Date();


    if (
        state.activeAlarmEvent
    ) {

        return;

    }


    let changed = false;


    state.events.forEach(
        event => {

            if (

                !event.reminder ||

                !event.alarmDate ||

                !event.alarmTime

            ) {

                return;

            }


            if (
                event.alarmTriggered
            ) {

                return;

            }


            const alarmDate =
                new Date(

                    `${event.alarmDate}T${event.alarmTime}:00`

                );


            if (

                Number.isNaN(
                    alarmDate.getTime()
                )

            ) {

                return;

            }


            if (
                now >= alarmDate
            ) {

                event.alarmTriggered =
                    true;


                changed = true;


                showAlarm(
                    event
                );

            }

        }
    );


    if (changed) {
       

        saveEvents();
        renderCalendar();

    }

}


/* =========================================================
   SHOW ALARM
========================================================= */

function showAlarm(event) {

    if (
        state.activeAlarmEvent
    ) {

        return;

    }


    state.activeAlarmEvent =
        event;


    const title =
        document.getElementById(
            "alarmTitle"
        );


    const message =
        document.getElementById(
            "alarmMessage"
        );


    const info =
        document.getElementById(
            "alarmEventInfo"
        );


    if (title) {

        title.textContent =
            t("alarm");

    }


    if (message) {

        message.textContent =

            state.language === "bn"

                ? `${event.title} এর সময় হয়েছে।`

                : `${event.title} is scheduled now.`;

    }


    if (info) {

        const date =
            parseDate(
                event.date
            );


        const formattedDate =
            date

                ? date.toLocaleDateString(

                    state.language === "bn"

                        ? "bn-BD"

                        : "en-US",

                    {

                        weekday:
                            "long",

                        year:
                            "numeric",

                        month:
                            "long",

                        day:
                            "numeric"

                    }

                )

                : event.date;


        info.innerHTML = `

            <strong>
                ${escapeHTML(
                    event.title
                )}
            </strong>

            <br>

            ${escapeHTML(
                formattedDate
            )}

            ${
                state.language === "bn" && date

                    ? `<br>${escapeHTML(
                        formatBanglaDate(
                            date
                        )
                    )}`

                    : ""
            }

            ${
                event.start

                    ? ` • ${escapeHTML(
                        event.start
                    )}`

                    : ""
            }

        `;

    }


    document.getElementById(
        "alarmModal"
    )?.classList.add(
        "active"
    );


    playAlarm(
        event.alarmSound
    );

}


/* =========================================================
   TEST ALARM
========================================================= */

function testAlarm() {

    playAlarm(

        document.getElementById(
            "alarmSound"
        )?.value ||

        "default"

    );


    showToast(

        state.language === "bn"

            ? "অ্যালার্ম সাউন্ড বাজছে..."

            : "Alarm sound playing..."

    );

}


/* =========================================================
   PLAY ALARM
========================================================= */

function playAlarm(
    sound = "default"
) {

    try {

        stopAlarmSound();


        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {

            showToast(

                state.language === "bn"

                    ? "এই ডিভাইসে অডিও সাপোর্ট নেই।"

                    : "Audio is not supported on this device."

            );

            return;

        }


        const context =
            new AudioContext();


        state.alarmAudioContext =
            context;


        if (
            context.state ===
            "suspended"
        ) {

            context.resume()
                .catch(
                    error =>
                        console.error(
                            error
                        )
                );

        }


        const oscillator =
            context.createOscillator();


        const gain =
            context.createGain();


        state.alarmOscillator =
            oscillator;


        state.alarmGain =
            gain;


        if (
            sound === "digital"
        ) {

            oscillator.type =
                "square";

        }

        else if (
            sound === "bell"
        ) {

            oscillator.type =
                "sine";

        }

        else if (
            sound === "beep"
        ) {

            oscillator.type =
                "square";

        }

        else {

            oscillator.type =
                "sine";

        }


        if (
            sound === "bell"
        ) {

            oscillator.frequency.value =
                880;

        }

        else if (
            sound === "beep"
        ) {

            oscillator.frequency.value =
                660;

        }

        else if (
            sound === "digital"
        ) {

            oscillator.frequency.value =
                1000;

        }

        else {

            oscillator.frequency.value =
                740;

        }


        gain.gain.setValueAtTime(

            0.0001,

            context.currentTime

        );


        oscillator.connect(
            gain
        );


        gain.connect(
            context.destination
        );


        oscillator.start();


        gain.gain.exponentialRampToValueAtTime(

            0.25,

            context.currentTime +
            0.05

        );


        state.alarmInterval =
            setInterval(
                () => {

                    if (

                        !state.alarmOscillator ||

                        !state.alarmAudioContext

                    ) {

                        return;

                    }


                    const currentContext =
                        state.alarmAudioContext;


                    let frequency;


                    if (
                        sound === "bell"
                    ) {

                        frequency =

                            Math.random() > 0.5

                                ? 880

                                : 660;

                    }

                    else if (
                        sound === "digital"
                    ) {

                        frequency =

                            Math.random() > 0.5

                                ? 1000

                                : 1400;

                    }

                    else {

                        frequency =

                            Math.random() > 0.5

                                ? 880

                                : 660;

                    }


                    state.alarmOscillator
                        .frequency
                        .setValueAtTime(

                            frequency,

                            currentContext.currentTime

                        );

                },

                500
            );

    }

    catch (error) {

        console.error(
            "Alarm audio error:",
            error
        );

    }

}


/* =========================================================
   STOP ALARM SOUND
========================================================= */

function stopAlarmSound() {

    if (
        state.alarmInterval
    ) {

        clearInterval(
            state.alarmInterval
        );


        state.alarmInterval =
            null;

    }


    try {

        if (
            state.alarmOscillator
        ) {

            state.alarmOscillator.stop();

            state.alarmOscillator.disconnect();

            state.alarmOscillator =
                null;

        }

    }

    catch (error) {

        console.warn(
            "Unable to stop oscillator:",
            error
        );

        state.alarmOscillator =
            null;

    }


    try {

        if (
            state.alarmAudioContext
        ) {

            state.alarmAudioContext.close();

            state.alarmAudioContext =
                null;

        }

    }

    catch (error) {

        console.warn(
            "Unable to close audio context:",
            error
        );

        state.alarmAudioContext =
            null;

    }

}


/* =========================================================
   DISMISS ALARM
========================================================= */

function dismissAlarm() {

    stopAlarmSound();


    closeModal(
        "alarmModal"
    );


    state.activeAlarmEvent =
        null;

}


/* =========================================================
   SNOOZE ALARM
========================================================= */
async function snoozeAlarm() {

    const event = state.activeAlarmEvent;

    if (!event) return;

    stopAlarmSound();

    const snooze =
        new Date(Date.now() + 5 * 60 * 1000);

    event.alarmDate =
        formatDate(snooze);

    event.alarmTime =
        `${String(snooze.getHours()).padStart(2, "0")}:${String(snooze.getMinutes()).padStart(2, "0")}`;

    event.alarmTriggered = false;

    saveEvents();

    await scheduleNativeAlarm(event);

    closeModal("alarmModal");

    state.activeAlarmEvent = null;

    showToast(
        state.language === "bn"
            ? "অ্যালার্ম ৫ মিনিটের জন্য snooze করা হয়েছে।"
            : "Alarm snoozed for 5 minutes."
    );
}


/* =========================================================
   EXPORT EVENTS
========================================================= */

function exportEvents() {

    try {

        const data =
            JSON.stringify(

                state.events,

                null,

                2

            );


        const blob =
            new Blob(

                [data],

                {
                    type:
                        "application/json"
                }

            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            "bd-student-calendar-events.json";


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        setTimeout(

            () => {

                URL.revokeObjectURL(
                    url
                );

            },

            100

        );


        showToast(

            state.language === "bn"

                ? "ইভেন্ট সফলভাবে এক্সপোর্ট হয়েছে।"

                : "Events exported successfully."

        );

    }

    catch (error) {

        console.error(
            "Export error:",
            error
        );


        showToast(

            state.language === "bn"

                ? "এক্সপোর্ট করা যায়নি।"

                : "Unable to export events."

        );

    }

}


/* =========================================================
   IMPORT EVENTS
========================================================= */

function importEvents(event) {

    const file =
        event.target.files?.[0];


    if (!file) return;


    const reader =
        new FileReader();


    reader.onload =
        () => {

            try {

                const imported =
                    JSON.parse(
                        reader.result
                    );


                if (
                    !Array.isArray(
                        imported
                    )
                ) {

                    throw new Error(
                        "Invalid format"
                    );

                }


                const validEvents =

                    imported

                        .map(
                            normalizeEvent
                        )

                        .filter(
                            item =>
                                item &&
                                item.title &&
                                item.date
                        );


                if (
                    validEvents.length !==
                    imported.length
                ) {

                    throw new Error(
                        "Invalid event data"
                    );

                }


                const confirmed =
                    confirm(

                        state.language === "bn"

                            ? "বর্তমান ইভেন্টগুলো replace করে import করা হবে। আপনি কি নিশ্চিত?"

                            : "Replace current events with imported events?"

                    );


                if (
                    !confirmed
                ) {

                    return;

                }


                const usedIds =
                    new Set();


                state.events =
                    validEvents.map(
                        item => {

                            let id =
                                String(
                                    item.id
                                );


                            if (
                                usedIds.has(id)
                            ) {

                                id =
                                    Date.now()
                                    .toString() +

                                    Math.random()
                                        .toString(36)
                                        .slice(2);

                            }


                            usedIds.add(
                                id
                            );


                            return {

                                ...item,

                                id

                            };

                        }
                    );

                
                saveEvents();
    

                renderCalendar();

                renderUpcoming();
                renderPastEvents();

                updateDashboard();


                showToast(

                    state.language === "bn"

                        ? "ইভেন্ট সফলভাবে import হয়েছে।"

                        : "Events imported successfully."

                );

            }

            catch (error) {

                console.error(
                    "Import error:",
                    error
                );


                showToast(

                    state.language === "bn"

                        ? "ভুল JSON ফাইল।"

                        : "Invalid JSON file."

                );

            }

        };


    reader.onerror =
        () => {

            showToast(

                state.language === "bn"

                    ? "ফাইল পড়া যায়নি।"

                    : "Unable to read file."

            );

        };


    reader.readAsText(
        file
    );


    event.target.value =
        "";

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) return;


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        showToast.timer
    );


    showToast.timer =
        setTimeout(

            () => {

                toast.classList.remove(
                    "show"
                );

            },

            2500

        );

}


/* =========================================================
   MODAL BACKDROP CLICK
========================================================= */

window.addEventListener(
    "click",
    event => {

        if (

            event.target.classList.contains(
                "modal-overlay"
            )

        ) {

            const modal =
                event.target;


            if (
                modal.id ===
                "alarmModal"
            ) {

                return;

            }


            modal.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            !document.hidden
        ) {

            checkAlarms();

        }

    }
);


/* =========================================================
   BEFORE UNLOAD
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        stopAlarmSound();

    }
);


/* =========================================================
   EXPOSE FUNCTIONS
========================================================= */

window.openEventModal =
    openEventModal;


window.editEvent =
    editEvent;


window.closeEventModal =
    closeEventModal;


window.previousMonth =
    previousMonth;


window.nextMonth =
    nextMonth;


window.goToday =
    goToday;


window.showEventDetails =
    showEventDetails;


window.deleteCurrentEvent =
    deleteCurrentEvent;


window.testAlarm =
    testAlarm;


window.dismissAlarm =
    dismissAlarm;


window.snoozeAlarm =
    snoozeAlarm;


/* =========================================================
   EXPOSE BANGLA DATE FUNCTIONS
========================================================= */

window.getBanglaDate =
    getBanglaDate;


window.formatBanglaDate =
    formatBanglaDate;


window.formatBanglaShortDate =
    formatBanglaShortDate;


window.formatBanglaMonthYear =
    formatBanglaMonthYear;

/* =========================================================
   PAST EVENT BUTTONS
========================================================= */

const selectAllPastEvents =
    document.getElementById(
        "selectAllPastEvents"
    );


if (selectAllPastEvents) {

    selectAllPastEvents.addEventListener(
        "click",
        toggleSelectAllPastEvents
    );

}


const deleteSelectedPastEventsBtn =
    document.getElementById(
        "deleteSelectedPastEvents"
    );


if (deleteSelectedPastEventsBtn) {

    deleteSelectedPastEventsBtn.addEventListener(
        "click",
        deleteSelectedPastEvents
    );

}


/* =========================================================
   ✅ EXPOSE toggleLanguage GLOBALLY
   যাতে Study Analytics JS থেকে কল করা যায়
========================================================= */

window.toggleLanguage = toggleLanguage;


/* =========================================================
   MOBILE 3-PAGE NAVIGATION SYSTEM
   Home / Study / Me page switcher
========================================================= */

(function initMobilePageNav() {

    const bottomNav = document.getElementById('mobileBottomNav');
    if (!bottomNav) return;

    const navButtons = bottomNav.querySelectorAll('.mobile-nav-btn');
    const STORAGE_KEY = 'campusCalendarCurrentPage';

    function setActivePage(pageName) {
        document.body.setAttribute('data-current-page', pageName);

        navButtons.forEach(function(btn) {
            if (btn.dataset.page === pageName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        try {
            localStorage.setItem(STORAGE_KEY, pageName);
        } catch (e) {}

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var pageName = btn.dataset.page;
            if (pageName) {
                setActivePage(pageName);
            }
        });
    });

    var lastPage = 'home';
    try {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved && ['home', 'study', 'me'].indexOf(saved) !== -1) {
            lastPage = saved;
        }
    } catch (e) {}

    setActivePage(lastPage);

    console.log('Mobile page nav initialized. Current page:', lastPage);

})();

/* =========================================================
   ✅ ADDED: PAGE SWITCHING CSS INJECTOR
   CSS এ data-page নিয়ম না থাকলে এটা inject করবে
========================================================= */

(function injectPageSwitchingCSS() {

    // চেক করুন CSS আগে থেকে inject হয়েছে কিনা
    if (document.getElementById('page-switching-style')) {
        return;
    }

    var style = document.createElement('style');
    style.id = 'page-switching-style';
    style.textContent = `
        /* ১. প্রথমে সব data-page এলিমেন্ট লুকান */
        body[data-current-page] [data-page] {
            display: none !important;
        }

        /* ২. Home page — শুধু home elements দেখান */
        body[data-current-page="home"] [data-page="home"] {
            display: block !important;
        }

        body[data-current-page="home"] .dashboard[data-page="home"] {
            display: grid !important;
        }

        body[data-current-page="home"] .toolbar[data-page="home"] {
            display: flex !important;
        }

        /* ৩. Study page — শুধু study elements দেখান */
        body[data-current-page="study"] [data-page="study"] {
            display: block !important;
        }

        body[data-current-page="study"] .study-timer-panel[data-page="study"] {
            display: block !important;
        }

        /* ৪. Me page — শুধু me elements দেখান */
        body[data-current-page="me"] [data-page="me"] {
            display: block !important;
        }

        /* ৫. Modal গুলো সবসময় available থাকবে */
        .modal-overlay {
            display: none;
        }

        .modal-overlay.active {
            display: flex !important;
        }

        /* ৬. Layout grid সবসময় active */
        .layout {
            display: grid !important;
        }

        /* ৭. Sidebar flex সবসময় active */
        .sidebar {
            display: flex !important;
            flex-direction: column !important;
        }

        @media (max-width: 768px) {
            .layout {
                display: flex !important;
                flex-direction: column !important;
            }
        }
    `;

    document.head.appendChild(style);

    console.log('✅ Page switching CSS injected');

})();
