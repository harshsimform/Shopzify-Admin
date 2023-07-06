import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import { Props } from "../../interface/interface";

const FormikControl: React.FC<Props> = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
