import React, {useState} from 'react';

const useValidation = () => {
  const [isValid, setIsValid] = useState(false);
  
  const lengthCheck = (words) =>{
    if( 2 <= words.length && words.length <= 10 ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }
  return { isValid, lengthCheck };
};

export default useValidation;