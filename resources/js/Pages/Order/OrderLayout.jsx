import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";

function OrderLayout({auth, orders}) {
  return (<AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pesanan</h2>}
  >
    <Head title="Pesanan"/>

    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                      className="inline-block min-w-[100px] bg-red-300 py-2 px-4 rounded-full font-semibold text-sm ">pending</span>}</td>
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
