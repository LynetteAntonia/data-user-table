import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from './Components/Navbar'
import { LinkAPI } from './Constant/LinkAPI'
import DataUser from './Components/dataUsers'
import {Pagination} from './Components/Pagination'
import AddUser from './Components/formAddUser'

export default function App(){

  const [userData, setUserData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(5)

  useEffect(() => {
   getDataUser()
   console.log(userData)
  }, [])

  const getDataUser = () => {
    axios.get(LinkAPI)
    .then((res)=>{
      setUserData(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const indexLastData = currentPage * dataPerPage //satu page max 5 data
  const indexFirstData = indexLastData - dataPerPage // 5-5 = 0
  const currentData = userData.slice(indexFirstData, indexLastData)
  console.log(currentData)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return(
    <div>
      <Navbar />
      <DataUser currentData={currentData} getDataUser={getDataUser} userData={userData}/>
      <Pagination dataPerPage={dataPerPage} totalData={userData.length} paginate={paginate} />
      <AddUser getDataUser={getDataUser}/>
    </div>
  )

}