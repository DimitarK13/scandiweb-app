import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Add() {
  const navigate = useNavigate();
  const [allSKU, setSKUs] = useState([]);
  const [fullForm, setFullForm] = useState({
    sku: '',
    name: '',
    price: '',
    attr: '',
  });
  const [dimensions, setDimensions] = useState({});

  const switchType = (e) => {
    const selectedOption = e.target.value;
    const options = document.querySelectorAll('.option');

    options.forEach((option) => {
      option.style.display = 'none';

      let input_El = option.querySelectorAll('input');
      input_El.forEach((input) => {
        input.value = '';
      });
    });

    document.getElementById(selectedOption).style.display = 'flex';
  };

  const handleAttributes = (e) => {
    const errMsg = document.querySelector('#errMsg');
    const { name, value } = e.target;

    if (name === 'size') {
      if (value <= 0) {
        errMsg.textContent = 'Value must be above 0';
      } else {
        setFullForm((prevValues) => ({
          ...prevValues,
          attr: `Size: ${value} MB`,
        }));
      }
    } else if (name === 'weight') {
      if (value <= 0) {
        errMsg.textContent = 'Value must be above 0';
      } else {
        setFullForm((prevValues) => ({
          ...prevValues,
          attr: `Weight: ${value} KG`,
        }));
      }
    } else if (name === 'width' || name === 'height' || name === 'length') {
      if (value <= 0) {
        errMsg.textContent = 'Values must be above 0';
      } else {
        setFullForm((prevValues) => ({
          ...prevValues,
          attr: `Dimensions: ${dimensions.width}x${dimensions.height}x${dimensions.length}`,
        }));
      }
    } else {
      setFullForm((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleForm = (e) => {
    e.preventDefault();

    const handleErrors = () => {
      const errMsg = document.querySelector('#errMsg');

      if (allSKU.includes(fullForm.sku)) {
        errMsg.textContent = 'This SKU alredy exists. Please enter a new one.';
        return false;
      } else {
        for (let [name, value] of Object.entries(fullForm)) {
          if (value === '' || value <= 0) {
            errMsg.textContent = `Please specify ${name}`;
            return false;
          }
        }
      }

      return true;
    };

    if (handleErrors()) {
      axios
        .post('http://localhost/skandiweb-app/api/index.php', fullForm)
        .then((response) => {
          console.log(response.data);
          navigate('/');
        });
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost/skandiweb-app/api/index.php')
      .then((response) => {
        const allItems = response.data;

        allItems.forEach((row) => {
          setSKUs((prevValues) => {
            return [...prevValues, row.p_sku];
          });
        });
      });
  }, []);

  return (
    <div className='container'>
      <header>
        <h1>Product Add</h1>
        <div className='buttons'>
          <button
            onClick={handleForm}
            form='product_form'
            value='Submit'
            className='btn'>
            Save
          </button>
          <Link to='/' className='btn'>
            Cancel
          </Link>
        </div>
      </header>
      <main>
        <form id='product_form'>
          <label htmlFor='sku'>SKU</label>
          <input
            type='text'
            name='sku'
            id='sku'
            onChange={handleAttributes}
            required
          />

          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={handleAttributes}
            required
          />

          <label htmlFor='price'>Price ($)</label>
          <input
            type='number'
            name='price'
            id='price'
            min='1'
            onChange={handleAttributes}
            required
          />

          <label htmlFor='productType'>Type Switcher</label>
          <select
            type='text'
            name='productType'
            id='productType'
            onChange={switchType}>
            <option defaultChecked>Type Switcher</option>
            <option value='DVD'>DVD</option>
            <option value='Furniture'>Furniture</option>
            <option value='Book'>Book</option>
          </select>

          <div id='DVD' className='option'>
            <label htmlFor='size'>Size (MB)</label>
            <input
              type='number'
              name='size'
              id='size'
              min='1'
              onChange={handleAttributes}
            />

            <em>Please provide size in megabytes (MB)</em>
          </div>

          <div id='Furniture' className='option'>
            <label htmlFor='width'>Width (CM)</label>
            <input
              type='number'
              name='width'
              id='width'
              min='1'
              onChange={(e) => {
                setDimensions((prevValues) => ({
                  ...prevValues,
                  width: e.target.value,
                }));
              }}
              onBlur={handleAttributes}
            />

            <label htmlFor='height'>Height (CM)</label>
            <input
              type='number'
              name='height'
              id='height'
              min='1'
              onChange={(e) => {
                setDimensions((prevValues) => ({
                  ...prevValues,
                  height: e.target.value,
                }));
              }}
              onBlur={handleAttributes}
            />

            <label htmlFor='length'>Length (CM)</label>
            <input
              type='number'
              name='length'
              id='length'
              min='1'
              onChange={(e) => {
                setDimensions((prevValues) => ({
                  ...prevValues,
                  length: e.target.value,
                }));
              }}
              onBlur={handleAttributes}
            />

            <em>Please provide dimensions in centimeters (CM)</em>
          </div>

          <div id='Book' className='option'>
            <label htmlFor='weight'>Weight (KG)</label>
            <input
              type='number'
              name='weight'
              id='weight'
              min='1'
              onChange={handleAttributes}
            />

            <em>Please provide weight in kilograms (KG)</em>
          </div>
        </form>
        <strong id='errMsg' style={{ color: 'red' }}></strong>
      </main>
    </div>
  );
}
