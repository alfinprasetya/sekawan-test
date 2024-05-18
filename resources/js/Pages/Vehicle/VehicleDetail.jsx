import React, {useState} from 'react';
import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TextInput from "@/Components/TextInput.jsx";
import Modal from "@/Components/Modal.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

function VehicleOverview({auth, vehicle, errors}) {
  const vehicleData = vehicle.data
  const [modalShow, setModalShow] = useState(false)
  const [orderData, setOrderData] = useState({
    'user_id': auth.user.id,
    'vehicle_id': vehicleData.id,
    'location_id': '',
    'start_date': '',
    'end_date': ''
  })

  const onFieldChange = (name, value) => {
    if (value) {
      setOrderData((prevState) => ({...prevState, [name]: value}))
    } else {
      delete orderData[name]
    }
  };

  const handleOrderSubmit = (data) => {
    setModalShow(false)
    router.post(route('order.store'), data)
  }


  return (<AuthenticatedLayout
    user={auth.user}
    header={<h2
      className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{vehicleData.license} | {vehicleData.brand}</h2>}
  >
    <Head title="Kendaraan"/>

    <div className="py-6">
      <div className="max-w-[1600px] mx-auto sm:px-6 lg:px-8">
        {
          Object.keys(errors).length !== 0 && (
            <div className="bg-red-500 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-4">
              <div className="px-6 py-4 text-gray-900 dark:text-gray-100">
                <h2 className="text-xl font-bold">Pesanan Gagal disimpan</h2>
                {
                  Object.values(errors)[0]
                }
              </div>
            </div>
          )
        }
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="flex items-center p-6 text-gray-900 dark:text-gray-100">
            <div className="basis-1/2">
              <img className="rounded-lg" src={vehicleData.photo} alt="vehicle-photo"/>
            </div>
            <div className="basis-1/2 ml-[50px] p-6 bg-gray-200 rounded-lg">
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Plat Nomor</p><p>{vehicleData.license}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Merek</p><p>{vehicleData.brand}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Model</p><p>{vehicleData.model}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Tipe Angkutan</p><p>{vehicleData.load}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Terakhir Servis</p><p>{vehicleData.repair_date}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Pemilik</p><p>{vehicleData.owner}</p>
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Status</p>
                {vehicleData.available ?
                  <span
                    className="inline-block min-w-[100px] text-center bg-green-300 py-2 px-4 rounded-full font-semibold text-sm ">Available</span> :
                  <span
                    className="inline-block min-w-[100px] text-center bg-red-300 py-2 px-4 rounded-full font-semibold text-sm ">Unavailable</span>}
              </div>
              <div className="flex items-center h-[50px]">
                <p className="w-1/4 font-semibold mr-[50px]">Lokasi</p>
                <p>{vehicleData.location.code} | {vehicleData.location.name}</p>
              </div>
              <div className="flex justify-center mt-6">
                <PrimaryButton disabled={!vehicleData.available || auth.user.can_approve === 1} onClick={() => setModalShow(true)}>Pesan
                  Kendaraan</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal show={modalShow}>
      <div className="text-center p-6">
        <h1 className="font-bold text-xl mb-4">Pesan Kendaraan</h1>
        <div className="grid grid-cols-3 w-1/2 mx-auto text-left items-center">
          <span className="font-semibold">Mulai</span>
          <TextInput className="col-span-2" type="date" onChange={e => onFieldChange('start_date', e.target.value)}/>
          <span className="font-semibold">Sampai</span>
          <TextInput className="col-span-2" type="date" onChange={e => onFieldChange('end_date', e.target.value)}/>
        </div>
        <div className="my-4">
          <SelectInput onChange={e => onFieldChange('location_id', parseInt(e.target.value))}>
            <option value="">Lokasi</option>
            <option value={1}>Head Office</option>
            <option value="2">Branch Office</option>
            <option value="3">Cabang 01</option>
            <option value="4">Cabang 02</option>
            <option value="5">Cabang 03</option>
            <option value="6">Cabang 04</option>
            <option value="7">Cabang 05</option>
            <option value="8">Cabang 06</option>
          </SelectInput>
        </div>
        <PrimaryButton onClick={() => handleOrderSubmit(orderData)} className="m-2">Pesan Kendaraan</PrimaryButton>
        <DangerButton onClick={() => {
          setModalShow(false)
          setOrderData({
            'user_id': auth.user.id,
            'vehicle_id': vehicleData.id
          })
        }} className="mx-2">Batal</DangerButton>
      </div>
    </Modal>
  </AuthenticatedLayout>);
}

export default VehicleOverview;
