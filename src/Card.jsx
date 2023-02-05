export default function Card(props) {
  return (
    <div className='card'>
      <p>{props.sku}</p>
      <p>{props.name}</p>
      <p>{props.price}$</p>
      <p>
        {props.attribute}: {props.value}
      </p>
      <input type='checkbox' className='delete-checkbox' />
    </div>
  );
}
