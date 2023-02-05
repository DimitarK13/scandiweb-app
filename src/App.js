import './styles.css';
import Card from './Card';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost/skandiweb-app/api/index.php')
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <Card
          sku={data[0]}
          name={data[1]}
          price={data[2]}
          attribute={data[3]}
          value={data[4]}
        />
        <Card
          sku={data[0]}
          name={data[1]}
          price={data[2]}
          attribute={data[3]}
          value={data[4]}
        />
        <Card
          sku={data[0]}
          name={data[1]}
          price={data[2]}
          attribute={data[3]}
          value={data[4]}
        />
      </main>
    </div>
  );
}

export default App;
