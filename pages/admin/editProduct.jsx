import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditProduct = async ({ product }) => {

  if (!product) {
    return <div>No products available</div>;
  }

  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [img, setImg] = useState(product.img);
  const [prices, setPrices] = useState(product.prices.join(','));
  const [extraOptions, setExtraOptions] = useState(product.extraOptions.map(option => `${option.text}:${option.price}`).join(','));

  const router = useRouter();

  const handleSave = async () => {
    try {
      const updatedProduct = {
        title,
        desc,
        img,
        prices: prices.split(',').map(price => parseFloat(price)),
        extraOptions: extraOptions.split(',').map(option => {
          const [text, price] = option.split(':');
          return { text, price: parseFloat(price) };
        })
      };

      await axios.put(`/api/products/${product._id}`, updatedProduct);

      router.push('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description</label>
      <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <label>Image URL</label>
      <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
      <label>Prices (comma-separated)</label>
      <input type="text" value={prices} onChange={(e) => setPrices(e.target.value)} />
      <label>Extra Options (comma-separated, format: option:text:price)</label>
      <input type="text" value={extraOptions} onChange={(e) => setExtraOptions(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get(`http://localhost:3000/api/products/${product._id}`);

  return {
    props: {
      product: productRes.data
    },
  };
};

export default EditProduct;