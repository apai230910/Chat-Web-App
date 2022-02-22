//YOUR FIREBASE LINKS

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

user_name = localStorage.getItem("name");
room_name = localStorage.getItem("room_name");

function getData() {
	firebase.database().ref("/" + room_name).on('value', function (snapshot) {
		document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
			childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
				firebase_message_id = childKey;
				message_data = childData;
				//Start code

				name = message_data['name'];
				message = message_data['message'];
				like = message_data['like'];

				name_with_tag = "<h4>&nbsp"+ name +" <img src = 'tick.png' class = 'user_tick'></h4>";
				message_with_tag = "<h4 class = 'message_h4'>"+message+"</h4>";
				like_button = "<button class = 'btn btn-warning' id = "+firebase_message_id+" onclick = 'update_like(this.id)'>";
				span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>&nbsp;Like : "+like+"</span></button>"
				row = name_with_tag + message_with_tag + like_button + span_with_tag;
				document.getElementById("output").innerHTML += row;

				//End code
			}
		});
	});
}
getData();

function send() {

	msg = document.getElementById("msg").value;

	firebase.database().ref(room_name).push({

		name: user_name,
		message: msg,
		like: 0

	});

	document.getElementById("msg").value = "";

}

function update_like(message_id) {

	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;

	firebase.database().ref(room_name).child(message_id).update ({

		like:updated_likes

	});

}

function logout() {

	localStorage.removeItem("room_name");
	localStorage.removeItem("name");
	window.location = "index.html";

}