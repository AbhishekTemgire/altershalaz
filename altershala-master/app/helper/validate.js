import { toast } from 'react-hot-toast';
import { authenticate } from './helper.js';

// Validate login page data
export async function validateLoginData(values) {
  const errors = validateLoginFields(values);
  return errors;
}

export async function validateLogins(values) {
  const errors = validateLogin(values);

  if (values.username) {
    const response = await authenticate(values.username);
    if (response.error) {
      errors.exist = toast.error(response.error);
    } else {
      const { status } = response;

      if (status !== 200) {
        errors.exist = toast.error('Invalid username or password');
      }
    }
  }



  return errors;
}


export async function validateusers(values) {
  const errors = validateuser(values);

  if (values.username) {
    // check user exist or not
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error('User does not exist...!')
    }
  }

  return errors;
}


// Validate  username
function validateuser(values) {
  const errors = {};

  if (!values.username) {
    errors.username = toast.error('Username is required!');
  } else if (values.username.includes(' ')) {
    errors.username = toast.error('Invalid Username!');
  }

  return errors;
}



// Validate signup username, email, and password fields
function validateLogin(values) {
  const errors = {};

  if (!values.username) {
    errors.username = toast.error('Username is required!');
  } else if (values.username.includes(' ')) {
    errors.username = toast.error('Invalid Username!');
  }



  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error('Password is required!');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('Invalid Password!');
  } else if (values.password.length < 8) {
    errors.password = toast.error('Password must be at least 4 characters long!');
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error('Password must have a special character!');
  }


  return errors;
}



// Validate signup page data
export async function validateSignupData(values) {
  const errors = validateSignupFields(values);
  return errors;
}


// Validate reset password data
export async function resetPasswordValidation(values) {
  const errors = {};


  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error('Password is required!');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('Invalid Password!');
  } else if (values.password.length < 8) {
    errors.password = toast.error('Password must be at least 4 characters long!');
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error('Password must have a special character!');
  }


  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error('Passwords do not match!');
  }

  return errors;
}

// Validate login email and password fields
function validateLoginFields(values) {
  const errors = {};

  if (!values.email) {
    errors.email = toast.error('Email is required!');
  } else if (values.email.includes(' ')) {
    errors.email = toast.error('Invalid Email!');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = toast.error('Invalid email address!');
  }

  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error('Password is required!');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('Invalid Password!');
  } else if (values.password.length < 8) {
    errors.password = toast.error('Password must be at least 4 characters long!');
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error('Password must have a special character!');
  }


  return errors;
}

// Validate signup username, email, and password fields
function validateSignupFields(values) {
  const errors = {};

  if (!values.username) {
    errors.username = toast.error('Username is required!');
  } else if (values.username.includes(' ')) {
    errors.username = toast.error('Invalid Username!');
  }

  if (!values.email) {
    errors.email = toast.error('Email is required!');
  } else if (values.email.includes(' ')) {
    errors.email = toast.error('Invalid Email!');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = toast.error('Invalid email address!');
  }

  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error('Password is required!');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('Invalid Password!');
  } else if (values.password.length < 8) {
    errors.password = toast.error('Password must be at least 4 characters long!');
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error('Password must have a special character!');
  }


  return errors;
}
