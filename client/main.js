
const baseUrl = 'http://localhost:3050'

let globalMusicId;

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
    $('#edit-todo-form-container').hide()
  } else {
    $('#login-page').show()
    $('#home-page').hide()
    $('#register-page').hide()
  }
}

function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token;

    $.ajax({
        url:`${baseUrl}/users/googleSign`,
        method:'POST',
        data:{googleToken}
    })
    .done(res => {
        localStorage.setItem('token',res.token)
        checkLogin();
    })
    .fail(err => {
        console.log(err.responseJSON.errors)
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.clear()
  checkLogin()
}

// Todo

function fetchMusic() {
  const unfinishedContainer = $('#unfinished-container')
  const finishedContainer = $('#finished-container')

  $.ajax({
    url: `${baseUrl}/musics`,
    method: "get",
    headers: {
      token: localStorage.token 
    }
  })
  .done(data => {
    unfinishedContainer.empty()
    finishedContainer.empty()
    data.musics.forEach(music => {
      if(music.status === 'not finished'){
        unfinishedContainer.append(`
          <div class="shadow p-4 mt-3 bg-warning">
            <p><b>${music.song}</b></p>
            <p>${music.artist}</p>
            <p>${music.genre}</p>
            <div class="d-flex justify-content-around mt-3">
              <button onclick="deleteTodo(${music.id})" class="btn btn-danger mr-2">Delete</button>
              <button onclick="showEditForm(${music.id}, '${music.song}', '${music.artist}', '${music.genre}')" class="btn btn-primary mr-2">Edit</button>
              <button onclick="updateStatus(${music.id}, 'finished')" class="btn btn-success">Done</button>
            </div>
          </div>
        `)
      } else if (music.status === 'finished') {
        finishedContainer.append(`
          <div class="shadow p-4 mt-3 bg-warning">
            <p><b>${music.title}</b></p>
            <p>${music.description}</p>
            
            <div class="d-flex justify-content-around mt-3">
              <button onclick="deleteTodo(${music.id})" class="btn btn-danger mr-2">Delete</button>
              <button onclick="showEditForm(${music.id}, '${music.song}', '${music.artist}', '${music.genre}')" class="btn btn-primary mr-2">Edit</button>
              <button onclick="updateStatus(${music.id}, 'not finished')" class="btn btn-secondary">Undone</button>
            </div>
          </div>
        `)
      }
    });
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

function postMusic(event) {
  event.preventDefault()
  const song = $('#add-song').val()
  const artist = $('#add-artist').val()
  const genre = $('#add-genre').val()
  console.log(title)
  $.ajax({
    url: `${baseUrl}/musics`,
    method: "post",
    headers: {
      token: localStorage.token 
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
  .done(data => {
    $('#music-title').val('')
    $('#music-description').val('')
    $('#music-due').val('')
    showSuccessMessage('Music has been created')
    fetchMusic()
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}

function updateStatus(id, status) {
  $.ajax({
    url: `${baseUrl}/musics/${id}`,
    method: "patch",
    headers: {
      token: localStorage.token 
    },
    data: {
      status
    }
  })
  .done(data => {
    showSuccessMessage('Music status has been updated')
    fetchMusic()
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}



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
          'Your task has been deleted.',
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

// ALERT

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
}

function goToRegister() {
  $("#register-email").val('');
  $("#register-password").val('');
  $("#register-page").show()
  $("#login-page").hide()
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

