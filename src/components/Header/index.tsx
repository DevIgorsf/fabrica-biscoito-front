import styles from './Header.module.scss'
import logo from '../../images/Coplanet.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import * as React from 'react';
import Popover from '@mui/material/Popover';
import UserPopUp from './UserPopUp';
import { Link } from 'react-router-dom';


function Header() {

    const role = sessionStorage.getItem('role')


    
    //Pop Over
    const [anchorEl, setAnchorUser] = React.useState<HTMLAnchorElement | null>(null);


    const handleClickUser = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorUser(event.currentTarget);
    };


    const handleCloseUser = () => {
        setAnchorUser(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <header className={styles.header}>
            <div className={styles.header_logo}>
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>

            {  role === "ADMIN" ? (
                <ul className={styles.header_nav}>
                    <Link to="/">Home</Link>
                    <Link to="/graficos">Gráficos</Link>
                    <Link to="/estoque">Estoque</Link>
                </ul>
            ) : 
            (
                <ul className={styles.header_nav}>
                    <Link to="/">Home</Link>
                </ul>
            )}

            <div className={styles.user_icons}>
                <div className={styles.header_icons}>
                    <a onClick={handleClickUser}>
                        <FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
                    </a>
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleCloseUser}
                            anchorOrigin={{ vertical: 'bottom', horizontal: -50}}
                            anchorReference='anchorEl'>
                        <UserPopUp/>
                    </Popover>
                </div>
            </div>
        </header>
    )
}

export default Header