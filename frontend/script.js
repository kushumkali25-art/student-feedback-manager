const API_URL = "https://student-feedback-manager-1-sz15.onrender.com/api/feedback";

const feedbackForm = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");
const viewFeedbackBtn = document.getElementById("viewFeedbackBtn");
const message = document.getElementById("message");


feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const feedbackData = {
        name: document.getElementById("name").value.trim(),
        rating: Number(document.getElementById("rating").value),
        comment: document.getElementById("comment").value.trim()
    };

    try {
        message.textContent = "Submitting feedback...";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Submission failed");
        }

        message.textContent = "Feedback submitted successfully!";
        message.style.color = "green";

        feedbackForm.reset();

        await loadFeedback();

    } catch (error) {
        console.error(error);
        message.textContent = error.message;
        message.style.color = "red";
    }
});

viewFeedbackBtn.addEventListener("click", loadFeedback);

API
async function loadFeedback() {
    try {
        feedbackList.textContent = "Loading feedback...";

        const response = await fetch(API_URL);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to load feedback");
        }

        const feedbacks = result.feedbacks;

        feedbackList.innerHTML = "";

        if (!feedbacks || feedbacks.length === 0) {
            feedbackList.textContent = "No feedback available yet.";
            updateStats([]);
            return;
        }

        feedbacks.forEach((feedback) => {
            const card = document.createElement("div");
            card.className = "feedback-card";

            const name = document.createElement("h3");
            name.textContent = feedback.name;

            const rating = document.createElement("p");
            rating.textContent = `Rating: ${feedback.rating}/5 ⭐`;

            const comment = document.createElement("p");
            comment.textContent = feedback.comment;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete Feedback";
            deleteButton.className = "delete-btn";

            deleteButton.addEventListener("click", () => {
                deleteFeedback(feedback._id);
            });

            card.append(name, rating, comment, deleteButton);
            feedbackList.appendChild(card);
        });

        updateStats(feedbacks);

    } catch (error) {
        console.error("Error loading feedback:", error);
        feedbackList.textContent = "Unable to load feedback. Please check server.";
    }
}

function updateStats(feedbacks) {
    document.getElementById("totalFeedback").textContent =
        feedbacks.length;

    const average = feedbacks.length
        ? feedbacks.reduce((sum, item) => sum + item.rating, 0) /
          feedbacks.length
        : 0;

    document.getElementById("averageRating").textContent =
        average.toFixed(1) + " ⭐";
}


async function deleteFeedback(id) {
    const confirmed = confirm("Are you sure you want to delete this feedback?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Delete failed");
        }

        message.textContent = "Feedback deleted successfully!";
        message.style.color = "green";

        await loadFeedback();

    } catch (error) {
        console.error(error);
        message.textContent = error.message;
        message.style.color = "red";
    }
}


loadFeedback();