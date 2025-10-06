// Test balance calculation logic
function computeAlgoBalance(wV, wC, wD) {
    const target = 1 / 3;
    const diff = Math.abs(wV - target) + Math.abs(wC - target) + Math.abs(wD - target);
    const maxDiff = 4 / 3;
    const rawScore = 100 - (diff / maxDiff) * 100;
    const score = Math.round(rawScore);
    
    let level, label;
    if (score >= 95) {
        level = 'excellent';
        label = 'Hoàn hảo';
    } else if (score >= 80) {
        level = 'good';
        label = 'Tốt';
    } else if (score >= 60) {
        level = 'fair';
        label = 'Khá';
    } else if (score >= 40) {
        level = 'poor';
        label = 'Trung bình';
    } else {
        level = 'bad';
        label = 'Kém';
    }
    
    return { score, level, label, rawScore, diff };
}

// Test cases
const testCases = [
    { name: "Cân bằng hoàn hảo (33-33-33)", wV: 0.33, wC: 0.33, wD: 0.33 },
    { name: "Cân bằng hoàn hảo (0.333...)", wV: 1/3, wC: 1/3, wD: 1/3 },
    { name: "Sliders ở giữa (50-50-50)", wV: 0.5, wC: 0.5, wD: 0.5 },
    { name: "Mất cân bằng nhẹ (40-30-30)", wV: 0.4, wC: 0.3, wD: 0.3 },
    { name: "Mất cân bằng vừa (50-25-25)", wV: 0.5, wC: 0.25, wD: 0.25 },
    { name: "Mất cân bằng nặng (70-20-10)", wV: 0.7, wC: 0.2, wD: 0.1 },
    { name: "Mất cân bằng hoàn toàn (100-0-0)", wV: 1.0, wC: 0.0, wD: 0.0 },
    { name: "Chỉ tin cậy (0-100-0)", wV: 0.0, wC: 1.0, wD: 0.0 },
    { name: "Hai yếu tố (50-50-0)", wV: 0.5, wC: 0.5, wD: 0.0 },
];

console.log("=".repeat(80));
console.log("TEST BALANCE CALCULATION");
console.log("=".repeat(80));

testCases.forEach(tc => {
    const result = computeAlgoBalance(tc.wV, tc.wC, tc.wD);
    console.log(`\n${tc.name}`);
    console.log(`  Input: V=${(tc.wV*100).toFixed(0)}%, C=${(tc.wC*100).toFixed(0)}%, D=${(tc.wD*100).toFixed(0)}%`);
    console.log(`  Diff: ${result.diff.toFixed(4)} (max: 1.333)`);
    console.log(`  Score: ${result.score}/100 (raw: ${result.rawScore.toFixed(2)})`);
    console.log(`  Level: ${result.label} (${result.level})`);
});

console.log("\n" + "=".repeat(80));
