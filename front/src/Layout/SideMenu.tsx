import * as React from 'react';

import Drawer from '@material-ui/core/Drawer/Drawer';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Route from 'routes/route';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Link from '@material-ui/core/Link/Link';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
});

/** */
interface Props {
	list: Route[];
	open: boolean;
	toggle: Function;
}

const SideMenu: React.FC<Props> = ({ list, open, toggle }) => {
	const classes = useStyles();
	return (
		<>
			<Drawer anchor="left" open={open} onClose={() => toggle()}>
				<div
					className={classes.list}
					role="presentation"
					onClick={() => toggle()}
					onKeyDown={() => toggle()}
				>
					<List>
						{list.map((item, index) => (
							<Link href={item.path} key={index}>
								<ListItem button >
									<ListItemText primary={item.title} />
								</ListItem>
							</Link>
						))}
					</List>
				</div>
			</Drawer>
		</>
	);
};

export default SideMenu;

