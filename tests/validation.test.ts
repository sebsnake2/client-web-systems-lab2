/// <reference types="mocha" />

import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

describe('Validation', () => {
  describe('required', () => {
    it('returns true for a non-empty value', () => {
      expect(Validation.required('Clean Code')).to.equal(true);
    });

    it('returns false for an empty value', () => {
      expect(Validation.required('   ')).to.equal(false);
    });
  });

  describe('validYear', () => {
    it('returns true for a valid year', () => {
      expect(Validation.validYear('2008')).to.equal(true);
    });

    it('returns false when year contains letters', () => {
      expect(Validation.validYear('20ab')).to.equal(false);
    });

    it('returns false for a future year', () => {
      expect(Validation.validYear('3000')).to.equal(false);
    });
  });

  describe('validEmail', () => {
    it('returns true for a valid email', () => {
      expect(Validation.validEmail('student@example.com')).to.equal(true);
    });

    it('returns false for an invalid email', () => {
      expect(Validation.validEmail('student-example.com')).to.equal(false);
    });
  });
});
