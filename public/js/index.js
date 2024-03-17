let uploadResultDiv = document.getElementById("uploadResult");
document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector(".loader").style.display = "block";

    const formData = new FormData(this);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the URL of the uploaded web app
        // Hide spinner after upload is complete
        document.querySelector(".loader").style.display = "none";
        uploadResultDiv.innerHTML = data.link;
      })
      .catch((error) => {
        document.querySelector(".loader").style.display = "none";
        console.error("Error:", error);
      });
  });
