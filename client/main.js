const base = 'http://localhost:3000'

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

function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token;

    $.ajax({
        url:`${base}/users/googleSign`,
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