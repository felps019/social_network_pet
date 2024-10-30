import React from 'react';

const types = {
  email: {
    regex:  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido',
  },
  password: {
    regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/,
    message: 'A senha precisa ter 1 caracter maiúsculo, 1 minúsculo e 1 dígito. Com no mínimo 8 caracteres.'
  }
};

//O type é o tipo do formulario, Ex: qndo for criar o const em outra funcao e passar o useForm("Email") entao seria o tipo
const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(value) {
    //Verifica se o tipo foi definido ou nao
    //Se passar como false, ele nao valida se o campo esta vazio/aplica regex
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
      //Verifica se existe o tipo que quero validar(confere na validacao acima)
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({target}){
    if(error) validate(target.value);
    setValue(target.value);
  }

  return {
    // Fazendo isso a pessoa pode ter acesso as funcoes/estados
    value, setValue, onChange, error, 
    // O validate ativa o metodo do valor do validate, sendo assim sendo necessario passar apenas o useForm();
    validate: () => validate(value), onBlur: () => validate(value)
  };
};

export default useForm
