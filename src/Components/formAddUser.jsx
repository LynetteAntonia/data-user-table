import React, { useRef } from 'react'
import swal from 'sweetalert'
import Axios from 'axios'
import { LinkAPI } from '../Constant/LinkAPI.js'

const AddUser = ({getDataUser}) => {

    const inputID = useRef(null)
    const inputNama = useRef(null)
    const inputNIP = useRef(null)
    const inputNoTlp = useRef(null)
    const inputEmail = useRef(null)

    
    const addDataUser = () => {

        let addId = inputID.current.value
        let addNama = inputNama.current.value
        let addNIP = Number(inputNIP.current.value)
        let addNoTelephone = inputNoTlp.current.value
        let addEmail = inputEmail.current.value

        let newData = {
            id: addId,
            Nama: addNama,
            NIP: addNIP,
            NoTelephone: addNoTelephone,
            Email: addEmail
        }

        console.log(newData)

        if (addId && addNama && addNIP && addNoTelephone && addEmail) {
            Axios.post(LinkAPI, newData)
                .then((res) => {
                    if (res.status === 201) {
                        swal({
                            title: "Data berhasil ditambahkan!",
                            icon: "success",
                            button: "OK",
                        });
                        getDataUser()

                        inputID.current.value = null
                        inputNama.current.value = null
                        inputNIP.current.value = null
                        inputNoTlp.current.value = null
                        inputEmail.current.value = null

                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            swal({
                title: "Harap lengkapi semua kolom!",
                icon: "error",
                button: "OK",
            });
        }
    }

    return (
        <>
        <div className='container mt-5'>
                <h4>
                    Tambah User
                </h4>
                <div>
                    <input type='text' ref={inputID} placeholder='ID' className='form-control w-50' />
                </div>
                <div className='mt-3'>
                    <input type='text' ref={inputNama} placeholder='Nama' className='form-control w-50' />
                </div>
                <div className='mt-3'>
                    <input type='text' ref={inputNIP} placeholder='NIP' className='form-control w-50' />
                </div>
                <div className='mt-3'>
                    <input type='text' ref={inputNoTlp} placeholder='Nomor Telephone' className='form-control w-50' />
                </div>
                <div className='mt-3'>
                    <input type='text' ref={inputEmail} placeholder='Email' className='form-control w-50' />
                </div>
                <input type='button' value='Submit Data' className='btn btn-primary mt-3 mb-5' onClick={() => addDataUser()} />
            </div>

        </>
    )
}
export default AddUser