//File to hold all functions that loads and return data

export function getGradeAverage(grades) {
    let convertedAverage = 0;
    grades.forEach((e) => {
      if (e.grade.toUpperCase() === "A") {
        convertedAverage += 5;
      } else if (e.grade.toUpperCase() === "B") {
        convertedAverage += 4;
      } else if (e.grade.toUpperCase() === "C") {
        convertedAverage += 3;
      } else if (e.grade.toUpperCase() === "D") {
        convertedAverage += 2;
      } else {
        convertedAverage += 1;
      }
    });
    return convertedAverage / grades.length;
  }

export async function loadRestaurant(id) {
  let apiURL = `https://dry-lowlands-75857.herokuapp.com/api/restaurants/${id}`;
  const res = await fetch(apiURL);
  if (!res.ok) {
    throw new Error(`error loading ${id} (${res.status})`);
  }
  return res.json();
}

export async function loadApi(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }
  return res.json();
}


