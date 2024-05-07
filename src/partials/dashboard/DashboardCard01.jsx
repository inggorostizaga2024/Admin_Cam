import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import Flvplayer from "../../utils/Flvplayer";
import style from "../../css/style.css";
// Import utilities
import {tailwindConfig, hexToRGB, secondsToDhmsSimple} from '../../utils/Utils';

function DashboardCard01( item )
{

  const videoStyle = {
    height: '50% !important',
    objectFit: 'cover !important'
}

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={'../../images/icon-01.svg'} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Ver en mapa</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Historial</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Más</Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">LiveStream</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">DeviceId: {item.activeStreams.id} </div>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Operador: {item.activeStreams.name} </div>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Duración: {item.activeStreams.time} </div>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Posición: IP: {item.activeStreams.ip} </div>

        <div className="flex items-start">
          <div className="text-1xl font-bold text-slate-800 mr-2">CDMX, BenitoJuarez</div>
          <div className={"font-semibold text-white px-1.5 rounded-full " + (item.activeStreams.app == 'live' ? "text-green-700" : "text-red-700" ) }  >{item.activeStreams.app}</div>
        </div>


        <Flvplayer className={"video-container"} url={`http://159.223.199.239:8000/live/${item.activeStreams.name}.flv`} type="flv" />


      </div>
      {/* Chart built with Chart.js 3 */}

        {/* Change the height attribute to adjust the chart height */}
        {/*<video  width="400" height="240" controls="controls" preload="none" id={item.activeStreams.deviceId}>
          <source url={`http://192.168.100.254:8000/live/${item.activeStreams.streamName}.flv`} type="video/x-flv" />
        </video>*/}
      {/* <div className="grow">
      </div> */}
    </div>
  );
}

export default DashboardCard01;






/* <LineChart data={chartData} width={389} height={128} />*/