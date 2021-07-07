
const button = document.querySelector("[data-btn]")
const method = document.querySelector("[data-method]")
const url = document.querySelector("[data-url]")
const addQueryParams  = document.querySelector("[data-add-query-params]")
const addHeaders  = document.querySelector("[data-add-header]")
const template = document.querySelector("[data-key-value-template]")
const addHeaderHere = document.querySelector("[data-headers]")
const addQueryParamsHere = document.querySelector("[data-query-params]")
var jsonReqBody = document.querySelector('[data-json-req]')




function addPair()
{
    const AddPair = template.content.cloneNode(true)
    AddPair.querySelector('[data-remove]').addEventListener('click', (e) => {
        e.target.closest('[data-key-value-pair]').remove()
    })

    return AddPair
}


//make a key value template clone node and add it in the headers div
addHeaders.addEventListener('click', () => {

    
    addHeaderHere.append(addPair())


})

addQueryParams.addEventListener('click', () => {

    
    addQueryParamsHere.append(addPair())


})

// select all queries and parameters and merge them to form a string, return the string

function makeParams(container)
{
    const [...keyValuePairs] = container.querySelectorAll('[data-key-value-pair]')

    var ans = ""
    keyValuePairs.forEach((node) => {

        const key = node.querySelector('[data-key]')
        const value = node.querySelector('[data-value]')

        console.log(key, value)

        ans = ans + key.value + "=" + value.value + "&"

    })

    ans  = ans.slice(0, -1)

    return ans

}

// get all key value of headers, create a string object and return it
function makeHeaders(container) {
    const pairs = container.querySelectorAll("[data-key-value-pair]")
    return [...pairs].reduce((data, pair) => {
      const key = pair.querySelector("[data-key]").value
      const value = pair.querySelector("[data-value]").value
  
      if (key === "") return data
      return { ...data, [key]: value }
    }, {})
  }
  








//fecth get
async function fetchDataGet(url = "", method = "")
{
    if(url == "" || method == "")
    {
        console.log("no data provided")
        return {}
    }

    url = new URL(url)

    const params = makeParams(addQueryParamsHere)
    const finalUrl = url +"?"+params
    
    const ReqHeaders = makeHeaders(addHeaderHere)



    const res = await fetch(finalUrl,{
        method:"GET",
        headers: new Headers(ReqHeaders),
       
    })

    const data = res.json()

   

    return data


}


//fetch post
async function fetchDataPost(url = "", jsonString)
{
    
    url = new URL(url)

    const params = makeParams(addQueryParamsHere)
    const finalUrl = url +"?"+params

    const ReqHeaders = makeHeaders(addHeaderHere)
    
    const res = await fetch(finalUrl, {
        method: 'POST',
        body: jsonString,
        headers: new Headers(ReqHeaders)
        
      })

    const data = res.json()

    console.log(data)

    return data

}


// scroll smoothly after user receives a response
function scrollFunc(){
    document.getElementById('jsonres').scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function displayJsonResp(res)
{
    document.querySelector("[data-json-res]").textContent = res  
}

button.addEventListener('click',(e) => {
    e.preventDefault()

    // GET
    if(method.value === "GET")
    {

        fetchDataGet(url.value, method.value).then((res) =>{
      
            const prettyRes = JSON.stringify(res, undefined, 4) 
            displayJsonResp(prettyRes)
    
        })

    }


    // POST
    if(method.value === "POST")
    {

        fetchDataPost(url.value, jsonReqBody.value).then((res) =>{
        
            const prettyRes = JSON.stringify(res, undefined, 4) 
            displayJsonResp(prettyRes)
    
    })

    }

    // scroll smoothly to response display
    scrollFunc()
    

    
})



  

