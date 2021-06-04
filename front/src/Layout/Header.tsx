import React from "react"
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';

const Header: React.FC<{
	title: string,
	toggle: Function
}> = ({title, toggle}) => {
	return (<>
		<AppBar position="static">
			<Toolbar>
				<IconButton onClick={() => toggle()} edge="start"  color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" >
					{title}
    		</Typography>
			</Toolbar>
		</AppBar>
	</>)
}

export default Header;