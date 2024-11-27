document
  .getElementById("fetchBtn")
  .addEventListener("click", fetchUniversities);
document.getElementById("resetBtn").addEventListener("click", resetResults);

let savedUniversities =
  JSON.parse(localStorage.getItem("savedUniversities")) || [];
let lastSearch = JSON.parse(localStorage.getItem("lastSearch")) || [];
updateCounter();
if (lastSearch.length > 0) displayUniversities(lastSearch);

async function fetchUniversities() {
  const country = document.getElementById("countryInput").value.trim();
  if (!country) {
    alert("Please enter a country name.");
    return;
  }

  const apiUrl = `http://universities.hipolabs.com/search?country=${country}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Data not found.");
    const universities = await response.json();
    localStorage.setItem("lastSearch", JSON.stringify(universities));
    displayUniversities(universities);
  } catch (error) {
    alert("Error fetching data: " + error.message);
  }
}

function displayUniversities(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (data.length === 0) {
    resultDiv.innerHTML = "<p>No universities found for this country.</p>";
    return;
  }

  let tableHTML =
    "<table><tr><th>#</th><th>University Name</th><th>Website</th><th>Save</th></tr>";
  data.forEach((university, index) => {
    const isChecked = savedUniversities.includes(university.name)
      ? "checked"
      : "";
    tableHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${university.name}</td>
                <td><a href="${
                  university.web_pages[0]
                }" target="_blank">Visit</a></td>
                <td><input type="checkbox" class="save-checkbox" data-name="${
                  university.name
                }" ${isChecked}></td>
            </tr>
        `;
  });
  tableHTML += "</table>";
  resultDiv.innerHTML = tableHTML;

  document.querySelectorAll(".save-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", toggleSave);
  });
}

function toggleSave(event) {
  const universityName = event.target.getAttribute("data-name");
  if (event.target.checked) {
    if (!savedUniversities.includes(universityName)) {
      savedUniversities.push(universityName);
    }
  } else {
    const index = savedUniversities.indexOf(universityName);
    if (index > -1) {
      savedUniversities.splice(index, 1);
    }
  }
  localStorage.setItem("savedUniversities", JSON.stringify(savedUniversities));
  updateCounter();
}

function resetResults() {
  document.getElementById("countryInput").value = "";
  document.getElementById("result").innerHTML = "";
  localStorage.removeItem("lastSearch");
}

function updateCounter() {
  document.getElementById(
    "counter"
  ).innerText = `Saved Universities: ${savedUniversities.length}`;
}
