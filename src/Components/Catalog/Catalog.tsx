/* eslint-disable arrow-body-style */
import React, { FC, useEffect } from 'react';
import cn from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Product';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProducts, selectProducts } from '../../redux/slices/productSlice';
import Icat from '../../models/Icat';
import './style.scss';

const Catalog: FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={cn('catalog')}>
      <Container fluid="xl">
        <h1 className={cn('catalog__title')}>Ты сегодня покормил кота?</h1>
        <Row className="d-flex justify-content-center">
          { items.map((item: Icat) => (
            <Col className="mb-3" xs={12} sm={12} md={6} lg={4} xl={4} key={item.id}>
              <Product className="catalog__product" data={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Catalog;
