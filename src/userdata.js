import  { useEffect }  from 'react';
import { useState } from 'react';
import axios from 'axios';
export function Datafetch(props){
  
    const [details, setdetails] = useState([]);
    const [search,setsearch]=useState("");
    const [gender,setgender]=useState('All')
    const [trash,settrash]=useState([])
    const [starred,setstarred]=useState([]);
    const [flag,setflag]=useState(false);
    const [flag1,setflag1]=useState(false);
    const fetchProducts = async () => {
      const { data } = await axios.get
      ("https://mocki.io/v1/d1f16339-9aec-4696-b302-7fd0cb0db28b");
      const details = data;
      setdetails(details);
    };
    useEffect(() => {
      fetchProducts();
    }, []);
    const handlechange=(event)=>{
      setsearch(event.target.value)

    }
    
    function handledelete(item){
     const newdata=details.filter((id1)=> id1.id!==item.id);
     console.log(newdata)
     setdetails(newdata);
     settrash((trashdata) => [...trashdata, item])
    }
    function handlestarred(event,item){
      const {checked}=event.target;
      if(checked===true){
        const newdata1=[...starred,item]
        setstarred(newdata1);
      }
      else{
        const newdata1=starred.filter((id2)=>id2.id!==item.id);
        setstarred(newdata1);
      }
      
    }
    const starclicked=()=>{
      setflag(false);
      setflag1(true);
    }
    const trashclicked=()=>{
      setflag(true);
      setflag1(false);
    }
    const homeclicked=()=>{
      setflag(false);
      setflag1(false);
    }
    
    
      const searchdata = details.filter(
      (details) =>(
        ((gender === 'All') || (details.gender === gender) ) &&
        (details.first_name.toLowerCase().includes(search.toLowerCase())||
        details.last_name.toLowerCase().includes(search.toLowerCase()) ||
        details.email.toLowerCase().includes(search.toLowerCase()))
    ));
        
  return (
      <div>
        <div className='header'>
          <button id="button" onClick={homeclicked}>home</button>
          <button id="button" onClick={starclicked}>starred</button>
          <button id="button" onClick={trashclicked}>trash</button>
        </div>
        <div className='search'>
        <div className='gender'>
        <label>select gender: </label>
        <select value={gender} onChange={(event)=>setgender(event.target.value)}>
            <option value='All'>All</option>
            <option value='Female'>female</option>
            <option value='Male'>male</option>
        </select>
        </div>
        <div className='search_bar'>
        <label >search bar: </label>
            <input type='text' placeholder="search for user" onChange={handlechange} ></input>
        </div>
        </div>
        {!flag && !flag1?
        <div className='table'>
          <table>
            
            <tr>
              <th>starred</th>
              <th>id</th>
              <th>first_name</th>
              <th>last_name</th>
              <th>email</th>
              <th>gender</th>
              <th>ip_address</th>
                    
            </tr>
           
          {searchdata.map((item) => (
          <tr key={item.id}>
                <td><input type='checkbox' onChange={(event) => handlestarred(event, item)}/></td>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.ip_address}</td>
                <td><button onClick={()=>handledelete(item)} >DELETE</button></td>  
          </tr>
        ))}
        </table>
        </div>
      :<div></div>}
      {flag?
      <table>
        <h1>trash data</h1>
        {trash.map((item)=>(
          <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.email}</td>
          <td>{item.gender}</td>
          <td>{item.ip_address}</td>
          </tr>
        ))}
      </table>
      :<div></div> }
      {flag1?
      <table> 
      <h1>starred</h1>
      {starred.map((item)=>(
          <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.email}</td>
          <td>{item.gender}</td>
          <td>{item.ip_address}</td>
          </tr>
        ))}
        </table>:<div></div>}
       
        
       
   </div>
    );
    
     
}
