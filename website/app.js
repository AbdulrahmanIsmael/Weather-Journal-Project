//API key with the API Url
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=",
  apiKey = "&appid=1698fc79b86c121119d449a6e94438b5&units=imperial";

/* get the button from DOM */
const generate = document.querySelector("#generate");

// Create a new date instance dynamically with JS
let currentDate =
  new Date().getMonth() +
  1 +
  " / " +
  new Date().getDate() +
  " / " +
  new Date().getFullYear();

// Event Click
generate.addEventListener("click", () => {
  const zipCode = document.querySelector("#zip").value;
  //* check if the user typed the zipcode | error message
  if (zipCode.toString() === "") {
    document.querySelector(".title").style.display = "none";
    document.getElementById("zip").style.border = "2px solid #fc3149";
    document.getElementById("date").innerHTML = "";
    document.getElementById("temp").innerHTML = "";
    document.getElementById("content").innerHTML = "";
    document.getElementById("wrong").style.display = "block";
  } else {
    document.querySelector(".title").style.display = "none";
    document.getElementById("zip").style.border = "1px solid #666";
    document.getElementById("date").innerHTML = "";
    document.getElementById("place").innerHTML = "";
    document.getElementById("temp").innerHTML = "";
    document.getElementById("content").innerHTML = "";
    document.getElementById("wrong").style.display = "none";

    // Showing the results
    getData(baseUrl + zipCode + apiKey)
      .then((data) => {
        postData("/new", data);
      })
      .then(() => {
        updateUi("/WeatherData");
      });
  }
});

//TODO: Post The Data to post route "/new"
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const results = await response.json();
    return results;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//TODO: Get The Data
const getData = async (url) => {
  const response = await fetch(url);
  try {
    const resultData = await response.json();
    return resultData;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//TODO:Update The UI
const updateUi = async (url) => {
  const fetchData = await fetch(url);
  try {
    const weatherData = await fetchData.json();
    const feelings = document.querySelector("#feelings").value;
    // set styles
    document.querySelector(".title").style.display = "block";
    document.querySelector(".title").style.marginBottom = "20px";
    document.querySelector("#place").style.marginTop = "10px";
    document.querySelector("#place").style.marginBottom = "10px";
    document.querySelector("#temp").style.marginBottom = "10px";
    document.querySelector("#temp").style.marginTop = "10px";
    document.querySelector("#entryHolder").style.borderRadius = "20px";
    document.querySelector("#entryHolder").style.padding = "10px 20px";

    // show the results on the page
    document.querySelector(
      "#date"
    ).innerHTML = `<span class="st">Date:</span> ${currentDate}`;
    document.querySelector(
      "#place"
    ).innerHTML = `<span class="st">Place:</span> ${weatherData["Weather Data"].name}`;
    document.querySelector(
      "#temp"
    ).innerHTML = `<span class="st">Temperature:</span> ${weatherData["Weather Data"].main.temp} degrees`;
    if (feelings === "") {
      document.querySelector(
        "#content"
      ).innerHTML = `<span class="st">Feelings:</span> No Feelings`;
    } else {
      document.querySelector(
        "#content"
      ).innerHTML = `<span class="st">Feelings:</span> ${feelings}`;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
