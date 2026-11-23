const contactForm = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const contactData = {
    name,
    email,
    message
  };

  try {
    const response = await fetch("http://localhost:9002/api/submit-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    });

    const result = await response.json();

    if (response.ok) {
      responseMessage.textContent = "Contact submitted successfully!";
      responseMessage.style.color = "green";
      contactForm.reset();
    } else {
      responseMessage.textContent = result.message || "Something went wrong!";
      responseMessage.style.color = "red";
    }

  } catch (error) {
    responseMessage.textContent = "Server connection failed!";
    responseMessage.style.color = "red";
    console.log(error);
  }
});
