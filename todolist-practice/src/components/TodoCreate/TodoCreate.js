import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import {
  CircleButton,
  Input,
  InsertForm,
  InsertFormPositioner,
} from './TodoCreate.styled';

export default function TodoCreate() {
  const [open, setOpen] = useState(false);
  const onToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm>
            <Input placeholder="write your todos..." />
          </InsertForm>
        </InsertFormPositioner>
      )}

      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}
