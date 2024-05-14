import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    // const [image, setImage] = useState("");
    const navigate = useNavigate();
    const params = useParams()
    const productId = params.productId;
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        checkForId()
    }, []);

    function checkForId() {
        if (productId) {
            setIsUpdate(true);
            fetch('http://localhost:8080/api/product/findOne/' + productId)
                .then(res => res.json())
                .then((data) => {
                    setName(data.name);
                    setPrice(data.price);
                    setDescription(data.description);
                });
        }
    }


    async function add() {
        let data = { name, description, price }

        if (isUpdate) {
            try {
                const response = await fetch("http://localhost:8080/api/product/update/" + productId, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Product Updated: ", result);
                    // Redirect or navigate to another page after successful addition
                    navigate('/');
                } else {
                    console.error('Failed to update product');
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            try {
                const response = await fetch("http://localhost:8080/api/product/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Product Added: ", result);
                    // Redirect or navigate to another page after successful addition
                    navigate('/');
                } else {
                    console.error('Failed to add product');
                }
            } catch (error) {
                console.error('Error adding product:', error);
            }
        }
    }

    return (
        <>
            {isUpdate ? <h1>Update Product</h1> : <h1>Add Product</h1>}

            <div className='col-sm-4 offset-sm-4'>
                <input type="text" placeholder="Name" className='form-control m-4'
                    value={name} onChange={(e) => setName(e.target.value)} />

                <input type="text" placeholder="Description" className='form-control m-4'
                    value={description} onChange={(e) => setDescription(e.target.value)} />

                <input type="number" placeholder="Price" className='form-control m-4' min={0}
                    value={price} onChange={(e) => setPrice(e.target.value)} />

                {/* <input type="file" className='form-control m-4'
                    onChange={(e) => setImage(e.target.files[0])} /> */}

                <button type="button" className="btn btn-primary" onClick={add} >Submit</button>
            </div>
        </>
    )
}

