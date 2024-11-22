function goToLandingPage() {
  const button = document.getElementById("btn-landingPage");
  button.addEventListener("click", () => {
    location.href = "localhost:3000";
  });
}

function goToLogin() {
  const button = document.getElementById("btn-login");
  button.addEventListener("click", () => {
    location.href = "localhost:3000/login";
  });
}

goToLandingPage();
goToLogin();
