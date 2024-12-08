export const validateEmail = (value) => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email address';
    return null;
  };
  
  export const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters long';
    return null;
  };
  
  export const validateUsername = (value) => {
    if (!value) return 'Username is required';
    if (value.length < 3) return 'Username must be at least 3 characters long';
    return null;
  };

  export const validatePhoneNumber = (value) => {
    if (!value) return 'Phone number is required';
    if (!/69\d{8}/.test(value)) return 'Invalid  phone number';
    return null;
  };

  export const matchPassword=(value,password)=>{
    if(!value) return 'Confirm password';
    if((value!==password))return 'Passwords must match';
    return null;
  };
  
  // Add more validation functions as needed
  