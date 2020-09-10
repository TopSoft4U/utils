import React from "react";

import {Dictionary} from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValue = any;
export type FormDictionary = Dictionary<FormValue>;

type UseForm = (initialState?: FormDictionary) => {
  form: FormDictionary;
  inputProps: (name: string) => { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: string; checked?: boolean; value?: FormValue };
  resetForm: () => void;
  handleFormChange: (key: string, value: FormValue) => void;
  setForm: (value: (((prevState: FormDictionary) => FormDictionary) | FormDictionary)) => void;
  handleFormChangeMulti: (obj: FormDictionary) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const useForm: UseForm = (initialState = {}) => {
  const [form, setForm] = React.useState(initialState);

  const handleFormChange = React.useCallback((key: string, value: FormValue) => {
    setForm(prevForm => ({...prevForm, [key]: value}));
  }, []);

  const handleFormChangeMulti = React.useCallback((obj: FormDictionary) => {
    setForm(prevForm => ({...prevForm, ...obj}));
  }, []);

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    if (!key)
      throw new Error("Attribute 'name' is not defined!");

    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    handleFormChange(key, value);
  }, [handleFormChange]);

  const resetForm = () => setForm(initialState);

  const inputProps = (name: string) => {
    const valProps: { checked?: boolean, value?: FormValue } = {checked: undefined, value: undefined};
    if (typeof form[name] === "boolean")
      valProps.checked = (form[name] as boolean) || false;
    else
      valProps.value = form[name] || "";

    return {name, onChange: handleInputChange, ...valProps};
  };

  return {
    form,
    handleFormChange,
    handleFormChangeMulti,
    handleInputChange,
    setForm,
    resetForm,
    inputProps,
  };
};

