import { AppBar, createStyles, Grid, IconButton, Theme, Toolbar, withStyles, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import { CheckboxMultipleBlankOutline, Close, CropSquare, Minus } from 'mdi-material-ui';
import React from 'react';

const styles = (theme: Theme) =>
	createStyles({
		dragZone: {
			'-webkit-app-region': 'drag',
			'-webkit-user-select': 'none',
			flexGrow: 1,
		},
		toolbar: {
			minHeight: 'unset',
			padding: '2px!important',
		},
		controlButton: {
			padding: '0!important',
			minWidth: 'unset',
			width: '25px',
			height: '25px',
		},
		closeButton: {
			'&:hover': {
				// backgroundColor: theme.buttons.close,
				backgroundColor: 'red',
			},
		},
		controlIcon: {
			fontSize: '0.9em',
		},
	});

type ComponentProps = WithStyles<typeof styles>;

type ComponentState = {
	maximisedState: boolean;
};

class TitleBar extends React.Component<ComponentProps, ComponentState> {
	constructor(props: any) {
		super(props);
		this.state = {
			maximisedState: false,
		};
	}
	close = (event: React.SyntheticEvent) => {
		event.stopPropagation();
		window.ipcApi.windowControl.send('close', '');
	};

	minimise = (event: React.SyntheticEvent) => {
		event.stopPropagation();
		window.ipcApi.windowControl.send('minimise', '');
	};

	unmaximise = (event: React.SyntheticEvent) => {
		event.stopPropagation();
		this.setState({ maximisedState: false });
		window.ipcApi.windowControl.send('unmaximise', '');
	};

	maximise = (event: React.SyntheticEvent) => {
		event.stopPropagation();
		this.setState({ maximisedState: true });
		window.ipcApi.windowControl.send('maximise', '');
	};
	render(): React.ReactElement {
		const { classes } = this.props;
		return (
			<AppBar>
				<Toolbar variant='dense' className={classes.toolbar}>
					<Grid container spacing={0} justifyContent={'flex-end'} alignItems='stretch'>
						<Grid item className={classes.dragZone}></Grid>
						<Grid item>
							<IconButton size='small' onClick={this.minimise} className={classes.controlButton}>
								<Minus className={classes.controlIcon} />
							</IconButton>
						</Grid>
						<Grid item>
							{this.state.maximisedState ? (
								<IconButton size='small' onClick={this.unmaximise} className={classes.controlButton}>
									<CheckboxMultipleBlankOutline className={classes.controlIcon} />
								</IconButton>
							) : (
								<IconButton size='small' onClick={this.maximise} className={classes.controlButton}>
									<CropSquare className={classes.controlIcon} />
								</IconButton>
							)}
						</Grid>
						<Grid item>
							<IconButton
								size='small'
								onClick={this.close}
								className={classNames(classes.controlButton, classes.closeButton)}
							>
								<Close className={classes.controlIcon} />
							</IconButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		);
	}
}

export default withStyles(styles)(TitleBar);
