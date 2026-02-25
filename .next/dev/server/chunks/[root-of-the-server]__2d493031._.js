module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/db/connection.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/db/models/Exam.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Exam",
    ()=>Exam
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const ExamSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    company: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    branding: {
        primaryColor: String,
        logoUrl: String
    }
}, {
    timestamps: true
});
const Exam = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].Exam || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])("Exam", ExamSchema);
}),
"[project]/lib/db/models/Section.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/db/models/Question.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/db/models/TestTemplate.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/app/api/seed-quant/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/connection.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Exam$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/Exam.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Section$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/Section.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Question$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/Question.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/models/TestTemplate.ts [app-route] (ecmascript)");
;
;
;
;
;
;
async function seedQuant() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDatabase"])();
    // 1) Ensure exam exists
    const exam = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Exam$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Exam"].findOneAndUpdate({
        company: "TCS",
        title: "TCS Quantitative Aptitude Mock"
    }, {
        $setOnInsert: {
            description: "Quantitative aptitude practice set similar to TCS placement pattern.",
            isActive: true
        }
    }, {
        new: true,
        upsert: true
    });
    // 2) Ensure section exists
    const section = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Section$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Section"].findOneAndUpdate({
        examId: exam._id,
        name: "Quantitative Aptitude"
    }, {
        $setOnInsert: {
            order: 1
        }
    }, {
        new: true,
        upsert: true
    });
    // 3) Ensure test template exists
    const template = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$TestTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TestTemplate"].findOneAndUpdate({
        examId: exam._id,
        name: "TCS Quantitative Aptitude (20 Questions)"
    }, {
        $set: {
            durationMinutes: 40,
            sectionConfig: [
                {
                    sectionId: section._id,
                    numberOfQuestions: 20,
                    order: 1
                }
            ],
            isActive: true
        }
    }, {
        new: true,
        upsert: true
    });
    // 4) Define 20 quant aptitude MCQs (easy–medium)
    const baseQuestions = [
        {
            text: "A number is increased by 20% and then decreased by 20%. What is the net percentage change in the number?",
            options: [
                {
                    label: "A",
                    value: "0% change"
                },
                {
                    label: "B",
                    value: "2% decrease"
                },
                {
                    label: "C",
                    value: "4% decrease"
                },
                {
                    label: "D",
                    value: "4% increase"
                }
            ],
            correctOptionIndex: 2,
            difficulty: "easy",
            tags: [
                "quant",
                "percentage",
                "tcs-like",
                "tcs-quant-seed"
            ],
            explanation: "Let the number be 100. After +20% → 120. After −20% → 120 − 24 = 96. Net decrease = 4 on 100 → 4% decrease."
        },
        {
            text: "The ratio of boys to girls in a class is 3 : 2. If there are 30 students in total, how many girls are there?",
            options: [
                {
                    label: "A",
                    value: "10"
                },
                {
                    label: "B",
                    value: "12"
                },
                {
                    label: "C",
                    value: "15"
                },
                {
                    label: "D",
                    value: "18"
                }
            ],
            correctOptionIndex: 1,
            difficulty: "easy",
            tags: [
                "quant",
                "ratio",
                "proportion",
                "tcs-quant-seed"
            ],
            explanation: "Total parts = 3 + 2 = 5. Each part = 30/5 = 6. Girls = 2 × 6 = 12."
        },
        {
            text: "A man buys an article for ₹800 and sells it for ₹920. What is his profit percentage?",
            options: [
                {
                    label: "A",
                    value: "10%"
                },
                {
                    label: "B",
                    value: "12%"
                },
                {
                    label: "C",
                    value: "15%"
                },
                {
                    label: "D",
                    value: "18%"
                }
            ],
            correctOptionIndex: 2,
            difficulty: "easy",
            tags: [
                "quant",
                "profit-loss",
                "tcs-quant-seed"
            ],
            explanation: "Profit = 920 − 800 = 120. Profit% = (120/800) × 100 = 15%."
        },
        {
            text: "A train 150 m long passes a pole in 12 seconds. What is its speed in km/h?",
            options: [
                {
                    label: "A",
                    value: "30 km/h"
                },
                {
                    label: "B",
                    value: "37.5 km/h"
                },
                {
                    label: "C",
                    value: "45 km/h"
                },
                {
                    label: "D",
                    value: "50 km/h"
                }
            ],
            correctOptionIndex: 1,
            difficulty: "medium",
            tags: [
                "quant",
                "speed-time-distance",
                "tcs-quant-seed"
            ],
            explanation: "Speed = 150/12 m/s = 12.5 m/s. In km/h: 12.5 × 18/5 = 37.5 km/h."
        },
        {
            text: "The average of 5 numbers is 18. When one more number is included, the average becomes 20. What is the sixth number?",
            options: [
                {
                    label: "A",
                    value: "26"
                },
                {
                    label: "B",
                    value: "28"
                },
                {
                    label: "C",
                    value: "30"
                },
                {
                    label: "D",
                    value: "32"
                }
            ],
            correctOptionIndex: 2,
            difficulty: "easy",
            tags: [
                "quant",
                "average",
                "tcs-quant-seed"
            ],
            explanation: "Sum of 5 numbers = 5 × 18 = 90. New sum = 6 × 20 = 120. Sixth number = 120 − 90 = 30."
        },
        {
            text: "If 2 workers can complete a job in 12 days, in how many days will 3 workers complete the same job, assuming equal efficiency?",
            options: [
                {
                    label: "A",
                    value: "6 days"
                },
                {
                    label: "B",
                    value: "8 days"
                },
                {
                    label: "C",
                    value: "9 days"
                },
                {
                    label: "D",
                    value: "10 days"
                }
            ],
            correctOptionIndex: 1,
            difficulty: "easy",
            tags: [
                "quant",
                "work-time",
                "tcs-quant-seed"
            ],
            explanation: "Total work = 2 × 12 = 24 worker-days. For 3 workers, time = 24/3 = 8 days."
        },
        {
            text: "A sum of ₹5000 is invested at simple interest at 8% per annum for 3 years. What is the interest earned?",
            options: [
                {
                    label: "A",
                    value: "₹1200"
                },
                {
                    label: "B",
                    value: "₹1000"
                },
                {
                    label: "C",
                    value: "₹1500"
                },
                {
                    label: "D",
                    value: "₹1800"
                }
            ],
            correctOptionIndex: 0,
            difficulty: "easy",
            tags: [
                "quant",
                "simple-interest",
                "tcs-quant-seed"
            ],
            explanation: "SI = (P × R × T)/100 = (5000 × 8 × 3)/100 = 1200."
        },
        {
            text: "The marked price of an item is ₹2000. A shopkeeper offers a discount of 15%. What is the selling price?",
            options: [
                {
                    label: "A",
                    value: "₹1600"
                },
                {
                    label: "B",
                    value: "₹1700"
                },
                {
                    label: "C",
                    value: "₹1750"
                },
                {
                    label: "D",
                    value: "₹1800"
                }
            ],
            correctOptionIndex: 1,
            difficulty: "easy",
            tags: [
                "quant",
                "discount",
                "tcs-quant-seed"
            ],
            explanation: "Discount = 15% of 2000 = 300. Selling price = 2000 − 300 = 1700."
        },
        {
            text: "If 5 pencils cost ₹25, how much will 9 pencils cost at the same rate?",
            options: [
                {
                    label: "A",
                    value: "₹40"
                },
                {
                    label: "B",
                    value: "₹45"
                },
                {
                    label: "C",
                    value: "₹50"
                },
                {
                    label: "D",
                    value: "₹55"
                }
            ],
            correctOptionIndex: 1,
            difficulty: "easy",
            tags: [
                "quant",
                "ratio",
                "unitary-method",
                "tcs-quant-seed"
            ],
            explanation: "Cost per pencil = 25/5 = 5. Cost of 9 pencils = 9 × 5 = 45."
        },
        {
            text: "A sum of money becomes ₹720 in 2 years and ₹792 in 3 years under simple interest. What is the principal?",
            options: [
                {
                    label: "A",
                    value: "₹540"
                },
                {
                    label: "B",
                    value: "₹560"
                },
                {
                    label: "C",
                    value: "₹576"
                },
                {
                    label: "D",
                    value: "₹600"
                }
            ],
            correctOptionIndex: 2,
            difficulty: "medium",
            tags: [
                "quant",
                "simple-interest",
                "tcs-quant-seed"
            ],
            explanation: "1 year’s interest = 792 − 720 = 72. Interest for 2 years = 144. Principal = 720 − 144 = 576."
        },
        {
            text: "The LCM of two numbers is 180 and their HCF is 15. If one number is 45, what is the other number?",
            options: [
                {
                    label: "A",
                    value: "60"
                },
                {
                    label: "B",
                    value: "75"
                },
                {
                    label: "C",
                    value: "90"
                },
                {
                    label: "D",
                    value: "120"
                }
            ],
            correctOptionIndex: 0,
            difficulty: "medium",
            tags: [
                "quant",
                "hcf-lcm",
                "tcs-quant-seed"
            ],
            explanation: "For two numbers a and b, a × b = LCM × HCF = 180 × 15 = 2700. Other number = 2700 / 45 = 60."
        },
        {
            text: "A cistern can be filled by a tap in 12 hours and emptied by a waste pipe in 18 hours. If both are opened together, in how many hours will the cistern be filled?",
            options: [
                {
                    label: "A",
                    value: "30 hours"
                },
                {
                    label: "B",
                    value: "36 hours"
                },
                {
                    label: "C",
                    value: "72 hours"
                },
                {
                    label: "D",
                    value: "54 hours"
                }
            ],
            correctOptionIndex: 1,
            difficulty: "medium",
            tags: [
                "quant",
                "pipes-cisterns",
                "tcs-quant-seed"
            ],
            explanation: "Filling rate = 1/12, emptying rate = 1/18. Net rate = 1/12 − 1/18 = (3 − 2)/36 = 1/36. Time = 36 hours."
        },
        {
            text: "If 40% of a number is 72, what is 25% of the same number?",
            options: [
                {
                    label: "A",
                    value: "30"
                },
                {
                    label: "B",
                    value: "40"
                },
                {
                    label: "C",
                    value: "45"
                },
                {
                    label: "D",
                    value: "50"
                }
            ],
            correctOptionIndex: 2,
            difficulty: "easy",
            tags: [
                "quant",
                "percentage",
                "tcs-quant-seed"
            ],
            explanation: "40% of number = 72 ⇒ number = 72 / 0.4 = 180. Then 25% = 0.25 × 180 = 45."
        },
        {
            text: "A shopkeeper mixes two types of rice costing ₹50/kg and ₹70/kg in the ratio 3 : 2. What is the average price per kg of the mixture?",
            options: [
                {
                    label: "A",
                    value: "₹58"
                },
                {
                    label: "B",
                    value: "₹60"
                },
                {
                    label: "C",
                    value: "₹62"
                },
                {
                    label: "D",
                    value: "₹64"
                }
            ],
            correctOptionIndex: 0,
            difficulty: "medium",
            tags: [
                "quant",
                "alligation",
                "average",
                "tcs-quant-seed"
            ],
            explanation: "Weighted average = (3×50 + 2×70) / (3+2) = (150+140)/5 = 290/5 = 58."
        },
        {
            text: "The sum of three consecutive integers is 81. What is the middle number?",
            options: [
                {
                    label: "A",
                    value: "26"
                },
                {
                    label: "B",
                    value: "27"
                },
                {
                    label: "C",
                    value: "28"
                },
                {
                    label: "D",
                    value: "29"
                }
            ],
            correctOptionIndex: 1,
            difficulty: "easy",
            tags: [
                "quant",
                "numbers",
                "tcs-quant-seed"
            ],
            explanation: "Let numbers be (x−1), x, (x+1). Sum = 3x = 81 ⇒ x = 27 (middle number)."
        },
        {
            text: "A person walks at 6 km/h. How much time will he take to cover 750 m?",
            options: [
                {
                    label: "A",
                    value: "6 minutes"
                },
                {
                    label: "B",
                    value: "7.5 minutes"
                },
                {
                    label: "C",
                    value: "8 minutes"
                },
                {
                    label: "D",
                    value: "9 minutes"
                }
            ],
            correctOptionIndex: 1,
            difficulty: "easy",
            tags: [
                "quant",
                "speed-time-distance",
                "tcs-quant-seed"
            ],
            explanation: "6 km/h = 6000 m in 60 min ⇒ 1 m in 0.01 min. For 750 m, time = 750 × 0.01 = 7.5 min."
        },
        {
            text: "In an examination, a student scores 80 marks and this is 40% of the total marks. What are the total marks?",
            options: [
                {
                    label: "A",
                    value: "180"
                },
                {
                    label: "B",
                    value: "190"
                },
                {
                    label: "C",
                    value: "200"
                },
                {
                    label: "D",
                    value: "220"
                }
            ],
            correctOptionIndex: 2,
            difficulty: "easy",
            tags: [
                "quant",
                "percentage",
                "tcs-quant-seed"
            ],
            explanation: "40% of total = 80 ⇒ total = 80 / 0.4 = 200."
        },
        {
            text: "A bag contains 5 red balls and 3 blue balls. One ball is drawn at random. What is the probability that it is blue?",
            options: [
                {
                    label: "A",
                    value: "1/2"
                },
                {
                    label: "B",
                    value: "3/8"
                },
                {
                    label: "C",
                    value: "3/5"
                },
                {
                    label: "D",
                    value: "5/8"
                }
            ],
            correctOptionIndex: 1,
            difficulty: "medium",
            tags: [
                "quant",
                "probability",
                "tcs-quant-seed"
            ],
            explanation: "Total balls = 8. Blue balls = 3. Probability = 3/8."
        },
        {
            text: "The selling price of an article is ₹480 after giving a discount of 20%. What was the marked price?",
            options: [
                {
                    label: "A",
                    value: "₹560"
                },
                {
                    label: "B",
                    value: "₹600"
                },
                {
                    label: "C",
                    value: "₹580"
                },
                {
                    label: "D",
                    value: "₹620"
                }
            ],
            correctOptionIndex: 1,
            difficulty: "medium",
            tags: [
                "quant",
                "discount",
                "tcs-quant-seed"
            ],
            explanation: "Selling price = 80% of marked price. MP = 480 / 0.8 = 600."
        },
        {
            text: "The present ages of A and B are in the ratio 4 : 5. After 6 years, the ratio becomes 5 : 6. What is B's present age?",
            options: [
                {
                    label: "A",
                    value: "20 years"
                },
                {
                    label: "B",
                    value: "24 years"
                },
                {
                    label: "C",
                    value: "25 years"
                },
                {
                    label: "D",
                    value: "30 years"
                }
            ],
            correctOptionIndex: 3,
            difficulty: "medium",
            tags: [
                "quant",
                "ages",
                "tcs-quant-seed"
            ],
            explanation: "Let present ages be 4x and 5x. After 6 years: (4x+6)/(5x+6) = 5/6 ⇒ 6(4x+6) = 5(5x+6) ⇒ 24x+36 = 25x+30 ⇒ x = 6. B's age = 5×6 = 30."
        },
        {
            text: "A shopkeeper gains 25% after giving a discount of 20% on the marked price. If the cost price is ₹480, what is the marked price?",
            options: [
                {
                    label: "A",
                    value: "₹720"
                },
                {
                    label: "B",
                    value: "₹750"
                },
                {
                    label: "C",
                    value: "₹800"
                },
                {
                    label: "D",
                    value: "₹840"
                }
            ],
            correctOptionIndex: 2,
            difficulty: "medium",
            tags: [
                "quant",
                "profit-loss",
                "discount",
                "tcs-quant-seed"
            ],
            explanation: "Selling price = 125% of CP = 1.25 × 480 = 600. Also SP = 80% of MP ⇒ 0.8×MP = 600 ⇒ MP = 600/0.8 = 750."
        }
    ];
    // 5) Re-seed questions for this exam/section that are tagged as seed questions
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Question$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Question"].deleteMany({
        examId: exam._id,
        sectionId: section._id,
        tags: "tcs-quant-seed"
    });
    const questionsToInsert = baseQuestions.map((q)=>({
            examId: exam._id,
            sectionId: section._id,
            text: q.text,
            options: q.options,
            correctOptionIndex: q.correctOptionIndex,
            difficulty: q.difficulty,
            tags: q.tags,
            explanation: q.explanation,
            sourceYear: 2025
        }));
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$models$2f$Question$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Question"].insertMany(questionsToInsert);
    return {
        exam,
        section,
        template,
        questionsInserted: created.length
    };
}
async function GET(_req) {
    try {
        const { exam, section, template, questionsInserted } = await seedQuant();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            message: "Seeded TCS-style quantitative aptitude questions (GET).",
            examId: exam._id.toString(),
            sectionId: section._id.toString(),
            testTemplateId: template._id.toString(),
            questionsInserted
        });
    } catch (err) {
        console.error("Error seeding quant questions (GET)", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: "Failed to seed quant questions"
        }, {
            status: 500
        });
    }
}
async function POST(_req) {
    try {
        const { exam, section, template, questionsInserted } = await seedQuant();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            message: "Seeded TCS-style quantitative aptitude questions (POST).",
            examId: exam._id.toString(),
            sectionId: section._id.toString(),
            testTemplateId: template._id.toString(),
            questionsInserted
        });
    } catch (err) {
        console.error("Error seeding quant questions (POST)", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: "Failed to seed quant questions"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2d493031._.js.map