import React from 'react';
import {Head, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

function VehicleOverview({auth, vehicles, initialQuery}) {
  let queryParams = Object.keys(initialQuery).length !== 0 ? initialQuery : {}
  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('vehicle.index'), queryParams)
  }

  const handleKeyPress = (name, e) => {
    if (e.key !== "Enter") return

    searchFieldChange(name, e.target.value)
  };
  return (<AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Kendaraan</h2>}
  >
    <Head title="Kendaraan"/>

    <div className="py-6">
      <div className="max-w-[1600px] mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-4">
          <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-12 items-start">
            <div>
              <h2 className="font-semibold mb-2">Search</h2>
              <TextInput
                defaultValue={initialQuery.q}
                placeholder="Cari Kendaraan"
                onBlur={e => searchFieldChange('q', e.target.value)}
                onKeyPress={e => handleKeyPress('q', e)}
              />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Filter</h2>
              <SelectInput defaultValue={initialQuery.load} className="mr-8"
                           onChange={e => searchFieldChange('load', e.target.value)}>
                <option value="">Muatan</option>
                <option value="orang">Orang</option>
                <option value="barang">Barang</option>
              </SelectInput>
              <SelectInput defaultValue={initialQuery.owner} className="mr-8"
                           onChange={e => searchFieldChange('owner', e.target.value)}>
                <option value="">Kepemilikan</option>
                <option value="pribadi">Pribadi</option>
                <option value="sewa">Sewa</option>
              </SelectInput>
              <SelectInput defaultValue={initialQuery.location} className="mr-8"
                           onChange={e => searchFieldChange('location', e.target.value)}>
                <option value="">Lokasi</option>
                <option value="1">Head Office</option>
                <option value="2">Branch Office</option>
                <option value="3">Cabang 01</option>
                <option value="4">Cabang 02</option>
                <option value="5">Cabang 03</option>
                <option value="6">Cabang 04</option>
                <option value="7">Cabang 05</option>
                <option value="8">Cabang 06</option>
              </SelectInput>
              <SelectInput defaultValue={initialQuery.status} className="mr-8"
                           onChange={e => searchFieldChange('status', e.target.value)}>
                <option value="">Status</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </SelectInput>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <table className='w-full text-nowrap'>
              <thead className="bg-gray-400 h-[64px] border">
              <tr>
                <th>No. Id</th>
                <th>Photo</th>
                <th>Plat Nomor</th>
                <th>Merek</th>
                <th>Model</th>
                <th>Muatan</th>
                <th>Tahun</th>
                <th>Servis Terakhir</th>
                <th>Milik</th>
                <th>Lokasi</th>
                <th>Status</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {Object.entries(vehicles.data).map(([k, v]) => (
                <tr key={k} className='text-center border h-[6rem]'>
                  <td>{parseInt(k) + 1}</td>
                  <td><img className="max-w-32 mx-auto" src={v.photo} alt="vehicle_photo"/></td>
                  <td>{v.license}</td>
                  <td>{v.brand}</td>
                  <td>{v.model}</td>
                  <td>{v.load}</td>
                  <td>{v.year}</td>
                  <td>{v.repair_date}</td>
                  <td>{v.owner}</td>
                  <td>{v.location.name}</td>
                  <td>{v.available ?
                    <span
                      className="inline-block min-w-[100px] bg-green-300 py-2 px-4 rounded-full font-semibold text-sm ">Available</span> :
                    <span
                      className="inline-block min-w-[100px] bg-red-300 py-2 px-4 rounded-full font-semibold text-sm ">Unavailable</span>}
                  </td>
                  <td>
                    <Link href={route('vehicle.show', {vehicle: v.id})}>
                      <SecondaryButton>Lihat</SecondaryButton>
                    </Link>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <Pagination links={vehicles.meta.links}/>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>);
}

export default VehicleOverview;
