import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";

export default defineConfig({
  darkMode: "class",
  shortcuts: {
    "default-focus": "outline-none focus:outline-none focus-visible:ring-2 ",
    btn: "default-focus py-1 px-3 appearance-none bg-blue-400 hover:bg-opacity-90 text-white font-bold border-b-3 active:border-t-3 active:border-b-0 border-blue-500 rounded disabled:bg-blue-300 disabled:border-blue-400 disabled:cursor-not-allowed transition-all",
    input:
      "default-focus px-2 py-1 appearance-none rounded text-md border-2 border-blue-400 bg-transparent",
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
