const compareBtn = document.getElementById("compare-btn");
const clearBtn = document.getElementById("clear-btn");
const expectedText = document.getElementById("expected");
const actualText = document.getElementById("actual");
const resultContainer = document.getElementById("result");

compareBtn.addEventListener("click", function () {

    resultContainer.innerHTML = "";

    const expectedValue = expectedText.value.trim();
    const actualValue = actualText.value.trim();

    if (expectedValue === "" && actualValue === "") {
        const li = document.createElement("li");
        li.textContent = "Please enter text in both areas.";
        resultContainer.appendChild(li);
        return;
    }

    const expectedLines = expectedValue.split("\n");
    const actualLines = actualValue.split("\n");

    const ol = document.createElement("ol");
    ol.id = "differences";

    let differencesFound = false;

    if (expectedLines.length !== actualLines.length) {
        const li = document.createElement("li");
        li.textContent = `Line count differs: Expected (${expectedLines.length}) vs Actual (${actualLines.length})`;
        ol.appendChild(li);
        differencesFound = true;
    }

    const maxLength = Math.max(expectedLines.length, actualLines.length);

    for (let i = 0; i < maxLength; i++) {
        const expLine = expectedLines[i] || "";
        const actLine = actualLines[i] || "";

        if (expLine !== actLine) {
            const li = document.createElement("li");
            li.textContent = `Line ${i + 1} differs:\nExpected: ${expLine}\nActual:   ${actLine}`;
            ol.appendChild(li);
            differencesFound = true;
        }
    }

    if (differencesFound) {
        ol.classList.add("change");

        const message = document.createElement("p");
        message.textContent = "Texts are different";
        message.classList.add("change");

        resultContainer.appendChild(message);
        resultContainer.appendChild(ol);
    } else {
        ol.classList.add("nochange");

        const li = document.createElement("li");
        li.textContent = "No differences found";
        ol.appendChild(li);

        resultContainer.appendChild(ol);
    }
});

clearBtn.addEventListener("click", function () {
    expectedText.value = "";
    actualText.value = "";
    resultContainer.innerHTML = "";
});