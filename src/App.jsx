import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import ProductDetail from "./pages/ProductDetail";
import NavComponent from "./components/NavComponent";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "./store/slices/products.slice";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Footer from "./components/Footer";
import "./index.css";
function App() {
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state.isLoading);

	useEffect(() => {
		dispatch(getProductsThunk());
	}, []);

	return (
		<HashRouter>
			<NavComponent />
			<Container
				fluid
				className="mt-5 px-lg-5 px-3"
				style={{ paddingBottom: "15em" }}
			>
				{isLoading && <Loading />}
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Home />} />
					<Route path="/shop/:id" element={<ProductDetail />} />

					<Route element={<ProtectedRoutes />}>
						<Route path="/purchases" element={<Purchases />} />
					</Route>
				</Routes>
			</Container>
			<Footer />
		</HashRouter>
	);
}

export default App;
