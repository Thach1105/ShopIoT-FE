import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getUsers } from "../../../../services/apiCustomer";
import Pagination from "../../../../utils/Pagination";
import EditCustomerForm from "./EditCustomerForm";
import { Link } from "react-router-dom";

function CustomerList() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageDetail, setPageDetail] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await getUsers(pageNumber, pageSize);
        setUsers(data.content);
        setPageDetail(data.pageDetails);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchUser();
  }, [pageNumber, pageSize]);

  function handleChangePageSize(e) {
    setPageSize(Number(e.target.value));
  }

  function handleDecreasePageNum() {
    if (pageNumber > 1) {
      setPageNumber((pageNumber) => pageNumber - 1);
    }
  }

  function handleIncreasePageNum() {
    if (pageNumber < pageDetail.totalPages) {
      setPageNumber((pageNumber) => pageNumber + 1);
    }
  }

  function onCloseEditForm() {
    setIsEditing(false);
    setSelectedCustomer(null);
  }

  return (
    <div className="p-8">
      {isEditing && (
        <EditCustomerForm
          customer={selectedCustomer}
          onClose={onCloseEditForm}
          setUsers={setUsers}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers Information</h1>
        <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center">
          <FontAwesomeIcon className="pr-2" icon={faPlus} /> Add Customers
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                CUSTOMER
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                DATE OF BIRTH
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                MAIL
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                PHONE
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((customer, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    #{customer.id}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        className="w-full h-full rounded-full"
                        src="https://placehold.co/40x40"
                        alt={`Avatar of ${customer.name}`}
                      />
                    </div>
                    <div className="ml-3">
                      <Link to={`/admin/customer-details/${customer.id}`}>
                        <p className="text-gray-900 whitespace-no-wrap hover:text-yellow-500">
                          {customer.fullName}
                        </p>
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {customer.dob}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {customer.email}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {customer.phoneNumber}
                  </p>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    className="text-green-600 hover:text-green-900 mr-2"
                    onClick={() => {
                      setIsEditing(true);
                      setSelectedCustomer(customer);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          handleDecPage={handleDecreasePageNum}
          handleIncPage={handleIncreasePageNum}
          totalElements={pageDetail.totalElements || 0}
          pageSize={pageSize}
          handleChangePageSize={handleChangePageSize}
        />
      </div>
    </div>
  );
}

export default CustomerList;
