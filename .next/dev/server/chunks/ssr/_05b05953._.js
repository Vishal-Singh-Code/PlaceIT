module.exports = [
"[project]/lib/validation/testSchemas.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "finalSubmitSchema",
    ()=>finalSubmitSchema,
    "startTestSchema",
    ()=>startTestSchema,
    "submitAnswerSchema",
    ()=>submitAnswerSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
;
const startTestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    testTemplateId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
});
const submitAnswerSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    attemptId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    questionId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    sectionId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    selectedOptionIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative().nullable(),
    timeSpentSeconds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative()
});
const finalSubmitSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    attemptId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "manual",
        "auto"
    ]).default("manual")
});
}),
"[project]/lib/db/connection.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectToDatabase",
    ()=>connectToDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in the environment");
}
let cached = global._mongoose;
if (!cached) {
    cached = global._mongoose = {
        conn: null,
        promise: null
    };
}
async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, {
            dbName: "placeit"
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
}),
"[project]/lib/db/models/TestTemplate.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TestTemplate",
    ()=>TestTemplate
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const SectionConfigSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    sectionId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Section",
        required: true
    },
    numberOfQuestions: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
}, {
    _id: false
});
const TestTemplateSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    examId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Exam",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    durationMinutes: {
        type: Number,
        required: true
    },
    sectionConfig: {
        type: [
            SectionConfigSchema
        ],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
TestTemplateSchema.index({
    examId: 1,
    isActive: 1
});
const TestTemplate = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].TestTemplate || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])("TestTemplate", TestTemplateSchema);
}),
"[project]/lib/db/models/TestAttempt.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TestAttempt",
    ()=>TestAttempt
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const TestAttemptSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    testTemplateId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "TestTemplate",
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    startedAt: {
        type: Date,
        required: true
    },
    submittedAt: Date,
    durationSeconds: Number,
    status: {
        type: String,
        enum: [
            "in_progress",
            "submitted",
            "auto_submitted"
        ],
        default: "in_progress"
    }
}, {
    timestamps: true
});
TestAttemptSchema.index({
    testTemplateId: 1,
    userId: 1,
    status: 1
});
const TestAttempt = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].TestAttempt || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])("TestAttempt", TestAttemptSchema);
}),
"[project]/lib/db/models/Question.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Question",
    ()=>Question
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const QuestionSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    examId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Exam",
        required: true
    },
    sectionId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Section",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    options: [
        {
            label: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ],
    correctOptionIndex: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        enum: [
            "easy",
            "medium",
            "hard"
        ],
        default: "medium"
    },
    tags: [
        String
    ],
    explanation: String,
    sourceYear: Number
}, {
    timestamps: true
});
QuestionSchema.index({
    examId: 1,
    sectionId: 1
});
const Question = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].Question || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])("Question", QuestionSchema);
}),
"[project]/lib/db/models/QuestionResponse.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuestionResponse",
    ()=>QuestionResponse
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const QuestionResponseSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    attemptId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "TestAttempt",
        required: true
    },
    questionId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Question",
        required: true
    },
    sectionId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Section",
        required: true
    },
    selectedOptionIndex: {
        type: Number,
        default: null
    },
    isCorrect: {
        type: Boolean,
        default: null
    },
    timeSpentSeconds: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
QuestionResponseSchema.index({
    attemptId: 1
});
QuestionResponseSchema.index({
    attemptId: 1,
    questionId: 1
}, {
    unique: true
});
const QuestionResponse = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].QuestionResponse || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])("QuestionResponse", QuestionResponseSchema);
}),
"[project]/lib/db/models/Section.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Section",
    ()=>Section
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const SectionSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    examId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Exam",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
SectionSchema.index({
    examId: 1,
    order: 1
});
const Section = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].Section || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])("Section", SectionSchema);
}),
"[project]/lib/db/models/AttemptAnalytics.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttemptAnalytics",
    ()=>AttemptAnalytics
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const SectionStatsSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    sectionId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Section",
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    correct: {
        type: Number,
        required: true
    },
    incorrect: {
        type: Number,
        required: true
    },
    unattempted: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    totalTimeSeconds: {
        type: Number,
        required: true
    },
    avgTimePerQuestionSeconds: {
        type: Number,
        required: true
    },
    strengthLabel: String
}, {
    _id: false
});
const AttemptAnalyticsSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    attemptId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "TestAttempt",
        required: true,
        unique: true
    },
    testTemplateId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "TestTemplate",
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    overallScore: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    totalCorrect: {
        type: Number,
        required: true
    },
    totalIncorrect: {
        type: Number,
        required: true
    },
    totalUnattempted: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    sectionStats: {
        type: [
            SectionStatsSchema
        ],
        required: true
    },
    percentile: Number,
    rank: Number
}, {
    timestamps: true
});
AttemptAnalyticsSchema.index({
    testTemplateId: 1,
    userId: 1
});
const AttemptAnalytics = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].AttemptAnalytics || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])("AttemptAnalytics", AttemptAnalyticsSchema);
}),
"[project]/lib/services/analyticsService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeAttemptAnalytics",
    ()=>computeAttemptAnalytics,
    "computeAttemptAnalyticsCore",
    ()=>computeAttemptAnalyticsCore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Question$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/Question.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$QuestionResponse$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/QuestionResponse.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Section$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/Section.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/TestAttempt.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$AttemptAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/AttemptAnalytics.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/connection.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
function computeAttemptAnalyticsCore(input) {
    const { attemptId, testTemplateId, userId, questions, responses, sections } = input;
    const responsesByQuestion = new Map();
    for (const r of responses){
        responsesByQuestion.set(r.questionId.toString(), r);
    }
    const sectionStatsMap = new Map();
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalUnattempted = 0;
    let totalQuestions = questions.length;
    for (const question of questions){
        const key = question._id.toString();
        const response = responsesByQuestion.get(key) || null;
        const sectionId = question.sectionId.toString();
        let sectionStats = sectionStatsMap.get(sectionId);
        if (!sectionStats) {
            sectionStats = {
                sectionId: question.sectionId,
                totalQuestions: 0,
                correct: 0,
                incorrect: 0,
                unattempted: 0,
                accuracy: 0,
                totalTimeSeconds: 0,
                avgTimePerQuestionSeconds: 0,
                strengthLabel: undefined
            };
            sectionStatsMap.set(sectionId, sectionStats);
        }
        sectionStats.totalQuestions += 1;
        const isAttempted = response && response.selectedOptionIndex !== null ? true : false;
        const isCorrect = isAttempted && response.selectedOptionIndex === question.correctOptionIndex;
        if (!isAttempted) {
            sectionStats.unattempted += 1;
            totalUnattempted += 1;
        } else if (isCorrect) {
            sectionStats.correct += 1;
            totalCorrect += 1;
        } else {
            sectionStats.incorrect += 1;
            totalIncorrect += 1;
        }
        if (response) {
            sectionStats.totalTimeSeconds += response.timeSpentSeconds;
        }
    }
    for (const section of sectionStatsMap.values()){
        section.accuracy = section.totalQuestions === 0 ? 0 : section.correct / section.totalQuestions;
        section.avgTimePerQuestionSeconds = section.totalQuestions === 0 ? 0 : section.totalTimeSeconds / section.totalQuestions;
        if (section.accuracy >= 0.7) {
            section.strengthLabel = "Strong";
        } else if (section.accuracy >= 0.4) {
            section.strengthLabel = "Average";
        } else {
            section.strengthLabel = "Needs improvement";
        }
    }
    const accuracy = totalQuestions === 0 ? 0 : totalCorrect / totalQuestions;
    const overallScore = totalCorrect;
    return {
        attemptId,
        testTemplateId,
        userId,
        overallScore,
        totalQuestions,
        totalCorrect,
        totalIncorrect,
        totalUnattempted,
        accuracy,
        sectionStats: Array.from(sectionStatsMap.values())
    };
}
async function computeAttemptAnalytics(attemptId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectToDatabase"])();
    const attempt = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TestAttempt"].findById(attemptId);
    if (!attempt) {
        throw new Error("Attempt not found");
    }
    const [questions, responses, sections] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Question$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Question"].find({}),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$QuestionResponse$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QuestionResponse"].find({
            attemptId: attempt._id
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Section$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Section"].find({})
    ]);
    const core = computeAttemptAnalyticsCore({
        attemptId: attempt._id,
        testTemplateId: attempt.testTemplateId,
        userId: attempt.userId,
        questions,
        responses,
        sections
    });
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$AttemptAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AttemptAnalytics"].findOne({
        attemptId: attempt._id
    });
    if (existing) {
        existing.overallScore = core.overallScore;
        existing.totalQuestions = core.totalQuestions;
        existing.totalCorrect = core.totalCorrect;
        existing.totalIncorrect = core.totalIncorrect;
        existing.totalUnattempted = core.totalUnattempted;
        existing.accuracy = core.accuracy;
        existing.sectionStats = core.sectionStats;
        await existing.save();
        return existing;
    }
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$AttemptAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AttemptAnalytics"].create({
        attemptId: core.attemptId,
        testTemplateId: core.testTemplateId,
        userId: core.userId,
        overallScore: core.overallScore,
        totalQuestions: core.totalQuestions,
        totalCorrect: core.totalCorrect,
        totalIncorrect: core.totalIncorrect,
        totalUnattempted: core.totalUnattempted,
        accuracy: core.accuracy,
        sectionStats: core.sectionStats
    });
    return created;
}
}),
"[project]/lib/services/rankingService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeRankAndPercentile",
    ()=>computeRankAndPercentile,
    "computeRankAndPercentileCore",
    ()=>computeRankAndPercentileCore,
    "getLeaderboard",
    ()=>getLeaderboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/connection.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$AttemptAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/AttemptAnalytics.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/TestAttempt.ts [app-rsc] (ecmascript)");
;
;
;
function computeRankAndPercentileCore(scores, targetAttemptId) {
    const sorted = [
        ...scores
    ].sort((a, b)=>{
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        const aDur = a.durationSeconds ?? Number.MAX_SAFE_INTEGER;
        const bDur = b.durationSeconds ?? Number.MAX_SAFE_INTEGER;
        return aDur - bDur;
    });
    const total = sorted.length;
    const index = sorted.findIndex((s)=>s.attemptId === targetAttemptId);
    if (index === -1) {
        throw new Error("Target attempt not found in scores array");
    }
    const rank = index + 1;
    const higherScoreCount = sorted.filter((s)=>s.score > sorted[index].score).length;
    /**
   * Percentile formula:
   * percentile = 100 * (1 - higherScoreCount / totalAttempts)
   *
   * Intuition:
   * - if no one scored higher, percentile = 100
   * - if everyone scored higher, percentile approaches 0
   */ const percentile = total === 0 ? 0 : 100 * (1 - higherScoreCount / total || 0);
    return {
        rank,
        percentile
    };
}
async function computeRankAndPercentile(testTemplateId, attemptId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectToDatabase"])();
    const [attempts, analytics] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TestAttempt"].find({
            testTemplateId,
            status: {
                $in: [
                    "submitted",
                    "auto_submitted"
                ]
            }
        }).sort({
            startedAt: 1
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$AttemptAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AttemptAnalytics"].find({
            testTemplateId
        })
    ]);
    const analyticsByAttempt = new Map(analytics.map((a)=>[
            a.attemptId.toString(),
            a
        ]));
    const scores = attempts.map((attempt)=>{
        const analyticsDoc = analyticsByAttempt.get(attempt._id.toString());
        const score = analyticsDoc ? analyticsDoc.overallScore : 0;
        const durationSeconds = attempt.durationSeconds ?? (attempt.submittedAt && attempt.startedAt ? Math.max(0, Math.round((attempt.submittedAt.getTime() - attempt.startedAt.getTime()) / 1000)) : null);
        return {
            attemptId: attempt._id.toString(),
            score,
            durationSeconds
        };
    });
    const { rank, percentile } = computeRankAndPercentileCore(scores, attemptId);
    const analyticsForAttempt = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$AttemptAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AttemptAnalytics"].findOne({
        attemptId
    });
    if (analyticsForAttempt) {
        analyticsForAttempt.rank = rank;
        analyticsForAttempt.percentile = percentile;
        await analyticsForAttempt.save();
    }
    return {
        rank,
        percentile
    };
}
async function getLeaderboard(testTemplateId, limit = 10) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectToDatabase"])();
    const analytics = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$AttemptAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AttemptAnalytics"].find({
        testTemplateId
    }).sort({
        overallScore: -1,
        createdAt: 1
    }).limit(limit);
    const attempts = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TestAttempt"].find({
        _id: {
            $in: analytics.map((a)=>a.attemptId)
        }
    });
    const attemptsById = new Map(attempts.map((a)=>[
            a._id.toString(),
            a
        ]));
    const entries = analytics.map((a, idx)=>{
        const attempt = attemptsById.get(a.attemptId.toString());
        return {
            attemptId: a.attemptId.toString(),
            userId: a.userId,
            score: a.overallScore,
            durationSeconds: attempt ? attempt.durationSeconds ?? null : null,
            startedAt: attempt ? attempt.startedAt.toISOString() : "",
            rank: idx + 1
        };
    });
    return entries;
}
}),
"[project]/lib/services/testService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "finalizeAttempt",
    ()=>finalizeAttempt,
    "recordAnswer",
    ()=>recordAnswer,
    "startAttempt",
    ()=>startAttempt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/connection.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestTemplate$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/TestTemplate.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/TestAttempt.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Question$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/Question.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$QuestionResponse$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/QuestionResponse.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$analyticsService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/analyticsService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$rankingService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/rankingService.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function startAttempt(input) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectToDatabase"])();
    const { testTemplateId, userId } = input;
    const template = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestTemplate$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TestTemplate"].findById(testTemplateId);
    if (!template) {
        throw new Error("Test template not found");
    }
    const questionSelections = [];
    for (const cfg of template.sectionConfig.sort((a, b)=>a.order - b.order)){
        const questions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Question$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Question"].find({
            examId: template.examId,
            sectionId: cfg.sectionId
        }).sort({
            _id: 1
        }).limit(cfg.numberOfQuestions);
        for (const q of questions){
            questionSelections.push({
                questionId: q._id,
                sectionId: cfg.sectionId
            });
        }
    }
    const now = new Date();
    const attempt = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TestAttempt"].create({
        testTemplateId: template._id,
        userId,
        startedAt: now,
        status: "in_progress"
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$QuestionResponse$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QuestionResponse"].insertMany(questionSelections.map((item)=>({
            attemptId: attempt._id,
            questionId: item.questionId,
            sectionId: item.sectionId,
            selectedOptionIndex: null,
            isCorrect: null,
            timeSpentSeconds: 0
        })));
    const populatedResponses = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$QuestionResponse$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QuestionResponse"].find({
        attemptId: attempt._id
    });
    return {
        attempt,
        responses: populatedResponses,
        template
    };
}
async function recordAnswer(input) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectToDatabase"])();
    const { attemptId, questionId, sectionId, selectedOptionIndex, timeSpentSeconds } = input;
    const attempt = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TestAttempt"].findById(attemptId);
    if (!attempt) {
        throw new Error("Attempt not found");
    }
    if (attempt.status !== "in_progress") {
        throw new Error("Attempt is not in progress");
    }
    const question = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Question$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Question"].findById(questionId);
    if (!question) {
        throw new Error("Question not found");
    }
    const isCorrect = selectedOptionIndex === null ? null : selectedOptionIndex === question.correctOptionIndex;
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$QuestionResponse$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QuestionResponse"].findOneAndUpdate({
        attemptId,
        questionId
    }, {
        sectionId: sectionId,
        selectedOptionIndex,
        isCorrect,
        $inc: {
            timeSpentSeconds
        }
    }, {
        new: true,
        upsert: true
    });
    return response;
}
async function finalizeAttempt(input) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectToDatabase"])();
    const { attemptId, mode } = input;
    const attempt = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TestAttempt"].findById(attemptId);
    if (!attempt) {
        throw new Error("Attempt not found");
    }
    if (attempt.status !== "in_progress") {
        return attempt;
    }
    const submittedAt = new Date();
    const durationSeconds = Math.max(0, Math.round((submittedAt.getTime() - attempt.startedAt.getTime()) / 1000));
    attempt.status = mode === "auto" ? "auto_submitted" : "submitted";
    attempt.submittedAt = submittedAt;
    attempt.durationSeconds = durationSeconds;
    await attempt.save();
    const analytics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$analyticsService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["computeAttemptAnalytics"])(attempt._id.toString());
    const ranking = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$rankingService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["computeRankAndPercentile"])(attempt.testTemplateId.toString(), attempt._id.toString());
    return {
        attempt,
        analytics,
        ranking
    };
}
}),
"[project]/lib/actions/tests.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4016ca7b6c5a15f74c7ad50c7e46c2b73f87ea06bb":"getTestAttemptView","406b029178078a03f9ba4cc7f97d3352d92faf68b5":"startTestAction","407f30009c3382cc7b728afcc4313cd00ad7eb03ca":"finalSubmitAction","40f0e3f9bc904b095a1a58608754399438ddc308a9":"submitAnswerAction"},"",""] */ __turbopack_context__.s([
    "finalSubmitAction",
    ()=>finalSubmitAction,
    "getTestAttemptView",
    ()=>getTestAttemptView,
    "startTestAction",
    ()=>startTestAction,
    "submitAnswerAction",
    ()=>submitAnswerAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$testSchemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/testSchemas.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$testService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/testService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/connection.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/TestAttempt.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$QuestionResponse$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/QuestionResponse.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Question$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/Question.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestTemplate$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/TestTemplate.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
async function getCurrentUserId() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const existing = cookieStore.get("demo_user_id")?.value;
    if (existing) return existing;
    const generated = "demo-user";
    cookieStore.set("demo_user_id", generated, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365
    });
    return generated;
}
async function startTestAction(formData) {
    const userId = await getCurrentUserId();
    const raw = {
        testTemplateId: formData.get("testTemplateId"),
        userId
    };
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$testSchemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startTestSchema"].parse(raw);
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$testService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startAttempt"])(parsed);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/attempts/${result.attempt._id.toString()}`);
}
async function submitAnswerAction(input) {
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$testSchemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitAnswerSchema"].parse(input);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$testService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recordAnswer"])(parsed);
}
async function finalSubmitAction(input) {
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$testSchemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finalSubmitSchema"].parse({
        attemptId: input.attemptId,
        mode: input.mode ?? "manual"
    });
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$testService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finalizeAttempt"])(parsed);
    if ("attempt" in result) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/attempts/${result.attempt._id.toString()}/result`);
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/attempts/${result._id.toString()}/result`);
    }
}
async function getTestAttemptView(attemptId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectToDatabase"])();
    const attempt = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestAttempt$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TestAttempt"].findById(attemptId).lean();
    if (!attempt) {
        throw new Error("Attempt not found");
    }
    const template = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestTemplate$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TestTemplate"].findById(attempt.testTemplateId).lean();
    const responses = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$QuestionResponse$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QuestionResponse"].find({
        attemptId: attempt._id
    }).lean();
    const questions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Question$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Question"].find({
        _id: {
            $in: responses.map((r)=>r.questionId)
        }
    }).lean();
    const questionsById = new Map(questions.map((q)=>[
            q._id.toString(),
            q
        ]));
    const items = responses.map((r)=>{
        const q = questionsById.get(r.questionId.toString());
        if (!q) {
            throw new Error("Question not found for response");
        }
        return {
            questionId: q._id.toString(),
            sectionId: q.sectionId.toString(),
            text: q.text,
            options: q.options.map((opt)=>({
                    label: opt.label,
                    value: opt.value
                })),
            selectedOptionIndex: r.selectedOptionIndex
        };
    });
    return {
        attempt: {
            id: attempt._id.toString(),
            status: attempt.status,
            startedAt: attempt.startedAt.toISOString(),
            submittedAt: attempt.submittedAt?.toISOString() ?? null
        },
        template: template ? {
            id: template._id.toString(),
            name: template.name,
            durationMinutes: template.durationMinutes
        } : null,
        items
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    startTestAction,
    submitAnswerAction,
    finalSubmitAction,
    getTestAttemptView
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(startTestAction, "406b029178078a03f9ba4cc7f97d3352d92faf68b5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitAnswerAction, "40f0e3f9bc904b095a1a58608754399438ddc308a9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(finalSubmitAction, "407f30009c3382cc7b728afcc4313cd00ad7eb03ca", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTestAttemptView, "4016ca7b6c5a15f74c7ad50c7e46c2b73f87ea06bb", null);
}),
"[project]/.next-internal/server/app/tests/[testTemplateId]/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions/tests.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tests$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/tests.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/.next-internal/server/app/tests/[testTemplateId]/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions/tests.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "4016ca7b6c5a15f74c7ad50c7e46c2b73f87ea06bb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tests$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTestAttemptView"],
    "406b029178078a03f9ba4cc7f97d3352d92faf68b5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tests$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startTestAction"],
    "407f30009c3382cc7b728afcc4313cd00ad7eb03ca",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tests$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finalSubmitAction"],
    "40f0e3f9bc904b095a1a58608754399438ddc308a9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tests$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitAnswerAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$tests$2f5b$testTemplateId$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$actions$2f$tests$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/tests/[testTemplateId]/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/actions/tests.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tests$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/tests.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_05b05953._.js.map