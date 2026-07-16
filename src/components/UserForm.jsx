import { useEffect, useState } from 'react';

function UserForm({ initialValues, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    switch (name) {
      case 'firstName':
        return value.trim() ? '' : 'First name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'email': {
        if (!value.trim()) {
          return 'Email is required';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value) ? '' : 'Please enter a valid email address';
      }
      default:
        return '';
    }
  }

  useEffect(() => {
    if (initialValues) {
      setFormData({
        firstName: initialValues.firstName || '',
        lastName: initialValues.lastName || '',
        email: initialValues.email || '',
      });
      setErrors({});
    }
  }, [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValues = { ...formData, [name]: value };
    setFormData(nextValues);

    const fieldError = validateField(name, value);
    setErrors((currentErrors) => ({ ...currentErrors, [name]: fieldError }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    onSubmit(formData);
  }

  const isValid =
    !validateField('firstName', formData.firstName) &&
    !validateField('lastName', formData.lastName) &&
    !validateField('email', formData.email);

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className={`form-field ${errors.firstName ? 'has-error' : ''}`}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
      </div>

      <div className={`form-field ${errors.lastName ? 'has-error' : ''}`}>
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
      </div>

      <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="form-btn secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="form-btn primary" disabled={!isValid}>
          Save User
        </button>
      </div>
    </form>
  );
}

export default UserForm;
