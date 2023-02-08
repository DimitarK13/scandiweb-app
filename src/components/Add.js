import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Add() {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const switchType = (e) => {
    const selectedOption = e.target.value;
    const options = document.querySelectorAll('.option');

    options.forEach((option) => {
      option.style.display = 'none';
    });

    document.getElementById(selectedOption).style.display = 'block';
  };

  const handleForm = (e) => {
    e.preventDefault();

    const validateForm = (value, name) => {
      if (value === '' || value === 0 || value === undefined) {
        document.querySelector(`.${name}Err`).textContent =
          'Please specify this field';
        return false;
      } else {
        document.querySelector(`.${name}Err`).textContent = '';
        return true;
      }
    };

    function pass() {
      if (!validateForm(sku, 'sku')) return;
      if (!validateForm(name, 'name')) return;
      if (!validateForm(price, 'price')) return;

      return true;
    }

    if (pass()) {
      console.log('All Good');
    }
  };

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
          <div className='form-item'>
            <label htmlFor='sku'>
              SKU <span className='skuErr err'></span>
            </label>
            <input
              type='text'
              name='sku'
              id='sku'
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor='name'>
              Name <span className='nameErr err'></span>
            </label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor='price'>
              Price ($) <span className='priceErr err'></span>
            </label>
            <input
              type='number'
              name='price'
              id='price'
              min='1'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='form-item'>
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
          </div>

          <div id='DVD' className='option'>
            <div className='form-item'>
              <label htmlFor='size'>Size (MB)</label>
              <input type='number' name='size' id='size' min='1' />
            </div>
          </div>
          <div id='Furniture' className='option'>
            <div className='form-item'>
              <label htmlFor='height'>Height (CM)</label>
              <input type='number' name='height' id='height' min='1' />
            </div>
            <div className='form-item'>
              <label htmlFor='width'>Width (CM)</label>
              <input type='number' name='width' id='width' min='1' />
            </div>
            <div className='form-item'>
              <label htmlFor='length'>Length (CM)</label>
              <input type='number' name='length' id='length' min='1' />
            </div>
          </div>
          <div id='Book' className='option'>
            <div className='form-item'>
              <label htmlFor='weight'>Weight (KG)</label>
              <input type='number' name='weight' id='weight' min='1' />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
