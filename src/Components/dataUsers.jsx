import React, { useState, useRef } from 'react'
import swal from 'sweetalert'
import Axios from 'axios'
import { LinkAPI } from '../Constant/LinkAPI.js'

const DataUser = ({userData, getDataUser, currentData }) => {

    const [idSelected, setidSelected] = useState()
    const [search, setSearch] = useState('')
    const namaBaru = useRef(null)
    const nipBaru = useRef(null)
    const noTlpBaru = useRef(null)
    const emailBaru = useRef(null)

    const deleteData = (idToDelete) => {
        swal({
            title: "Anda yakin ingin menghapus data ini?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((hapus) => {
                if (hapus) {
                    Axios.delete(LinkAPI + '/' + idToDelete)
                        .then((res) => {
                            if (res.status === 200) {
                                swal({
                                    title: "Data berhasil dihapus!",
                                    icon: "success",
                                    button: "OK",
                                });
                                getDataUser()
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                } else {
                    swal("Data tidak dihapus");
                    getDataUser()
                }
            });
    }

    const editData = () => {
        let namaUpdated = namaBaru.current.value
        let NIPUpdated = nipBaru.current.value
        let NoTlpUpdated = noTlpBaru.current.value
        let EmailUpdated = emailBaru.current.value

        let newData = {
            Nama: namaUpdated,
            NIP: NIPUpdated,
            NoTelephone: NoTlpUpdated,
            Email: EmailUpdated
        }

        if (namaUpdated && NIPUpdated && NoTlpUpdated && EmailUpdated) {
            Axios.patch(LinkAPI + '/' + idSelected, newData)
                .then((res) => {
                    if (res.status === 200) {
                        swal({
                            title: "Data berhasil diubah!",
                            icon: "success",
                            button: "OK",
                        });
                        setidSelected(null)
                        getDataUser()
                    }
                })
        } else {
            swal("Harap lengkapi semua kolom")
            console.log(idSelected)
        }
    }


    if (currentData === null) {
        return (
            <h2>
                Loading Data...
            </h2>
        )
    }

    return (
        <div className='container mt-5'>
            <h1 className="text-center header">
                Data User
            </h1>
            <div className="d-flex justify-content-end">
                <input type='text' className="p-2 w-25" placeholder="Cari Nama/NIP/Email" onChange={(event) => { setSearch(event.target.value) }} />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nama</th>
                        <th scope="col">NIP</th>
                        <th scope="col">Nomor Telephone</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentData.filter((val) => {
                            if (search === "") {
                                return val
                            } else if (
                                val.Nama.toLowerCase().includes(search.toLowerCase()) || 
                                val.NIP.toString().includes(search)||
                                 val.Email.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            }
                        }).map((value, index) => {
                            if (idSelected === value.id) {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {value.id}
                                        </td>
                                        <td>
                                            <input type='text' ref={namaBaru} placeholder='Nama' className='form-control w-50' defaultValue={value.Nama} />
                                        </td>
                                        <td>
                                            <input type='text' ref={nipBaru} placeholder='NIP' className='form-control w-50' defaultValue={value.NIP} />
                                        </td>
                                        <td>
                                            <input type='text' ref={noTlpBaru} placeholder='No. Telephone' className='form-control w-50' defaultValue={value.NoTelephone} />
                                        </td>
                                        <td>
                                            <input type='text' ref={emailBaru} placeholder='Email' className='form-control w-50' defaultValue={value.Email} />
                                        </td>
                                        <td>
                                            <div>
                                                <input type="button" value="Save" className="btn btn-primary mx-5" onClick={() => editData()} />
                                                <input type="button" value="Cancel" className="btn btn-warning mx-2" onClick={() => setidSelected(null)} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {value.id}
                                        </td>
                                        <td>
                                            {value.Nama}
                                        </td>
                                        <td>
                                            {value.NIP}
                                        </td>
                                        <td>
                                            {value.NoTelephone}
                                        </td>
                                        <td>
                                            {value.Email}
                                        </td>
                                        <td>
                                            <div>
                                                <input type="button" value="Edit" className="btn btn-primary mx-5" onClick={() => { setidSelected(value.id) }} />
                                                <input type="button" value="Delete" className="btn btn-danger mx-2" onClick={() => deleteData(value.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default DataUser