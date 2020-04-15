function getCoords() {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { longitude, latitude } = coords
    console.log(longitude, latitude)
    window.location.replace(`/?lng=${longitude}&lat=${latitude}`)
  });
}

// call api to our server => get weather value => render using innerHTML
// > refresh this page with query {location} // bad way
if (window.location.search.split("?").length <= 1) {
  getCoords()
} 