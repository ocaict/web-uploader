const express = require("express");
const multer = require("multer");
const extract = require("extract-zip");
const path = require("path");
const fs = require("fs-extra");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3600;

// MiddleWares
app.use(cors());
// Serve static files from the 'uploads' directory
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define upload route
app.post("/upload", upload.single("zipFile"), async (req, res) => {
  if (!fs.existsSync("uploads")) {
    await fs.mkdir("uploads");
  }

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const folderName = req.body.folderName;

  if (!folderName) {
    return res.status(400).send("File name is required.");
  }

  const extractDir = path.join(__dirname, "uploads", folderName);

  try {
    // Ensure that the directory exists, create if it doesn't
    await fs.ensureDir(extractDir);

    // Save the uploaded zip file to the disk
    const zipFilePath = path.join(extractDir, req.file.originalname);
    await fs.writeFile(zipFilePath, req.file.buffer);

    // Extract the zip file
    await extract(zipFilePath, { dir: extractDir });
    // Construct the URL for the uploaded web app
    const link = `upload/${folderName}/`;
    await fs.unlink(zipFilePath);
    // Serve the uploaded web app URL
    return res.send(serveHtml({ link }));
  } catch (err) {
    console.error("Error uploading file:", err);
    return res.status(500).send("Error uploading file.");
  }
});

// Serve uploaded web apps dynamically based on folder name
app.get("/upload/:folderName", (req, res) => {
  const folderName = req.params.folderName;
  const filePath = path.join(__dirname, "uploads", folderName, "index.html");

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist
      return res.status(404).sendFile(__dirname + "/public/404.html");
    }
    // File exists, serve it

    return res.redirect(`/uploads/${folderName}`);
  });
});

app.all("*", (req, res) => {
  return res.sendFile(__dirname + "/public/404.html");
});

function serveHtml({ link }) {
  return {
    link: `
    <a
      style="
        text-decoration: none;
        font-size: 20px;
        padding: 10px;
        color: darkcyan;
        cursor: pointer;
      "
      href="./${link}"
      target="_blank"
      rel="noopener noreferrer"
      >View Your App</a
    >
`,
  };
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
