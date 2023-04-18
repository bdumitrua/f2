import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./components/components.scss";

import Header from "./components/Header";
import Speech from "./components/Speech";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Speech />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
