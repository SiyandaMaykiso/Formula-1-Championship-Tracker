const API_URL =
  "https://ergast.com/api/f1/current/driverStandings.json";
const API_CONSTRUCTORS_URL =
  "https://ergast.com/api/f1/current/constructorStandings.json";

async function getDriverStandings() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  } catch (error) {
    console.error(error);
  }
}

async function getConstructorStandings() {
  try {
    const response = await fetch(API_CONSTRUCTORS_URL);
    const data = await response.json();
    return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  } catch (error) {
    console.error(error);
  }
}

function createTableHeader() {
  const row = document.createElement("div");
  row.classList.add("table-row");
  const position = document.createElement("div");
  position.classList.add("table-header");
  position.textContent = "Position";
  const name = document.createElement("div");
  name.classList.add("table-header");
  name.textContent = "Name";
  const points = document.createElement("div");
  points.classList.add("table-header");
  points.textContent = "Points";
  row.appendChild(position);
  row.appendChild(name);
  row.appendChild(points);
  return row;
}

function createTableRow(position, name, points) {
  const row = document.createElement("div");
  row.classList.add("table-row");
  const positionCell = document.createElement("div");
  positionCell.textContent = position;
  const nameCell = document.createElement("div");
  nameCell.textContent = name;
  const pointsCell = document.createElement("div");
  pointsCell.textContent = points;
  row.appendChild(positionCell);
  row.appendChild(nameCell);
  row.appendChild(pointsCell);
  return row;
}

async function displayDriverStandings() {
  const driverStandings = await getDriverStandings();
  const container = document.createElement("div");
  container.id = "drivers-standings";
  const headerRow = createTableHeader();
  container.appendChild(headerRow);
  driverStandings.forEach((driver) => {
    const row = createTableRow(
      driver.position,
      `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      driver.points
    );
    container.appendChild(row);
  });
  document.body.appendChild(container);
}

async function displayConstructorStandings() {
  const constructorStandings = await getConstructorStandings();
  const container = document.createElement("div");
  container.id = "constructors-standings";
  const headerRow = createTableHeader();
  container.appendChild(headerRow);
  constructorStandings.forEach((constructor) => {
    const row = createTableRow(
      constructor.position,
      constructor.Constructor.name,
      constructor.points
    );
    container.appendChild(row);
  });
  document.body.appendChild(container);
}

displayDriverStandings();
displayConstructorStandings();
