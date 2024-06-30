export const fetchLanguages = async() => {
    const response = await fetch("http://localhost:3000/api/languages",{
        method:"GET",
        headers:{
            'content-Type':'application/json'
        }
    })
    const data = await response.json();
    return data;
}