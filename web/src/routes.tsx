import { createBrowserRouter } from "react-router-dom";
import Overview from "@/pages/Overview";
import MapExplorer from "@/pages/MapExplorer";
import DistrictProfile from "@/pages/DistrictProfile";
import Compare from "@/pages/Compare";
import Download from "@/pages/Download";
import Methodology from "@/pages/Methodology";

export const router = createBrowserRouter([
  { path:"/", element:<Overview/> },
  { path:"/map", element:<MapExplorer/> },
  { path:"/compare", element:<Compare/> },
  { path:"/download", element:<Download/> },
  { path:"/methodology", element:<Methodology/> },
  { path:"/district/:id", element:<DistrictProfile/> }
]);
