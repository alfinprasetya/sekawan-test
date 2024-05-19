import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function Dashboard({auth, fuels, active_vehicles}) {


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard"/>

      <div className="py-12">
        <div className="max-w-[1600px] mx-auto sm:px-6 lg:px-8 flex gap-12">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg basis-1/2">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="text-center mb-4 text-xl font-bold">Pengeluaran BBM</h2>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={fuels}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="BBM dalam juta" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg basis-1/2">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="text-center mb-4 text-xl font-bold">Kendaraan Aktif 7 Hari Terakhir</h2>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={active_vehicles}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="hari"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="Unit" fill="#5AB2FF" activeBar={<Rectangle fill="#FFF9D0" stroke="#CAF4FF"/>}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
