import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

function VehicleLayout({auth, vehicles}) {
  return (<AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Kendaraan</h2>}
  >
    <Head title="Kendaraan"/>

    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <pre>
              {JSON.stringify(vehicles, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>);
}

export default VehicleLayout;
