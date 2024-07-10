import { createContext, useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const DropdownContext = createContext();
function DropdownProvider(props) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  const errors = props.errors || {};

  const form = useForm();
  const values = { show, setShow, toggle, form, errors };
  return (
    <DropdownContext.Provider value={values}>
      <FormProvider {...form}>{props.children}</FormProvider>
    </DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === 'undefined')
    throw new Error('useDropdown must be used within DropdownProvider');
  return context;
}
export { useDropdown, DropdownProvider };
