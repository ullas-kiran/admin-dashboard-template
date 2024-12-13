import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userServices } from '../../../services';
import { toast } from 'react-toastify';
export default function Modal({showModal,setShowModal,userData}:any) {

    const validationSchema = Yup.object({
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
        description: '',
        question:'',
        file: null,
      };
    
      // Form submission handler
      const handleSubmit = (values:any) => {
          const formData = new FormData();
          console.log(values.file)
        formData.append('user_id',userData?.id)  
        formData.append('file', values.file);
        userServices
          .uploadResume(formData)
          .then((res2) => {
            console.log('res2', res2);
            userServices.uploadDocs({
              user_id:userData?.id,
              key:"jd",
              jd:values?.description
            }).then((res3)=>{
              console.log("res3",res3)
              userServices.uploadDocs({
                user_id:userData?.id,
                key:"qns",
                questions:values?.question
              }).then((res3)=>{
                setShowModal(false)
                toast.success("Uploaded Successfully");
                console.log("res3",res3)
              }).catch((err)=>{
                toast.error("Something went wrong");
                console.log("err4",err)
              })
            })
            .catch((err)=>{
              console.log("err3",err)
            })
          })
          .catch((err) => {
            console.log('err2', err);
          });
      }
  
  return (
    <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative overflow-y-auto h-[80vh] mt-[5rem] flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
                <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="p-6.5">
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
                      className="text-meta-1 mt-1 text-sm absolute"
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
                      className="text-meta-1 mt-1 text-sm absolute"
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
                      className="text-meta-1 mt-1 text-sm absolute"
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
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) 
}