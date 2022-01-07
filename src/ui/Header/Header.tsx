import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { useStyles } from './Header.styles';
import { ReactNode, useState } from 'react';

import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';
import {X} from 'react-feather'

export const Header = ({ children }: { children: ReactNode }) => {
  const { appBar, marquee, marqueeLink, marqueeClose } = useStyles();

  const [mhidden, setMHidden] = useState<boolean>(false)
  
  return (
    <>
      <AppBar className={appBar} elevation={0}>
        {!mhidden && <div>
          <Marquee className={marquee} gradient={false} pauseOnHover={true} >
            The second batch of
            <Link
              className={marqueeLink}
              to={'/subcollections/0xdea45e7c6944cb86a268661349e9c013836c79a2'}
            >
              Multiverse Art
            </Link>
            auction ends on Jan 8, 5:00 PM UTC.
          </Marquee>
          <X className={marqueeClose} onClick={() => {setMHidden(true)}}/>
        </div>}
        <Toolbar>{children}</Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
