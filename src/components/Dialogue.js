import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { DialogTitle, DialogContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';


export default class Dialogue extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Dialog onClose={this.props.handleClose} aria-labelledby="customized-dialog-title" open={this.props.showState}>
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <FontAwesomeIcon icon={faDog} />
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="h2" style={{ fontWeight: '600', textAlign: 'center' }} gutterBottom>
                        BINGO!
                    </Typography>
                    <Typography gutterBottom>
                        You have found all the dog squares!
                    </Typography>
                </DialogContent>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={this.props.handleClose}>
                        Ruff!
                </Button>
            </Dialog>
        )
    }
}
