import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const productList = [
  {
    id: 1,
    name: 'Product A',
    price: 50,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Product B',
    price: 30,
    quantity: 1,
  },
  // Add more products as needed
];

function Carts() {
  const [cart, setCart] = useState(productList);
  const [discount, setDiscount] = useState(0);

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    return subtotal - (subtotal * discount) / 100;
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map((product) =>
      product.id === productId
        ? { ...product, quantity: newQuantity }
        : product
    );
    setCart(updatedCart);
  };

  const handleDiscountChange = (newDiscount) => {
    // Ensure that the discount is within the range [0, 100]
    if (newDiscount >= 0 && newDiscount <= 100) {
      setDiscount(newDiscount);
    }
  };

  return (
    <div>
      <Typography variant="h4">Shopping Cart</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{`INR ${product.price.toFixed(2)}`}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, parseInt(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  {`INR ${(product.price * product.quantity).toFixed(2)}`}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell>{`INR ${calculateTotal().toFixed(2)}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <TextField
                  label="Discount (%)"
                  type="number"
                  value={discount}
                  onChange={(e) => handleDiscountChange(parseInt(e.target.value))}
                />
              </TableCell>
              <TableCell>
                {`INR ${((calculateTotal() * discount) / 100).toFixed(2)}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>
                {`INR ${(calculateTotal() - (calculateTotal() * discount) / 100).toFixed(2)}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Carts;
