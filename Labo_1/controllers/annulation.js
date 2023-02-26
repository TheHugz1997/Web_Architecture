const annulationButton = document.getElementById("annulation");

annulationButton.addEventListener("click", () => {
  // Send a request to the server to clear the session
  fetch("/clearSession")
    .then(() => {
      // Redirect to the main page
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
    });
});