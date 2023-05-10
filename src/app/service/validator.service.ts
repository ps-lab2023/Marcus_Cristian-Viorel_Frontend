import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public static isInvalidPrice(priceField: any): boolean {
    if (priceField == null || priceField == "") {
      return true;
    } else {
      if(isNaN(priceField)) {
        return true;
      } else {
        return priceField < 0;
      }
    }
  }

  public static parseDate(dateField: any): Date {
    let dateParts = dateField.split("-");
    return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
  }

  public static isInvalidDate(dateField: any): boolean {
    if (dateField == null || dateField == "") {
      return true;
    } else {
      let dateParts = dateField.split("-");
      let parsedDate = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
      let today = new Date();

      return parsedDate < today;
    }
  }

  public static isInvalidPassword(passwordField: any): boolean {
    if(passwordField == null || passwordField == "") {
      return true;
    } else {
      // Password must contain at least 1 letter, and be at least 6 characters long
      let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      return !passwordRegex.test(passwordField);
    }
  }

  public static isInvalidUsername(usernameField: any): boolean {
    if(usernameField == null || usernameField == "") {
      return true;
    } else {
      // Name must not contain spaces
      let usernameRegex = /^\S*$/;
      return !usernameRegex.test(usernameField);
    }
  }

  public static isInvalidEmail(emailField: any): boolean {
    if(emailField == null || emailField == "") {
      return true;
    } else {
      // Email must contain @ and .
      let emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
      return !emailRegex.test(emailField);
    }
  }

  public static isInvalidPhone(phoneField: any): boolean {
    if(phoneField == null || phoneField == "") {
      return true;
    } else {
      // phone number must be 10 digits long
      let numberRegex = /^[0-9]{10}$/;
      return !numberRegex.test(phoneField);
    }
  }

  public static isInvalidRoomNumber(roomNumberField: any): boolean {
    if(roomNumberField == null || roomNumberField == "") {
      return true;
    } else {
      // room number must be a number > 0
      let numberRegex = /^[0-9]+$/;
      return !numberRegex.test(roomNumberField);
    }
  }
}
