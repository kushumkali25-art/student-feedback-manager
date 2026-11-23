const API_URL = "http://localhost:9003/api";

const progressForm = document.getElementById("progressForm");
const progressList = document.getElementById("progressList");

progressForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const progressData = {
        studentName: document.getElementById("studentName").value.trim(),
        courseName: document.getElementById("courseName").value.trim(),
        completionPercentage: Number(
            document.getElementById("completionPercentage").value
        )
    };

    if (!progressData.studentName || !progressData.courseName) {
        alert("Please enter student name and course name.");
        return;
    }

    if (
        !Number.isFinite(progressData.completionPercentage) ||
        progressData.completionPercentage < 0 ||
        progressData.completionPercentage > 100
    ) {
        alert("Completion percentage must be between 0 and 100.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/add-progress`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(progressData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || result.message || "Unable to add progress"
            );
        }

        alert("Student progress added successfully!");

        progressForm.reset();

        await loadProgress();

    } catch (error) {
        console.error("Error adding progress:", error);
        alert("Error adding progress: " + error.message);
    }
});

async function loadProgress() {
    try {
        const response = await fetch(`${API_URL}/progress`);

        const records = await response.json();

        if (!response.ok) {
            throw new Error(
                records.error || records.message || "Unable to fetch progress"
            );
        }

        progressList.innerHTML = "";

        if (records.length === 0) {
            progressList.textContent = "No progress records found.";
            return;
        }

        records.forEach((record) => {
            const card = document.createElement("div");
            card.className = "progress-card";

            const heading = document.createElement("h3");
            heading.textContent = record.studentName || "Unknown Student";

            const course = document.createElement("p");
            course.textContent = `Course: ${record.courseName || "-"}`;

            const percentage = document.createElement("p");
            percentage.textContent =
                `Completion: ${record.completionPercentage ?? 0}%`;

            const date = document.createElement("p");
            date.textContent =
                `Last Updated: ${
                    record.lastUpdated
                        ? new Date(record.lastUpdated).toLocaleDateString()
                        : "-"
                }`;

            const progressBar = document.createElement("div");
            progressBar.className = "progress-bar";

            const progressFill = document.createElement("div");
            progressFill.className = "progress-fill";

            const completion = Number(record.completionPercentage) || 0;
            progressFill.style.width = `${completion}%`;

            progressBar.appendChild(progressFill);

            card.appendChild(heading);
            card.appendChild(course);
            card.appendChild(percentage);
            card.appendChild(date);
            card.appendChild(progressBar);

            progressList.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading progress:", error);
        progressList.textContent = "Unable to load progress: " + error.message;
    }
}

loadProgress();
