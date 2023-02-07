import { Link } from 'react-router-dom';

export default function Add() {
  const switchType = (e) => {
    const selectedOption = e.target.value;
    const options = document.querySelectorAll('.option');

    options.forEach((option) => {
      option.style.display = 'none';
    });

    document.getElementById(selectedOption).style.display = 'block';
  };

  return (
    <div className='container'>
      <header>
        <h1>Product Add</h1>
        <div className='buttons'>
          <button className='btn'>Save</button>
          <Link to='/' className='btn'>
            Cancel
          </Link>
        </div>
      </header>
      <main>
        <form id='product_form'>
          <div className='form-item'>
            <label htmlFor='sku'>SKU</label>
            <input type='text' name='sku' id='sku' />
          </div>
          <div className='form-item'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id='name' />
          </div>
          <div className='form-item'>
            <label htmlFor='price'>Price ($)</label>
            <input type='text' name='price' id='price' />
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
              <input type='text' name='size' id='size' />
            </div>
          </div>
          <div id='Furniture' className='option'>
            <div className='form-item'>
              <label htmlFor='height'>Height (CM)</label>
              <input type='text' name='height' id='height' />
            </div>
            <div className='form-item'>
              <label htmlFor='width'>Width (CM)</label>
              <input type='text' name='width' id='width' />
            </div>
            <div className='form-item'>
              <label htmlFor='length'>Length (CM)</label>
              <input type='text' name='length' id='length' />
            </div>
          </div>
          <div id='Book' className='option'>
            <div className='form-item'>
              <label htmlFor='weight'>Weight (KG)</label>
              <input type='text' name='weight' id='weight' />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
