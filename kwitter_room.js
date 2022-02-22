
const firebaseConfig = {
  apiKey: "AIzaSyD00PMxIvKTC7Pb7lj6ymzIm4tQxiv--U4",
  authDomain: "chat-web-app-63e69.firebaseapp.com",
  databaseURL: "https://chat-web-app-63e69-default-rtdb.firebaseio.com",
  projectId: "chat-web-app-63e69",
  storageBucket: "chat-web-app-63e69.appspot.com",
  messagingSenderId: "923481120051",
  appId: "1:923481120051:web:02e511d8959a61e1a53246"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function addRoom() {

  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "add room name"
  });

  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";

}

function getData() {
  firebase.database().ref("/").on('value',
    function (snapshot) {
      document.getElementById("output").innerHTML =
      ""; snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childKey;
        //Start code

        console.log("Room Name = " + room_name);

        row = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirect(this.id)'># " + Room_names + "</div><hr>";
        document.getElementById("output").innerHTML += row;

        //End code
      });
    });
}
getData();

function redirect(name) {

  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html"

}

user_name = localStorage.getItem("name");

document.getElementById("name").innerHTML = "user_name";

function logout() {

	localStorage.removeItem("user_name");
	localStorage.removeItem("room_name");
	window.location = "index.html";

}