import React from 'react';
import styled from 'styled-components';
import { SupplierListItemType } from './Types';

const SupplierListItemContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    border-bottom: 1px solid lightgray;
    padding-bottom: 5px;
`;

const SupplierAvatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius:; 48px;
    padding-right: 10px;
`;

export const SupplierListItem = ({supplier, onDelete}: SupplierListItemType) => {
    return <SupplierListItemContainer onClick={onDelete}>
      <SupplierAvatar src={supplier.image} />
      <div style={{display:'flex',flex:1, flexDirection: 'column'}}>
        <div>{supplier.name}</div>
        <div>{supplier.address}</div>
      </div>
      <div style={{padding:5, cursor:'pointer', borderRadius:2, backgroundColor:'crimson', color:'white'}}>{'delete'}</div>
    </SupplierListItemContainer>
  }