import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyDG4UwInJWCmztkK2nAIhqrLPJB5-H_FU4",
	authDomain: "socialify-8b5dd.firebaseapp.com",
	projectId: "socialify-8b5dd",
	// databaseURL: "fir-react-upload-5daa4.firebaseio.com",
	storageBucket: "socialify-8b5dd.appspot.com",
	messagingSenderId: "106617260750",
	appId: "1:106617260750:web:e0806af0c47ae445d59e9f",
	measurementId: "G-PTGDWZE2HZ"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };