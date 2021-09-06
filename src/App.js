import React from "react";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "./context";
import Photo from "./Photo";

function App() {
  const { list, loading,value,setValue,setPage,getData } = useGlobalContext(); 
  const handleSubmit=(e)=>{
    e.preventDefault();
    setPage(1)
    getData();
  }
  return (
    <main>
      <section className="search">
        <form onSubmit={handleSubmit} className="search-form">
          <input onChange={(e)=>setValue(e.target.value)} type="text" value={value} placeholder="search" className="form-input" />
          <button className="submit-btn" type="submit">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {list.map((item, idx) => {
            const {id,likes,alt_description,urls:{regular},user:{username,portfolio_url,profile_image:{medium}}}=item
            const info = {id,likes,alt_description,regular,username,portfolio_url,medium}
            return <Photo key={id} {...info} />;
          })}
        </div>
        {loading && <h2 className="loading">loading ...</h2>}
      </section>
    </main>
  );
}

export default App;
