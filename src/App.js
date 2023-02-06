import './styles.css';
import Card from './Card';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    axios
      .get('http://localhost/skandiweb-app/api/index.php')
      .then((response) => {
        const data = response.data;
        data.forEach((object) => {
          const { p_sku, p_name, p_price, p_value } = object;
          setData((prevValues) => {
            return [
              ...prevValues,
              {
                p_sku,
                p_name,
                p_price,
                p_value,
              },
            ];
          });
        });
      });
  }

  return (
    <div className='container'>
      <header>
        <h1>Product List</h1>
        <div className='buttons'>
          <a href='add-product' className='btn'>
            Add
          </a>
          <button className='btn' id='delete-product-btn'>
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
            />
          );
        })}
      </main>
    </div>
  );
}

export default App;
