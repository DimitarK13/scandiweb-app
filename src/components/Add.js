import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Add() {
  const [fullForm, setFullForm] = useState({});
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

  const handleInputs = (e) => {
    const { name, value } = e.target;

    setFullForm((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleAttributes = (e) => {
    const { name, value } = e.target;

    if (name === 'size') {
      setFullForm((prevValues) => ({
        ...prevValues,
        attr: `Size: ${value} MB`,
      }));
    } else if (name === 'weight') {
      setFullForm((prevValues) => ({
        ...prevValues,
        attr: `Weight: ${value} KG`,
      }));
    } else if (name === 'width' || name === 'height' || name === 'length') {
      setFullForm((prevValues) => ({
        ...prevValues,
        attr: `Dimensions: ${dimensions.width}x${dimensions.height}x${dimensions.length}`,
      }));
    }
  };

  const handleForm = (e) => {
    e.preventDefault();

    console.log(fullForm);
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
          <label htmlFor='sku'>
            SKU <span className='skuErr err'></span>
          </label>
          <input
            type='text'
            name='sku'
            id='sku'
            onChange={handleInputs}
            required
          />

          <label htmlFor='name'>
            Name <span className='nameErr err'></span>
          </label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={handleInputs}
            required
          />

          <label htmlFor='price'>
            Price ($) <span className='priceErr err'></span>
          </label>
          <input
            type='number'
            name='price'
            id='price'
            min='1'
            onChange={handleInputs}
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
          </div>
        </form>
      </main>
    </div>
  );
}
