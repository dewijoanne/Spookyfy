const baseUrl = 'http://localhost:3050'

let globalMusicId


$(document).ready(function() {
  checkLogin()
})

// AUTHENTICATION

function signUp(event) {
  console.log("abcd event")
  event.preventDefault()
  let email = $("#register-email").val();
  let password = $("#register-password").val();

  $.ajax({
    url: `${baseUrl}/register`,
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

function signIn(event) {
  event.preventDefault()
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  $.ajax({
    url: `${baseUrl}/login`,
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

  $.ajax({
    url: baseUrl + '/googleSign',
    method: 'POST',
    data: {
      tokenGoogle
    }
  })
  .done(data => {
    localStorage.setItem("token", data.token)
    checkLogin()
  })
  .fail(err => {
    console.log(err)
  })
}


function logout() {
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
    url: `${baseUrl}/musics`,
    method: 'get',
    header:{
      token: localStorage.token
    }
  })

  .done(data => {
    console.log(data, "<<< Data Music")
    $('#container-music').empty()
    data.musics.forEach(music => {
      $('#container-music').append(`
      <li class="media bg-white rounded p-2 shadow mt-3">
            <div class="media-body p-1">
              <button onclick="deleteMusic(${music.id})" type="button" class="close float-right" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <a href="${music.link}" class="text-decoration-none" target="_blank">
                <h5 class="mt-0 mb-0">${music.title}</h5>
              </a>
              <audio controls>
              <source src="${music.preview}" type="audio/ogg">
              </audio>
              <span class="text-muted">${music.artist}</span>
            </div>
          </li>`)
    })
  })
  .fail(err => {
    console.log(err.responseJSON.errors, '<<< error login')
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
  let preview = $('#add-preview').val()
  let lyrics = $('#add-lyrics').val()

  $.ajax({
    url: `${baseUrl}/musics`,
    method:'post',
    headers: {
      token:localStorage.token
    },
    data: {
      title,
      artist,
      album,
      preview,
      lyrics

    }
  })
  .done(() => {
    fetchMusic()
    $('#home-page').show()
    $('#add-page').hide()
  })
  .fail(err => {
    console.log(err.responseJSON.errors, "<<< error login")
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
        url: `${baseUrl}/musics/${id}`,
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
    const condition = data.weather[0].main;
    const temperature = Math.floor((Number(data.main.temp) - 270 )).toString() + 'degree celcius';
    const wind = (data.wind.speed).toString() + 'm/s';
    const location = data.name;

    $("#condition").val(condition)
    $("#temperature").val(temperature)
    $("#wind").val(wind)
    $("#location").val(location)
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}





// getLocation() => result.name
// getWeather() => cuaca sekarang, Clouds , result.weather[0].main
// getTemperature() => suhu feels like - 270 
// getWindSpeed() => wind.speed , => angka , nah tambahin m/s
