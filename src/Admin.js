import React,{useEffect,useState} from "react";
import './App.css'
import Posts from './components/adminblog/posts'
import axiosInstance from "./axios";

function Admin() {
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	// Upload data from posts to Admin
	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div className="App">
			<h1>Admin System</h1>
			<Posts isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default Admin;