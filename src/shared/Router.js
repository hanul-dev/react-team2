import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "../pages/Intro/Intro";
import Detail from "../pages/Detail/Detail";
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;