import { AbstractControl, ValidatorFn } from '@angular/forms';


export const contentRequired: ValidatorFn = (control: AbstractControl) => {
  console.log(control.value.text)
  const text = control.value?.text?.trim();
  return !text ? { error: true} : null
}
