import React, { useState } from 'react';

import YDialog from '../../styles/dialog/YDialog';
import YButton from '../../styles/button/YButton';

const YDialogActor = ({
  children,
  color,
  size,
  outline,
  fullwidth,
  title,
  State,
  Component,
  confirmText,
  cancelText,
  onConfirm,
  ...rest
}) => {
  const [dialog, setDialog] = useState(false);
  const onClick = () => {
    setDialog(true);
  };

  const onCancel = () => {
    setDialog(false);
  };

  return (
    <div>
      <YButton
        color={color}
        size={size}
        outline={outline}
        fullwidth={fullwidth}
        onClick={onClick}
        {...rest}
      >
        {children}
      </YButton>
      <YDialog
        title={title}
        State={State}
        Component={Component}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={onConfirm}
        onCancel={onCancel}
        visible={dialog}
      />
    </div>
  );
};

export default YDialogActor;
