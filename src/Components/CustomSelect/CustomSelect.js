import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../theme";

const CustomSelect = ({ inputLabel, inputLabelId, labelId, id, value, handleChange, items }) => {
    const useStyles = makeStyles(theme => ({

        formControl: {
            margin: (inputLabelId === "qty-select-label") ? 0 : theme.spacing(1),
            marginRight: (inputLabelId === "qty-select-label") ? 0 : theme.spacing(5),
            minWidth: (inputLabelId === "qty-select-label") ? 30 : 120,
            borderRadius: 0,
            position: 'relative',
            zIndex: 0,
        },

        selectEmpty: {
            borderRadius: 0,
            '& .MuiSelect-selectMenu': {
                /* min-height: 1.1876em; */
                minHeight: '1px'
            },
            marginTop: theme.spacing(0)
        },
        menuPaper: {
            borderRadius: 0,
            maxHeight: 190
        },
    }));



    const classes = useStyles();

    return (
        <div>
            <ThemeProvider theme={theme} >
                <FormControl className={classes.formControl} variant={(inputLabelId === "qty-select-label") ? "outlined" : "standard"}>
                    {(inputLabelId !== "qty-select-label") && <InputLabel id={inputLabelId}>{inputLabel}</InputLabel>}
                    <Select
                        labelId={labelId}
                        id={id}
                        value={value}
                        onChange={handleChange}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                        {Object.entries(items).map(([key, value]) =>
                            <MenuItem
                                key={key}
                                value={id === "select-genre" ? key : value}
                            >
                                {key}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
            </ThemeProvider>
        </div>
    );
};

export default CustomSelect;