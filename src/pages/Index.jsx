import React, { useState } from 'react';
import { Container, VStack, Text, Button, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, Input, Select, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 200, type: 'Expense', category: 'Nike' },
    { id: 2, date: '2023-10-02', amount: 150, type: 'Expense', category: 'Adidas' },
  ]);

  const [form, setForm] = useState({ date: '', amount: '', type: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTransaction = () => {
    if (isEditing) {
      setTransactions(transactions.map(transaction => transaction.id === currentId ? { ...transaction, ...form } : transaction));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      setTransactions([...transactions, { ...form, id: transactions.length + 1 }]);
    }
    setForm({ date: '', amount: '', type: '', category: '' });
  };

  const handleEdit = (id) => {
    const transaction = transactions.find(transaction => transaction.id === id);
    setForm(transaction);
    setIsEditing(true);
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Sneaker Purchase Tracker</Text>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input type="date" name="date" value={form.date} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input type="number" name="amount" value={form.amount} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select name="type" value={form.type} onChange={handleChange}>
            <option value="">Select type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </Select>
        </FormControl>
        <Button onClick={handleAddTransaction} colorScheme="teal">{isEditing ? 'Update' : 'Add'} Transaction</Button>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Category</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map(transaction => (
              <Tr key={transaction.id}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.category}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm" onClick={() => handleEdit(transaction.id)} leftIcon={<FaEdit />}>Edit</Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(transaction.id)} leftIcon={<FaTrash />}>Delete</Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;