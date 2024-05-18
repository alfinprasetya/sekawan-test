import React from 'react';
import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

function OrderLayout({auth, orders, initialQuery, success}) {
  let queryParams = Object.keys(initialQuery).length !== 0 ? initialQuery : {}

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('order.index'), queryParams)
  }

  return (<AuthenticatedLayout
    user={auth.user}
    header=
      {
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pesanan</h2>
          <SelectInput className="font-semibold" defaultValue={initialQuery.status}
                       onChange={e => searchFieldChange('status', e.target.value)}>
            <option value="all">Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </SelectInput>
        </div>
      }
  >
    <Head title="Pesanan"/>

    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {
          success && (
            <div className="bg-green-400 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-4">
              <div className="px-6 py-4 text-gray-900 dark:text-gray-100">
                <h2 className="text-xl font-bold">{success}</h2>
              </div>
            </div>
          )
        }
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <table className='w-full text-nowrap'>
              <thead className="bg-gray-400 h-[64px] border">
              <tr>
                <th>No.</th>
                <th>Pemesan</th>
                <th>Kendaraan</th>
                <th>Lokasi</th>
                <th>Tanggal Mulai</th>
                <th>Tanggal Selesai</th>
                <th>Status</th>
                {auth.user.can_approve !== 0 && <th>Approve</th>}
              </tr>
              </thead>
              <tbody>
              {Object.entries(orders.data).map(([k, v]) => (
                <tr key={k} className='text-center border h-[4rem]'>
                  <td className="w-[100px] ">{parseInt(k) + 1}</td>
                  <td>{v.user}</td>
                  <td>{v.vehicle}</td>
                  <td>{v.location}</td>
                  <td>{v.start_date}</td>
                  <td>{v.end_date}</td>
                  <td>{v.approved ?
                    <span
                      className="inline-block min-w-[100px] bg-green-300 py-2 px-4 rounded-full font-semibold text-sm ">approved</span> :
                    <span
                      className="inline-block min-w-[100px] bg-red-300 py-2 px-4 rounded-full font-semibold text-sm ">pending</span>}
                  </td>
                  {
                    auth.user.can_approve !== 0 &&
                    <td>{!v.approved &&
                      <>
                        <PrimaryButton className="mr-2" onClick={() =>
                          router.patch(route('order.update', {
                            order: v.id,
                            approved: 1, ...queryParams
                          }))}>
                          <i className="fa fa-check"/>
                        </PrimaryButton>
                        <DangerButton
                          onClick={() => router.delete(route('order.destroy', {order: v.id, ...queryParams}))}><i
                          className="fa fa-trash"/></DangerButton>
                      </>}
                    </td>
                  }
                </tr>
              ))}
              </tbody>
            </table>
            <Pagination links={orders.meta.links}/>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>);
}

export default OrderLayout;
