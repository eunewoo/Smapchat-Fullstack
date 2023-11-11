
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import CreatePage from "../components/pages/CreatePage/CreatePage";
import MyMapsPage from "../components/pages/MyMapsPage/MyMapsPage";
import HomePage from "../components/pages/Home/HomePage";
import ViewMapPage from "../components/pages/ViewMapPage";
import MapEditPage from "../components/pages/MapEditPage/MapEditPage";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="create-page" element={<CreatePage />} />
      <Route path="my-maps-page" element={<MyMapsPage />} />
      <Route path="view-map-page" element={<ViewMapPage/>}/>
      <Route path="map-edit-page" element={<MapEditPage/>}/>
    </Route>
  )
);
