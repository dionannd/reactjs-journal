import { extendTheme, theme as defaultTheme } from "@chakra-ui/react";

const theme = extendTheme({
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    dark: {
      ...defaultTheme.colors.gray,
      500: "#1A202C",
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          background: "purple.500",
          color: "white",
          _hover: {
            background: "purple.600",
            boxShadow: "md",
          },
        },
        dark: {
          bg: "#000",
          color: "white",
          _hover: {
            bg: "#363636",
          },
        },
        "dark-outline": {
          bg: "#000000",
          color: "white",
          borderWidth: "1px",
          borderColor: "#000",
          _hover: {
            bg: "#fff",
            color: "black",
            borderWidth: "1px",
            borderColor: "#000",
          },
        },
        outline: {
          color: "gray.600",
          borderWidht: "1px",
          borderColor: "gray.500",
          _hover: {
            boxShadow: "md",
          },
        },
        "outline-logout": {
          background: "#fff",
          color: "red",
          borderWidth: "1px",
          borderColor: "red",
          borderRadius: "20px",
          _hover: {
            bg: "",
            color: "black",
            borderWidth: "1px",
            borderColor: "#000",
          },
        },
      },
    },
    Checkbox: {
      colorScheme: {
        dark: {
          background: "gray.800",
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        background: "gray.100",
        FontFace: "Inter",
      },
      ".pages-link": {
        padding: "0.6rem 0.4rem",
        margin: "0.3rem",
        color: "gray.800",
      },
      ".pages-number": {
        padding: "0.6rem 0.4rem",
        margin: "0.5rem",
        color: "gray.700",
      },
      ".page-items": {
        padding: "0.6rem 0.4rem",
      },
      ".pages-active": {
        borderRadius: "8px",
        background: "gray.800",
        color: "white",
        width: "auto",
      },
      ".pages-active-number": {
        color: "white",
      },
      ".next": {
        padding: "0.6rem 0.4rem",
      },
      ".previous": {
        padding: "0.6rem 0.4rem",
      },
    },
  },
});

export default theme;
