let uploadResultDiv = document.getElementById("uploadResult");
let folderName = null;
document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector(".loader").style.display = "block";
    // Disable the upload button
    document.getElementById("uploadButton").disabled = true;

    const formData = new FormData(this);
    folderName = formData.get("folderName");
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Hide spinner after upload is complete
        document.querySelector(".loader").style.display = "none";
        uploadResultDiv.innerHTML = data.link;
      })
      .catch((error) => {
        document.querySelector(".loader").style.display = "none";
        uploadResultDiv.innerHTML = error.message;
      })
      .finally(() => {
        // Disable the upload button
        document.getElementById("uploadButton").disabled = false;
      });
  });

const copyLinkBtn = document.querySelector(".btn-copy-link");
copyLinkBtn.addEventListener("click", copyLink);

function copyLink() {
  const url = location.href;
  if (folderName) {
    const link = `${url}uploads/${folderName}`;
    navigator.clipboard.writeText(link);
    alert("Link Copied to the clipboard");
  }
}
