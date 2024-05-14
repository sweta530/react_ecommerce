import { Table, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredProducts([]);
            return;
        }

        const filterProducts = products.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filterProducts);
    }, [search, products]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const result = await fetch("http://localhost:8080/api/product");
            const data = await result.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    function deleteProduct(id) {
        fetch(`http://localhost:8080/api/product/delete/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then((data) => {
                console.log("Deleted Product \n" + JSON.stringify(data));
                getProducts();
            })
            .catch(error => {
                console.error("Error deleting product:", error);
            });
    }

    return (
        <>
            <h1>Products</h1>
            <div className='col-sm-5'>
                <input
                    type="text"
                    placeholder="Search"
                    className='form-control m-4'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(filteredProducts.length > 0 ? filteredProducts : products).map((item, i) =>
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>
                                <Button onClick={() => navigate(`/add/${item.id}`)}>Edit</Button> <br /><br />
                                <Button variant='danger' onClick={() => deleteProduct(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default Home;
