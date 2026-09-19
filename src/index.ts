import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";

const app = document.getElementById("app");

if (!app) {
  throw new Error("App root element was not found");
}

const title = document.createElement("h1");
title.textContent = "Система Управління Бібліотекою";
title.className = "text-center mt-4";

app.appendChild(title);
