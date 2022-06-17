/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable react/require-default-props */
import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import Icat from '../../models/Icat';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addSelected, removeSelected, selectSelectedItems } from '../../redux/slices/productSlice';

interface Iprops {
  className?: string,
  data: Icat
}

const Product: FC<Iprops> = ({ className = '', data }) => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectSelectedItems);
  const isSelected = selectedItems.find((id) => (id === data.id)) === data.id;
  const [title, setTitle] = useState<string>('Сказочное заморское яство');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const disabled = isSelected && !data.inStore.status;

  const productDescription = data.description.map((item, index) => (
    // В данном случае я могу в key написать index массива
    // так как врятли текст будет меняться или удаляться на клиенте
    <div key={index} className={cn('product__text')}>
      {item.number && (<strong>{item.number}</strong>)}
      {' '}
      {item.text}
    </div>
  ));

  const handleItem = () => {
    // если нету нямки :(
    if (!data.inStore.status && !isSelected) {
      dispatch(addSelected(data.id));
      // setDisabled(true);
      return;
    }
    if (isSelected && data.inStore.status) {
      dispatch(removeSelected(data.id));
      setIsHovered(false);
      setTitle('Сказочное заморское яство');
      return;
    }
    if (!isSelected && data.inStore.status) {
      dispatch(addSelected(data.id));
    }
  };

  const handleMouseEnter = () => {
    if (!data.inStore.status) {
      return;
    }
    if (isSelected) {
      setTitle('Котэ не одобряет?');
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!data.inStore.status) {
      return;
    }
    if (isSelected) {
      setTitle('Сказочное заморское яство');
      setIsHovered(false);
    }
  };

  return (
    <div
      className={cn(className, 'product', {
        'product--selected': isSelected && data.inStore.status,
        'product--disabled': disabled,
      })}
    >
      <div
        onClick={handleItem}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        role="button"
        className={cn('product__wrp')}
      >
        <div className={cn('product__inner')}>
          <div className={cn('product__description')}>
            <div className={cn('product__title', { 'product__title--hovered': isHovered })}>{title}</div>
            <div className={cn('product__name')}>
              <strong>Нямушка</strong>
              <span>{data.type}</span>
            </div>
            <div className={cn('product__about')}>
              {productDescription}
            </div>
          </div>
          <div className={cn('product__img')}>
            <img src={data.img} alt="img" />
          </div>
          <div className={cn('product__weight')}>
            <strong>{data.weight.toString().replace('.', ',')}</strong>
            {' '}
            кг
          </div>
        </div>
      </div>
      { (!isSelected && !disabled) && (
        <div className={cn('product__text-funny')}>
          Чего сидишь? Порадуй котэ,
          {' '}
          <button onClick={handleItem} className={cn('product__btn-buy')} type="button">
            <span>купи</span>
            .
          </button>
        </div>
      )}
      {(isSelected && !disabled) && (
        <div className={cn('product__text-funny')}>
          {data.inStore.text}
        </div>
      )}
      {(isSelected && disabled) && (
        <div className={cn('product__text-funny product__text-funny--yellow')}>
          Печалька,
          {' '}
          {data.type}
          {' '}
          закончился.
        </div>
      )}
    </div>
  );
};

export default Product;
