'use client';
import { bookRequest } from '@/lib/api';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import css from './ReviewsForm.module.css';
type Props = {
  camperId: string;
};
export default function ReviewsForm({ camperId }: Props) {
  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Please enter your name.').required('Please enter your name.'),
    email: Yup.string().email('Invalid email.').required('Please enter your email.'),
  });
  return (
    <Formik
      initialValues={{ name: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await bookRequest(camperId, values.name, values.email);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className={css.nameWrap}>
            <Field
              className={`${css.field} ${css.name} ${touched.name && errors.name ? css.error : ''}`}
              name="name"
              placeholder="Name*"
            />
            {touched.name && errors.name && (
              <>
                <label className={css.nameLabel}>Name*</label>
                <p className={css.errorText}>{errors.name}</p>
                <svg className={css.nameErrorIcon} width={20} height={20}>
                  <use href="/sprite.svg#error"></use>
                </svg>
              </>
            )}
          </div>
          <div className={css.emailWrap}>
            <Field
              className={`${css.field} ${css.email} ${touched.email && errors.email ? css.error : ''}`}
              name="email"
              type="email"
              placeholder="Email*"
            />
            {touched.email && errors.email && (
              <>
                <label className={css.emailLabel}>Email*</label>
                <p className={css.errorText}>{errors.email}</p>
                <svg className={css.emailErrorIcon} width={20} height={20}>
                  <use href="/sprite.svg#error"></use>
                </svg>
              </>
            )}
          </div>
          <button className={css.submitBtn} type="submit">
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
}
