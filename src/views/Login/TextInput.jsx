import React from 'react';
import { useField } from 'formik';
import { Label, Input } from 'reactstrap';

import './style.scss';

export default function TextInput({ label, labelStrong, required, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <Label htmlFor={props.id || props.name}>
        {labelStrong ? <strong>{label}</strong> : <>{label}</>}
        {required && <span className="text-danger"> *</span>}
      </Label>
      <br />
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error mt-2">{meta.error}</div>
      ) : null}
    </>
  );
}