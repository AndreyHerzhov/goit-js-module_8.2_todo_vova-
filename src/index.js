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
        //  console.log(savedList)
     } catch (error) {
         console.log('parsing error')
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
        // console.log(result)
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

const sortByValueBtn = document.querySelector('.sort_value')
const sortByNameBtn = document.querySelector('.sort_name')
 
sortByValueBtn.addEventListener('click', sortByValue)
sortByNameBtn.addEventListener('click', sortByName)

function sortByValue(e) {
    refs.list.innerHTML = ''
    const result = storage.readItem('list',[])
    const sortedByValue = result.map(el => el.split('=').reverse().join('='))
    sortedByValue.sort((a, b) => a.localeCompare(b))
    const sortedBack =  sortedByValue.map(el => el.split('=').reverse().join('='))
    const markdown = sortedBack.reduce((acc, text) => acc + createLi(text), '')
    addLiToList(markdown)
    console.log(sortedBack)
   
}

 function sortByName (e) {
    refs.list.innerHTML = ''
    const result = storage.readItem('list',[])
    const sortedByName = result.sort((a, b) => a.localeCompare(b))  
    const markdown = sortedByName.reduce((acc, text) => acc + createLi(text), '')
    addLiToList(markdown)
    console.log(sortedByName)
}


refs.clear.addEventListener('click', clearAll)
refs.form.addEventListener('submit', handleSubmit)
addEventListener('DOMContentLoaded', handleMount)
 

