import React, {Component, useState } from 'react';
//import { Icon, Card, Table, Modal, Input } from "antd";
import {Table, Input} from "antd";
import { secondsToDhmsSimple } from '../utils/Utils';
import Flvplayer from "../utils/Flvplayer";
import Cookies from 'universal-cookie';
import md5 from 'js-md5';
import axios from "axios";

class Streams extends Component {

  cookies = new Cookies();

  state = {
    streamsData: [],
    loading: false,
    visible: false,
    password: '',
    showModal: false,
    record: '',
        sign: '',
    registros: '',
    token: ''
  };

  columns = [
      {
    title: 'App',
    dataIndex: 'app',
    key: 'app',
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name, record) => {return <a href="#" onClick={() => this.openVideo(record)}>{name}</a>;}
  }, {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  }, {
    title: 'Audio',
    children: [{
      title: 'codec',
      dataIndex: 'ac',
      key: 'ac',
    }, {
      title: 'freq',
      dataIndex: 'freq',
      key: 'freq',
    }, {
      title: 'chan',
      dataIndex: 'chan',
      key: 'chan',
    },
    ]
  }, {
    title: 'Video',
    children: [{
      title: 'codec',
      dataIndex: 'vc',
      key: 'vc',
    }, {
      title: 'size',
      dataIndex: 'size',
      key: 'size',
    }, {
      title: 'fps',
      dataIndex: 'fps',
      key: 'fps',
    },]
  },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: 'Clients',
      dataIndex: 'clients',
      key: 'clients',
    }];

  async componentDidMount() {
    this.getToken();
    this.setState({password: this.cookies.get('pass')})
    await this.fetch();
     // Invoke the callback function passed as prop
  }


   getToken = () => {
    const token  = sessionStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token;
    this.setState({token: token});
  }


  updatePass = (e) => {
    let password = e.target.value;
    this.setState({password});
    this.cookies.set('pass', password, { path: '/', maxAge: 31536000 })
  }

  openVideo = (record) => {
    let sign = '';
    if (this.state.password) {
      let hash = md5.create();
      let ext = Date.now() + 30000;
      hash.update(`http://localhost:8000/${record.app}/${record.name}-${ext}-${this.state.password}`);
      let key = hash.hex();
      sign = `?sign=${ext}-${key}`;
    }
    this.setState({record: record})

    this.setState({sign: sign})
    this.setState({showModal: true});

    /*this.videoModal = Modal.info({
      icon: null,
      title: "Video Player",
      width: 640,
      height: 480,
      content: <Flvplayer url={`/${record.app}/${record.name}.flv${sign}`} type="flv" />,
    }); */
  }

  setModal(val){
    this.setState({showModal:val});
  }

  setFlv(record, sign){
    console.log('streams.jsx page');
    console.log(record);
    return <Flvplayer url={`http://159.223.199.239:8000/${record.app}/${record.name}.flv${sign}`} type="flv" />;
  };

  sendDataToParent(streamsData) {
    //this.props.sendData(this.state.streamsData); // Invoke the callback function passed as prop
  }

  fetch = async() => {
    this.setState({ loading: true });
    axios.defaults.headers.common['Authorization'] = `Basic ${btoa('admin'+ ':' + 'admin')}`

    axios.get('http://159.223.199.239:8000/api/streams').then( data => {
      // Read total count from server

      let res = data.data.data;

      let streamsData = [];
      let index = 0;
      for (let app in res) {
        for (let name in res[app]) {
          let stream = res[app][name].publisher;

          console.log(stream)

          let clients = res[app][name].subscribers;



          if(Object.entries(stream).length > 0){
            let now = new Date().getTime() / 1000;


//old variable connectCreated
//            let str = new Date(stream.connectCreated).getTime() / 1000;

            let str = new Date(stream.createtime).getTime() / 1000;




            const StreamData = {
              key: index++,
              app,
              name,
              id: stream.id,
              ip: stream.ip,
              ac: stream.audio ? stream.audio.codec + " " + stream.audio.profile : "",
              freq: stream.audio ? stream.audio.samplerate : "",
              chan: stream.audio ? stream.audio.channels : "",
              vc: stream.video ? stream.video.codec + " " + stream.video.profile : "",
              size: stream.video ? stream.video.width + "x" + stream.video.height : "",
              fps: stream.video ? Math.floor(stream.video.fps) : "",
              time: secondsToDhmsSimple(now - str),
              clients: clients ? clients.length : null
            };

console.log(StreamData)
            streamsData.push(StreamData);


          }else{
            console.log('else')
          }


          console.log(streamsData)

        }
      }
      this.setState({loading: false, streamsData});


    }).catch(e => {
      this.setState({
        loading: false,
      });
    });
  }


  render() {
    return (
        <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Listado de Streams  </h2>
          </header>
          <div className="p-3">
            {/*<input type="password" placeholder="Escribe un Password" onChange={this.updatePass}
                   value={this.state.password} />*/}
            <div className="overflow-x-auto">
              <Table
                  dataSource={this.state.streamsData}
                  columns={this.columns}
                  loading={this.state.loading}
                  bordered
                  small
                  pagination={false}
              />
            </div>

          </div>

          {this.state.showModal ? (
              <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Modal Title
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={ () =>  {this.setModal(false) } }
                        >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">

                        { (this.state.record) ? this.setFlv(this.state.record, this.state.sign) : ''}

                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={  () =>  {this.setModal(false) } }
                        >
                          Close
                        </button>



                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={  () =>  {this.setModal(false) } }
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
          ) : null}
        </div>
    );
  }
};


export default Streams;
