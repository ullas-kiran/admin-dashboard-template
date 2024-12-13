
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userServices } from '../../../services';
import { toast } from 'react-toastify';

const AddUser = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });

  // Initial form values
  const initialValues = {
    name: '',
    email: '',
    password: '',
    description: '',
    question:'',
    file: null,
  };

  // Form submission handler
  const handleSubmit = (values:any) => {
    console.log('Form values:', values);
    userServices
      .userRegister({
        name: values.name,
        password: values.password,
        email: values.email,
      })
      .then((userRes) => {
       toast.success("Success")
      })
      .catch((err) => {
        toast.error("Something went wrong")
        console.log('err1', err);
      });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Add User</h3>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ }) => (
              <Form>
                <div className="p-6.5">
                  <div className="mb-4.5 ">
            
                      <label className="mb-2.5 block text-black dark:text-white">
                        Name
                      </label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Enter your  name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-meta-1 mt-1 text-sm"
                      />
          
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-meta-1 mt-1 text-sm"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-meta-1 mt-1 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
