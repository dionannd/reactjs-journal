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
        outline: {
          color: "gray.600",
          borderWidht: "1px",
          borderColor: "gray.500",
          _hover: {
            boxShadow: "md",
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
