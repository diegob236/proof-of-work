import { createStore } from "redux";
import reducer from './reducer'

// Create store
const store = createStore(reducer, { email: "", loggedIn: false })
store.subscribe(() => console.log(store.getState()))

export default store;