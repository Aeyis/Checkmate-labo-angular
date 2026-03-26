import { ValidatorFn } from '@angular/forms';

interface strongPasswordErrors {
  lowercase? : boolean;
  uppercase? : boolean;
  number? : boolean;
  specialChar? : boolean;
  minlength? : { requiredLength: number; actualLength: number };
}

export function strongPasswordValidator(): ValidatorFn {
  return (control) => {
    const value = control.value;

    const result: strongPasswordErrors = {};

    // est-ce qu'il y a une minuscule
    const lowerCaseRegex = /.*[a-z]/;
    if (!lowerCaseRegex.test(value)) {
      result.lowercase = true;
    }

    // est-ce qu'il y a un uppercase
    const upperCaseRegex = /.*[A-Z]/;
    if (!upperCaseRegex.test(value)) {
      result.uppercase = true;
    }
    // est ce qu'il y a un nombre
    const numberRegex = /.*[0-9]/;
    if (!numberRegex.test(value)) {
      result.number = true;
    }
    // est ce qu'il y a un char spécial
    const specialCharRegex = /.*[\W_]/;
    if (!specialCharRegex.test(value)) {
      result.specialChar = true;
    }
    // est ce qu'il y a min length 8
    if (value.length < 8) {
      result.minlength = { requiredLength: 8, actualLength: value.length };
    }
    if (Object.keys(result).length) {
      return result;
    }
    return null;
  };
}
