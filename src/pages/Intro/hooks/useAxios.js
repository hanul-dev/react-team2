import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { initialTodos } from "../../../redux/modules/postSlice";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});

export const useAxios = (url) => {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await instance.get(`/${url}`);
      setLoading(false);
      dispatch(initialTodos(data));
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return { error, isLoading, getData };
};
