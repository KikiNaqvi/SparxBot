document.getElementById("getSelection").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getSelectedText
        }, (results) => {
            if (results && results[0] && results[0].result) {
                document.getElementById("selectedText").textContent = results[0].result;
            } else {
                document.getElementById("selectedText").textContent = "No text selected.";
            }
        });
    });
});

document.getElementById("solveQuestion").addEventListener("click", () => {
    const question = document.getElementById("selectedText").textContent;
    if (question && isMathQuestion(question)) {
        fetchMathAnswer(question);
    } else {
        document.getElementById("answerText").textContent = "Not a math question.";
    }
});

function getSelectedText() {
    return window.getSelection().toString().trim();
}

document.getElementById("solveQuestion").addEventListener("click", () => {
    const question = document.getElementById("selectedText").textContent;
    console.log("Selected Question:", question);  // Debugging line

    if (question && isMathQuestion(question)) {
        console.log("Detected as Math Question:", question);  // Debugging line
        fetchMathAnswer(question);
    } else {
        document.getElementById("answerText").textContent = "Not a math question.";
    }
});

function isMathQuestion(text) {
    // Improved regex to detect numbers, math symbols, and common words
    const mathPattern = /(\d+\s*[\+\-\*\/\^]\s*\d+)|(\bplus\b|\bminus\b|\btimes\b|\bmultiplied\b|\bdivided\b|\bpercentage\b|\bsquared\b|\bcubed\b|\bsquare root\b)/i;
    return mathPattern.test(text);
}

document.getElementById("getSelection").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getSelectedText
        }, (results) => {
            if (results && results[0] && results[0].result) {
                document.getElementById("selectedText").textContent = results[0].result;
            } else {
                document.getElementById("selectedText").textContent = "No text selected.";
            }
        });
    });
});

document.getElementById("solveQuestion").addEventListener("click", () => {
    const question = document.getElementById("selectedText").textContent;
    if (question) {
        fetchCohereAnswer(question);
    } else {
        document.getElementById("answerText").textContent = "No text selected.";
    }
});

function getSelectedText() {
    return window.getSelection().toString().trim();
}

function fetchCohereAnswer(text) {
    const apiKey = "t6X3R8ldgOQpEAukjDNsV5pvLT80kHLfeCmZ5i9Q"; // Replace with your Cohere API key

    fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "command-xlarge-nightly",
            prompt: text,
            max_tokens: 100
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.generations && data.generations.length > 0) {
            document.getElementById("answerText").textContent = data.generations[0].text.trim();
        } else {
            document.getElementById("answerText").textContent = "Couldn't get an answer.";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("answerText").textContent = "Error fetching answer.";
    });
}
