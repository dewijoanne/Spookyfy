const baseUrl = 'http://localhost:3050'

let globalMusicId


$(document).ready(function() {
  checkLogin()
})

// AUTHENTICATION

function signUp(event) {
  event.preventDefault()
  let email = $("#register-email").val();
  let password = $("#register-password").val();

  $.ajax({
    url: `${baseUrl}/users/register`,
    method: "post",
    data: {
      email,
      password
    }
  })
  .done(data => {
    showSuccessToastMessage('Your account has been created')
    goToLogin()
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}

function login(event) {
  event.preventDefault()
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  $.ajax({
    url: `${baseUrl}/users/login`,
    method: "post",
    data: {
      email,
      password
    }
  })
  .done(data => {
    localStorage.setItem("token", data.token)
    showSuccessToastMessage('Login successful')
    checkLogin()
  })
  .fail(err => {
    console.log(err.responseJSON.errors)
    showErrorToastMessage(err.responseJSON.errors.join(', '))
  })
  .always(() => {
    $("#login-email").val('');
    $("#login-password").val('');
  })
}

function checkLogin() {
  if (localStorage.token) {
    $('#home-page').show()
    $('#login-page').hide()
    $('#register-page').hide()
    $("#add-page").hide()
    $("#search-page").hide()
    fetchMusic()
  } else {
    $('#login-page').show()
    $('#home-page').hide()
    $('#register-page').hide()
    $("#add-page").hide()
    $("#search-page").hide()
  }
}

function onSignIn(googleUser) {
  var tokenGoogle = googleUser.getAuthResponse().id_token;
  console.log(tokenGoogle)

  $.ajax({
    url: baseUrl + '/users/googleSign',
    method: 'POST',
    data: {
      tokenGoogle
    }
  })
  .done(data => {
    localStorage.setItem("token", data.token)
    console.log(data.token,'ini token')
    checkLogin()
  })
  .fail(err => {
    console.log(err)
  })
}


function logout() {
  localStorage.clear()
  checkLogin()
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  .then( () => {
    console.log('User signed out.');
  })
  .catch(err =>{
      console.log(err.responseJSON.errors)
  })
}

//ALERT

function showSuccessMessage(message) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}

function showSuccessToastMessage(message) {
  Swal.fire({
    position: 'top',
    icon: 'success',
    toast: true,
    title: message,
    showConfirmButton: false,
    timer: 2000
  })
}

function showErrorToastMessage(message) {
  Swal.fire({
    position: 'top',
    icon: 'error',
    toast: true,
    title: message,
    showConfirmButton: false,
    timer: 3000
  })
}

// NAVIGATION

function goToLogin() {
  $("#login-email").val('');
  $("#login-password").val('');
  $("#login-page").show()
  $("#register-page").hide()
  $("#add-page").hide()
  $("#search-page").hide()
}

function goToRegister() {
  $("#register-email").val('');
  $("#register-password").val('');
  $("#register-page").show()
  $("#login-page").hide()
  $("#login-page").hide()
  $("#add-page").hide()
  $("#search-page").hide()
}

/*
function logout() {
  localStorage.clear()
  checkAuth()
}
*/

//FETCH MUSIC

function fetchMusic(){
  $.ajax({
    url: `${baseUrl}/songs`,
    method: 'get',
    headers:{
      token: localStorage.token
    }
  })

  .done(data => {
    getWeather()
    $('#container-music').empty()
    data.songs.forEach(music => {
      $('#container-music').append(`
      <li class="media bg-white rounded p-2 shadow mt-3">
            <div class="media-body p-1">
              <button onclick="deleteMusic(${music.id})" type="button" class="close float-right" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
                <h5 class="mt-0 mb-0">${music.title}</h5>
                <span class="text-muted">${music.artist}</span> 
                <span class="text-muted">${music.album}</span>
              <br>
              <audio controls>
              <source src="${music.preview}" type="audio/ogg">
              </audio>
            </div>
          </li>`)
    })
  })
  .fail(err => {
    console.log(err.responseJSON.errors, '<<< error login')
  })
  .always(_=>{
    $('#search-page').hide()
  })
}

//ADD PAGE MUSIC

function toAddPage() {
  $('#add-page').show()
  $('#search-page').show()
  $('#home-page').hide()
}

//ADD MUSIC

function addMusic(event){
  event.preventDefault()
  let title = $('#add-title').val()
  let artist = $('#add-artist').val()
  let album = $('#add-album').val()
  let preview = $('#add-sound').val()
  let lyrics = $('#add-lyrics').val()

  $.ajax({
    url: `${baseUrl}/songs/`,
    method:'post',
    headers: {
      token:localStorage.token
    },
    data:{title,artist,album,preview,lyrics}
  })
  .done(() => {
    fetchMusic()
    $('#home-page').show()
    $('#add-page').hide()
  })
  .fail(err => {
    console.log(err.responseJSON.errors, "<<< error login")
  })
  .always (() => {
     $('#add-title').val('')
    $('#add-artist').val('')
    $('#add-album').val('')
     $('#add-sound').val('')
    $('#add-lyrics').val('')
  })
}

//DELETE MUSIC

function deleteMusic(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
  .then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `${baseUrl}/songs/${id}`,
        method: "delete",
        headers: {
          token: localStorage.token 
        },
        data: {
          status
        }
      })
      .done(data => {
        Swal.fire(
          'Deleted!',
          'Your music has been deleted.',
          'success'
        )
        fetchMusic()
      })
      .fail(err => {
        showErrorToastMessage(err.responseJSON.errors.join('\n'))
      })
    }
  })  
}

function getWeather() {
  $.ajax({
    url: `${baseUrl}/weathers/`,
    method: 'GET',

  })
  .done(data => {
    const condition = data.weatherData.weather[0].main;
    const temperature = Math.floor((Number(data.weatherData.main.temp) - 270 )).toString() + '°C';
    const wind = (data.weatherData.wind.speed).toString() + 'm/s';
    const location = data.weatherData.name;
    const icon = data.weatherData.weather[0].icon
    //<img src="https://openweathermap.org/img/wn/03d@2x.png" alt="">

    $("#condition").text(condition)
    $("#temperature").text(temperature)
    $("#wind").text(`Wind speed:${wind}`)
    $("#location").text(`Welcome to ${location}`)
    $("#icon").prepend(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">`)
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}

let artist = null
let songname = null
 
function getLyric(){
  $.ajax({
    method: "GET",
    url: `http://localhost:3050/songs/${artist}/${songname}`,
    headers: {
      token: localStorage.token
    }
  })
  .done(result => {
    if(!result.lyrics.lyrics) {
      $('#add-lyrics').val('lyric is unavailable at this moment')
    } else {
      $('#add-lyrics').val(result.lyrics.lyrics);
    }
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}
 
 
function spotify(){
  const track = $("#search-keyword").val();
  $.ajax({
    method: "GET",
    url: `http://localhost:3050/songs/search/${track}`,
    headers: {
      token: localStorage.token
    }
  })
  .done(data => {
    artist = data.musicData.album.artists[0].name
    songname = data.musicData.name
    $('#add-artist').val(data.musicData.album.artists[0].name)
    $('#add-title').val(data.musicData.name)
    $('#add-album').val(data.musicData.album.name)
    $('#add-sound').val(data.musicData.preview_url)
    getLyric()
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}





// getLocation() => result.name
// getWeather() => cuaca sekarang, Clouds , result.weather[0].main
// getTemperature() => suhu feels like - 270 
// getWindSpeed() => wind.speed , => angka , nah tambahin m/s
