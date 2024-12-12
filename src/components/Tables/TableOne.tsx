
import { useEffect, useState } from 'react';
import { userServices } from '../../services';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import Modal from '../../pages/Users/AddUser/Modal';



const TableOne = () => {
  const [userList,setUserList]=useState<Array<any>>([])
  const navigate=useCustomNavigate();
  const [showModal, setShowModal] = useState(false);


  useEffect(()=>{
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchUsers=async()=>{
      try {
        const response=await userServices.usersList(signal)
         setUserList(response.data.data)
       } catch (error) {
         console.log(error)
       }
    }
  
    fetchUsers();
  
    return ()=>{
      controller.abort();
    }
   
  },[])

console.log(userList);
const handleNavigate=()=>{
navigate("/user/add");
}

const handleUserDetails=(userDetails:any)=>{
  console.log(userDetails)
}

console.log("ullas",showModal)




  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="grid grid-cols-2 gap-4 mb-6 items-center">
        <div className="col-span-1">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Users
          </h4>
        </div>
        <div className="col-span-1 flex justify-end">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400  outline-none rounded shadow" onClick={handleNavigate}>
            + Add User
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              NAME
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              EMAIL
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              ACTIVE
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              DATE
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div>
        </div>

        {userList.map((user, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === user.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={user?.id}
          >
            {/* <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={brand.logo} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div> */}

            <div className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer" onClick={()=>handleUserDetails(user)}>
              <p className="text-black dark:text-white">{user.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer" onClick={()=>handleUserDetails(user)}>
              <p className="text-black dark:text-white">{user.email}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 cursor-pointer" onClick={()=>handleUserDetails(user)}>
              <p className="text-black dark:text-white">{user?.is_active}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 cursor-pointer" onClick={()=>handleUserDetails(user)}>
              <p className="text-black dark:text-white">{user.updated_at}</p>
            </div>
          </div>
        ))}
      </div>
      {showModal&&<Modal open={showModal} setShowModal={setShowModal} />}
    </div>
  );
};

export default TableOne;
