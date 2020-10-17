import * as React from "react";
import { Button } from 'reactstrap';

export default function UIButton({ title, btnClickHandler }) {
  return (
    <Button 
      color="primary" 
      className="gradient-outline-btn mt-2"
      onClick={() => btnClickHandler()}
    >{title}</Button>
  );
}
