import React, {useState} from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

function BranchLayout({auth, branches}) {
  const branchesList = branches.data

  const [branchId, setBranchId] = useState(0)

  const changeBranch = (value) => {
    setBranchId(value-1)
  }

  return (<AuthenticatedLayout
    user={auth.user}
    header={
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Cabang</h2>
        <SelectInput className="font-semibold" onChange={e => changeBranch(e.target.value)}>
          {
            branchesList.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)
          }
        </SelectInput>
      </div>
    }
  >
    <Head title="Cabang"/>

    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="flex items-center p-6 text-gray-900 dark:text-gray-100">
            <div className="basis-1/2">
              <img className="rounded-lg h-[400px]" src={branchesList[branchId].photo} alt="vehicle-photo"/>
            </div>
            <div className="basis-1/2 ml-[50px] p-6 bg-gray-200 rounded-lg">
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Kode</p><p>{branchesList[branchId].code}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Nama</p><p>{branchesList[branchId].name}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Telepon</p><p>{branchesList[branchId].phone}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Email</p><p>{branchesList[branchId].email}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Alamat</p><p>{branchesList[branchId].street}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Kota</p><p>{branchesList[branchId].city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>);
}

export default BranchLayout;
