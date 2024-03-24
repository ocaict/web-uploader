(async () => {
  const users = await (await fetch("./users")).json();
  displayUsers(users);
})();

const displayUsers = (users) => {
  users.sort(function (a, b) {
    return b.score - a.score;
  });

  const resultList = document.getElementById("result-list");

  users.forEach((user) => {
    const resultCard = document.createElement("div");
    resultCard.classList.add("result-card");

    const resultHeader = document.createElement("div");
    resultHeader.classList.add("result-header");

    const resultId = document.createElement("div");
    resultId.classList.add("result-id");
    resultId.textContent = `#${user.id}`;

    const resultDate = document.createElement("div");
    resultDate.classList.add("result-date");
    resultDate.textContent = `Date: ${user.date}`;

    resultHeader.appendChild(resultId);
    resultHeader.appendChild(resultDate);

    const resultBody = document.createElement("div");
    resultBody.classList.add("result-body");

    const resultInfo = document.createElement("div");
    resultInfo.classList.add("result-info");

    const fullName = document.createElement("p");
    fullName.innerHTML = `<strong>Full Name:</strong> ${user.fullName}`;

    const email = document.createElement("p");
    email.innerHTML = `<strong>Email:</strong> ${user.email}`;

    const courseTitle = document.createElement("p");
    courseTitle.innerHTML = `<strong>Course Title:</strong> ${user.courseTitle}`;

    const score = document.createElement("p");
    score.innerHTML = `<strong>Score:</strong> ${user.score}`;

    resultInfo.appendChild(fullName);
    resultInfo.appendChild(email);
    resultInfo.appendChild(courseTitle);
    resultInfo.appendChild(score);

    resultBody.appendChild(resultInfo);

    resultCard.appendChild(resultHeader);
    resultCard.appendChild(resultBody);

    resultList.appendChild(resultCard);
  });
};
