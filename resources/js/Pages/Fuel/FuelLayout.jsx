import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";

function FuelLayout({auth, fuels}) {
  return (<AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">BBM</h2>}
  >
    <Head title="BBM"/>

    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <table className='w-full text-nowrap'>
              <thead className="bg-gray-400 h-[64px] border">
              <tr>
                <th>No.</th>
                <th>Photo</th>
                <th>No. Struk</th>
                <th>Plat Nomor</th>
                <th>Tanggal</th>
                <th>Jumlah</th>
              </tr>
              </thead>
              <tbody>
              {Object.entries(fuels.data).map(([k, v]) => (
                <tr key={k} className='text-center border h-[4rem]'>
                  <td className="w-[100px] ">{parseInt(k) + 1}</td>
                  <td className="w-[100px]">
                    <a href={v.invoice_path} target="_blank">
                      <img src={v.invoice_path} style={{width: 100, height: 50, objectFit: "cover"}}
                           alt="vehicle_photo"/>
                    </a>
                  </td>
                  <td>{v.invoice}</td>
                  <td>{v.vehicle.license}</td>
                  <td>{v.date}</td>
                  <td>{v.amount}</td>
                </tr>
              ))}
              </tbody>
            </table>
            <Pagination links={fuels.meta.links}/>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>);
}

export default FuelLayout;
