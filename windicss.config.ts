import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";

export default defineConfig({
  darkMode: "class",
  shortcuts: {
    btn: "bg-blue-400 hover:bg-opacity-90 text-white font-bold py-1 px-3 border-b-3 active:border-t-3 active:border-b-0 border-blue-500 rounded",
    input: "px-2 py-1 rounded text-md border-2 border-blue-400",
  },
  theme: {
    extend: {
      colors: {
        ...colors,
        "gray-1000-spotify": "#080707",
        "gray-950-spotify": "#191414",
        "gray-900-spotify": "#121212",
        "gray-800-spotify": "#1d1d1d",
        "gray-700-spotify": "#282828",
        "gray-600-spotify": "#333333",
        "gray-500-spotify": "#ABABAB",
        "gray-450-spotify": "#535353",
        "gray-400-spotify": "#bfbfbf",
      },
      fontSize: {
        xxs: "0.7rem",
      },
    },
  },
});
