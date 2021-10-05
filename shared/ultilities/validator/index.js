class Validator {
  #error = null;
  constructor(data, fieldName) {
    this.fieldName = fieldName;
    this.data = data;
  }
  email() {
    const patern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = patern.test(this.data);
    if (!valid) this.error = `${this.fieldName} field is invalid Email`;
    return this;
  }
  min(min) {
    if (this.data.length < min)
      this.error = `${this.fieldName} field is lower than ${min} characters`;
    return this;
  }

  max(max) {
    if (this.data.length > max)
      this.error = `${this.fieldName} field is greater than ${max} characters`;
    return this;
  }

  phone() {
    const patern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const valid = patern.test(this.data);
    if (!valid) this.error = `${this.fieldName} field is invalid phone number`;
    return this;
  }

  required() {
    const data = this.data.trim();
    if (data === "") this.error = `${this.fieldName} field is required`;
    return this;
  }

  minmax(min = 5, max = 30) {
    return this.min(min).max(max).required().error;
  }

  static validate(obj) {
    for (let key in obj) {
      if (obj[key] instanceof Object) return this.validate(obj[key]);
      else if (obj[key]) return obj[key];
    }
  }
}

module.exports = Validator;
