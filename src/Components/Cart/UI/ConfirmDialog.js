import React from 'react'
import "./MessageDialog.css";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton } from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(25)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.error.light,
        '&:hover': {
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '4rem',
        }
    }
}))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles()

    return (

        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
            <IconButton disableRipple className={classes.titleIcon}>
                    <ErrorOutlineIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
              
                    <div className="cancel_cart_button">
                        <button
                            onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
                            Cancel
                    </button>
                    </div>
                    <div className="continue_cart_button">
                        <button
                            onClick={confirmDialog.onContinue}>
                            Continue
                    </button>
                    </div>
           
            </DialogActions>
        </Dialog>

    )
}