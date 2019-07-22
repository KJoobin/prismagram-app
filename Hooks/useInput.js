import { useState } from 'react';

const useInput = defaultValue => {
  const [ value, setValue ] = useState(defaultValue)

  const onChangeText = e => {
    setValue(e);
  }
  return { value, onChangeText }
}

export default useInput;
