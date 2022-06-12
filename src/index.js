 import { throttle } from "lodash";
 import "./styles/style.scss";
 import { refs } from "./scripts/refs"
 import { createLi, addLiToList } from "./scripts/generateMarkdown";
import { storage } from "./helper/storage";

const clearAll = () => {
    localStorage.removeItem('list')
    refs.list.innerHTML = ''
 }
 


 const handleMount = () => {
     const list = localStorage.getItem('list')
     try {
         const savedList = JSON.parse(list)
         const markdown = savedList.reduce((acc, text) => acc + createLi(text), '')
         addLiToList(markdown)
         console.log(savedList)
     } catch (error) {
         console.   log('parsing error')
     }
 }

 const handleSubmit = function (e) {
     e.preventDefault()
     const value = refs.input.value
     if(value === '') {
         return
     } else {
        const liItem = createLi(value)
        addLiToList(liItem)
        const result = storage.readItem('list',[])
        result.push(value)
        storage.addItem("list",result)
        console.log(result)
           // const list = localStorage.getItem('list')
           // try {
           //     const listData = list ? JSON.parse(list) : []
           //     listData.push(value)
           //     const updatedtList = JSON.stringify(listData)
           //     localStorage.setItem('list', updatedtList)
           // } catch (error) {
           //     console.log('parsing error')
           // }
          
        refs.input.value = ''
     }
    
 }



refs.clear.addEventListener('click', clearAll)
refs.form.addEventListener('submit', handleSubmit)
addEventListener('DOMContentLoaded', handleMount)
 

