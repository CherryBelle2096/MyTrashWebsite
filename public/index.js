firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("schedule_div").style.display = "none";
	document.getElementById("trashbin_div").style.display = "none";
    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
	  var string1 = 'admin@gmail.com'
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
	  if(string1.localeCompare(email_id)!=0){
		  logout();
	  }
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("schedule_div").style.display = "none";
	document.getElementById("trashbin_div").style.display = "none";
  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function schedule(){
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("schedule_div").style.display = "block";
	document.getElementById("trashbin_div").style.display = "none";
}

function attemptCreate(){
	var year = document.getElementById("year_field").value;
	var month = document.getElementById("month_field").value;
	var day = document.getElementById("day_field").value;	
	var type = document.getElementById("type_field").value;	
    var schedule = document.getElementById("time_field").value;
	writeUserData('Schedule',year,month,day,type,schedule);
	backtoHome();
}

function attemptTrash(){
	var id = document.getElementById("id_field").value;
	var lat = document.getElementById("lat_field").value;
	var lon = document.getElementById("lon_field").value;	
	writeUserDataTrashbin('Trashbin',id,lat,lon);
	backtoHome();
}

function backtoHome(){
	document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("schedule_div").style.display = "none";
	document.getElementById("trashbin_div").style.display = "none";
    clearInputs();	
}

function trashbin(){
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("schedule_div").style.display = "none";
	document.getElementById("trashbin_div").style.display = "block";	
}

function logout(){
  firebase.auth().signOut();
  clearInputs();
}

function writeUserData(datafield, year, month, day, typeTrash, schedule) {
  firebase.database().ref(datafield + '/' + year + '/' + month+ '/' + day + '/').set({
    time: schedule,
    type: typeTrash
  });
}

function writeUserDataTrashbin(datafield, id, lat, lon) {
  firebase.database().ref(datafield + '/' + id + '/').set({
    latitude: lat,
    longitude: lon
  });
}

function clearInputs(){
	document.getElementById('email_field').value = '';
	document.getElementById('password_field').value = '';
	
	document.getElementById('year_field').value = '';
	document.getElementById('month_field').value = '';
	document.getElementById('day_field').value = '';
	document.getElementById('type_field').value = '';
	document.getElementById('time_field').value = '';
	
	document.getElementById('lat_field').value = '';
	document.getElementById('lon_field').value = '';
	document.getElementById('id_field').value = '';	
}
