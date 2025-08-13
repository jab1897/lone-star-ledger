import { createBrowserRouter } from "react-router-dom";
import Overview from "@/pages/Overview"; import MapExplorer from "@/pages/MapExplorer";
export const router = createBrowserRouter([{ path:"/", element:<Overview/> }, { path:"/map", element:<MapExplorer/> }]);
