import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer"

const INITIAL_STATE = {
	user: {
		"_id": "61294cb2d6d4f7f5da6f1a1d",
		"username": "mohit",
		"email": "mohit@gmail.com",
		"password": "$2b$10$46I4bCFbcZcz4GwI1xrZXO89vd.Vqt2N0CgoUC7/rYlruVVtb3lFe",
		"profilePicture": "",
		"coverPicture": "",
		"follower": [],
		"following": [
			"61293fc4e5733b2912544bd5",
			"6129479c1ec0780bfc2d4e67"
		],
		"isAdmin": false,
		"createdAt": "2021-08-27T20:36:02.042Z",
		"updatedAt": "2021-09-09T22:33:40.619Z",
		"__v": 0
	},
	isFetching: false,
	error: false,
};
const AuthContext = createContext(INITIAL_STATE);
function AuthContextProvider(props) {

	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	return (
		<AuthContext.Provider value={{
			user: state.user,
			isFetching: state.isFetching,
			error: state.error,
			dispatch,
		}}>
			{props.children}
		</AuthContext.Provider>
	)
}

export { AuthContext ,AuthContextProvider};