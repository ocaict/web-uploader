document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the URL of the uploaded web app
        var uploadResultDiv = document.getElementById("uploadResult");
        uploadResultDiv.innerHTML = data.link;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
