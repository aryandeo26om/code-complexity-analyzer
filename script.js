let chart;

// 🔥 MAIN ANALYSIS
function analyzeCode() {
  const code = document.getElementById("codeInput").value.trim();

  if (!code) {
    alert("Paste some code first.");
    return;
  }

  resetUI();

  const linesArr = code.split("\n");
  const lines = linesArr.filter(l => l.trim() !== "").length;

  const loopRegex = /\b(for|while|do)\b/;
  const conditionRegex = /\b(if|else if|switch|case)\b/;

  let loops = 0;
  let conditions = 0;

  // 🔥 LINE ANALYSIS + SUGGESTIONS
  let highlightedCode = "";

  linesArr.forEach(line => {
    let suggestion = null;
    let severity = "";

    const hasLoop = loopRegex.test(line);
    const hasCondition = conditionRegex.test(line);

    if (hasLoop) {
      loops++;
      suggestion = "Loop detected → optimize or avoid deep nesting";
      severity = "warn";
    }

    if (hasCondition) {
      conditions++;
      suggestion = "Conditional logic → simplify branching";
      severity = "warn";
    }

    if (hasLoop && hasCondition) {
      suggestion = "🔥 Nested loop + condition → high complexity";
      severity = "danger";
    }

    highlightedCode += suggestion
      ? `<div class="code-line ${severity}">
           ${escapeHTML(line)}
           <div class="suggestion">${suggestion}</div>
         </div>`
      : `<div class="code-line">${escapeHTML(line)}</div>`;
  });

  document.getElementById("codeDisplay").innerHTML = highlightedCode;

  // 🔥 FUNCTIONS
  const functionRegex = /(?:function|def|void|int|float|double)\s+\w+\s*\(/g;
  const functions = (code.match(functionRegex) || []).length;

  // 🔥 SCORE
  let score =
    functions * 2 +
    loops * 3 +
    conditions * 2;

  if (lines > 20) score += 2;
  if (lines > 50) score += 3;

  // 🔥 BIG-O
  let bigO = "O(1)";
  if (loops === 1) bigO = "O(n)";
  else if (loops === 2) bigO = "O(n²)";
  else if (loops >= 3) bigO = "O(n³)";

  document.getElementById("bigO").innerText = bigO;

  // 🔥 QUALITY
  let quality = Math.max(0, 100 - score * 2);
  document.getElementById("quality").innerText = quality;

  // 🔥 VERDICT
  let verdict, verdictClass;

  if (score < 10) {
    verdict = "Low";
    verdictClass = "low";
  } else if (score < 20) {
    verdict = "Medium";
    verdictClass = "medium";
  } else {
    verdict = "High";
    verdictClass = "high";
  }

  updateMetrics({ lines, functions, loops, conditions, score });
  updateVerdict(verdict, verdictClass);
  updateBar(score);
  generateInsights({ loops, conditions, functions, score });
  generateSummary(score);

  generateRefactorSuggestions({ loops, conditions, functions, score, bigO });

  // 🔥 GRAPH
  renderComplexityGraph(bigO);
}

// 🔥 HELPERS

function resetUI() {
  document.getElementById("summary").innerText = "Analyzing...";
  document.getElementById("functionAnalysis").innerHTML = "";
}

function updateMetrics(data) {
  document.getElementById("lines").innerText = data.lines;
  document.getElementById("functions").innerText = data.functions;
  document.getElementById("loops").innerText = data.loops;
  document.getElementById("conditions").innerText = data.conditions;
  document.getElementById("score").innerText = data.score;
}

function updateVerdict(text, className) {
  const el = document.getElementById("verdict");
  el.innerText = text;
  el.className = className;
}

function updateBar(score) {
  const bar = document.getElementById("barFill");
  const percent = Math.min(score * 5, 100);

  bar.style.width = percent + "%";

  if (score < 10) bar.style.background = "#22c55e";
  else if (score < 20) bar.style.background = "#facc15";
  else bar.style.background = "#ef4444";
}

function generateInsights({ loops, conditions, functions, score }) {
  const insights = [];

  if (loops >= 2 && conditions >= 2) {
    insights.push("🔥 Nested control flow → high cognitive complexity");
  }

  if (loops > 1) {
    insights.push("Reduce nested loops → improves performance significantly");
  }

  if (conditions > 2) {
    insights.push("Too many branches → consider switch or function split");
  }

  if (functions === 0) {
    insights.push("No modularization → break into functions");
  }

  if (score >= 20) {
    insights.push("Refactor into smaller units → improves maintainability");
  }

  if (score < 10) {
    insights.push("Code is clean and efficient");
  }

  const list = document.getElementById("insights");
  list.innerHTML = "";

  insights.forEach(text => {
    const li = document.createElement("li");
    li.innerText = text;
    list.appendChild(li);
  });
}

function generateSummary(score) {
  let summary;

  if (score < 10) {
    summary = "Low complexity. Code is efficient.";
  } else if (score < 20) {
    summary = "Moderate complexity. Optimization possible.";
  } else {
    summary = "High complexity. Refactor strongly recommended.";
  }

  document.getElementById("summary").innerText = summary;
}

// 🔥 GRAPH ENGINE

function renderComplexityGraph(detectedBigO) {
  const n = [1,2,3,4,5,6,7,8,9,10];

  const showN = document.getElementById("toggleN")?.checked;
  const showN2 = document.getElementById("toggleN2")?.checked;
  const showLog = document.getElementById("toggleLog")?.checked;

  let datasets = [];

  const getData = (type) => {
    if (type === "O(n)") return n;
    if (type === "O(n²)") return n.map(x => x*x);
    if (type === "O(n³)") return n.map(x => x*x*x);
    return n.map(() => 1);
  };

  datasets.push({
    label: `Detected: ${detectedBigO}`,
    data: getData(detectedBigO),
    borderWidth: 3
  });

  if (showN) datasets.push({ label: "O(n)", data: n });
  if (showN2) datasets.push({ label: "O(n²)", data: n.map(x => x*x) });
  if (showLog) datasets.push({ label: "O(log n)", data: n.map(x => Math.log2(x+1)) });

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("tcChart"), {
    type: "line",
    data: { labels: n, datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "white" } }
      },
      scales: {
        x: { ticks: { color: "white" } },
        y: { ticks: { color: "white" } }
      }
    }
  });
}

// 🔥 UTILS

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[tag]));
}

// 🔥 SAMPLE + CLEAR

function loadSample() {
  document.getElementById("codeInput").value = `
int main() {
  for(int i=0;i<n;i++){
    for(int j=0;j<n;j++){
      if(i==j){
        cout<<i;
      }
    }
  }
}`;
}

function clearCode() {
  document.getElementById("codeInput").value = "";
  document.getElementById("codeDisplay").innerHTML = "";
}

function generateRefactorSuggestions({ loops, conditions, functions, score, bigO }) {
  const suggestions = [];

  // 🔥 PERFORMANCE FIXES
  if (loops >= 2) {
    suggestions.push("Reduce nested loops → consider using hash maps or precomputation (can reduce O(n²) → O(n))");
  }

  if (bigO === "O(n³)") {
    suggestions.push("High time complexity → try breaking triple nested loops or using better algorithms");
  }

  // 🔥 STRUCTURE FIXES
  if (conditions > 3) {
    suggestions.push("Too many conditions → replace if-else chain with switch or polymorphism");
  }

  if (functions === 0) {
    suggestions.push("No functions → split code into smaller reusable functions");
  }

  // 🔥 MAINTAINABILITY
  if (score >= 20) {
    suggestions.push("Break large logic into smaller modules → improves readability and debugging");
  }

  if (loops >= 2 && conditions >= 2) {
    suggestions.push("Avoid nested control flow → flatten logic or use early returns");
  }

  // 🔥 FALLBACK
  if (suggestions.length === 0) {
    suggestions.push("Code structure is good. No major refactoring needed.");
  }

  const list = document.getElementById("refactorList");
  list.innerHTML = "";

  suggestions.forEach(text => {
    const li = document.createElement("li");
    li.innerText = text;
    list.appendChild(li);
  });
}