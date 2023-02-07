import Card from './Card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    axios
      .get('http://localhost/skandiweb-app/api/index.php')
      .then((response) => {
        setData(response.data);
      });
  }

  const handleDelete = () => {
    let sku;
    const checkbox = document.getElementsByClassName('delete-checkbox');

    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        const parent = checkbox[i].parentNode;
        sku = parent.firstChild.textContent;
        // parent.style.display = 'none';
        axios.delete(`http://localhost/skandiweb-app/api/index.php/${sku}`);
      }
    }
  };

  return (
    <div className='container'>
      <header>
        <h1>Product List</h1>
        <div className='buttons'>
          <Link to='/add-product' className='btn'>
            Add
          </Link>
          <button
            className='btn'
            id='delete-product-btn'
            onClick={handleDelete}>
            Mass Delete
          </button>
        </div>
      </header>
      <main>
        {data.map((data, index) => {
          return (
            <Card
              sku={data.p_sku}
              name={data.p_name}
              price={data.p_price}
              attribute={'Attr'}
              value={data.p_value}
              key={index}
              id={index}
            />
          );
        })}
      </main>
    </div>
  );
}
