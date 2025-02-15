import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/storage";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// 	apiKey: "AIzaSyD-B2OSxOWoCJTaPZ0-s8Y5HsWTKBp9J5o",
// 	authDomain: "fir-sample-c473f.firebaseapp.com",
// 	projectId: "fir-sample-c473f",
// 	storageBucket: "fir-sample-c473f.appspot.com",
// 	messagingSenderId: "698817229901",
// 	appId: "1:698817229901:web:3207797834a704bcc09804",
// 	measurementId: "G-VXDPSG56C8",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDN-tRgrk2vg347lu2tkCSRGpyuuj55_fw",
  authDomain: "fir-itss2.firebaseapp.com",
  projectId: "fir-itss2",
  storageBucket: "fir-itss2.appspot.com",
  messagingSenderId: "94396810322",
  appId: "1:94396810322:web:44a24eb720cc50061c4b8b",
  measurementId: "G-613BP5JECR"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
	try {
		const snapshot = await db.collection("todos").get();
		const items = snapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		return {
			success: true,
			items: items
		}
	} catch (err) {
		console.log(err);
		return {
			success: false,
			items: []
		}
	}
};

export const addFirebaseItem = async (item) => {
	try {
		const todoRef = db.collection("todos");
		await todoRef.add(item);
	} catch (err) {
		console.log(err);
	}
};

export const updateFirebaseItem = async (item, id) => {
	try {
		const todoRef = db.collection("todos").doc(id);
		await todoRef.update(item);
	} catch (err) {
		console.log(err);
	}
};

export const clearFirebaseItem = async (item) => {
	const todoRef = db.collection("todos").doc(item.id);
	await todoRef
		.delete()
		.then(function () {})
		.catch(function (err) {
			console.log(err);
		});
};

export const uiConfig = {
	signInFlow: "popup",
	signInSuccessUrl: "/",
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export const storeUserInfo = async (user) => {
	const { uid } = user;
	const userDoc = await db.collection("users").doc(uid).get();
	if (!userDoc.exists) {
		await db.collection("users").doc(uid).set({ name: user.displayName });
		return {
			name: user.displayName,
			id: uid,
		};
	} else {
		return {
			id: uid,
			...userDoc.data(),
		};
	}
};

export const updateUser = async (user, image) => {
	try {
		const userDoc = await firebase
			.firestore()
			.collection("users")
			.doc(user.id)
			.get();
		if (userDoc.exists) {
			await firebase
				.firestore()
				.collection("users")
				.doc(user.id)
				.update({ ...userDoc.data(), image: image });
		}
	} catch (err) {
		console.log(err);
	}
};

export const uploadImage = async (image) => {
	// let downloadUrl = "";
	// try {
	// 	const ref = firebase.storage().ref().child(`/images/${image.name}`);
	// 	await ref.put(image);
	// 	downloadUrl = await ref.getDownloadURL();
	// } catch (err) {
	// 	console.log(err);
	// }
	// return downloadUrl;
	 // Create a root reference
    const storage = getStorage(app);
    // Create a reference to 'mountains.jpg'
    const mountainsRef = ref(storage, `images/${image.name}`);
    await uploadBytesResumable(mountainsRef, image)
    const imageUrl = await getDownloadURL(mountainsRef)
    return imageUrl
};
