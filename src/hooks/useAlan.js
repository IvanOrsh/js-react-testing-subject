import { useEffect, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectGenreOrCategory,
  searchMovie,
} from "../features/currentGenreOrCategory";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { logout } from "./useAuth";
import { fetchToken } from "../utils";

const alanAiKey = import.meta.env.VITE_APP_ALAN_AI_KEY;

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    alanBtn({
      key: `${alanAiKey}/stage`,
      position: "fixed",
      bottom: "50px",
      right: "50px",
      zIndex: 10,
      onCommand: async (commandData) => {
        if (commandData && commandData.command === "changeMode") {
          setMode(commandData.mode);
        }

        if (commandData && commandData.command === "login") {
          await fetchToken();
        }

        if (commandData && commandData.command === "logout") {
          logout();
        }

        if (commandData && commandData.command === "chooseGenre") {
          const { genreOrCategory, genres } = commandData;
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase(),
          );
          if (foundGenre) {
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            navigate("/");
            dispatch(selectGenreOrCategory(category));
          }
        }

        if (commandData && commandData.command === "search") {
          navigate("/");
          dispatch(searchMovie(commandData.query));
        }
      },
    });
  }, []);
};

export default useAlan;
