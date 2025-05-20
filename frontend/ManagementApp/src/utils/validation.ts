export const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /\d/;
    
    return (
      password.length >= minLength &&
      hasUpperCase.test(password) &&
      hasNumber.test(password)
    );
  };