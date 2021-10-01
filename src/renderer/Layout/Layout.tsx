import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TitleBar from '../components/TitleBar/TitleBar';
import mainRoutes from '../routes/mainRoutes';

const styles = (theme: Theme) =>
	createStyles({
		'@global': {
			'.success': {
				color: 'green',
			},
		},
		app: {
			display: 'flex',
			backgroundColor: theme.palette.background.default,
			height: '100vh',
		},
		mainPage: {
			position: 'absolute',
			width: '100%',
			top: '29px',
			height: 'calc(100vh - 29px)',
			// flexGrow: 1,
			// paddingBottom: 0,

			// height: '97vh',
			// overflowY: 'auto',
			overflow: 'hidden',
		},
	});

type ComponentProps = WithStyles<typeof styles>;

type ComponentState = Record<string, never>;

class App extends React.Component<ComponentProps, ComponentState> {
	switchRoutes = (passedProps: any): React.ReactElement => {
		const toReturn = (
			<Switch>
				{mainRoutes.map((prop, key) => {
					return (
						<Route
							key={key}
							path={prop.path}
							render={(props) => <prop.component {...props} {...passedProps} />}
						/>
					);
				})}
			</Switch>
		);
		return toReturn;
	};

	//============== Notifier ====================

	//======================= Page Render ========================

	render(): React.ReactElement {
		const { classes } = this.props;
		return (
			<div className={classes.app}>
				<TitleBar />
				<div className={classes.mainPage}>
					<HashRouter>{this.switchRoutes({})}</HashRouter>
				</div>
				{[1, 2, 3, 4].map((el) => (
					<div>{el}</div>
				))}
			</div>
		);
	}
}

export default withStyles(styles)(App);
