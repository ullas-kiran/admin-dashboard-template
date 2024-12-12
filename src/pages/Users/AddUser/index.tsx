
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userServices } from '../../../services';

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
    description: Yup.string()
      .max(500, 'Job Descriptions must be less than 500 characters')
      .required('Job Description is required'),
      question: Yup.string()
      .max(500, 'Questions must be less than 500 characters')
      .required('Questions is required'),
    file: Yup.mixed().required('File is required').test(
      'fileType',
      'Only PDF files are allowed',
      (value) => {
        if (!value) return false; 
        const file = value as File; 
        return file.type === 'application/pdf';
      }
    )
    .test(
      'fileSize',
      'File size must be less than 1 MB',
      (value) => {
        if (!value) return false; 
        const file = value as File; 
        return file.size <= 1024 * 1024; 
      }
    ),
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
        // const formData = new FormData();
        // formData.append('file', values.file);
        // userServices
        //   .uploadResume({
        //     user_id: userRes.data?.id,
        //     file: formData,
        //   })
        //   .then((res2) => {
        //     console.log('res2', res2);
        //     userServices.uploadDocs({
        //       key:"jd",
        //       question:values?.question
        //     })
        //   })
        //   .catch((err) => {
        //     console.log('err2', err);
        //   });
      })
      .catch((err) => {
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
            {({ setFieldValue }) => (
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
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Job Description
                    </label>
                    <Field
                      name="description"
                      as="textarea"
                      rows={6}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-meta-1 mt-1 text-sm"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Question
                    </label>
                    <Field
                      name="question"
                      as="textarea"
                      rows={6}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <ErrorMessage
                      name="question"
                      component="div"
                      className="text-meta-1 mt-1 text-sm"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-3 block text-black dark:text-white">
                      Attach Resume
                    </label>
                    <input
                      type="file"
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                            setFieldValue('file', event.target.files[0]);
                          }
                      }}
                      className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary dark:border-form-strokedark dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    />
                    <ErrorMessage
                      name="file"
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
