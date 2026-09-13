// =========================================================
// STUDY TASK MODULE - FINAL FIXED VERSION (NO REFRESH)
// WITH RGB COLORS IN REPORTS (VISUAL ONLY - NO RGB TEXT)
// Campus Calendar
// English + বাংলা
// Offline / Capacitor
// =========================================================

// =========================================================
// STORAGE KEYS
// =========================================================

const STUDY_TASK_STORAGE_KEY = "campusCalendarStudyTasks";
const STUDY_HISTORY_STORAGE_KEY = "campusCalendarStudyHistory";

// =========================================================
// TRANSLATION - COMPLETE WITH TARGET STUDY TIME
// =========================================================

const STUDY_TASK_TEXT = {
    title: {
        en: "Study Tasks",
        bn: "স্টাডি টাস্ক"
    },
    add: {
        en: "+ Add",
        bn: "+ যোগ করুন"
    },
    addTask: {
        en: "Add Study Task",
        bn: "স্টাডি টাস্ক যোগ করুন"
    },
    taskTitle: {
        en: "Task Title",
        bn: "টাস্কের নাম"
    },
    subject: {
        en: "Subject",
        bn: "বিষয়"
    },
    startDate: {
        en: "Start Date",
        bn: "শুরুর তারিখ"
    },
    deadline: {
        en: "Deadline",
        bn: "শেষ তারিখ"
    },
    priority: {
        en: "Priority",
        bn: "অগ্রাধিকার"
    },
    low: {
        en: "Low",
        bn: "কম"
    },
    medium: {
        en: "Medium",
        bn: "মাঝারি"
    },
    high: {
        en: "High",
        bn: "বেশি"
    },
    progress: {
        en: "Progress",
        bn: "অগ্রগতি"
    },
    overallProgress: {
        en: "Overall Progress",
        bn: "সামগ্রিক অগ্রগতি"
    },
    notes: {
        en: "Notes",
        bn: "নোট"
    },
    save: {
        en: "Save Task",
        bn: "টাস্ক সংরক্ষণ করুন"
    },
    edit: {
        en: "Edit",
        bn: "এডিট"
    },
    delete: {
        en: "Delete",
        bn: "মুছে ফেলুন"
    },
    cancel: {
        en: "Cancel",
        bn: "বাতিল"
    },
    notStarted: {
        en: "Not Started",
        bn: "শুরু হয়নি"
    },
    inProgress: {
        en: "In Progress",
        bn: "চলমান"
    },
    completed: {
        en: "Completed",
        bn: "সম্পন্ন"
    },
    noTasks: {
        en: "No study tasks yet.",
        bn: "এখনো কোনো স্টাডি টাস্ক নেই।"
    },
    overdue: {
        en: "Overdue",
        bn: "সময় শেষ"
    },
    dueToday: {
        en: "Due Today",
        bn: "আজ শেষ হবে"
    },
    confirmDelete: {
        en: "Delete this study task?",
        bn: "এই স্টাডি টাস্কটি মুছে ফেলবেন?"
    },
    taskSaved: {
        en: "Study task saved.",
        bn: "স্টাডি টাস্ক সংরক্ষণ করা হয়েছে।"
    },
    taskDeleted: {
        en: "Study task deleted.",
        bn: "স্টাডি টাস্ক মুছে ফেলা হয়েছে।"
    },
    taskUpdated: {
        en: "Study task updated.",
        bn: "স্টাডি টাস্ক আপডেট করা হয়েছে।"
    },
    titlePlaceholder: {
        en: "Complete Data Structure chapter",
        bn: "ডাটা স্ট্রাকচারের অধ্যায় সম্পন্ন করুন"
    },
    subjectPlaceholder: {
        en: "Data Structure",
        bn: "ডাটা স্ট্রাকচার"
    },
    notesPlaceholder: {
        en: "Study notes...",
        bn: "স্টাডি নোট..."
    },
    invalidDate: {
        en: "Deadline cannot be before Start Date.",
        bn: "শেষ তারিখ শুরুর তারিখের আগে হতে পারবে না।"
    },
    chartTitle: {
        en: "Study Task Progress",
        bn: "স্টাডি টাস্কের অগ্রগতি"
    },
    completedLabel: {
        en: "Completed",
        bn: "সম্পন্ন"
    },
    inProgressLabel: {
        en: "In Progress",
        bn: "চলমান"
    },
    remainingLabel: {
        en: "Remaining",
        bn: "বাকি"
    },
    progressLabel: {
        en: "Complete",
        bn: "সম্পন্ন"
    },
    targetMinutes: {
        en: "Target Minutes",
        bn: "লক্ষ্যমাত্রা (মিনিট)"
    },
    targetMinutesPlaceholder: {
        en: "e.g. 60",
        bn: "যেমন: ৬০"
    },
    targetStudyTime: {
        en: "Target Study Time",
        bn: "লক্ষ্য স্টাডি সময়"
    },
    enterTargetTime: {
        en: "Enter target study time in minutes",
        bn: "মিনিটে লক্ষ্য স্টাডি সময় লিখুন"
    },
    taskCompleted: {
        en: "🎉 Task Completed!",
        bn: "🎉 টাস্ক সম্পন্ন হয়েছে!"
    },
    taskCompletedMessage: {
        en: "Congratulations! You have completed the study task: ",
        bn: "অভিনন্দন! আপনি স্টাডি টাস্ক সম্পন্ন করেছেন: "
    },
    taskCompletedNotification: {
        en: "Study Task Completed!",
        bn: "স্টাডি টাস্ক সম্পন্ন!"
    },
    previousDay: {
        en: " Previous Day",
        bn: " আগের দিন"
    },
    nextDay: {
        en: "Next Day ",
        bn: "পরের দিন "
    },
    previousWeek: {
        en: " Previous Week",
        bn: " আগের সপ্তাহ"
    },
    nextWeek: {
        en: "Next Week ",
        bn: "পরের সপ্তাহ "
    }
};

// =========================================================
// STUDY REPORT TRANSLATION
// =========================================================

const STUDY_REPORT_TEXT = {
    title: {
        en: "Study Report",
        bn: "স্টাডি রিপোর্ট"
    },
    subtitle: {
        en: "Track your daily and weekly study progress",
        bn: "দৈনিক ও সাপ্তাহিক পড়াশোনার অগ্রগতি দেখুন"
    },
    resetDaily: {
        en: "Reset Daily",
        bn: "দৈনিক রিসেট"
    },
    resetWeekly: {
        en: "Reset Weekly",
        bn: "সাপ্তাহিক রিসেট"
    },
    confirmResetDaily: {
        en: "Are you sure you want to reset today's study report?",
        bn: "আপনি কি আজকের স্টাডি রিপোর্ট রিসেট করতে চান?"
    },
    confirmResetWeekly: {
        en: "Are you sure you want to reset this week's study report?",
        bn: "আপনি কি এই সপ্তাহের স্টাডি রিপোর্ট রিসেট করতে চান?"
    },
    resetSuccess: {
        en: "Study report reset successfully.",
        bn: "স্টাডি রিপোর্ট সফলভাবে রিসেট হয়েছে।"
    },
    dailyReportTitle: {
        en: "Daily Study Report",
        bn: "দৈনিক স্টাডি রিপোর্ট"
    },
    dailyReportSubtitle: {
        en: "Today's study progress",
        bn: "আজকের পড়াশোনার অগ্রগতি"
    },
    weeklyReportTitle: {
        en: "Weekly Study Report",
        bn: "সাপ্তাহিক স্টাডি রিপোর্ট"
    },
    weeklyReportSubtitle: {
        en: "Track your weekly study progress",
        bn: "সাপ্তাহিক পড়াশোনার অগ্রগতি দেখুন"
    },
    daily: {
        en: "Daily",
        bn: "দৈনিক"
    },
    weekly: {
        en: "Weekly",
        bn: "সাপ্তাহিক"
    },
    today: {
        en: "Today",
        bn: "আজ"
    },
    thisWeek: {
        en: "This Week",
        bn: "এই সপ্তাহ"
    },
    studyTime: {
        en: "Study Time: ",
        bn: "পড়াশোনার সময়: "
    },
    completed: {
        en: "Completed: ",
        bn: "সম্পন্ন: "
    },
    sessions: {
        en: "Sessions: ",
        bn: "সেশন: "
    },
    completion: {
        en: "Completion: ",
        bn: "সম্পন্নের হার: "
    },
    dailyAverage: {
        en: "Daily Average: ",
        bn: "দৈনিক গড়: "
    },
    subjectBreakdown: {
        en: "Subject Breakdown",
        bn: "বিষয়ভিত্তিক হিসাব"
    },
    weeklyStudyTime: {
        en: "Weekly Study Time",
        bn: "সাপ্তাহিক পড়াশোনার সময়"
    },
    noStudyData: {
        en: "No study data for this period.",
        bn: "এই সময়ের কোনো পড়াশোনার তথ্য নেই।"
    },
    hours: {
        en: "h",
        bn: "ঘ"
    },
    minutes: {
        en: "m",
        bn: "মি"
    },
    previousDay: {
        en: " Previous Day",
        bn: " আগের দিন"
    },
    nextDay: {
        en: "Next Day ",
        bn: "পরের দিন "
    },
    previousWeek: {
        en: " Previous Week",
        bn: " আগের সপ্তাহ"
    },
    nextWeek: {
        en: "Next Week ",
        bn: "পরের সপ্তাহ "
    }
};

// =========================================================
// SUBJECT COLORS
// =========================================================

const STUDY_SUBJECT_COLORS = [
    "#2563eb",  // Blue
    "#16a34a",  // Green
    "#f59e0b",  // Amber
    "#dc2626",  // Red
    "#7c3aed",  // Purple
    "#0891b2",  // Cyan
    "#db2777",  // Pink
    "#ea580c",  // Orange
    "#4f46e5",  // Indigo
    "#059669",  // Emerald
    "#0f766e",  // Teal
    "#9333ea",  // Violet
    "#c026d3",  // Fuchsia
    "#0284c7",  // Light Blue
    "#65a30d",  // Lime
    "#ca8a04",  // Yellow
    "#be123c",  // Rose
    "#475569",  // Slate
    "#7c2d12",  // Brown
    "#0369a1"   // Sky
];

const studySubjectColorMap = new Map();

function normalizeStudySubjectName(subject) {
    return String(subject || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}

function getStudySubjectColor(subject) {
    const key = normalizeStudySubjectName(subject);
    if (!key) {
        return "#94a3b8";
    }
    if (studySubjectColorMap.has(key)) {
        return studySubjectColorMap.get(key);
    }
    const index = studySubjectColorMap.size % STUDY_SUBJECT_COLORS.length;
    const color = STUDY_SUBJECT_COLORS[index];
    studySubjectColorMap.set(key, color);
    return color;
}

// =========================================================
// HEX TO RGB CONVERTER
// =========================================================

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hexToRgbString(hex, alpha = 1) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    if (alpha >= 1) {
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

// =========================================================
// STATE
// =========================================================

let studyTasks = [];
let studyHistory = [];
let currentReportTab = "daily";
let reportDailyDate = null;
let reportWeekOffset = 0;
let lastStudyTaskLanguage = null;
let studyTaskInitialized = false;

// =========================================================
// LANGUAGE DETECTION - IMPROVED
// =========================================================

function getStudyTaskLanguage() {
    console.log("🔍 Detecting language...");

    try {
        if (typeof currentLanguage !== 'undefined' && currentLanguage) {
            const value = String(currentLanguage).trim().toLowerCase();
            console.log("  📍 currentLanguage:", value);
            if (value === "bn" || value === "bangla" || value === "bengali" || value.startsWith("bn-")) {
                return "bn";
            }
            if (value === "en" || value === "english" || value.startsWith("en-")) {
                return "en";
            }
        }
    } catch (error) {}

    try {
        if (typeof state !== "undefined" && state && state.language) {
            const value = String(state.language).trim().toLowerCase();
            console.log("  📍 state.language:", value);
            if (value === "bn" || value === "bangla" || value === "bengali" || value.startsWith("bn-")) {
                return "bn";
            }
            if (value === "en" || value === "english" || value.startsWith("en-")) {
                return "en";
            }
        }
    } catch (error) {}

    try {
        const html = document.documentElement;
        const values = [
            html.getAttribute("data-language"),
            html.getAttribute("data-lang"),
            html.getAttribute("lang")
        ];
        for (const value of values) {
            if (!value) continue;
            const lang = String(value).trim().toLowerCase();
            console.log("  📍 HTML attr:", value);
            if (lang === "bn" || lang === "bangla" || lang === "bengali" || lang.startsWith("bn-")) {
                return "bn";
            }
            if (lang === "en" || lang === "english" || lang.startsWith("en-")) {
                return "en";
            }
        }
    } catch (error) {}

    try {
        const keys = [
            "bdStudentCalendarLanguage",
            "campusCalendarLanguage",
            "campusCalendarLang",
            "language",
            "currentLanguage",
            "currentLang",
            "studyAnalyticsLanguage"
        ];
        for (const key of keys) {
            const value = localStorage.getItem(key);
            if (!value) continue;
            const lang = String(value).trim().toLowerCase();
            console.log("  📍 localStorage[" + key + "]:", value);
            if (lang === "bn" || lang === "bangla" || lang === "bengali" || lang.startsWith("bn-")) {
                return "bn";
            }
            if (lang === "en" || lang === "english" || lang.startsWith("en-")) {
                return "en";
            }
        }
    } catch (error) {}

    console.log("  📍 Default: en");
    return "en";
}

// =========================================================
// TEXT GETTERS
// =========================================================

function getStudyTaskText(key) {
    const language = getStudyTaskLanguage();
    if (STUDY_TASK_TEXT[key] && STUDY_TASK_TEXT[key][language]) {
        return STUDY_TASK_TEXT[key][language];
    }
    return STUDY_TASK_TEXT[key]?.en || "";
}

function getStudyReportText(key) {
    const language = getStudyTaskLanguage();
    const item = STUDY_REPORT_TEXT[key];
    if (!item) return "";
    return item[language] || item.en || "";
}

// =========================================================
// DATE HELPERS
// =========================================================

function getStudyReportDateString(date) {
    const d = new Date(date);
    return (
        `${d.getFullYear()}-` +
        `${String(d.getMonth() + 1).padStart(2, "0")}-` +
        `${String(d.getDate()).padStart(2, "0")}`
    );
}

function getStudyTaskTodayString() {
    return getStudyReportDateString(new Date());
}

function formatStudyTaskDate(dateString) {
    if (!dateString) return "";
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
        return dateString;
    }
    const language = getStudyTaskLanguage();
    try {
        return date.toLocaleDateString(
            language === "bn" ? "bn-BD" : "en-GB",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    } catch (error) {
        return dateString;
    }
}

function formatStudyReportDate(dateString) {
    if (!dateString) return "";
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
        return dateString;
    }
    const language = getStudyTaskLanguage();
    return date.toLocaleDateString(
        language === "bn" ? "bn-BD" : "en-GB",
        {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}

// =========================================================
// ID GENERATOR
// =========================================================

function generateId() {
    return (
        Date.now().toString() +
        "-" +
        Math.random().toString(36).substring(2, 11)
    );
}

// =========================================================
// STUDY TASK LOAD / SAVE
// =========================================================

function loadStudyTasks() {
    try {
        const saved = localStorage.getItem(STUDY_TASK_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            studyTasks = Array.isArray(parsed) ? parsed.filter(task => task && typeof task === "object") : [];
        } else {
            studyTasks = [];
        }
    } catch (error) {
        console.error("Failed to load study tasks:", error);
        studyTasks = [];
    }
    return studyTasks;
}

function saveStudyTasks() {
    try {
        localStorage.setItem(STUDY_TASK_STORAGE_KEY, JSON.stringify(studyTasks));
        return true;
    } catch (error) {
        console.error("Failed to save study tasks:", error);
        return false;
    }
}

// =========================================================
// STUDY HISTORY LOAD / SAVE
// =========================================================

function loadStudyHistory() {
    try {
        const saved = localStorage.getItem(STUDY_HISTORY_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            studyHistory = Array.isArray(parsed) ? parsed.filter(item => item && typeof item === "object") : [];
        } else {
            studyHistory = [];
        }
    } catch (error) {
        console.error("Failed to load study history:", error);
        studyHistory = [];
    }
    return studyHistory;
}

function saveStudyHistory() {
    try {
        localStorage.setItem(STUDY_HISTORY_STORAGE_KEY, JSON.stringify(studyHistory));
        return true;
    } catch (error) {
        console.error("Failed to save study history:", error);
        return false;
    }
}

// =========================================================
// NORMALIZE EXISTING DATA
// =========================================================

function normalizeStudyTaskData() {
    let changed = false;
    studyTasks = studyTasks.map(task => {
        const normalized = { ...task };
        const oldTarget = Number(task.targetMinutes);
        if (!Number.isFinite(oldTarget) || oldTarget <= 0) {
            normalized.targetMinutes = 60;
            changed = true;
        } else {
            normalized.targetMinutes = Math.max(1, Math.round(oldTarget));
        }
        normalized.progress = normalizeStudyTaskProgress(task.progress);
        normalized.studyTime = Math.max(0, Math.round(Number(task.studyTime) || 0));
        normalized.completed = normalized.progress >= 100;
        if (normalized.progress >= 100) {
            normalized.progress = 100;
        }
        return normalized;
    });
    if (changed) {
        saveStudyTasks();
    }
}

// =========================================================
// MIGRATE STUDY HISTORY SUBJECTS - FIX FOR EDIT ISSUE
// Study History তে পুরনো subject name গুলো update করে
// =========================================================

function migrateStudyHistorySubjects() {
    if (!Array.isArray(studyTasks) || studyTasks.length === 0) {
        return;
    }
    if (!Array.isArray(studyHistory) || studyHistory.length === 0) {
        return;
    }
    
    // Build task lookup: taskId → current subject name
    const taskSubjectMap = new Map();
    studyTasks.forEach(task => {
        const taskId = String(task.id || "");
        if (!taskId) return;
        const currentSubject = String(task.subject || "")
            .trim()
            .replace(/\s+/g, " ");
        taskSubjectMap.set(taskId, currentSubject);
    });
    
    let updatedCount = 0;
    
    // Update each session's subject to match its task's current subject
    studyHistory = studyHistory.map(session => {
        const taskId = String(session.taskId || "");
        if (!taskId) return session;
        
        const currentSubject = taskSubjectMap.get(taskId);
        if (currentSubject === undefined) return session;
        
        const sessionSubject = String(session.subject || "")
            .trim()
            .replace(/\s+/g, " ");
        
        // If subject changed, update it
        if (sessionSubject !== currentSubject) {
            updatedCount++;
            return {
                ...session,
                subject: currentSubject || "Other",
                updatedAt: new Date().toISOString()
            };
        }
        
        return session;
    });
    
    if (updatedCount > 0) {
        saveStudyHistory();
        console.log(`✅ Migrated ${updatedCount} study sessions with updated subject names`);
    }
}
/// =========================================================
// HANDLE FORM SUBMIT
// =========================================================

function handleStudyTaskSubmit(event) {
    event.preventDefault();
    const id = document.getElementById("studyTaskId");
    const title = document.getElementById("studyTaskTitle");
    const subject = document.getElementById("studyTaskSubject");
    const date = document.getElementById("studyTaskDate");
    const deadline = document.getElementById("studyTaskDeadline");
    const priority = document.getElementById("studyTaskPriority");
    const progress = document.getElementById("studyTaskProgress");
    const notes = document.getElementById("studyTaskNotes");
    const targetMinutes = document.getElementById("studyTaskTargetMinutes");
    if (!title || !deadline) {
        return;
    }
    const titleValue = title.value.trim();
    const subjectValue = subject ? subject.value.trim().replace(/\s+/g, " ") : "";
    const startDate = date ? date.value : "";
    const deadlineValue = deadline.value;
    const priorityValue = priority && ["low", "medium", "high"].includes(priority.value) ? priority.value : "medium";
    const progressValue = progress ? normalizeStudyTaskProgress(progress.value) : 0;
    const notesValue = notes ? notes.value.trim() : "";
    const targetMinutesValue = Math.max(1, Math.round(Number(targetMinutes ? targetMinutes.value : 60) || 60));
    if (!titleValue) {
        title.focus();
        return;
    }
    if (!deadlineValue) {
        deadline.focus();
        return;
    }
    if (startDate && deadlineValue < startDate) {
        alert(getStudyTaskText("invalidDate"));
        return;
    }
    const existingId = id ? id.value : "";
    const now = new Date().toISOString();
    let isUpdate = false;
    if (existingId) {
        const index = studyTasks.findIndex(task => String(task.id) === String(existingId));
        if (index !== -1) {
            isUpdate = true;
            const task = studyTasks[index];
            const wasCompleted = Number(task.progress) >= 100;
            const isNowCompleted = progressValue >= 100;
            studyTasks[index] = {
                ...task,
                title: titleValue,
                subject: subjectValue,
                startDate: startDate,
                deadline: deadlineValue,
                priority: priorityValue,
                progress: progressValue,
                notes: notesValue,
                targetMinutes: targetMinutesValue,
                completed: isNowCompleted,
                updatedAt: now
            };
            if (!wasCompleted && isNowCompleted) {
                studyTasks[index].completed = true;
            }
        }
    }
    if (!isUpdate) {
        const newTask = {
            id: generateId(),
            title: titleValue,
            subject: subjectValue,
            startDate: startDate,
            deadline: deadlineValue,
            priority: priorityValue,
            progress: progressValue,
            notes: notesValue,
            targetMinutes: targetMinutesValue,
            studyTime: 0,
            createdAt: now,
            updatedAt: now,
            completed: progressValue >= 100
        };
        studyTasks.push(newTask);
    }
    saveStudyTasks();
    
    // ✅ ADD THIS LINE: Migrate history when subject changes
    migrateStudyHistorySubjects();
    
    renderStudyTasks();
    updateStudyTaskPieChart();
    closeStudyTaskModal();
    if (typeof showToast === "function") {
        showToast(isUpdate ? getStudyTaskText("taskUpdated") : getStudyTaskText("taskSaved"));
    }
}
// =========================================================
// ADD STUDY SESSION
// =========================================================

function addStudySession({
    taskId = "",
    subject = "",
    date = null,
    duration = 0,
    completed = false
} = {}) {
    const sessionDate = date || getStudyReportDateString(new Date());
    const safeDuration = Math.max(0, Math.round(Number(duration) || 0));
    const session = {
        id: generateId(),
        taskId: String(taskId || ""),
        subject: String(subject || "").trim() || "Other",
        date: sessionDate,
        duration: safeDuration,
        completed: Boolean(completed),
        createdAt: new Date().toISOString()
    };
    studyHistory.push(session);
    saveStudyHistory();
    return session;
}

// =========================================================
// DELETE STUDY SESSION
// =========================================================

function deleteStudySession(id) {
    studyHistory = studyHistory.filter(item => String(item.id) !== String(id));
    saveStudyHistory();
    renderStudyReports();
}

// =========================================================
// REMOVE OLD DUPLICATE TIMER SESSIONS
// =========================================================

function cleanupDuplicateStudyHistory() {
    if (!Array.isArray(studyHistory)) {
        studyHistory = [];
        return;
    }
    const result = [];
    const seen = new Set();
    const sorted = [...studyHistory].sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
    sorted.forEach(session => {
        const key = [
            String(session.taskId || ""),
            String(session.date || ""),
            Number(session.duration) || 0,
            String(session.subject || "").trim().toLowerCase()
        ].join("|");
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        result.push(session);
    });
    if (result.length !== studyHistory.length) {
        studyHistory = result;
        saveStudyHistory();
        console.log("Duplicate study history cleaned.");
    }
}

// =========================================================
// PROGRESS HELPERS
// =========================================================

function normalizeStudyTaskProgress(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
        return 0;
    }
    return Math.max(0, Math.min(100, Math.round(number)));
}

function getStudyTaskStatus(progress) {
    const value = normalizeStudyTaskProgress(progress);
    if (value >= 100) {
        return "completed";
    }
    if (value > 0) {
        return "in-progress";
    }
    return "not-started";
}

function getStudyTaskStatusText(status) {
    if (status === "completed") {
        return getStudyTaskText("completed");
    }
    if (status === "in-progress") {
        return getStudyTaskText("inProgress");
    }
    return getStudyTaskText("notStarted");
}

function getStudyTaskDeadlineStatus(deadline) {
    if (!deadline) return "";
    const today = getStudyTaskTodayString();
    if (deadline < today) {
        return "overdue";
    }
    if (deadline === today) {
        return "today";
    }
    return "";
}

// =========================================================
// GET TASK STUDIED MINUTES
// =========================================================

function getTaskStudiedMinutes(taskId) {
    return studyHistory
        .filter(session => String(session.taskId) === String(taskId))
        .reduce((sum, session) => sum + Math.max(0, Number(session.duration) || 0), 0);
}

// =========================================================
// GET DAILY REPORT
// =========================================================

function getDailyStudyReport(dateString) {
    const sessions = studyHistory.filter(session => session.date === dateString);
    const totalMinutes = sessions.reduce((sum, session) => sum + Math.max(0, Number(session.duration) || 0), 0);
    const completedSessions = sessions.filter(session => session.completed === true).length;
    const subjectMap = new Map();
    sessions.forEach(session => {
        const subject = String(session.subject || "Other").trim();
        if (!subjectMap.has(subject)) {
            subjectMap.set(subject, {
                subject,
                minutes: 0,
                sessions: 0
            });
        }
        const item = subjectMap.get(subject);
        item.minutes += Math.max(0, Number(session.duration) || 0);
        item.sessions += 1;
    });
    return {
        sessions,
        totalMinutes,
        completedSessions,
        sessionCount: sessions.length,
        completion: sessions.length ? Math.round((completedSessions / sessions.length) * 100) : 0,
        subjects: Array.from(subjectMap.values()).sort((a, b) => b.minutes - a.minutes)
    };
}

// =========================================================
// WEEK START
// =========================================================

function getStudyReportWeekStart(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const difference = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + difference);
    return d;
}

// =========================================================
// GET WEEKLY REPORT
// =========================================================

function getWeeklyStudyReport(offset = 0) {
    const now = new Date();
    const weekStart = getStudyReportWeekStart(now);
    weekStart.setDate(weekStart.getDate() + offset * 7);
    const days = [];
    let totalMinutes = 0;
    let totalSessions = 0;
    let completedSessions = 0;
    const subjectMap = new Map();
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        const dateString = getStudyReportDateString(date);
        const daily = getDailyStudyReport(dateString);
        totalMinutes += daily.totalMinutes;
        totalSessions += daily.sessionCount;
        completedSessions += daily.completedSessions;
        daily.subjects.forEach(item => {
            if (!subjectMap.has(item.subject)) {
                subjectMap.set(item.subject, {
                    subject: item.subject,
                    minutes: 0,
                    sessions: 0
                });
            }
            const subject = subjectMap.get(item.subject);
            subject.minutes += item.minutes;
            subject.sessions += item.sessions;
        });
        days.push({
            date: dateString,
            minutes: daily.totalMinutes,
            sessions: daily.sessionCount
        });
    }
    return {
        start: getStudyReportDateString(weekStart),
        end: days[6].date,
        days,
        totalMinutes,
        totalSessions,
        completedSessions,
        completion: totalSessions ? Math.round((completedSessions / totalSessions) * 100) : 0,
        averageMinutes: Math.round(totalMinutes / 7),
        subjects: Array.from(subjectMap.values()).sort((a, b) => b.minutes - a.minutes)
    };
}

// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(value) {
    if (value === null || value === undefined) {
        return "";
    }
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// =========================================================
// RENDER STUDY TASKS - WITHOUT EMOJIS ON BUTTONS
// =========================================================

function renderStudyTasks() {
    const container = document.getElementById("studyTasks");
    if (!container) return;
    if (studyTasks.length === 0) {
        container.innerHTML =
            `<p class="empty-state">
                ${escapeHTML(getStudyTaskText("noTasks"))}
            </p>`;
        updateStudyTaskProgress();
        return;
    }
    const sortedTasks = [...studyTasks].sort((a, b) => {
        const dateA = a.deadline || "9999-12-31";
        const dateB = b.deadline || "9999-12-31";
        const dateCompare = dateA.localeCompare(dateB);
        if (dateCompare !== 0) {
            return dateCompare;
        }
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
    });
    container.innerHTML = sortedTasks.map(task => {
        const progress = normalizeStudyTaskProgress(task.progress);
        const status = getStudyTaskStatus(progress);
        const deadlineStatus = getStudyTaskDeadlineStatus(task.deadline);
        const priority = ["low", "medium", "high"].includes(task.priority) ? task.priority : "medium";
        const subjectColor = getStudySubjectColor(task.subject);
        const targetMinutes = Math.max(1, Number(task.targetMinutes) || 60);
        const historyMinutes = getTaskStudiedMinutes(task.id);
        const progressMinutes = Math.round((progress / 100) * targetMinutes);
        const actualMinutes = Math.max(historyMinutes, progressMinutes);
        const remainingMinutes = Math.max(0, targetMinutes - actualMinutes);
        
        return `
            <article
                class="study-task-item ${status === "completed" ? "completed" : ""}"
                data-task-id="${escapeHTML(task.id)}"
                style="--study-subject-color:${subjectColor};"
            >
                <div class="study-task-top">
                    <div>
                        <h4 class="study-task-title">
                            ${escapeHTML(task.title)}
                        </h4>
                        ${task.subject ? `
                        <div class="study-task-subject" style="color:${subjectColor};">
                            <span class="study-subject-dot" style="background:${subjectColor};"></span>
                            ${escapeHTML(task.subject)}
                        </div>
                        ` : ""}
                        <div class="study-task-target">
                            🎯 ${escapeHTML(getStudyTaskText("targetMinutes"))}: ${escapeHTML(targetMinutes)} ${escapeHTML(getStudyReportText("minutes"))}
                        </div>
                        ${actualMinutes > 0 ? `
                        <div class="study-task-actual">
                            ⏱ ${getStudyTaskLanguage() === "bn" ? "পড়াশোনা হয়েছে" : "Studied"}: ${actualMinutes} ${escapeHTML(getStudyReportText("minutes"))}
                        </div>
                        ` : ""}
                        ${remainingMinutes > 0 && progress < 100 ? `
                        <div class="study-task-remaining">
                            ⏳ ${getStudyTaskLanguage() === "bn" ? "বাকি" : "Remaining"}: ${remainingMinutes} ${escapeHTML(getStudyReportText("minutes"))}
                        </div>
                        ` : ""}
                    </div>
                    <span class="study-task-priority ${priority}">
                        ${escapeHTML(getStudyTaskText(priority))}
                    </span>
                </div>
                ${task.startDate ? `
                <div class="study-task-start-date">
                    ▶️ ${escapeHTML(getStudyTaskText("startDate"))}: ${escapeHTML(formatStudyTaskDate(task.startDate))}
                </div>
                ` : ""}
                ${task.deadline ? `
                <div class="study-task-deadline ${deadlineStatus === "overdue" ? "overdue" : ""} ${deadlineStatus === "today" ? "today" : ""}">
                    📅 ${escapeHTML(getStudyTaskText("deadline"))}: ${escapeHTML(formatStudyTaskDate(task.deadline))}
                </div>
                ` : ""}
                <div class="study-task-progress">
                    <div class="study-task-progress-info">
                        <span>${escapeHTML(getStudyTaskText("progress"))}</span>
                        <strong>${progress}%</strong>
                    </div>
                    <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
                        <div class="progress-fill" style="width:${progress}%;background:${subjectColor};"></div>
                    </div>
                </div>
                <span class="study-task-status ${status}">
                    ${escapeHTML(getStudyTaskStatusText(status))}
                </span>
                ${task.notes ? `
                <div class="study-task-notes">
                    📝 ${escapeHTML(task.notes)}
                </div>
                ` : ""}
                <div class="study-task-actions">
                    <button type="button" class="study-task-action-btn" data-action="edit" data-id="${escapeHTML(task.id)}">
                        ${escapeHTML(getStudyTaskText("edit"))}
                    </button>
                    <button type="button" class="study-task-action-btn delete" data-action="delete" data-id="${escapeHTML(task.id)}">
                        ${escapeHTML(getStudyTaskText("delete"))}
                    </button>
                    <button type="button" class="study-start-btn" data-study-start-id="${escapeHTML(task.id)}">
                        ${getStudyTaskLanguage() === "bn" ? "পড়াশোনা শুরু করুন" : "Start Study"}
                    </button>
                </div>
            </article>
        `;
    }).join("");
    updateStudyTaskProgress();
}

// =========================================================
// UPDATE OVERALL TASK PROGRESS
// =========================================================

function updateStudyTaskProgress() {
    const progressPercent = document.getElementById("studyProgressPercent");
    const progressBar = document.getElementById("studyProgressBar");
    if (studyTasks.length === 0) {
        if (progressPercent) {
            progressPercent.textContent = "0%";
        }
        if (progressBar) {
            progressBar.style.width = "0%";
            progressBar.className = "progress-fill";
            progressBar.setAttribute("aria-valuenow", "0");
        }
        updateStudyTaskPieChart();
        return;
    }
    const total = studyTasks.reduce((sum, task) => sum + normalizeStudyTaskProgress(task.progress), 0);
    const average = Math.round(total / studyTasks.length);
    if (progressPercent) {
        progressPercent.textContent = `${average}%`;
    }
    if (progressBar) {
        progressBar.style.width = `${average}%`;
        progressBar.className = "progress-fill";
        if (average >= 100) {
            progressBar.classList.add("complete");
        } else if (average >= 60) {
            progressBar.classList.add("high");
        } else if (average >= 30) {
            progressBar.classList.add("medium");
        } else if (average > 0) {
            progressBar.classList.add("low");
        }
        progressBar.setAttribute("aria-valuenow", String(average));
    }
    updateStudyTaskPieChart();
}

// =========================================================
// SUBJECT DATA
// =========================================================

function createStudySubjectData() {
    const subjectMap = new Map();
    studyTasks.forEach(task => {
        const subject = String(task.subject || "").trim().replace(/\s+/g, " ");
        if (!subject) return;
        const key = normalizeStudySubjectName(subject);
        if (!key) return;
        if (!subjectMap.has(key)) {
            subjectMap.set(key, {
                subject,
                taskCount: 0,
                totalProgress: 0,
                color: getStudySubjectColor(subject)
            });
        }
        const item = subjectMap.get(key);
        item.taskCount += 1;
        item.totalProgress += normalizeStudyTaskProgress(task.progress);
    });
    const data = Array.from(subjectMap.values());
    const totalTasks = data.reduce((sum, item) => sum + item.taskCount, 0);
    if (totalTasks === 0) {
        return [];
    }
    return data.map(item => ({
        subject: item.subject,
        taskCount: item.taskCount,
        totalProgress: item.totalProgress,
        percentage: (item.taskCount / totalTasks) * 100,
        averageProgress: Math.round(item.totalProgress / item.taskCount),
        color: item.color
    }));
}

// =========================================================
// PIE CHART
// =========================================================

function updateStudyTaskPieChart() {
    const pie = document.getElementById("studyProgressPie");
    const piePercent = document.getElementById("studyPiePercent");
    const pieLabel = document.getElementById("studyPieLabel");
    if (!pie) return;
    pie.style.width = "180px";
    pie.style.height = "180px";
    pie.style.borderRadius = "50%";
    pie.style.boxShadow = "0 4px 24px rgba(99, 102, 241, 0.2)";
    pie.style.transition = "background 0.3s ease";
    pie.style.margin = "0 auto";
    if (studyTasks.length === 0) {
        pie.style.background = "conic-gradient(#e5e7eb 0deg 360deg)";
        if (piePercent) {
            piePercent.textContent = "0%";
        }
        if (pieLabel) {
            pieLabel.textContent = getStudyTaskText("progressLabel");
        }
        return;
    }
    const totalProgress = studyTasks.reduce((sum, task) => sum + normalizeStudyTaskProgress(task.progress), 0);
    const averageProgress = Math.round(totalProgress / studyTasks.length);
    const completedDegree = averageProgress * 3.6;
    let background;
    if (averageProgress <= 0) {
        background = "conic-gradient(#e5e7eb 0deg 360deg)";
    } else if (averageProgress >= 100) {
        background = "conic-gradient(#22c55e 0deg 360deg)";
    } else {
        background = `conic-gradient(#22c55e 0deg ${completedDegree}deg, #e5e7eb ${completedDegree}deg 360deg)`;
    }
    pie.style.background = background;
    if (piePercent) {
        piePercent.textContent = `${averageProgress}%`;
    }
    if (pieLabel) {
        pieLabel.textContent = getStudyTaskText("progressLabel");
    }
}

// =========================================================
// MODAL
// =========================================================

function openStudyTaskModal(task = null) {
    const modal = document.getElementById("studyTaskModal");
    if (!modal) return;
    const form = document.getElementById("studyTaskForm");
    if (form) {
        form.reset();
    }
    const title = document.getElementById("studyTaskModalTitle");
    const id = document.getElementById("studyTaskId");
    const taskTitle = document.getElementById("studyTaskTitle");
    const subject = document.getElementById("studyTaskSubject");
    const date = document.getElementById("studyTaskDate");
    const deadline = document.getElementById("studyTaskDeadline");
    const priority = document.getElementById("studyTaskPriority");
    const progress = document.getElementById("studyTaskProgress");
    const progressValue = document.getElementById("studyTaskProgressValue");
    const notes = document.getElementById("studyTaskNotes");
    const targetMinutes = document.getElementById("studyTaskTargetMinutes");
    const deleteBtn = document.getElementById("deleteStudyTaskBtn");

    if (task) {
        if (title) {
            title.textContent = getStudyTaskText("edit");
        }
        if (id) {
            id.value = task.id || "";
        }
        if (taskTitle) {
            taskTitle.value = task.title || "";
        }
        if (subject) {
            subject.value = task.subject || "";
        }
        if (date) {
            date.value = task.startDate || "";
        }
        if (deadline) {
            deadline.value = task.deadline || "";
        }
        if (priority) {
            priority.value = task.priority || "medium";
        }
        const prog = normalizeStudyTaskProgress(task.progress);
        if (progress) {
            progress.value = prog;
        }
        if (progressValue) {
            progressValue.textContent = `${prog}%`;
        }
        if (notes) {
            notes.value = task.notes || "";
        }
        if (targetMinutes) {
            targetMinutes.value = Math.max(1, Number(task.targetMinutes) || 60);
        }
        if (deleteBtn) {
            deleteBtn.classList.remove("hidden");
        }
    } else {
        if (title) {
            title.textContent = getStudyTaskText("addTask");
        }
        if (id) {
            id.value = "";
        }
        if (priority) {
            priority.value = "medium";
        }
        if (progress) {
            progress.value = 0;
        }
        if (progressValue) {
            progressValue.textContent = "0%";
        }
        if (targetMinutes) {
            targetMinutes.value = 60;
        }
        if (deleteBtn) {
            deleteBtn.classList.add("hidden");
        }
    }
    updateStudyTaskFormLanguage();
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    if (taskTitle) {
        setTimeout(() => taskTitle.focus(), 50);
    }
}

function closeStudyTaskModal() {
    const modal = document.getElementById("studyTaskModal");
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}

function updateStudyTaskProgressValue() {
    const progress = document.getElementById("studyTaskProgress");
    const value = document.getElementById("studyTaskProgressValue");
    if (!progress || !value) {
        return;
    }
    const val = normalizeStudyTaskProgress(progress.value);
    progress.value = val;
    value.textContent = `${val}%`;
}

// =========================================================
// FORM LANGUAGE - FIXED WITH TARGET STUDY TIME
// =========================================================

function updateStudyTaskFormLanguage() {
    const labelMap = {
        studyTaskTitleLabel: "taskTitle",
        studyTaskSubjectLabel: "subject",
        studyTaskDateLabel: "startDate",
        studyTaskDeadlineLabel: "deadline",
        studyTaskPriorityLabel: "priority",
        studyTaskProgressLabel: "progress",
        studyTaskNotesLabel: "notes",
        studyTaskTargetLabel: "targetStudyTime",
    };
    Object.keys(labelMap).forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;
        const text = getStudyTaskText(labelMap[id]);
        if (text) {
            element.textContent = text;
        }
    });
    const targetHelp = document.getElementById("studyTaskTargetHelp");
    if (targetHelp) {
        targetHelp.textContent = getStudyTaskText("enterTargetTime");
    }
    const targetMinutesInput = document.getElementById("studyTaskTargetMinutes");
    if (targetMinutesInput) {
        targetMinutesInput.placeholder = getStudyTaskText("targetMinutesPlaceholder");
    }
    const taskTitle = document.getElementById("studyTaskTitle");
    const subject = document.getElementById("studyTaskSubject");
    const notes = document.getElementById("studyTaskNotes");
    if (taskTitle) {
        taskTitle.placeholder = getStudyTaskText("titlePlaceholder");
    }
    if (subject) {
        subject.placeholder = getStudyTaskText("subjectPlaceholder");
    }
    if (notes) {
        notes.placeholder = getStudyTaskText("notesPlaceholder");
    }
    const priority = document.getElementById("studyTaskPriority");
    if (priority) {
        Array.from(priority.options).forEach(option => {
            if (option.value === "low") {
                option.textContent = getStudyTaskText("low");
            } else if (option.value === "medium") {
                option.textContent = getStudyTaskText("medium");
            } else if (option.value === "high") {
                option.textContent = getStudyTaskText("high");
            }
        });
    }
    const form = document.getElementById("studyTaskForm");
    if (form) {
        const saveBtn = form.querySelector('button[type="submit"]');
        if (saveBtn) {
            saveBtn.textContent = getStudyTaskText("save");
        }
    }
    const deleteBtn = document.getElementById("deleteStudyTaskBtn");
    if (deleteBtn) {
        deleteBtn.textContent = getStudyTaskText("delete");
    }
    document.querySelectorAll('[data-close="studyTaskModal"]').forEach(btn => {
        btn.textContent = getStudyTaskText("cancel");
    });
}

// =========================================================
// HANDLE FORM SUBMIT
// =========================================================

function handleStudyTaskSubmit(event) {
    event.preventDefault();
    const id = document.getElementById("studyTaskId");
    const title = document.getElementById("studyTaskTitle");
    const subject = document.getElementById("studyTaskSubject");
    const date = document.getElementById("studyTaskDate");
    const deadline = document.getElementById("studyTaskDeadline");
    const priority = document.getElementById("studyTaskPriority");
    const progress = document.getElementById("studyTaskProgress");
    const notes = document.getElementById("studyTaskNotes");
    const targetMinutes = document.getElementById("studyTaskTargetMinutes");
    if (!title || !deadline) {
        return;
    }
    const titleValue = title.value.trim();
    const subjectValue = subject ? subject.value.trim().replace(/\s+/g, " ") : "";
    const startDate = date ? date.value : "";
    const deadlineValue = deadline.value;
    const priorityValue = priority && ["low", "medium", "high"].includes(priority.value) ? priority.value : "medium";
    const progressValue = progress ? normalizeStudyTaskProgress(progress.value) : 0;
    const notesValue = notes ? notes.value.trim() : "";
    const targetMinutesValue = Math.max(1, Math.round(Number(targetMinutes ? targetMinutes.value : 60) || 60));
    if (!titleValue) {
        title.focus();
        return;
    }
    if (!deadlineValue) {
        deadline.focus();
        return;
    }
    if (startDate && deadlineValue < startDate) {
        alert(getStudyTaskText("invalidDate"));
        return;
    }
    const existingId = id ? id.value : "";
    const now = new Date().toISOString();
    let isUpdate = false;
    if (existingId) {
        const index = studyTasks.findIndex(task => String(task.id) === String(existingId));
        if (index !== -1) {
            isUpdate = true;
            const task = studyTasks[index];
            const wasCompleted = Number(task.progress) >= 100;
            const isNowCompleted = progressValue >= 100;
            studyTasks[index] = {
                ...task,
                title: titleValue,
                subject: subjectValue,
                startDate: startDate,
                deadline: deadlineValue,
                priority: priorityValue,
                progress: progressValue,
                notes: notesValue,
                targetMinutes: targetMinutesValue,
                completed: isNowCompleted,
                updatedAt: now
            };
            if (!wasCompleted && isNowCompleted) {
                studyTasks[index].completed = true;
            }
        }
    }
    if (!isUpdate) {
        const newTask = {
            id: generateId(),
            title: titleValue,
            subject: subjectValue,
            startDate: startDate,
            deadline: deadlineValue,
            priority: priorityValue,
            progress: progressValue,
            notes: notesValue,
            targetMinutes: targetMinutesValue,
            studyTime: 0,
            createdAt: now,
            updatedAt: now,
            completed: progressValue >= 100
        };
        studyTasks.push(newTask);
    }
    saveStudyTasks();
    
    // ✅ Migrate history when subject changes
    migrateStudyHistorySubjects();
    
    renderStudyTasks();
    updateStudyTaskPieChart();
    closeStudyTaskModal();
    if (typeof showToast === "function") {
        showToast(isUpdate ? getStudyTaskText("taskUpdated") : getStudyTaskText("taskSaved"));
    }
}

// =========================================================
// EDIT TASK
// =========================================================

function editStudyTask(id) {
    const task = studyTasks.find(item => String(item.id) === String(id));
    if (task) {
        openStudyTaskModal(task);
    }
}

// =========================================================
// DELETE TASK
// =========================================================

function deleteStudyTask(id) {
    const task = studyTasks.find(item => String(item.id) === String(id));
    if (!task) return;
    if (!confirm(getStudyTaskText("confirmDelete"))) {
        return;
    }
    studyTasks = studyTasks.filter(task => String(task.id) !== String(id));
    saveStudyTasks();
    renderStudyTasks();
    updateStudyTaskPieChart();
    closeStudyTaskModal();
    if (typeof showToast === "function") {
        showToast(getStudyTaskText("taskDeleted"));
    }
}

// =========================================================
// DAILY REPORT RENDER - COMPLETE WITH SIDEBAR
// =========================================================

function renderDailyStudyReport() {
    const data = getDailyStudyReport(reportDailyDate);
    
    // Update Date
    const dateElement = document.getElementById("dailyReportDate");
    if (dateElement) {
        const today = getStudyReportDateString(new Date());
        dateElement.textContent = reportDailyDate === today ? getStudyReportText("today") : formatStudyReportDate(reportDailyDate);
    }
    
    // Update Stats
    const studyTime = document.getElementById("dailyStudyTime");
    const completed = document.getElementById("dailyCompleted");
    const sessions = document.getElementById("dailySessions");
    const completion = document.getElementById("dailyCompletion");

    if (studyTime) {
        studyTime.textContent = formatStudyReportMinutes(data.totalMinutes);
    }
    if (completed) {
        completed.textContent = String(data.completedSessions);
    }
    if (sessions) {
        sessions.textContent = String(data.sessionCount);
    }
    if (completion) {
        completion.textContent = `${data.completion}%`;
    }
    
    // Update Subject Breakdown
    renderStudySubjectBreakdown("dailySubjectBreakdown", data.subjects);
}

// =========================================================
// WEEKLY REPORT RENDER - COMPLETE WITH SIDEBAR
// =========================================================

function renderWeeklyStudyReport() {
    const data = getWeeklyStudyReport(reportWeekOffset);
    
    // Update Date
    const dateElement = document.getElementById("weeklyReportDate");
    if (dateElement) {
        dateElement.textContent = reportWeekOffset === 0 ? getStudyReportText("thisWeek") : `${formatStudyReportDate(data.start)} - ${formatStudyReportDate(data.end)}`;
    }
    
    // Update Stats
    const studyTime = document.getElementById("weeklyStudyTime");
    const average = document.getElementById("weeklyAverage");
    const completed = document.getElementById("weeklyCompleted");
    const completion = document.getElementById("weeklyCompletion");

    if (studyTime) {
        studyTime.textContent = formatStudyReportMinutes(data.totalMinutes);
    }
    if (average) {
        average.textContent = formatStudyReportMinutes(data.averageMinutes);
    }
    if (completed) {
        completed.textContent = String(data.completedSessions);
    }
    if (completion) {
        completion.textContent = `${data.completion}%`;
    }
    
    // Update Chart
    renderWeeklyStudyChart(data.days);
    
    // Update Subject Breakdown
    renderStudySubjectBreakdown("weeklySubjectBreakdown", data.subjects);
}

// =========================================================
// SUBJECT BREAKDOWN - WITH RGB COLORS (VISUAL ONLY, NO TEXT)
// =========================================================

function renderStudySubjectBreakdown(elementId, subjects) {
    const container = document.getElementById(elementId);
    if (!container) return;
    if (!subjects || subjects.length === 0) {
        container.innerHTML =
            `<div class="study-report-empty">
                ${escapeHTML(getStudyReportText("noStudyData"))}
            </div>`;
        return;
    }
    const maxMinutes = Math.max(...subjects.map(item => item.minutes), 1);
    container.innerHTML = subjects.map(item => {
        const percentage = Math.round((item.minutes / maxMinutes) * 100);
        const color = getStudySubjectColor(item.subject);
        const rgbColorLight = hexToRgbString(color, 0.2);
        const rgbColorShadow = hexToRgbString(color, 0.3);
        
        return `
            <div class="study-report-subject-row">
                <div class="study-report-subject-info">
                    <span>
                        <span class="study-report-subject-dot" style="background:${color};"></span>
                        ${escapeHTML(item.subject)}
                    </span>
                    <strong>
                        ${formatStudyReportMinutes(item.minutes)}
                    </strong>
                </div>
                <div class="study-report-subject-bar" style="background:${rgbColorLight};">
                    <div
                        class="study-report-subject-fill"
                        style="
                            width:${percentage}%;
                            background: ${color};
                            box-shadow: 0 2px 8px ${rgbColorShadow};
                        "
                    ></div>
                </div>
            </div>
        `;
    }).join("");
}

// =========================================================
// WEEKLY CHART - WITH RGB COLORS (VISUAL ONLY, NO TEXT)
// =========================================================

function renderWeeklyStudyChart(days) {
    const container = document.getElementById("weeklyStudyChart");
    if (!container) return;
    if (!days || days.length === 0) {
        container.innerHTML = "";
        return;
    }
    const maxMinutes = Math.max(...days.map(day => day.minutes), 1);
    const language = getStudyTaskLanguage();
    const dayNames = language === "bn" ? ["সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি", "রবি"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    const dayColors = [
        { hex: "#4f46e5", rgb: "79, 70, 229" },   // Monday - Indigo
        { hex: "#3b82f6", rgb: "59, 130, 246" },   // Tuesday - Blue
        { hex: "#10b981", rgb: "16, 185, 129" },   // Wednesday - Emerald
        { hex: "#f59e0b", rgb: "245, 158, 11" },   // Thursday - Amber
        { hex: "#ef4444", rgb: "239, 68, 68" },    // Friday - Red
        { hex: "#8b5cf6", rgb: "139, 92, 246" },   // Saturday - Purple
        { hex: "#ec4899", rgb: "236, 72, 153" }    // Sunday - Pink
    ];

    container.innerHTML = days.map((day, index) => {
        const height = day.minutes > 0 ? Math.max(8, (day.minutes / maxMinutes) * 100) : 3;
        const color = dayColors[index % dayColors.length];
        const rgbString = `rgb(${color.rgb})`;
        const rgbaShadow = `rgba(${color.rgb}, 0.4)`;
        const isToday = day.date === getStudyTaskTodayString();
        
        return `
            <div class="study-chart-column">
                <div class="study-chart-value">
                    ${day.minutes > 0 ? formatStudyReportMinutes(day.minutes) : "0"}
                </div>
                <div class="study-chart-bar-area">
                    <div
                        class="study-chart-bar ${isToday ? 'today' : ''}"
                        style="
                            height:${height}%;
                            background: linear-gradient(180deg, ${rgbString}, ${hexToRgbString(color.hex, 0.7)});
                            box-shadow: 0 2px 12px ${rgbaShadow};
                            border-radius: 6px 6px 0 0;
                            ${isToday ? `border: 2px solid ${rgbString};` : ''}
                        "
                        title="${dayNames[index]}: ${formatStudyReportMinutes(day.minutes)}"
                    ></div>
                </div>
                <span class="study-chart-day" style="${isToday ? 'font-weight:700;color:#1e293b;' : ''}">
                    ${dayNames[index]}
                </span>
            </div>
        `;
    }).join("");
}

// =========================================================
// FORMAT REPORT MINUTES
// =========================================================

function formatStudyReportMinutes(totalMinutes) {
    const minutes = Math.max(0, Math.round(Number(totalMinutes) || 0));
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    if (hours === 0) {
        return `${remaining}${getStudyReportText("minutes")}`;
    }
    return `${hours}${getStudyReportText("hours")} ${remaining}${getStudyReportText("minutes")}`;
}

// =========================================================
// REPORT LANGUAGE
// =========================================================

function updateStudyReportLanguage() {
    const translations = {
        resetDailyStudyReport: "resetDaily",
        resetWeeklyStudyReport: "resetWeekly",
        dailyStudyReportTitle: "dailyReportTitle",
        dailyStudyReportSubtitle: "dailyReportSubtitle",
        dailyReportTodayBtn: "today",
        dailyStudyTimeLabel: "studyTime",
        dailyCompletedLabel: "completed",
        dailySessionsLabel: "sessions",
        dailyCompletionLabel: "completion",
        dailySubjectTitle: "subjectBreakdown",
        previousReportDayText: "previousDay",
        weeklyStudyReportTitle: "weeklyReportTitle",
        weeklyStudyReportSubtitle: "weeklyReportSubtitle",
        weeklyReportTodayBtn: "thisWeek",
        weeklyStudyTimeLabel: "studyTime",
        weeklyAverageLabel: "dailyAverage",
        weeklyCompletedLabel: "completed",
        weeklyCompletionLabel: "completion",
        weeklyChartTitle: "weeklyStudyTime",
        weeklySubjectTitle: "subjectBreakdown",
        previousReportWeekText: "previousWeek",
        studyReportTitle: "title",
        studyReportSubtitle: "subtitle",
        dailyReportTab: "daily",
        weeklyReportTab: "weekly"
    };
    Object.entries(translations).forEach(([elementId, textKey]) => {
        const element = document.getElementById(elementId);
        if (!element) return;
        const text = getStudyReportText(textKey);
        if (text) {
            element.textContent = text;
        }
    });
    renderDailyStudyReport();
    renderWeeklyStudyReport();
    switchStudyReportTab(currentReportTab);
}

// =========================================================
// SWITCH REPORT TAB
// =========================================================

function switchStudyReportTab(tab) {
    currentReportTab = tab;
    document.querySelectorAll(".study-report-tab").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.reportTab === tab);
    });
    const daily = document.getElementById("dailyStudyReport");
    const weekly = document.getElementById("weeklyStudyReport");
    if (daily) {
        daily.classList.toggle("active", tab === "daily");
    }
    if (weekly) {
        weekly.classList.toggle("active", tab === "weekly");
    }
}

// =========================================================
// RENDER REPORTS
// =========================================================

function renderStudyReports() {
    updateStudyReportLanguage();
}

// =========================================================
// STUDY TIMER STATE
// =========================================================

let activeStudyTimer = null;
let studyTimerInterval = null;
let studyTimerStartedAt = null;
let studyTimerElapsed = 0;
let studyTimerPaused = false;
let currentTimerTaskId = null;
let completionNotificationShown = false;

// =========================================================
// GET TASK
// =========================================================

function getStudyTaskById(taskId) {
    return studyTasks.find(task => String(task.id) === String(taskId)) || null;
}

// =========================================================
// COMPLETION NOTIFICATION
// =========================================================

function showStudyCompletionNotification(taskTitle) {
    const title = getStudyTaskText("taskCompleted");
    const message = getStudyTaskText("taskCompletedMessage") + taskTitle;
    if (typeof showToast === "function") {
        showToast(title + " " + message, 5000);
        return;
    }
    const notificationDiv = document.createElement("div");
    notificationDiv.className = "study-completion-notification";
    notificationDiv.style.cssText = `
        position:fixed;
        top:20px;
        left:50%;
        transform:translateX(-50%);
        background:linear-gradient(135deg,#2563eb,#7c3aed);
        color:white;
        padding:16px 24px;
        border-radius:12px;
        box-shadow:0 8px 32px rgba(37,99,235,0.4);
        z-index:10000;
        max-width:90%;
        text-align:center;
        font-size:16px;
        font-weight:bold;
        border:2px solid rgba(255,255,255,0.2);
    `;
    notificationDiv.innerHTML = `
        <div style="font-size:28px;margin-bottom:8px;">🎉</div>
        <div style="font-size:20px;margin-bottom:4px;">${escapeHTML(title)}</div>
        <div style="font-size:14px;font-weight:normal;opacity:0.9;">${escapeHTML(message)}</div>
    `;
    document.body.appendChild(notificationDiv);
    setTimeout(() => {
        if (notificationDiv.parentNode) {
            notificationDiv.parentNode.removeChild(notificationDiv);
        }
    }, 5000);
}

// =========================================================
// START TIMER
// =========================================================

function startStudyTimer(task) {
    if (!task) {
        console.warn("No study task selected.");
        return;
    }
    if (studyTimerInterval) {
        clearInterval(studyTimerInterval);
        studyTimerInterval = null;
    }
    activeStudyTimer = task;
    currentTimerTaskId = task.id;
    completionNotificationShown = false;
    studyTimerStartedAt = Date.now();
    studyTimerElapsed = 0;
    studyTimerPaused = false;
    const panel = document.getElementById("studyTimerPanel");
    const title = document.getElementById("studyTimerTaskTitle");
    const subject = document.getElementById("studyTimerSubject");
    const display = document.getElementById("studyTimerDisplay");
    const pauseButton = document.getElementById("pauseStudyTimerBtn");
    const targetDisplay = document.getElementById("studyTimerTarget");
    if (title) {
        title.textContent = task.title || "Study Timer";
    }
    if (subject) {
        subject.textContent = task.subject || "";
    }
    if (display) {
        display.textContent = "00:00:00";
    }
    if (targetDisplay) {
        const targetMinutes = Math.max(1, Number(task.targetMinutes) || 60);
        const hours = String(Math.floor(targetMinutes / 60)).padStart(2, "0");
        const minutes = String(targetMinutes % 60).padStart(2, "0");
        targetDisplay.textContent = `🎯 ${hours}:${minutes}:00`;
    }
    if (pauseButton) {
        pauseButton.textContent = getStudyTaskLanguage() === "bn" ? "⏸ বিরতি" : "⏸ Pause";
    }
    if (panel) {
        panel.classList.remove("hidden");
    }
    updateStudyTimerDisplay();
    studyTimerInterval = setInterval(updateStudyTimer, 1000);
    console.log("Study timer started:", task.title);
}

// =========================================================
// UPDATE TIMER
// =========================================================

function updateStudyTimer() {
    if (!activeStudyTimer || studyTimerPaused) {
        return;
    }
    studyTimerElapsed = Date.now() - studyTimerStartedAt;
    updateStudyTimerDisplay();
}

// =========================================================
// TIMER DISPLAY
// =========================================================

function updateStudyTimerDisplay() {
    const display = document.getElementById("studyTimerDisplay");
    if (!display) return;
    const totalSeconds = Math.floor(studyTimerElapsed / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    display.textContent = `${hours}:${minutes}:${seconds}`;
    const targetMinutes = activeStudyTimer ? Math.max(1, Number(activeStudyTimer.targetMinutes) || 60) : 60;
    const progress = Math.min(100, Math.round(((studyTimerElapsed / 60000) / targetMinutes) * 100));
    const progressBar = document.getElementById("studyTimerProgress");
    const progressText = document.getElementById("studyTimerProgressText");
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute("aria-valuenow", String(progress));
    }
    if (progressText) {
        progressText.textContent = `${progress}%`;
    }
    if (progress >= 100 && !completionNotificationShown && activeStudyTimer) {
        completionNotificationShown = true;
        showStudyCompletionNotification(activeStudyTimer.title);
    }
}

// =========================================================
// PAUSE / RESUME
// =========================================================

function toggleStudyTimerPause() {
    if (!activeStudyTimer) {
        return;
    }
    const button = document.getElementById("pauseStudyTimerBtn");
    const language = getStudyTaskLanguage();
    if (!studyTimerPaused) {
        studyTimerElapsed = Date.now() - studyTimerStartedAt;
        studyTimerPaused = true;
        if (button) {
            button.textContent = language === "bn" ? "▶ চালু করুন" : "▶ Resume";
        }
        updateStudyTimerDisplay();
        return;
    }
    studyTimerStartedAt = Date.now() - studyTimerElapsed;
    studyTimerPaused = false;
    if (button) {
        button.textContent = language === "bn" ? "⏸ বিরতি" : "⏸ Pause";
    }
}

// =========================================================
// FINISH TIMER - FIXED (NO ROUNDING UP)
// =========================================================

function finishStudyTimer() {
    if (!activeStudyTimer) {
        return;
    }
    if (!studyTimerPaused) {
        studyTimerElapsed = Date.now() - studyTimerStartedAt;
    }
    
    // Calculate minutes - use Math.floor instead of Math.round to avoid rounding up
    const sessionMinutes = Math.floor(studyTimerElapsed / 60000);
    
    // If less than 1 minute, count as 0 minutes (or you can set minimum to 1 if you prefer)
    // To keep it simple and fair, we'll count only full minutes
    // If you want to count partial minutes as 1 minute minimum, uncomment the line below
    // const sessionMinutes = Math.max(1, Math.floor(studyTimerElapsed / 60000));
    
    const task = getStudyTaskById(activeStudyTimer.id);
    if (!task) {
        console.error("Active study task no longer exists.");
        cancelStudyTimer(false);
        return;
    }
    
    // Only save if at least 1 full minute was studied
    if (sessionMinutes === 0) {
        // Cancel timer without saving
        if (typeof showToast === "function") {
            const language = getStudyTaskLanguage();
            showToast(language === "bn" ? "পড়াশোনার সময় ১ মিনিটের কম, সংরক্ষণ করা হয়নি।" : "Study time less than 1 minute, not saved.");
        }
        cancelStudyTimer(false);
        return;
    }
    
    const targetMinutes = Math.max(1, Number(task.targetMinutes) || 60);
    const currentProgress = normalizeStudyTaskProgress(task.progress);
    const currentStudiedMinutes = (currentProgress / 100) * targetMinutes;
    const newStudiedMinutes = currentStudiedMinutes + sessionMinutes;
    const newProgress = Math.min(100, Math.round((newStudiedMinutes / targetMinutes) * 100));
    const taskCompleted = newProgress >= 100;
    
    const taskIndex = studyTasks.findIndex(item => String(item.id) === String(task.id));
    if (taskIndex !== -1) {
        studyTasks[taskIndex] = {
            ...studyTasks[taskIndex],
            progress: newProgress,
            completed: taskCompleted,
            studyTime: Math.max(0, Number(studyTasks[taskIndex].studyTime) || 0) + sessionMinutes,
            updatedAt: new Date().toISOString()
        };
    }
    
    addStudySession({
        taskId: task.id || "",
        subject: task.subject || "Other",
        date: getStudyReportDateString(new Date()),
        duration: sessionMinutes,
        completed: taskCompleted
    });
    
    saveStudyTasks();
    
    if (taskCompleted && !completionNotificationShown) {
        completionNotificationShown = true;
        showStudyCompletionNotification(task.title);
    }
    
    if (studyTimerInterval) {
        clearInterval(studyTimerInterval);
        studyTimerInterval = null;
    }
    
    activeStudyTimer = null;
    currentTimerTaskId = null;
    studyTimerStartedAt = null;
    studyTimerElapsed = 0;
    studyTimerPaused = false;
    
    const panel = document.getElementById("studyTimerPanel");
    if (panel) {
        panel.classList.add("hidden");
        panel.classList.remove("minimized");
    }
    
    const display = document.getElementById("studyTimerDisplay");
    if (display) {
        display.textContent = "00:00:00";
    }
    
    const progressBar = document.getElementById("studyTimerProgress");
    const progressText = document.getElementById("studyTimerProgressText");
    if (progressBar) {
        progressBar.style.width = "0%";
        progressBar.setAttribute("aria-valuenow", "0");
    }
    if (progressText) {
        progressText.textContent = "0%";
    }
    
    completionNotificationShown = false;
    renderStudyTasks();
    updateStudyTaskPieChart();
    renderStudyReports();
    
    if (typeof showToast === "function") {
        const language = getStudyTaskLanguage();
        if (taskCompleted) {
            showToast(language === "bn" ? `${sessionMinutes} মিনিট পড়াশোনা সম্পন্ন। টাস্ক ১০০% সম্পন্ন হয়েছে।` : `${sessionMinutes} minutes studied. Task completed 100%.`);
        } else {
            showToast(language === "bn" ? `${sessionMinutes} মিনিট পড়াশোনার সময় রিপোর্টে যোগ হয়েছে।` : `${sessionMinutes} minutes of study time added to the report.`);
        }
    }
    
    console.log("Study session saved:", {
        sessionMinutes,
        targetMinutes,
        newProgress,
        taskCompleted
    });
}
// =========================================================
// CANCEL TIMER
// =========================================================

function cancelStudyTimer(askConfirmation = true) {
    if (!activeStudyTimer) {
        return;
    }
    if (askConfirmation && !confirm(getStudyTaskLanguage() === "bn" ? "আপনি কি এই স্টাডি টাইমারটি বাতিল করতে চান?" : "Are you sure you want to cancel this study timer?")) {
        return;
    }
    if (studyTimerInterval) {
        clearInterval(studyTimerInterval);
        studyTimerInterval = null;
    }
    activeStudyTimer = null;
    currentTimerTaskId = null;
    studyTimerStartedAt = null;
    studyTimerElapsed = 0;
    studyTimerPaused = false;
    completionNotificationShown = false;
    const display = document.getElementById("studyTimerDisplay");
    if (display) {
        display.textContent = "00:00:00";
    }
    const progressBar = document.getElementById("studyTimerProgress");
    const progressText = document.getElementById("studyTimerProgressText");
    if (progressBar) {
        progressBar.style.width = "0%";
        progressBar.setAttribute("aria-valuenow", "0");
    }
    if (progressText) {
        progressText.textContent = "0%";
    }
    const panel = document.getElementById("studyTimerPanel");
    if (panel) {
        panel.classList.add("hidden");
        panel.classList.remove("minimized");
    }
    const minimizeBtn = document.getElementById("minimizeStudyTimer");
    if (minimizeBtn) {
        minimizeBtn.textContent = "−";
    }
    console.log("Study timer cancelled.");
}

// =========================================================
// RESET DAILY REPORT
// =========================================================

function resetDailyStudyReport() {
    if (!confirm(getStudyReportText("confirmResetDaily"))) {
        return;
    }
    const targetDate = reportDailyDate;
    studyHistory = studyHistory.filter(session => session.date !== targetDate);
    saveStudyHistory();
    renderStudyReports();
    if (typeof showToast === "function") {
        showToast(getStudyReportText("resetSuccess"));
    }
}

// =========================================================
// RESET WEEKLY REPORT
// =========================================================

function resetWeeklyStudyReport() {
    if (!confirm(getStudyReportText("confirmResetWeekly"))) {
        return;
    }
    const today = new Date();
    const weekStart = getStudyReportWeekStart(today);
    weekStart.setDate(weekStart.getDate() + (reportWeekOffset * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const startDate = getStudyReportDateString(weekStart);
    const endDate = getStudyReportDateString(weekEnd);
    studyHistory = studyHistory.filter(session => session.date < startDate || session.date > endDate);
    saveStudyHistory();
    renderStudyReports();
    if (typeof showToast === "function") {
        showToast(getStudyReportText("resetSuccess"));
    }
}

// =========================================================
// TASK EVENTS
// =========================================================

function setupStudyTaskEvents() {
    const addBtn = document.getElementById("addStudyTaskBtn");
    if (addBtn) {
        addBtn.addEventListener("click", () => openStudyTaskModal());
    }
    const form = document.getElementById("studyTaskForm");
    if (form) {
        form.addEventListener("submit", handleStudyTaskSubmit);
    }
    const progress = document.getElementById("studyTaskProgress");
    if (progress) {
        progress.addEventListener("input", updateStudyTaskProgressValue);
    }
    const container = document.getElementById("studyTasks");
    if (container) {
        container.addEventListener("click", function(event) {
            const button = event.target.closest("[data-action]");
            if (!button) return;
            const action = button.dataset.action;
            const id = button.dataset.id;
            if (!id) return;
            if (action === "edit") {
                editStudyTask(id);
            } else if (action === "delete") {
                deleteStudyTask(id);
            }
        });
    }
    const deleteBtn = document.getElementById("deleteStudyTaskBtn");
    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            const id = document.getElementById("studyTaskId");
            if (id && id.value) {
                deleteStudyTask(id.value);
            }
        });
    }
    document.addEventListener("click", function(event) {
        const closeBtn = event.target.closest('[data-close="studyTaskModal"]');
        if (closeBtn) {
            closeStudyTaskModal();
        }
    });
    const modal = document.getElementById("studyTaskModal");
    if (modal) {
        modal.addEventListener("click", function(event) {
            if (event.target === modal) {
                closeStudyTaskModal();
            }
        });
    }
    document.addEventListener("keydown", function(event) {
        if (event.key !== "Escape") {
            return;
        }
        const modal = document.getElementById("studyTaskModal");
        if (modal && modal.classList.contains("active")) {
            closeStudyTaskModal();
        }
    });
}

// =========================================================
// REPORT EVENTS
// =========================================================

function setupStudyReportEvents() {
    const resetDailyBtn = document.getElementById("resetDailyStudyReport");
    if (resetDailyBtn) {
        resetDailyBtn.addEventListener("click", resetDailyStudyReport);
    }
    const resetWeeklyBtn = document.getElementById("resetWeeklyStudyReport");
    if (resetWeeklyBtn) {
        resetWeeklyBtn.addEventListener("click", resetWeeklyStudyReport);
    }
    document.querySelectorAll(".study-report-tab").forEach(btn => {
        btn.addEventListener("click", () => switchStudyReportTab(btn.dataset.reportTab));
    });
    const previousDay = document.getElementById("previousReportDay");
    if (previousDay) {
        previousDay.addEventListener("click", () => {
            const date = new Date(`${reportDailyDate}T00:00:00`);
            date.setDate(date.getDate() - 1);
            reportDailyDate = getStudyReportDateString(date);
            renderDailyStudyReport();
        });
    }
    const dailyTodayBtn = document.getElementById("dailyReportTodayBtn");
    if (dailyTodayBtn) {
        dailyTodayBtn.addEventListener("click", () => {
            reportDailyDate = getStudyReportDateString(new Date());
            renderDailyStudyReport();
        });
    }
    const nextDay = document.getElementById("nextReportDay");
    if (nextDay) {
        nextDay.addEventListener("click", () => {
            const date = new Date(`${reportDailyDate}T00:00:00`);
            date.setDate(date.getDate() + 1);
            reportDailyDate = getStudyReportDateString(date);
            renderDailyStudyReport();
        });
    }
    const previousWeek = document.getElementById("previousReportWeek");
    if (previousWeek) {
        previousWeek.addEventListener("click", () => {
            reportWeekOffset--;
            renderWeeklyStudyReport();
        });
    }
    const weeklyTodayBtn = document.getElementById("weeklyReportTodayBtn");
    if (weeklyTodayBtn) {
        weeklyTodayBtn.addEventListener("click", () => {
            reportWeekOffset = 0;
            renderWeeklyStudyReport();
        });
    }
    const nextWeek = document.getElementById("nextReportWeek");
    if (nextWeek) {
        nextWeek.addEventListener("click", () => {
            reportWeekOffset++;
            renderWeeklyStudyReport();
        });
    }
}

// =========================================================
// TIMER EVENTS
// =========================================================

function setupStudyTimerListeners() {
    const pauseBtn = document.getElementById("pauseStudyTimerBtn");
    if (pauseBtn) {
        pauseBtn.onclick = toggleStudyTimerPause;
    }
    const finishBtn = document.getElementById("finishStudyTimerBtn");
    if (finishBtn) {
        finishBtn.onclick = finishStudyTimer;
    }
    document.addEventListener("click", function(event) {
        const button = event.target.closest("[data-study-start-id]");
        if (!button) return;
        const taskId = button.getAttribute("data-study-start-id");
        if (!taskId) return;
        const task = getStudyTaskById(taskId);
        if (task) {
            startStudyTimer(task);
        } else {
            console.error("Study task not found:", taskId);
        }
    });
    const minimizeBtn = document.getElementById("minimizeStudyTimer");
    const panel = document.getElementById("studyTimerPanel");
    if (minimizeBtn && panel) {
        minimizeBtn.addEventListener("click", () => {
            const isMinimized = panel.classList.toggle("minimized");
            minimizeBtn.textContent = isMinimized ? "+" : "−";
        });
    }
    const cancelBtn = document.getElementById("cancelStudyTimerBtn");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => cancelStudyTimer(true));
    }
}

// =========================================================
// UPDATE TASK LANGUAGE - IMPROVED
// =========================================================

function updateStudyTaskLanguage(force = false) {
    const language = getStudyTaskLanguage();
    if (!force && language === lastStudyTaskLanguage) {
        return;
    }
    lastStudyTaskLanguage = language;
    console.log("🔄 Updating study task language to:", language);
    const title = document.getElementById("studyTasksTitle");
    if (title) {
        title.textContent = getStudyTaskText("title");
    }
    const addBtn = document.getElementById("addStudyTaskBtn");
    if (addBtn) {
        addBtn.textContent = getStudyTaskText("add");
    }
    const progressLabel = document.getElementById("studyProgressLabel");
    if (progressLabel) {
        progressLabel.textContent = getStudyTaskText("overallProgress");
    }
    const chartTitle = document.getElementById("studyChartTitle");
    if (chartTitle) {
        chartTitle.textContent = getStudyTaskText("chartTitle");
    }
    const completedLabel = document.getElementById("studyCompletedLabel");
    if (completedLabel) {
        completedLabel.textContent = getStudyTaskText("completedLabel");
    }
    const inProgressLabel = document.getElementById("studyInProgressLabel");
    if (inProgressLabel) {
        inProgressLabel.textContent = getStudyTaskText("inProgressLabel");
    }
    const remainingLabel = document.getElementById("studyRemainingLabel");
    if (remainingLabel) {
        remainingLabel.textContent = getStudyTaskText("remainingLabel");
    }
    const pieLabel = document.getElementById("studyPieLabel");
    if (pieLabel) {
        pieLabel.textContent = getStudyTaskText("progressLabel");
    }
    updateStudyTaskFormLanguage();
    renderStudyTasks();
    updateStudyTaskPieChart();
    updateStudyReportLanguage();
}

// =========================================================
// FORCE UPDATE LANGUAGE - NO REFRESH
// =========================================================

function forceUpdateStudyTaskLanguage() {
    console.log("🔄 Force updating study task language...");
    lastStudyTaskLanguage = null;
    const lang = getStudyTaskLanguage();
    console.log("🌐 Detected language:", lang);
    updateStudyTaskLanguage(true);
    renderStudyTasks();
    updateStudyTaskPieChart();
    renderStudyReports();
    updateStudyTaskFormLanguage();
    updateStudyTaskProgress();
    console.log("✅ Study task language updated to:", lang);
}

// =========================================================
// LANGUAGE CHANGE LISTENERS - COMPLETE FIX
// =========================================================

function setupLanguageChangeListeners() {
    document.addEventListener("languageChanged", function(e) {
        console.log("📢 Study Task received languageChanged event", e.detail);
        setTimeout(function() {
            forceUpdateStudyTaskLanguage();
        }, 10);
        setTimeout(function() {
            forceUpdateStudyTaskLanguage();
        }, 50);
        setTimeout(function() {
            forceUpdateStudyTaskLanguage();
        }, 200);
        setTimeout(function() {
            forceUpdateStudyTaskLanguage();
        }, 500);
    });
    document.addEventListener("click", function(event) {
        const button = event.target.closest(
            "#languageBtn, #langBtn, .language-btn, .language-button, " +
            "[data-language-toggle], [data-lang-toggle], " +
            "button[data-language], button[data-lang]"
        );
        if (!button) return;
        console.log("🔘 Study Task language button clicked");
        forceUpdateStudyTaskLanguage();
        setTimeout(function() {
            forceUpdateStudyTaskLanguage();
        }, 50);
        setTimeout(function() {
            forceUpdateStudyTaskLanguage();
        }, 150);
        setTimeout(function() {
            forceUpdateStudyTaskLanguage();
        }, 300);
        setTimeout(function() {
            forceUpdateStudyTaskLanguage();
        }, 600);
    });
    window.addEventListener("storage", function(event) {
        const keys = [
            "bdStudentCalendarLanguage",
            "campusCalendarLanguage",
            "campusCalendarLang",
            "language",
            "currentLanguage",
            "currentLang",
            "studyAnalyticsLanguage"
        ];
        if (keys.includes(event.key)) {
            console.log("💾 Study Task storage changed:", event.key, event.newValue);
            setTimeout(function() {
                forceUpdateStudyTaskLanguage();
            }, 50);
            setTimeout(function() {
                forceUpdateStudyTaskLanguage();
            }, 200);
        }
    });
    document.addEventListener("visibilitychange", function() {
        if (!document.hidden) {
            console.log("👁️ Page became visible, updating language...");
            setTimeout(function() {
                forceUpdateStudyTaskLanguage();
            }, 100);
        }
    });
    if (window.MutationObserver) {
        const observer = new MutationObserver(function(mutations) {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    const langBtn = document.getElementById('languageBtn');
                    if (langBtn && !langBtn.dataset.studyTaskListenerAdded) {
                        langBtn.dataset.studyTaskListenerAdded = 'true';
                        console.log("🔘 Language button detected by MutationObserver");
                        langBtn.addEventListener('click', function(e) {
                            console.log("🔘 Direct language button click (MutationObserver)");
                            setTimeout(forceUpdateStudyTaskLanguage, 10);
                            setTimeout(forceUpdateStudyTaskLanguage, 100);
                            setTimeout(forceUpdateStudyTaskLanguage, 300);
                        });
                    }
                }
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    let lastCheckedLanguage = null;
    setInterval(function() {
        const current = getStudyTaskLanguage();
        if (current !== lastCheckedLanguage) {
            lastCheckedLanguage = current;
            console.log("🔄 Interval detected language change:", current);
            forceUpdateStudyTaskLanguage();
        }
    }, 2000);
    console.log("✅ Language change listeners setup complete");
}

// =========================================================
// INITIALIZATION
// =========================================================

function initStudyTask() {
    if (studyTaskInitialized) {
        return;
    }
    studyTaskInitialized = true;
    loadStudyTasks();
    loadStudyHistory();
    normalizeStudyTaskData();
    
    // ✅ ADD THIS LINE: Migrate old subjects
    migrateStudyHistorySubjects();
    
    reportDailyDate = getStudyReportDateString(new Date());
    setupStudyTaskEvents();
    setupStudyReportEvents();
    setupStudyTimerListeners();
    setupLanguageChangeListeners();
    updateStudyTaskLanguage(true);
    switchStudyReportTab("daily");
    renderStudyTasks();
    updateStudyTaskPieChart();
    renderStudyReports();
    setTimeout(forceUpdateStudyTaskLanguage, 100);
    setTimeout(forceUpdateStudyTaskLanguage, 300);
    setTimeout(forceUpdateStudyTaskLanguage, 600);
    setTimeout(forceUpdateStudyTaskLanguage, 1000);
    setInterval(function() {
        const lang = getStudyTaskLanguage();
        if (lang !== lastStudyTaskLanguage) {
            console.log("🔄 Auto-fix: Language mismatch detected");
            forceUpdateStudyTaskLanguage();
        }
    }, 3000);
    console.log("✅ Study Task module initialized with", studyTasks.length, "tasks and", studyHistory.length, "sessions");
    console.log("🌐 Current language:", getStudyTaskLanguage());
}

// =========================================================
// FORCE RELOAD DATA
// =========================================================

function forceReloadStudyData() {
    console.log("🔄 Force reloading study data...");
    loadStudyTasks();
    loadStudyHistory();
    normalizeStudyTaskData();
    
    // ✅ ADD THIS LINE: Migrate old subjects on reload
    migrateStudyHistorySubjects();
    
    forceUpdateStudyTaskLanguage();
    updateStudyTaskProgress();
    renderStudyReports();
    console.log("✅ Study data reloaded:", studyTasks.length, "tasks,", studyHistory.length, "sessions");
}

// =========================================================
// AUTO START
// =========================================================

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStudyTask, { once: true });
} else {
    initStudyTask();
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(forceReloadStudyData, 100);
});

window.addEventListener("pageshow", function(event) {
    if (event.persisted) {
        setTimeout(forceReloadStudyData, 150);
    }
});

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        return;
    }
    setTimeout(function() {
        const saved = localStorage.getItem(STUDY_HISTORY_STORAGE_KEY);
        if (!saved) return;
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length !== studyHistory.length) {
                forceReloadStudyData();
            }
        } catch (e) {}
    }, 200);
});

// =========================================================
// GLOBAL EXPORT
// =========================================================

window.studyTasks = studyTasks;
window.studyHistory = studyHistory;
window.getStudyTaskLanguage = getStudyTaskLanguage;
window.updateStudyTaskLanguage = updateStudyTaskLanguage;
window.forceUpdateStudyTaskLanguage = forceUpdateStudyTaskLanguage;
window.forceReloadStudyData = forceReloadStudyData;
window.startStudyTimer = startStudyTimer;
window.finishStudyTimer = finishStudyTimer;
window.cancelStudyTimer = cancelStudyTimer;
window.addStudySession = addStudySession;
window.getDailyStudyReport = getDailyStudyReport;
window.getWeeklyStudyReport = getWeeklyStudyReport;
window.hexToRgb = hexToRgb;
window.hexToRgbString = hexToRgbString;


/* =========================================================
   DAILY DIARY SYSTEM (Stats ছাড়া)
========================================================= */

(function initDailyDiary() {

    const STORAGE_KEY = 'campusCalendar_diary';

    // =========================================
    // DOM ELEMENTS
    // =========================================
    const dateDisplay   = document.getElementById('diaryDateDisplay');
    const textArea      = document.getElementById('diaryTextArea');
    const wordCount     = document.getElementById('diaryWordCount');
    const savedInd      = document.getElementById('diarySavedIndicator');
    const prevBtn       = document.getElementById('diaryPrevDay');
    const nextBtn       = document.getElementById('diaryNextDay');
    const todayBtn      = document.getElementById('diaryTodayBtn');
    const saveBtn       = document.getElementById('diarySaveBtn');
    const deleteBtn     = document.getElementById('diaryDeleteBtn');
    const moods         = document.getElementById('diaryMoods');
    const searchToggle  = document.getElementById('diarySearchToggle');
    const searchBox     = document.getElementById('diarySearchBox');
    const searchInput   = document.getElementById('diarySearchInput');
    const searchResults = document.getElementById('diarySearchResults');

    // Safety check — Diary না থাকলে কিছুই করবে না
    if (!textArea) return;

    // =========================================
    // STATE
    // =========================================
    let currentDate = new Date();
    let diary = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    let autoSaveTimer = null;

    // =========================================
    // HELPERS
    // =========================================
    function dateKey(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function isToday(d) {
        return dateKey(d) === dateKey(new Date());
    }

    const bnMonths = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন',
                      'জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
    const enMonths = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
    const bnDays = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
    const enDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    function getLang() {
        // ১. Study Task-এর proven language detector ব্যবহার করি
        if (typeof window.getStudyTaskLanguage === 'function') {
            return window.getStudyTaskLanguage();
        }
        
        // ২. Fallback: global variables চেক করি
        try {
            if (typeof currentLanguage !== 'undefined' && currentLanguage) {
                const v = String(currentLanguage).trim().toLowerCase();
                if (v === 'bn' || v === 'bangla' || v === 'bengali' || v.startsWith('bn-')) return 'bn';
                if (v === 'en' || v === 'english' || v.startsWith('en-')) return 'en';
            }
        } catch (e) {}
        
        try {
            if (typeof state !== 'undefined' && state && state.language) {
                const v = String(state.language).trim().toLowerCase();
                if (v === 'bn' || v === 'bangla' || v === 'bengali' || v.startsWith('bn-')) return 'bn';
                if (v === 'en' || v === 'english' || v.startsWith('en-')) return 'en';
            }
        } catch (e) {}
        
        // ৩. HTML attribute চেক করি
        try {
            const html = document.documentElement;
            const values = [
                html.getAttribute('data-language'),
                html.getAttribute('data-lang'),
                html.getAttribute('lang')
            ];
            for (const value of values) {
                if (!value) continue;
                const v = String(value).trim().toLowerCase();
                if (v === 'bn' || v === 'bangla' || v === 'bengali' || v.startsWith('bn-')) return 'bn';
                if (v === 'en' || v === 'english' || v.startsWith('en-')) return 'en';
            }
        } catch (e) {}
        
        // ৪. localStorage চেক করি
        try {
            const keys = [
                'campusCalendarLanguage',
                'campusCalendarLang',
                'bdStudentCalendarLanguage',
                'language',
                'currentLanguage',
                'currentLang'
            ];
            for (const key of keys) {
                const value = localStorage.getItem(key);
                if (!value) continue;
                const v = String(value).trim().toLowerCase();
                if (v === 'bn' || v === 'bangla' || v === 'bengali' || v.startsWith('bn-')) return 'bn';
                if (v === 'en' || v === 'english' || v.startsWith('en-')) return 'en';
            }
        } catch (e) {}
        
        // ৫. Default
        return 'en';
    }

    function formatDate(d) {
        const isBn = getLang() === 'bn';
        const day   = d.getDate();
        const month = isBn ? bnMonths[d.getMonth()] : enMonths[d.getMonth()];
        const year  = d.getFullYear();
        return isBn ? `${day} ${month}, ${year}` : `${month} ${day}, ${year}`;
    }

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(diary));
    }

    // =========================================
    // WORD COUNT
    // =========================================
    function updateWordCount() {
        const text = textArea.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        const chars = text.length;
        const isBn = getLang() === 'bn';

        if (isBn) {
            wordCount.textContent = `${words} শব্দ • ${chars} অক্ষর`;
        } else {
            wordCount.textContent = `${words} word${words !== 1 ? 's' : ''} • ${chars} char${chars !== 1 ? 's' : ''}`;
        }
    }

    // =========================================
    // LOAD A SPECIFIC DATE
    // =========================================
    function loadDate(date) {
        currentDate = new Date(date);
        const key = dateKey(currentDate);
        const entry = diary[key] || { text: '', mood: null };

        // Date display
        if (isToday(currentDate)) {
            dateDisplay.textContent = getLang() === 'bn' ? 'আজ' : 'Today';
        } else {
            dateDisplay.textContent = formatDate(currentDate);
        }

        // Text
        textArea.value = entry.text || '';
        updateWordCount();

        // Mood
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mood === entry.mood);
        });

        // Delete button opacity
        deleteBtn.style.opacity = (entry.text || entry.mood) ? '1' : '0.4';

        // Today button — আজকে থাকলে hide
        todayBtn.style.display = isToday(currentDate) ? 'none' : 'flex';
    }

    // =========================================
    // SAVE ENTRY
    // =========================================
    function saveEntry() {
        const key = dateKey(currentDate);
        const text = textArea.value;

        if (!diary[key]) diary[key] = { text: '', mood: null };
        diary[key].text = text;
        diary[key].timestamp = Date.now();

        // Empty entry হলে মুছে ফেলুন
        if (!text.trim() && !diary[key].mood) {
            delete diary[key];
        }

        save();
        showSaved();
    }

    function showSaved() {
        savedInd.classList.add('show');
        setTimeout(() => savedInd.classList.remove('show'), 1500);
    }

    // =========================================
    // NAVIGATION
    // =========================================
    prevBtn.addEventListener('click', () => {
        saveEntry();
        currentDate.setDate(currentDate.getDate() - 1);
        loadDate(currentDate);
    });

    nextBtn.addEventListener('click', () => {
        saveEntry();
        currentDate.setDate(currentDate.getDate() + 1);
        loadDate(currentDate);
    });

    todayBtn.addEventListener('click', () => {
        saveEntry();
        loadDate(new Date());
    });

    // =========================================
    // AUTO SAVE (1 second debounce)
    // =========================================
    textArea.addEventListener('input', () => {
        updateWordCount();
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(saveEntry, 1000);
    });

    // =========================================
    // MANUAL SAVE
    // =========================================
    saveBtn.addEventListener('click', saveEntry);

    // =========================================
    // DELETE
    // =========================================
    deleteBtn.addEventListener('click', () => {
        const isBn = getLang() === 'bn';
        const msg = isBn
            ? 'এই দিনের নোট মুছে ফেলবেন?'
            : 'Delete this day\'s entry?';

        if (!confirm(msg)) return;

        delete diary[dateKey(currentDate)];
        save();
        loadDate(currentDate);
    });

    // =========================================
    // MOOD SELECTOR
    // =========================================
    moods.addEventListener('click', (e) => {
        const btn = e.target.closest('.mood-btn');
        if (!btn) return;

        const key = dateKey(currentDate);
        if (!diary[key]) diary[key] = { text: textArea.value, mood: null };

        // Toggle — একই mood আবার চাপলে unset
        if (diary[key].mood === btn.dataset.mood) {
            diary[key].mood = null;
        } else {
            diary[key].mood = btn.dataset.mood;
        }

        diary[key].text = textArea.value;
        save();
        loadDate(currentDate);
    });

    // =========================================
    // SEARCH
    // =========================================
    searchToggle.addEventListener('click', () => {
        searchBox.classList.toggle('hidden');
        if (!searchBox.classList.contains('hidden')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';

        if (!q) return;

        const matches = Object.entries(diary)
            .filter(([key, entry]) => entry.text && entry.text.toLowerCase().includes(q))
            .sort((a, b) => b[0].localeCompare(a[0]))
            .slice(0, 10);

        if (matches.length === 0) {
            const isBn = getLang() === 'bn';
            searchResults.innerHTML = `
                <p style="font-size:11px;color:rgb(var(--text-muted));text-align:center;padding:8px;">
                    ${isBn ? 'কিছু পাওয়া যায়নি' : 'No results found'}
                </p>`;
            return;
        }

        matches.forEach(([key, entry]) => {
            const [y, m, d] = key.split('-').map(Number);
            const dateObj = new Date(y, m - 1, d);
            const item = document.createElement('div');
            item.className = 'diary-search-item';
            item.innerHTML = `
                <strong>${formatDate(dateObj)}</strong>
                <p>${entry.text.substring(0, 80)}${entry.text.length > 80 ? '...' : ''}</p>
            `;
            item.addEventListener('click', () => {
                saveEntry();
                loadDate(dateObj);
                searchBox.classList.add('hidden');
                searchInput.value = '';
                searchResults.innerHTML = '';
            });
            searchResults.appendChild(item);
        });
    });

    // =========================================
    // KEYBOARD SHORTCUT: Ctrl + S
    // =========================================
    textArea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveEntry();
        }
    });

    // =========================================
    // LANGUAGE SWITCH SUPPORT
    // =========================================
    // এই function-টা global এ expose করছি যাতে
    // languageBtn handler থেকে call করতে পারেন
    window.updateDiaryLanguage = function () {
        const isBn = getLang() === 'bn';

        const labels = {
            diaryTitle:       isBn ? '📔 ডেইলি ডায়েরি' : '📔 Daily Diary',
            diarySubtitle:    isBn ? 'প্রতিদিনের অনুভূতি লিখুন' : 'Write your daily thoughts',
            diaryTodayText:   isBn ? 'আজকে যান' : 'Go to Today',
            diaryMoodLabel:   isBn ? 'মুড:' : 'Mood:',
            diarySaveText:    isBn ? 'সংরক্ষণ' : 'Save',
            diaryDeleteText:  isBn ? 'মুছুন' : 'Delete'
        };

        Object.entries(labels).forEach(([id, text]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        });

        // Textarea placeholder
        textArea.placeholder = isBn
            ? 'আজকের দিনটি কেমন গেল?'
            : 'How was your day?';

        // Search placeholder
        searchInput.placeholder = isBn
            ? 'সব নোটে খুঁজুন...'
            : 'Search all notes...';

        // Reload date display + word count (ভাষা পরিবর্তনে updated হবে)
        loadDate(currentDate);
    };

    // =========================================
    // INITIAL LOAD
    // =========================================
    loadDate(new Date());

})();

/* =========================================================
   DIARY — LANGUAGE BUTTON LISTENER (STRONG VERSION)
========================================================= */

(function setupDiaryLanguageListener() {

    // সব সম্ভাব্য language button selector
    const selectors = [
        '#languageBtn',
        '#langBtn',
        '.language-btn',
        '.language-button',
        '[data-language-toggle]',
        '[data-lang-toggle]',
        'button[data-language]',
        'button[data-lang]'
    ].join(', ');

    function refreshDiary() {
        if (typeof window.updateDiaryLanguage === 'function') {
            window.updateDiaryLanguage();
        }
    }

    // ১. Click listener — capture phase এ run করে (Study Task-এর আগে)
    document.addEventListener('click', function(event) {
        const button = event.target.closest(selectors);
        if (!button) return;

        console.log('📔 Diary: Language button clicked');

        // Multiple timing delays — Study Task-এর মতোই
        setTimeout(refreshDiary, 10);
        setTimeout(refreshDiary, 60);
        setTimeout(refreshDiary, 150);
        setTimeout(refreshDiary, 300);
        setTimeout(refreshDiary, 600);
        setTimeout(refreshDiary, 1000);
    }, true);

    // ২. Custom event listener
    document.addEventListener('languageChanged', function() {
        console.log('📔 Diary: languageChanged event received');
        setTimeout(refreshDiary, 10);
        setTimeout(refreshDiary, 100);
    });

    // ৩. localStorage storage event (multi-tab sync)
    window.addEventListener('storage', function(event) {
        const keys = [
            'campusCalendarLanguage',
            'campusCalendarLang',
            'bdStudentCalendarLanguage',
            'language',
            'currentLanguage',
            'currentLang',
            'studyAnalyticsLanguage'
        ];
        if (keys.includes(event.key)) {
            console.log('📔 Diary: storage changed', event.key);
            setTimeout(refreshDiary, 50);
            setTimeout(refreshDiary, 200);
        }
    });

    // ৪. Interval polling — backup (Study Task-এর মতো)
    let lastLang = null;
    setInterval(function() {
        if (typeof window.getStudyTaskLanguage !== 'function') return;
        const current = window.getStudyTaskLanguage();
        if (current !== lastLang) {
            lastLang = current;
            console.log('📔 Diary: Interval detected language change →', current);
            refreshDiary();
        }
    }, 1500);

    console.log('✅ Diary language listener setup complete');

})();