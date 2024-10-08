import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Container, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

let BASE_URL = "http://localhost:5000/car";

const NewCar = () => {
  const emptyCar = {
    brand: "",
    make: "",
    year: null,
    cm3: null,
    price: null,
  };

  const inputs = [
    {
      id: "brand",
      name: "brand",
      type: "text",
      placeholder: "Brand",
      label: "Brand",
    },
    {
      id: "make",
      name: "make",
      type: "text",
      placeholder: "Make",
      label: "Make",
    },
    {
      id: "year",
      name: "year",
      type: "number",
      placeholder: "Year",
      label: "Year",
    },
    {
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Price",
      label: "Price",
    },
    {
      id: "cm3",
      name: "cm3",
      type: "number",
      placeholder: "Cm3",
      label: "Cm3",
    },
    {
      id: "km",
      name: "km",
      type: "number",
      placeholder: "km",
      label: "km",
    },
  ];

  const [newCar, setNewCar] = useState(emptyCar);
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addCar(newCar);
  };

  const onChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleReset = (e) => {
    setNewCar(emptyCar);
  };

  const addCar = async (newCar) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    });

    const data = await response.json();

    if (!response.ok) {
      let errArray = data.detail.map((el) => {
        return `${el.loc[1]} -${el.msg}`;
      });
      setError(errArray);
    } else {
      setError([]);
      navigate("/car");
    }
  };

  return (
    <Container>
    <Layout>
      <div>
        <h1 className="text-center text-lg my-2 font-mono font-semibold">
          Insert a New Car
        </h1>
      </div>
      <div>
        <Form>
          {inputs.map((input) => (
            <Form.Group className="mb-3" controlId="{input.id}">
              <Form.Label>{input.name}</Form.Label>
              <Form.Control
                type="email"
                placeholder={input.name}
                required="True"
                value={newCar[input.name]}
                onChange={onChange}
              />
            </Form.Group>
          ))}

          <Button variant="Primary" type="submit" onClick={handleSubmit}>
            Insert
          </Button>
          <Button type="Secondary" onClick={handleReset}>
            Reset
          </Button>
        </Form>
      </div>
    </Layout>
    </Container>
  );
};

export default NewCar;
