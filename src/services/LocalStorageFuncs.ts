interface localStorageProps {
  key: string;
  value: any;
}

export const setItem = (props: localStorageProps) => {
  localStorage.setItem(props.key, JSON.stringify(props.value));
};

export const getItem = (props: localStorageProps) => {
  return JSON.parse(localStorage.getItem(props.key) as string);
};
