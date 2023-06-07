import { themeChange } from 'theme-change';
import { useNavigate } from '@solidjs/router';
import initializeApp from './app/init';
import { createEffect, createSignal, lazy } from 'solid-js';
import { Routes, Route, Navigate } from '@solidjs/router';
import checkAuth from './app/auth';
import { Show } from 'solid-js';

// Importing pages
const Login = lazy(() => import('./pages/Login'));
const Layout = lazy(() => import('./containers/Layout'));

// Initializing different libraries
initializeApp();

// Check for login and initialize axios

const App = () => {
	const [token, setToken] = createSignal(checkAuth());
	const navigate = useNavigate();
	createEffect(() => {
		themeChange(false);
	});

	return (
		<>
			<Routes>
				<Show when={token()}>
					<Route
						path='/app/*'
						element={<Layout />}
					/>
				</Show>
				<Route
					path='/login'
					element={<Login />}
				/>
			</Routes>
		</>
	);
};

export default App;

// For a replica set, include the replica set name and a seedlist of the members in the URI string; e.g.
// const uri = 'mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017/?replicaSet=myRepl'
// For a sharded cluster, connect to the mongos instances; e.g.
// const uri = 'mongodb://mongos0.example.com:27017,mongos1.example.com:27017/'
// const client = new MongoClient(uri);
// await client.connect();
// // Prereq: Create collections.
// await client
// 	.db('mydb1')
// 	.collection('foo')
// 	.insertOne({ abc: 0 }, { writeConcern: { w: 'majority' } });
// await client
// 	.db('mydb2')
// 	.collection('bar')
// 	.insertOne({ xyz: 0 }, { writeConcern: { w: 'majority' } });
// // Step 1: Start a Client Session
// const session = client.startSession();
// // Step 2: Optional. Define options to use for the transaction
// const transactionOptions = {
// 	readPreference: 'primary',
// 	readConcern: { level: 'local' },
// 	writeConcern: { w: 'majority' },
// };
