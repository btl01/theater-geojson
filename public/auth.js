var config = {
  apiKey: 'AIzaSyBtEB6bKcnYGtNHfixun-dmkyITYRqN6Oo',
  authDomain: 'theater-map-423db.firebaseapp.com',
  projectId: 'theater-map-423db',
  storageBucket: 'theater-map-423db.appspot.com',
  messagingSenderId: '670271982367',
  appId: '1:670271982367:web:91ba89a3d21f9dc703fe2a',
}

var uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      if (authResult.user) {
        handleSignedInUser(authResult.user)
      }
      return false
    },
    signInFailure: function (error) {},
  },

  autoUpgradeAnonymousUsers: true,
}

var ui
$(document).ready(function () {
  firebase.initializeApp(config)
  ui = new firebaseui.auth.AuthUI(firebase.auth())
  ui.start('#firebaseui-auth-container', uiConfig)
  firebase.auth().onAuthStateChanged(function (user) {
    user ? handleSignedInUser(user) : handleSignedOutUser()
    $('#login-spinner').addClass('d-none')
  })
})

function handleSignedInUser(user) {
  $('.user').removeClass('d-none')
  $('.guest').addClass('d-none')

  $('#name').text(user.displayName)
  $('#email').text(user.email)
  $('#phone').text(user.phoneNumber)
  if (user.photoURL) {
    $('.avatar').attr('src', user.photoURL)
  } else {
    $('.avatar').attr('src', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDQ0PDg0PDw4NDQ8ODg0ODw8NDQ4NFREWIhcXFx8YHSggGBooGxUVITUtMSk3Li4uFx8zOzMsQyo5NSsBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAG4AbgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQGAgUD/8QAMRAAAgECAgcFCAMAAAAAAAAAAAECAxEEBRIhMTJRUmEiQXGBwRNCYnKRobHRBjOi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AN6AAAAAAAAAAAAAAAAAAAAAAAAWMNg6lXcjdcz1RLWU5f7V6c9xPZzP9GgjFJJJWS2JakgPEhkUu+pFeCbOauR1FuyjLpriz3gBkK1CVN2nFxfXvPma+vRjUi4zV0/qvAzOPwjozs9cXrjLiv2BWAAAAAAAAOoRcpJLa2kvFnJZy3++l86A09CkoQjFbIqx2AAJIJAFHN6GnRlxh2l5bfsXTmquzK+zRf4AxwAAAAAAAB3RqaE4y5ZJ/RnAA2UJJpNbGk0+h0eLkuPVlSm7cjf4PZAkAgCSrmVbQozfe1orxZZk7K7dktrexIzebY720rR3I7PifECgAAAAAAAAAetlOWadqlRdn3Y83V9AKuDy6pW1paMeZ+nE0WGounFRc5Tt3ytc+qViQBBIApZjg3WjZVHG3u+6317zPYnCzpO0424Pan4GuOK1KM4uMldPuAxwLmY4F0ZcYS3Zej6lMAAAAAAu5XhPbVNe5HXLrwRplqKeU4f2dGPGXafns+xdAgAkCASAIAJA+WJoxqQcJbGvNPiZSvSdOcoS2xdjXnjfyDD7tRfLL09QPFAAA+uGp6dSEeaSXlc+RdydXxFPppP/ACwNMgSAIBIAgEgCASAIK+Y0tOjUXwtrxWv0LJDV1bjqAxgDAH//2Q==')
  }
  $('#modal-login').modal('hide')
}

function handleSignedOutUser() {
  ui.start('#firebaseui-auth-container', uiConfig)
  $('.user').addClass('d-none')
  $('.guest').removeClass('d-none')
}
