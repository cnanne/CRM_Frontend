import { AbstractControl, ValidatorFn } from '@angular/forms';

//Single place to store validators


// Custom validator function for minimum length
export function minCharacterLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value || '';
    const isValid: boolean = value.length > minLength;

    // Check if the validation passes
    if (isValid) {
      return null; // Validation passes
    } else {
      // Validation fails, return an error object
      return { minLength: { requiredLength: minLength, actualLength: value.length } };
    }
  };
}