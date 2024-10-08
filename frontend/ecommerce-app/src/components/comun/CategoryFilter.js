// src/components/common/CategoryFilter.js

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchCategories();
  }, [])

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    dispatch(fetchProducts(event.target.value));
  };

  return (
    <FormControl fullWidth variant="outlined" sx={{ marginBottom: '1rem' }}>
      <InputLabel>{t('category')}</InputLabel>
      <Select
        value={selectedCategory}
        onChange={handleChange}
        label={t('category')}
      >
        <MenuItem value="">
          <em>{t('all')}</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CategoryFilter;
