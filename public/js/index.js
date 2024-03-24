let uploadResultDiv = document.getElementById("uploadResult");
document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector(".loader").style.display = "block";
    // Disable the upload button
    document.getElementById("uploadButton").disabled = true;

    const formData = new FormData(this);
    formData.append("email", "oluegwu@gmail.com");
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the URL of the uploaded web app
        // Hide spinner after upload is complete
        document.querySelector(".loader").style.display = "none";
        // uploadResultDiv.innerHTML = data.link;
        localStorage.setItem("url", `uploads/${formData.get("folderName")}`);
        location.reload();
      })
      .catch((error) => {
        document.querySelector(".loader").style.display = "none";
        console.error("Error:", error);
        uploadResultDiv.innerHTML = error.message;
      })
      .finally(() => {
        // Disable the upload button
        document.getElementById("uploadButton").disabled = false;
      });
  });

function showIframe() {
  const url = localStorage.getItem("url") || "./upload/olu";
  const iframe = document.getElementById("course-frame");
  iframe.src = url;
  const courseContainer = document.querySelector(".course-preview-container");
  courseContainer.classList.remove("hide");
}

showIframe();
