const createMobilePhoneNumber = (countryId, includeCountryCode = false, startingNumber = false) => {
  const generator = new CountryPhoneNumberGenerator();
  const phoneNumberGenerator = generator.create(countryId, includeCountryCode, startingNumber);
  return phoneNumberGenerator.generatePhoneNumber();
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

class PhoneNumberGenerator {
  constructor() {
    this.includeCountryCode = true;
    this.startingNumber = false;
    this.countryCode = "";
    this.phoneNumberLength = 0;
  }

  generatePhoneNumber() {
    let phoneNumber = this.includeCountryCode ? this.countryCode : '';
    let phoneNumberLength = this.startingNumber ? this.phoneNumberLength - 1 : this.phoneNumberLength;
    phoneNumber += this.startingNumber ? this.startingNumber : '';
    for (let i = 0; i < phoneNumberLength; i++) {
        phoneNumber += getRandomInt(0, 9);
    }
    return phoneNumber;
  }
}

class GermanyPhoneNumberGenerator extends PhoneNumberGenerator {
  constructor() {
    super();
    this.countryCode = "+49";
    this.phoneNumberLength = 11;
  }
}

class TurkeyPhoneNumberGenerator extends PhoneNumberGenerator {
  constructor() {
    super();
    this.countryCode = "+90";
    this.phoneNumberLength = 10;
  }
}

class UKPhoneNumberGenerator extends PhoneNumberGenerator {
  constructor() {
    super();
    this.countryCode = "+44";
    this.phoneNumberLength = 10;
  }
}

class USAPhoneNumberGenerator extends PhoneNumberGenerator {
  constructor() {
    super();
    this.countryCode = "+1";
    this.phoneNumberLength = 10;
  }
}

class PeruPhoneNumberGenerator extends PhoneNumberGenerator {
  constructor(includeCountryCode, startingNumber) {
    super();
    this.countryCode = "+51";
    this.phoneNumberLength = 9;
    this.startingNumber = startingNumber;
    this.includeCountryCode = includeCountryCode;
  }
}

class CountryPhoneNumberGenerator {
  create(countryId, includeCountryCode = true, startingNumber) {
    if (countryId == "DE") {
      return new GermanyPhoneNumberGenerator();
    }
    if (countryId == "TR") {
      return new TurkeyPhoneNumberGenerator();
    }
    if (countryId == "UK") {
      return new UKPhoneNumberGenerator();
    }
    if (countryId == "USA") {
      return new USAPhoneNumberGenerator();
    }
    if (countryId == "PE") {
      return new PeruPhoneNumberGenerator(includeCountryCode, startingNumber = 9);
    } else {
      throw Error("Unsupported Country Id");
    }
  }
}

module.exports = createMobilePhoneNumber;
