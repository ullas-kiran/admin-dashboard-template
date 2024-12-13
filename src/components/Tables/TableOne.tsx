
import { MouseEvent, useEffect, useState } from 'react';
import { userServices } from '../../services';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import Modal from '../../pages/Users/AddUser/Modal';
import { formatDate } from '../../util/formatDate';



const TableOne = () => {
  const [userList,setUserList]=useState<Array<any>>([])
  const navigate=useCustomNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userData,setUserData]=useState(null)


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

const handleNavigate=(e:MouseEvent<HTMLButtonElement>):void=>{
  e.preventDefault();
  e.stopPropagation();
navigate("/user/add");
}

const handleUserDetails=(userDetails:any)=>{
  setUserData(userDetails)
  setShowModal(true)
}


const [currentPage, setCurrentPage] = useState<number>(1);
const itemsPerPage = 5; // Define how many rows to display per page

const totalPages:number = Math.ceil(userList.length / itemsPerPage);

const handleNextPage = ():void => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrevPage = ():void => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

// Get the items for the current page
const startIndex:number = (currentPage - 1) * itemsPerPage;
const visibleUsers = userList.slice(startIndex, startIndex + itemsPerPage);






  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div className="grid grid-cols-2 gap-4 mb-6 items-center">
      <div className="col-span-1">
        <h4 className="text-xl font-semibold text-black dark:text-white">Users</h4>
      </div>
      <div className="col-span-1 flex justify-end">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 outline-none rounded shadow"
          onClick={handleNavigate}
        >
          + Add User
        </button>
      </div>
    </div>

    {/* Table Header */}
    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
      <div className="p-2.5 xl:p-5">
        <h5 className="text-sm font-medium uppercase xsm:text-base">NAME</h5>
      </div>
      <div className="p-2.5 text-center xl:p-5">
        <h5 className="text-sm font-medium uppercase xsm:text-base">EMAIL</h5>
      </div>
      <div className="p-2.5 text-center xl:p-5">
        <h5 className="text-sm font-medium uppercase xsm:text-base">ACTIVE</h5>
      </div>
      <div className="hidden p-2.5 text-center sm:block xl:p-5">
        <h5 className="text-sm font-medium uppercase xsm:text-base">DATE</h5>
      </div>
      <div className="hidden p-2.5 text-center sm:block xl:p-5">
        <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
      </div>
    </div>

    {/* Table Body */}
    <div
      className="table-fixed"
    >
      {visibleUsers.map((user) => (
        <div
          className={`grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark`}
          key={user?.id}
        >
          <div className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer" onClick={() => handleUserDetails(user)}>
            <p className="text-black dark:text-white">{user.name}</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer" onClick={() => handleUserDetails(user)}>
            <p className="text-black dark:text-white">{user.email}</p>
          </div>
          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 cursor-pointer" onClick={() => handleUserDetails(user)}>
            <p className="text-black dark:text-white">{user?.is_active}</p>
          </div>
          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 cursor-pointer" onClick={() => handleUserDetails(user)}>
            <p className="text-black dark:text-white">{formatDate(user.updated_at)}</p>
          </div>
          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 cursor-pointer">
         {user?.is_schedule? <button
          className="bg-primary hover:bg-opacity-90  text-gray font-semibold py-2 px-4 border border-gray-400 outline-none rounded shadow"
        >
           Schedule Interview
        </button>: <button disabled
          className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 outline-none rounded shadow"
        >
          Scheduled
        </button>}
          </div>
        </div>
      ))}
    </div>

    {/* Pagination Controls */}
    <div className="flex justify-between items-center mt-4">
      <button
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <p className="text-sm">
        Page {currentPage} of {totalPages}
      </p>
      <button
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>

    {showModal && <Modal open={showModal} userData={userData} setShowModal={setShowModal} />}
  </div>
  );
};

export default TableOne;
