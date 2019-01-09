import React from 'react';
import {
  NavbarGroup,
  Button,
  Classes,
  Popover,
  Menu,
  MenuItem,
  Position,
} from '@blueprintjs/core';
import { connectAuthProvider } from 'mc-tf-test/modules/Auth';

export const UserDropdown = ({ user, logoutAction }) => (
  <NavbarGroup align="right">
    <Popover
      content={(
        <Menu>
          <MenuItem onClick={logoutAction} icon="log-out" text="Se déconnecter" />
          <MenuItem icon="wrench" text="Votre compte" />
        </Menu>
      )}
      position={Position.BOTTOM_LEFT}
    >
      <Button className={Classes.MINIMAL} icon="user" text={user.email} />
    </Popover>
  </NavbarGroup>
);

export default connectAuthProvider('authenticated', 'user', 'logoutAction')(UserDropdown);
