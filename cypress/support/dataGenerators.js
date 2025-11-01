import { faker } from '@faker-js/faker';

export function generateUser() {
  return {
    name: faker.internet.username(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: "India",
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile: faker.phone.number(),
    password: faker.internet.password()
  };
}

export function generatePaymentInfo() {
  return {
    card: faker.finance.creditCardNumber(),
    cvc: faker.finance.creditCardCVV(),
    expireMonth: faker.string.numeric(2),
    expireYear: faker.date.future().getFullYear().toString()
  };
}
