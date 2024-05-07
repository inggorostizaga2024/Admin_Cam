import React from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardCard10() {

  const customers = [
    {
      id: '0',
      image: Image01,
      name: 'Alex Shatov',
      email: 'alexshatov@gmail.com',
      grupo: 'Uber',
      location: 'CDMX',
      spent: 'Offline',
    },
    {
      id: '1',
      image: Image02,
      name: 'Ramon Quiroz',
      email: 'philip.h@gmail.com',
      grupo: 'Constructora',
      location: 'MERIDA',
      spent: 'Online',
    },
    {
      id: '2',
      image: Image03,
      name: 'Martin Perez',
      email: 'mirkofisuk@gmail.com',
      grupo: 'Bodega',
      location: 'PUEBLA',
      spent: 'Online',
    },
    {
      id: '3',
      image: Image04,
      name: 'Olga del Conde',
      email: 'olga.s@cool.design',
      grupo: 'Uber',
      location: 'CUBA',
      spent: 'Offline',
    },
    {
      id: '4',
      image: Image05,
      name: 'Miguel Gorostizaga',
      email: 'longburak@gmail.com',
      location: 'COLOMBIA',
      spent: 'Online',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Operadores</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Nombre</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Grupo</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Ubicación</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                customers.map(customer => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                          </div>
                          <div className="font-medium text-slate-800">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.grupo}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div
                            className={"text-left font-medium  " + (customer.spent === 'Online' ? 'text-green-500 ' : 'text-red-700')} >{customer.spent}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-xs text-center">{customer.location}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
