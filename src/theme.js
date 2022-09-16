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
                // select: {
                //     ['@media (max-width:445px)']: { // eslint-disable-line no-useless-computed-key
                //         width: '2.7rem',
                //     }
                // },

                icon: {
                    color: "#333e48",
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
                    fontSize: "12px",
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
            }, MuiFormLabel: {
                root: {
                    color: "#333e48"
                }
            }, MuiInput: {
                underline: {
                    "&:before": {
                        borderBottom: "1px solid #333e48",
                    }
                }
            }
        }
    },
    globalTheme
);

export default theme;
