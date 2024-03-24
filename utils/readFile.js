const fs = require("fs/promises");

const readFile = async (path) => {
  const data = await fs.readFile(path, "utf-8");
  if (!data) return null;
  return JSON.parse(data);
};

const writeFile = async (path, data) => {
  const result = await fs.writeFile(path, JSON.stringify(data));
  console.log(result);
};

module.exports = { readFile, writeFile };
