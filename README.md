# 🚀 Code Complexity Analyzer

An interactive static analysis tool that evaluates code complexity, highlights problem areas, and provides actionable refactor suggestions — all in real time.

---


🔗 Live Demo: https://code-complexity-analyzer.netlify.app

## 🔥 What makes this different?

Most student projects:
> show metrics

This tool:
> detects issues → explains them → suggests improvements → visualizes impact

---

## ⚡ Key Features

### 📊 Complexity Analysis
- Counts lines, functions, loops, and conditions
- Computes a custom complexity score
- Estimates **Time Complexity (Big-O)**

---

### 🎯 Visual Code Feedback
- Highlights problematic lines directly in code
- Classifies severity:
  - ⚠️ Warning (loops, conditions)
  - 🔴 Critical (nested complexity)

---

### 💡 Smart Insights Engine
- Detects patterns like:
  - Nested loops
  - Excessive branching
  - Lack of modularization
- Provides human-readable explanations

---

### 🔧 Auto Refactor Suggestions (Core Feature)
- Suggests real improvements like:
  - Replace nested loops → use hash map
  - Convert if-else chains → switch
  - Break code into functions
- Focused on **performance + maintainability**

---

### 📈 Time Complexity Visualizer
- Displays detected complexity graph
- Compare with:
  - O(n)
  - O(n²)
  - O(log n)
- Interactive toggle system

---

### 🧪 Code Quality Score
- Assigns a quality score (0–100)
- Based on complexity + structure

---

## 🧠 How It Works

- Uses **regex-based static analysis**
- Identifies structural patterns:
  - loops
  - conditions
  - functions
- Applies heuristic scoring model
- Generates insights + suggestions dynamically

---

## 🛠 Tech Stack

- HTML (UI structure)
- CSS (custom developer-style UI)
- JavaScript (analysis engine + visualization)
- Chart.js (complexity graphs)

---

## 📸 Demo Flow

1. Paste code  
2. Click **Analyze**  
3. See:
   - Highlighted problem areas  
   - Complexity metrics  
   - Big-O estimation  
   - Refactor suggestions  
   - Graph visualization  

---

## 🚧 Limitations

- Regex-based (not full AST parsing)
- Approximate Big-O estimation
- Designed for educational and analysis purposes

---

## 🔮 Future Improvements

- AST-based parsing (accurate analysis)
- Multi-language support
- Auto refactored code generation
- GitHub code integration
- Export analysis report

---

## ⭐ Why This Project Stands Out

- Goes beyond metrics → provides **actionable improvements**
- Combines **analysis + visualization + guidance**
- Designed with **developer UX in mind**

---

## 📌 Author

Built as a practical tool to understand code quality, complexity, and optimization strategies.