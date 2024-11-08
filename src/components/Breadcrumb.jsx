import { Fragment } from 'react';
import Divider from '@mui/material/Divider';

export default function Breadcrumb({ children }) {
  const divider = <Divider orientation="vertical" variant="middle" flexItem />;

  if (children instanceof Array) {
    return children.filter(Boolean).map((crumb, index) => (
      <Fragment key={index}>
        {Boolean(index) && divider}
        {crumb}
      </Fragment>
    ));
  }

  return null;
}
