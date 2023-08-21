import "./App.css";
import LoginPage from "./Layouts/Pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Layouts/Pages/HomePage";
import CrudDemoPage from "./Layouts/Pages/CrudDemoPage";
import Layout from "./Layouts/Components/Layout";
import "rsuite/styles/index.less"; // or 'rsuite/dist/rsuite.min.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/HomePage"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/CrudDemoPage"
          element={
            <Layout>
              <CrudDemoPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
