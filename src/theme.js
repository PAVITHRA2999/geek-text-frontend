import { createMuiTheme } from "@material-ui/core/styles";

const globalTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#7A9EA7"
        }
    }
});

const theme = createMuiTheme(
    {
        overrides: {
            MuiSelect: {
                root: {
                    fontSize: "14px",
                },
            },
            MuiButton: {
                root: {
                    backgroundColor: globalTheme.palette.primary.main,
                    fontSize: "14px",
                },
                label: {
                    color: globalTheme.palette.primary.contrastText
                }
            },
            MuiInputBase: {
                root: {
                    fontSize: "14px",
                    color: "#333e48",
                },
            },
            MuiMenuItem: {
                root: {
                    fontSize: "14px",
                    color: "#333e48",
                },
            },
            MuiOutlinedInput: {
                root: {
                    borderRadius: "0px",
                    fontSize: "14px",
                    borderColor: globalTheme.palette.primary.main,
                    "&:hover $notchedOutline": {
                        borderColor: globalTheme.palette.primary.main,
                    },
                    "&$focused $notchedOutline": {
                        borderColor: globalTheme.palette.primary.main,
                    },
                    "& .MuiOutlinedInput-input": {
                        padding: "10.5px 10px",
                    },
                }
            },
        }
    },
    globalTheme
);

export default theme;
